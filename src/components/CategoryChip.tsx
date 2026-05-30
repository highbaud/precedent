import type { Category, Rarity } from "../types";

interface Props {
  category: Category;
  state: "enacted" | "gap";
  active?: boolean;
  onClick?: () => void;
  /** short ease-of-passage label, e.g. "Easiest win" (gaps only) */
  priority?: string;
}

const RARITY_LABEL: Record<Rarity, string> = {
  common: "common",
  moderate: "growing",
  rare: "frontier",
};

export function CategoryChip({ category, state, active, onClick, priority }: Props) {
  const isGap = state === "gap";
  return (
    <button
      type="button"
      className={`cat-chip ${state} ${active ? "active" : ""}`}
      onClick={onClick}
      disabled={!isGap}
      title={category.summary}
    >
      <span className="cc-mark" aria-hidden>
        {isGap ? "＋" : "✓"}
      </span>
      <span className="cc-text">
        <span className="cc-name">{category.short}</span>
        <span className="cc-tags">
          {isGap && priority && <span className="cc-priority">{priority}</span>}
          {isGap && (
            <span className={`cc-rarity r-${category.rarity}`}>
              {RARITY_LABEL[category.rarity]}
            </span>
          )}
        </span>
      </span>
    </button>
  );
}
