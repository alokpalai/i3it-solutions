# i3it Solutions — Development Roadmap

Status: Phase 1 planning document. Phase boundaries below are scope guides, not calendar commitments.

## Phase 1 — Discovery, Information Architecture, UX, Design System, Content Governance, Technical Planning

**Deliverables**: `docs/PROJECT.md`, `docs/INFORMATION_ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md`, `docs/UX.md`, `docs/CONTENT_STRATEGY.md`, `docs/TECHNICAL_ARCHITECTURE.md`, `docs/SEO.md`, `docs/DECISIONS.md`, `docs/ROADMAP.md` (this file).
**Dependencies**: real company profile (supplied).
**Completion criteria**: all nine docs exist, are internally consistent, and every business claim in them is traceable to profile-stated/owner-confirmed status per `docs/CONTENT_STRATEGY.md §3`. No code, no dependencies installed, no commits.
**Status**: complete, pending owner review (see final report accompanying this roadmap).

## Phase 2 — Foundation

**Scope**: design tokens implemented in Tailwind (`@theme`) per `docs/DESIGN_SYSTEM.md`; global layout shell; Header/Navigation/MegaMenu; Footer; base UI primitives (Button, Link, Card, Badge) introduced, likely via shadcn/ui at this point (first point where a new dependency is genuinely needed); homepage structure built with real (not placeholder) sections per `docs/UX.md §2`, populated with whatever content is already approved and honest "TBD" states elsewhere.
**Dependencies**: Phase 1 sign-off; typography decision confirmed (`docs/DECISIONS.md B10`); at minimum the non-sensitive facts in `docs/CONTENT_STRATEGY.md §2` available to write real (not placeholder) copy.
**Testing**: Vitest + React Testing Library introduced here if Header/Nav/MegaMenu interactivity is being built (per `docs/TECHNICAL_ARCHITECTURE.md §9` — testing lands before critical dynamic functionality, and interactive nav qualifies).
**Completion criteria**: homepage and global shell render correctly across breakpoints (`docs/DESIGN_SYSTEM.md §9`), pass a manual keyboard-navigation and axe accessibility pass, no fabricated content present.

## Phase 3 — Company, Government, Solutions, Contact, RFQ UI

**Scope**: About, Vision & Mission, Why i3it, Certifications & Registrations (public-classification items only), Careers landing; Government Solutions, GeM Procurement, Sectors Served, Clients explorer (only approved clients — likely empty or near-empty at this point pending owner approvals); full Solutions taxonomy pages; Contact page; RFQ form UI (client-side, per `docs/UX.md §5` field plan) with a temporary submission handler (e.g., emailing via a placeholder integration or simply logging server-side) since Resend isn't installed until Phase 5.
**Dependencies**: React Hook Form + Zod introduced here (first real forms); owner decisions on B3 (10-years), B5 (brand relationships), B6 (client approvals), B12 (social category), B13 (registration numbers) increasingly needed as more pages go live — pages ship honestly incomplete where decisions are still pending, never with fabricated fill-in.
**Testing**: RFQ form covered by component tests + at least one Playwright E2E happy-path once Playwright is introduced (see Phase 5 note — may pull forward if RFQ complexity warrants it).
**Completion criteria**: every published claim on these pages carries a status per `docs/CONTENT_STRATEGY.md §3`; no client/certification/registration appears without required approval.

## Phase 4 — Products, Categories, Brands, Clients, Certifications, Projects

**Scope**: full product taxonomy pages (category → subcategory), Brand directory + brand detail pages, Client explorer completed (as approvals arrive), Certifications page completed, Projects/Case Studies section (built but likely dormant per `docs/CONTENT_STRATEGY.md §4` until real project data exists), Search UX (client-side against the Phase 2-4 static data layer — no backend search yet), Resources section (Company Profile/Certificates/Brochures/Downloads, populated only with approved assets).
**Dependencies**: `src/data/` typed content modules per `docs/TECHNICAL_ARCHITECTURE.md §3` populated for the full taxonomy; Lucide Icons introduced if not already; real project data still likely pending — this phase can complete structurally with the Projects section shipped-but-dormant.
**Testing**: filter/search interaction covered by component tests; accessibility pass on tables (certification lists, spec-style content) and filter UI.
**Completion criteria**: full catalogue/brand/solutions cross-linking works per `docs/INFORMATION_ARCHITECTURE.md §9`; no e-commerce affordance anywhere; sitemap.xml/robots.txt implemented per `docs/SEO.md §5` covering only live routes.

## Phase 5 — Data Layer, Backend Services, Forms, Email, File Handling

**Scope**: MongoDB + Mongoose introduced for dynamic entities (RFQ, Enquiry, Job Application submissions at minimum; static content migration to the database is optional/incremental per `docs/TECHNICAL_ARCHITECTURE.md §3`); Resend integration for RFQ/Contact/Careers email notifications; Cloudinary or S3 for RFQ attachment/resume upload storage, with the security controls planned in `docs/TECHNICAL_ARCHITECTURE.md §7` (file-type validation by content, size limits, safe storage path) actually implemented at this point, not deferred further; rate limiting/spam prevention on all public submission endpoints.
**Dependencies**: Phase 3/4 RFQ and Careers UI already built; environment variable plan (`docs/DECISIONS.md A9`) executed for real credentials in `.env.local`.
**Testing**: Playwright E2E introduced/expanded here (full RFQ submit-to-confirmation flow, file upload path); integration tests for `lib/` business logic against a test database.
**Completion criteria**: RFQ/Contact/Careers submissions persist reliably, trigger email notification, handle attachments securely; no untrusted input reaches the database unvalidated (`docs/TECHNICAL_ARCHITECTURE.md §7`).

## Phase 6 — Admin, Authentication, Content Management, RBAC

**Scope**: Auth.js introduced for admin authentication only (no customer-facing accounts, per `docs/TECHNICAL_ARCHITECTURE.md §12` non-goals); admin CRUD for Products, Categories, Brands, Solutions, Clients (including the approval/`displayPermission` workflow becoming an actual editable field, not just a data-model concept), Certifications, Registrations, Projects, Resources, Media, Jobs, Applications, RFQs, Enquiries, SEO metadata, Site settings; roles per `docs/TECHNICAL_ARCHITECTURE.md §11` (Super Admin, Administrator, Content Editor, Sales, HR).
**Dependencies**: Phase 5 data layer complete.
**Testing**: auth flow E2E coverage, RBAC boundary tests (a Content Editor cannot access Sales-only RFQ data, etc.), security review pass before this phase is considered done given it introduces the site's first privileged surface.
**Completion criteria**: content editors can manage the approval-gated content model (clients, certifications, brands) through the UI instead of code changes; audit logging present for privileged actions per `docs/TECHNICAL_ARCHITECTURE.md §7`.

## Phase 7 — Search, RFQ Workflow, Integrations, AI Assistant (if still justified)

**Scope**: server-backed search (replacing the Phase 4 client-side search) if catalogue scale warrants it; RFQ workflow improvements (status tracking, admin-side response management) if the business process needs it; any further integrations (e.g., GeM-adjacent tooling) evaluated on real need; an AI assistant/chatbot **only if a genuine use case still justifies it at this point** — not built by default just because it appeared in an earlier master spec (`docs/DECISIONS.md A17` scope discipline applies directly here).
**Dependencies**: Phase 5/6 complete; a specific, articulated business justification for each item in this phase before work starts.
**Completion criteria**: defined per whichever specific scope is approved when this phase begins — deliberately not over-specified now.

## Phase 8 — Testing, Accessibility, SEO, Performance, Security, Deployment

**Scope**: full WCAG 2.2 AA audit (automated + manual, including screen-reader pass) across every template; full Lighthouse/Core Web Vitals pass; complete `docs/SEO.md` implementation verification (metadata, schema, sitemap accuracy); security review (dependency audit, header configuration, RBAC re-verification, upload-handling re-verification); CI/CD (`docs/TECHNICAL_ARCHITECTURE.md §10`) fully wired as a merge gate; production deployment planning (hosting, domain, DNS, monitoring).
**Dependencies**: all prior phases substantially complete; this phase is the pre-launch gate, not an afterthought squeezed at the end.
**Completion criteria**: WCAG 2.2 AA conformance verified (not assumed), Core Web Vitals meet "Good" thresholds on real content, CI pipeline green and required for merge, no unresolved high/critical security findings, no unresolved `docs/DECISIONS.md §C` open verification items affecting content currently live on the site.

## Cross-phase rules (apply throughout)

- No phase publishes a claim, client, brand relationship, certification, or statistic without the verification status required by `docs/CONTENT_STRATEGY.md §3`.
- No phase introduces a dependency not required by that phase's actual scope (`docs/DECISIONS.md A17`).
- No commit/push/branch action without explicit instruction at the time (`docs/DECISIONS.md A10`), regardless of what a roadmap phase implies about readiness.
- Each phase's start should re-check `docs/DECISIONS.md §C` for newly resolved verification items before writing dependent copy.
