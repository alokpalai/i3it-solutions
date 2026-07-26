# i3it Solutions — Design System

Status: Phase 1 draft (specification only — no implementation, no Tailwind config changes made). Companion to `docs/PROJECT.md` (positioning) and `docs/UX.md` (flows this system must support).

## 1. Design principles

Professional, institutional, government-friendly, enterprise, technology-focused, clean, premium, structured, accessible. Explicitly avoided: startup gradients, neon/cyberpunk styling, oversized decorative text, heavy glassmorphism, constant animation, generic SaaS layout clichés. See `docs/PROJECT.md §35` positioning basis (approved pre-Phase-1 direction).

The source company profile uses a saturated blue/cyan corporate-brochure visual language. This system deliberately evolves that identity into a more restrained digital system rather than reproducing the PDF's look — same underlying brand colors, disciplined application.

## 2. Color system

All ratios below computed against actual sRGB contrast math (WCAG relative luminance formula), not estimated.

### 2.1 Core palette

| Token | Hex | Role |
|---|---|---|
| `color-white` | `#FFFFFF` | Primary background |
| `color-navy` (primary) | `#0B3D91` | Primary brand color — headers, primary buttons, links, key emphasis |
| `color-blue` (secondary) | `#1E73BE` | Secondary actions, supporting UI accents, info states |
| `color-orange` (accent) | `#F57C00` | Selective emphasis: badges, icons on light fills, large CTA backgrounds *with dark text* — see §2.3 for text-safety rules |
| `color-orange-deep` (accent-text-safe) | `#B35300` | Orange usage requiring text-level contrast: CTA button label text, orange text on white, white-text-on-orange buttons |
| `color-neutral-900` (text primary) | `#171717` | Body/heading text on white |
| `color-neutral-600` (text secondary) | `#4B5563` | Secondary text, supporting copy |
| `color-neutral-500` (text muted) | `#6B7280` | Captions, metadata, timestamps |
| `color-neutral-200` | `#E5E7EB` | Borders, dividers |
| `color-neutral-50` | `#F8FAFC` | Section-alternate background (subtle, not gray-card-everywhere) |
| `color-tint-navy-50` | `#F0F4FA` | Very light navy tint for callouts/badges background |
| `color-success` | `#166534` (on light) / `#16A34A` (fill) | Success state |
| `color-error` | `#B91C1C` (on light) / `#DC2626` (fill) | Error state |
| `color-warning` | `#92400E` (on light) / `#D97706` (fill) | Warning state |
| `color-info` | `#1E73BE` (reuse secondary blue) | Info state |

These are proposed starting values consistent with the pre-approved direction (`docs/DECISIONS.md`); exact hexes are adjustable in Phase 2 token implementation as long as contrast rules in §2.2 continue to hold.

### 2.2 WCAG 2.2 AA contrast verification (computed)

| Pair | Ratio | AA normal text (≥4.5:1) | AA large text/UI (≥3:1) |
|---|---|---|---|
| Navy `#0B3D91` on white | 10.04:1 | ✅ Pass | ✅ Pass |
| Secondary blue `#1E73BE` on white | 4.94:1 | ✅ Pass | ✅ Pass |
| Orange `#F57C00` on white | 2.70:1 | ❌ Fail | ❌ Fail |
| White on navy | 10.04:1 | ✅ Pass | ✅ Pass |
| White on secondary blue | 4.94:1 | ✅ Pass | ✅ Pass |
| White on orange `#F57C00` | 2.70:1 | ❌ Fail | ❌ Fail |
| Dark neutral `#171717` on orange `#F57C00` | 6.63:1 | ✅ Pass | ✅ Pass |
| Navy `#0B3D91` on orange `#F57C00` | 3.71:1 | ❌ Fail | ✅ Pass |
| White on orange-deep `#B35300` | 5.06:1 | ✅ Pass | ✅ Pass |
| Orange-deep `#B35300` on white | 5.06:1 | ✅ Pass | ✅ Pass |
| Neutral-600 `#4B5563` on white | 7.56:1 | ✅ Pass | ✅ Pass |
| Neutral-500 `#6B7280` on white | 4.83:1 | ✅ Pass | ✅ Pass |
| Navy `#0B3D91` on tint `#F0F4FA` | 9.10:1 | ✅ Pass | ✅ Pass |

### 2.3 Orange usage rule (binding — this is the finding that most changes how "accent" gets used)

The bright accent orange `#F57C00` **fails WCAG 2.2 AA for text and for non-text UI contrast (3:1)** when placed directly on white, and also fails with white text on top of it. It is **not** a text or thin-icon color on a white/light background.

**Permitted usage of `#F57C00`:**
- Large filled backgrounds/badges with **dark neutral (`#171717`) text or icons on top** (6.63:1 — passes).
- Decorative fills, dividers, graphic accents, chart/data-viz elements where WCAG's "essential to understanding" exemption for purely decorative graphics applies.
- Large (≥24px) icon glyphs used redundantly alongside text/labels (not as the sole information carrier).

**Not permitted:** `#F57C00` as body text, link text, small icon-only buttons, or focus indicators on white/light backgrounds.

**Use `#B35300` (accent-text-safe) instead whenever orange must appear as:** button label text, text links, small UI icons on light backgrounds, or white text needs to sit on an orange fill (5.06:1 — passes).

**Restraint rule** (carried from pre-Phase-1 direction): orange is reserved for primary CTA emphasis and status/interactive highlights — it must not become a secondary "site color" applied broadly just because it exists in the palette. Most surfaces stay white/navy/neutral; orange marks the one action you want the eye drawn to.

### 2.4 Semantic token layer (Tailwind v4 `@theme`, naming only — not implemented yet)

```
--color-background        white
--color-surface            neutral-50 (section alternation only)
--color-foreground         neutral-900
--color-foreground-muted   neutral-600
--color-foreground-subtle  neutral-500
--color-border             neutral-200
--color-brand-primary      navy
--color-brand-secondary    blue
--color-brand-accent       orange           (fills/large surfaces only, see §2.3)
--color-brand-accent-text  orange-deep      (text/icon/button-label safe orange)
--color-success / -error / -warning / -info
```

Naming is semantic (`brand-primary`, not `blue-800`) so the palette can be refined later without renaming every usage site — consistent with the "semantic design tokens" decision already locked pre-Phase-1.

## 3. Typography

### 3.1 Evaluation

| Candidate | Assessment |
|---|---|
| Inter | Extremely well-executed, but has become the default face of startup/SaaS product UI — directly conflicts with the "avoid generic startup/SaaS aesthetics" direction. |
| Manrope | Geometric, friendly, also trending heavily in startup/consumer product design; same conflict as Inter, arguably more casual. |
| Geist | Currently the CNA/Vercel scaffold default already in this repo. Clean, but reads as "default Next.js starter" and carries the same modern-SaaS association. |
| **IBM Plex Sans** | Designed by IBM specifically to express engineering/enterprise credibility. Distinct silhouette from the Inter/Manrope/Geist family — avoids the "another SaaS site" read. Ships with **IBM Plex Sans Devanagari** as an official, visually-matched companion — directly supports the future Hindi localization goal (`docs/PROJECT.md`/pre-Phase-1 i18n decision) without needing a mismatched pairing later. Strong legibility at small sizes, which matters for spec tables, dense forms, and certification/registration data. |
| Source Sans 3 | Neutral, highly legible, common in government/document contexts; a reasonable fallback but has a more "document/print" character than "modern technology company," and lacks an official matched Devanagari companion at the same design quality as Plex. |

### 3.2 Recommendation

**Primary typeface: IBM Plex Sans**, for body text, UI, and most headings. **Approved by the project owner** (`docs/DECISIONS.md B10`, 2026-07-26) — locked unless implementation reveals a significant usability, accessibility, or technical reason to revisit.

**Numeric/tabular data** (spec tables, certification IDs, form data): IBM Plex Sans with `tabular-nums` — no separate mono face needed for this site (no code display use case).

**Fallback stack**: `"IBM Plex Sans", "Source Sans 3", system-ui, -apple-system, "Segoe UI", sans-serif` — Source Sans 3 as web-safe-ish fallback rather than a generic sans, to keep the institutional character even before font load / on unsupported platforms.

### 3.3 Type scale (rem-based, 1rem = 16px root)

| Token | Size | Line-height | Weight | Usage |
|---|---|---|---|---|
| `display` | 3rem / 48px | 1.1 | 600 | Hero headline only |
| `h1` | 2.25rem / 36px | 1.15 | 600 | Page title |
| `h2` | 1.75rem / 28px | 1.2 | 600 | Section heading |
| `h3` | 1.375rem / 22px | 1.3 | 600 | Subsection heading |
| `h4` | 1.125rem / 18px | 1.4 | 600 | Card/component heading |
| `body-lg` | 1.125rem / 18px | 1.6 | 400 | Intro/lead paragraphs |
| `body` | 1rem / 16px | 1.6 | 400 | Default body text |
| `body-sm` | 0.875rem / 14px | 1.5 | 400 | Secondary text, form labels |
| `caption` | 0.75rem / 12px | 1.4 | 400/500 | Metadata, timestamps, legal fine print |
| `overline` | 0.75rem / 12px | 1.2 | 600, uppercase, tracked | Eyebrow/category labels |

Headings use 600 (semibold), not 700/800 — avoids the "huge decorative text" look explicitly ruled out.

## 4. Spacing & grid

- **Spacing scale**: 4px base unit — 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 (Tailwind default scale aligns; no custom scale required).
- **Container max-width**: 1280px, with 24px gutters on mobile, 32px on tablet, 64px on desktop margins beyond the container.
- **Grid**: 12-column at desktop/laptop, 8-column at tablet, 4-column at mobile.
- **Section vertical rhythm**: 96–128px between major homepage sections on desktop, 64px on mobile — generous whitespace per approved design direction, not cramped enterprise-brochure density.

## 5. Radius, shadows, borders, icons

- **Radius**: restrained — `4px` (inputs, small controls), `8px` (cards, buttons), `12px` (large panels/modals). No pill-shaped buttons, no oversized 24px+ "friendly SaaS" radii — consistent with "avoid overly rounded UI."
- **Shadows**: minimal, used only for elevation of interactive overlays (dropdowns, modals, toasts) — `sm`/`md`/`lg` scale, low opacity (≤10%), no colored/glow shadows. Cards on the page surface generally use a 1px `neutral-200` border rather than a shadow, to keep the page flat and institutional rather than "floating card" SaaS style.
- **Borders**: 1px `neutral-200` default; 2px navy for focus/active states (see §7).
- **Icons**: Lucide Icons (already approved future dependency) — line-style, 1.5–2px stroke, no filled/glyph icon set, sized 16/20/24px tiers. No decorative/novelty icon usage.

## 6. Component inventory (specification, not implementation)

For every component: define default, hover, focus, active, disabled, loading, error, success where applicable (§7 defines the shared state rules; this table notes exceptions/specifics only).

| Component | Notes |
|---|---|
| **Buttons** | Variants: Primary (navy fill, white text), Secondary (white fill, navy border+text), Accent (orange-deep `#B35300` fill, white text — reserved for RFQ/high-priority CTAs per §2.3), Ghost/Tertiary (text-only, navy). Sizes: sm/md/lg. Never orange `#F57C00` as a solid fill with white text (fails contrast, §2.3). |
| **Links** | Navy, underline on hover (not permanent underline in body copy — permanent underline in nav/footer lists is fine). Visited-state not specially styled (B2G reference site, not a blog). |
| **Cards** | Flat, 1px border, 8px radius, no shadow by default; hover raises to `shadow-sm` + border color shifts to navy-tint. No image-heavy "SaaS feature card" gradients. |
| **Forms / Inputs / Select / Checkbox / Radio / Switch** | Institutional density — visible labels always (no placeholder-as-label), 1px border default, 2px navy border + subtle focus ring on focus, `error`/`success` states use `color-error`/`color-success` border + inline message, never color-only signaling (icon + text always accompanies state color, for colorblind users per WCAG). |
| **Tabs / Accordion / Breadcrumb / Pagination** | Standard institutional patterns; breadcrumbs mandatory on all Products/Solutions/Brands/Government subpages for orientation in a deep taxonomy (§ IA). |
| **Table** | Used for spec sheets/certification lists — zebra striping optional (neutral-50 alternate rows), sticky header for long tables, horizontally scrollable container on mobile rather than squeezed columns. |
| **Badge** | Used for status (e.g., "GeM Verified Seller," category tags, `verificationStatus` internal-only badges in future admin). Solid navy-tint background + navy text by default; orange-deep badge reserved for the rare "featured"/priority marker. |
| **Tooltip / Modal / Drawer / Toast** | Modal/Drawer for RFQ multi-step and search overlay; Toast for form submission confirmation. All must trap focus appropriately and be dismissible via `Esc` and a visible close control (§8). |
| **Header / Navigation / Mega Menu** | See `docs/INFORMATION_ARCHITECTURE.md §2`. Sticky header on scroll (compact state), utility row (Search, Request Quote) always visible. |
| **Footer** | Per `docs/INFORMATION_ARCHITECTURE.md §10`. |
| **Search (overlay)** | Full-screen or large-panel overlay, not a tiny dropdown, given the breadth of the catalogue (§ SEO/UX search scope). |
| **Product Category Card / Product Card / Brand Card / Solution Card / Client Card / Certification Card / Project Card / Resource Card / News Card / Stat Card** | Share the base Card spec above; each adds only the fields it needs (e.g., Client Card shows category + logo only when `displayPermission: Approved`, never a placeholder logo). |
| **CTA (section-level)** | Navy or neutral-50 background block, single clear primary action (Request Quote / Explore Solutions), never more than one primary + one secondary action per CTA block. |

## 7. Interactive states (applies across all components unless noted above)

| State | Rule |
|---|---|
| Default | Base tokens per component. |
| Hover | Subtle — background tint shift or border color shift, 150–200ms transition (see §9). No scale/transform "pop" effects. |
| Focus | **Always visible**, never suppressed. 2px solid navy outline with 2px offset, meets WCAG 2.2 focus-appearance requirements; must remain visible against both white and navy/dark surfaces (use white outline on dark surfaces). |
| Active | Slightly deepened fill/border color of the same hue — no layout shift. |
| Disabled | Reduced opacity (~45%) + `cursor: not-allowed`; disabled controls never rely on color alone — also carry `aria-disabled`. |
| Loading | Inline spinner or skeleton, never a full-page blocking spinner for in-page actions (e.g., RFQ submit shows an inline button-loading state, not a full-screen overlay). |
| Error | `color-error` border/text + icon + explicit message text, associated via `aria-describedby`. |
| Success | `color-success` + icon + message; toasts auto-dismiss but remain manually dismissible and are announced via `aria-live="polite"`. |

## 8. Motion

Motion library: **Motion (Framer Motion)** per pre-Phase-1 decision; GSAP withheld.

| Interaction | Duration | Easing | Notes |
|---|---|---|---|
| Header/nav transitions | 150–200ms | ease-out | Sticky header compact/expand |
| Mega menu open/close | 150–200ms | ease-out | Fade + 4–8px slide, no bounce |
| Section reveal on scroll | 300–400ms | ease-out | Opacity + 8–16px translate only, staggered ≤50ms between siblings, and **only if `prefers-reduced-motion` is not set** |
| Card hover | 150ms | ease-out | Border/shadow only, no scale transform |
| Accordion expand/collapse | 200ms | ease-in-out | Height auto via measured transition |
| Modal/Drawer open | 200ms | ease-out | Backdrop fade + panel slide; focus moves into panel immediately |
| Search overlay | 150ms | ease-out | Fade/slide, input auto-focused |
| Counters | N/A | — | Not used unless real, verified statistics exist (`docs/CONTENT_STRATEGY.md` — no fabricated metrics, so no counter component is built speculatively) |

**Reduced motion**: every animation above must have a `prefers-reduced-motion: reduce` fallback that shows the end state immediately (opacity/position final values, no transition) — this is a hard requirement, not a nice-to-have, given the institutional/government audience likely includes assistive-technology users.

**Global rule**: no animation runs purely decoratively/on loop; every motion instance above is tied to a user action or one-time content reveal.

## 9. Responsive system

| Breakpoint | Width | Notes |
|---|---|---|
| Mobile | <640px | Single column, drawer nav, stacked forms, horizontally-scrollable tables |
| Tablet | 640–1024px | 8-column grid, mega menu collapses to accordion drawer still (not enough width for full mega menu) |
| Laptop | 1024–1280px | Full mega menu, 12-column grid begins |
| Desktop | 1280–1536px | Container caps at 1280px, extra space becomes margin |
| Large desktop | >1536px | Container remains capped at 1280px — content does not stretch full-bleed; prevents the "line-length too long" readability problem on large monitors common in government office setups |

Component-specific responsive notes: product filters collapse into a drawer/sheet on mobile; certificate/client layouts move from grid to single-column list; RFQ form uses single-column progressive disclosure on all breakpoints (multi-column forms are harder to scan and error-recover on mobile, so consistency is preferred over a wider desktop-only layout).

## 10. Accessibility summary (design-system-level)

Full accessibility plan lives in `docs/UX.md` and `docs/CONTENT_STRATEGY.md`; this section captures the design-token-level commitments:
- Every color pairing used for text or essential UI must be verified against the §2.2 table (or newly computed) before use — no ad hoc color combinations.
- Focus states are a first-class token (§7), not an afterthought.
- No state communicated by color alone anywhere in the component inventory.
- Motion respects `prefers-reduced-motion` everywhere (§8).
- Touch targets ≥24×24px (WCAG 2.2 SC 2.5.8) for all interactive controls, including icon-only buttons.
