<p align="center">
  <img src="public/favicon.svg" alt="Precedent logo" width="96" height="96" />
</p>

<h1 align="center">Precedent</h1>

<p align="center"><em>Model crypto legislation, built on precedent.</em></p>

<p align="center">
  A project of the <strong>University of Arkansas Crypto Hogs</strong>, in part by
  <strong>Max Avery</strong>, Stand With Crypto chapter president, Arkansas.
</p>

---

## What Precedent is

Precedent is a local-first web app for digital-asset advocacy teams, student
organizations, and legislative offices. Pick any U.S. state or territory, and the app
instantly shows which categories of pro–digital-asset law that state has **not** yet
enacted. For each of those gaps it generates a complete, legislator-ready packet that an
advocate can hand to a member or their counsel the same day.

The premise is in the name. Almost every reform worth pursuing has already passed
somewhere, so the strongest case for a new bill is the law that is already working in
another state. Precedent maps each state against that body of enacted law, then drafts
from it: every model bill, cover letter, and rebuttal is anchored to real statutes that
legislators can look up and verify.

It runs entirely in the browser. There is no backend, no account, and no data leaves the
page unless you opt into the AI-refine feature. The production build is a static site you
can host anywhere.

## What it produces

For every gap, Precedent assembles three coordinated documents that share one verified
data set and one citation list. You switch between them with a single toggle.

### 1. Cover letter

A multi-section briefing written for a legislator's desk. It opens with the opportunity,
explains what the bill does in plain language, walks through how it would work in the
selected state, and lays out the case for constituents, businesses, and the broader
economy. Embedded in the letter is a **verified-data chart panel** drawn from the state's
own indicators (FDIC unbanked and underbanked rates, U.S. Census international goods-trade
figures), so the argument is grounded in that state's numbers rather than generic claims.
The letter closes with the precedent set and a robust liability footer. Charts render on
screen and in the printed or saved PDF; every text export strips them so the prose reads
cleanly.

### 2. Model bill

Formal, file-ready bill text laid out the way a real bill appears: a short title,
legislative findings, definitions, numbered sections, a severability clause, and an
effective date, set in a serif face with line numbers down the left margin. Each template
is derived from the strongest enacted precedent in its category and is written to be
edited by a sponsor's counsel.

### 3. Q&A / rebuttals

A field guide of anticipated objections paired with concise, sourced responses, for use
in committee testimony and one-on-one member meetings. Each objection and its rebuttal is
presented as a self-contained card, so the document stays readable across several printed
pages. There are six to seven objections per category, every answer grounded in the bill
text or an enacted precedent.

All three modes support a custom letterhead and signature block, and export to copy,
Print / Save-as-PDF, Markdown, and Word (.doc). A **full-state package** mode bundles
every gap for a state into one document in whichever mode you choose.

## The legislative categories

Precedent tracks pro–digital-asset law across these areas, each carrying the list of
states that have already enacted it:

| Category | What it covers | Anchored to |
|---|---|---|
| Strategic reserve | A capped, governed Bitcoin and digital-asset treasury reserve | NH HB 302, TX SB 21, AZ HB 2749 |
| Self-custody rights | Right to self-custody, run nodes, and stake; anti-CBDC; anti–de-banking | KY HB 701, MT SB 265, WY HB 0308 |
| Mining rights | Data-center parity, non-discriminatory utility rates, right to mine | MT SB 178, AR HB 1799, KY HB 230 / SB 255 |
| Stablecoin & digital banking | A fully reserved state stable token and a digital-asset custody charter | WY Stable Token Act |
| DAO recognition | A legal form and limited liability for decentralized organizations | WY DAO LLC & DUNA, TN DAO LLC |
| Digital-asset property | Digital assets as property under state commercial law | TX HB 4474 |
| UCC Article 12 | Controllable Electronic Records, control and take-free rules | ~33 states + DC |
| Crypto tax payments | Accepting digital assets for taxes and fees via a processor | Enacted state programs |
| In-kind escheatment | Holding unclaimed digital assets in native form, not auto-liquidating | CA SB 822, VA HB 798 |
| Retirement / pension | Opt-in, regulated digital-asset options in state-administered plans | IN HB 1042 |
| Blockchain records | Legal recognition of blockchain records, signatures, and smart contracts | AZ HB 2417, IL Blockchain Technology Act |

A state's *gap* in a category is simply that it does not appear in that category's
enacted list.

## How it works

- **Data** lives in `src/data/legislation.ts`: the categories, each carrying the states
  that have already enacted it and the specific bills cited as precedent. This file is the
  single source of truth and is kept auditable on purpose. Update it as new laws pass and
  bump `LAST_UPDATED`.
- **Gap detection** is pure and deterministic (`src/lib/gaps.ts`).
- **Verified demographics** (`src/data/demographics.ts`) hold per-state FDIC and Census
  figures used by the chart panel. Every number is an exact, sourced value, never
  estimated or interpolated.
- **Templates** (`src/data/templates.ts`) are curated, hand-authored drafts for all three
  document modes, filled with the selected state through token substitution
  (`src/lib/render.ts`). Tokens cover the state name, demonym, precedent list, verified
  statistics, and the legislative session phrasing.
- **Export** (`src/lib/export.ts`): copy to clipboard, Print / Save-as-PDF via a print
  stylesheet, Markdown, and Word (.doc). The chart slot marker is screen and PDF only and
  is stripped from every text export.
- **Optional AI refine** (`src/lib/refine.ts`): the curated draft is always the base and
  the fallback. You can add an Anthropic API key in Settings to tighten wording. The key
  is stored only in this browser's localStorage and sent directly to Anthropic. That is
  fine for personal, single-user use and **not** appropriate for a shared deployment.

## Tech stack

Vite + React + TypeScript (strict), with vanilla CSS driven by design tokens. No backend,
no database, no analytics. Local-first by design.

## Run

```bash
npm install
npm run dev      # dev server (Vite)
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

The build in `dist/` is a static site. Deploy it to any static host.

## Project structure

```
src/
  data/        legislation, templates, demographics, states
  lib/         gaps, render, export, refine, letterhead
  components/  StateSelector, GapDashboard, ProposalViewer,
               ProposalDoc, BillDoc, DataPanel, FullPackage, ...
  App.tsx      state + layout
```

## Accuracy

Precedent is built so that wrong data is hard to introduce and easy to audit. Bill
numbers, citations, and statistics are never fabricated: the precedent bills live in one
reviewable data file, and the chart figures are exact values from named federal sources.
The enacted-state data is a point-in-time snapshot; the app surfaces `LAST_UPDATED` so
readers know its vintage.

## Disclaimer

All generated text is **model legislation for advocacy, not legal advice**. Verify every
provision against current state statutes and consult legislative counsel before filing.
The enacted-state data is a point-in-time snapshot (see `LAST_UPDATED`), and the law in
this area changes quickly.

---

<p align="center">
  A project of the University of Arkansas Crypto Hogs, in part by Max Avery,
  Stand With Crypto chapter president, Arkansas.
</p>
