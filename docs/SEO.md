# i3it Solutions — SEO Architecture

Status: Phase 1 planning document. Builds on `docs/INFORMATION_ARCHITECTURE.md` (taxonomy/sitemap) and `docs/CONTENT_STRATEGY.md` (claim rules — SEO copy is still subject to those rules; keyword optimization never justifies an unverified claim).

## 1. URL structure

```
/
/about
/company/vision-mission
/company/why-i3it
/company/certifications
/company/careers

/solutions
/solutions/government-procurement
/solutions/enterprise-technology-procurement
/solutions/it-infrastructure
/solutions/system-integration
/solutions/network-infrastructure
/solutions/surveillance-security
/solutions/biometric-access-control
/solutions/collaboration-video-conferencing
/solutions/power-business-continuity
/solutions/software-licensing
/solutions/digital-workplace
/solutions/deployment-support
/solutions/turnkey-projects

/products
/products/computing
/products/servers-storage
/products/networking
/products/printing-imaging
/products/security-biometrics
/products/collaboration-display
/products/power
/products/software
/products/accessories
/products/facility-solutions
/products/[category]/[subcategory]        -- e.g. /products/networking/switches

/brands
/brands/[brand-slug]                       -- e.g. /brands/hpe

/government
/government/gem-procurement
/government/sectors-served
/government/clients

/clients/[category]                        -- optional alias, or nested under /government/clients

/projects                                  -- not linked/indexed until real project data exists
/projects/[project-slug]

/resources
/resources/company-profile
/resources/certificates
/resources/brochures
/resources/case-studies
/resources/downloads

/media                                      -- only if a real content pipeline exists (docs/UX.md §Media)

/careers
/careers/[job-slug]

/contact
/request-quote

/privacy
/terms
/accessibility
/sitemap
```

Adjusted from the originally sketched structure to align exactly with the revised IA (`docs/INFORMATION_ARCHITECTURE.md §1`) — Company sub-pages nested under `/company/*` rather than flat, and Government's client list cross-referenced rather than duplicated.

**Rule**: no URL is published/indexed for a section that has no real content yet (`/projects`, `/media`, `/resources/case-studies`) — matches the placeholder rules in `docs/CONTENT_STRATEGY.md §4`. Use `noindex` or omit the route entirely rather than publishing a thin/empty page.

## 2. Metadata strategy

- Every route defines its own `generateMetadata` (or static `metadata` export) — no site-wide generic title/description left over from the CNA placeholder (`"Create Next App"`) once real pages exist.
- **Title pattern**: `{Page Title} | i3it Solutions` for subpages, `i3it Solutions | {primary positioning line}` for the homepage.
- **Description**: unique per page, factual, under ~160 characters, written under the same claim rules as body copy (`docs/CONTENT_STRATEGY.md`) — no keyword-stuffed superlatives.
- **Canonical URLs**: set explicitly on every page, especially filtered/paginated product listing views (`?category=`/`?brand=` query states should canonicalize to their clean category URL where the filter doesn't represent genuinely distinct content).
- **Open Graph**: `og:title`, `og:description`, `og:image` (a consistent brand-appropriate default image where a page-specific one doesn't exist — no stock-photo handshake imagery per `docs/DESIGN_SYSTEM.md §Visual Content Strategy`), `og:type` (`website` generally, `article` for Media posts once they exist).

## 3. Structured data (schema.org)

| Schema type | Applied to | Notes |
|---|---|---|
| `Organization` | Site-wide (root layout or homepage) | Name, logo, address, contact — only fields cleared for public display per `docs/CONTENT_STRATEGY.md §9.2`; no `award`/`aggregateRating`/fabricated properties |
| `Service` | Solutions pages | One per solution, describing the buyer-facing offering |
| `Product` | Product category/detail pages, **only where real, non-fabricated attributes exist** | Do not populate `Product` schema with invented SKUs/pricing/availability — omit fields rather than fabricate them; since this is a quote-based B2B site, `offers` with fixed pricing is generally not applicable |
| `BreadcrumbList` | All Products/Solutions/Brands/Government subpages | Matches the mandatory breadcrumb UI (`docs/UX.md §3`) |
| `Article` | Media posts (once they exist) | Not used speculatively before real content exists |
| `JobPosting` | Careers job detail pages, only for real open positions | No fabricated postings; remove/expire schema when a position closes |
| `FAQPage` | Only where a page has genuine, substantive Q&A content (e.g., a GeM Procurement FAQ if real questions are compiled) | Not added generically to pad rich-result eligibility |

**Verification alignment**: no structured data may assert a fact more confidently than `docs/CONTENT_STRATEGY.md` allows in the visible copy — schema is a machine-readable mirror of the page content, not a separate channel for stronger claims.

## 4. Internal linking

Follows the cross-linking rules already defined in `docs/INFORMATION_ARCHITECTURE.md §9`: every Product ↔ relevant Brands/Solutions, every Brand ↔ its category mappings, every Solution ↔ relevant Products/Brands/Government (where applicable), Government hub ↔ GeM/Sectors/Clients/Certifications. This cross-linking is also the primary internal-linking SEO strategy — topical clusters (e.g., all "networking" content interlinked) rather than a flat, unlinked page set.

Breadcrumbs (§1) double as both UX orientation and internal-link equity distribution.

## 5. Sitemap & robots

- `sitemap.xml` generated via Next.js's built-in `sitemap.ts` convention (verify current API shape against the installed version's docs per `docs/TECHNICAL_ARCHITECTURE.md §1` — do not assume an older Next.js sitemap API without checking), including only routes with real, published content (excludes dormant `/projects`, `/media` etc. until live).
- `robots.txt` allows crawling of all public marketing routes, disallows any future `/admin` path entirely, and references the sitemap.
- A human-facing `/sitemap` page (per `docs/INFORMATION_ARCHITECTURE.md §10` footer Legal column) supports GIGW-style navigability expectations, distinct from the machine `sitemap.xml`.

## 6. Section-specific SEO notes

- **Products**: target long-tail category + brand + use-case queries (e.g., "HPE server supplier government," "biometric attendance system PSU") — realistic given actual buyer search behavior (`docs/UX.md §6`), not generic "IT products India" head terms that are both highly competitive and not reflective of the B2G/B2B intent this site should attract.
- **Brands**: each brand page targets "[Brand] [category] supplier/dealer India" style queries; content stays within the neutral relationship language required by `docs/CONTENT_STRATEGY.md §7` (no "authorized partner" SEO copy without verified status — this is as much a legal-risk control as an SEO one).
- **Solutions**: target problem/solution-intent queries (e.g., "government IT procurement GeM vendor," "turnkey system integration India").
- **Government pages**: highest-priority SEO surface given the primary audience; must clearly differentiate in title/meta/schema that i3it is a **GeM-registered seller**, not a government entity — both for compliance and to avoid attracting irrelevant traffic/misunderstanding (`docs/CONTENT_STRATEGY.md §6`).
- **Certifications**: valuable for trust-driven branded search ("i3it Solutions ISO certification," "i3it Solutions GeM"); only publish schema/metadata for `PUBLIC` classification items (`docs/CONTENT_STRATEGY.md §8.3`).

## 7. What's explicitly not done in Phase 1

No metadata implementation, no sitemap.ts/robots.ts files created, no schema markup written, no analytics/search-console integration configured. This document defines the target architecture for when pages are actually built (Phase 3+).
