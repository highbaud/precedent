const DISCLAIMER =
  "DISCLAIMER: This is model legislative text generated for advocacy purposes. It is not legal advice. Verify all provisions against current state statutes and consult qualified legislative counsel before filing.";

function downloadBlob(content: string, mime: string, filename: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function copyText(text: string): Promise<void> {
  await navigator.clipboard.writeText(`${text}\n\n---\n${DISCLAIMER}`);
}

export function downloadMarkdown(text: string, filename: string): void {
  downloadBlob(`${text}\n\n---\n\n> ${DISCLAIMER}\n`, "text/markdown;charset=utf-8", filename);
}

/**
 * Minimal HTML-to-Word export: a Word-compatible HTML Blob saved as .doc. Zero
 * dependencies and opens cleanly in Microsoft Word / Google Docs. (The `docx`
 * npm library is a clean later upgrade if true .docx fidelity is needed.)
 */
export function downloadDoc(title: string, bodyHtml: string, filename: string): void {
  const html = `<!DOCTYPE html><html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8"><title>${escapeHtml(title)}</title>
<style>body{font-family:Georgia,serif;font-size:12pt;line-height:1.5;color:#111}h1{font-size:18pt}h2{font-size:14pt}.disclaimer{color:#666;font-size:9pt;border-top:1px solid #ccc;margin-top:24pt;padding-top:8pt}</style>
</head><body>${bodyHtml}<p class="disclaimer">${escapeHtml(DISCLAIMER)}</p></body></html>`;
  downloadBlob(html, "application/msword", filename);
}

export function printDocument(): void {
  window.print();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Convert the lightweight markdown used in templates to HTML for .doc/print. */
export function markdownToHtml(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let inList = false;
  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line === "---") {
      closeList();
      out.push("<hr>");
    } else if (line.startsWith("# ")) {
      closeList();
      out.push(`<h1>${inline(line.slice(2))}</h1>`);
    } else if (line.startsWith("## ")) {
      closeList();
      out.push(`<h2>${inline(line.slice(3))}</h2>`);
    } else if (line.startsWith("- ")) {
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${inline(line.slice(2))}</li>`);
    } else if (line === "") {
      closeList();
    } else {
      closeList();
      out.push(`<p>${inline(line)}</p>`);
    }
  }
  closeList();
  return out.join("\n");
}

function inline(s: string): string {
  // Render [text](url) links before escaping the surrounding text.
  const parts = s.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts
    .map((p) => {
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(p);
      if (link) {
        return `<a href="${escapeHtml(link[2])}">${escapeHtml(link[1])}</a>`;
      }
      return escapeHtml(p).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    })
    .join("");
}
