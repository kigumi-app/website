# Merlion — Marketing Site (kigumi.app)

Astro 5 static site for kigumi.app. Marketing pages + a markdown essay blog.
Deployed on Cloudflare Pages, auto-built on push to `main`.
Migrated from hand-written HTML/CSS on 2026-05-18.

## Commands

```bash
npm run dev      # localhost:4321 (drafts visible)
npm run build    # -> dist/  (drafts hidden)
npm run preview  # serve the production build (verify draft-hiding)
npm run check    # astro check — must be 0 errors
node scripts/build-og.mjs   # regenerate public/og-default.png from the SVG
```

## Layout

- `src/pages/` — index, how-it-works, writing/index, writing/[...slug], rss.xml.js, 404
- `src/layouts/` — Layout.astro (shell), EssayLayout.astro
- `src/components/` — Nav, Footer, LogoMark, Seo, CutLine, NewsletterForm, home/*
- `src/content/essays/*.md` — essays (collection schema in `src/content.config.ts`)
- `src/lib/essays.ts` — published-essay query (drafts hidden in prod build)
- `src/styles/global.css` — the single stylesheet (legacy style.css + additions)

## Publishing an essay

Add `src/content/essays/<slug>.md` with frontmatter
(`title`, `description`, `pubDate`, `pillar`, `draft`). Keep `draft: true`
while writing. Set `draft: false`, commit, push to `main` → Cloudflare
rebuilds and it goes live (and into /rss.xml + sitemap). See `DEPLOY.md`.

`pillar` is one of: `intent-gap`, `founder-journey`, `category-creation`,
`builder-notes`. Essay prose follows the founder voice + IP guardrails:
load `../cockpit/voice/VOICE.md` + `../kigumi/STYLE.md` +
`../company/strategy/content/strategy.md` before drafting. Share the
problem/why; never product IR, architecture, screenshots, accuracy numbers,
or the three-layer thesis. No "compile/compiles" externally.

## Conventions

- Design language is locked: `../kigumi/DESIGN.md` (Workshop at Night —
  amber-only accent, walnut bg, Fraunces SOFT 70). Do not introduce new
  colors, fonts, or layout language.
- Prose style: `../kigumi/STYLE.md`.
- `src/styles/global.css` is ~1.6K lines — grep for the selector, do not
  full-read. how-it-works-only overrides are scoped under
  `body.page-how-it-works`.
- The Loops.so form script in `NewsletterForm.astro` is verbatim and
  `is:inline` — do not refactor it.
- Legacy `index.html` / `how-it-works.html` / `style.css` / `CNAME` are
  still present and serve GitHub Pages until the Cloudflare DNS cutover
  (DEPLOY.md step 11). Do not delete them before the preview is validated.

## Deploy

Cloudflare Pages, git-connected. Full build settings + DNS cutover +
rollback in `DEPLOY.md`. The dashboard/DNS steps are manual (browser);
Claude Code cannot do them.
