/**
 * Key legislative contacts for advocacy outreach.
 *
 * ACCURACY NOTE: Officeholders change every election. The per-state entries
 * below link to *official institutional pages* (legislature directories,
 * committee rosters, governor / treasurer offices) and name *committees*, never
 * individuals — those stay correct across elections. Always confirm the current
 * officeholder on the linked page before sending anything. Committee URLs that
 * embed a session/biennium code can shift between sessions; the committee NAME
 * is the durable, verified part — fall back to the legislature homepage.
 */
import type { StateCode } from "../types";

export interface ContactLink {
  label: string;
  url: string;
}

/** A standing committee. `url` may be absent — reach it from the legislature homepage. */
export interface Committee {
  name: string;
  url?: string;
}

export interface StateContacts {
  /** main legislature homepage */
  legislature: string;
  /** "who represents me" lookup, if the state offers one */
  findLegislator?: string;
  /** governor's office */
  governor?: string;
  /** state treasurer (relevant for reserve / custody bills); omitted where no clear office exists */
  treasurer?: string;
  /** the "money" committee in the lower chamber (banking / financial services / commerce) */
  houseCommittee?: Committee;
  /** the "money" committee in the upper chamber */
  senateCommittee?: Committee;
}

/**
 * Who to contact for pro–digital-asset legislation, and why each role matters.
 * Durable guidance, not officeholder-specific.
 */
export type RoleIcon =
  | "pen"
  | "gavel"
  | "podium"
  | "users"
  | "coins"
  | "building";

export interface RoleGuide {
  role: string;
  /** one-line summary of the role for the card header */
  tag: string;
  why: string;
  icon: RoleIcon;
}

export const KEY_ROLES: RoleGuide[] = [
  {
    role: "Bill sponsor",
    tag: "A legislator who introduces the bill",
    why: "Every bill needs a prime sponsor. The best candidates already sit on a banking, commerce, or technology committee, or have spoken well of digital assets on the record.",
    icon: "pen",
  },
  {
    role: "Chair, House money committee",
    tag: "Banking / Financial Services / Commerce",
    why: "Most digital-asset bills are referred here first, and the chair decides whether the bill gets a hearing at all. Win the chair early or the bill never reaches the floor.",
    icon: "gavel",
  },
  {
    role: "Chair, Senate money committee",
    tag: "Banking / Commerce / Financial Institutions",
    why: "The Senate counterpart to the House chair. A bill has to clear committee in both chambers, so both chairs matter.",
    icon: "gavel",
  },
  {
    role: "Speaker of the House / Assembly",
    tag: "Sets the floor calendar",
    why: "Assigns bills to committees and decides what reaches a floor vote. Leadership backing can move a bill quickly; leadership indifference can leave it sitting.",
    icon: "podium",
  },
  {
    role: "Senate President / President Pro Tempore",
    tag: "Runs the upper chamber",
    why: "The Senate's counterpart to the Speaker, in charge of the Senate calendar and referrals.",
    icon: "podium",
  },
  {
    role: "Majority & Minority Leaders",
    tag: "Both chambers",
    why: "They count votes and shape where their caucus lands. Digital-asset policy often draws support from both parties, so brief both sides rather than one.",
    icon: "users",
  },
  {
    role: "State Treasurer",
    tag: "Reserve & custody bills",
    why: "The treasurer would administer any state Bitcoin holdings, which makes the office a natural ally and a credible witness on a reserve or custody bill.",
    icon: "coins",
  },
  {
    role: "Governor's policy staff",
    tag: "The signature at the end",
    why: "The governor signs or vetoes. Talking to policy staff early surfaces concerns while there is still time to address them in the text.",
    icon: "building",
  },
];

/** Always-available national resources — verified, stable directories. */
export const NATIONAL_RESOURCES: ContactLink[] = [
  {
    label: "NCSL — State Legislative Websites Directory",
    url: "https://www.ncsl.org/about-state-legislatures/state-legislative-websites-directory",
  },
  {
    label: "Open States — Find Your Legislators",
    url: "https://openstates.org/find_your_legislator/",
  },
  {
    label: "NCSL — Cryptocurrency / Digital Asset Legislation tracker",
    url: "https://www.ncsl.org/financial-services/cryptocurrency-2025-legislation",
  },
  {
    label: "National Governors Association — Governors Directory",
    url: "https://www.nga.org/governors/",
  },
  {
    label: "National Association of State Treasurers — Members",
    url: "https://nast.org/about-us/members/",
  },
];

/**
 * Per-state official contact pages. Institutional links only (no individual
 * names) so they survive elections. Compiled from verified official sources.
 *
 * Notes: TX has no elected Treasurer (functions moved to the Comptroller, 1996)
 * — omitted. NE and DC are unicameral; their single relevant committee is
 * listed under `senateCommittee`. CT, MA, ME, and WY use joint committees
 * serving both chambers (same committee under both fields).
 */
export const STATE_CONTACTS: Partial<Record<StateCode, StateContacts>> = {
  AL: {
    legislature: "https://www.legislature.state.al.us/",
    findLegislator: "https://alison.legislature.state.al.us/find-my-legislator",
    governor: "https://governor.alabama.gov/",
    treasurer: "https://treasury.alabama.gov/",
    houseCommittee: { name: "House Financial Services Committee" },
    senateCommittee: { name: "Senate Banking and Insurance Committee" },
  },
  AK: {
    legislature: "https://www.akleg.gov/",
    findLegislator: "https://www.akleg.gov/pages/legislators_by_session.php",
    governor: "https://gov.alaska.gov/",
    treasurer: "https://treasury.dor.alaska.gov/",
    houseCommittee: { name: "House Labor and Commerce Committee" },
    senateCommittee: { name: "Senate Labor and Commerce Committee" },
  },
  AZ: {
    legislature: "https://www.azleg.gov/",
    findLegislator: "https://www.azleg.gov/findmylegislator/",
    governor: "https://azgovernor.gov/",
    treasurer: "https://www.aztreasury.gov/",
    houseCommittee: { name: "House Commerce Committee", url: "https://www.azleg.gov/standing-committees/" },
    senateCommittee: { name: "Senate Finance Committee", url: "https://www.azleg.gov/standing-committees/" },
  },
  AR: {
    legislature: "https://www.arkleg.state.ar.us/",
    governor: "https://governor.arkansas.gov/",
    treasurer: "https://www.artreasury.gov/",
    houseCommittee: { name: "House Insurance and Commerce Committee", url: "https://www.arkleg.state.ar.us/Committees/Detail?code=890&ddBienniumSession=2023/2023R" },
    senateCommittee: { name: "Senate Insurance and Commerce Committee", url: "https://www.arkleg.state.ar.us/Committees/Detail?code=490&ddBienniumSession=2023/2023R" },
  },
  CA: {
    legislature: "https://www.legislature.ca.gov/",
    findLegislator: "https://findyourrep.legislature.ca.gov/",
    governor: "https://www.gov.ca.gov/",
    treasurer: "https://www.treasurer.ca.gov/",
    houseCommittee: { name: "Assembly Committee on Banking and Finance", url: "https://abnk.assembly.ca.gov/" },
    senateCommittee: { name: "Senate Banking and Financial Institutions Committee", url: "https://sbnk.senate.ca.gov/" },
  },
  CO: {
    legislature: "https://leg.colorado.gov/",
    findLegislator: "https://leg.colorado.gov/find-my-legislator",
    governor: "https://www.colorado.gov/governor",
    treasurer: "https://treasury.colorado.gov/",
    houseCommittee: { name: "House Business Affairs and Labor Committee", url: "https://leg.colorado.gov/committees/business-affairs-labor/2024" },
    senateCommittee: { name: "Senate Business, Labor, and Technology Committee", url: "https://leg.colorado.gov/committees/business-labor-technology/2024" },
  },
  CT: {
    legislature: "https://www.cga.ct.gov/",
    findLegislator: "https://www.cga.ct.gov/asp/menu/cgafindleg.asp",
    governor: "https://portal.ct.gov/governor",
    treasurer: "https://portal.ct.gov/OTT",
    houseCommittee: { name: "Banking Committee (joint)", url: "https://www.cga.ct.gov/ba/" },
    senateCommittee: { name: "Banking Committee (joint)", url: "https://www.cga.ct.gov/ba/" },
  },
  DE: {
    legislature: "https://legis.delaware.gov/",
    findLegislator: "https://legis.delaware.gov/FindMyLegislator",
    governor: "https://governor.delaware.gov/",
    treasurer: "https://treasurer.delaware.gov/",
    houseCommittee: { name: "House Economic Development/Banking/Insurance & Commerce Committee" },
    senateCommittee: { name: "Senate Banking, Business, Insurance & Technology Committee" },
  },
  FL: {
    legislature: "https://www.leg.state.fl.us/",
    findLegislator: "https://www.flsenate.gov/Senators/Find",
    governor: "https://www.flgov.com/",
    treasurer: "https://www.myfloridacfo.com/division/treasury",
    houseCommittee: { name: "House Insurance & Banking Subcommittee (under Commerce Committee)", url: "https://www.flhouse.gov/Sections/Committees/committees.aspx" },
    senateCommittee: { name: "Senate Banking and Insurance Committee", url: "https://www.flsenate.gov/Committees/Show/BI" },
  },
  GA: {
    legislature: "https://www.legis.ga.gov/",
    findLegislator: "https://www.legis.ga.gov/find-my-legislator",
    governor: "https://gov.georgia.gov/",
    treasurer: "https://ost.georgia.gov/",
    houseCommittee: { name: "House Banks and Banking Committee", url: "https://www.legis.ga.gov/committees/house" },
    senateCommittee: { name: "Senate Banking and Financial Institutions Committee", url: "https://www.legis.ga.gov/committees/senate" },
  },
  HI: {
    legislature: "https://www.capitol.hawaii.gov/",
    findLegislator: "https://www.capitol.hawaii.gov/legislature/findyourlegislator.aspx",
    governor: "https://governor.hawaii.gov/",
    houseCommittee: { name: "House Consumer Protection & Commerce Committee", url: "https://www.capitol.hawaii.gov/committeepage.aspx?comm=CPC" },
    senateCommittee: { name: "Senate Commerce and Consumer Protection Committee", url: "https://www.capitol.hawaii.gov/committeepage.aspx?comm=CPN" },
  },
  ID: {
    legislature: "https://legislature.idaho.gov/",
    findLegislator: "https://legislature.idaho.gov/legislators/whosmylegislator/",
    governor: "https://gov.idaho.gov/",
    treasurer: "https://www.sto.idaho.gov/",
    houseCommittee: { name: "House Business Committee", url: "https://legislature.idaho.gov/committees/housecommittees/" },
    senateCommittee: { name: "Senate Commerce and Human Resources Committee", url: "https://legislature.idaho.gov/committees/senatecommittees/" },
  },
  IL: {
    legislature: "https://www.ilga.gov/",
    findLegislator: "https://www.ilga.gov/mylegislator/",
    governor: "https://gov.illinois.gov/",
    treasurer: "https://www.illinoistreasurer.gov/",
    houseCommittee: { name: "House Financial Institutions and Licensing Committee", url: "https://www.ilga.gov/house/committees" },
    senateCommittee: { name: "Senate Financial Institutions Committee", url: "https://www.ilga.gov/senate/committees" },
  },
  IN: {
    legislature: "https://iga.in.gov/",
    findLegislator: "https://iga.in.gov/information/find-legislators",
    governor: "https://www.in.gov/gov/",
    treasurer: "https://www.in.gov/tos/",
    houseCommittee: { name: "House Committee on Financial Institutions", url: "https://iga.in.gov/2025/committees/house/financial-institutions" },
    senateCommittee: { name: "Senate Committee on Insurance and Financial Institutions", url: "https://iga.in.gov/2025/committees/senate/insurance-and-financial-institutions" },
  },
  IA: {
    legislature: "https://www.legis.iowa.gov/",
    findLegislator: "https://www.legis.iowa.gov/legislators/findRep",
    governor: "https://governor.iowa.gov/",
    treasurer: "https://www.iowatreasurer.gov/",
    houseCommittee: { name: "House Commerce Committee", url: "https://www.legis.iowa.gov/committees/committee?ga=91&groupID=696" },
    senateCommittee: { name: "Senate Commerce Committee", url: "https://www.legis.iowa.gov/committees/committee?ga=91&groupID=326" },
  },
  KS: {
    legislature: "https://www.kslegislature.gov/",
    findLegislator: "https://www.kslegislature.gov/li/b2025_26/members/",
    governor: "https://governor.kansas.gov/",
    treasurer: "https://kansasstatetreasurer.ks.gov/",
    houseCommittee: { name: "House Financial Institutions and Pensions Committee" },
    senateCommittee: { name: "Senate Financial Institutions and Insurance Committee", url: "https://www.kslegislature.gov/li/b2025_26/committees/ctte_s_fin_inst_ins_1/" },
  },
  KY: {
    legislature: "https://legislature.ky.gov/",
    findLegislator: "https://apps.legislature.ky.gov/findyourlegislation/findyourlegislator/Pages/index.aspx",
    governor: "https://governor.ky.gov/",
    treasurer: "https://treasury.ky.gov/",
    houseCommittee: { name: "House Banking & Insurance Committee", url: "https://legislature.ky.gov/Committees/Pages/Committee-Details.aspx?CommitteeRSN=85&CommitteeType=House+Standing+Committee" },
    senateCommittee: { name: "Senate Banking & Insurance Committee" },
  },
  LA: {
    legislature: "https://www.legis.la.gov/",
    findLegislator: "https://www.legis.la.gov/legis/FindMyLegislators.aspx",
    governor: "https://gov.louisiana.gov/",
    treasurer: "https://www.latreasury.com/",
    houseCommittee: { name: "House Commerce Committee", url: "https://house.louisiana.gov/h_cmtes/commerce" },
    senateCommittee: { name: "Senate Commerce, Consumer Protection, and International Affairs Committee", url: "https://senate.la.gov/Sen_Committees/Commerce" },
  },
  ME: {
    legislature: "https://legislature.maine.gov/",
    findLegislator: "https://legislature.maine.gov/house/house/MemberProfiles/ListAlpha",
    governor: "https://www.maine.gov/governor/mills/",
    treasurer: "https://www.maine.gov/treasurer/",
    houseCommittee: { name: "Joint Standing Committee on Health Coverage, Insurance and Financial Services", url: "https://legislature.maine.gov/new-committees-page/joint-standing-committee-on-health-coverage-insurance-and-financial-services" },
    senateCommittee: { name: "Joint Standing Committee on Health Coverage, Insurance and Financial Services", url: "https://legislature.maine.gov/new-committees-page/joint-standing-committee-on-health-coverage-insurance-and-financial-services" },
  },
  MD: {
    legislature: "https://mgaleg.maryland.gov/",
    findLegislator: "https://mgaleg.maryland.gov/mgawebsite/Members/District",
    governor: "https://governor.maryland.gov/",
    treasurer: "https://www.treasurer.state.md.us/",
    houseCommittee: { name: "House Economic Matters Committee", url: "https://mgaleg.maryland.gov/mgawebsite/committees/details?cmte=ecm" },
    senateCommittee: { name: "Senate Finance Committee", url: "https://mgaleg.maryland.gov/mgawebsite/Committees/Details?cmte=fin" },
  },
  MA: {
    legislature: "https://malegislature.gov/",
    findLegislator: "https://malegislature.gov/Search/FindMyLegislator",
    governor: "https://www.mass.gov/orgs/office-of-the-governor",
    treasurer: "https://www.mass.gov/orgs/office-of-state-treasurer-and-receiver-general",
    houseCommittee: { name: "Joint Committee on Financial Services", url: "https://malegislature.gov/Committees/Detail/J11" },
    senateCommittee: { name: "Joint Committee on Financial Services", url: "https://malegislature.gov/Committees/Detail/J11" },
  },
  MI: {
    legislature: "https://www.legislature.mi.gov/",
    governor: "https://www.michigan.gov/whitmer",
    treasurer: "https://www.michigan.gov/treasury",
    houseCommittee: { name: "House Insurance and Financial Services Committee", url: "https://www.house.mi.gov/Committees" },
    senateCommittee: { name: "Senate Finance, Insurance, and Consumer Protection Committee", url: "https://www.senate.michigan.gov/information/committees/all-committees/2025-2026/finance-insurance-and-consumer-protection/" },
  },
  MN: {
    legislature: "https://www.leg.mn.gov/",
    findLegislator: "https://www.gis.leg.mn/iMaps/districts/",
    governor: "https://mn.gov/governor/",
    houseCommittee: { name: "House Commerce Finance and Policy Committee", url: "https://www.house.mn.gov/committees/home/94004" },
    senateCommittee: { name: "Senate Commerce and Consumer Protection Committee", url: "https://www.senate.mn/committees" },
  },
  MS: {
    legislature: "https://www.legislature.ms.gov/",
    governor: "https://www.governorreeves.ms.gov/",
    treasurer: "https://treasury.ms.gov/",
    houseCommittee: { name: "House Banking and Financial Services Committee", url: "https://www.legislature.ms.gov/committees/house-committees/" },
    senateCommittee: { name: "Senate Business and Financial Institutions Committee", url: "https://www.legislature.ms.gov/committees/senate-committees/" },
  },
  MO: {
    legislature: "https://www.moga.mo.gov/",
    findLegislator: "https://house.mo.gov/LegislatorLookup.aspx",
    governor: "https://governor.mo.gov/",
    treasurer: "https://treasurer.mo.gov/",
    houseCommittee: { name: "House Financial Institutions Committee", url: "https://house.mo.gov/CommitteeList.aspx" },
    senateCommittee: { name: "Senate Insurance and Banking Committee", url: "https://www.senate.mo.gov/committees/" },
  },
  MT: {
    legislature: "https://www.legmt.gov/",
    findLegislator: "https://www.legmt.gov/legislators/",
    governor: "https://gov.mt.gov/",
    houseCommittee: { name: "House Business and Labor Committee", url: "https://committees.legmt.gov/" },
    senateCommittee: { name: "Senate Business, Labor and Economic Affairs Committee", url: "https://committees.legmt.gov/" },
  },
  NE: {
    legislature: "https://nebraskalegislature.gov/",
    findLegislator: "https://nebraskalegislature.gov/senators/senator_find.php",
    governor: "https://governor.nebraska.gov/",
    treasurer: "https://treasurer.nebraska.gov/",
    senateCommittee: { name: "Banking, Commerce and Insurance Committee (unicameral)", url: "https://nebraskalegislature.gov/committees/landing_pages/index.php?cid=3" },
  },
  NV: {
    legislature: "https://www.leg.state.nv.us/",
    governor: "https://gov.nv.gov/",
    treasurer: "https://www.nevadatreasurer.gov/",
    houseCommittee: { name: "Assembly Committee on Commerce and Labor", url: "https://www.leg.state.nv.us/assembly/committees/commerce-and-labor/" },
    senateCommittee: { name: "Senate Committee on Commerce and Labor" },
  },
  NH: {
    legislature: "https://www.gencourt.state.nh.us/",
    governor: "https://www.governor.nh.gov/",
    treasurer: "https://www.nh.gov/treasury/",
    houseCommittee: { name: "House Commerce and Consumer Affairs Committee", url: "https://www.gencourt.state.nh.us/house/committees/committeedetails.aspx?id=29" },
    senateCommittee: { name: "Senate Commerce Committee", url: "https://www.gencourt.state.nh.us/senate/committees/committee_details.aspx?cc=S26" },
  },
  NJ: {
    legislature: "https://www.njleg.state.nj.us/",
    findLegislator: "https://www.njleg.state.nj.us/districts/find-my-district",
    governor: "https://nj.gov/governor/",
    treasurer: "https://www.nj.gov/treasury/",
    houseCommittee: { name: "Assembly Financial Institutions and Insurance Committee", url: "https://www.njleg.state.nj.us/committees/Committees.asp?House=A" },
    senateCommittee: { name: "Senate Commerce Committee", url: "https://www.njleg.state.nj.us/committees/Committees.asp?House=S" },
  },
  NM: {
    legislature: "https://www.nmlegis.gov/",
    findLegislator: "https://www.nmlegis.gov/Members/Find_My_Legislator",
    governor: "https://www.governor.state.nm.us/",
    treasurer: "https://www.nmsto.gov/",
    houseCommittee: { name: "House Commerce & Economic Development Committee", url: "https://www.nmlegis.gov/Committee/Standing_Committee?CommitteeCode=HCEDC" },
    senateCommittee: { name: "Senate Corporations & Transportation Committee", url: "https://www.nmlegis.gov/Committee/Standing_Committee?CommitteeCode=SCORC" },
  },
  NY: {
    legislature: "https://www.nysenate.gov/",
    findLegislator: "https://www.nysenate.gov/find-my-senator",
    governor: "https://www.governor.ny.gov/",
    houseCommittee: { name: "Assembly Standing Committee on Banks", url: "https://nyassembly.gov/comm/?id=4" },
    senateCommittee: { name: "Senate Standing Committee on Banks", url: "https://www.nysenate.gov/committees/banks" },
  },
  NC: {
    legislature: "https://www.ncleg.gov/",
    findLegislator: "https://www.ncleg.gov/FindYourLegislators",
    governor: "https://governor.nc.gov/",
    treasurer: "https://www.nctreasurer.com/",
    houseCommittee: { name: "House Banking Committee", url: "https://www.ncleg.gov/Committees/CommitteeInfo/HouseStanding/172" },
    senateCommittee: { name: "Senate Commerce and Insurance Committee", url: "https://www.ncleg.gov/Committees/CommitteeInfo/Senate/137" },
  },
  ND: {
    legislature: "https://www.ndlegis.gov/",
    findLegislator: "https://ndlegis.gov/assembly/find-my-legislators",
    governor: "https://www.governor.nd.gov/",
    treasurer: "https://www.treasurer.nd.gov/",
    houseCommittee: { name: "House Industry, Business and Labor Committee", url: "https://ndlegis.gov/assembly/69-2025/committees/house/industry-business-and-labor" },
    senateCommittee: { name: "Senate Industry and Business Committee", url: "https://ndlegis.gov/assembly/69-2025/committees/senate/industry-and-business" },
  },
  OH: {
    legislature: "https://www.legislature.ohio.gov/",
    findLegislator: "https://www.legislature.ohio.gov/legislators/district-maps",
    governor: "https://governor.ohio.gov/",
    treasurer: "https://tos.ohio.gov/",
    houseCommittee: { name: "House Financial Institutions Committee", url: "https://ohiohouse.gov/committees" },
    senateCommittee: { name: "Senate Financial Institutions, Insurance and Technology Committee", url: "https://ohiosenate.gov/committees/financial-institutions-insurance-and-technology" },
  },
  OK: {
    legislature: "https://www.oklegislature.gov/",
    governor: "https://www.governor.ok.gov/",
    treasurer: "https://oklahoma.gov/treasurer.html",
    houseCommittee: { name: "House Committee on Banking, Financial Services and Pensions", url: "https://www.okhouse.gov/committees/house/bank" },
    senateCommittee: { name: "Senate Retirement and Insurance Committee", url: "https://www.oksenate.gov/committees" },
  },
  OR: {
    legislature: "https://www.oregonlegislature.gov/",
    findLegislator: "https://www.oregonlegislature.gov/FindYourLegislator/leg-districts.html",
    governor: "https://www.oregon.gov/gov/",
    treasurer: "https://www.oregon.gov/treasury/",
    houseCommittee: { name: "House Committee on Commerce and Consumer Protection", url: "https://olis.oregonlegislature.gov/liz/Committees/list/house" },
    senateCommittee: { name: "Senate Committee on Finance and Revenue", url: "https://olis.oregonlegislature.gov/liz/Committees/list/senate" },
  },
  PA: {
    legislature: "https://www.palegis.us/",
    findLegislator: "https://www.palegis.us/find-my-legislator",
    governor: "https://www.pa.gov/agencies/governor.html",
    treasurer: "https://www.patreasury.gov/",
    houseCommittee: { name: "House Commerce Committee", url: "https://www.palegis.us/house/committees/6/commerce" },
    senateCommittee: { name: "Senate Banking & Insurance Committee", url: "https://www.palegis.us/senate/committees/37/banking-and-insurance" },
  },
  RI: {
    legislature: "https://www.rilegislature.gov/",
    governor: "https://governor.ri.gov/",
    treasurer: "https://treasury.ri.gov/",
    houseCommittee: { name: "House Corporations Committee", url: "https://www.rilegislature.gov/Pages/CommitteeMembers.aspx?ComChoiceR=HCORP&CommitteeName=Corporations" },
    senateCommittee: { name: "Senate Commerce Committee" },
  },
  SC: {
    legislature: "https://www.scstatehouse.gov/",
    governor: "https://governor.sc.gov/",
    treasurer: "https://treasurer.sc.gov/",
    houseCommittee: { name: "House Labor, Commerce and Industry Committee", url: "https://www.scstatehouse.gov/CommitteeInfo/HouseLCI/" },
    senateCommittee: { name: "Senate Labor, Commerce and Industry Committee", url: "https://www.scstatehouse.gov/CommitteeInfo/senatelci.php" },
  },
  SD: {
    legislature: "https://sdlegislature.gov/",
    findLegislator: "https://sdlegislature.gov/Legislators/Find",
    governor: "https://governor.sd.gov/",
    treasurer: "https://sdtreasurer.gov/",
    houseCommittee: { name: "House Commerce and Energy Committee" },
    senateCommittee: { name: "Senate Commerce and Energy Committee" },
  },
  TN: {
    legislature: "https://www.capitol.tn.gov/",
    findLegislator: "https://www.capitol.tn.gov/legislators/",
    governor: "https://www.tn.gov/governor.html",
    treasurer: "https://treasury.tn.gov/",
    houseCommittee: { name: "House Commerce Committee (Banking & Consumer Affairs Subcommittee)", url: "https://wapp.capitol.tn.gov/apps/CommitteeInfo/HouseComm?ga=114&committeeKey=820000" },
    senateCommittee: { name: "Senate Commerce and Labor Committee" },
  },
  TX: {
    legislature: "https://capitol.texas.gov/",
    findLegislator: "https://wrm.capitol.texas.gov/home",
    governor: "https://gov.texas.gov/",
    houseCommittee: { name: "House Committee on Pensions, Investments & Financial Services", url: "https://house.texas.gov/committees/committee/395" },
    senateCommittee: { name: "Senate Committee on Business & Commerce", url: "https://senate.texas.gov/cmte.php?c=510" },
  },
  UT: {
    legislature: "https://le.utah.gov/",
    findLegislator: "https://le.utah.gov/GIS/findDistrict.jsp",
    governor: "https://governor.utah.gov/",
    treasurer: "https://treasurer.utah.gov/",
    houseCommittee: { name: "House Business, Labor, and Commerce Committee", url: "https://le.utah.gov/committee/committee.jsp?year=2025&com=HSTBUS" },
    senateCommittee: { name: "Senate Business and Labor Committee", url: "https://le.utah.gov/committee/committee.jsp?year=2025&com=SSTBUS" },
  },
  VT: {
    legislature: "https://legislature.vermont.gov/",
    findLegislator: "https://legislature.vermont.gov/people/",
    governor: "https://governor.vermont.gov/",
    treasurer: "https://www.vermonttreasurer.gov/",
    houseCommittee: { name: "House Committee on Commerce and Economic Development", url: "https://legislature.vermont.gov/committee/detail/2026/11" },
    senateCommittee: { name: "Senate Committee on Economic Development, Housing and General Affairs", url: "https://legislature.vermont.gov/committee/detail/2026/32" },
  },
  VA: {
    legislature: "https://virginiageneralassembly.gov/",
    findLegislator: "https://whosmy.virginiageneralassembly.gov/",
    governor: "https://www.governor.virginia.gov/",
    treasurer: "https://www.trs.virginia.gov/",
    houseCommittee: { name: "House Labor and Commerce Committee", url: "https://virginiageneralassembly.gov/house/members/members.php?committee=H14" },
    senateCommittee: { name: "Senate Commerce and Labor Committee", url: "https://apps.senate.virginia.gov/Senator/standingcommittees.php" },
  },
  WA: {
    legislature: "https://leg.wa.gov/",
    findLegislator: "https://app.leg.wa.gov/districtfinder/",
    governor: "https://governor.wa.gov/",
    treasurer: "https://tre.wa.gov/",
    houseCommittee: { name: "House Consumer Protection & Business Committee" },
    senateCommittee: { name: "Senate Business, Financial Services, Gaming & Trade Committee", url: "https://leg.wa.gov/about-the-legislature/committees/senate/BFGT" },
  },
  WV: {
    legislature: "https://www.wvlegislature.gov/",
    governor: "https://governor.wv.gov/",
    treasurer: "https://wvtreasury.gov/",
    houseCommittee: { name: "House Banking and Insurance Committee", url: "https://www.wvlegislature.gov/committees/house/HouseCommittee.cfm?Chart=bi" },
    senateCommittee: { name: "Senate Banking and Insurance Committee", url: "https://www.wvlegislature.gov/committees/senate/SenateCommittee.cfm?Chart=bnk" },
  },
  WI: {
    legislature: "https://legis.wisconsin.gov/",
    findLegislator: "https://maps.legis.wisconsin.gov/",
    governor: "https://evers.wi.gov/",
    treasurer: "https://statetreasury.wi.gov/",
    houseCommittee: { name: "Assembly Committee on Financial Institutions", url: "https://docs.legis.wisconsin.gov/2025/committees/assembly/2921" },
    senateCommittee: { name: "Senate Committee on Financial Institutions and Sporting Heritage" },
  },
  WY: {
    legislature: "https://www.wyoleg.gov/",
    findLegislator: "https://www.wyoleg.gov/Legislators/2025",
    governor: "https://governor.wyo.gov/",
    treasurer: "https://treasurer.wyo.gov/",
    houseCommittee: { name: "Joint Corporations, Elections & Political Subdivisions Committee", url: "https://www.wyoleg.gov/Committees/2025/J07" },
    senateCommittee: { name: "Joint Corporations, Elections & Political Subdivisions Committee", url: "https://www.wyoleg.gov/Committees/2025/J07" },
  },
  DC: {
    legislature: "https://dccouncil.gov/",
    findLegislator: "https://dccouncil.gov/councilmembers/",
    governor: "https://mayor.dc.gov/",
    treasurer: "https://cfo.dc.gov/",
    senateCommittee: { name: "Committee on Business and Economic Development (unicameral Council)", url: "https://dccouncil.gov/business-and-economic-development-2/" },
  },
};
