/**
 * Letterhead + signature-block configuration. Persisted in localStorage so an
 * advocacy team sets it once and it travels across every state and proposal.
 * The visual (logo image, handwritten-signature images) renders on screen and
 * in Print/PDF — the primary "finished" output. Text exports (.md/.doc/copy)
 * include the letterhead and signer lines as text.
 */

export type SignatureMode = "text" | "image";

export interface Signer {
  id: string;
  name: string;
  title: string;
  org: string;
  mode: SignatureMode;
  /** typed signature (mode === "text") */
  typed: string;
  /** data-URL of an uploaded signature image (mode === "image") */
  image: string;
}

export interface LetterheadConfig {
  /** show the letterhead masthead at the top of documents */
  enabled: boolean;
  /** data-URL of an uploaded logo */
  logo: string;
  orgName: string;
  /** free-form address / contact lines, newline-separated */
  contact: string;
  /** show the signature block (one-pagers) */
  showSignature: boolean;
  signers: Signer[];
}

const KEY = "precedent.letterhead";

export function emptySigner(): Signer {
  return {
    id: Math.random().toString(36).slice(2, 9),
    name: "",
    title: "",
    org: "",
    mode: "text",
    typed: "",
    image: "",
  };
}

export function defaultLetterhead(): LetterheadConfig {
  return {
    enabled: false,
    logo: "",
    orgName: "",
    contact: "",
    showSignature: false,
    signers: [emptySigner()],
  };
}

export function loadLetterhead(): LetterheadConfig {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultLetterhead();
    const parsed = JSON.parse(raw) as Partial<LetterheadConfig>;
    return { ...defaultLetterhead(), ...parsed };
  } catch {
    return defaultLetterhead();
  }
}

export function saveLetterhead(cfg: LetterheadConfig): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(cfg));
  } catch {
    /* ignore quota / private-mode errors */
  }
}

/** Signers that have at least a name — the ones worth rendering. */
export function activeSigners(cfg: LetterheadConfig): Signer[] {
  return cfg.signers.filter((s) => s.name.trim() || s.typed.trim() || s.image);
}

const contactLines = (cfg: LetterheadConfig): string[] =>
  cfg.contact
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

/** Markdown form of the masthead, prepended to text exports. */
export function letterheadMarkdown(cfg: LetterheadConfig): string {
  if (!cfg.enabled) return "";
  const lines: string[] = [];
  if (cfg.orgName.trim()) lines.push(`**${cfg.orgName.trim()}**`);
  for (const l of contactLines(cfg)) lines.push(l);
  if (lines.length === 0) return "";
  return lines.join("\n") + "\n\n---\n";
}

/** Markdown form of the signature block, appended to one-pager text exports. */
export function signatureMarkdown(cfg: LetterheadConfig): string {
  if (!cfg.showSignature) return "";
  const signers = activeSigners(cfg);
  if (signers.length === 0) return "";
  const blocks = signers.map((s) => {
    const sig = s.mode === "text" && s.typed.trim() ? s.typed.trim() : "";
    const rule = sig ? `*${sig}*` : "______________________________";
    const who = [s.name.trim(), s.title.trim(), s.org.trim()]
      .filter(Boolean)
      .join("\n");
    return `${rule}\n${who}`;
  });
  return `\n\n## Respectfully submitted\n\n${blocks.join("\n\n")}`;
}
