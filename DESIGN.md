---
name: Kigumi Marketing Site
description: Warm, dark, craftsman — behavior comprehension platform landing pages.
colors:
  background: "#1a1410"
  surface: "#241e18"
  surface-hover: "#2e2620"
  border: "#3a3028"
  border-subtle: "#2a2218"
  text-primary: "#f5f0e8"
  text-secondary: "#9a8a74"
  text-dim: "#6a5e50"
  primary: "#d4a054"
  primary-hover: "#e0b060"
  primary-glow: "rgba(212,160,84,0.15)"
  state-patina: "#7ab8a0"
  action-workshop: "#d4a054"
  condition-terracotta: "#c47a6c"
  data-heartwood: "#9a7bb5"
  event-blueprint: "#7a9bb8"
  diff-added: "#10b981"
  diff-removed: "#ef4444"
  diff-modified: "#f59e0b"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
    fontVariation: "'SOFT' 70, 'opsz' 144, 'wght' 700"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
    fontVariation: "'SOFT' 70, 'opsz' 72, 'wght' 600"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.06em"
  code:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  6: "24px"
  8: "32px"
  12: "48px"
  16: "64px"
  20: "80px"
  24: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.background}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Kigumi Marketing Site

## 1. Overview

**Creative North Star: "Workshop at Night"**

A craftsman's workshop at 2am. Warm walnut tones, blueprint precision, lamplight focus. The background is aged walnut (`#1a1410`) — deep, warm, not cold. Text is cream (`#f5f0e8`), not white. Amber arrives where it matters: CTAs, key highlights, the top light line above the fold. It is not a theme — it is a signal.

Fraunces is the editorial voice of this system. At large optical sizes with SOFT 70, its serifs are warm and rounded, reading like ink on a well-made page. It appears only at display and headline scale — never in body text, never in UI controls. Inter handles everything else. The contrast between serif warmth and sans precision is intentional: craftsman's hand for the ideas, technical eye for the details.

The site is textured: 2% film grain (SVG feTurbulence), a peripheral vignette, and a 2px amber gradient along the top edge. These are structural elements of the aesthetic, not decorative extras. Remove one and the site reads like any other dark SaaS landing page.

**Key Characteristics:**
- Dark-only, warm dark — walnut background, cream text, never cold slate or void black
- Amber as the sole accent — CTAs, active highlights, the top light line
- Fraunces for display and headlines only — serif warmth at scale, invisible at body size
- Film grain + vignette + top light line — structural atmospheric trio
- No gradients as personality — the only gradient is the top amber light and the vignette
- Graph screenshots as primary trust signal — real product output, not icons or illustrations

## 2. Colors: The Amber Workshop Palette

A warm-dark marketing palette built entirely in hex. Single accent: amber. No secondary or tertiary accent. The node colors appear only in product screenshots — never in chrome or layout.

### Primary
- **Warm Amber** (`#d4a054`): The sole interactive accent. Used on CTAs, call-to-action buttons, key highlights, and the top light line. Its rarity is its authority.
- **Amber Hover** (`#e0b060`): Amber on hover — lighter, same warmth.
- **Amber Glow** (`rgba(212,160,84,0.15)`): Ambient glow behind amber elements.

### Neutral
- **Walnut Background** (`#1a1410`): Page background. Warm dark walnut — never `#000`, never cold blue-black.
- **Warm Surface** (`#241e18`): Cards, elevated containers, code blocks.
- **Surface Hover** (`#2e2620`): Interactive surface hover state.
- **Warm Border** (`#3a3028`): Visible structure, table lines, dividers.
- **Subtle Border** (`#2a2218`): Faint card outlines, section edges.
- **Cream Foreground** (`#f5f0e8`): Primary text. Never `#fff`.
- **Tan Secondary** (`#9a8a74`): Subtext, captions, annotations.
- **Dim Label** (`#6a5e50`): Decorative labels only — fails WCAG AA, never for readable text.

### Node Palette (screenshots only)
These colors exist in product screenshots and graph visualizations. Never use in layout, chrome, or marketing copy.
- **State → Patina** (`#7ab8a0`), **Action → Amber** (`#d4a054`), **Condition → Terracotta** (`#c47a6c`), **Data → Heartwood** (`#9a7bb5`), **Event → Blueprint** (`#7a9bb8`)

### Named Rules
**The One Accent Rule.** Amber (`#d4a054`) is the only accent on this site. It appears on primary CTAs, the hero highlight, and the top light line. It must never appear as a background fill, a decorative element, or repeated more than 3 times above the fold. Rarity is the point.

**The No-Gradient Rule.** The only gradients permitted are the top light line (amber, 2px, center glow) and the vignette (dark edges, transparent center). No purple-to-teal, no amber-to-transparent as a "brand gradient", no multi-stop background effects.

## 3. Typography

**Display/Headline Font:** Fraunces (Google Fonts — variable: `ital`, `opsz`, `wght`, `SOFT` axes)
**Body Font:** Inter (Google Fonts — weights 400, 500, 600, 700)
**Annotation Font:** Lora (Google Fonts — italic only)
**Code Font:** JetBrains Mono (Google Fonts — weights 400, 500)

**Character:** Fraunces at SOFT 70 and large optical sizes is warm, considered, and precise — a craftsman's serif, not a fashion editorial. Inter provides the neutral technical eye for body copy. The combination earns credibility: something built with genuine craft, by people who understand their audience.

**Variable font axis settings (applied globally via `html { font-variation-settings: 'SOFT' 70; font-optical-sizing: auto; }`):**
- Hero: large `opsz` auto-adjusts from font-size, `wght` from `font-weight: 700`
- Calm: medium opsz auto-adjusts, `wght` 600
- All heading uses of Fraunces inherit SOFT 70 from the global rule

### Hierarchy
- **Display** (Fraunces, hero variation, 32px+, lh 1.1): Hero headline. One per page. Maximum warmth and presence.
- **Headline** (Fraunces, calm variation, 24–28px, lh 1.2): Section titles, feature headings.
- **Title** (Inter 600, 20px, lh 1.3): Card titles, sub-section headers.
- **Body** (Inter 400, 16px, lh 1.6): Page copy. Cap at 65–75ch.
- **Body-sm** (Inter 400, 14px): Dense sections, sidebar text, code annotations.
- **Label** (Inter 500, 12px, ls 0.06em, uppercase): Tags, badges, section markers.
- **Code** (JetBrains Mono 400, 13px, lh 1.6): Code blocks in product demos and syntax examples.

### Named Rules
**The Two Serifs Rule.** Fraunces (display/headline only) and Lora (italic annotations only) are the only serif typefaces permitted. Fraunces must never appear at body size or in UI controls. Lora must never appear upright or at display size. No other serifs.

**The Code-Block Rule.** JetBrains Mono appears only in code blocks and technical syntax examples. Never in navigation, CTAs, or marketing headlines.

## 4. Elevation

The marketing site uses tonal layering rather than shadows. The dark background creates inherent depth — cards sit on a darker plane, their surface lighter than the background. Shadows are minimal and reserved for floating states (tooltips, modals if any).

Surface layers:
1. **Background** `#1a1410` — page base
2. **Surface** `#241e18` — cards, code blocks, elevated sections
3. **Surface Hover** `#2e2620` — interactive hover states

### Shadow Vocabulary
- **None at rest.** Cards and sections are flat — elevation is tonal only.
- **Subtle glow** (`box-shadow: 0 0 0 1px rgba(212,160,84,0.2)`): Optional amber ring on featured cards.

### Named Rules
**The Flat-By-Default Rule.** All sections and cards are flat at rest. Depth is communicated by background lightness, not by shadow. A shadow on a resting element means it should be floating — and floating elements are rare on a marketing site.

**The Atmosphere Rule.** The three atmospheric layers — film grain (2% SVG feTurbulence), vignette (radial gradient, dark edges), and top light line (2px amber center gradient) — are structural. They are `position: fixed` or `position: absolute`, `pointer-events: none`. They must be present on every full-width page view.

## 5. Components

### Buttons
Two variants. No decorative alternatives.
- **Primary (amber):** `background: #d4a054`, dark text (`#1a1410`), 8px radius, `padding: 12px 24px`. Uppercase label or Inter 500. Hover: `#e0b060`. One primary CTA per screen section — never two amber buttons side-by-side.
- **Outline / Ghost:** Transparent background, `border: 1px solid #3a3028`, cream text. Hover: `background: #241e18`. Used for secondary actions.

### Cards / Containers
- **Corner Style:** 12px radius (`{rounded.lg}`)
- **Background:** `#241e18` — warm dark surface
- **Border:** `1px solid #2a2218` (subtle) at rest. On hover: `border-color: rgba(212,160,84,0.3)` — amber whisper.
- **Shadow:** None at rest. Optional `0 0 0 1px rgba(212,160,84,0.2)` for featured cards.
- **Padding:** `24px` standard.

### Code Blocks
- **Background:** `#241e18` surface
- **Font:** JetBrains Mono 400, 13px
- **Border:** `1px solid #3a3028`, 8px radius
- **Syntax highlight:** amber for keywords, cream for identifiers, tan for comments

### Graph Visualizations (Product Screenshots)
The behavior graph is the primary product proof. When showing screenshots:
- Use real product output — not wireframes or icon-based illustrations
- Node badges use the five-color semantic palette (patina, terracotta, heartwood, blueprint, amber)
- The dark canvas background should match or be close to the site background for seamless integration

### Navigation
- **Background:** `rgba(26,20,16,0.95)` (walnut at 95%) with `backdrop-filter: blur`
- **Text:** Cream foreground, Inter 400/500
- **Active / hover:** amber primary
- **CTA in nav:** Primary button (amber)

## 6. Do's and Don'ts

### Do:
- **Do** use Fraunces at display and headline sizes only — large optical sizes where the SOFT axis creates warmth and presence.
- **Do** keep amber rare — one primary CTA per section, the top light line, key text highlights. Its rarity is its authority.
- **Do** maintain the atmospheric trio (film grain, vignette, top light line) on every full-width page view.
- **Do** use hex values for all marketing colors. OKLch is for the product UI only.
- **Do** use `#1a1410` (walnut) as the background. If a section needs contrast, use `#241e18` as the alternate surface — never introduce a third background tone.
- **Do** use real product screenshots and graph visualizations as trust signals. Put them in view early.
- **Do** cap body text at 65–75ch. Marketing copy on a dark background needs comfortable line length.
- **Do** use amber at 40% opacity (`rgba(212,160,84,0.4)`) for hover borders on cards — a whisper, not a shout.

### Don't:
- **Don't** use cold dark backgrounds (`#0f172a`, `#1e293b`, blue-shifted slates). The background is walnut-warm, not tech-cold.
- **Don't** use generic SaaS gradients — purple-to-teal, teal-to-blue, any multi-stop gradient as personality. The only gradients are the top light line and the vignette.
- **Don't** use neon accents — electric green, hot pink, vivid cyan. Wrong temperature entirely.
- **Don't** use flat tech blue. The site has no blue accent. Blueprint (node color) appears only in product screenshots.
- **Don't** use `#6a5e50` (text-dim) for any readable text — it fails WCAG AA on dark backgrounds.
- **Don't** use Fraunces at body size or in UI controls. It is a display/headline instrument only.
- **Don't** add light mode. This site is dark-only.
- **Don't** use stock photography of people. No smiling engineers. No hands on keyboards. No abstract tech swirls.
- **Don't** use buzzword density — "next-generation", "unlock", "empower", "AI-powered" as standalone claims. Every sentence must earn its place.
- **Don't** place two amber CTAs side-by-side. One primary action per section.
- **Don't** use the node palette colors (patina, terracotta, heartwood, blueprint) in layout or chrome. They are semantic — outside the graph, their meaning collapses.
