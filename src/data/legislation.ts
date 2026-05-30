import type { Category } from "../types";

/** Point-in-time snapshot of enacted state legislation. Surface this in the UI. */
export const LAST_UPDATED = "May 2026";

export const SOURCES =
  "State legislatures, the National Conference of State Legislatures (NCSL), law-firm trackers (Latham & Watkins, Alston & Bird, Duane Morris), the Satoshi Action Fund, Bitcoin Magazine, Decrypt, and CoinTelegraph.";

/**
 * Structured source list for the footer. URLs are attached only where the
 * official homepage is known with confidence; everything else is named without
 * a link rather than guessed, to keep the tool's citations trustworthy.
 */
export interface SourceLink {
  label: string;
  url?: string;
}

export const PRIMARY_SOURCES: SourceLink[] = [
  { label: "State legislatures — official bill & statute records" },
  {
    label: "National Conference of State Legislatures (NCSL)",
    url: "https://www.ncsl.org",
  },
  {
    label: "Uniform Law Commission — UCC Article 12",
    url: "https://www.uniformlaws.org",
  },
  {
    label: "FDIC National Survey of Unbanked & Underbanked Households",
    url: "https://www.fdic.gov/household-survey",
  },
  {
    label: "U.S. Census Bureau — population estimates",
    url: "https://www.census.gov",
  },
  {
    label: "U.S. Bureau of Labor Statistics — Local Area Unemployment Statistics",
    url: "https://www.bls.gov/lau/",
  },
];

export const SECONDARY_SOURCES: SourceLink[] = [
  { label: "Satoshi Action Fund" },
  { label: "Law-firm trackers — Latham & Watkins, Alston & Bird, Duane Morris" },
  { label: "Industry press — Bitcoin Magazine, Decrypt, CoinTelegraph" },
];

/**
 * The categories of pro-crypto / digital-asset legislation, each carrying the
 * list of states that have ALREADY enacted it. A state's "gap" in a category is
 * simply that it does not appear in `enacted`. Data is stored here (not as
 * logic) so it stays auditable — accuracy is load-bearing for this tool.
 */
export const CATEGORIES: Category[] = [
  {
    id: "reserve",
    name: "Strategic Bitcoin & Digital Asset Reserve",
    short: "Bitcoin Reserve",
    summary:
      "Authorizes the state to hold Bitcoin or other digital assets as part of its treasury or reserve strategy as a hedge against inflation.",
    rarity: "rare",
    enacted: [
      { state: "NH", label: "HB 302", sourceUrl: "https://www.gencourt.state.nh.us/bill_status/billinfo.aspx?id=1759&inflect=2" },
      { state: "AZ", label: "HB 2749", sourceUrl: "https://www.azleg.gov/legtext/57leg/1R/laws/0150.htm" },
      { state: "TX", label: "SB 21 / HB 4488", sourceUrl: "https://capitol.texas.gov/BillLookup/History.aspx?LegSess=89R&Bill=SB21" },
    ],
  },
  {
    id: "self-custody",
    name: "Digital Asset Rights & Self-Custody Protections",
    short: "Self-Custody Rights",
    summary:
      "Protects citizens' rights to self-custody digital assets, run nodes, and stake; bans state acceptance of a CBDC; guards against unlawful de-banking.",
    rarity: "moderate",
    enacted: [
      { state: "KY", label: "HB 701", sourceUrl: "https://apps.legislature.ky.gov/record/25rs/hb701.html" },
      { state: "UT", label: "HB 0230", sourceUrl: "https://le.utah.gov/~2025/bills/static/HB0230.html" },
      { state: "AZ", label: "HB 2342", sourceUrl: "https://www.azleg.gov/legtext/57leg/1r/bills/hb2342h.pdf" },
      { state: "MT", label: "SB 265", sourceUrl: "https://archive.legmt.gov/content/Sessions/69th/Contractor_index/CH0379.pdf" },
      { state: "WY", label: "HB 0308", sourceUrl: "https://www.wyoleg.gov/Legislation/2025/HB0308" },
      { state: "SC", label: "S.163", sourceUrl: "https://www.scstatehouse.gov/sess126_2025-2026/bills/163.htm" },
    ],
  },
  {
    id: "mining",
    name: "Mining Rights & Tax Incentives",
    short: "Mining Rights",
    summary:
      "Protects digital-asset mining from discriminatory zoning, utility rates, and taxes, and/or provides tax incentives for mining operations.",
    rarity: "moderate",
    enacted: [
      { state: "KY", label: "HB 230 / SB 255", sourceUrl: "https://apps.legislature.ky.gov/record/21rs/hb230.html" },
      { state: "MT", label: "SB 178", sourceUrl: "https://archive.legmt.gov/bills/2023/billpdf/SB0178.pdf" },
      { state: "AR", label: "HB 1799", sourceUrl: "https://arkleg.state.ar.us/Bills/Detail?id=hb1799&ddBienniumSession=2023/2023R" },
      { state: "SC", label: "S.163", sourceUrl: "https://www.scstatehouse.gov/sess126_2025-2026/bills/163.htm" },
    ],
  },
  {
    id: "stablecoin-bank",
    name: "Stablecoins & Digital Banking",
    short: "Stablecoin / Digital Bank",
    summary:
      "Establishes a legal framework for a state-backed stablecoin and/or charters a new category of digital-asset depository bank.",
    rarity: "rare",
    enacted: [
      { state: "WY", label: "Stable Token Act (SF0127)", sourceUrl: "https://www.wyoleg.gov/Legislation/2023/SF0127" },
      { state: "NE", label: "LB 649", sourceUrl: "https://nebraskalegislature.gov/FloorDocs/107/PDF/Intro/LB649.pdf" },
    ],
  },
  {
    id: "dao",
    name: "DAO Recognition & Legal Frameworks",
    short: "DAO Recognition",
    summary:
      "Grants legal standing and limited liability to Decentralized Autonomous Organizations, e.g. a dedicated DAO LLC or nonprofit-association category.",
    rarity: "rare",
    enacted: [
      { state: "WY", label: "DAO LLC (2021) & DUNA Act (SF0050, 2024)", sourceUrl: "https://www.wyoleg.gov/Legislation/2024/SF0050" },
      { state: "TN", label: "DAO LLC (SB 2854 / HB 2645, 2022)", sourceUrl: "https://wapp.capitol.tn.gov/apps/BillInfo/Default.aspx?BillNumber=SB2854&GA=112" },
    ],
  },
  {
    id: "property",
    name: "General Property Rights & Digital Asset Legal Frameworks",
    short: "Property Rights",
    summary:
      "Defines digital assets as property under state law and establishes foundational definitions and ownership-dispute rules for the industry.",
    rarity: "moderate",
    enacted: [
      { state: "TX", label: "HB 4474", sourceUrl: "https://capitol.texas.gov/BillLookup/History.aspx?LegSess=87R&Bill=HB4474" },
      { state: "NE", label: "LB 649", sourceUrl: "https://nebraskalegislature.gov/FloorDocs/107/PDF/Intro/LB649.pdf" },
    ],
  },
  {
    id: "ucc-12",
    name: "UCC Article 12 Amendments (Controllable Electronic Records)",
    short: "UCC Article 12",
    summary:
      "Adopts the 2022 UCC amendments creating Article 12 'Controllable Electronic Records,' giving crypto take-free commercial property rules like cash.",
    rarity: "common",
    enacted: [
      { state: "AL", label: "enacted 2023" },
      { state: "CA", label: "enacted 2023" },
      { state: "CO", label: "enacted 2022–2023" },
      { state: "DE", label: "enacted Aug 2023" },
      { state: "GA", label: "enacted 2023–2024" },
      { state: "HI", label: "enacted 2022–2023" },
      { state: "IL", label: "enacted Feb 2025" },
      { state: "IN", label: "enacted 2022–2023" },
      { state: "IA", label: "enacted 2022" },
      { state: "KY", label: "enacted 2024" },
      { state: "LA", label: "enacted Jun 2024" },
      { state: "ME", label: "enacted Apr 2024" },
      { state: "MN", label: "enacted 2024" },
      { state: "NE", label: "enacted 2022" },
      { state: "NV", label: "enacted 2022–2023" },
      { state: "NH", label: "enacted 2023" },
      { state: "NM", label: "enacted 2022–2023" },
      { state: "NY", label: "AB 3307-A / SB 1840-A (eff. Jun 2026)" },
      { state: "ND", label: "enacted 2022–2023" },
      { state: "OK", label: "enacted 2024" },
      { state: "OR", label: "SB 167 (May 2025)" },
      { state: "PA", label: "enacted 2024" },
      { state: "RI", label: "enacted Jun 2024" },
      { state: "SD", label: "enacted 2023" },
      { state: "TN", label: "enacted 2023" },
      { state: "VA", label: "enacted Apr 2024" },
      { state: "WA", label: "enacted 2022–2023" },
      { state: "DC", label: "enacted 2023" },
    ],
  },
  {
    id: "tax-acceptance",
    name: "State Acceptance of Crypto for Taxes & Fees",
    short: "Crypto Tax Payments",
    summary:
      "Authorizes or directs state agencies to accept cryptocurrency (via a converting payment processor) for taxes, fees, and other amounts owed to the state.",
    rarity: "rare",
    enacted: [
      { state: "CO", label: "DOR crypto acceptance (2022)", sourceUrl: "https://tax.colorado.gov/cryptocurrency" },
      { state: "UT", label: "statewide crypto payment program", sourceUrl: "https://tax.utah.gov/billing/payment-fees" },
      { state: "LA", label: "crypto for state services (2024)", sourceUrl: "https://www.govtech.com/products/louisiana-treasurer-says-state-services-can-be-paid-with-crypto" },
    ],
  },
  {
    id: "escheatment",
    name: "In-Kind Digital-Asset Escheatment",
    short: "In-Kind Escheatment",
    summary:
      "Requires the state to hold unclaimed (escheated) digital assets in their native form rather than force-liquidating them, preserving the owner's upside.",
    rarity: "rare",
    enacted: [
      { state: "CA", label: "SB 822 (2025)", sourceUrl: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB822" },
      { state: "VA", label: "HB 798 (2025)", sourceUrl: "https://lis.virginia.gov/bill-details/20251/HB798" },
    ],
  },
  {
    id: "retirement",
    name: "Retirement & Pension Digital-Asset Authority",
    short: "Retirement / Pension",
    summary:
      "Permits state-administered retirement, 529, and defined-contribution plans to offer participant-directed digital-asset or digital-asset ETP investment options.",
    rarity: "rare",
    enacted: [{ state: "IN", label: "HB 1042 (2026)", sourceUrl: "https://iga.in.gov/legislative/2026/bills/house/1042/details" }],
  },
  {
    id: "blockchain-records",
    name: "Blockchain Records, Signatures & Smart Contracts",
    short: "Blockchain Records",
    summary:
      "Gives legal recognition to blockchain-secured signatures and records and confirms the enforceability of smart contracts under state law.",
    rarity: "moderate",
    enacted: [
      { state: "AZ", label: "HB 2417 (2017)", sourceUrl: "https://www.azleg.gov/legtext/53leg/1r/bills/hb2417p.pdf" },
      { state: "IL", label: "Blockchain Technology Act (2019)", sourceUrl: "https://ilga.gov/legislation/BillStatus.asp?GA=101&SessionID=108&DocTypeID=HB&DocNum=3575" },
    ],
  },
];
