/**
 * Allied advocacy organizations an advocate can contact for help moving a
 * digital-asset bill. EVERY url here was verified against the organization's
 * own site; if a group's official domain could not be confirmed it is left out
 * rather than guessed, because a dead or wrong link costs credibility with a
 * legislative office.
 *
 * `icon` keys map to components in components/icons.tsx. `state` is set only on
 * state/regional groups so the panel can surface the relevant one for the
 * currently selected state.
 */
import type { StateCode } from "../types";

export type OrgIcon =
  | "megaphone"
  | "network"
  | "coins"
  | "scale"
  | "book"
  | "building"
  | "pin";

export interface Organization {
  name: string;
  url: string;
  /** short tag shown under the name, e.g. "State legislation" */
  focus: string;
  /** who they are and why an advocate would reach out — plain, specific */
  blurb: string;
  icon: OrgIcon;
  /** present only on state/regional groups */
  state?: StateCode;
}

/** National groups worth contacting for any state's campaign. */
export const NATIONAL_ORGS: Organization[] = [
  {
    name: "Satoshi Action Fund",
    url: "https://www.satoshiaction.io/",
    focus: "State legislation",
    blurb:
      "Writes and helps pass state-level Bitcoin and digital-asset bills, including the strategic-reserve and self-custody (\"Bitcoin Rights\") laws this tool models. The most direct partner for getting model text in front of a sponsor.",
    icon: "coins",
  },
  {
    name: "The Digital Chamber",
    url: "https://digitalchamber.org/",
    focus: "Trade association · state network",
    blurb:
      "The longest-running U.S. blockchain trade association. Its State Network works specifically on state and local policy, and can supply model language, witnesses, and member companies to testify.",
    icon: "network",
  },
  {
    name: "Stand With Crypto",
    url: "https://www.standwithcrypto.org/",
    focus: "Grassroots mobilization",
    blurb:
      "A grassroots alliance that organizes crypto owners and grades officials on their record. Use it to turn out constituents to a hearing and to show a legislator there is support back home.",
    icon: "megaphone",
  },
  {
    name: "Blockchain Association",
    url: "https://theblockchainassociation.org/",
    focus: "Industry coalition",
    blurb:
      "A coalition of exchanges, investors, and projects focused mainly on federal policy. Reach out to coordinate industry sign-on letters and to connect a state effort with national resources.",
    icon: "network",
  },
  {
    name: "Coin Center",
    url: "https://www.coincenter.org/",
    focus: "Legal & constitutional research",
    blurb:
      "A nonpartisan research nonprofit focused on the constitutional and privacy questions around open networks. The place to go for legal analysis and testimony on self-custody and node-operation rights.",
    icon: "scale",
  },
  {
    name: "Crypto Council for Innovation",
    url: "https://cryptoforinnovation.org/",
    focus: "Policy research & data",
    blurb:
      "An industry alliance that publishes economic data and policy research. A source for the numbers and studies you can cite in committee testimony.",
    icon: "book",
  },
  {
    name: "DeFi Education Fund",
    url: "https://www.defieducationfund.org/",
    focus: "DeFi policy & education",
    blurb:
      "A nonprofit focused on decentralized-finance policy. Useful for plain-language technical explainers when a bill touches DeFi or smart contracts and members need to understand the mechanics.",
    icon: "book",
  },
  {
    name: "Bitcoin Policy Institute",
    url: "https://www.btcpolicy.org/",
    focus: "Nonpartisan think tank",
    blurb:
      "Produces research on Bitcoin's role in energy, national security, and monetary policy, and engages directly with policymakers. A source for studies and expert witnesses for a reserve or mining bill.",
    icon: "book",
  },
  {
    name: "Proof of Stake Alliance",
    url: "https://www.proofofstakealliance.org/",
    focus: "Staking policy (a CCI project)",
    blurb:
      "An industry alliance specializing in the legal and tax treatment of staking and proof-of-stake networks. The specialist resource when a bill touches staking or validator/node operation.",
    icon: "coins",
  },
  {
    name: "Financial Technology Association",
    url: "https://www.ftassociation.org/",
    focus: "Fintech trade association",
    blurb:
      "A D.C. trade group for fintech firms that advocates for modernized rules on payments, open banking, and stablecoins. Useful when a bill touches consumer payment rails or stablecoins.",
    icon: "network",
  },
  {
    name: "Government Blockchain Association",
    url: "https://gbaglobal.org/",
    focus: "Public-sector blockchain",
    blurb:
      "A membership group connecting government staff with industry to implement blockchain in public administration. It convenes and educates rather than lobbying a specific bill — useful for agency-side implementation questions.",
    icon: "building",
  },
  {
    name: "Fairshake",
    url: "https://www.fairshakepac.com/",
    focus: "Federal super PAC",
    blurb:
      "An industry-funded federal super PAC that backs pro-crypto congressional candidates. Context for the national political landscape; it funds federal races rather than drafting state legislation.",
    icon: "megaphone",
  },
];

/**
 * State and regional groups, keyed loosely by state. Only groups whose official
 * site is confirmed are listed; absence here does not mean a state has no group.
 */
export const STATE_ORGS: Organization[] = [
  {
    name: "Arkansas Blockchain Council",
    url: "https://arkansasblockchaincouncil.org/",
    focus: "Arkansas",
    blurb:
      "A Little Rock–based nonprofit industry association that lobbies the Arkansas legislature, educates regulators, and sets voluntary standards for miners. The first call for anything moving in Arkansas.",
    icon: "pin",
    state: "AR",
  },
  {
    name: "Texas Blockchain Council",
    url: "https://texasblockchaincouncil.org/",
    focus: "Texas",
    blurb:
      "A Texas industry association working to make the state a center for mining and digital assets. The first call for anything moving through the Texas Legislature.",
    icon: "pin",
    state: "TX",
  },
  {
    name: "California Blockchain Advocacy Coalition",
    url: "https://www.blockadvocacy.com/",
    focus: "California",
    blurb:
      "A Sacramento-based membership coalition that educates California legislators and regulators on digital-asset policy and consumer protections.",
    icon: "pin",
    state: "CA",
  },
  {
    name: "Florida Blockchain Business Association",
    url: "https://www.fbba.io/",
    focus: "Florida",
    blurb:
      "A Florida nonprofit chamber of commerce promoting the state as a hub for Bitcoin, blockchain, and Web3 business and adoption.",
    icon: "pin",
    state: "FL",
  },
  {
    name: "Ohio Blockchain Council",
    url: "https://www.ohioblockchain.org/",
    focus: "Ohio",
    blurb:
      "An Ohio trade association working to keep the state competitive on blockchain, digital assets, and mining through policy and education.",
    icon: "pin",
    state: "OH",
  },
  {
    name: "Pennsylvania Blockchain Coalition",
    url: "https://pablockchain.org/",
    focus: "Pennsylvania",
    blurb:
      "A Pennsylvania coalition advocating for blockchain-friendly policy and providing education and resources to the state's industry.",
    icon: "pin",
    state: "PA",
  },
  {
    name: "Virginia Blockchain Council",
    url: "https://vablockcouncil.org/",
    focus: "Virginia",
    blurb:
      "A Virginia 501(c)(6) building a digital-asset constituency through grassroots advocacy, community growth, and academic partnerships.",
    icon: "pin",
    state: "VA",
  },
  {
    name: "Alabama Blockchain Alliance",
    url: "https://www.alabamablockchain.org/",
    focus: "Alabama",
    blurb:
      "An Alabama group focused on education and state-level blockchain and digital-asset policy.",
    icon: "pin",
    state: "AL",
  },
  {
    name: "Cascadia Blockchain Council",
    url: "https://www.washingtontechnology.org/blockchain/",
    focus: "Washington · Pacific NW",
    blurb:
      "The Washington Technology Industry Association's blockchain council, advocating for constructive digital-asset policy across Washington and the Pacific Northwest.",
    icon: "pin",
    state: "WA",
  },
];

/**
 * Where to find a state/regional group when none is listed above: The Digital
 * Chamber's State Network coordinates state and local advocacy nationwide.
 */
export const STATE_NETWORK_FALLBACK = {
  name: "The Digital Chamber — State Network",
  url: "https://www.state.digitalchamber.org/",
  blurb:
    "Coordinates digital-asset advocacy at the state and local level across the country — a starting point for finding or building a coalition in any state.",
};
