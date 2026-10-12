# anatomy.md

> Project structure index. Kigumi marketing site — Astro 5 static, deployed
> on Cloudflare Pages (kigumi.app). Migrated from hand-written HTML 2026-05-18.

## Config & deploy (~1.5K tok total)

- `package.json` — Astro 5 + @astrojs/mdx + sitemap + rss; scripts dev/build/preview/check; Node ≥20.3.
- `astro.config.mjs` — site=https://kigumi.app, static output, mdx + sitemap integrations.
- `tsconfig.json` — extends astro/tsconfigs/strict.
- `.nvmrc` — `20` (Cloudflare build Node version; local machine is 25).
- `.gitignore` — node_modules/, dist/, .astro/, .DS_Store.
- `DEPLOY.md` — Cloudflare Pages build settings + DNS cutover checklist + rollback + publish workflow. READ before any deploy question.
- `scripts/build-og.mjs` — rasterizes public/og-default.svg → og-default.png via sharp. Run after editing the SVG.

## Layout & components (~4K tok)

- `src/layouts/Layout.astro` — html shell: head, exact Google Fonts link (Fraunces SOFT axis — load-bearing), favicons, sitemap/RSS links, Seo, .vignette, reveal+smooth-scroll inline script. Props: title, description, ogType, ogImage, twitter*, publishedTime, bodyClass.
- `src/layouts/EssayLayout.astro` — wraps Layout for a single essay: Nav, back-link, pillar+date meta, Fraunces title, Lora standfirst, prose slot, footer CTA.
- `src/components/LogoMark.astro` — the Kigumi K-form SVG path (single source; props width/height/fill/class).
- `src/components/Nav.astro` — fixed nav: logo, How it works, Writing, Request Access. `active` prop sets aria-current.
- `src/components/Footer.astro` — wordmark + © + Writing + Contact.
- `src/components/Seo.astro` — title/description/canonical/OG/Twitter/article meta. Defaults og:image=/og-default.png.
- `src/components/CutLine.astro` — dashed cut-line + diamond signature (in .container).
- `src/components/NewsletterForm.astro` — Loops.so form markup + handlers verbatim, `<script is:inline>`. Do not refactor the script.
- `src/components/home/{Hero,ProblemLines,Payoff,Proof,Positioning,CtaSection}.astro` — home page sections, verbatim ports.

## Pages (~2K tok)

- `src/pages/index.astro` — home; composes Nav + home/* + CutLine + Footer in Layout. SEO meta preserved verbatim from legacy.
- `src/pages/how-it-works.astro` — 4-step walkthrough; bodyClass="page-how-it-works".
- `src/pages/writing/index.astro` — essay list, newest-first, drafts hidden in prod.
- `src/pages/writing/[...slug].astro` — essay page; getStaticPaths from published essays.
- `src/pages/rss.xml.js` — RSS feed over published essays.
- `src/pages/404.astro` — brand-safe not-found.

## Content & styles

- `src/content.config.ts` — `essays` collection: glob loader, Zod schema (title, description, pubDate, updatedDate?, pillar enum, draft, ogImage?, slug?).
- `src/lib/essays.ts` — PILLAR_LABELS, essaySlug, formatDate, getPublishedEssays (PROD hides drafts).
- `src/content/essays/*.md` — 4 seed essays, all `draft: true` (wrong-metric, category-before-name, behavior-infrastructure-is-weird, the-oracle-gap). One per content pillar.
- `src/styles/global.css` — single stylesheet (~1.6K lines): legacy style.css verbatim + additive design tokens + how-it-works page-scoped rules + nav-links + writing/essay surfaces. ~6K tok — do not full-read; grep for the selector.

## Public

- `public/favicon.svg`, `favicon-32.png`, `favicon-180.png` — favicons (served at root).
- `public/og-default.svg` + `og-default.png` — social card (1200×630), Workshop-at-Night.

## Legacy (still present until cutover — see DEPLOY.md step 11)

- `index.html`, `how-it-works.html`, `style.css`, `CNAME` — original GitHub Pages site. Kept so kigumi.app keeps serving until Cloudflare preview is validated. `dist/` is gitignored so GitHub Pages still serves these from main.
- `DESIGN.md`, `PRODUCT.md` — design system + positioning reference (authoritative: ../kigumi/DESIGN.md, ../kigumi/STYLE.md).
