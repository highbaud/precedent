import type { CategoryId } from "../types";

export interface BillTemplate {
  /**
   * Multi-section legislator cover letter (formerly "one-pager"). Uses briefing
   * headings and may run longer than a page. The [[DATA]] marker is replaced on
   * screen and in print by a chart panel of verified state indicators; every
   * text export strips the marker (see lib/render.stripDataMarkers).
   */
  coverLetter: string;
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
    coverLetter: `# Strategic Bitcoin & Digital Asset Reserve: Briefing for {{STATE}} Legislators

## The opportunity
Inflation and currency debasement quietly erode the purchasing power of {{STATE}}'s public funds every year. A treasury concentrated entirely in cash and short-term debt holds no allocation to a scarce, non-sovereign asset that has appreciated against the dollar over multi-year horizons. A small, capped, carefully governed reserve lets {{STATE}} hedge that exposure on its own terms, and signals to a fast-growing industry that this state is open for its capital.

## What this legislation does
- Authorizes the State Treasurer to invest a capped share (e.g. up to 5%) of eligible public funds in digital assets with a market capitalization above a high threshold, a standard that today only Bitcoin meets.
- Permits holdings to be held directly, through a qualified custodian, or via a regulated exchange-traded product.
- Allows the reserve to receive assets through purchase, fork, airdrop, or donation, and to stake or manage them prudently.
- Adds legal guardrails so the reserve cannot be casually dismantled by a future session, and requires an annual public report on holdings, performance, and custody.

## How this could work in {{STATE}}
Suppose {{STATE}} placed a small, capped slice of its long-term balances into the reserve. In a year when inflation outpaces the yield on cash, that slice can offset some of the purchasing power the rest of the treasury quietly loses, while the conventional holdings that cover payroll, services, and emergencies stay exactly where they are. The allocation is capped, custodied, and reported; it is diversification, not a wager.

## What it means for your constituents
The reserve is funded from public balances, not new taxes. Every dollar of long-run appreciation accrues to the {{POPULATION}} {{DEMONYM_PLURAL}} whose taxes fund the treasury. Protecting the purchasing power of the rainy-day and operating balances that pay for schools, roads, and emergencies is a direct constituent benefit. The transparency and reporting requirements mean residents can see exactly how the reserve is governed.

## What it means for {{STATE}} businesses and the economy
A reserve is a credibility signal. It tells founders, custodians, exchanges, and investors that {{STATE}} intends to compete for digital-asset capital and the jobs that follow it, such as payments firms, custody providers, and the professional-services work around them. {{STATE}} already moves {{TRADE_TOTAL}} in international goods each year; a modern treasury posture reinforces a state that means to stay economically competitive.

[[DATA]]

## The precedent
{{PRECEDENT_SENTENCE}} New Hampshire (HB 302) was first to authorize a Strategic Bitcoin Reserve; Texas (SB 21) established a reserve outside the treasury with strong legal protections; Arizona (HB 2749) built a reserve funded in part through unclaimed digital property.

## Why {{STATE}} should act now
A capped allocation hedges the State's cash reserves against long-run dollar debasement while the bulk of the treasury stays in conventional instruments. Holding none is itself a decision, a full bet that the dollar keeps its purchasing power. Acting now lets {{STATE}} set prudent guardrails on its own terms rather than playing catch-up to the states that already moved.`,
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
    objections: `# Anticipated Objections & Responses: {{STATE}} Strategic Reserve

**A field guide for committee testimony and one-on-one member meetings. Every response is short enough to say out loud and grounded in the bill text.**

## "Cryptocurrency is too volatile to hold public money."
The bill caps exposure at a small share of eligible funds, often 5% or less. The rest of the treasury stays in cash and bonds, exactly where it is today. That capped slice hedges the far larger dollar position against long-run debasement. And holding 100% dollars is itself a bet: that the dollar keeps its purchasing power year after year.

## "This gambles with taxpayer funds."
Acquisition is optional, the cap is fixed in statute, the assets sit with a qualified custodian, and performance is reported to the public every year. The reserve cannot be liquidated on a whim. Those are the features of a governed allocation, not day-trading.

## "What happens if the price crashes right after we buy?"
The cap is the answer. Because the position is a small slice of eligible funds, even a steep drawdown touches only that slice while payroll, services, and emergency reserves stay untouched. The rebalancing policy sets the rules in advance, so decisions are made by design rather than in a panic.

## "Does the State have the expertise to custody Bitcoin safely?"
The bill does not ask anyone to keep private keys on a laptop. It authorizes qualified custodians and regulated exchange-traded products, the same institutions that already custody assets for pension funds and public companies. The Treasurer sets custody and key-management standards through rulemaking.

## "Why not wait for the federal government to act first?"
Federal timing is uncertain and outside the State's control. {{PRECEDENT}} already moved under their own treasury authority. States that act early tend to attract the custodians, exchanges, and capital that follow a clear policy signal.

## "Isn't this just speculation dressed up as policy?"
Speculation has no cap, no custody rules, and no public reporting. This reserve has all three. The purpose is to protect the purchasing power of long-term balances, and every dollar of appreciation returns to the {{DEMONYM_PLURAL}} whose taxes fund the treasury.

## "Could a future legislature get stuck with a bad position?"
No. The reserve runs on an explicit rebalancing policy and can be adjusted or unwound by the legislature itself. The safeguards block casual liquidation by a single official; they never tie the hands of the body that created the reserve.`,
  },

  "self-custody": {
    coverLetter: `# Digital Asset Rights & Self-Custody Protections: Briefing for {{STATE}} Legislators

## The opportunity
Without explicit statutory protection, {{DEMONYM_PLURAL}} who hold their own digital assets, run blockchain nodes, or participate in staking face legal uncertainty and the risk of local bans or discriminatory rules. A federal central bank digital currency (CBDC) could also be used to surveil or restrict lawful transactions. A clear statement of rights costs the State nothing and settles these questions in {{STATE}}'s favor.

## What this legislation does
- Affirms the right of any individual or business to self-custody digital assets in a self-hosted wallet.
- Protects the right to operate a blockchain node and to participate in staking.
- Bans state and local government from accepting or requiring a CBDC.
- Protects against unlawful de-banking based solely on lawful digital-asset activity.
- Clarifies that running a node or staking is not, by itself, money transmission or a securities offering.

## How this could work in {{STATE}}
Picture a {{DEMONYM}} small-business owner who accepts digital-asset payments and keeps them in a self-hosted wallet. Under this law, no {{STATE}}-chartered bank could close her account simply for that lawful activity, and she keeps the right to control her own keys, the digital equivalent of keeping cash in her own safe. A hobbyist running a node from home, or a {{DEMONYM}} staking to help secure a network, gets the same certainty: those acts are not money transmission and do not require a license.

## What it means for your constituents
These protections matter most to the {{DEMONYM_PLURAL}} the banking system already underserves. As the figures below show, a meaningful share of {{STATE}} households are unbanked or underbanked. A self-hosted wallet gives those households a way to save and transact that does not hinge on a nearby branch or a minimum balance, and the anti–de-banking and anti-CBDC provisions protect every resident's financial privacy from being conditioned on their lawful choices. This is a financial-freedom and consumer-protection measure constituents can feel.

## What it means for {{STATE}} businesses and the economy
Legal clarity is what keeps digital-asset builders inside the state instead of incorporating elsewhere, along with the engineering, compliance, and support jobs they bring. Confirming that node operation and staking are not money transmission removes a licensing cloud that today deters small operators. Predictable rules compound: they make {{STATE}} a place where this part of the economy can plan and hire.

[[DATA]]

## The precedent
{{PRECEDENT_SENTENCE}} Kentucky's Blockchain Digital Assets Act (HB 701) passed 91-0 and 37-0; Montana's SB 265 bans state CBDC acceptance and protects self-custody; Wyoming's HB 0308 defends against de-banking and unreasonable searches of private keys.

## Why {{STATE}} should act now
This is a rights-and-clarification measure with no appropriation and no new program. It tells {{DEMONYM_PLURAL}} that {{STATE}} treats financial privacy and self-ownership as rights worth defending, and it does so before discriminatory local rules or federal pressure foreclose the option.`,
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
    objections: `# Anticipated Objections & Responses: {{STATE}} Digital Asset Freedom

**A field guide for committee testimony and one-on-one member meetings. Every response is short enough to say out loud and grounded in the bill text.**

## "Won't this help criminals hide money?"
No. Self-custody, running a node, and staking are lawful activities done by ordinary owners. The bill does not touch criminal law, and it leaves every anti-money-laundering duty on exchanges and money transmitters in place. Protecting a law-abiding owner's property does nothing to shield a criminal from prosecution.

## "Isn't banning a state CBDC premature?"
The bill bars only state acceptance of or participation in a central bank digital currency. It does not regulate the Federal Reserve and does not block any federal program. It keeps the decision with {{STATE}}'s own elected officials and costs the State nothing.

## "Why does the State need to protect self-custody at all?"
Without a statute, the right is only as safe as the next local ordinance or agency interpretation. A clear law settles the question in advance, so a {{DEMONYM}} who holds their own keys is not exposed to a patchwork of conflicting rules. Kentucky's HB 701 passed 91-0 in the House and 37-0 in the Senate, which shows how broad the agreement on this point can be.

## "Could protecting node operators open a licensing loophole?"
No. The bill says that running a node or staking, by itself, is not money transmission or a securities offering. A person who actually takes custody of other people's funds remains subject to the licensing laws that already apply. The clarification lifts a cloud over hobbyists and validators, nothing more.

## "What does the anti-de-banking provision actually require of banks?"
It bars a {{STATE}}-chartered institution from closing or denying an account solely because the customer lawfully uses digital assets. Banks keep every other tool: ordinary underwriting, fraud controls, and their federal compliance obligations. The bill targets discrimination based only on lawful activity.

## "Does this cost the State anything?"
No. There is no appropriation and no new program. It is a statement of rights and a clarification of existing law.

## "Is this a fringe concern or a real one?"
Real. Montana's SB 265 and Wyoming's HB 0308 were enacted precisely because owners faced account closures and uncertainty over their own keys. The protections matter most to unbanked and underbanked households, who can use a self-hosted wallet without a nearby branch or a minimum balance.`,
  },

  mining: {
    coverLetter: `# Mining Rights & Tax Incentives: Briefing for {{STATE}} Legislators

## The opportunity
Digital-asset mining and data centers create jobs, stabilize electrical grids, and monetize stranded energy. Yet operators in many states face discriminatory zoning, punitive utility rates, and special taxes that other data centers never see. That uncertainty pushes investment to friendlier states. Clear, non-discriminatory rules let {{STATE}} convert its energy resources into local tax base and employment.

## What this legislation does
- Grants digital-asset miners the same legal treatment as comparable data centers.
- Prohibits discriminatory utility rates aimed specifically at miners.
- Bars local governments from using zoning or noise rules to single out mining where other data centers are permitted.
- Protects the right to mine at home for personal use.
- Confirms that using digital assets as a means of payment triggers no additional state tax.

## How this could work in {{STATE}}
Imagine a rural {{STATE}} county with a gas well that flares off excess product, or a wind or solar site that curtails output when demand is low. A mining operation can site next to that energy, buy the power that would otherwise be wasted, and ramp down within seconds when the grid is stressed. The county gains payroll and property-tax base; the utility gains a flexible customer that improves its economics; and the wasted energy becomes productive, none of it at the expense of other ratepayers.

## What it means for your constituents
Mining facilities tend to land in rural counties that draw little other capital investment, bringing construction work, operating jobs, and property-tax base to communities that need them. Because mining loads can be paid to power down within seconds when the grid is stressed, they also act as a flexible buyer of last resort, helping hold electricity rates steady for every ratepayer in the area, not just the operator.

## What it means for {{STATE}} businesses and the economy
Mining monetizes energy that would otherwise be wasted, such as stranded gas and curtailed wind and solar, turning it into revenue and grid resilience. Data-center parity signals that {{STATE}} welcomes capital-intensive computing infrastructure generally, the same buildout that supports {{STATE}}'s wider trade economy of {{TRADE_TOTAL}} in annual goods. Non-discriminatory rules are precisely what bring those facilities here rather than to a neighboring state.

[[DATA]]

## The precedent
{{PRECEDENT_SENTENCE}} Montana's Right to Mine Act (SB 178) is the model for non-discrimination; Arkansas (HB 1799) gives miners data-center parity; Kentucky (HB 230 / SB 255) provides targeted tax exemptions for large operations.

## Why {{STATE}} should act now
Mining capital is mobile and sites quickly. Every quarter {{STATE}} leaves the question unanswered, operators break ground in states that have already granted parity. A simple non-discrimination standard keeps that investment, along with its jobs and grid benefits, inside {{STATE}}.`,
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
    objections: `# Anticipated Objections & Responses: {{STATE}} Right to Mine

**A field guide for committee testimony and one-on-one member meetings. Every response is short enough to say out loud and grounded in the bill text.**

## "Mining wastes energy."
Mining loads are interruptible and can power down within seconds when the grid is stressed, which makes them a flexible customer rather than a strain. Many operations run on stranded gas that would otherwise be flared, or on wind and solar output that would otherwise be curtailed. The bill grants parity with other data centers and no special energy subsidy.

## "Mining operations are noisy and disruptive."
The bill keeps every generally applicable noise ordinance in force. It stops only the rules that single out miners while letting comparable data centers operate freely. Neighbors keep the same protections they have today.

## "Why give miners special treatment?"
It is the reverse of special treatment. Non-discrimination means a mining facility cannot be taxed, zoned, or charged a utility rate worse than the data center next door. Montana's SB 178 is built entirely around that equal-footing principle.

## "Won't miners drive up electricity rates for everyone else?"
Usually the opposite. Because mining demand can be curtailed on command, it lets utilities sell power that would otherwise be wasted and improves the grid's economics for all ratepayers. The bill also bars utility rate classes that would shift costs unfairly onto miners.

## "Aren't these jobs temporary?"
Construction is temporary; operations are not. A facility brings ongoing payroll, property-tax base, and maintenance contracts to rural counties that draw little other capital. Arkansas's HB 1799 was passed to capture exactly that kind of lasting local investment.

## "What about water use and local impact?"
Generally applicable environmental and land-use laws still apply in full. The bill removes discriminatory targeting, not the ordinary permitting and review that every large facility goes through. Local governments keep their standard tools.

## "Is there proven demand for this in other states?"
Yes. Kentucky paired targeted tax treatment for large operations in HB 230 and SB 255 with a clear welcome, and Montana and Arkansas followed with parity statutes. Mining capital is mobile and sites quickly, so the states that answer the question first tend to win the build-out.`,
  },

  "stablecoin-bank": {
    coverLetter: `# Stablecoins & Digital Banking: Briefing for {{STATE}} Legislators

## The opportunity
{{STATE}} lacks a regulated, fully reserved framework for a state-backed stablecoin or for chartering banks purpose-built to custody digital assets. As a result, digital-dollar activity flows to other jurisdictions, and businesses that need compliant digital-asset banking look elsewhere. A fully backed framework brings that settlement and custody onshore under {{STATE}}'s own supervision.

## What this legislation does
- Authorizes a fully reserved state stable token, redeemable on demand for one U.S. dollar, backed 100% by cash and short-term U.S. Treasuries held in trust.
- Establishes a commission to administer the token transparently, with independent attestations published monthly.
- Creates a charter for digital-asset depository institutions: special-purpose, non-lending banks built to custody digital assets under state supervision.
- Directs excess trust earnings to a designated public-benefit fund.

## How this could work in {{STATE}}
Consider a {{DEMONYM}} without a bank account who needs to send money to family or pay a bill. A fully reserved, redeemable state digital dollar, backed entirely by cash and short-term Treasuries, lets her hold and move dollars from a phone, at low cost, with no minimum balance and no collapse risk. Meanwhile a {{STATE}} fintech that needs compliant custody can charter in-state under the regulator's supervision instead of routing the activity offshore.

## What it means for your constituents
A redeemable, fully reserved digital dollar gives households a low-cost way to hold and move money, reaching the residents the current system leaves out, shown in the banking-access figures below. Because the token is backed entirely by cash and short-term Treasuries, constituents bear none of the collapse risk of an algorithmic coin. Surplus trust earnings flowing to a public-benefit fund means the framework can fund services without raising taxes.

## What it means for {{STATE}} businesses and the economy
A supervised charter for digital-asset custody gives {{STATE}} fintechs, payment companies, and exchanges a compliant home base instead of an offshore one, anchoring those firms, their deposits, and their jobs in-state. A transparent, fully reserved digital dollar also lowers settlement friction for the businesses that move {{STATE}}'s {{TRADE_TOTAL}} in annual goods trade.

[[DATA]]

## The precedent
{{PRECEDENT_SENTENCE}} Wyoming's Stable Token Act (SF0127 / SF0021) created the first government-issued, fully reserved stablecoin; Nebraska's Financial Innovation Act (LB 649) chartered digital-asset depository institutions.

## Why {{STATE}} should act now
The fully reserved design means each token is matched by cash and Treasuries. That is diversification and consumer protection, not speculation. Establishing the framework now lets {{STATE}} capture the supervised banking category and its non-tax revenue before the activity settles permanently in another state.`,
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
    objections: `# Anticipated Objections & Responses: {{STATE}} Stable Token & Digital Banking

**A field guide for committee testimony and one-on-one member meetings. Every response is short enough to say out loud and grounded in the bill text.**

## "Stablecoins collapse. Remember TerraUSD."
TerraUSD was an algorithmic token propped up by another volatile crypto asset, not by cash. This token is different in kind: redeemable on demand for one dollar and backed at no less than 100% by cash and short-term U.S. Treasuries held in trust, with independent attestations published every month. There is no algorithm holding the peg, only reserves.

## "Is the State competing with private banks?"
No. The charter is for special-purpose custody institutions that do not lend out customer assets. Traditional banks generally do not offer full-reserve digital-asset custody, so the framework fills a gap rather than taking their business.

## "What is the risk and cost to the State?"
Each token is matched one-for-one by cash and Treasuries, so the reserve covers every unit in circulation. Excess earnings on the trust flow to a public-benefit fund, which creates non-tax revenue. The design is built to fund itself.

## "What stops the reserve from being raided or mismanaged?"
The reserves sit in trust, segregated from State operating funds, and cannot be spent like general revenue. Monthly third-party attestations make any shortfall visible right away. Redemption at par is the customer's right, not a discretionary promise.

## "Don't federal rules already cover stablecoins?"
Federal policy is still settling, and this framework is written to operate under {{STATE}} supervision within it. A fully reserved, audited, state-chartered model is conservative by design and adjusts as federal standards firm up. Waiting only sends the activity elsewhere in the meantime.

## "Why charter new institutions instead of using existing banks?"
Most banks are built to lend, which means customer deposits are put to work rather than held one-for-one. A custody charter is purpose-built to hold digital assets in full reserve under state rules, which is a different job. The two models can coexist.

## "Who actually uses a state stable token?"
Businesses that need to settle payments quickly and cheaply, and residents who want a dollar-denominated instrument that clears in seconds. Wyoming built its stable token framework for this purpose, and the demand comes from firms that today route the activity through other states or offshore.`,
  },

  dao: {
    coverLetter: `# DAO Recognition & Legal Frameworks: Briefing for {{STATE}} Legislators

## The opportunity
Decentralized Autonomous Organizations (DAOs) coordinate capital and labor through smart contracts, but in most states they have no legal form. Without recognition, their members risk being treated as a general partnership, exposing each member to unlimited personal liability for the organization's acts. A clear legal form fixes that and gives these organizations a reason to make {{STATE}} their legal home.

## What this legislation does
- Creates a legal form for DAOs (a DAO limited liability company or a decentralized unincorporated nonprofit association).
- Grants limited liability to members and managers so individuals are not personally liable merely for membership.
- Recognizes governance and operation through smart contracts and on-chain voting.
- Requires a DAO to put a means of contact and its governing smart contracts on the public record, and provides default rules for membership, dissolution, and recordkeeping.

## How this could work in {{STATE}}
Consider a group of {{DEMONYM_PLURAL}} who pool funds online to back a shared cause, such as a scholarship, a research grant, or a community project, and vote on how the money is spent. Today they may be treated as a general partnership, exposing each member's personal assets to the group's obligations. Under this law they can form a recognized entity, put their governing rules and a point of contact on the public record, hold and disburse funds transparently on-chain, and cap each member's liability, all under {{STATE}} jurisdiction, with disputes resolved in {{STATE}} courts.

## What it means for your constituents
Any {{DEMONYM}} who joins a DAO today may be carrying the unlimited personal liability of a general partner without realizing it. This bill extends them the same limited-liability protection every LLC member already enjoys, a straightforward consumer protection for the residents participating in these organizations. The public-record requirement also gives constituents transacting with a DAO a real point of contact.

## What it means for {{STATE}} businesses and the economy
Legal clarity gives crypto-native organizations a reason to register, bank, and contract in {{STATE}}, which generates filing revenue for the State and recurring work for local lawyers, accountants, and registered agents. States that moved early on entity innovation have historically captured outsized formation activity; this is the same playbook applied to a new organizational form.

[[DATA]]

## The precedent
{{PRECEDENT_SENTENCE}} Wyoming pioneered the DAO LLC (2021) and the Decentralized Unincorporated Nonprofit Association (DUNA) Act (SF0050, 2024); Tennessee created a dedicated DAO LLC category (SB 2854 / HB 2645, 2022).

## Why {{STATE}} should act now
Entity formation is sticky. Organizations that incorporate elsewhere rarely re-domicile. Recognizing DAOs now lets {{STATE}} capture the filing fees and professional-services work that would otherwise go offshore or to a neighboring state, while protecting the {{DEMONYM_PLURAL}} who participate today.`,
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
    objections: `# Anticipated Objections & Responses: {{STATE}} DAO Recognition

**A field guide for committee testimony and one-on-one member meetings. Every response is short enough to say out loud and grounded in the bill text.**

## "DAOs are just a liability shield for bad actors."
A recognized DAO must put a point of contact and its governing smart contracts on the public record, which is more transparency than many private entities provide. Limited liability is the same protection every LLC member already enjoys. An entity on the record is easier to find and hold accountable, not harder.

## "Won't members hide behind the entity to avoid responsibility?"
Limited liability protects a member from the entity's debts; it never protects anyone from their own fraud or misconduct. Those claims survive exactly as they do against any LLC member. The bill caps the exposure of innocent participants, not the accountability of wrongdoers.

## "Courts won't know how to handle DAOs."
Recognition is what gives a court something to work with. The bill grants a DAO clear standing to sue and be sued, hold property, and enter contracts, and it supplies default rules for membership and dissolution. That reduces litigation uncertainty rather than adding to it.

## "What about people who deal with a DAO and get hurt?"
They are better off under this law than without it. Today a counterparty may not even know whom to contact or serve. The public-record requirement gives them a named point of contact and a recognized entity to bring a claim against in {{STATE}} courts.

## "Aren't these organizations going to operate anyway?"
They already do, often as unincorporated groups whose members carry unlimited personal liability without realizing it. Recognition pulls that activity onto the public record and into {{STATE}}'s jurisdiction, with disputes resolved here. The real choice is whether the State governs it or watches it form elsewhere.

## "Is there real demand for this?"
Yes. Wyoming created the DAO LLC in 2021 and the Decentralized Unincorporated Nonprofit Association in 2024, and Tennessee added a dedicated DAO LLC category. Those states now attract registrations, filing fees, and the professional work that comes with them.

## "Why should {{STATE}} move before most states have?"
Entity formation is sticky. Organizations rarely re-domicile once they incorporate, so the filing fees and recurring professional work tend to stay where a group first registers. Acting early is how a state captures that base instead of ceding it to a neighbor.`,
  },

  property: {
    coverLetter: `# Digital Assets as Property: Briefing for {{STATE}} Legislators

## The opportunity
{{STATE}} law does not clearly define digital assets or establish how ownership is determined and transferred. That ambiguity makes disputes hard to resolve, complicates secured lending, and deters businesses that need legal certainty. A clear property framework is the foundation every other digital-asset law builds on, and it costs the State nothing to enact.

## What this legislation does
- Defines "virtual currency" and "digital asset" in the {{STATE}} commercial code.
- Establishes that digital assets are a form of property under state law.
- Creates clear rules for who has rights in a digital asset and how those rights transfer.
- Introduces a "qualifying purchaser" concept so good-faith buyers take assets free of competing claims, providing predictability for ownership disputes.

## How this could work in {{STATE}}
Suppose a {{STATE}} lender wants to accept digital assets as collateral for a loan, or two parties end up disputing who owns a transferred token. Without a property rule, a {{STATE}} judge has little statute to apply and the lender has little certainty to make the loan. This framework gives the court a clear rule and the lender the predictability to lend, the same kind of settled expectation that already governs cash and securities.

## What it means for your constituents
When ownership rules are clear, ordinary {{DEMONYM_PLURAL}} are protected: a good-faith buyer keeps what they bought, an estate can be settled, and a fraud victim has a defined claim. Legal certainty also lowers the cost of resolving disputes, which means fewer {{DEMONYM_PLURAL}} dragged through avoidable litigation over who owns what.

## What it means for {{STATE}} businesses and the economy
Businesses will not custody or transact in assets whose ownership the law leaves undefined. A property framework lets {{STATE}} lenders take digital assets as collateral, lets exchanges and custodians operate with confidence, and signals to the wider economy, one that already moves {{TRADE_TOTAL}} in annual goods, that {{STATE}} offers the commercial certainty serious firms require.

[[DATA]]

## The precedent
{{PRECEDENT_SENTENCE}} Texas's Virtual Currency Act (HB 4474) brought digital assets under the commercial code and created the "qualifying purchaser" framework; Nebraska's LB 649 established foundational definitions for blockchain operations.

## Why {{STATE}} should act now
Every transaction, loan, and inheritance touching a digital asset in {{STATE}} today carries avoidable legal risk. Defining these rights now gives courts, lenders, and residents a settled foundation before the disputes pile up, along with the businesses that route around the uncertainty.`,
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
    objections: `# Anticipated Objections & Responses: {{STATE}} Digital Asset Property

**A field guide for committee testimony and one-on-one member meetings. Every response is short enough to say out loud and grounded in the bill text.**

## "Isn't this really federal securities law?"
No. The bill defines property rights and how ownership transfers under {{STATE}} commercial law. It does not classify any asset as a security and does not touch federal securities regulation. Those are separate questions, left untouched.

## "Why do we need new definitions at all?"
Without them, {{STATE}} courts have no clear rule for ownership disputes or secured lending involving digital assets. Clear definitions lower legal risk for residents and businesses and keep cases out of expensive, unpredictable litigation. Texas addressed this directly in HB 4474.

## "Does recognizing digital assets as property endorse speculation?"
No more than recognizing a car or a share of stock as property endorses speculation in those. Property law settles who owns a thing and how ownership moves. It stays neutral on whether anyone should buy the asset in the first place.

## "Could this conflict with the Uniform Commercial Code?"
It is drafted to complement the UCC reforms and to be read for uniformity and commercial certainty. The aim is consistency with the national framework, not divergence from it.

## "Will this expose the State to new liability?"
No. The bill allocates rights between private parties in a transaction. It creates no State program, no appropriation, and no new State obligation. It simply hands courts a rulebook they currently lack.

## "Why now, rather than waiting for a test case?"
Waiting for litigation makes residents and businesses absorb the uncertainty in the meantime, and the first rulings may conflict from one court to the next. Setting the rule in statute up front is cheaper and far more predictable than discovering it one lawsuit at a time.`,
  },

  "ucc-12": {
    coverLetter: `# UCC Article 12, Controllable Electronic Records: Briefing for {{STATE}} Legislators

## The opportunity
The Uniform Commercial Code, which governs nearly all commercial transactions, was written before digital assets existed. Without the 2022 amendments, {{STATE}} law has no clear rule for how ownership of crypto and similar assets transfers, creating risk for every sale, loan, and secured transaction involving them. Adopting the uniform fix keeps {{STATE}} consistent with the national standard rather than leaving it an outlier.

## What this legislation does
- Adopts the 2022 UCC amendments, including new Article 12 governing "Controllable Electronic Records" (CERs) such as crypto and certain digital tokens.
- Establishes that whoever has "control" of a digital asset has the priority legal interest in it.
- Creates "take-free" rules so a good-faith purchaser acquires the asset free of third-party property claims, functioning like cash or a negotiable instrument.
- Amends Article 9 so digital assets can be used as collateral in secured lending.

## How this could work in {{STATE}}
Suppose a {{STATE}} business pledges digital assets as collateral to secure a working-capital loan, or a buyer purchases a token in good faith and later faces a competing claim. Article 12's control and take-free rules tell the lender, the buyer, and the court exactly who has priority, the same way the law already settles claims to cash and negotiable instruments. Article 9's conforming changes let the lender perfect its interest, so the loan can actually be made.

## What it means for your constituents
Uniform rules protect ordinary {{DEMONYM_PLURAL}}: a good-faith purchaser takes free of hidden claims, and disputes resolve under a predictable, nationally consistent standard instead of ad-hoc rulings. Consistency with other states also means a {{DEMONYM}}'s transaction is treated the same whether the counterparty is in {{STATE}} or across the country.

## What it means for {{STATE}} businesses and the economy
Secured lending against digital assets becomes possible, unlocking working capital for {{STATE}} businesses that hold them. Banks, lenders, and counterparties gain the certainty they need to transact, and {{STATE}} avoids being the outlier jurisdiction that sophisticated parties route around.

[[DATA]]

## The precedent
{{PRECEDENT_SENTENCE}} As of late 2025, roughly 33 states and the District of Columbia had adopted these amendments, including Delaware, New York, and California, making this among the most widely enacted digital-asset reforms in the country.

## Why {{STATE}} should act now
This is uniform model law from the Uniform Law Commission, not novel policy, and a substantial majority of states have already adopted it. The risky path is being the outlier: every sale, loan, or secured transaction touching a digital asset in a non-adopting state carries legal uncertainty, and a built-in transition period eases the change for existing deals.`,
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
    objections: `# Anticipated Objections & Responses: {{STATE}} UCC Article 12

**A field guide for committee testimony and one-on-one member meetings. Every response is short enough to say out loud and grounded in the bill text.**

## "This sounds complex and risky."
It is uniform model law drafted by the Uniform Law Commission, the same body behind the commercial code {{STATE}} already uses. Roughly 33 states and the District of Columbia have adopted it, including Delaware, New York, and California. The risky path is being the outlier whose law has no rule for these transactions.

## "Does this endorse crypto speculation?"
No. Article 12 sets neutral rules for how control and ownership of a digital record transfer. They work the same way the take-free rules already work for cash and negotiable instruments, and they say nothing about whether anyone should own the asset.

## "Why adopt a uniform act instead of writing our own?"
The whole value of the UCC is that it reads the same across state lines, so a transaction is treated consistently whether the counterparty is here or across the country. A one-off {{STATE}} version would forfeit that consistency and create the very conflicts the code exists to prevent.

## "Does this disturb existing contracts and security interests?"
The act includes a transition period, commonly a year, so pre-existing transactions have time to conform. The conforming amendments to Article 9 let a lender perfect a security interest in these assets by control, which protects deals rather than unsettling them.

## "Is there any urgency?"
Every sale, loan, or secured transaction touching a digital asset in a non-adopting state carries avoidable legal uncertainty. As more states adopt, the holdouts become the jurisdictions sophisticated parties route around. The built-in transition period eases the change for existing deals.

## "What does the State gain by adopting it?"
Secured lending against digital assets becomes possible, which unlocks working capital for {{STATE}} businesses that hold them. Banks and counterparties get the certainty they need to transact here. The State spends nothing and aligns with the national standard.`,
  },

  "tax-acceptance": {
    coverLetter: `# State Acceptance of Crypto for Taxes & Fees: Briefing for {{STATE}} Legislators

## The opportunity
{{STATE}} residents and businesses increasingly hold value in digital assets, yet the State accepts only legal tender for taxes and fees. That gap signals {{STATE}} is behind on payments modernization and forgoes a simple, no-risk way to show that digital assets are a legitimate part of the economy. A processor-based program lets {{STATE}} accept these payments while receiving dollars and bearing no price risk.

## What this legislation does
- Authorizes (or directs) designated state agencies to accept cryptocurrency for taxes, fees, fines, and other amounts owed to the State.
- Requires payments to be processed through a third-party processor that converts the digital asset to U.S. dollars at the point of sale, so the State bears no price risk and receives dollars.
- Permits a reasonable processing fee to be passed through to the paying party, keeping the program revenue-neutral for the State.
- Directs the responsible agency to publish a simple implementation rule.

## How this could work in {{STATE}}
Picture a {{DEMONYM}} who holds digital assets and wants to pay a state fee or tax bill with them. At checkout, a payment processor converts the payment to U.S. dollars instantly; the resident pays the way they prefer, {{STATE}} receives dollars, and a modest processing fee, charged to the payer, keeps the program revenue-neutral for the State. The State never touches or holds cryptocurrency.

## What it means for your constituents
This is a convenience and modernization win that meets {{DEMONYM_PLURAL}} where they are. Nationally, {{CRYPTO_SHARE}}% of households used or held crypto in the prior year (FDIC, 2023). Participation is entirely optional: residents who prefer to pay in dollars are unaffected, and those who hold digital assets get a payment option {{STATE}} currently denies them.

## What it means for {{STATE}} businesses and the economy
Accepting digital assets for taxes and fees is a visible signal that {{STATE}} treats the sector as a normal part of commerce, the kind of signal that influences where payment firms and digital-asset businesses choose to locate. Because a processor handles conversion, the State modernizes its payments rails without taking on market risk or new liability.

[[DATA]]

## The precedent
{{PRECEDENT_SENTENCE}} Colorado's Department of Revenue began accepting cryptocurrency for all state taxes in 2022; Utah operates a statewide crypto payment program; Louisiana accepts digital assets for state services.

## Why {{STATE}} should act now
The design carries no downside for the State. A processor converts each payment to dollars at the point of sale, and the program is revenue-neutral. It is a low-cost, high-visibility step {{STATE}} can take immediately to show it is keeping pace with how its residents and businesses already transact.`,
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
    objections: `# Anticipated Objections & Responses: {{STATE}} Digital Asset Payments

**A field guide for committee testimony and one-on-one member meetings. Every response is short enough to say out loud and grounded in the bill text.**

## "The State shouldn't speculate on cryptocurrency."
It will not hold any. A payment processor converts the digital asset to U.S. dollars at the point of sale, and the State receives dollars. There is no holding period and no price exposure for the treasury.

## "Who absorbs the processing cost?"
A reasonable pass-through fee is charged to the payer who chooses this option, which keeps the program revenue-neutral for the State. Residents who pay the traditional way are unaffected.

## "What about volatility between payment and settlement?"
There is none for the State. Conversion happens at the moment of payment, so the dollar amount owed is the dollar amount received. The processor, not the treasury, bears any intraday movement.

## "Could this complicate the State's books or audits?"
No. From the treasury's view the receipt is a dollar deposit from a processor, recorded like any card settlement. The accounting stays ordinary because the State never touches the underlying asset.

## "Why should government bother accepting crypto at all?"
A growing share of residents and businesses hold value this way, and a processor-based program lets the State meet them at no risk. It also signals that {{STATE}} treats digital assets as a legitimate part of the economy, which matters to the firms deciding where to locate.

## "Is there actual demand?"
{{PRECEDENT_SENTENCE}} The program is opt-in, so it serves the residents and businesses who want it without imposing anything on those who do not.`,
  },

  escheatment: {
    coverLetter: `# In-Kind Digital-Asset Escheatment: Briefing for {{STATE}} Legislators

## The opportunity
When digital assets are presumed abandoned and turned over to the State under unclaimed-property law, default rules built for cash often force immediate liquidation. If the asset later appreciates, the rightful owner, once located, recovers only the depressed sale price, and the State is exposed to claims that it sold a constituent's property at the wrong time. Holding these assets in kind fixes both problems and modernizes a statute written before digital assets existed.

## What this legislation does
- Requires the State to hold escheated digital assets in their native form rather than automatically liquidating them.
- Directs holders to deliver the digital asset itself (or its private keys) to a qualified custodian designated by the State.
- Establishes a minimum holding period before any liquidation may occur.
- Ensures an owner who later files a valid claim receives the digital asset back in kind whenever practicable.

## How this could work in {{STATE}}
Suppose a dormant account holding digital assets is reported to {{STATE}} as unclaimed property, and the asset's value climbs while the State searches for the owner. Under current default rules the State might have sold it on day one, leaving the owner with the old, lower price. Under this bill, a qualified custodian holds the asset in its native form; when the {{DEMONYM}} owner is found and files a valid claim, they receive the asset itself back, its full present value intact.

## What it means for your constituents
This is squarely a property-protection measure for {{DEMONYM_PLURAL}}. It ensures that a resident reunited with abandoned property gets back what was actually theirs, the asset and its appreciation, rather than a number the State locked in at the worst possible moment. It treats digital assets the way owners would expect their own property to be handled.

## What it means for {{STATE}} businesses and the economy
Clear in-kind custody rules reduce the State's litigation exposure and give holders, including exchanges, custodians, and financial institutions reporting unclaimed property, a defined, predictable process to follow. That clarity lowers compliance friction for the {{STATE}} businesses that must report and remit these assets.

[[DATA]]

## The precedent
{{PRECEDENT_SENTENCE}} California's SB 822 (2025) requires escheated crypto to be held in its original form rather than auto-liquidated; Virginia's HB 798 (2025) directs the administrator to take custody in kind and hold for at least one year before any sale.

## Why {{STATE}} should act now
Forced liquidation can sell a resident's property at the bottom and leaves the State open to claims that it mishandled the asset. Updating the unclaimed-property statute now, before more digital assets flow into the system, protects owners' value and shields the State from avoidable liability.`,
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
    objections: `# Anticipated Objections & Responses: {{STATE}} Digital Asset Custody

**A field guide for committee testimony and one-on-one member meetings. Every response is short enough to say out loud and grounded in the bill text.**

## "Why complicate unclaimed-property law?"
The current default is what creates the problem: it can force the sale of a resident's asset the moment it arrives, locking in a low price and exposing the State to claims that it sold at the wrong time. Holding the asset in its native form protects the owner's value and the State alike.

## "Can the State safely custody digital assets?"
Yes, through a qualified custodian under standards the administrator sets by rule. This is the same approach the State already uses for other specialized property it does not hold directly. No keys sit on the State's own servers.

## "What if the asset has to be sold?"
A minimum holding period applies, commonly a year, with an earlier sale permitted only to prevent loss. An owner who later files a valid claim receives the asset back in kind when practicable, or the net proceeds if it was lawfully sold.

## "Isn't it simpler to just liquidate everything?"
Simpler for the paperwork, worse for the owner, and riskier for the State. California's SB 822 and Virginia's HB 798 both moved away from automatic liquidation for this reason. In-kind custody is the model other states are converging on.

## "Does this put the State in the business of picking investments?"
No. Holding an asset in the form it arrived in is the opposite of an investment decision. The State is preserving someone else's property until they claim it, not allocating public funds.

## "Who pays for the custody?"
Custody costs are modest and can be drawn from the property itself or set by rule, the same way administrative costs are handled elsewhere in unclaimed-property law. Defending claims over ill-timed sales is the far more expensive alternative.`,
  },

  retirement: {
    coverLetter: `# Retirement & Pension Digital-Asset Authority: Briefing for {{STATE}} Legislators

## The opportunity
{{DEMONYM_PLURAL}} saving through state-administered retirement, 529, and defined-contribution plans often have no way to gain regulated exposure to digital assets, even as digital-asset exchange-traded products become widely available through mainstream brokerages. Plan participants are denied a diversification option that private-sector savers already enjoy, and the State can extend it without committing a dollar of public money.

## What this legislation does
- Authorizes state-administered retirement, college-savings (529), and defined-contribution plans to offer participant-directed digital-asset or digital-asset ETP investment options.
- Keeps the choice with the participant. This is an opt-in menu option, not a mandate to invest public money.
- Requires options to use regulated products and qualified custody, with standard fiduciary and disclosure safeguards.
- Directs the administering body to set prudent eligibility and concentration limits.

## How this could work in {{STATE}}
Consider a {{DEMONYM}} saving in a state-administered defined-contribution or 529 plan who wants a small, regulated digital-asset option, the same kind of exchange-traded product their neighbor already buys through an ordinary brokerage. This law lets the plan add that option to its menu, subject to qualified custody and concentration limits. The participant decides whether to use it; the State commits no public funds and bears no investment risk.

## What it means for your constituents
This is about parity of choice. {{DEMONYM_PLURAL}} in state-run plans get access to the same regulated diversification tool private-sector savers already have. Nationally, {{CRYPTO_SHARE}}% of households held or used crypto in the prior year (FDIC, 2023). Strict guardrails (regulated products, qualified custody, disclosure, prudent limits) protect participants, and because it is opt-in, no one is exposed who does not choose to be.

## What it means for {{STATE}} businesses and the economy
A modern, competitive plan menu helps {{STATE}} attract and retain talent in a labor market where every advantage matters. Offering current, well-governed savings options signals that {{STATE}} keeps its public programs in step with the mainstream financial products its workforce already uses.

[[DATA]]

## The precedent
{{PRECEDENT_SENTENCE}} Indiana's HB 1042 (2026) directs state retirement and savings plans to make digital-asset and exchange-traded-product options available to participants.

## Why {{STATE}} should act now
The bill commits no public funds and creates no mandate. It simply lets participants choose a regulated option inside their own accounts. Private-sector savers already have this access; extending the same parity to {{STATE}} plan participants now is a low-risk, opt-in modernization.`,
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
    objections: `# Anticipated Objections & Responses: {{STATE}} Retirement Savings Modernization

**A field guide for committee testimony and one-on-one member meetings. Every response is short enough to say out loud and grounded in the bill text.**

## "Don't gamble public pensions on crypto."
The bill commits no public funds and forces nothing into any pension. It lets a participant choose a regulated digital-asset option inside their own participant-directed account, the same way they already choose a stock or bond fund.

## "Isn't crypto too risky for retirement savings?"
Every option offered must use regulated products and qualified custody, with disclosure and prudent concentration limits set by the administering body. Participation is opt-in, so no saver is exposed unless they choose the option themselves.

## "Could this breach fiduciary duty?"
No. The bill applies standard fiduciary rules and requires prudent eligibility and concentration limits. Offering a well-governed, regulated option on a menu is a fiduciary act; denying participants a choice their private-sector peers already have is the harder position to defend.

## "What share of people would even use this?"
It is a choice, not a default, so usage tracks demand. Nationally, {{CRYPTO_SHARE}}% of households held or used crypto in the prior year, which shows the interest is mainstream rather than marginal. The option simply lets that interest be served inside a regulated plan.

## "Why should the State enable this rather than stay out of it?"
A modern, competitive plan menu helps {{STATE}} attract and keep talent, and it keeps public savings programs in step with the products the workforce already uses. The State commits no money and takes no investment risk, so the cost of offering the choice is low and the cost of falling behind is real.

## "Why act now?"
Private-sector savers already buy digital-asset exchange-traded products through ordinary brokerages. This bill gives {{STATE}} plan participants the same access. Indiana's HB 1042 directs its state plans to make these options available, and the parity gap only widens while the State waits.`,
  },

  "blockchain-records": {
    coverLetter: `# Blockchain Records, Signatures & Smart Contracts: Briefing for {{STATE}} Legislators

## The opportunity
Businesses building on blockchain in {{STATE}} face uncertainty about whether a blockchain-secured signature or record carries legal weight, and whether a smart contract is enforceable. That ambiguity raises legal risk and pushes builders toward states that have already answered the question. Confirming this legal groundwork costs the State nothing and removes a barrier to on-chain commerce locating here.

## What this legislation does
- Confirms that a signature or record secured through blockchain technology has the same legal status as any other electronic signature or record.
- Establishes that a contract is not unenforceable solely because it is executed or performed through a smart contract.
- Clarifies that data secured on a blockchain is not denied legal effect merely because it is in that form.
- Aligns {{STATE}} with existing electronic-transactions law (e.g., UETA) rather than creating a separate regime.

## How this could work in {{STATE}}
Imagine a {{STATE}} startup whose customer agreements form and execute through smart contracts, or a supply-chain firm that records shipments on a blockchain ledger. This law confirms those contracts and records carry the same legal weight as any e-signature or electronic record, so if a dispute reaches a {{STATE}} court, the company knows its agreements will be honored. Ordinary contract defenses like fraud and mistake still apply; only the doubt about the *form* is removed.

## What it means for your constituents
Legal certainty protects {{DEMONYM_PLURAL}} on both sides of these transactions: a consumer who signs a blockchain-secured agreement and a business that relies on it both know it will hold up. It also keeps the question out of expensive, uncertain litigation by settling it in statute up front.

## What it means for {{STATE}} businesses and the economy
This is the foundation serious on-chain commerce depends on. Removing the enforceability question mark means {{STATE}} builders no longer have a reason to incorporate elsewhere, and firms across the broader economy, including those handling {{STATE}}'s {{TRADE_TOTAL}} in annual goods trade, can adopt blockchain record-keeping with confidence.

[[DATA]]

## The precedent
{{PRECEDENT_SENTENCE}} Arizona's HB 2417 (2017) recognized blockchain signatures and smart-contract enforceability; Illinois's Blockchain Technology Act (2019) recognizes blockchain-based records, signatures, and smart contracts in commerce.

## Why {{STATE}} should act now
This aligns {{STATE}} with its own existing electronic-transactions law rather than creating a new regime, a small, low-risk clarification. Making it now removes a live disincentive that today nudges {{STATE}} builders to form their companies in states that already answered the question.`,
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
    objections: `# Anticipated Objections & Responses: {{STATE}} Blockchain Technology

**A field guide for committee testimony and one-on-one member meetings. Every response is short enough to say out loud and grounded in the bill text.**

## "Don't we already have electronic-signature law?"
This bill confirms that blockchain records and signatures fit within {{STATE}}'s existing electronic-transactions law and that a smart contract is enforceable. It removes a doubt rather than building a separate regime, and it is written to be read alongside the law you already have.

## "Are smart contracts safe and enforceable?"
The bill clarifies that a contract is not void merely because it is formed or performed through a smart contract. Every ordinary contract defense still applies, including fraud, mistake, and unconscionability. The form is recognized; the substance is judged as always.

## "Could this validate a contract nobody actually agreed to?"
No. Recognizing the form does not manufacture consent. The usual tests for offer, acceptance, and intent still govern, and a court can still find there was no agreement. The bill stops a party only from voiding a real deal on the technicality of its format.

## "Does this expose {{STATE}} to new technology risk?"
The bill is neutral about outcomes. It says a record or signature is not denied effect solely because it sits on a blockchain, which is the same principle that already governs other electronic records. It adds no State system and no appropriation.

## "Isn't this just symbolic?"
No. Legal certainty is a prerequisite for serious on-chain commerce, and the ambiguity it removes is a live reason builders incorporate elsewhere. Arizona recognized blockchain signatures and smart contracts in HB 2417, and Illinois did so in its Blockchain Technology Act, because the clarity has practical value.

## "Why is this worth the legislature's time?"
The broader economy is starting to use these records, including firms that move {{STATE}}'s {{TRADE_TOTAL}} in annual goods trade, and they need to know their agreements will hold up here. Settling the question in statute is a small, low-cost step that removes a real disincentive to building in {{STATE}}.`,
  },
};
