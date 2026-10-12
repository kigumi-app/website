# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-05-18

## User Preferences

<!-- How the user likes things done. Code style, tools, patterns, communication. -->

- [2026-05-18] Implement fully, comprehensive over conservative. When given a
  multi-phase build, execute all phases end to end rather than scoping down or
  deferring. (Cross-project preference; see auto-memory `feedback_implement_fully`.)
- [2026-05-18] The whole site must be Claude-Code-operable: markdown file →
  git commit → auto-deploy. Any solution that requires a web editor / CMS UI
  is rejected. This drove the Astro + Cloudflare Pages choice.
- [2026-05-18] Design level-up must stay strictly inside the locked
  "Workshop at Night" brand (`../kigumi/DESIGN.md`): amber-only accent,
  walnut bg, Fraunces SOFT 70. No new colors/fonts/layout language.

## Key Learnings

<!-- Project-specific conventions discovered during development. -->

- [2026-05-18] Site is **Astro 5 static** (was hand-written HTML/CSS). Build:
  `npm run build` → `dist/`. Dev: `npm run dev` (localhost:4321).
  `npm run check` = astro check (TS strict, must be 0/0/0).
- [2026-05-18] `src/styles/global.css` is the single stylesheet = the old
  `style.css` ported verbatim + how-it-works page-specific rules. `.product`
  / `.page-header` / `.back-link` are how-it-works-only; the page sets
  `bodyClass="page-how-it-works"` and overrides are scoped under
  `body.page-how-it-works`.
- [2026-05-18] The long Kigumi K-form SVG path lives once in
  `src/components/LogoMark.astro` (was duplicated 4× in the old HTML).
- [2026-05-18] Essays: Astro content collection `essays`
  (`src/content.config.ts`, glob loader, Zod schema, pillar enum).
  `src/lib/essays.ts` owns the published-filter: drafts are visible in
  `astro dev`, hidden in the production build via `import.meta.env.PROD`.
  Verify draft-hiding with `npm run preview`, not just dev.
- [2026-05-18] `@astrojs/sitemap` only emits at build time and needs `site:`
  set in astro.config.mjs (it is). RSS at `/rss.xml`
  (`src/pages/rss.xml.js`).
- [2026-05-18] Loops.so waiting-list form + handlers live verbatim in
  `src/components/NewsletterForm.astro` under `<script is:inline>` — Astro
  must not transform them (action URL + localStorage rate-limit are
  load-bearing).
- [2026-05-18] RTK hook compacts/truncates `curl` output and breaks shell
  parsing. Use `rtk proxy curl ...` for raw output. `rtk ls` returns empty
  here — use `rtk proxy ls`.
- [2026-05-18] `openwolf designqc`: auto-detect can grab the wrong local
  server; always pass `--url http://localhost:4321[/route]`. It wipes
  `.wolf/designqc-captures/` each run — read captures before the next run.

## Do-Not-Repeat

<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

- [2026-05-18] Do not copy malformed CSS verbatim expecting parity — Astro's
  PostCSS hard-errors where browsers silently ignored it. Validate ported
  CSS with `npm run build`. (bug-001)
- [2026-05-18] Do not trust `openwolf designqc` auto-detect when other dev
  servers may be running — it captured Memgraph Lab. Pass `--url`. (bug-003)
- [2026-05-18] Do not use `grep -c` to count occurrences in Astro output —
  HTML/RSS is minified to one line; `grep -c` counts lines. Use
  `grep -o ... | wc -l`, and `rtk proxy curl` for raw bytes.
- [2026-05-18] External copy: never "compile/compiles/compiled" (Pinecone
  Nexus collision, VOICE.md §5). Use extract / formalize / capture. No
  three-layer thesis (CPO 2027 / translator 2028+) in public essays.

## Decision Log

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->

- [2026-05-18] **Astro 5** over Hugo / minimal-HTML. Component reuse +
  type-safe content collections + verbatim CSS port + incremental migration.
  User-selected from a 3-option AskUserQuestion.
- [2026-05-18] **Cloudflare Pages** (git-connected, auto-deploy on push to
  main) over GitHub Pages+Actions / manual. Free, unlimited bandwidth,
  satisfies the markdown→commit→deploy requirement. User-selected.
- [2026-05-18] **Markdown (.md)** for essays; `@astrojs/mdx` installed for
  future component embeds but not used. Prose-only essays; IP guardrail
  forbids product visuals anyway.
- [2026-05-18] **Satoshi → Fraunces unified site-wide.** Legacy
  how-it-works.html inline `<style>` still used the pre-migration Satoshi
  font and lacked the SOFT-70 rule (the Fraunces migration commit only
  touched style.css). DESIGN.md mandates Fraunces; the Satoshi remnant was
  the bug. global.css uses Fraunces everywhere — intentional consistency
  fix, not a design change.
- [2026-05-18] **Node pinned to 20** (`.nvmrc`, package.json engines,
  Cloudflare `NODE_VERSION`). Local machine has Node 25; Cloudflare's build
  image does not ship 25 → build would fail without the pin.
- [2026-05-18] **CNAME kept until cutover.** GitHub-Pages-only mechanism;
  Cloudflare binds the domain via dashboard+DNS. Deleting it (with the
  legacy HTML) is the final post-cutover commit so the old site keeps
  serving kigumi.app until the Cloudflare preview is validated.
- [2026-05-18] **Bounded design level-up:** added a consistent cross-page
  "Writing" nav link, the /writing index + essay reading layout, additive
  type/space tokens, and the OG card. Explicitly out of scope: new colors,
  fonts, layout language, light mode, home copy edits.
- [2026-05-18] **ICP flag (not acted on):** strategy/site target CTOs but
  company/.claude/CLAUDE.md records a 2026-05-03 ICP shift to non-technical
  AI builders. Migration is structural, not editorial — essays follow the
  existing pillar framing. A separate `/decide`-gated copy pass is the
  right place to re-aim, not this migration.
