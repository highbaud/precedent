import { useState } from "react";
import {
  copyText,
  downloadDoc,
  downloadMarkdown,
  markdownToHtml,
  printDocument,
} from "../lib/export";

interface Props {
  /** full display text including the citations section — used for all exports */
  text: string;
  /** base filename without extension */
  filename: string;
  docTitle: string;
}

type Status = { kind: "idle" | "ok" | "error"; msg?: string };

export function ExportBar({ text, filename, docTitle }: Props) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const flash = (kind: Status["kind"], msg: string) => {
    setStatus({ kind, msg });
    window.setTimeout(() => setStatus({ kind: "idle" }), 3500);
  };

  const onCopy = async () => {
    try {
      await copyText(text);
      flash("ok", "Copied to clipboard");
    } catch {
      flash("error", "Copy failed");
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
      {status.msg && (
        <span className={`export-status ${status.kind}`}>{status.msg}</span>
      )}
    </div>
  );
}
