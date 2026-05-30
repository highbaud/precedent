export type CategoryId =
  | "reserve"
  | "self-custody"
  | "mining"
  | "stablecoin-bank"
  | "dao"
  | "property"
  | "ucc-12"
  | "tax-acceptance"
  | "escheatment"
  | "retirement"
  | "blockchain-records";

export type Rarity = "rare" | "moderate" | "common";

/** A real, enacted bill used as precedent for a category. */
export interface EnactedBill {
  state: StateCode;
  /** e.g. "HB 302", "SB 21 / HB 4488" */
  label: string;
  /** official source URL (state legislature page, statute, or ULC map) */
  sourceUrl?: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  /** short chip text for the dashboard */
  short: string;
  /** one-line "what this covers" */
  summary: string;
  rarity: Rarity;
  /** precedent set — the states that have enacted this category */
  enacted: EnactedBill[];
}

export type StateCode =
  | "AL" | "AK" | "AZ" | "AR" | "CA" | "CO" | "CT" | "DE" | "FL" | "GA"
  | "HI" | "ID" | "IL" | "IN" | "IA" | "KS" | "KY" | "LA" | "ME" | "MD"
  | "MA" | "MI" | "MN" | "MS" | "MO" | "MT" | "NE" | "NV" | "NH" | "NJ"
  | "NM" | "NY" | "NC" | "ND" | "OH" | "OK" | "OR" | "PA" | "RI" | "SC"
  | "SD" | "TN" | "TX" | "UT" | "VT" | "VA" | "WA" | "WV" | "WI" | "WY"
  | "DC";

export interface StateMeta {
  code: StateCode;
  name: string;
  /** e.g. "Texan" — used in persuasive copy */
  demonym: string;
}

export interface Gap {
  category: Category;
  /** full names of states that have already enacted this category */
  precedentStates: string[];
}

export interface StateReport {
  state: StateMeta;
  enactedCategories: Category[];
  gaps: Gap[];
  /** enacted / total categories, 0..1 */
  coverage: number;
}
