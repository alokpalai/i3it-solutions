# i3it Solutions — Architecture Decision Log

Status: Living document. Append new decisions with a date and rationale; do not silently edit past entries — if a decision changes, add a new entry that supersedes it and note the supersession.

## How to use this log

Each entry: **Decision**, **Status** (Locked / Recommendation pending owner approval / Open verification item), **Rationale**, **Date**. "Locked" entries were explicitly approved by the project owner in conversation; "Recommendation" entries are Phase 1 proposals awaiting sign-off; "Open verification item" entries are unresolved facts, not decisions.

---

## A. Pre-Phase-1 technical & process decisions (Locked — approved before Phase 1 began)

**A1. Version source of truth**
Decision: `package.json` installed versions (Next.js 16.2.12, React 19.2.4, TypeScript ^5, Tailwind CSS ^4, ESLint ^9) are authoritative; never downgrade to match older conventions.
Rationale: avoid drift toward outdated patterns from training-data familiarity or earlier planning drafts.
Status: Locked. Date: 2026-07-26.

**A2. No Express / separate backend initially**
Decision: Use Next.js App Router, Server Components by default, Server Actions and Route Handlers for backend needs. Domain logic isolated in a server-only `lib/` layer so an independent backend could be extracted later if justified.
Rationale: avoids premature infrastructure; keeps the door open without committing to it.
Status: Locked. Date: 2026-07-26.

**A3. Tailwind CSS as primary styling system, installed v4 conventions**
Decision: Tailwind v4 CSS-first config; semantic design tokens established in Phase 1; no scattered arbitrary colors.
Status: Locked. Date: 2026-07-26.

**A4. Design direction**
Decision: White background, deep navy/blue primary, secondary blue, orange accent, dark neutral text; avoid neon/cyberpunk/gradients/glassmorphism/overly-rounded UI/generic SaaS/visual clutter.
Status: Locked. Date: 2026-07-26.

**A5. Typography decision deferred**
Decision: No final typeface locked pre-Phase-1; Phase 1 evaluates Inter, Manrope, and professional alternatives.
Status: Locked (the deferral itself is locked); superseded in scope by **B10** below (Phase 1 recommendation delivered).
Date: 2026-07-26.

**A6. Motion library**
Decision: Motion/Framer Motion as primary animation solution; GSAP withheld unless a specific interaction genuinely requires it. Motion must be subtle, purposeful, performance-conscious.
Status: Locked. Date: 2026-07-26.

**A7. Accessibility target**
Decision: WCAG 2.2 AA + relevant GIGW principles, influencing the design system from Phase 1 rather than retrofitted.
Status: Locked. Date: 2026-07-26.

**A8. Internationalization**
Decision: English only initially; architecture must not structurally block future Hindi/localization.
Status: Locked. Date: 2026-07-26.

**A9. Environment variables**
Decision: `.env.local` for local secrets, `.env.example` with variable names only, never commit secrets.
Status: Locked. Date: 2026-07-26.

**A10. Git workflow**
Decision: `main` = production/stable, `develop` = integration/development; feature work branches from `develop`; no commit/push/merge/branch-switch without explicit instruction each time.
Status: Locked. Date: 2026-07-26.

**A11. CI/CD deferred**
Decision: GitHub Actions (lint/typecheck/test/build) planned for later; not configured yet.
Status: Locked. Date: 2026-07-26.

**A12. Testing deferred, strategy to be defined in Phase 1**
Decision: no testing tooling installed yet; Phase 1 identifies the strategy (see `docs/TECHNICAL_ARCHITECTURE.md §9`: Vitest + RTL + axe-core + Playwright, introduced before critical dynamic functionality, not immediately).
Status: Locked (deferral) + Recommendation delivered (tooling choice). Date: 2026-07-26.

**A13. Public company information integrity**
Decision: never invent clients, government relationships, OEM partnerships, certifications, project values, testimonials, awards, statistics, office locations, legal registrations. Use clearly marked sample data until verified information is supplied.
Status: Locked. Date: 2026-07-26.

**A14. Client/case-study approval model**
Decision: client display uses per-field approval gating (logo, name, project summary, case study, gallery independently) rather than a single published flag.
Rationale: government/PSU clients often approve disclosure at different granularity; a binary flag can't represent "logo approved, case study not approved."
Status: Locked. Date: 2026-07-26.

**A15. Performance as a core requirement**
Decision: target strong Core Web Vitals/Lighthouse results; avoid unnecessary client JS; prefer SSR/SSG; optimize images/fonts/animations.
Status: Locked. Date: 2026-07-26.

**A16. Security posture**
Decision: treat all form input/external data as untrusted, validate server-side; auth/authorization/upload security/rate limiting designed only when those features are actually introduced.
Status: Locked. Date: 2026-07-26.

**A17. Scope discipline on dependencies**
Decision: do not install a future dependency merely because it's in the master spec; install only when the phase implementing that functionality requires it.
Status: Locked. Date: 2026-07-26.

---

## B. Phase 1 business & content decisions

**B1. Editorial naming normalization**
Decision: use "i3it Solutions" as the consistent editorial name in all body copy/headings, regardless of the profile's inconsistent capitalization (`I3IT`, `I3IT SOLUTIONS`, `i3IT`, `I3it`). Logo/brand mark styling is preserved separately and may legitimately differ from editorial text casing.
Status: Locked (per Phase 1 instruction). Date: 2026-07-26.

**B2. Tagline not adopted verbatim**
Decision: the profile line "Not a Reseller Not a Consultant — We Solve Problems Related to IT Infrastructure" is not used as the literal website tagline. Its underlying positioning (technology solutions partner: understand → source → integrate → deploy → support) is adopted as the strategic framework instead.
Rationale: the sentence as written doesn't read as finished public-facing copy; the *intent* behind it is sound and is preserved.
Status: Locked. Date: 2026-07-26.

**B3. Company-age contradiction — OPEN VERIFICATION ITEM**
Finding: profile states the company was **formed in 2021** while also claiming **"already completed 10 years into the IT industry."** These cannot both describe the same entity's operating history (2021→2026 ≈ 5 years).
Interim resolution (publishable now): "Established 2021." "10 years" is **not** published as a company-age claim anywhere on the site.
**TBD**: Determine whether "10 years" refers to founder/team prior industry experience (pre-dating 2021 incorporation) or a predecessor business's operating history. If founder/team experience, it may be published as such (e.g., "led by a team with over a decade of IT industry experience") — never as "i3it Solutions has 10 years of experience."
Status: Open verification item — owner input required. Date logged: 2026-07-26.

**B4. GeM seller vs. government affiliation — hard rule**
Decision: the site must always describe i3it Solutions as a "registered/verified seller on the Government e-Marketplace (GeM)," never implying Government of India affiliation, appointment, or official status.
Status: Locked. Date: 2026-07-26.

**B5. Brand relationship terminology requires verification**
Decision: no brand (HP, HPE, Acer, ASUS, Wishtel, Western Digital, Samsung, PeopleLink, Matrix, Ahuja, BPE, Eaton, CyberPower, Microtek, Jabra, Cynix, Lapcare, Prama, Sparsh, TVS, Realtime Smart Solutions, Panasonic, LG, Voltas, QNAP, Digisol, Bitdefender, Norton, Quick Heal, Nilkamal, Microsoft, Autodesk, Adobe, Nitro, Canon, Epson, Uniline) is labeled "OEM/Authorized/Certified Partner" without a verifying document. Default framing: "Brands We Work With." `relationshipType` defaults to `TBD` per brand.
Status: Locked (as a governance rule); per-brand actual relationship type remains an open verification item for every brand listed.
Date: 2026-07-26.

**B6. Client claims require verification before publication**
Decision: no client/organization (across all five profile categories — Central Ministries & Departments, Defence & Security, PSUs, Education & Research, State Departments & Local Bodies) is published without owner-granted `displayPermission: Approved`, regardless of profile listing.
Status: Locked. Date: 2026-07-26.

**B7. Category vs. named-entity distinction**
Decision: profile entries that are categories (IITs, NITs, Kendriya Vidyalayas, Municipal Corporations, Health & Family Welfare Departments, Rural Development & Panchayati Raj, Department of Information Technology) are never expanded into invented specific named institutions.
Status: Locked. Date: 2026-07-26.

**B8. "ISO Certified Reseller" phrase rejected**
Finding: the profile phrase "ISO Certified Reseller" conflates an organizational ISO management-system certification with a reseller/product certification — a different and unsubstantiated claim type.
Decision: this exact phrase is never published. Individual ISO certifications (9001:2015, 20000-1:2018, 22301:2019, 27001:2022) are described precisely and separately once each is confirmed current.
Status: Locked (rejection of the phrase) + Open verification item (confirming current validity of each ISO certificate).
Date: 2026-07-26.

**B9. CMMI Maturity Level 3 claim — OPEN VERIFICATION ITEM**
Finding: CMMI claims are a claim type prone to industry overstatement and require supporting appraisal documentation.
Status: Open verification item — do not publish without supporting document. Date logged: 2026-07-26.

**B10. Typography: IBM Plex Sans — APPROVED**
Decision: IBM Plex Sans is the primary website typeface, over Inter/Manrope/Geist (too closely associated with startup/SaaS product design) and Source Sans 3 (more document/print-coded, no matched Devanagari companion of the same design quality). IBM Plex Sans ships an official IBM Plex Sans Devanagari companion, directly supporting the deferred-but-not-blocked Hindi localization goal (A8).
Status: **APPROVED** by project owner. Locked unless implementation reveals a significant usability, accessibility, or technical reason to revisit. Date recommended: 2026-07-26. Date approved: 2026-07-26.

**B11. Color palette WCAG verification**
Finding: computed contrast shows navy `#0B3D91` (10.04:1) and secondary blue `#1E73BE` (4.94:1) pass AA on white; bright accent orange `#F57C00` **fails** AA text/UI contrast on white (2.70:1) and with white text on it (2.70:1). A deeper working orange `#B35300` (5.06:1 both directions) is introduced as the text/icon/button-label-safe accent token.
Decision: bright orange `#F57C00` restricted to large fills/backgrounds with dark text or purely decorative use; `#B35300` used wherever orange must function as text, small icons, or button labels.
Status: Locked (as a binding accessibility constraint on palette usage — see `docs/DESIGN_SYSTEM.md §2`). Date: 2026-07-26.

**B12. Social category (SC) — not publishable**
Decision: the profile's "Social Category: SC" is proprietor/vendor-eligibility information, classified INTERNAL ONLY. Not published on the public site under any default behavior; requires explicit owner decision, and even then only in a formal procurement-eligibility document context, never general marketing copy.
Status: Locked. Date: 2026-07-26.

**B13. Sensitive registration data requires owner decision**
Decision: GST number, Udyam number (UDYAM-DL-09-0004185), and trade license document are classified PRIVATE by default — not auto-published; ISO certification *type* is PUBLIC, but certificate *documents* are PUBLIC AFTER VERIFICATION only.
Status: Locked. Date: 2026-07-26.

**B14. RFQ over e-commerce**
Decision: all product/brand/solution CTAs are "Request Quote" / "Discuss Requirement" / "Contact Sales" — no cart, no "Buy Now," no listed pricing, unless future requirements explicitly introduce e-commerce.
Status: Locked. Date: 2026-07-26.

**B15. B2G/B2B positioning drives IA and UX**
Decision: primary navigation, homepage sequence, and trust architecture are built around government/institutional/enterprise procurement evaluators, not consumer-style browsing or conversion patterns.
Status: Locked. Date: 2026-07-26.

**B16. Top-level navigation: 7 items — APPROVED**
Decision: primary navigation is `Home · Solutions · Products · Government · Resources · Company · Contact` (plus persistent Search/Request Quote utility) over the originally sketched 9-item structure, with Projects/Case Studies promoted back to top-level once real project content exists, and Media folded into Resources unless a real content pipeline justifies separating it.
Status: **APPROVED** by project owner. Locked unless implementation reveals a significant usability, accessibility, or technical reason to revisit. Date recommended: 2026-07-26. Date approved: 2026-07-26.

**B17. Phase 1 formally approved by project owner**
Decision: Phase 1 (Discovery, Company Information Architecture, UX Architecture, Design System, Content Architecture, Technical Planning) is approved, with B10 and B16 approved as part of the same decision. Approval is conditional on the standing rule that all open verification items (§C below) continue to gate related content, not architecture — no item in §C is resolved by this approval.
Status: **APPROVED**. Date: 2026-07-26.

---

## C. Open verification items (consolidated — also listed individually above)

| Item | Ref |
|---|---|
| "10 years" claim — founder/team experience vs. company history | B3 |
| Each brand's actual `relationshipType`/`authorizationStatus` | B5 |
| Each client's `displayPermission` status | B6 |
| Validity/current status of ISO 9001:2015, 20000-1:2018, 22301:2019, 27001:2022 certificates | B8 |
| CMMI Maturity Level 3 supporting documentation | B9 |
| GST number, Udyam number, trade license — publish decision | B13 |
| Full list in `docs/CONTENT_STRATEGY.md §17` (logos, domain, leadership, projects, PAN India confirmation, AMC terms, contact confirmation, etc.) | — |

These items block specific pieces of *content* from going live; they do not block Phase 1 architecture completion, and they do not block Phase 2 (structural/design-system implementation, which doesn't depend on resolving them).
