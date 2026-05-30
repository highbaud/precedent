interface Props {
  text: string;
  /** rendered before the body (e.g. letterhead masthead) */
  before?: React.ReactNode;
  /** rendered after the body (e.g. signature block) */
  after?: React.ReactNode;
}

/** Renders the lightweight markdown used in templates into a printable doc. */
export function ProposalDoc({ text, before, after }: Props) {
  return (
    <div className="proposal-doc">
      {before}
      {renderBlocks(text)}
      {after}
    </div>
  );
}

export function renderBlocks(md: string) {
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
    if (line === "---") {
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
