import type { Gap, StateReport } from "../types";
import { LAST_UPDATED } from "../data/legislation";
import { TEMPLATES } from "../data/templates";
import { DEMOGRAPHICS, NATIONAL_BENCHMARKS } from "../data/demographics";

/** Join a list with commas and a serial "and": [A,B,C] -> "A, B, and C". */
export function oxfordJoin(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

/** Replace {{TOKEN}} occurrences; unknown tokens are left intact. */
export function render(tpl: string, ctx: Record<string, string>): string {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_match, key: string) =>
    key in ctx ? ctx[key] : `{{${key}}}`
  );
}

/**
 * Format a raw USD figure as compact, human-readable prose ("$2.1 billion",
 * "$455 billion", "$1.3 trillion"). Used only on exact, sourced trade figures.
 */
export function fmtUSDCompact(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(n >= 1e13 ? 1 : 2)} trillion`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(n >= 1e11 ? 0 : 1)} billion`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)} million`;
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

/**
 * Strip the [[DATA]] chart-slot marker from a template. Charts render only on
 * screen and in the printed/PDF document; every text export (copy, Markdown,
 * Word) drops the marker so the prose reads cleanly.
 */
export function stripDataMarkers(s: string): string {
  return s
    .replace(/^[ \t]*\[\[DATA\]\][ \t]*\n?/gm, "")
    .replace(/\n{3,}/g, "\n\n");
}

/** Build the substitution context for a given state + gap. */
export function buildCtx(report: StateReport, gap: Gap): Record<string, string> {
  const { state } = report;
  const precedent = gap.precedentStates;
  const precedentPhrase =
    precedent.length > 0
      ? oxfordJoin(precedent)
      : `no state has yet enacted comparable law, positioning ${state.name} to lead the nation`;
  const precedentSentence =
    precedent.length > 0
      ? `${precedent.length} state${precedent.length > 1 ? "s have" : " has"} already enacted comparable law: ${oxfordJoin(
          precedent
        )}.`
      : `No state has yet enacted comparable law, so ${state.name} would be first in the nation.`;

  // Verified per-state indicators (FDIC 2023 / Census 2024). These are only
  // ever surfaced in copy as exact, sourced figures — never estimated.
  const demo = DEMOGRAPHICS[state.code];

  return {
    STATE: state.name,
    DEMONYM: state.demonym,
    DEMONYM_PLURAL: pluralizeDemonym(state.demonym),
    LEGISLATURE: `the Legislature of the State of ${state.name}`,
    PRECEDENT: precedentPhrase,
    PRECEDENT_SENTENCE: precedentSentence,
    PRECEDENT_COUNT: String(precedent.length),
    YEAR: String(new Date().getFullYear()),
    // Demographic tokens — exact figures, formatted for prose.
    POPULATION: demo.population.toLocaleString("en-US"),
    UNBANKED: String(demo.unbankedRate),
    UNDERBANKED: String(demo.underbankedRate),
    UNBANKED_NAT: String(NATIONAL_BENCHMARKS.unbankedRate),
    UNDERBANKED_NAT: String(NATIONAL_BENCHMARKS.underbankedRate),
    CRYPTO_SHARE: String(NATIONAL_BENCHMARKS.cryptoOwnership),
    UNEMPLOYMENT: String(demo.unemploymentRate),
    UNEMPLOYMENT_NAT: String(NATIONAL_BENCHMARKS.unemploymentRate),
    // International goods trade (Census 2024) — exact figures, compact prose.
    EXPORTS: fmtUSDCompact(demo.exports),
    IMPORTS: fmtUSDCompact(demo.imports),
    TRADE_TOTAL: fmtUSDCompact(demo.exports + demo.imports),
  };
}

/**
 * Build an exportable "Sources & precedent" section citing every enacted bill
 * this proposal is modeled on. Kept separate from the body so the citations
 * always travel with every export.
 */
export function buildSources(gap: Gap): string {
  const bills = gap.category.enacted;
  const isUcc = gap.category.id === "ucc-12";
  const verifyNote = isUcc
    ? "Verify each citation against the enacting state's official legislature record and the Uniform Law Commission's enactment map before filing."
    : "Verify each citation against the enacting state's official legislature record before filing.";

  if (bills.length === 0) {
    return `\n\n## Sources & precedent\nNo state has yet enacted comparable law, so there is no prior statute to cite, so this proposal would be first in the nation. Confirm the current landscape with the National Conference of State Legislatures (NCSL) before filing.\n\nLegislation snapshot: ${LAST_UPDATED}. All text is model legislation for advocacy, not legal advice.`;
  }

  // gap.precedentStates is derived from the same enacted[] array, in order.
  const lines = bills
    .map((b, i) => {
      const name = gap.precedentStates[i] ?? b.state;
      const cite = b.sourceUrl ? `[${b.label}](${b.sourceUrl})` : b.label;
      return `- ${name}, ${cite}`;
    })
    .join("\n");
  const uccMap = isUcc
    ? `\n- Uniform Law Commission, [UCC Article 12 enactment map](https://www.uniformlaws.org/committees/community-home?CommunityKey=1457c422-ddb7-40b0-8c76-39a1991651ac)`
    : "";
  return `\n\n## Sources & precedent\nThis proposal is modeled on enacted state law. ${verifyNote}\n\n${lines}${uccMap}\n\nLegislation snapshot: ${LAST_UPDATED}. All text is model legislation for advocacy, not legal advice.`;
}

/**
 * Split a rendered formal-bill template into its caption (the "AN ACT …"
 * title that precedes the enacting clause) and its numbered body (the enacting
 * clause and every section thereafter). Used by BillDoc to lay the body out
 * with line numbers in the left margin, the way a filed bill appears.
 */
export function splitBill(text: string): { caption: string; body: string } {
  const t = text.replace(/\r\n/g, "\n").trim();
  const idx = t.indexOf("\n\n");
  if (idx === -1) return { caption: t, body: "" };
  return { caption: t.slice(0, idx).trim(), body: t.slice(idx + 2).trim() };
}

export type DocMode = "coverLetter" | "formal" | "objections";

/**
 * Assemble every gap for a state into one packet: a cover page listing the
 * contents, then each proposal (rendered in the chosen mode) with its own
 * citations. Ready to copy, print, or download as a single document.
 */
export function buildPackage(report: StateReport, mode: DocMode): string {
  const gaps = report.gaps;
  const kind =
    mode === "coverLetter"
      ? "Legislative Cover-Letter Packet"
      : mode === "formal"
        ? "Model Bill Packet"
        : "Objection & Rebuttal Packet";

  const contents = gaps.map((g, i) => `${i + 1}. ${g.category.name}`).join("\n");
  const cover = `# ${report.state.name}: ${kind}

This packet contains ${gaps.length} proposal${gaps.length === 1 ? "" : "s"} addressing gaps in ${report.state.name}'s pro–digital-asset legislation. Each item is modeled on enacted law from other states and is intended for review by legislative counsel before filing.

## Contents
${contents}

Legislation snapshot: ${LAST_UPDATED}.`;

  const sections = gaps.map((gap) => {
    const ctx = buildCtx(report, gap);
    return (
      stripDataMarkers(render(TEMPLATES[gap.category.id][mode], ctx)) +
      buildSources(gap)
    );
  });

  return [cover, ...sections].join("\n\n---\n\n");
}

function pluralizeDemonym(d: string): string {
  if (d.endsWith("resident")) return d.replace("resident", "residents");
  if (d.endsWith("s")) return d;
  return `${d}s`;
}
