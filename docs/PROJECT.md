# i3it Solutions — Project Context

Status: Phase 1 (Discovery & Architecture) — Draft for owner review
Last updated: 2026-07-26

## 1. Purpose of this document

This is the single source of truth for *why* the website exists and *what business it represents*. All other `/docs` files (Information Architecture, Design System, UX, Content Strategy, Technical Architecture, SEO, Roadmap, Decisions) must stay consistent with this document. Where this document says a fact is unverified, no other document or future page copy may present it as fact.

## 2. Company identity

- **Editorial name**: "i3it Solutions" — used consistently in all web copy, headings, and body text regardless of how the source company profile capitalizes it (profile uses `I3IT`, `I3IT SOLUTIONS`, `i3IT`, `I3it` interchangeably).
- **Logo/brand mark**: preserved as-is wherever the official logo asset is used (logo capitalization/styling is a brand-mark decision, not an editorial-text decision — the two are allowed to differ).
- **Legal/registration name, entity type**: NEEDS VERIFICATION — not confirmed from the profile excerpt provided.

## 3. Positioning

Profile-stated tagline: *"Not a Reseller Not a Consultant — We Solve Problems Related to IT Infrastructure."*

**Decision**: this sentence is not adopted verbatim as the public tagline. It is treated as a statement of underlying positioning intent, which is:

> i3it Solutions presents itself as a technology solutions partner — not merely a product reseller — capable of understanding a buyer's requirement, sourcing the right technology across multiple brands, integrating systems, deploying solutions, and supporting customers after delivery.

This positioning framework (**understand → source → integrate → deploy → support**) is the throughline for About, Solutions, Government, and Homepage copy. See `docs/CONTENT_STRATEGY.md` for tone/claim rules and `docs/UX.md §20` (Hero Strategy) for how this becomes hero copy.

## 4. Company background

| Fact | Status |
|---|---|
| Company formed in 2021 | Profile-stated |
| End-to-end IT solutions: business setup support, technical consulting, technical support, network integration, system integration, turnkey systems integration, IT products, power solutions, IT services | Profile-stated |
| Intends to serve customers PAN India | Profile-stated (service *capability*/*coverage confirmation* needs verification — see §6) |

### 4.1 Contradiction: company age vs. "10 years in IT industry"

The profile states the company was **formed in 2021** while elsewhere claiming it has **"already completed 10 years into the IT industry."** These two statements cannot both describe the same entity's operating history — 2021 to the current date (2026) is roughly 5 years, not 10.

**Resolution used across all docs until verified:**
- **Company established**: 2021 (publishable)
- **Industry experience**: NEEDS VERIFICATION — do not publish "10 years" as a company-age claim.

**Verification item (tracked in `docs/DECISIONS.md`)**:
> TBD — Determine whether "10 years experience" refers to the founder's/team's prior individual industry experience (pre-dating the company's 2021 incorporation) or to the operating history of a predecessor business. If it refers to founder/team experience, it can be published as such (e.g., "led by a team with over a decade of IT industry experience") — but never as "i3it Solutions has 10 years of experience" or "10 years in business."

## 5. Vision (profile-stated, preserved in meaning)

> To be a leading force in driving digital transformation in India's public sector through dependable and innovative IT solutions.

Grammar/presentation may be polished for the website; the strategic intent (public-sector digital transformation leadership, dependability, innovation) must not be altered. This vision anchors public-sector-facing content: About, Government Solutions, Homepage credibility sections.

## 6. Mission (profile-stated, four pillars)

1. Provide high-quality IT hardware and software tailored to government departments and institutions.
2. Improve transparency and efficiency in government procurement through the Government e-Marketplace (GeM).
3. Build lasting client relationships through trust, reliability, and consistent service.
4. Provide responsive support and dependable solutions that help clients achieve operational goals.

These four themes must recur (not be confined to a single "Mission" page) across: About, Why i3it, Government Solutions, Procurement/RFQ, Support, Homepage.

## 7. Business positioning — four capability pillars

| Pillar | Scope (profile-stated) |
|---|---|
| **A. IT Procurement & Supply** | Government procurement, GeM-based procurement, institutional procurement, enterprise procurement, hardware supply, software licensing, bulk procurement |
| **B. IT Infrastructure & Integration** | Computing infrastructure, servers, storage, networking, connectivity, system integration, turnkey solutions, installation, deployment |
| **C. Specialized Technology Solutions** | Surveillance, access control, biometrics, video conferencing, collaboration, digital displays, power backup, printing, software, professional audio, specialized infrastructure |
| **D. Support & Technology Services** | Technical consulting, technical support, implementation, integration, after-sales support, maintenance (maintenance scope requires verification) |

**Rule**: no service or capability outside these four pillars (and their profile-stated contents) may be added to site architecture without being explicitly marked "Requires company verification." This includes plausible-sounding adjacent services (e.g., cloud consulting, managed SOC, AI consulting, data-center construction) — none of these are profile-stated and none may be invented. See `docs/CONTENT_STRATEGY.md §Claim Rules`.

## 8. Primary market position

> i3it Solutions is an IT procurement, infrastructure, and technology solutions partner serving government departments, public-sector organizations, institutions, and enterprises.

Strongest differentiating themes (profile-supported): government procurement expertise, GeM presence, broad technology portfolio, multi-brand sourcing, IT infrastructure solutions, system integration, turnkey execution, technology consulting, after-sales support, institutional procurement capability.

**Prohibited claim patterns** (no supporting evidence in profile): "India's leading...", "#1...", "largest...", "best...", "most trusted...". These must never appear in generated or human-written copy for this site.

## 9. Target audiences

### Primary
Central Government departments, State Government departments, Public Sector Undertakings (PSUs), Defence/security organizations, Government procurement teams, Government IT teams, Educational institutions, Research institutions, Healthcare/public institutions.

### Secondary
Enterprise buyers, corporate procurement teams, IT managers, CIO/CTO organizations, OEM/vendor representatives, business partners, existing customers, job applicants.

Full per-audience goals/questions/trust requirements/CTAs are detailed in `docs/UX.md §Personas & Journeys` (this document only establishes *who* the audiences are; UX owns *how* each is served).

## 10. Government procurement positioning

i3it Solutions is profile-stated to be a **verified seller on the Government e-Marketplace (GeM)**.

**Critical distinction the website must never blur**:
- i3it Solutions is a **seller/vendor registered on GeM** (a government-run procurement platform open to registered sellers).
- i3it Solutions is **not** a Government of India entity, and the website must never imply affiliation with, endorsement by, or status as a government organization.

Every instance of GeM-related copy must be reviewed against this rule. See `docs/CONTENT_STRATEGY.md §Government-Facing Communication Rules`.

## 11. Scope boundaries for this document

This document intentionally does **not** contain: the full client list/taxonomy (→ `INFORMATION_ARCHITECTURE.md` + client data model), the full product/brand taxonomy (→ `INFORMATION_ARCHITECTURE.md`), certification details (→ `CONTENT_STRATEGY.md` + `DECISIONS.md`), or contact information handling (→ `CONTENT_STRATEGY.md §Contact & Sensitive Data`).

## 12. Architecture principles (carried over from pre-Phase-1 decisions)

See `docs/DECISIONS.md` for the full log. Summary: Next.js App Router, Server Components by default, Tailwind CSS v4 with semantic tokens, no Express/separate backend initially, WCAG 2.2 AA + GIGW consideration, English-only initially, RFQ-oriented (not e-commerce) conversion model, `main`/`develop` git workflow, strict scope discipline on dependencies.

## 13. Objectives for the website (Phase 1 framing)

1. Establish credibility with government/PSU procurement evaluators within seconds of landing.
2. Present a broad, multi-brand technology portfolio without becoming an e-commerce catalogue.
3. Make GeM/government procurement capability legible and distinct from claiming government affiliation.
4. Convert qualified interest into RFQs (Request for Quote) rather than generic contact-us fatigue.
5. Maintain complete factual integrity — every claim traceable to profile-stated, owner-confirmed, or document-verified status (see `docs/CONTENT_STRATEGY.md §Claim Verification System`).
6. Be built on an architecture that can absorb a future CMS/admin, without over-building either now.
