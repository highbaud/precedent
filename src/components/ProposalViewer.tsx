import { useMemo, useState } from "react";
import type { Gap, StateReport } from "../types";
import type { LetterheadConfig } from "../lib/letterhead";
import { letterheadMarkdown, signatureMarkdown } from "../lib/letterhead";
import { TEMPLATES } from "../data/templates";
import { buildCtx, buildSources, render, splitBill } from "../lib/render";
import { rarityNote } from "../lib/gaps";
import { ProposalDoc } from "./ProposalDoc";
import { BillDoc } from "./BillDoc";
import { LetterheadView, SignatureView } from "./DocChrome";
import { LetterheadEditor } from "./LetterheadEditor";
import { ExportBar } from "./ExportBar";
import { ExternalLinkIcon } from "./icons";

type Mode = "onePager" | "formal" | "objections";

interface Props {
  report: StateReport;
  gap: Gap;
  letterhead: LetterheadConfig;
  onLetterhead: (cfg: LetterheadConfig) => void;
}

export function ProposalViewer({ report, gap, letterhead, onLetterhead }: Props) {
  const [mode, setMode] = useState<Mode>("onePager");
  // AI-refined overrides, keyed by "<categoryId>:<mode>"
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  const ctx = useMemo(() => buildCtx(report, gap), [report, gap]);
  const baseText = useMemo(
    () => render(TEMPLATES[gap.category.id][mode], ctx),
    [gap.category.id, mode, ctx]
  );

  const overrideKey = `${gap.category.id}:${mode}`;
  const refined = overrides[overrideKey];
  // Refinable body (no citations) vs. full display text (citations appended).
  const bodyText = refined ?? baseText;
  const sources = useMemo(() => buildSources(gap), [gap]);
  const displayText = bodyText + sources;

  const slug = `${report.state.code}-${gap.category.id}-${mode}`.toLowerCase();
  const modeLabel =
    mode === "onePager"
      ? "Briefing"
      : mode === "formal"
        ? "Model Bill"
        : "Objections & Rebuttals";
  const docTitle = `${report.state.name} — ${gap.category.name} (${modeLabel})`;

  const isOnePager = mode === "onePager";
  const isFormal = mode === "formal";
  // Formal mode is a filed bill — split off the "AN ACT …" caption from the
  // line-numbered body so BillDoc can lay it out like a real bill.
  const { caption, body: billBody } = useMemo(
    () => splitBill(bodyText),
    [bodyText]
  );
  // Letterhead/signature render visually in the doc (screen + print) and are
  // mirrored as text in the exported copy/markdown/Word output. A bill carries
  // its own legislative header, so no advocacy letterhead is attached to it.
  const exportText = isFormal
    ? displayText
    : letterheadMarkdown(letterhead) +
      displayText +
      (isOnePager ? signatureMarkdown(letterhead) : "");

  return (
    <section className="proposal">
      <div className="proposal-head">
        <div>
          <span className="proposal-eyebrow">{gap.category.name}</span>
          <p className="proposal-rarity">{rarityNote(gap.category.rarity)}</p>
        </div>
        <div className="toggle-group" role="tablist">
          <button
            className={mode === "onePager" ? "on" : ""}
            onClick={() => setMode("onePager")}
          >
            One-pager
          </button>
          <button
            className={mode === "formal" ? "on" : ""}
            onClick={() => setMode("formal")}
          >
            Model bill
          </button>
          <button
            className={mode === "objections" ? "on" : ""}
            onClick={() => setMode("objections")}
          >
            Q&amp;A / Rebuttals
          </button>
        </div>
      </div>

      {gap.category.enacted.length > 0 && (
        <div className="precedent-strip">
          <span className="precedent-label">Modeled on enacted law:</span>
          <div className="precedent-pills">
            {gap.category.enacted.map((b, i) => {
              const name = gap.precedentStates[i] ?? b.state;
              const inner = (
                <>
                  <span className="pp-state">{name}</span>
                  <span className="pp-bill">{b.label}</span>
                </>
              );
              return b.sourceUrl ? (
                <a
                  key={b.state}
                  className="precedent-pill"
                  href={b.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${name} — ${b.label} · open the official record`}
                >
                  {inner}
                  <ExternalLinkIcon className="pp-ext" />
                </a>
              ) : (
                <span
                  key={b.state}
                  className="precedent-pill no-link"
                  title={`${name} — ${b.label} · verify with the state legislature`}
                >
                  {inner}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {refined && (
        <div className="refined-banner">
          ✦ AI-refined draft.{" "}
          <button
            className="ghost"
            onClick={() =>
              setOverrides((o) => {
                const next = { ...o };
                delete next[overrideKey];
                return next;
              })
            }
          >
            Revert to template
          </button>
        </div>
      )}

      {isFormal ? (
        <BillDoc
          state={report.state.name}
          year={ctx.YEAR}
          caption={caption}
          body={billBody}
          notes={sources}
        />
      ) : (
        <ProposalDoc
          text={displayText}
          before={<LetterheadView cfg={letterhead} />}
          after={isOnePager ? <SignatureView cfg={letterhead} /> : null}
        />
      )}

      {!isFormal && (
        <LetterheadEditor
          cfg={letterhead}
          onChange={onLetterhead}
          allowSignature={isOnePager}
        />
      )}

      <ExportBar
        text={exportText}
        refineText={bodyText}
        filename={slug}
        docTitle={docTitle}
        refineContext={docTitle}
        onRefined={(t) => setOverrides((o) => ({ ...o, [overrideKey]: t }))}
      />
    </section>
  );
}
