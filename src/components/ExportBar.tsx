import { useState } from "react";
import {
  copyText,
  downloadDoc,
  downloadMarkdown,
  markdownToHtml,
  printDocument,
} from "../lib/export";
import { refineWithAI, getApiKey } from "../lib/refine";

interface Props {
  /** full display text including the citations section — used for all exports */
  text: string;
  /** refinable body only (no citations) — what AI refine operates on */
  refineText: string;
  /** base filename without extension */
  filename: string;
  docTitle: string;
  /** short context string passed to the AI refine prompt */
  refineContext: string;
  onRefined: (text: string) => void;
}

type Status = { kind: "idle" | "ok" | "error" | "busy"; msg?: string };

export function ExportBar({
  text,
  refineText,
  filename,
  docTitle,
  refineContext,
  onRefined,
}: Props) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const flash = (kind: Status["kind"], msg: string) => {
    setStatus({ kind, msg });
    if (kind !== "busy") window.setTimeout(() => setStatus({ kind: "idle" }), 3500);
  };

  const onCopy = async () => {
    try {
      await copyText(text);
      flash("ok", "Copied to clipboard");
    } catch {
      flash("error", "Copy failed");
    }
  };

  const onRefine = async () => {
    if (!getApiKey()) {
      flash("error", "Add an API key in Settings to refine with AI");
      return;
    }
    setStatus({ kind: "busy", msg: "Refining with AI…" });
    try {
      const refined = await refineWithAI(refineText, refineContext);
      onRefined(refined);
      flash("ok", "Refined — review the changes");
    } catch (e) {
      flash("error", e instanceof Error ? e.message : "Refine failed");
    }
  };

  return (
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
      <button
        className="primary"
        onClick={onRefine}
        disabled={status.kind === "busy"}
      >
        {status.kind === "busy" ? "Refining…" : "✦ Refine with AI"}
      </button>
      {status.msg && status.kind !== "busy" && (
        <span className={`export-status ${status.kind}`}>{status.msg}</span>
      )}
    </div>
  );
}
