import { useMemo, useState } from "react";
import type { StateReport } from "../types";
import type { LetterheadConfig } from "../lib/letterhead";
import { letterheadMarkdown, signatureMarkdown } from "../lib/letterhead";
import { buildPackage, type DocMode } from "../lib/render";
import {
  copyText,
  downloadDoc,
  downloadMarkdown,
  markdownToHtml,
  printDocument,
} from "../lib/export";
import { ProposalDoc } from "./ProposalDoc";
import { LetterheadView, SignatureView } from "./DocChrome";
import { LetterheadEditor } from "./LetterheadEditor";

interface Props {
  report: StateReport;
  letterhead: LetterheadConfig;
  onLetterhead: (cfg: LetterheadConfig) => void;
  onClose: () => void;
}

const MODES: { id: DocMode; label: string }[] = [
  { id: "coverLetter", label: "Cover letters" },
  { id: "formal", label: "Model bills" },
  { id: "objections", label: "Q&A / Rebuttals" },
];

export function FullPackage({ report, letterhead, onLetterhead, onClose }: Props) {
  const [mode, setMode] = useState<DocMode>("coverLetter");
  const [copied, setCopied] = useState(false);

  const body = useMemo(() => buildPackage(report, mode), [report, mode]);
  const isCoverLetter = mode === "coverLetter";
  const text =
    letterheadMarkdown(letterhead) +
    body +
    (isCoverLetter ? signatureMarkdown(letterhead) : "");

  const kind =
    mode === "coverLetter"
      ? "cover-letter-packet"
      : mode === "formal"
        ? "model-bill-packet"
        : "objection-packet";
  const filename = `${report.state.code}-${kind}`.toLowerCase();
  const docTitle = `${report.state.name} — Full-State Package (${
    MODES.find((m) => m.id === mode)!.label
  })`;

  const onCopy = async () => {
    try {
      await copyText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="proposal package">
      <div className="proposal-head">
        <div>
          <span className="proposal-eyebrow">
            {report.state.name} — full-state package
          </span>
          <p className="proposal-rarity">
            {report.gaps.length} proposal{report.gaps.length === 1 ? "" : "s"} in
            one document.
          </p>
        </div>
        <div className="toggle-group" role="tablist">
          {MODES.map((m) => (
            <button
              key={m.id}
              className={mode === m.id ? "on" : ""}
              onClick={() => setMode(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <ProposalDoc
        text={body}
        className={mode === "objections" ? "qa-doc" : undefined}
        variant={mode === "objections" ? "qa" : undefined}
        before={<LetterheadView cfg={letterhead} />}
        after={isCoverLetter ? <SignatureView cfg={letterhead} /> : null}
      />

      <LetterheadEditor
        cfg={letterhead}
        onChange={onLetterhead}
        allowSignature={isCoverLetter}
      />

      <div className="export-bar">
        <button onClick={onCopy}>Copy</button>
        <button onClick={() => printDocument()}>Print / PDF</button>
        <button onClick={() => downloadMarkdown(text, `${filename}.md`)}>
          Markdown
        </button>
        <button
          onClick={() =>
            downloadDoc(docTitle, markdownToHtml(text), `${filename}.doc`)
          }
        >
          Word (.doc)
        </button>
        <button className="ghost close-btn" onClick={onClose}>
          Close package
        </button>
        {copied && <span className="export-status ok">Copied to clipboard</span>}
      </div>
    </section>
  );
}
