import type { StateCode, StateReport, Gap, Rarity } from "../types";
import { CATEGORIES } from "../data/legislation";
import { STATES, nameOf } from "../data/states";

/** Compute a state's enacted categories and remaining gaps. Pure. */
export function buildReport(code: StateCode): StateReport {
  const state = STATES.find((s) => s.code === code)!;
  const enactedCategories = [];
  const gaps: Gap[] = [];

  for (const category of CATEGORIES) {
    if (category.enacted.some((b) => b.state === code)) {
      enactedCategories.push(category);
    } else {
      gaps.push({
        category,
        precedentStates: category.enacted.map((b) => nameOf(b.state)),
      });
    }
  }

  // Surface the most winnable opportunities first.
  gaps.sort((a, b) => gapEase(b) - gapEase(a));

  return {
    state,
    enactedCategories,
    gaps,
    coverage: enactedCategories.length / CATEGORIES.length,
  };
}

const RARITY_WEIGHT: Record<Rarity, number> = {
  common: 3,
  moderate: 2,
  rare: 1,
};

/**
 * Ease-of-passage score for a gap: higher = easier. Driven by how widely the
 * category is already adopted (rarity) plus the number of precedent states an
 * advocate can point to. Purely heuristic, used for ordering and labeling.
 */
export function gapEase(gap: Gap): number {
  return RARITY_WEIGHT[gap.category.rarity] * 10 + Math.min(gap.precedentStates.length, 9);
}

/** Short priority label derived from {@link gapEase}. */
export function gapPriorityLabel(gap: Gap): string {
  const e = gapEase(gap);
  if (e >= 30) return "Easiest win";
  if (e >= 20) return "Strong momentum";
  return "Frontier";
}

/** UI nuance for a gap based on how widely the category has been adopted. */
export function rarityNote(rarity: Rarity): string {
  switch (rarity) {
    case "common":
      return "Widely adopted — strong precedent, low political risk.";
    case "moderate":
      return "Growing momentum — several states have led the way.";
    case "rare":
      return "Frontier policy — few precedents; an opportunity to lead.";
  }
}
