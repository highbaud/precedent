import { renderBlocks } from "./ProposalDoc";

interface Props {
  /** Full state name, e.g. "California". */
  state: string;
  /** Session year for the header, e.g. "2026". */
  year: string;
  /** The "AN ACT …" caption that precedes the enacting clause. */
  caption: string;
  /** Enacting clause + numbered sections (the line-numbered body). */
  body: string;
  /** Sources & precedent, rendered as un-numbered drafting notes. */
  notes?: string;
}

const SECTION_RE = /^SECTION\s+\d+\./;
const ENACT_RE = /^BE IT ENACTED/i;

/**
 * Renders formal model-bill text the way a filed state bill appears: a centered
 * header block (jurisdiction, session, bill-number and sponsor placeholders), a
 * title caption, then the enacting clause and sections with sequential line
 * numbers in the left margin and a Times-style serif face. The look is the
 * deliverable for print / PDF; plain-text exports stay clean.
 */
export function BillDoc({ state, year, caption, body, notes }: Props) {
  const lines = body.split("\n");
  let n = 0;

  return (
    <div className="bill-doc">
      <div className="bill-header">
        <div className="bill-jurisdiction">{state.toUpperCase()} STATE LEGISLATURE</div>
        <div className="bill-session">{year} Regular Session</div>
        <div className="bill-numbers">
          <span>HOUSE / SENATE BILL NO. ______</span>
        </div>
        <div className="bill-sponsor">Introduced by ________________________</div>
      </div>

      <p className="bill-caption">{caption}</p>

      <div className="bill-body">
        {lines.map((raw, i) => {
          const blank = raw.trim() === "";
          const num = blank ? "" : String(++n);
          const isSection = SECTION_RE.test(raw.trim());
          const isEnact = ENACT_RE.test(raw.trim());
          const cls =
            "bill-line" +
            (blank ? " blank" : "") +
            (isSection ? " section" : "") +
            (isEnact ? " enact" : "");
          return (
            <div className={cls} key={i}>
              <span className="bill-lineno" aria-hidden="true">
                {num}
              </span>
              <span className="bill-linetext">{raw || " "}</span>
            </div>
          );
        })}
      </div>

      {notes && <div className="bill-notes">{renderBlocks(notes)}</div>}
    </div>
  );
}
