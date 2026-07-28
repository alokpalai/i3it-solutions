# i3it Solutions — Legacy Site Content Review

Status: Reference material only. Not a Phase 1 deliverable, not itself a source of truth — every item below is still subject to `docs/CONTENT_STRATEGY.md §3` verification status before it can be published anywhere. Logged 2026-07-28.

## 1. What this is

The project owner supplied the content and images from i3it Solutions' previous website (previously hosted on Hostinger) for review. It was evaluated against the locked content-governance rules in `docs/DECISIONS.md` before any of it was used. Most of it did not pass and is intentionally **not** reflected in the current site (see §3). This document exists so the material that *did* pass isn't lost, and so nothing rejected here gets reintroduced by mistake in a later phase.

## 2. Usable raw material (compliant, candidate content for future phases)

None of this belongs on the homepage (already complete at the correct level of abstraction — see `src/config/homepage.ts`). It's staged here for **Phase 3/4** (Solutions, Products, Company, Support pages) once those phases begin.

**GeM positioning** (aligns with `docs/DECISIONS.md B4` — already reflected on the homepage, corroborates the existing copy):
- i3it Solutions is a registered seller on the Government e-Marketplace (GeM) portal.
- The GeM portal lets government buyers purchase directly from registered sellers — i3it's registration means agencies can procure through it. This must never be phrased as government affiliation or endorsement, only seller registration.

**Service line items** (candidate detail for future Solutions/Support pages — more granular than the homepage's 4 capability pillars, so it belongs one level down, not on the homepage):
- IT infrastructure services: business intelligence/reporting solutions, IT asset management & monitoring, storage/backup solutions (application, file/server, desktop/laptop), server & application virtualization, security solutions (DLP, identity & access management, application security, infrastructure security), infrastructure maintenance & support.
- IT support services: Windows Server & macOS Server support, Microsoft/VMware hypervisor support, Active Directory support, business email support (Microsoft-based and other providers), backup service support, networking equipment support.
- Structured cabling & network infrastructure (patch panels, switches, trunk cabling, fiber/twisted-pair/coaxial) — generic service-category description, not i3it-specific detail; would need i3it-specific rewriting, not reuse of the original generic copy.
- Data recovery services (hard disk/drive recovery, external drive recovery, Outlook PST recovery, deleted file recovery) — same caveat as above.

**OEM ↔ product-category associations** (candidate detail for a future Products/Brands page — every brand here still needs the same `relationshipType: TBD` verification gate per `docs/DECISIONS.md B5` before any "Partner"/"Authorized" language could ever be used; only neutral naming, same as the homepage's existing Technology Ecosystem section):
- CCTV/surveillance: Hikvision, Sparsh
- UPS/power: Microtek, BPE, Cyberpower
- Tablets: Wishtel
- Networking: Digisol (switches, access points)
- Printers/imaging: Brother, Epson, Canon, CWC
- Security software: Fortinet, Bitdefender, Quick Heal/Seqrite, TrendMicro, E-scan

Note: several of these brand names (Hikvision, Fortinet, TrendMicro, E-scan, CWC, Dell, Lenovo, Apple, Cisco, SAP, Zoho, Acronis, Sophos, AWS, Google Cloud, Azure, Avaya, D-Link, ZKTeco, TeamViewer, Netmagic/NTT) are **not** in the `docs/INFORMATION_ARCHITECTURE.md §4.1` approved brand list used to build the current homepage's Technology Ecosystem section. They should not be added to that list on the strength of this legacy content alone — that list should only grow following the same owner-verification process used for the original set.

## 3. Explicitly excluded (do not reintroduce)

- **Superlative/unverifiable claims**: "leading provider," "trusted partner," "go-to provider," "reliable and trusted partner." Violates `docs/DECISIONS.md A13`.
- **Company-age claim**: "already completed 10 years into the IT industry." This is the exact contradiction already logged as an open verification item in `docs/DECISIONS.md B3` — only "Established 2021" is publishable.
- **Fabricated statistics**: "10 Years of email migration experience," "Three million total mailboxes migrated." No supporting basis; violates `A13`.
- **OEM partner/authorization claims and badges**: "Microsoft Business Partner in India," Sophos/Acronis/Zoho "Authorized Partner," SAP PartnerEdge, AWS Advanced Consulting Partner, Dell PartnerDirect. Violates `docs/DECISIONS.md B5` — no brand relationship may be labeled Partner/Authorized/Certified without a verifying document, and none exists for any of these.
- **Listed pricing**: per-mailbox email migration pricing (₹550–800), Microsoft 365 per-user/month pricing tables. Violates `docs/DECISIONS.md B14` — the site is RFQ-only, no published pricing.
- **Imagery**: none of the supplied images were used. Several are stock photography of unrelated/generic offices and people (including one boardroom photo showing a different company's own office signage — not i3it's office), which would misrepresent the company if published. The rest are third-party product photography and vendor/partner logos, which either duplicate the concerns above (unverified partner badges) or aren't i3it-specific assets. The site continues using the abstract/SVG visual system from `docs/DESIGN_SYSTEM.md` instead.

## 4. Missing: company logo

No i3it Solutions logo file was included in the supplied material — only third-party brand logos, partner badges, and generic stock imagery. The header currently renders the site name as a text wordmark (`src/components/layout/Header.tsx`). If a real logo file is provided later, swapping it in is a small, contained change.
