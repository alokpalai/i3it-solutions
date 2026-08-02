# i3it Solutions — UX Architecture

Status: Phase 1 draft. Builds on `docs/PROJECT.md` (audiences), `docs/INFORMATION_ARCHITECTURE.md` (sitemap/taxonomy), and `docs/CONTENT_STRATEGY.md` (claim/placeholder rules).

## 1. Personas & journeys

For each: goals, questions, trust requirements, procurement needs, likely entry page, navigation path, primary CTA, supporting content.

### 1.1 Government procurement officer (primary)

- **Goals**: identify a credible, GeM-registered vendor who can supply/deploy specific IT infrastructure or equipment for a department.
- **Questions**: Is this a registered GeM seller? What categories do they cover? Have they worked with organizations like mine before? Are they certified (ISO, etc.)? Can they handle bulk/institutional quantities? What's their delivery/support capability?
- **Trust requirements**: GeM verified-seller status, relevant certifications, government/PSU client history (category-appropriate, not necessarily their exact department), clear factual tone (no hype).
- **Procurement needs**: category/brand match to a tender or internal requirement, ability to request a formal quote referencing a tender/GeM reference number.
- **Likely entry page**: Homepage (via search) or directly to `/government`.
- **Navigation path**: Home → Government → GeM Procurement / Sectors Served → Products (category) → Request Quote.
- **Primary CTA**: Request Quote (with GeM/tender reference field).
- **Supporting content**: Certifications & Registrations, Clients/Organizations (category-appropriate), Government Solutions overview.

### 1.2 GeM buyer researching the company (primary)

- **Goals**: verify legitimacy before or after finding the company's GeM catalogue listing.
- **Questions**: Is this the same company as the GeM seller profile? What else do they offer beyond what I found on GeM? What's their track record?
- **Trust requirements**: consistent company identity/branding matching GeM profile, clear "verified seller" language (never implying government affiliation — `docs/CONTENT_STRATEGY.md §6`), certifications.
- **Likely entry page**: Homepage or `/about` (arriving from a GeM listing/search).
- **Navigation path**: Home → About / Certifications → Government → Products/Brands relevant to what they found on GeM.
- **Primary CTA**: Request Quote or Contact Sales.
- **Supporting content**: Certifications, About, Products matching GeM catalogue categories.

### 1.3 Government IT officer evaluating capability (primary)

- **Goals**: assess whether i3it can handle system integration/deployment, not just supply.
- **Questions**: Do they do turnkey system integration? What's their technical support model? What brands/technologies do they work with?
- **Trust requirements**: system integration/turnkey messaging, technical support capability, specialized-solution depth (surveillance, biometrics, networking, etc.).
- **Likely entry page**: `/solutions/system-integration` or `/solutions/it-infrastructure`.
- **Navigation path**: Home → Solutions → System Integration / IT Infrastructure → Products (relevant categories) → Request Quote.
- **Primary CTA**: Discuss Requirement / Request Quote.
- **Supporting content**: Solutions detail, Brand directory, Support & Technology Services.

### 1.4 Buyer searching for a specific product/brand (primary + secondary)

- **Goals**: quickly confirm i3it carries a specific brand/product category (e.g., "HPE servers," "biometric attendance").
- **Trust requirements**: accurate, unambiguous category/brand pages; no e-commerce friction.
- **Likely entry page**: Search result or a specific `/products/[category]` or `/brands/[brand]` page (often via SEO — see `docs/SEO.md`).
- **Navigation path**: Search → Product/Brand page → Request Quote.
- **Primary CTA**: Request Quote.
- **Supporting content**: Related solutions, related brands/products, breadcrumb for orientation.

### 1.5 Buyer requesting a quotation (all personas converge here)

- **Goals**: submit a clear requirement with minimal friction, get a response.
- **Trust requirements**: form feels procurement-appropriate (organization/department fields present, not a generic "contact us"), clear next-step expectation.
- **Entry**: any Request Quote CTA sitewide.
- **Primary CTA**: Submit RFQ.
- **Supporting content**: none needed mid-flow — form should be self-contained (see §5 RFQ Experience).

### 1.6 Visitor validating company credentials (primary/secondary crossover)

- **Goals**: due-diligence pass before a purchase decision or vendor empanelment — checking registrations, certifications, legal standing.
- **Questions**: MSME/Udyam status? GST-registered? ISO certifications — which ones, current? Trade license? Physical address real/verifiable?
- **Trust requirements**: factual, unembellished registration data, matching `docs/CONTENT_STRATEGY.md §8-9` sensitivity rules (some identifiers require owner decision before display).
- **Likely entry page**: `/company/certifications`.
- **Navigation path**: Home → Company → Certifications & Registrations → About → Contact.
- **Primary CTA**: Contact Sales (or Download Company Profile once an approved version exists).
- **Supporting content**: About, Resources (Company Profile download).

### 1.7 OEM/vendor representative evaluating i3it (secondary)

- **Goals**: assess i3it as a potential channel/reseller partner for their own products.
- **Questions**: What's their reach (government/enterprise)? What brands do they already carry? What's their technical capability?
- **Trust requirements**: brand portfolio breadth, government reach, technical/integration capability.
- **Likely entry page**: `/about` or `/brands`.
- **Navigation path**: Home → About → Brands → Contact.
- **Primary CTA**: Contact Sales (business development framing).
- **Supporting content**: Brand directory, Solutions, Government reach.

### 1.8 Existing customer seeking support (secondary)

- **Goals**: reach the right support channel quickly.
- **Questions**: How do I get support/AMC service? Who do I contact?
- **Trust requirements**: responsiveness signaling — clear, direct contact path, no dead ends.
- **Likely entry page**: `/contact` or a Support-specific page under Solutions.
- **Navigation path**: Home → Solutions → Support & Technology Services → Contact.
- **Primary CTA**: Support Enquiry (distinct from general Sales enquiry — see §5.1).
- **Supporting content**: minimal — this journey should be short.

### 1.9 Candidate applying for a role (secondary)

- **Goals**: find open positions and apply.
- **Trust requirements**: legitimate, non-fabricated careers content (`docs/CONTENT_STRATEGY.md §15`).
- **Likely entry page**: `/company/careers`.
- **Navigation path**: Home → Company → Careers → Job detail → Apply.
- **Primary CTA**: Apply / Submit Resume.
- **Supporting content**: none fabricated; honest "no current openings" state acceptable if true.

## 2. Homepage UX

### 2.1 Sequence (evaluated against the proposed 17-block order)

The originally proposed sequence (Header, Hero, Government/Institutional credibility strip, Core capabilities, Product ecosystem, Government procurement/GeM expertise, Technology brands, Industries/sectors, Worked With/Clients, Certifications, Featured solutions, Projects, Why i3it, Resources, RFQ CTA, Contact, Footer) is directionally right but has two issues: (1) it separates "Government procurement/GeM expertise" from the "Government/Institutional credibility strip" that opens the page, splitting one narrative into two touches with unrelated content between them; (2) "Why i3it" arrives very late, after the visitor has already seen everything it would explain.

**Revised sequence:**

1. Header (sticky, utility row: Search, Request Quote)
2. Hero (positioning statement + primary CTAs — see §3)
3. Government & institutional credibility strip (GeM verified seller badge + 1-line trust statement — sets context immediately, not a logo wall)
4. Core capabilities (four pillars from `docs/PROJECT.md §7`, as scannable cards linking to Solutions)
5. Why i3it (moved up — trust rationale belongs right after capability framing, while attention is highest)
6. Government procurement / GeM expertise (full treatment, directly following the credibility strip's promise)
7. Product ecosystem (category overview linking into Products taxonomy)
8. Technology brands (selected/featured brands, links to `/brands`)
9. Sectors / industries served
10. Worked With / Clients (only `displayPermission: Approved` entries; category-based, not a logo wall — `docs/CONTENT_STRATEGY.md §5`)
11. Certifications & registrations (public-classification items only — `docs/CONTENT_STRATEGY.md §8.3`)
12. Featured solutions
13. Projects/case studies (**only included once real, approved project data exists** — otherwise this block is omitted entirely, not shown empty)
14. Resources (company profile, brochures — only once approved versions exist)
15. RFQ CTA (dedicated conversion block before Contact)
16. Contact
17. Footer

### 2.2 Homepage content model (per section)

| Section | Content source | Static/dynamic | Verification requirement | CTA |
|---|---|---|---|---|
| Hero | `docs/PROJECT.md §3, §20` positioning | Static (Phase 2–3), CMS-editable later | None beyond approved copy | Explore Solutions, Request Quote |
| Credibility strip | GeM status | Static | GeM status is profile-stated/publishable | — |
| Core capabilities | 4 pillars | Static | Already governed | Explore Solutions |
| Why i3it | Mission themes | Static | Already governed | About |
| Government/GeM | `docs/INFORMATION_ARCHITECTURE.md §24` | Static → later CMS | Governed | Explore Government Solutions |
| Product ecosystem | Product taxonomy | Static → later CMS/data layer | Taxonomy locked in IA doc | Browse Products |
| Brands | Brand directory (featured only) | Dynamic once data layer exists | Only `featured:true` + neutral relationship language | View All Brands |
| Sectors | Target audience list | Static | Governed | — |
| Clients | Client data model, `displayPermission: Approved` only | Dynamic once data layer exists | Hard gate — see `docs/CONTENT_STRATEGY.md §5` | View Organizations |
| Certifications | Certification list, PUBLIC classification only | Static → later CMS | Hard gate — see `docs/CONTENT_STRATEGY.md §8.3` | View Certifications |
| Featured solutions | Solutions taxonomy | Static | Governed | View Solutions |
| Projects | Project data model | Dynamic, omitted until real data | Hard gate — `TBD` until real | View Projects |
| Resources | Company profile/brochures | Static, omitted until approved assets exist | Hard gate | Download |
| RFQ CTA | — | Static | — | Request Quote |
| Contact | Contact info | Static | Pending pre-launch confirmation, `docs/CONTENT_STRATEGY.md §9.2` | Contact Us |

**Accessibility per section**: every section needs a proper heading level in document order (no skipped levels), sufficient contrast per `docs/DESIGN_SYSTEM.md §2.2`, and any carousel/slider component (e.g., in Brands or Clients) must be keyboard-navigable with pause control if auto-advancing — auto-advancing carousels are discouraged by default given motion restraint principles (`docs/DESIGN_SYSTEM.md §8`).

## 3. Navigation UX

- Sticky header, compact on scroll (`docs/DESIGN_SYSTEM.md §8`).
- Recommended 7-item top-level nav (`docs/INFORMATION_ARCHITECTURE.md §1.1`): Home, Solutions, Products, Government, Resources, Company, Contact — plus persistent Search and Request Quote in the utility row.
- Mega menus for Solutions/Products (multi-column); simple dropdown for Government/Company (few children).
- Mobile: full-screen drawer, accordion-style category expansion, Request Quote pinned at drawer bottom or as a persistent floating action.
- Breadcrumbs mandatory on all Products/Solutions/Brands/Government subpages (deep taxonomy — orientation matters more here than on a shallow marketing site).

## 4. Product discovery UX

- Layers: Product landing page → Category pages → Subcategory pages → Brand pages → Product detail templates (only where profile data supports real detail, not fabricated).
- Filtering: Category, Subcategory, Brand, Use case, Sector — filter state reflected in URL (supports SEO and shareable filtered views — see `docs/SEO.md`).
- **Explicitly not an e-commerce experience**: no cart, no pricing display (B2G/B2B procurement pricing is quote-based, not listed), no "buy now." Every terminal action is Request Quote / Discuss Requirement / Contact Sales (`docs/CONTENT_STRATEGY.md §10`).
- Empty/sparse category states (where the profile doesn't provide product-level detail) show category-level description + Request Quote rather than a broken-looking empty grid.

## 5. RFQ experience

RFQ is the primary conversion path across nearly every persona in §1.

### 5.1 Form field plan (progressive disclosure — not all fields required upfront)

**Step 1 (always shown):**
- Name
- Organization
- Official Email
- Phone
- Requirement Type (dropdown: Product Supply / System Integration / Solution Consultation / Support / Other)

**Step 2 (progressive, shown after Step 1 or as expandable "add more detail"):**
- Department
- Designation
- Product/Solution category (pulls from taxonomy)
- Brand preference (optional)
- Requirement description (free text)
- Quantity
- Delivery location
- Required delivery date
- Tender/GeM reference number (optional, relevant to §1.1/§1.2 personas)
- Attachment (requirement document — planning only, upload handling deferred to `docs/TECHNICAL_ARCHITECTURE.md §Security`)
- Additional information

**Rule**: Step 1 alone must be submittable — a procurement officer in a hurry shouldn't be blocked by fields irrelevant to a quick initial enquiry. This directly serves persona 1.1's time-pressured context.

### 5.2 Post-submission

Confirmation state sets accurate expectations (no fabricated "we respond within 2 hours" — `docs/CONTENT_STRATEGY.md §14`) and a reference number if the future backend supports it. Toast/inline confirmation per `docs/DESIGN_SYSTEM.md §6-7`, not a jarring full-page redirect that loses context for a user who may want to submit a second RFQ for a different category.

## 6. Search UX

- Global search across: Products, product categories, brands, solutions, clients (approved only), certifications, projects (once they exist), resources, media.
- Full-panel/full-screen overlay (not a small dropdown), reflecting catalogue breadth (`docs/DESIGN_SYSTEM.md §6`).
- Optimized for buyers who already know what they want: "HP laptop," "HPE server," "UPS," "biometric," "Microsoft license," "video conferencing" — i.e., prioritize exact category/brand/product matches over fuzzy marketing content.
- Keyboard accessible: `/` or a visible search icon opens it, `Esc` closes it, results are arrow-key navigable.
- This section plans UX only — no search indexing/backend implementation in Phase 1 (`docs/TECHNICAL_ARCHITECTURE.md §Rendering Strategy` covers where search becomes a dynamic route).

## 7. Trust architecture (how trust signals get distributed, not dumped)

Per `docs/PROJECT.md` positioning and `docs/CONTENT_STRATEGY.md`, trust signals (government clients, GeM status, certifications, brands, projects) appear **contextually** across the site rather than as one exhaustive logo wall on the homepage:

- Homepage: a representative, curated slice of each (credibility strip, featured clients, featured certifications).
- Government section: full client/organization explorer, full GeM detail.
- Company/Certifications page: full certification detail (subject to `docs/CONTENT_STRATEGY.md §8.3` classification).
- Brand directory: full brand list.
- Product/Solution pages: only the trust signals relevant to that specific category (e.g., a relevant certification badge on a security-solutions page, not every certification on every page).

## 8. Accessibility in UX flows

- Keyboard navigation across all flows (nav, mega menu, search overlay, RFQ multi-step, filters) — no flow reachable only by mouse/touch.
- Skip-to-content link on every page.
- Focus management: opening a mega menu, search overlay, or modal moves focus into it; closing returns focus to the trigger element.
- Semantic landmarks (`header`, `nav`, `main`, `footer`, `aside` where relevant) on every template.
- RFQ and Contact forms: labels always visible, errors announced via `aria-live`, associated via `aria-describedby` (`docs/DESIGN_SYSTEM.md §7`).
- Tables (spec sheets, certification lists) usable by screen readers — proper `<th>`/scope usage, not div-based fake tables.
- GIGW-relevant additions: accessibility statement page (once policy content exists, `docs/CONTENT_STRATEGY.md §17`), avoiding color-only meaning anywhere (already a Design System rule), sitemap page as a secondary navigation aid.
