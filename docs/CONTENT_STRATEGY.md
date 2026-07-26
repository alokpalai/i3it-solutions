# i3it Solutions — Content Strategy & Governance

Status: Phase 1 draft. This is the authoritative content-governance document — every other doc that references "verification status," "placeholder rules," "claim rules," or "sensitive data" defers to this file.

## 1. Tone & voice

Professional, precise, institutional, technically competent, trustworthy, factual. Written for evaluators (procurement officers, IT heads, buying committees) who are assessing legitimacy and capability, not consumers being persuaded emotionally.

**Avoid**: generic marketing fluff ("revolutionary," "world-class," "cutting-edge" used as filler), fake metrics, fake testimonials, fake projects, unverified partnership claims, unsupported superlatives ("India's leading," "#1," "largest," "best," "most trusted" — see `docs/PROJECT.md §8`).

## 2. Company facts (canonical — pull from here, not from the raw profile PDF, when writing copy)

| Fact | Status | Publishable as |
|---|---|---|
| Name | Profile-stated | "i3it Solutions" (editorial), logo preserved as-is |
| Established | Profile-stated | "Established in 2021" |
| Industry experience ("10 years") | **NEEDS VERIFICATION** | Do not publish as a company-age claim. See `docs/DECISIONS.md` verification item. |
| Vision | Profile-stated | Publishable, meaning preserved, grammar polishable (`docs/PROJECT.md §5`) |
| Mission (4 pillars) | Profile-stated | Publishable (`docs/PROJECT.md §6`) |
| Service scope: business setup support, technical consulting, technical support, network integration, system integration, turnkey systems integration, IT products, power solutions, IT services | Profile-stated | Publishable within the 4-pillar framing (`docs/PROJECT.md §7`) |
| PAN India service intent | Profile-stated | Publishable as *intent/coverage ambition*; do not word as a guaranteed SLA ("we service every location in India") without owner confirmation of actual delivery/logistics capability |
| GeM verified seller | Profile-stated | Publishable, with the seller-vs-government distinction always present (`docs/PROJECT.md §10`, §6 below) |
| Address / phone / email | Profile-stated | See §8 (Contact) — requires pre-launch confirmation, not blocked from planning |
| Social category (SC) | Profile-stated | **Not publishable** without explicit owner decision — see §9 |

## 3. Claim verification system

Every business claim on the site must carry one of these statuses internally before publication. This is a **content-governance framework**, not a public-facing website feature.

| Status | Meaning |
|---|---|
| **VERIFIED** | Confirmed against a document or authoritative source |
| **PROFILE-STATED** | Present in the company profile supplied by the owner; not yet independently confirmed |
| **OWNER-CONFIRMED** | Owner has explicitly confirmed this fact/claim for publication |
| **DOCUMENT-VERIFIED** | Backed by a specific certificate/registration/contract document |
| **NEEDS VERIFICATION** | Ambiguous, contradictory, or unconfirmed — must not be published as fact |
| **DO NOT PUBLISH** | Explicitly excluded from the public site (e.g., sensitive personal/proprietor data) |

Apply this status to, at minimum: clients, certifications, OEM/brand relationships, registrations, years-of-experience claims, project statistics, geographic coverage claims, support-capability claims (e.g., SLA/AMC terms).

**Default status for anything not explicitly owner-confirmed is `PROFILE-STATED` or `NEEDS VERIFICATION` — never `VERIFIED`.** Nothing in the current profile automatically graduates to `VERIFIED`; that requires a document or explicit owner sign-off captured in `docs/DECISIONS.md`.

## 4. Placeholder rules

- No page ships with fabricated example content dressed as real content (no invented client quotes, no invented project photos, no invented statistics "for demonstration").
- Where real content doesn't exist yet (Projects/Case Studies, Media, Testimonials, Careers listings), the section either (a) does not ship / is not linked from navigation yet, or (b) ships with an honest, clearly-labeled "coming soon" / "content in progress" state — never with placeholder content that reads as genuine.
- Sample/development-time content (used only while building the UI, never deployed) must be visually and structurally distinguishable from real content and must never reach `main`.
- This rule directly governs: `docs/INFORMATION_ARCHITECTURE.md §1.1` (Projects nav item dormant until real data), §7 (Project data model, every instance `TBD`), §6.3 (client publication gate).

## 5. Client content rules

Governs the client list in `docs/INFORMATION_ARCHITECTURE.md §6`.

1. A client name/logo is **never** published without `displayPermission: Approved` (owner-granted, not inferred from the profile listing itself — the profile listing is evidence the company *claims* the relationship, not owner authorization to publish it publicly).
2. Category-level profile entries (IITs, NITs, Kendriya Vidyalayas, Municipal Corporations, Health & Family Welfare Departments, Rural Development & Panchayati Raj, Department of Information Technology) are presented as categories/sectors served, never expanded into specific named institutions that weren't explicitly named in the profile.
3. Logos are only used with confirmed usage rights — a client's public sector status does not itself grant the right to display their emblem/logo.
4. Where relationship type is ambiguous (direct client vs. GeM order vs. sub-integration under another vendor), the copy must not overstate the relationship as a direct, ongoing partnership unless clarified.

## 6. Government-facing communication rules

Applies to all Government, GeM, and any copy mentioning ministries/PSUs/defence organizations.

1. **Never imply Government of India affiliation, endorsement, or official status.** i3it Solutions is a **seller/vendor registered on GeM**, not a government body.
2. Use precise language: "registered/verified seller on the Government e-Marketplace (GeM)," never "government-appointed," "official government partner," or similar.
3. When referencing specific ministries/PSUs/defence organizations as clients, apply §5 rules in full — no publication without `displayPermission: Approved`.
4. Tone stays factual and procurement-friendly (`docs/INFORMATION_ARCHITECTURE.md §24`) — no dramatization of security/defence relationships, which is both a trust risk and, for defence-adjacent clients in particular, a sensitivity risk.

## 7. Brand relationship content rules

Governs `docs/INFORMATION_ARCHITECTURE.md §4`.

1. No brand is described as "OEM Partner," "Authorized Partner," "Certified Partner," "Authorized Reseller," or similar without a specific verifying document.
2. Default framing for any brand without confirmed status: neutral portfolio language — "Brands We Work With," "Technology Portfolio," "Technology Brands."
3. `relationshipType` defaults to `TBD` for every brand until the owner supplies documentation (see data model, `docs/INFORMATION_ARCHITECTURE.md §4.3`).
4. Brand-category mappings (e.g., "HPE → Servers, Storage, Networking") describe product-category association only — they are not, by themselves, evidence of authorization status and must not be worded as such.

## 8. Certification & registration content rules

### 8.1 Profile-stated items

| Item | Detail (profile-stated) | Verification note |
|---|---|---|
| MSME / Udyam registration | Micro Enterprise, Udyam No. UDYAM-DL-09-0004185 | See §9 for public-display classification |
| GST registration | — | Number classification in §9 |
| GeM registration | Verified Seller on Government e-Marketplace | Publishable per §6 rules |
| ISO 9001:2015 | Quality Management System | Certificate document required before "publishable with document" status |
| ISO/IEC 20000-1:2018 | IT Service Management | Same as above |
| ISO 22301:2019 | Business Continuity Management System | Same as above |
| ISO/IEC 27001:2022 | Information Security Management System | Same as above |
| CMMI Maturity Level 3 | — | **NEEDS VERIFICATION** — CMMI claims specifically require supporting appraisal documentation before publication; this is a claim type prone to overstatement industry-wide |
| Trade License | — | Existence publishable; document itself classified per §9 |
| Trademark Registration | — | Same as above |
| Vendor registrations: Invoice Mart, M1xchange, RIXIL | — | Publishable as factual vendor-platform registrations once confirmed current |

### 8.2 Flagged ambiguous phrase

The profile phrase **"ISO Certified Reseller"** is ambiguous and potentially misleading — it conflates an organizational ISO management-system certification (which certifies *processes*, e.g., ISO 9001) with a *reseller/product* certification, which is a different kind of claim. **This exact phrase must not be published anywhere on the site.** Track resolution in `docs/DECISIONS.md`; before publication, determine specifically which ISO standard(s) the company holds and describe them individually and precisely (as in §8.1), not as a bundled "ISO Certified Reseller" claim.

### 8.3 Certification display sensitivity classification

Not every registration identifier is safe to publish. Applied per-item:

| Classification | Meaning | Applied to |
|---|---|---|
| **PUBLIC** | Safe to state as a fact on the public site | Certification *type* (e.g., "ISO 9001:2015 certified"), GeM seller status |
| **PUBLIC AFTER VERIFICATION** | Publishable once the underlying document is confirmed current/valid | Certificate documents/badges themselves, CMMI claim, "ISO Certified Reseller" resolution |
| **PRIVATE / requires owner decision** | Not published by default; owner must explicitly opt in | GST number, Udyam number, trade license document |
| **REDACTED** | Never shown in full even if a related document is published (e.g., a certificate PDF should have identifying numbers considered before upload) | Any personally identifying proprietor detail incidentally present in a scanned document |
| **INTERNAL ONLY** | Never appears on the public site at all | Social category (see §9) |

## 9. Sensitive information — explicit rules

### 9.1 Social category (SC)

The profile states **Social Category: SC (Scheduled Caste)**. This is proprietor/company-eligibility information relevant to procurement/vendor-eligibility documentation (e.g., MSME/government vendor category benefits) but is **not** to be published on public marketing pages under any default behavior. Classification: **INTERNAL ONLY — requires explicit owner decision before any public display**, and even if the owner later approves disclosure, it should only ever appear in a formal, procurement-context document (e.g., an official vendor eligibility document made available to a specific tendering authority), never as general-audience website copy.

### 9.2 Contact information

Profile-stated: Address (D-157, Saurabh Vihar, Near Shiv Mandir, Jaitpur, Badarpur, New Delhi - 110044), Phone (9773788818), Email (arun@i3it.in).

Rule: treat as **business contact information pending pre-launch confirmation** — plan the Contact page, RFQ routing, and footer around these values, but confirm currency/approval with the owner before the site goes live (this is a standard pre-launch checklist item, not a blocker to Phase 1 planning). Do not add any personal information beyond approved business contact data (no personal mobile numbers, personal addresses, or individual staff contact details unless explicitly approved per person).

## 10. Product content rules

- Product/category copy stays within the taxonomy in `docs/INFORMATION_ARCHITECTURE.md §3` — no invented subcategories or SKUs.
- No fabricated specifications, model numbers, or pricing. Where the company profile doesn't provide SKU-level detail, product pages describe categories/capabilities, not specific models, until real catalogue data exists.
- CTAs on every product/category/brand page are **"Request Quote" / "Discuss Requirement" / "Contact Sales"** — never "Add to Cart" / "Buy Now" (no e-commerce behavior; `docs/INFORMATION_ARCHITECTURE.md §9`, pre-approved B2G/B2B positioning).

## 11. Solutions content rules

Solutions copy is written around the buyer's problem (`docs/INFORMATION_ARCHITECTURE.md §5`) and must stay within the four capability pillars (`docs/PROJECT.md §7`). Do not introduce services not profile-stated (cloud consulting, managed SOC/cybersecurity consulting, data-center construction, AI consulting, etc.) — these are explicitly out of scope until verified.

## 12. About page content rules

Rewrite the company story professionally; do not copy the source profile paragraph verbatim (it is not web-publication-ready prose). Preserve factual meaning exactly — established 2021, business positioning, vision, mission, government focus, technology portfolio, system integration capability, PAN India ambition (labeled as ambition/scope, not guaranteed coverage, pending §2 confirmation), trust signals, certifications (per §8 sensitivity rules).

## 13. Projects/Case Studies content rules

No case study is invented. Every project record is marked `TBD — requires actual project data` (`docs/INFORMATION_ARCHITECTURE.md §7`) until the owner supplies real project detail (challenge, solution, outcome, imagery, and — critically — client approval per the approval model below).

### 13.1 Client approval model for case studies (carried from pre-Phase-1 discussion)

Client/case-study display uses **per-field approval gating**, not a single published/unpublished flag, because government/PSU clients often approve disclosure at different granularity:

| Field | Shown only if |
|---|---|
| Client logo / name | Client has approved logo/name usage |
| Project summary | Client has approved the summary text |
| Case study (detailed write-up) | Client has approved the extended narrative |
| Gallery (images) | Client has approved image usage |

Components must render correctly with any subset of these present, including the minimal case (no name/logo, generic summary only, e.g., "a leading state government department").

## 14. RFQ & support content rules

RFQ copy must set accurate expectations (response time, what happens after submission) — no fabricated "response within X hours" unless the owner confirms an actual SLA. Support-capability claims (AMC, maintenance, after-sales) are limited to what's profile-stated (`docs/PROJECT.md §7`, pillar D) — specific SLA terms require owner verification before publication.

## 15. Media & Careers content rules

- **Media**: only ship categories (news, events, insights, gallery) that have a realistic content pipeline; do not create empty sections purely for enterprise-site completeness (`docs/INFORMATION_ARCHITECTURE.md §1.1`).
- **Careers**: no fabricated "company culture" statements, perks, or team-size claims. Careers content is limited to what's actually true and owner-provided (open positions, application process) until further input exists.

## 16. Writing mechanics

- Sentence case for headings (not Title Case), consistent with an institutional-document register rather than a marketing-site register.
- Numerals for all figures (10, not "ten") in specs/data contexts; either is acceptable in narrative prose, but stay consistent within a page.
- Government/organization names spelled out on first reference with acronym following, e.g., "Central Reserve Police Force (CRPF)," then acronym thereafter.
- No exclamation points in body copy. No first-person-plural excitement language ("We're thrilled to...").

## 17. Open information gaps (content cannot be finalized until supplied)

Carried into `docs/DECISIONS.md` and the Phase 1 final report; listed here as the content-specific subset:

Official logo assets & brand guidelines, official domain confirmation, legal entity structure, founder/leadership bios, team information, real project case studies + photography, exact brand authorization documents, certification documents + validity dates, CMMI supporting documentation, GeM seller profile details approved for publication, real company statistics (if any), PAN India service-capability confirmation, support/AMC terms, confirmed current contact details, social media handles (if any), careers content, privacy/terms/accessibility policy text, testimonials (none exist — none will be fabricated), approved client logo usage rights.
