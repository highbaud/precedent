import type { CategoryId } from "../types";

export interface BillTemplate {
  onePager: string;
  formal: string;
  /** Anticipated legislator objections paired with concise, sourced responses. */
  objections: string;
}

/**
 * Curated model-bill templates, keyed by category. Tokens ({{STATE}} etc.) are
 * filled by lib/render.ts. These are MODEL drafts derived from enacted state
 * law — not legal advice. They are written to be edited by a sponsor's counsel.
 */
export const TEMPLATES: Record<CategoryId, BillTemplate> = {
  reserve: {
    onePager: `# Strategic Bitcoin & Digital Asset Reserve — Briefing for {{STATE}} Legislators

## The problem
Inflation and currency debasement quietly erode the purchasing power of {{STATE}}'s public funds every year. Treasuries concentrated entirely in cash and short-term debt have no allocation to a scarce, non-sovereign asset that has historically appreciated against the dollar over multi-year horizons.

## What this bill does
- Authorizes the State Treasurer to invest a capped share (e.g. up to 5%) of eligible public funds in digital assets with a market capitalization above a high threshold — a standard that today only Bitcoin meets.
- Permits holdings to be held directly, through a qualified custodian, or via a regulated exchange-traded product.
- Allows the reserve to receive assets through purchase, fork, airdrop, or donation, and to stake or manage them prudently.
- Adds legal guardrails so the reserve cannot be casually dismantled by a future session.

## Precedent
{{PRECEDENT_SENTENCE}} New Hampshire (HB 302) was first to authorize a Strategic Bitcoin Reserve; Texas (SB 21) established a reserve outside the treasury with strong legal protections; Arizona (HB 2749) built a reserve funded in part through unclaimed digital property.

## Why {{STATE}} should act
A capped allocation hedges the State's cash reserves against long-run dollar debasement while the bulk of the treasury stays in conventional instruments. It also tells founders, custodians, and investors that {{STATE}} — home to {{POPULATION}} residents whose taxes fund that treasury — means to compete for digital-asset capital and the jobs that follow it. Holding none is itself a decision: a full bet that the dollar keeps its purchasing power.`,
    formal: `AN ACT establishing the {{STATE}} Strategic Bitcoin and Digital Asset Reserve.

BE IT ENACTED BY {{LEGISLATURE}}:

SECTION 1. SHORT TITLE.
This Act may be cited as the "{{STATE}} Strategic Bitcoin and Digital Asset Reserve Act."

SECTION 2. LEGISLATIVE FINDINGS.
{{LEGISLATURE}} finds that:
  (a) the long-term preservation of the purchasing power of public funds is a core fiduciary duty of the State;
  (b) digital assets with a sufficiently large market capitalization have demonstrated utility as a store of value and a hedge against currency debasement; and
  (c) a prudent, capped allocation of public funds to such assets serves the financial interests of the State and its residents.

SECTION 3. DEFINITIONS.
As used in this Act:
  (1) "Digital asset" means a digital representation of value recorded on a cryptographically secured distributed ledger.
  (2) "Qualified custodian" means a custodian meeting the standards established by the State Treasurer by rule.
  (3) "Eligible digital asset" means a digital asset that has maintained an average market capitalization of not less than $500,000,000,000 over the preceding twelve (12) months.

SECTION 4. ESTABLISHMENT OF THE RESERVE.
  (a) There is established the {{STATE}} Strategic Bitcoin and Digital Asset Reserve, administered by the State Treasurer.
  (b) The State Treasurer may invest in eligible digital assets an amount not to exceed five percent (5%) of the total funds eligible for investment.
  (c) Reserve assets may be held directly through secure custody solutions, through a qualified custodian, or through an exchange-traded product regulated under federal law.

SECTION 5. ACQUISITION AND MANAGEMENT.
  (a) The Reserve may acquire digital assets by purchase, and may receive digital assets resulting from a fork, airdrop, or donation.
  (b) The State Treasurer may stake reserve assets or otherwise manage them in a prudent manner, with all proceeds deposited into the Reserve.

SECTION 6. SAFEGUARDS.
Reserve assets shall not be liquidated, transferred, or expended except by an Act of {{LEGISLATURE}} or pursuant to a rebalancing policy adopted by the State Treasurer.

SECTION 7. REPORTING.
The State Treasurer shall publish an annual report on the holdings, performance, and custody arrangements of the Reserve.

SECTION 8. RULEMAKING.
The State Treasurer may adopt rules necessary to implement this Act, including standards for qualified custodians, security and key-management practices, and the rebalancing policy authorized by Section 6.

SECTION 9. SEVERABILITY.
If any provision of this Act, or its application to any person or circumstance, is held invalid, that invalidity does not affect other provisions or applications that can be given effect without the invalid provision or application, and to this end the provisions of this Act are severable.

SECTION 10. EFFECTIVE DATE.
This Act takes effect on July 1, {{YEAR}}.`,
    objections: `# Anticipated Objections & Responses — {{STATE}} Strategic Reserve

**For committee testimony and member meetings.**

## "Cryptocurrency is too volatile to hold public money."
The bill caps exposure (e.g. no more than 5% of eligible funds); the rest of the treasury stays in cash and bonds. A capped allocation hedges the larger dollar position. Holding 100% dollars is itself a bet — that the dollar will not lose purchasing power over time.

## "This gambles with taxpayer funds."
Acquisition is optional and capped, the assets sit with a qualified custodian, performance is reported annually, and the reserve cannot be liquidated casually. Those guardrails describe diversification, not day-trading.

## "Why not wait for the federal government?"
{{PRECEDENT}} already acted. First movers attract capital, custodians, and talent. The bill lets {{STATE}} act now within its own treasury authority.`,
  },

  "self-custody": {
    onePager: `# Digital Asset Rights & Self-Custody Protections — Briefing for {{STATE}} Legislators

## The problem
Without explicit statutory protection, {{DEMONYM_PLURAL}} who hold their own digital assets, run blockchain nodes, or participate in staking face legal uncertainty and the risk of local bans or discriminatory rules. A federal central bank digital currency (CBDC) could also be used to surveil or restrict lawful transactions.

## What this bill does
- Affirms the right of any individual or business to self-custody digital assets in a self-hosted wallet.
- Protects the right to operate a blockchain node and to participate in staking.
- Bans state and local government from accepting or requiring a CBDC.
- Protects against unlawful de-banking based solely on lawful digital-asset activity.
- Clarifies that running a node or staking is not, by itself, money transmission or a securities offering.

## Precedent
{{PRECEDENT_SENTENCE}} Kentucky's Blockchain Digital Assets Act (HB 701) passed 91-0 and 37-0; Montana's SB 265 bans state CBDC acceptance and protects self-custody; Wyoming's HB 0308 defends against de-banking and unreasonable searches of private keys.

## Why {{STATE}} should act
These protections cost the State nothing and tell {{DEMONYM_PLURAL}} that {{STATE}} treats financial privacy and self-ownership as rights worth defending. They matter most to people the banking system already underserves: {{UNBANKED}}% of {{STATE}} households have no bank account and {{UNDERBANKED}}% of those with one are underbanked (FDIC, 2023). A self-hosted wallet gives those households a way to save and transact that does not hinge on a branch or a minimum balance. Clear rules also keep digital-asset builders, and the jobs they bring, inside the state.`,
    formal: `AN ACT to protect the rights of {{STATE}} residents to own and use digital assets.

BE IT ENACTED BY {{LEGISLATURE}}:

SECTION 1. SHORT TITLE.
This Act may be cited as the "{{STATE}} Digital Asset Freedom Act."

SECTION 2. LEGISLATIVE FINDINGS.
{{LEGISLATURE}} finds that the ability to hold and transact in digital assets, to operate the infrastructure of public blockchains, and to be free from financial surveillance are matters of property, privacy, and economic liberty for the residents of {{STATE}}.

SECTION 3. DEFINITIONS.
As used in this Act:
  (1) "Digital asset" means a digital representation of value recorded on a cryptographically secured distributed ledger.
  (2) "Self-hosted wallet" means hardware or software through which a person holds digital assets directly, retaining sole control of the private keys.
  (3) "Node" means computing hardware or software that validates or relays transactions on a blockchain network.
  (4) "Central bank digital currency" or "CBDC" means a digital medium of exchange issued by a central bank or federal agency.

SECTION 4. RIGHT TO SELF-CUSTODY.
A person has the right to retain and control digital assets through a self-hosted wallet, and the State shall not prohibit or condition that right.

SECTION 5. RIGHT TO OPERATE NODES AND STAKE.
  (a) A person has the right to operate a node and to participate in staking.
  (b) Operating a node or staking, by itself, does not constitute money transmission, a money services business, or the offer or sale of a security under the laws of {{STATE}}.

SECTION 6. PROHIBITION ON CBDC.
No agency or political subdivision of {{STATE}} shall accept, require, or participate in a test or implementation of a central bank digital currency.

SECTION 7. PROTECTION FROM DE-BANKING.
No financial institution chartered by {{STATE}} shall deny or terminate services to a customer solely because the customer lawfully engages in digital-asset activity.

SECTION 8. ENFORCEMENT.
  (a) The Attorney General may bring an action to enforce this Act and may seek injunctive relief and civil penalties for a violation.
  (b) A person aggrieved by a violation of Section 6 or Section 7 may bring a civil action for injunctive relief, actual damages, and reasonable attorney fees and costs.

SECTION 9. SEVERABILITY.
If any provision of this Act, or its application to any person or circumstance, is held invalid, that invalidity does not affect other provisions or applications that can be given effect without the invalid provision or application, and to this end the provisions of this Act are severable.

SECTION 10. EFFECTIVE DATE.
This Act takes effect on July 1, {{YEAR}}.`,
    objections: `# Anticipated Objections & Responses — {{STATE}} Digital Asset Freedom

**For committee testimony and member meetings.**

## "Won't this help criminals hide money?"
Self-custody, running a node, and staking are lawful activities. The bill does not change criminal law or the anti–money-laundering duties that apply to exchanges. It protects ordinary owners' property and financial privacy.

## "Isn't banning a state CBDC premature?"
The bill only bars *state* acceptance of or participation in a CBDC; it does not regulate the Federal Reserve. It preserves financial privacy and keeps the decision with {{STATE}}'s elected officials, at no cost to the State.

## "Does this cost the State anything?"
No. It is a rights-and-clarification measure with no appropriation and no new program.`,
  },

  mining: {
    onePager: `# Mining Rights & Tax Incentives — Briefing for {{STATE}} Legislators

## The problem
Digital-asset mining and data centers create jobs, stabilize electrical grids, and monetize stranded energy — yet operators in many states face discriminatory zoning, punitive utility rates, and special taxes that other data centers never see. That uncertainty pushes investment to friendlier states.

## What this bill does
- Grants digital-asset miners the same legal treatment as comparable data centers.
- Prohibits discriminatory utility rates aimed specifically at miners.
- Bars local governments from using zoning or noise rules to single out mining where other data centers are permitted.
- Protects the right to mine at home for personal use.
- Confirms that using digital assets as a means of payment triggers no additional state tax.

## Precedent
{{PRECEDENT_SENTENCE}} Montana's Right to Mine Act (SB 178) is the model for non-discrimination; Arkansas (HB 1799) gives miners data-center parity; Kentucky (HB 230 / SB 255) provides targeted tax exemptions for large operations.

## Why {{STATE}} should act
Mining turns {{STATE}}'s energy — including stranded gas and curtailed renewables that would otherwise be wasted — into local tax base and jobs, often in rural counties that draw little other capital investment. Because mining loads can be paid to power down within seconds when the grid is stressed, they also help hold rates steady for every ratepayer. Non-discriminatory rules are what bring those facilities to {{STATE}} rather than a neighboring state.`,
    formal: `AN ACT relating to the regulation and taxation of digital-asset mining.

BE IT ENACTED BY {{LEGISLATURE}}:

SECTION 1. SHORT TITLE.
This Act may be cited as the "{{STATE}} Right to Mine and Data Center Parity Act."

SECTION 2. LEGISLATIVE FINDINGS.
{{LEGISLATURE}} finds that digital-asset mining operations are a lawful and economically valuable use of energy and computing resources that should not be subject to discriminatory treatment.

SECTION 3. DEFINITIONS.
As used in this Act:
  (1) "Digital-asset mining" means using computational power to validate transactions and secure a blockchain network in exchange for digital assets.
  (2) "Mining business" means a person engaged in digital-asset mining at a colocation or commercial facility.

SECTION 4. NON-DISCRIMINATION.
  (a) A political subdivision shall not impose on a mining business any zoning, permitting, or noise requirement that it does not impose on comparable data centers.
  (b) A public utility or regulatory commission shall not establish a rate, schedule, or classification that discriminates against a mining business.

SECTION 5. RIGHT TO MINE AT HOME.
A person may engage in digital-asset mining for personal use at a residence, subject to generally applicable laws and reasonable, non-discriminatory noise ordinances.

SECTION 6. TAX TREATMENT.
The use of a digital asset as a means of payment shall not subject the transaction to any additional tax beyond that which applies to a comparable transaction conducted in legal tender.

SECTION 7. SEVERABILITY.
If any provision of this Act, or its application to any person or circumstance, is held invalid, that invalidity does not affect other provisions or applications that can be given effect without the invalid provision or application, and to this end the provisions of this Act are severable.

SECTION 8. EFFECTIVE DATE.
This Act takes effect on July 1, {{YEAR}}.`,
    objections: `# Anticipated Objections & Responses — {{STATE}} Right to Mine

**For committee testimony and member meetings.**

## "Mining wastes energy."
Mining loads are interruptible and can be curtailed within seconds, helping balance the grid and monetize stranded or flared energy. The bill grants only parity with other data centers — no special energy subsidy.

## "Mining operations are noisy and disruptive."
The bill preserves generally applicable, non-discriminatory noise ordinances. It only prohibits rules that single out miners while exempting comparable facilities.

## "Why give miners special treatment?"
It is the opposite of special treatment: non-discrimination simply ensures miners are not taxed, zoned, or charged worse than the data centers next door.`,
  },

  "stablecoin-bank": {
    onePager: `# Stablecoins & Digital Banking — Briefing for {{STATE}} Legislators

## The problem
{{STATE}} lacks a regulated, fully reserved framework for a state-backed stablecoin or for chartering banks purpose-built to custody digital assets. As a result, digital-dollar activity flows to other jurisdictions, and businesses that need compliant digital-asset banking look elsewhere.

## What this bill does
- Authorizes a fully reserved state stable token, redeemable on demand for one U.S. dollar, backed 100% by cash and short-term U.S. Treasuries held in trust.
- Establishes a commission to administer the token transparently, with regular attestations.
- Creates a charter for digital-asset depository institutions: special-purpose, non-lending banks built to custody digital assets under state supervision.
- Directs excess trust earnings to a designated public-benefit fund.

## Precedent
{{PRECEDENT_SENTENCE}} Wyoming's Stable Token Act (SF0127 / SF0021) created the first government-issued, fully reserved stablecoin; Nebraska's Financial Innovation Act (LB 649) chartered digital-asset depository institutions.

## Why {{STATE}} should act
A fully backed framework brings digital-dollar settlement and custody onshore, creates a supervised banking category, and can return trust earnings to the State as non-tax revenue. It also reaches residents the current system leaves out: {{UNBANKED}}% of {{STATE}} households have no bank account and {{UNDERBANKED}}% of those with one are underbanked (FDIC, 2023). A redeemable, fully reserved digital dollar gives those households a low-cost way to hold and move money.`,
    formal: `AN ACT to establish the {{STATE}} Stable Token and to authorize digital-asset depository institutions.

BE IT ENACTED BY {{LEGISLATURE}}:

SECTION 1. SHORT TITLE.
This Act may be cited as the "{{STATE}} Stable Token and Digital Banking Act."

SECTION 2. LEGISLATIVE FINDINGS.
{{LEGISLATURE}} finds that a fully reserved, transparently administered stable token and a purpose-built charter for digital-asset custody serve the public interest and the competitiveness of {{STATE}}.

SECTION 3. DEFINITIONS.
As used in this Act:
  (1) "Stable token" means a virtual currency representing one United States dollar, redeemable on demand.
  (2) "Digital-asset depository institution" means a special-purpose institution chartered to receive deposits of and custody digital assets, and which does not engage in lending of customer assets.

SECTION 4. {{STATE}} STABLE TOKEN.
  (a) There is established the {{STATE}} Stable Token Commission to issue and administer the stable token.
  (b) Each stable token in circulation shall be backed at not less than one hundred percent (100%) by United States currency and short-term United States Treasury obligations held in trust.
  (c) The Commission shall obtain and publish independent attestations of the reserve not less than monthly.

SECTION 5. DIGITAL-ASSET DEPOSITORY INSTITUTIONS.
  (a) The State banking regulator shall establish a charter for digital-asset depository institutions.
  (b) Such institutions shall maintain customer digital assets one-to-one, shall not rehypothecate customer assets, and shall be subject to examination by the regulator.

SECTION 6. USE OF EARNINGS.
Earnings on the reserve in excess of administrative costs shall be deposited into a public-benefit fund designated by {{LEGISLATURE}}.

SECTION 7. RULEMAKING.
The Commission and the State banking regulator may adopt rules necessary to implement this Act, including reserve-management, attestation, custody, and examination standards.

SECTION 8. SEVERABILITY.
If any provision of this Act, or its application to any person or circumstance, is held invalid, that invalidity does not affect other provisions or applications that can be given effect without the invalid provision or application, and to this end the provisions of this Act are severable.

SECTION 9. EFFECTIVE DATE.
This Act takes effect on July 1, {{YEAR}}.`,
    objections: `# Anticipated Objections & Responses — {{STATE}} Stable Token & Digital Banking

**For committee testimony and member meetings.**

## "Stablecoins collapse — remember TerraUSD."
This token is fully reserved: backed at no less than 100% by U.S. dollars and short-term Treasuries held in trust, with independent attestations published monthly. It is not an algorithmic stablecoin like TerraUSD.

## "Is the State competing with private banks?"
No. The charter is for purpose-built custody institutions that do not lend out customer assets — a service traditional banks generally do not offer.

## "What is the risk and cost to the State?"
The fully reserved design means each token is matched by cash and Treasuries. Excess trust earnings flow to a public-benefit fund, creating non-tax revenue.`,
  },

  dao: {
    onePager: `# DAO Recognition & Legal Frameworks — Briefing for {{STATE}} Legislators

## The problem
Decentralized Autonomous Organizations (DAOs) coordinate capital and labor through smart contracts, but in most states they have no legal form. Without recognition, their members risk being treated as a general partnership — exposing each member to unlimited personal liability for the organization's acts.

## What this bill does
- Creates a legal form for DAOs (a DAO limited liability company or a decentralized unincorporated nonprofit association).
- Grants limited liability to members and managers so individuals are not personally liable merely for membership.
- Recognizes governance and operation through smart contracts and on-chain voting.
- Provides default rules for membership, dissolution, and recordkeeping.

## Precedent
{{PRECEDENT_SENTENCE}} Wyoming pioneered the DAO LLC (2021) and the Decentralized Unincorporated Nonprofit Association (DUNA) Act (SF0050, 2024); Tennessee created a dedicated DAO LLC category (SB 2854 / HB 2645, 2022).

## Why {{STATE}} should act
Legal clarity gives crypto-native organizations a reason to register, bank, and contract in {{STATE}}, which generates filing revenue and work for local lawyers, accountants, and registered agents. It also shields the {{DEMONYM_PLURAL}} who join a DAO from the personal liability they would otherwise carry as members of an unrecognized general partnership.`,
    formal: `AN ACT to provide legal recognition and limited liability for decentralized autonomous organizations.

BE IT ENACTED BY {{LEGISLATURE}}:

SECTION 1. SHORT TITLE.
This Act may be cited as the "{{STATE}} Decentralized Autonomous Organization Act."

SECTION 2. LEGISLATIVE FINDINGS.
{{LEGISLATURE}} finds that decentralized autonomous organizations require a clear legal form to operate, to contract, and to limit the personal liability of their participants.

SECTION 3. DEFINITIONS.
As used in this Act:
  (1) "Decentralized autonomous organization" or "DAO" means an organization whose governance is administered in whole or in part through smart contracts.
  (2) "Smart contract" means software deployed to a blockchain that executes its terms automatically.
  (3) "Member" means a person holding a membership interest in a DAO.

SECTION 4. FORMATION AND LEGAL STATUS.
  (a) A DAO may organize as a limited liability company or as a decentralized unincorporated nonprofit association under the laws of {{STATE}}, and upon formation has legal standing to sue and be sued, hold property, and enter contracts.
  (b) A DAO shall identify in its public record a means of contact and the smart contracts governing it.

SECTION 5. LIMITED LIABILITY.
A member or manager of a DAO is not personally liable for the debts, obligations, or acts of the DAO solely by reason of being a member or manager.

SECTION 6. GOVERNANCE.
The articles of organization or governing smart contracts may set forth membership, voting, management, and dissolution rules, which are enforceable under the laws of {{STATE}}.

SECTION 7. SEVERABILITY.
If any provision of this Act, or its application to any person or circumstance, is held invalid, that invalidity does not affect other provisions or applications that can be given effect without the invalid provision or application, and to this end the provisions of this Act are severable.

SECTION 8. EFFECTIVE DATE.
This Act takes effect on July 1, {{YEAR}}.`,
    objections: `# Anticipated Objections & Responses — {{STATE}} DAO Recognition

**For committee testimony and member meetings.**

## "DAOs are just a liability shield for bad actors."
The bill requires a DAO to put a means of contact and its governing smart contracts on the public record — more transparency than many entities provide. Limited liability mirrors what every LLC member already receives.

## "Courts won't know how to handle DAOs."
Recognition gives a DAO clear standing to sue and be sued, hold property, and contract, plus default rules for membership and dissolution — which *reduces* litigation uncertainty.

## "Is there real demand for this?"
{{PRECEDENT}} enacted DAO frameworks and now attract registrations, filing fees, and professional-services work that would otherwise go offshore.`,
  },

  property: {
    onePager: `# Digital Assets as Property — Briefing for {{STATE}} Legislators

## The problem
{{STATE}} law does not clearly define digital assets or establish how ownership is determined and transferred. That ambiguity makes disputes hard to resolve, complicates secured lending, and deters businesses that need legal certainty.

## What this bill does
- Defines "virtual currency" and "digital asset" in the {{STATE}} commercial code.
- Establishes that digital assets are a form of property under state law.
- Creates clear rules for who has rights in a digital asset and how those rights transfer.
- Introduces a "qualifying purchaser" concept so good-faith buyers take assets free of competing claims, providing predictability for ownership disputes.

## Precedent
{{PRECEDENT_SENTENCE}} Texas's Virtual Currency Act (HB 4474) brought digital assets under the commercial code and created the "qualifying purchaser" framework; Nebraska's LB 649 established foundational definitions for blockchain operations.

## Why {{STATE}} should act
A clear property framework is what every other digital-asset law builds on. It tells {{STATE}} courts how to settle ownership disputes, lets lenders take digital assets as collateral, and gives businesses the certainty they need before they will custody or transact in those assets here.`,
    formal: `AN ACT to define digital assets as property and establish rules for their ownership and transfer.

BE IT ENACTED BY {{LEGISLATURE}}:

SECTION 1. SHORT TITLE.
This Act may be cited as the "{{STATE}} Digital Asset Property Act."

SECTION 2. LEGISLATIVE FINDINGS.
{{LEGISLATURE}} finds that clear definitions and property rules for digital assets are necessary to resolve disputes, support commerce, and provide certainty to the residents and businesses of {{STATE}}.

SECTION 3. DEFINITIONS.
As used in this Act:
  (1) "Virtual currency" means a digital representation of value used as a medium of exchange, unit of account, or store of value, and which is not legal tender.
  (2) "Digital asset" means virtual currency and any other digital representation of value or rights recorded on a distributed ledger.
  (3) "Qualifying purchaser" means a person that obtains control of a digital asset for value, in good faith, and without notice of an adverse claim.

SECTION 4. CLASSIFICATION AS PROPERTY.
A digital asset is intangible personal property under the laws of {{STATE}}.

SECTION 5. CONTROL AND TRANSFER.
  (a) A person has rights in a digital asset by acquiring control of it.
  (b) A qualifying purchaser acquires a digital asset free of competing property claims of which the purchaser has no notice.

SECTION 6. APPLICATION.
This Act applies to transactions in digital assets governed by the laws of {{STATE}} and shall be construed to promote uniformity and commercial certainty.

SECTION 7. SEVERABILITY.
If any provision of this Act, or its application to any person or circumstance, is held invalid, that invalidity does not affect other provisions or applications that can be given effect without the invalid provision or application, and to this end the provisions of this Act are severable.

SECTION 8. EFFECTIVE DATE.
This Act takes effect on July 1, {{YEAR}}.`,
    objections: `# Anticipated Objections & Responses — {{STATE}} Digital Asset Property

**For committee testimony and member meetings.**

## "Isn't this really federal securities law?"
No. The bill defines property rights and how ownership transfers under {{STATE}} commercial law. It does not classify any asset as a security or touch federal securities regulation.

## "Why do we need new definitions at all?"
Without them, {{STATE}} courts lack clear rules for ownership disputes and secured lending in digital assets. Clear definitions lower legal risk for residents and businesses.

## "Could this conflict with the Uniform Commercial Code?"
It is drafted to complement UCC reforms and to be construed for uniformity and commercial certainty, not to diverge from them.`,
  },

  "ucc-12": {
    onePager: `# UCC Article 12 — Controllable Electronic Records — Briefing for {{STATE}} Legislators

## The problem
The Uniform Commercial Code, which governs nearly all commercial transactions, was written before digital assets existed. Without the 2022 amendments, {{STATE}} law has no clear rule for how ownership of crypto and similar assets transfers — creating risk for every sale, loan, and secured transaction involving them.

## What this bill does
- Adopts the 2022 UCC amendments, including new Article 12 governing "Controllable Electronic Records" (CERs) such as crypto and certain digital tokens.
- Establishes that whoever has "control" of a digital asset has the priority legal interest in it.
- Creates "take-free" rules so a good-faith purchaser acquires the asset free of third-party property claims — functioning like cash or a negotiable instrument.
- Amends Article 9 so digital assets can be used as collateral in secured lending.

## Precedent
{{PRECEDENT_SENTENCE}} As of late 2025, roughly 33 states and the District of Columbia had adopted these amendments, including Delaware, New York, and California — making this among the most widely enacted digital-asset reforms in the country.

## Why {{STATE}} should act
This is uniform model law from the Uniform Law Commission, not novel policy, and roughly 33 states plus the District of Columbia have already adopted it. Enacting it keeps {{STATE}} commercial law current, lets digital assets serve as loan collateral, and spares {{STATE}} courts from ruling on ownership disputes with no statute to apply.`,
    formal: `AN ACT to adopt the 2022 amendments to the Uniform Commercial Code, including Article 12 governing controllable electronic records.

BE IT ENACTED BY {{LEGISLATURE}}:

SECTION 1. SHORT TITLE.
This Act may be cited as the "{{STATE}} Emerging Technologies Commercial Code Amendments."

SECTION 2. LEGISLATIVE FINDINGS.
{{LEGISLATURE}} finds that adopting the 2022 amendments to the Uniform Commercial Code provides uniform, predictable rules for transactions in digital assets and maintains {{STATE}}'s commercial law consistent with that of other states.

SECTION 3. DEFINITIONS.
As used in this Act:
  (1) "Controllable electronic record" or "CER" means a record stored in an electronic medium that can be subjected to control under this Act.
  (2) "Control" of a controllable electronic record means the power to enjoy substantially all its benefit, the exclusive power to transfer it, and the ability to identify oneself as having those powers.

SECTION 4. ADOPTION OF ARTICLE 12.
The State adopts new Article 12 of the Uniform Commercial Code governing controllable electronic records, controllable accounts, and controllable payment intangibles, as approved by the Uniform Law Commission in 2022.

SECTION 5. TAKE-FREE RULE.
A qualifying purchaser of a controllable electronic record acquires its rights free of competing property claims, in the manner provided by Article 12.

SECTION 6. CONFORMING AMENDMENTS TO ARTICLE 9.
Article 9 of the Uniform Commercial Code is amended to permit a security interest in a controllable electronic record, controllable account, or controllable payment intangible to be perfected by control.

SECTION 7. SEVERABILITY.
If any provision of this Act, or its application to any person or circumstance, is held invalid, that invalidity does not affect other provisions or applications that can be given effect without the invalid provision or application, and to this end the provisions of this Act are severable.

SECTION 8. EFFECTIVE DATE; TRANSITION.
This Act takes effect on July 1, {{YEAR}}, with an adjustment date one (1) year thereafter for pre-existing transactions.`,
    objections: `# Anticipated Objections & Responses — {{STATE}} UCC Article 12

**For committee testimony and member meetings.**

## "This sounds complex and risky."
It is uniform model law drafted by the Uniform Law Commission and already adopted by roughly 33 states. Adopting it keeps {{STATE}} consistent with the national standard — the risky path is being an outlier.

## "Does this endorse crypto speculation?"
No. Article 12 sets neutral commercial rules for how control and ownership of a digital record transfer — the same kind of take-free rules that already govern cash and negotiable instruments.

## "Is there any urgency?"
Every sale, loan, or secured transaction touching a digital asset in an outlier state carries legal uncertainty. A built-in transition period eases the change for existing deals.`,
  },

  "tax-acceptance": {
    onePager: `# State Acceptance of Crypto for Taxes & Fees — Briefing for {{STATE}} Legislators

## The problem
{{STATE}} residents and businesses increasingly hold value in digital assets, yet the State accepts only legal tender for taxes and fees. That gap signals that {{STATE}} is behind on payments modernization and forgoes a simple, no-risk way to demonstrate that digital assets are a legitimate part of the economy.

## What this bill does
- Authorizes (or directs) designated state agencies to accept cryptocurrency for taxes, fees, fines, and other amounts owed to the State.
- Requires payments to be processed through a third-party processor that converts the digital asset to U.S. dollars at the point of sale, so the State bears no price risk and receives dollars.
- Permits a reasonable processing fee to be passed through to the paying party, keeping the program revenue-neutral for the State.
- Directs the responsible agency to publish a simple implementation rule.

## Precedent
{{PRECEDENT_SENTENCE}} Colorado's Department of Revenue began accepting cryptocurrency for all state taxes in 2022; Utah operates a statewide crypto payment program; Louisiana accepts digital assets for state services.

## Why {{STATE}} should act
The State takes on no market risk — a processor converts each payment to dollars at the point of sale — while meeting residents who already hold digital assets where they are; nationally {{CRYPTO_SHARE}}% of households used or held crypto in the prior year (FDIC, 2023). It is a low-cost, visible step that signals {{STATE}} treats digital assets as a normal part of the economy.`,
    formal: `AN ACT to authorize state agencies to accept cryptocurrency for taxes and fees.

BE IT ENACTED BY {{LEGISLATURE}}:

SECTION 1. SHORT TITLE.
This Act may be cited as the "{{STATE}} Digital Asset Payments Act."

SECTION 2. LEGISLATIVE FINDINGS.
{{LEGISLATURE}} finds that enabling residents and businesses to pay amounts owed to the State in cryptocurrency, without exposing the State to price risk, modernizes payments and recognizes the legitimacy of digital assets.

SECTION 3. DEFINITIONS.
As used in this Act:
  (1) "Cryptocurrency" means a digital representation of value that functions as a medium of exchange and is recorded on a cryptographically secured distributed ledger.
  (2) "Payment processor" means a third party that accepts cryptocurrency from a payer and remits United States dollars to the State.

SECTION 4. AUTHORITY TO ACCEPT CRYPTOCURRENCY.
  (a) A state agency may accept cryptocurrency as payment for any tax, fee, fine, or other amount owed to the State.
  (b) All such payments shall be processed through a payment processor that converts the cryptocurrency to United States dollars at or near the time of the transaction, and the State shall receive United States dollars.

SECTION 5. NO STATE PRICE RISK; FEES.
The State shall not hold cryptocurrency received under this Act. A reasonable transaction or processing fee may be charged to the payer so that acceptance is revenue-neutral to the State.

SECTION 6. IMPLEMENTATION.
The responsible agency shall adopt rules necessary to implement this Act, including the designation of one or more payment processors.

SECTION 7. SEVERABILITY.
If any provision of this Act, or its application to any person or circumstance, is held invalid, that invalidity does not affect other provisions or applications that can be given effect without the invalid provision or application, and to this end the provisions of this Act are severable.

SECTION 8. EFFECTIVE DATE.
This Act takes effect on July 1, {{YEAR}}.`,
    objections: `# Anticipated Objections & Responses — {{STATE}} Digital Asset Payments

**For committee testimony and member meetings.**

## "The State shouldn't speculate on cryptocurrency."
It will not. Payments are converted to U.S. dollars at the point of sale by a processor; the State never holds cryptocurrency and takes on no price risk.

## "Who absorbs the processing cost?"
A reasonable pass-through fee is charged to the payer, keeping the program revenue-neutral for the State.

## "Is there actual demand?"
{{PRECEDENT}} already accept digital assets for taxes or state services. This is an opt-in modernization for the residents who want it.`,
  },

  escheatment: {
    onePager: `# In-Kind Digital-Asset Escheatment — Briefing for {{STATE}} Legislators

## The problem
When digital assets are presumed abandoned and turned over to the State under unclaimed-property law, default rules built for cash often force the State to liquidate them immediately. If the asset later appreciates, the rightful owner — once located — recovers only the depressed sale price, and the State is exposed to claims that it sold a constituent's property at the wrong time.

## What this bill does
- Requires the State to hold escheated digital assets in their native form rather than automatically liquidating them.
- Directs holders to deliver the digital asset itself (or its private keys) to a qualified custodian designated by the State.
- Establishes a minimum holding period before any liquidation may occur.
- Ensures an owner who later files a valid claim receives the digital asset back in kind whenever practicable.

## Precedent
{{PRECEDENT_SENTENCE}} California's SB 822 (2025) requires escheated crypto to be held in its original form rather than auto-liquidated; Virginia's HB 798 (2025) directs the administrator to take custody in kind and hold for at least one year before any sale.

## Why {{STATE}} should act
Forced liquidation can sell a resident's property at the bottom and leaves the State open to claims that it mishandled the asset. Holding escheated digital assets in kind protects the owner's upside and updates {{STATE}}'s unclaimed-property law for assets that did not exist when those rules were written.`,
    formal: `AN ACT relating to the custody of unclaimed digital assets.

BE IT ENACTED BY {{LEGISLATURE}}:

SECTION 1. SHORT TITLE.
This Act may be cited as the "{{STATE}} Digital Asset Custody and Unclaimed Property Act."

SECTION 2. LEGISLATIVE FINDINGS.
{{LEGISLATURE}} finds that digital assets presumed abandoned should be preserved in their native form so that rightful owners retain the benefit of their property and the State avoids the risk of ill-timed liquidation.

SECTION 3. DEFINITIONS.
As used in this Act:
  (1) "Digital asset" means a digital representation of value recorded on a cryptographically secured distributed ledger.
  (2) "Qualified custodian" means a custodian meeting standards established by the State administrator by rule.

SECTION 4. DELIVERY IN KIND.
A holder delivering a digital asset presumed abandoned shall deliver the digital asset itself to a qualified custodian designated by the State, and shall not be required or permitted to liquidate it prior to delivery except as provided by rule.

SECTION 5. CUSTODY AND HOLDING PERIOD.
  (a) The State administrator shall hold a delivered digital asset in its native form through a qualified custodian.
  (b) The administrator shall not liquidate a digital asset for at least one (1) year after delivery, except where necessary to prevent loss.

SECTION 6. RETURN TO OWNER.
An owner who establishes a valid claim shall receive the digital asset returned in kind whenever practicable, or the net proceeds if it has been lawfully liquidated.

SECTION 7. SEVERABILITY.
If any provision of this Act, or its application to any person or circumstance, is held invalid, that invalidity does not affect other provisions or applications that can be given effect without the invalid provision or application, and to this end the provisions of this Act are severable.

SECTION 8. EFFECTIVE DATE.
This Act takes effect on July 1, {{YEAR}}.`,
    objections: `# Anticipated Objections & Responses — {{STATE}} Digital Asset Custody

**For committee testimony and member meetings.**

## "Why complicate unclaimed-property law?"
Default rules force liquidation, which can sell a constituent's asset at the worst possible time and expose the State to claims. Holding the asset in kind protects the owner's value.

## "Can the State safely custody digital assets?"
Yes — through a qualified custodian under standards the administrator sets by rule, the same way the State already handles other specialized property.

## "What if the asset must be sold?"
A minimum holding period applies, with sale permitted to prevent loss. An owner who later claims the property receives it back in kind, or the net proceeds if it was lawfully liquidated.`,
  },

  retirement: {
    onePager: `# Retirement & Pension Digital-Asset Authority — Briefing for {{STATE}} Legislators

## The problem
{{DEMONYM_PLURAL}} saving through state-administered retirement, 529, and defined-contribution plans often have no way to gain regulated exposure to digital assets, even as digital-asset exchange-traded products become widely available through mainstream brokerages. Plan participants are denied a diversification option that private-sector savers already enjoy.

## What this bill does
- Authorizes state-administered retirement, college-savings (529), and defined-contribution plans to offer participant-directed digital-asset or digital-asset ETP investment options.
- Keeps the choice with the participant — this is an opt-in menu option, not a mandate to invest public money.
- Requires options to use regulated products and qualified custody, with standard fiduciary and disclosure safeguards.
- Directs the administering body to set prudent eligibility and concentration limits.

## Precedent
{{PRECEDENT_SENTENCE}} Indiana's HB 1042 (2026) directs state retirement and savings plans to make digital-asset and exchange-traded-product options available to participants.

## Why {{STATE}} should act
This widens the menu for {{STATE}} savers without putting a dollar of public money into digital assets — every choice stays with the participant. Private-sector savers already buy digital-asset ETPs through ordinary brokerages; nationally {{CRYPTO_SHARE}}% of households held or used crypto in the prior year (FDIC, 2023). The bill gives the {{DEMONYM_PLURAL}} in state-run plans the same option.`,
    formal: `AN ACT to authorize digital-asset investment options in state-administered retirement and savings plans.

BE IT ENACTED BY {{LEGISLATURE}}:

SECTION 1. SHORT TITLE.
This Act may be cited as the "{{STATE}} Retirement Savings Modernization Act."

SECTION 2. LEGISLATIVE FINDINGS.
{{LEGISLATURE}} finds that participants in state-administered retirement and savings plans should have the option to obtain regulated exposure to digital assets through their own participant-directed accounts.

SECTION 3. DEFINITIONS.
As used in this Act:
  (1) "Digital asset" means a digital representation of value recorded on a cryptographically secured distributed ledger.
  (2) "Exchange-traded product" or "ETP" means a security regulated under federal law that holds or tracks one or more digital assets.
  (3) "Participant-directed account" means an account in which the participant selects investments from options the plan makes available.

SECTION 4. AUTHORITY TO OFFER DIGITAL-ASSET OPTIONS.
A state-administered retirement, college-savings, or defined-contribution plan may make available, as participant-directed options, digital assets or exchange-traded products that hold or track digital assets.

SECTION 5. SAFEGUARDS.
  (a) Options offered under this Act shall use regulated products and qualified custody.
  (b) The administering body shall establish prudent eligibility, disclosure, and concentration limits, and shall apply applicable fiduciary standards.
  (c) Nothing in this Act requires the State or any plan to invest public funds in digital assets; participation is at the election of the participant.

SECTION 6. SEVERABILITY.
If any provision of this Act, or its application to any person or circumstance, is held invalid, that invalidity does not affect other provisions or applications that can be given effect without the invalid provision or application, and to this end the provisions of this Act are severable.

SECTION 7. EFFECTIVE DATE.
This Act takes effect on July 1, {{YEAR}}.`,
    objections: `# Anticipated Objections & Responses — {{STATE}} Retirement Savings Modernization

**For committee testimony and member meetings.**

## "Don't gamble public pensions on crypto."
The bill commits no public funds. It only lets participants choose a regulated digital-asset option inside their own participant-directed accounts.

## "Isn't crypto too risky for retirement savings?"
Options must use regulated products, qualified custody, disclosure, and prudent concentration limits — and participation is entirely opt-in.

## "Why act now?"
Private-sector savers already buy digital-asset ETPs through ordinary brokerages. This simply gives {{STATE}} plan participants the same parity of choice.`,
  },

  "blockchain-records": {
    onePager: `# Blockchain Records, Signatures & Smart Contracts — Briefing for {{STATE}} Legislators

## The problem
Businesses building on blockchain in {{STATE}} face uncertainty about whether a blockchain-secured signature or record carries legal weight, and whether a smart contract is enforceable. That ambiguity raises legal risk and pushes builders toward states that have already answered the question.

## What this bill does
- Confirms that a signature or record secured through blockchain technology has the same legal status as any other electronic signature or record.
- Establishes that a contract is not unenforceable solely because it is executed or performed through a smart contract.
- Clarifies that data secured on a blockchain is not denied legal effect merely because it is in that form.
- Aligns {{STATE}} with existing electronic-transactions law (e.g., UETA) rather than creating a separate regime.

## Precedent
{{PRECEDENT_SENTENCE}} Arizona's HB 2417 (2017) recognized blockchain signatures and smart-contract enforceability; Illinois's Blockchain Technology Act (2019) recognizes blockchain-based records, signatures, and smart contracts in commerce.

## Why {{STATE}} should act
This is the legal groundwork on-chain commerce depends on. Confirming that blockchain signatures, records, and smart contracts hold up in court removes a question mark that today pushes {{STATE}} builders to incorporate elsewhere.`,
    formal: `AN ACT to recognize blockchain records, signatures, and smart contracts.

BE IT ENACTED BY {{LEGISLATURE}}:

SECTION 1. SHORT TITLE.
This Act may be cited as the "{{STATE}} Blockchain Technology Act."

SECTION 2. LEGISLATIVE FINDINGS.
{{LEGISLATURE}} finds that legal certainty for blockchain-secured records, signatures, and smart contracts supports commerce and innovation in {{STATE}}.

SECTION 3. DEFINITIONS.
As used in this Act:
  (1) "Blockchain" means a cryptographically secured, distributed ledger that records data in a verifiable and tamper-evident manner.
  (2) "Smart contract" means an event-driven program that runs on a blockchain and executes its terms automatically.

SECTION 4. LEGAL RECOGNITION.
  (a) A record or signature secured through blockchain technology shall not be denied legal effect or enforceability solely because it is in that form, and shall be treated as an electronic record or electronic signature under the laws of {{STATE}}.
  (b) A contract shall not be denied legal effect or enforceability solely because its formation or performance involves a smart contract.

SECTION 5. RELATIONSHIP TO ELECTRONIC TRANSACTIONS LAW.
This Act shall be construed consistently with {{STATE}}'s Uniform Electronic Transactions Act and shall not displace any rights or protections available under that Act.

SECTION 6. SEVERABILITY.
If any provision of this Act, or its application to any person or circumstance, is held invalid, that invalidity does not affect other provisions or applications that can be given effect without the invalid provision or application, and to this end the provisions of this Act are severable.

SECTION 7. EFFECTIVE DATE.
This Act takes effect on July 1, {{YEAR}}.`,
    objections: `# Anticipated Objections & Responses — {{STATE}} Blockchain Technology

**For committee testimony and member meetings.**

## "Don't we already have electronic-signature law?"
This bill confirms that blockchain records and signatures fit within {{STATE}}'s existing electronic-transactions law and that smart contracts are enforceable. It removes doubt rather than creating a separate regime.

## "Are smart contracts safe and enforceable?"
The bill clarifies that a contract is not void merely because it uses a smart contract. Ordinary contract defenses — fraud, mistake, unconscionability — still apply.

## "Isn't this just symbolic?"
Legal certainty is a prerequisite for serious on-chain commerce and reduces litigation risk for {{STATE}} businesses already building with the technology.`,
  },
};
