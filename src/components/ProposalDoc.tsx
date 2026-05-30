import { renderBlocks, renderQA } from "./renderDoc";

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
