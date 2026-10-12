| 17:11 | designqc: captured 8 screenshots (66KB, ~20000 tok) | /, /how-it-works, /writing, /writing/the-oracle-gap | ready for eval | ~0 |
| 17:17 | designqc: captured 16 screenshots (539KB, ~40000 tok) | /, /how-it-works, /writing, /writing/the-oracle-gap | ready for eval | ~0 |
| 17:18 | designqc: captured 6 screenshots (209KB, ~15000 tok) | /, /rss.xml | ready for eval | ~0 |
| 17:18 | designqc: captured 15 screenshots (883KB, ~37500 tok) | /, /rss.xml | ready for eval | ~0 |
| 17:20 | designqc: captured 14 screenshots (574KB, ~35000 tok) | /, /rss.xml | ready for eval | ~0 |
| 17:20 | designqc: captured 13 screenshots (415KB, ~32500 tok) | /, /rss.xml | ready for eval | ~0 |
| 17:03 | Migrated site HTML→Astro 5: scaffold, global.css port, Layout+components, index+how-it-works ported | src/** | build green, parity confirmed | ~large |
| 17:05 | Fixed pre-existing CSS bug (invalid translate decl) + broken og:image (created og-default.png) | global.css, public/ | bug-001, bug-002 | ~small |
| 17:06 | Built essays system (collection, /writing, [...slug], rss, EssayLayout) + 4 seed essays draft:true | src/content/**, src/pages/writing/** | astro check 0/0/0 | ~large |
| 17:20 | designqc parity QC: home, how-it-works, essay reading layout all faithful to Workshop-at-Night | .wolf/designqc-captures | verified | ~30K |
| 17:25 | Phase E-G: DEPLOY.md, openwolf init, anatomy/cerebrum/buglog populated, .claude/CLAUDE.md rewritten | DEPLOY.md, .wolf/**, .claude/CLAUDE.md | done | ~small |

---

## Session summary — 2026-05-18

Migrated the Kigumi marketing site from hand-written static HTML/CSS to
**Astro 5**, added a markdown essay blog (`/writing`), and applied a bounded,
brand-safe design level-up. User decisions (AskUserQuestion): Astro 5 +
Cloudflare Pages + restructure-with-level-up + scaffold-plus-4-drafted-essays.

Done: full Astro scaffold; `global.css` = legacy `style.css` ported verbatim
+ how-it-works page-scoped rules + writing/essay surfaces + additive tokens;
Layout/Nav/Footer/Seo/LogoMark/CutLine/NewsletterForm components; index +
how-it-works ported to visual parity (designqc-confirmed); essays content
collection + RSS + sitemap + reading layout; 4 seed essays (one per pillar,
all `draft: true`, voice + IP guardrails applied); fixed bug-001 (invalid CSS)
and bug-002 (broken og:image, now og-default.png); `astro check` 0/0/0;
production build hides drafts correctly. Satoshi→Fraunces unified site-wide.

Branch: `feat/astro-migration`. Legacy HTML/CNAME deliberately kept (GitHub
Pages keeps serving kigumi.app until the Cloudflare preview is validated).

Open / next: (1) commit the branch; (2) USER does the Cloudflare Pages +
DNS cutover (DEPLOY.md — browser-only, Claude Code cannot); (3) after preview
validation, the final commit deletes legacy index.html/how-it-works.html/
style.css/CNAME; (4) flip essays `draft:false` after review; (5) separate
`/decide`-gated pass on the CTO-vs-non-technical-builder ICP copy (flagged,
not acted on — out of migration scope).
