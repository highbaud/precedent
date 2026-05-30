# State Crypto Legislation — Bill Proposal Generator

A local-first web app for advocacy teams. Select a U.S. state, see which categories of
pro–digital-asset legislation it has **not** yet enacted, and generate ready-to-file
proposals for each gap — a plain-language one-pager and formal model bill text.

## Run

```bash
npm install
npm run dev      # dev server (Vite)
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

The build in `dist/` is a static site — deploy it to any static host.

## How it works

- **Data** lives in `src/data/legislation.ts`: the legislative categories, each carrying
  the list of states that have already enacted it. A state's *gap* in a category is simply
  that it is not in that list. Update this file as new laws pass and bump `LAST_UPDATED`.
- **Gap detection** is pure (`src/lib/gaps.ts`).
- **Proposals** are curated model-bill templates (`src/data/templates.ts`) filled with the
  selected state via token substitution (`src/lib/render.ts`). Templates are derived from
  real enacted state law (e.g. NH HB 302, KY HB 701, MT SB 178).
- **Export** (`src/lib/export.ts`): copy, Print/Save-as-PDF, Markdown, and Word (.doc).
- **Optional AI refine** (`src/lib/refine.ts`): the curated draft is always the base and
  fallback. Add an Anthropic API key in Settings to tighten wording. The key is stored only
  in this browser's localStorage and sent directly to Anthropic — fine for personal use,
  **not** for a shared deployment.

## Disclaimer

All generated text is **model legislation for advocacy, not legal advice**. Verify every
provision against current state statutes and consult legislative counsel before filing.
The enacted-state data is a point-in-time snapshot (see `LAST_UPDATED`).
