# i3it Solutions — Information Architecture

Status: Phase 1 draft. Companion to `docs/PROJECT.md` (business context) and `docs/UX.md` (journeys). See `docs/CONTENT_STRATEGY.md` for the verification status of any entity named below.

## 1. Sitemap & primary navigation

Design goal: keep top-level nav short; push depth into mega menus and category pages rather than flattening everything to level 1.

```
Home

Company
  About i3it
  Vision & Mission
  Why i3it
  Certifications & Registrations
  Careers

Solutions
  Government Procurement
  IT Infrastructure
  System Integration
  Surveillance & Security
  Biometric & Access Control
  Collaboration & Video Conferencing
  Power & Business Continuity
  Software Licensing
  Support & Technical Services

Products
  Computing & End-User Devices
  Server, Storage & Data Infrastructure
  Networking & Connectivity
  Printing, Scanning & Imaging
  Surveillance, Security & Biometrics
  Collaboration, Display & Audio
  Power & Business Continuity
  Software & Licensing
  Accessories & Components
  Facility & Specialized Solutions
  Brands (directory)

Government
  Government Solutions Overview
  GeM Procurement
  Sectors Served
  Clients / Organizations Worked With

Projects / Case Studies   [TBD — populated only once real project data exists; see §7]

Resources
  Company Profile
  Certificates
  Brochures
  Case Studies
  Downloads

Media   [conservative scope — see docs/UX.md §Media]

Contact

Header utility: Search · Request Quote
```

### 1.1 Evaluation notes

- **Solutions vs. Products duplication risk**: Solutions is organized around *buyer problems* (e.g., "Surveillance & Security" as a solution area), Products is organized around *catalogue taxonomy* (e.g., "Surveillance, Security & Biometrics" as a product category). They intentionally overlap in subject matter but differ in purpose — Solutions pages sell an outcome and link into relevant Products/Brands; Product pages are catalogue/discovery. This mirrors how B2G/B2B buyers actually search (some arrive knowing the *problem*, some knowing the *product*).
- **Government as a top-level item**: kept separate from Solutions/Products despite overlap, because government procurement is the primary differentiator per `docs/PROJECT.md §8` and deserves a dedicated, trust-building path rather than being buried under Solutions.
- **Projects/Case Studies**: kept as a top-level placeholder in the sitemap for future information architecture stability, but the nav item should only go live once at least one real, approved project exists (`docs/CONTENT_STRATEGY.md §Placeholder Rules`). Do not ship an empty "Projects" page.
- **8 top-level items** (Home, Company, Solutions, Products, Government, Projects, Resources, Media, Contact = 9 including Home) is on the high side for a mega-menu system; recommend collapsing **Media** into **Resources** as a tab/filter unless a content plan proves it needs independent top-level weight (see `docs/UX.md §Media`). Until real media content exists, ship without a separate Media nav item.

**Approved top-level nav for initial launch (revised, 7 items — `docs/DECISIONS.md B16`, owner-approved 2026-07-26):**

```
Home · Solutions · Products · Government · Resources · Company · Contact
```

with **Request Quote** as a persistent header CTA (not a nav item) and **Projects/Case Studies** promoted back into top-level nav once real project content exists.

## 2. Mega menu structure

- **Solutions** and **Products** mega menus: multi-column, grouped by category, each column header linking to its landing page, each item beneath linking to the specific sub-page. Include one "featured" tile per mega menu (e.g., "Government Procurement" featured in Solutions; "Brands Directory" featured in Products) to aid orientation.
- **Government** mega menu (or simple dropdown, given only 4 children): Government Solutions Overview, GeM Procurement, Sectors Served, Clients/Organizations.
- **Company** dropdown: simple list, no mega menu needed (5 items).
- Mobile: mega menus collapse into an accordion drawer; see `docs/DESIGN_SYSTEM.md §Navigation`.

## 3. Product taxonomy

Derived strictly from profile-stated portfolio. Structure supports **Category → Subcategory → Product**, and is designed to grow (new subcategories can be added without restructuring top-level categories).

| Category | Subcategories (profile-stated) |
|---|---|
| **Computing & End-User Devices** | Laptops, Desktops, All-in-One PCs, Workstations, Mini PCs, Tablets, Monitors |
| **Server, Storage & Data Infrastructure** | Servers, Enterprise Storage, NAS Storage, SAN, SAN Switches, Tape Libraries, Tape Drives, Backup Storage, Portable Storage |
| **Networking & Connectivity** | Layer 2 Switches, Layer 3 Switches, Routers, Wireless Access Points, Wireless Controllers, Firewalls, CAT6 Cabling, Fiber Optic Cabling, Patch Panels, Patch Cords, Transceivers, Server Racks |
| **Printing, Scanning & Imaging** | Printers, Multifunction Printers, Dot Matrix Printers, Scanners, Barcode Scanners, Plotters, Toner, Ink, Consumables |
| **Surveillance, Security & Biometrics** | CCTV Cameras, Video Surveillance, Biometric Attendance, Face Recognition, RFID Attendance, Access Control, Aadhaar-enabled Biometric Devices |
| **Collaboration, Display & Audio** | Video Conferencing, Web Cameras, Interactive Panels, LED Displays, Large Format Displays, Video Walls, Projectors, Public Address Systems, Microphones, Amplifiers, Speakers |
| **Power & Business Continuity** | Online UPS, Line Interactive UPS, Power Backup, Voltage Stabilizers |
| **Software & Licensing** | Operating Systems, Productivity Software, Server Software, Design Software, Architecture/Engineering Software, PDF Tools, Antivirus, Security Software, Enterprise Licensing |
| **Accessories & Components** | Mouse, Keyboard, SSD, IT Accessories, Printer Consumables |
| **Facility & Specialized Solutions** | Air Conditioning, Office Furniture, Medical Furniture |

**Rule**: do not force unrelated products (e.g., furniture, air conditioning) into "IT" framing merely for consistency — they are presented under "Facility & Specialized Solutions," honestly labeled as adjacent/complementary offerings, not core IT products. No product, subcategory, or SKU beyond what's listed above may be added without being marked "Requires company verification" — and no specifications/SKUs are to be fabricated at any point (`docs/CONTENT_STRATEGY.md §Products`).

## 4. Brand architecture

### 4.1 Brand list (profile-stated)

HP, HPE, Acer, ASUS, Wishtel, Western Digital, Samsung, PeopleLink, Matrix, Ahuja, BPE, Eaton, CyberPower, Microtek, Jabra, Cynix, Lapcare, Prama, Sparsh, TVS, Realtime Smart Solutions, Panasonic, LG, Voltas, QNAP, Digisol, Bitdefender, Norton, Quick Heal, Nilkamal, Microsoft, Autodesk, Adobe, Nitro — plus, from the product overview: Canon, Epson, Uniline.

### 4.2 Relationship terminology rule

**No brand may be labeled "OEM Partner," "Authorized Partner," or "Certified Partner" unless a specific document verifies that exact relationship.** Default neutral framing for the brand directory and all brand pages: **"Brands We Work With"** / **"Technology Portfolio."**

### 4.3 Brand data model (planning only — not implemented in Phase 1)

```
Brand
  brandName
  logo
  categories[]          -- links to Product taxonomy
  products[]
  relationshipType       -- enum: Authorized Partner | Authorized Reseller | Seller |
                             Distributor Relationship | Technology Brand |
                             Product Portfolio Brand | TBD
  authorizationStatus    -- enum: Verified | Unverified | Requires Document
  certificate            -- optional file reference, PUBLIC AFTER VERIFICATION only
  verificationStatus     -- see docs/CONTENT_STRATEGY.md Claim Verification System
  featured                -- boolean, editorial control
```

Every brand starts with `relationshipType: TBD` and `authorizationStatus: Unverified` until the owner supplies documentation. No relationship type is to be inferred from the brand's product category alone.

### 4.4 Brand ↔ product category mapping (profile-stated examples, illustrative not exhaustive)

| Brand | Categories |
|---|---|
| HPE | Servers, Enterprise Storage, SAN, Networking |
| HP | Laptops, Desktops, Printers, Scanners, Plotters |
| Samsung | Displays, Interactive Panels, Monitors, Tablets |
| Matrix | Biometrics, Access Control, Surveillance, Telecom |
| Digisol | Switches, Routers, Cabling, Racks, Fiber infrastructure |
| Microsoft | Office, Windows, Server licensing |
| Autodesk | Engineering/design software |

This mapping is **planning data** to inform the Brand ↔ Category relationship model; it is not a claim of authorization status, and it is not exhaustive of every brand-category pairing that may exist.

### 4.5 Brand directory UX (`/brands`)

Alphabetical browsing + category filtering, brand detail pages, each detail page showing related products (by category mapping) and related solutions, with a "Request Quote" CTA. No partnership badges/logos implying certification without verified `authorizationStatus`.

## 5. Solutions taxonomy

Organized around buyer problems, not a re-listing of product categories (some overlap with Products is expected and fine — see §1.1):

1. Government IT Procurement
2. Enterprise Technology Procurement
3. IT Infrastructure
4. Network Infrastructure
5. System Integration
6. Surveillance & Security
7. Biometric & Access Control
8. Collaboration & Video Conferencing
9. Power & Business Continuity
10. Software Licensing
11. Digital Workplace
12. Deployment & Technical Support
13. Turnkey Technology Projects

**Overlap evaluation**: "Government IT Procurement" and "Enterprise Technology Procurement" are kept distinct because their buyer journeys, trust requirements, and CTAs differ materially (see `docs/UX.md`), even though the underlying product portfolio is shared. "Digital Workplace" is retained as a synthesis solution (combining Collaboration + Computing + Software) aimed at institutional buyers modernizing an office/campus, rather than a raw product category — this is a legitimate solutions-layer grouping, not an invented capability, since every component within it is profile-stated.

**Not included** (explicitly out of scope until verified): cloud consulting, managed SOC/cybersecurity consulting, data-center construction, AI consulting. None of these are profile-stated.

## 6. Client architecture

### 6.1 Grouping (as extracted from the company profile)

**Central Ministries & Departments**: Ministry of Defence, Ministry of Railways, Ministry of Home Affairs, Ministry of Electronics & Information Technology, Ministry of Education, Unique Identification Authority of India (UIDAI), Ministry of Finance, Election Commission of India.

**Defence & Security**: Indian Army, Assam Rifles, Central Reserve Police Force (CRPF), Border Security Force (BSF), Sashastra Seema Bal (SSB), Defence Research and Development Organisation (DRDO), National Disaster Response Force (NDRF).

**Public Sector Undertakings**: Bharat Heavy Electricals Limited (BHEL), Bharat Sanchar Nigam Limited (BSNL), Indian Oil Corporation Limited (IOCL), NTPC Limited, Oil and Natural Gas Corporation Limited (ONGC), Solar Energy Corporation of India Limited (SECI), Indian Renewable Energy Development Agency Limited (IREDA).

**Education & Research**: IITs (category), NITs (category), Kendriya Vidyalayas (category), National Institute of Electronics & Information Technology (NIELIT), Indian Council of Medical Research (ICMR), Council of Scientific & Industrial Research (CSIR), University of Delhi.

**State Departments & Local Bodies**: Delhi Police, Municipal Corporations (category), Health & Family Welfare Departments (category), Rural Development & Panchayati Raj (category), Department of Information Technology (category).

### 6.2 Category vs. specific-entity distinction (critical)

Several profile entries are **categories**, not named organizations — e.g., "IITs," "NITs," "Kendriya Vidyalayas," "Municipal Corporations," "Health & Family Welfare Departments," "Rural Development & Panchayati Raj," "Department of Information Technology." **Do not invent specific institution names** (e.g., a specific IIT campus) to fill these out. Where the relationship is genuinely with the category/type of institution rather than one named entity, the website must present it as such (e.g., "Educational institutions including IITs and NITs" rather than implying a specific named contract with a specific IIT).

### 6.3 Publication logic — every client entry needs a status, not just a list position

Before any client name or logo appears publicly, it must be classified:

| Status | Meaning |
|---|---|
| Approved for public website | Owner has explicitly cleared this name/logo for publication |
| Needs documentary verification | Claimed relationship not yet backed by a document/PO/contract reference |
| Needs relationship clarification | Unclear whether this is a direct client, a project sub-component, a category, or indirect |
| Generic organization group | Category-level entry (see §6.2) — never expanded into invented specific names |

**No client, in any category, is published on the live site until it carries "Approved for public website" status.** Until then, the client list above exists only in this planning document, not on any page.

### 6.4 Client data model (planning only)

```
Client
  name
  slug
  category            -- Central Ministries & Departments | Defence & Security |
                          Public Sector Undertakings | Education & Research |
                          State Departments & Local Bodies | Enterprise
  logo
  relationshipType     -- e.g., direct client, GeM order, sub-integrator, category-level
  summary
  projects[]           -- links to Project entity, see docs/PROJECT.md / §7 below
  products[]
  services[]
  verificationStatus    -- see docs/CONTENT_STRATEGY.md
  featured
  displayPermission     -- Approved | Needs Verification | Needs Clarification | Do Not Display
```

This model is not implemented in Phase 1. It exists to inform later CMS/data-layer planning (`docs/TECHNICAL_ARCHITECTURE.md §Data Planning`).

### 6.5 Client display UX

No "wall of logos." Instead: a small set of **featured organizations** (only those with `displayPermission: Approved` and ideally `featured: true`) placed contextually on the homepage/Government pages, plus a full **category-based client explorer** at `/government/clients` (or `/clients`) organized by the six categories above, plus links to related case studies where they exist. See `docs/UX.md §Government Procurement Journey`.

## 7. Project / case study architecture

The profile provides client relationships but **no specific project narratives**. No project case study may be invented to fill this gap.

Planning model only:

```
Project
  title
  client            -- links to Client entity
  sector
  location
  year
  challenge
  requirement
  solution
  products[]
  brands[]
  services[]
  deployment
  outcome
  gallery
  documents
  publicVisibility   -- Public | Internal Only
```

Every field is marked **TBD — requires actual project data** until real, owner-approved project information is supplied. The "Projects / Case Studies" nav item stays dormant (see §1.1) until at least one project record reaches `publicVisibility: Public`.

## 8. Certification & registration architecture

Full detail (including the sensitivity classification of each item) lives in `docs/CONTENT_STRATEGY.md §Certifications` and `docs/DECISIONS.md`. This document records only the IA implication: **Certifications & Registrations** gets its own page under Company (not buried in About), because it is a primary trust signal for government evaluators (`docs/PROJECT.md §21` equivalent — trust architecture).

## 9. Page relationship model (cross-linking rules)

- Every **Product category/subcategory page** links to: relevant Brand pages (via category mapping), relevant Solution page(s), and the RFQ CTA.
- Every **Brand page** links to: its mapped Product categories, relevant Solutions, and the RFQ CTA.
- Every **Solution page** links to: relevant Product categories, relevant Brands, Government page (if applicable), and RFQ CTA.
- **Government Solutions** links to: GeM Procurement, Sectors Served, Clients/Organizations, relevant Solutions, Certifications, RFQ.
- **Client entries** (once approved) link to: their category page and any associated Project (once real project data exists).
- All conversion paths terminate in **Request Quote** or **Contact Sales** — never "Add to Cart"/"Buy Now" (`docs/PROJECT.md`, e-commerce explicitly out of scope — see `docs/UX.md §Product Discovery`).

## 10. Footer structure

```
COMPANY            SOLUTIONS                 PRODUCTS                  RESOURCES              CONTACT                 LEGAL
About              Government Procurement    Computing                 Company Profile         Address                 Privacy
Vision & Mission    IT Infrastructure         Servers & Storage         Case Studies            Phone                   Terms
Certifications      System Integration        Networking                Certificates            Email                   Accessibility
Careers             Security                  Printing                  Downloads                                        Sitemap
                    Collaboration              Security
                    Power                      Power
                    Software                   Software
```

Kept to 6 columns max; Legal column (Privacy/Terms/Accessibility/Sitemap) is currently placeholder-only — none of these policy documents exist yet and must not be fabricated (see `docs/CONTENT_STRATEGY.md §Information Still Required`).
