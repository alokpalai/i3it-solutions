# i3it Solutions — Technical Architecture

Status: Phase 1 planning document. No implementation, no packages installed, no config changed as part of producing this document. Respects all pre-Phase-1 architecture decisions (`docs/DECISIONS.md`).

## 1. Foundation (already locked, restated for reference)

- **Versions**: `package.json` is the source of truth — Next.js 16.2.12, React 19.2.4, TypeScript ^5, Tailwind CSS ^4, ESLint ^9. Consult `node_modules/next/dist/docs/` and `AGENTS.md` before implementing anything version-sensitive, since these versions post-date general training-data familiarity.
- **App Router**, Server Components by default, Client Components only where interactivity requires them.
- **Server Actions and Route Handlers** cover backend needs; no separate Express (or other) backend during initial development.
- **React Compiler enabled** (`next.config.ts` → `reactCompiler: true`) — write idiomatic components without manual `useMemo`/`useCallback` in the common case.
- **Tailwind CSS v4**, CSS-first config (`@theme inline`), semantic tokens per `docs/DESIGN_SYSTEM.md`.

## 2. Application boundaries

```
Route Handlers / Server Actions   (thin — orchestration + I/O only)
            │
            ▼
   lib/ business logic layer      (domain rules, validation, data access — server-only)
            │
            ▼
   Data sources (future: MongoDB via Mongoose; for Phase 1–3, static/content-layer data)
```

**Rule** (carried from pre-Phase-1 decision): Server Components, Server Actions, and Route Handlers all call into the shared `lib/` logic layer rather than duplicating logic inline or calling each other directly. This keeps the option open to extract an independent backend later without a rewrite — extraction becomes "move files," not "re-architect." The `lib/` layer is marked `server-only` (via the `server-only` package, introduced when the layer is first created) so it can never leak into client bundles.

## 3. Content/data architecture by phase

Given no CMS/database exists yet and the company profile explicitly requires a verification workflow (`docs/CONTENT_STRATEGY.md §3`), content should not go straight into MongoDB. Recommended progression:

1. **Phase 2–4 (no backend yet)**: structured local content — TypeScript data modules / JSON under `src/data/` (or `src/content/` if MDX is used for long-form pages like Solutions/About) — typed against the entity shapes defined in `docs/INFORMATION_ARCHITECTURE.md` (Product, Brand, Client, Certification, Project, etc.). This lets real pages be built and iterated on before a database exists, and the verification-status fields (`docs/CONTENT_STRATEGY.md §3`) live directly in this typed data from day one.
2. **Phase 5+**: MongoDB/Mongoose introduced once dynamic needs exist (RFQ submissions, enquiry storage, eventually admin-editable content). Static entities (Products, Brands, Solutions) can migrate to the database incrementally — they don't all need to move at once, and content that stays fully static (e.g., Solutions pages) may reasonably remain code-defined indefinitely if no CMS editing is required for it.

This progression avoids standing up a database before there's dynamic data that justifies it (`docs/DECISIONS.md` scope-discipline principle) while still giving the verification/approval model a real home from the start.

## 4. High-level data entities (planning only — no schema implementation)

`ProductCategory`, `Product`, `Brand`, `Solution`, `Client`, `ClientCategory`, `Certification`, `Registration`, `Project`, `Resource`, `MediaPost`, `Job`, `Application`, `RFQ`, `Enquiry`, `User`.

Key relationships:
- `Product` → `ProductCategory` (many-to-one, hierarchical: Category → Subcategory → Product)
- `Product` ↔ `Brand` (many-to-many)
- `Brand` → `ProductCategory[]` (mapping, per `docs/INFORMATION_ARCHITECTURE.md §4.4`)
- `Solution` ↔ `ProductCategory[]`, `Solution` ↔ `Brand[]` (cross-links per IA §9)
- `Client` → `ClientCategory` (many-to-one), `Client` ↔ `Project` (one-to-many)
- `Project` → `Client`, `Project` ↔ `Product[]`/`Brand[]`/`Service[]`
- `RFQ`/`Enquiry`/`Application` — inbound submission entities, not content entities; distinct lifecycle (see §7 security notes on untrusted input)
- `User` — future admin/auth only, not customer-facing accounts (no customer login planned; this is a procurement marketing site, not a portal, unless future requirements say otherwise)

Every content entity (`Product`, `Brand`, `Client`, `Certification`, `Project`) carries the `verificationStatus`/`displayPermission`-style fields defined per-entity in `docs/INFORMATION_ARCHITECTURE.md` and `docs/CONTENT_STRATEGY.md` — this is a first-class part of the schema, not bolted on later.

## 5. Rendering strategy by content type

| Content type | Strategy | Reasoning |
|---|---|---|
| Homepage | Static / ISR | Mostly stable content, high traffic — maximize CDN caching; ISR allows periodic refresh once featured clients/brands become data-driven |
| Products (category/subcategory/detail) | SSG initially, ISR once a data layer exists | Catalogue is broad but changes infrequently; SSG avoids per-request cost across a large page count |
| Brands | SSG/ISR | Same reasoning as Products |
| Solutions | SSG/ISR | Long-form, editorially stable content |
| Government pages | SSG/ISR | Stable, high-trust content — benefits from being fast and reliably cached |
| Clients | SSG/ISR | Changes only when new approvals happen — infrequent |
| Certifications | SSG/ISR | Changes only on renewal/new certification |
| Projects | SSG/ISR (once real data exists) | Same pattern as Clients |
| Search | Dynamic (Route Handler or Server Action-backed) | Query-dependent, cannot be pre-rendered |
| RFQ submission | Server Action (form) + Route Handler fallback if a non-JS/API path is ever needed | Server Actions are the natural fit for a form-first flow in App Router |
| Admin (future) | Authenticated, fully dynamic | No caching of authenticated/privileged views |

## 6. Folder architecture (recommended eventual structure)

```
src/
├── app/
│   ├── (marketing)/            -- public site route group
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── solutions/
│   │   ├── products/
│   │   ├── brands/
│   │   ├── government/
│   │   ├── projects/
│   │   ├── resources/
│   │   ├── contact/
│   │   ├── request-quote/
│   │   └── layout.tsx
│   ├── (admin)/                 -- future, authenticated
│   ├── api/                     -- Route Handlers (webhooks, non-form integrations)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                      -- shadcn/ui primitives, once introduced
│   ├── layout/                  -- Header, Footer, Nav, MegaMenu
│   ├── sections/                -- Hero, CapabilityGrid, TrustStrip, CTASection, etc.
│   └── forms/                   -- RFQForm, ContactForm (React Hook Form + Zod)
├── features/                    -- domain-oriented composition, one dir per feature
│   ├── products/
│   ├── brands/
│   ├── solutions/
│   ├── clients/
│   ├── certifications/
│   ├── projects/
│   ├── rfq/
│   └── search/
├── lib/
│   ├── db/                      -- Mongoose connection + models (introduced in Phase 5+, server-only)
│   ├── validations/              -- Zod schemas
│   ├── email/                    -- Resend integration (Phase 5+)
│   ├── storage/                  -- Cloudinary/S3 (Phase 5+)
│   ├── auth/                     -- Auth.js config (Phase 6, server-only)
│   └── utils/
├── data/                          -- typed static content modules (Phase 2-4, pre-database)
├── types/                         -- shared TS types/interfaces (entity shapes from IA doc)
├── config/                        -- site metadata, nav structure, constants
├── hooks/                         -- client-side hooks
└── styles/                        -- only if globals.css alone becomes insufficient
```

This is consistent with the structure already recommended pre-Phase-1; `features/` is added here specifically to hold the domain composition layer (feature-aware components that combine `data`/`lib` with `components/ui`) so `app/` stays thin routing/composition and `components/` stays presentational.

## 7. Security planning

Applies from the first form (RFQ/Contact) onward; nothing here is implemented in Phase 1.

- **All form input and external data treated as untrusted.** Server-side validation (Zod) is mandatory even though client-side validation (React Hook Form) also runs — client validation is a UX convenience, never the security boundary.
- **RFQ/Contact/Careers forms**: sanitize and validate every field server-side; reject unexpected fields; enforce max lengths (especially free-text requirement descriptions).
- **File uploads (RFQ attachments, resumes)**: validate file type by content (not just extension/MIME header, which can be spoofed), enforce size limits, store outside of any publicly executable path, scan-before-serve consideration flagged for when storage is implemented (Phase 5+) — this is a planning flag, not an implementation in Phase 1.
- **Rate limiting / spam prevention**: planned for RFQ/Contact/Careers submission endpoints once they're implemented (Phase 5+) — e.g., a lightweight rate limiter plus a non-intrusive bot-detection mechanism; exact mechanism chosen when the feature is actually built, not pre-selected now (scope discipline).
- **Authentication/authorization/RBAC**: deferred entirely to Phase 6 when admin is introduced — not designed prematurely, per pre-Phase-1 decision. When it lands, Auth.js config stays in `lib/auth/`, server-only.
- **Environment variables**: `.env.local` for local secrets, `.env.example` with variable names only, secrets never committed — already locked pre-Phase-1.
- **Security headers** (CSP, `X-Content-Type-Options`, `Referrer-Policy`, etc.): planned for configuration in `next.config.ts` when the site has real third-party integrations to scope a CSP against — configuring a CSP against a not-yet-built site produces a policy that has to be redone anyway.
- **CSRF**: Server Actions have built-in origin-checking protection in the installed Next.js version; Route Handlers used for any state-changing POST must apply equivalent protection — verify current mechanism against installed-version docs at implementation time (per §1 versioning note) rather than assuming an older Next.js CSRF pattern.
- **XSS prevention**: React's default escaping covers most cases; any `dangerouslySetInnerHTML` usage (e.g., rendering rich-text Solutions/About content) requires a sanitization step — flagged for whenever rich-text content editing is introduced, not needed for Phase 1's static/typed content.
- **Audit logging**: deferred to admin/Phase 6, when there are privileged actions worth auditing.

## 8. Performance planning

- Server Components by default minimizes client JS shipped — most of the catalogue/marketing content needs zero client-side JavaScript.
- `next/image` for all imagery (already the pattern used in the current placeholder homepage) — automatic optimization, explicit width/height to avoid layout shift.
- `next/font` for the eventual IBM Plex Sans typeface (per `docs/DESIGN_SYSTEM.md §3`), self-hosted via `next/font/google` or local files to avoid a render-blocking external font request.
- Caching: leverage the rendering strategy in §5 (SSG/ISR) rather than fighting it with unnecessary `dynamic = 'force-dynamic'` on pages that don't need it.
- Lazy-load below-the-fold, non-critical sections (e.g., a Brands carousel) via dynamic imports where they include client-side interactivity.
- Bundle discipline: no heavy component libraries pulled in wholesale — shadcn/ui's copy-in-component model (rather than a monolithic import) fits this well when introduced.
- Third-party scripts (analytics, if/when added) loaded via `next/script` with appropriate strategy (`afterInteractive`/`lazyOnload`), never blocking initial render.
- Explicitly avoid chasing Lighthouse-100 at the cost of functionality (e.g., stripping needed accessibility affordances or RFQ functionality to shave milliseconds) — Core Web Vitals are a real constraint, not a competition.

## 9. Testing strategy (recommendation — not installed in Phase 1)

| Layer | Recommended tooling | Rationale |
|---|---|---|
| Unit / component | **Vitest** + **React Testing Library** | Fast, ESM-native, fits Next.js App Router + Server/Client Component split better than Jest's CJS-oriented defaults at this Next.js version; verify current official Next.js testing guidance in `node_modules/next/dist/docs/` at install time given the version gap noted in §1 |
| Accessibility | **axe-core** integrated into component/E2E tests (`@axe-core/playwright` or `vitest-axe`) | Automated WCAG 2.2 AA regression coverage on key templates (forms, nav, cards) |
| Integration | Vitest + Testing Library, testing `lib/` business logic and Server Actions directly | Keeps domain-logic tests fast and independent of a running server |
| End-to-end | **Playwright** | Covers full RFQ flow, navigation, search overlay, mega menu keyboard interaction — the flows most likely to break silently |

**When to introduce**: per pre-Phase-1 decision, testing infrastructure lands **before critical dynamic functionality** is implemented — practically, that means Vitest/RTL should be installed at the start of Phase 3 (when the RFQ form and other interactive components begin), and Playwright once RFQ/search are functionally complete enough to have real flows to test end-to-end (Phase 5+ boundary). Nothing is installed as part of Phase 1.

## 10. CI/CD planning (not configured in Phase 1)

Planned GitHub Actions workflow, to be added when explicitly approved:

```
on: pull_request → develop, push → main
jobs:
  - lint (eslint)
  - typecheck (tsc --noEmit)
  - test (vitest, once introduced)
  - build (next build)
```

Git flow: feature branches from `develop` → PR into `develop` → tested/stable work promoted from `develop` into `main` for release. Matches the already-locked `main`/`develop` model (`docs/DECISIONS.md`).

## 11. Admin planning (Phase 6+, planning only)

Future admin manages: Products, Categories, Brands, Solutions, Clients, Certifications, Registrations, Projects, Resources, Media, Jobs, Applications, RFQs, Enquiries, SEO metadata, Site settings.

Potential roles: Super Admin, Administrator, Content Editor, Sales, HR — scoped via RBAC once Auth.js is introduced. Not designed in further detail in Phase 1 — premature to specify permission granularity before the content entities it manages are even implemented.

## 12. Explicit non-goals for the current architecture

- No e-commerce (cart/checkout/pricing display) — confirmed across `docs/INFORMATION_ARCHITECTURE.md`, `docs/CONTENT_STRATEGY.md`, `docs/UX.md`.
- No customer-facing login/portal planned at this stage — only future admin auth.
- No Express or separate backend service.
- No database, auth, file storage, or email integration installed/configured as part of Phase 1.
