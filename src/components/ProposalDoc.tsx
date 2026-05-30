interface Props {
  text: string;
  /** extra class on the doc wrapper (e.g. "cover-letter") */
  className?: string;
  /** rendered before the body (e.g. letterhead masthead) */
  before?: React.ReactNode;
  /** rendered after the body (e.g. signature block) */
  after?: React.ReactNode;
  /** node injected wherever a [[DATA]] marker appears (chart panel) */
  dataSlot?: React.ReactNode;
  /**
   * Layout variant. "qa" groups each `## "Question"` heading and the prose that
   * follows it into a self-contained objection/response card (used by the
   * Q&A / Rebuttals mode); the default flows the markdown as a continuous doc.
   */
  variant?: "qa";
}

/** Renders the lightweight markdown used in templates into a printable doc. */
export function ProposalDoc({
  text,
  className,
  before,
  after,
  dataSlot,
  variant,
}: Props) {
  return (
    <div className={className ? `proposal-doc ${className}` : "proposal-doc"}>
      {before}
      {variant === "qa" ? renderQA(text) : renderBlocks(text, dataSlot)}
      {after}
    </div>
  );
}

export function renderBlocks(md: string, dataSlot?: React.ReactNode) {
  const lines = md.split("\n");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  let key = 0;

  const flushList = () => {
    if (list.length) {
      blocks.push(
        <ul key={key++}>
          {list.map((item, i) => (
            <li key={i}>{inline(item)}</li>
          ))}
        </ul>
      );
      list = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line === "[[DATA]]") {
      flushList();
      if (dataSlot)
        blocks.push(
          <div className="doc-data" key={key++}>
            {dataSlot}
          </div>
        );
    } else if (line === "---") {
      flushList();
      blocks.push(<hr key={key++} />);
    } else if (line.startsWith("# ")) {
      flushList();
      blocks.push(<h1 key={key++}>{inline(line.slice(2))}</h1>);
    } else if (line.startsWith("## ")) {
      flushList();
      blocks.push(<h2 key={key++}>{inline(line.slice(3))}</h2>);
    } else if (line.startsWith("- ")) {
      list.push(line.slice(2));
    } else if (line === "") {
      flushList();
    } else {
      flushList();
      blocks.push(<p key={key++}>{inline(line)}</p>);
    }
  }
  flushList();
  return blocks;
}

/**
 * Q&A / Rebuttals layout. Each `## "Question"` heading opens an objection card:
 * the quoted objection sits in a tinted header, and the prose that follows is
 * its response body. Any other `## ` heading (e.g. "Sources & precedent" that
 * buildSources appends) and its list render as a normal section, so citations
 * still travel with the document.
 */
export function renderQA(md: string) {
  const lines = md.split("\n");
  const blocks: React.ReactNode[] = [];
  let key = 0;

  // Current open card (an objection + its response body).
  let cardQ: string | null = null;
  let cardBody: React.ReactNode[] = [];
  let cardList: string[] = [];
  // Top-level list buffer, used outside cards (e.g. the Sources list).
  let topList: string[] = [];

  const flushCardList = () => {
    if (cardList.length) {
      cardBody.push(
        <ul key={`cul${key++}`}>
          {cardList.map((it, i) => (
            <li key={i}>{inline(it)}</li>
          ))}
        </ul>
      );
      cardList = [];
    }
  };
  const flushCard = () => {
    flushCardList();
    if (cardQ !== null) {
      blocks.push(
        <div className="qa-card" key={key++}>
          <div className="qa-head">
            <span className="qa-tag">Objection</span>
            <h3 className="qa-question">{inline(cardQ)}</h3>
          </div>
          <div className="qa-body">
            <span className="qa-resp">Response</span>
            {cardBody}
          </div>
        </div>
      );
      cardQ = null;
      cardBody = [];
    }
  };
  const flushTopList = () => {
    if (topList.length) {
      blocks.push(
        <ul key={key++}>
          {topList.map((it, i) => (
            <li key={i}>{inline(it)}</li>
          ))}
        </ul>
      );
      topList = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.startsWith("# ")) {
      flushCard();
      flushTopList();
      blocks.push(<h1 key={key++}>{inline(line.slice(2))}</h1>);
    } else if (line.startsWith("## ")) {
      const heading = line.slice(3);
      const isObjection = /^\s*["“]/.test(heading);
      flushCard();
      flushTopList();
      if (isObjection) {
        cardQ = heading;
      } else {
        blocks.push(<h2 key={key++}>{inline(heading)}</h2>);
      }
    } else if (line === "---") {
      flushCard();
      flushTopList();
      blocks.push(<hr key={key++} />);
    } else if (line.startsWith("- ")) {
      if (cardQ !== null) cardList.push(line.slice(2));
      else topList.push(line.slice(2));
    } else if (line === "") {
      flushCardList();
      flushTopList();
    } else if (cardQ !== null) {
      flushCardList();
      cardBody.push(<p key={`cp${key++}`}>{inline(line)}</p>);
    } else {
      flushTopList();
      const isLede = /^\*\*.*\*\*$/.test(line);
      blocks.push(
        <p className={isLede ? "qa-lede" : undefined} key={key++}>
          {inline(line)}
        </p>
      );
    }
  }
  flushCard();
  flushTopList();
  return blocks;
}

/** Render **bold** spans and [text](url) links inline. */
function inline(s: string): React.ReactNode {
  // Split on links first, then bold within the non-link segments.
  const parts = s.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((p, i) => {
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(p);
    if (link) {
      return (
        <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer">
          {link[1]}
        </a>
      );
    }
    return <span key={i}>{bold(p)}</span>;
  });
}

function bold(s: string): React.ReactNode {
  const parts = s.split(/(\*\*.+?\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i}>{p.slice(2, -2)}</strong>
    ) : (
      p
    )
  );
}
