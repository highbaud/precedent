import type { StateCode } from "../types";

/**
 * Verified per-state demographic indicators that bear on the case for
 * pro–digital-asset legislation. EVERY figure here is drawn directly from an
 * official source table — none are estimated, modeled, or interpolated. If a
 * value cannot be sourced, it is omitted rather than guessed, because this is a
 * legislator-facing tool where a wrong number destroys credibility.
 *
 * Sources:
 *  - Unbanked & underbanked rates: FDIC National Survey of Unbanked and
 *    Underbanked Households (2023), Appendix Tables A.3 (unbanked by state) and
 *    G.2 (underbanked by state). https://www.fdic.gov/household-survey
 *  - Population: U.S. Census Bureau, Annual Estimates of the Resident
 *    Population (NST-EST2024-POP), 2024 vintage.
 *  - Unemployment rate: U.S. Bureau of Labor Statistics, Local Area
 *    Unemployment Statistics (LAUS), seasonally adjusted, retrieved live from
 *    the BLS public Data API (series LASST<FIPS>0000000000003). Values reflect
 *    the latest month BLS had published at compile time; see
 *    DEMOGRAPHICS_META.unemploymentPeriod.
 *  - International goods trade (exports & imports): U.S. Census Bureau, Foreign
 *    Trade Division, full calendar year 2024. Exports use Exhibit 2 "Origin of
 *    Movement of U.S. Exports of Goods by State"; imports use Exhibit 2a "U.S.
 *    General Imports of Goods by State of Destination" (December 2024 monthly
 *    exhibit, annual column). Exhibit U.S. totals ($2.065T exports / $3.267T
 *    imports) match the published 2024 Census-basis goods totals. Figures are
 *    reported by Census in millions; stored here as raw USD.
 *
 * The "underbanked" definition is FDIC's 2023 definition (households with a
 * bank account that also used a nonbank money order, check cashing, remittance,
 * rent-to-own, payday/pawn/auto-title/refund-anticipation product in the prior
 * year). It is NOT directly comparable to pre-2023 figures.
 */
export interface StateDemographics {
  /** Resident population (Census 2024 estimate). */
  population: number;
  /** % of households with no bank account (FDIC 2023, Table A.3). */
  unbankedRate: number;
  /** % of banked households that are underbanked (FDIC 2023, Table G.2). */
  underbankedRate: number;
  /** Seasonally-adjusted unemployment rate, % (BLS LAUS, latest published month). */
  unemploymentRate: number;
  /** Total goods exports in USD (Census 2024, origin of movement). */
  exports: number;
  /** Total goods imports in USD (Census 2024, state of destination). */
  imports: number;
}

export const DEMOGRAPHICS_META = {
  fdicSurveyYear: 2023,
  fdicSource:
    "FDIC National Survey of Unbanked and Underbanked Households (2023), Appendix Tables A.3 and G.2",
  fdicSourceUrl: "https://www.fdic.gov/household-survey",
  populationYear: 2024,
  populationSource:
    "U.S. Census Bureau, Annual Estimates of the Resident Population (NST-EST2024-POP)",
  populationSourceUrl:
    "https://www2.census.gov/programs-surveys/popest/tables/2020-2024/state/totals/NST-EST2024-POP.xlsx",
  unemploymentPeriod: "April 2026",
  blsSource:
    "U.S. Bureau of Labor Statistics, Local Area Unemployment Statistics (seasonally adjusted)",
  blsSourceUrl: "https://www.bls.gov/lau/",
  tradeYear: 2024,
  tradeSource:
    "U.S. Census Bureau, Foreign Trade Division — Exhibit 2 (Origin of Movement of U.S. Exports by State) and Exhibit 2a (U.S. General Imports by State of Destination), full-year 2024",
  tradeExportsSourceUrl:
    "https://www.census.gov/foreign-trade/statistics/state/origin_movement/index.html",
  tradeImportsSourceUrl:
    "https://www.census.gov/foreign-trade/statistics/state/destination_state/index.html",
} as const;

/** National reference points (FDIC 2023) for context against state figures. */
export const NATIONAL_BENCHMARKS = {
  unbankedRate: 4.2,
  underbankedRate: 14.2,
  /** % of U.S. households that owned or used crypto in the prior 12 months. */
  cryptoOwnership: 4.8,
  cryptoOwnershipNote:
    "Share of U.S. households that owned or used crypto in the prior 12 months — FDIC 2023, Table F.1. No reliable per-state crypto-ownership figure is published, so none is shown by state.",
  /** National unemployment rate, % (BLS, seasonally adjusted, same month as state figures). */
  unemploymentRate: 4.3,
} as const;

export const DEMOGRAPHICS: Record<StateCode, StateDemographics> = {
  AL: { population: 5157699, unbankedRate: 5.2, underbankedRate: 15.2, unemploymentRate: 2.8, exports: 26835275940, imports: 38756504228 },
  AK: { population: 740133, unbankedRate: 2.2, underbankedRate: 16.5, unemploymentRate: 4.7, exports: 5932522776, imports: 3631250175 },
  AZ: { population: 7582384, unbankedRate: 3.0, underbankedRate: 15.2, unemploymentRate: 4.7, exports: 32223149923, imports: 42242851659 },
  AR: { population: 3088354, unbankedRate: 6.4, underbankedRate: 16.1, unemploymentRate: 4.3, exports: 6893520636, imports: 7185733765 },
  CA: { population: 39431263, unbankedRate: 4.3, underbankedRate: 13.3, unemploymentRate: 5.3, exports: 183342980303, imports: 491478118747 },
  CO: { population: 5957493, unbankedRate: 1.1, underbankedRate: 13.2, unemploymentRate: 3.9, exports: 10504063559, imports: 16788192238 },
  CT: { population: 3675069, unbankedRate: 2.9, underbankedRate: 13.7, unemploymentRate: 5.0, exports: 17382116184, imports: 22738278189 },
  DE: { population: 1051917, unbankedRate: 3.5, underbankedRate: 12.1, unemploymentRate: 5.3, exports: 4706439284, imports: 10621438976 },
  FL: { population: 23372215, unbankedRate: 3.2, underbankedRate: 14.8, unemploymentRate: 4.8, exports: 72167896653, imports: 117182379238 },
  GA: { population: 11180878, unbankedRate: 7.0, underbankedRate: 17.1, unemploymentRate: 3.5, exports: 53132659372, imports: 145588685254 },
  HI: { population: 1446146, unbankedRate: 3.5, underbankedRate: 13.5, unemploymentRate: 2.5, exports: 460701699, imports: 2170910226 },
  ID: { population: 2001619, unbankedRate: 2.5, underbankedRate: 17.6, unemploymentRate: 3.6, exports: 4248785396, imports: 8936179004 },
  IL: { population: 12710158, unbankedRate: 6.6, underbankedRate: 13.2, unemploymentRate: 5.1, exports: 80816530582, imports: 218141786195 },
  IN: { population: 6924275, unbankedRate: 4.8, underbankedRate: 13.8, unemploymentRate: 3.2, exports: 59867697549, imports: 106748236970 },
  IA: { population: 3241488, unbankedRate: 1.6, underbankedRate: 10.5, unemploymentRate: 3.3, exports: 16974468345, imports: 12464486072 },
  KS: { population: 2970606, unbankedRate: 3.4, underbankedRate: 14.7, unemploymentRate: 3.9, exports: 14365536853, imports: 14484473967 },
  KY: { population: 4588372, unbankedRate: 5.8, underbankedRate: 11.1, unemploymentRate: 4.3, exports: 47773811680, imports: 94523501376 },
  LA: { population: 4597740, unbankedRate: 8.0, underbankedRate: 15.0, unemploymentRate: 4.4, exports: 86950707189, imports: 31462498311 },
  ME: { population: 1405012, unbankedRate: 2.6, underbankedRate: 14.1, unemploymentRate: 3.1, exports: 3062192387, imports: 6734020743 },
  MD: { population: 6263220, unbankedRate: 3.4, underbankedRate: 12.3, unemploymentRate: 4.4, exports: 17855001050, imports: 42688137859 },
  MA: { population: 7136171, unbankedRate: 2.8, underbankedRate: 12.9, unemploymentRate: 4.7, exports: 34863466051, imports: 43251667099 },
  MI: { population: 10140459, unbankedRate: 3.2, underbankedRate: 11.8, unemploymentRate: 5.0, exports: 61562819519, imports: 173160953535 },
  MN: { population: 5793151, unbankedRate: 1.7, underbankedRate: 7.8, unemploymentRate: 4.5, exports: 26560691983, imports: 40635118124 },
  MS: { population: 2943045, unbankedRate: 9.4, underbankedRate: 18.8, unemploymentRate: 3.8, exports: 13690041898, imports: 21399545811 },
  MO: { population: 6245466, unbankedRate: 3.4, underbankedRate: 17.7, unemploymentRate: 3.8, exports: 19389495937, imports: 24311936035 },
  MT: { population: 1137233, unbankedRate: 2.0, underbankedRate: 12.9, unemploymentRate: 3.5, exports: 2371201628, imports: 7372264324 },
  NE: { population: 2005465, unbankedRate: 2.5, underbankedRate: 11.3, unemploymentRate: 3.0, exports: 8160619467, imports: 6018431327 },
  NV: { population: 3267467, unbankedRate: 6.1, underbankedRate: 12.3, unemploymentRate: 5.3, exports: 10360730804, imports: 18822461639 },
  NH: { population: 1409032, unbankedRate: 1.1, underbankedRate: 8.7, unemploymentRate: 3.1, exports: 7122750116, imports: 10206029191 },
  NJ: { population: 9500851, unbankedRate: 4.7, underbankedRate: 17.3, unemploymentRate: 4.8, exports: 42931856113, imports: 152968109537 },
  NM: { population: 2130256, unbankedRate: 5.3, underbankedRate: 20.8, unemploymentRate: 4.9, exports: 12002309100, imports: 9140676650 },
  NY: { population: 19867248, unbankedRate: 5.1, underbankedRate: 15.4, unemploymentRate: 4.6, exports: 91243498936, imports: 159748112741 },
  NC: { population: 11046024, unbankedRate: 3.5, underbankedRate: 12.1, unemploymentRate: 3.7, exports: 42823944026, imports: 87610649065 },
  ND: { population: 796568, unbankedRate: 1.7, underbankedRate: 13.4, unemploymentRate: 2.4, exports: 5531452434, imports: 4274879973 },
  OH: { population: 11883304, unbankedRate: 4.2, underbankedRate: 12.8, unemploymentRate: 3.9, exports: 56579107502, imports: 86906872600 },
  OK: { population: 4095393, unbankedRate: 6.2, underbankedRate: 18.1, unemploymentRate: 4.0, exports: 7745710882, imports: 17959980726 },
  OR: { population: 4272371, unbankedRate: 2.0, underbankedRate: 13.3, unemploymentRate: 5.2, exports: 34062006094, imports: 28231764118 },
  PA: { population: 13078751, unbankedRate: 3.0, underbankedRate: 11.3, unemploymentRate: 4.2, exports: 53187101140, imports: 127324590609 },
  RI: { population: 1112308, unbankedRate: 2.9, underbankedRate: 13.8, unemploymentRate: 4.5, exports: 3074549603, imports: 11144208174 },
  SC: { population: 5478831, unbankedRate: 5.3, underbankedRate: 14.3, unemploymentRate: 4.8, exports: 38027443519, imports: 58063745661 },
  SD: { population: 924669, unbankedRate: 3.8, underbankedRate: 7.7, unemploymentRate: 2.2, exports: 2112601659, imports: 1688920708 },
  TN: { population: 7227750, unbankedRate: 5.7, underbankedRate: 13.6, unemploymentRate: 3.6, exports: 38947642022, imports: 120334841368 },
  TX: { population: 31290831, unbankedRate: 6.5, underbankedRate: 18.5, unemploymentRate: 4.3, exports: 455031448003, imports: 397175358273 },
  UT: { population: 3503613, unbankedRate: 1.2, underbankedRate: 12.8, unemploymentRate: 3.8, exports: 18213008432, imports: 21919376500 },
  VT: { population: 648493, unbankedRate: 0.9, underbankedRate: 10.2, unemploymentRate: 2.6, exports: 1865157886, imports: 3526169507 },
  VA: { population: 8811195, unbankedRate: 0.9, underbankedRate: 12.5, unemploymentRate: 3.8, exports: 21780042104, imports: 40755947018 },
  WA: { population: 7958180, unbankedRate: 1.8, underbankedRate: 15.4, unemploymentRate: 5.2, exports: 57776271927, imports: 62097314404 },
  WV: { population: 1769979, unbankedRate: 4.3, underbankedRate: 14.0, unemploymentRate: 4.4, exports: 4857039342, imports: 4835109764 },
  WI: { population: 5960975, unbankedRate: 2.0, underbankedRate: 10.0, unemploymentRate: 3.5, exports: 27513550226, imports: 38859007612 },
  WY: { population: 587618, unbankedRate: 1.8, underbankedRate: 15.2, unemploymentRate: 3.5, exports: 2067786416, imports: 1315109362 },
  DC: { population: 702250, unbankedRate: 7.2, underbankedRate: 17.0, unemploymentRate: 6.2, exports: 2718181788, imports: 1713113757 },
};
