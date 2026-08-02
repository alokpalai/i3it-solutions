// Solutions section content — Phase 3B. Grounded in docs/PROJECT.md §7 (four
// capability pillars) and docs/INFORMATION_ARCHITECTURE.md §5 (13-item
// Solutions taxonomy, which is authoritative — see the Phase 3B report for
// how this reconciles with the phase brief's own 10-item list). Every
// "capabilities"/"clientRequirements"/"benefits" line stays inside the
// profile-stated scope for that item's pillar — no service, statistic,
// client, or claim outside docs/CONTENT_STRATEGY.md §11.
//
// "Data Center & Server Infrastructure" (named in the Phase 3B brief) is not
// a separate approved taxonomy item — its content lives inside
// "IT Infrastructure" below (servers/storage are already part of Pillar B),
// cross-linked to /products/servers-storage. "Managed IT Services" (also
// named in the brief) maps to the existing "Deployment & Technical Support"
// item rather than a new one — the brief's own instruction is to defer to
// the approved navigation configuration when names differ.

export type SolutionDetail = {
  overview: string;
  capabilities: string[];
  technologyCategories: { label: string; href: string }[];
  clientRequirements: string[];
  benefits: string[];
};

export const solutionDetails: Record<string, SolutionDetail> = {
  "government-procurement": {
    overview:
      "GeM-based and institutional procurement for central and state government departments, public sector undertakings and public institutions — sourced transparently through the Government e-Marketplace (GeM).",
    capabilities: [
      "GeM-based procurement execution",
      "Multi-brand technology sourcing",
      "Bulk and institutional supply",
      "Tender and RFQ response support",
    ],
    technologyCategories: [
      { label: "Computing & End-User Devices", href: "/products/computing" },
      { label: "Server, Storage & Data Infrastructure", href: "/products/servers-storage" },
      { label: "Networking & Connectivity", href: "/products/networking" },
      { label: "Surveillance, Security & Biometrics", href: "/products/security-biometrics" },
    ],
    clientRequirements: [
      "Departments sourcing hardware or software through GeM",
      "Institutions requiring bulk technology procurement",
      "Buyers needing a single point of contact across multiple brands",
      "Organizations requiring GeM-compliant documentation and process",
    ],
    benefits: [
      "Transparent, GeM-based procurement process",
      "Access to a broad, multi-brand technology portfolio",
      "Single point of contact across categories",
      "Support continues through delivery and after",
    ],
  },
  "enterprise-technology-procurement": {
    overview:
      "Technology procurement for corporate and institutional buyers outside the government channel — hardware, software and services sourced against a defined requirement.",
    capabilities: [
      "Requirement-based technology sourcing",
      "Multi-brand hardware and software supply",
      "Bulk and volume procurement",
      "Vendor consolidation across categories",
    ],
    technologyCategories: [
      { label: "Computing & End-User Devices", href: "/products/computing" },
      { label: "Server, Storage & Data Infrastructure", href: "/products/servers-storage" },
      { label: "Networking & Connectivity", href: "/products/networking" },
      { label: "Software & Licensing", href: "/products/software" },
    ],
    clientRequirements: [
      "Enterprises consolidating technology purchasing across multiple brands",
      "Organizations scaling infrastructure against a defined budget and timeline",
      "Buyers needing hardware and licensing sourced together",
    ],
    benefits: [
      "One vendor across hardware, software and services",
      "Sourcing matched to the requirement, not a fixed catalogue",
      "Support carried through after purchase",
    ],
  },
  "it-infrastructure": {
    overview:
      "Computing, server, storage and networking infrastructure — sourced, deployed and integrated as a working environment, including the data center and server infrastructure it depends on, not supplied as disconnected components.",
    capabilities: [
      "Computing and end-user device infrastructure",
      "Server, storage and data infrastructure",
      "Networking and connectivity",
      "Installation and deployment",
    ],
    technologyCategories: [
      { label: "Computing & End-User Devices", href: "/products/computing" },
      { label: "Server, Storage & Data Infrastructure", href: "/products/servers-storage" },
      { label: "Networking & Connectivity", href: "/products/networking" },
    ],
    clientRequirements: [
      "Organizations building or refreshing core IT infrastructure",
      "Institutions consolidating server and storage environments",
      "Buyers needing infrastructure deployed and integrated, not just delivered",
    ],
    benefits: [
      "Infrastructure sourced and deployed as one engagement",
      "Multi-brand hardware matched to the requirement",
      "Integration handled alongside supply",
    ],
  },
  "network-infrastructure": {
    overview:
      "Switching, routing, wireless networking and structured cabling — designed and deployed to support the rest of an organization's technology environment.",
    capabilities: [
      "Structured cabling and network design",
      "Switching and routing",
      "Wireless networking",
      "Network deployment and integration",
    ],
    technologyCategories: [{ label: "Networking & Connectivity", href: "/products/networking" }],
    clientRequirements: [
      "Organizations setting up or expanding office or campus networks",
      "Institutions needing wired and wireless connectivity deployed together",
      "Buyers needing networking integrated with existing infrastructure",
    ],
    benefits: [
      "Networking designed alongside the infrastructure it supports",
      "Multi-brand networking hardware",
      "Deployment and integration handled end-to-end",
    ],
  },
  "system-integration": {
    overview:
      "Bringing hardware, software and network components from multiple brands together into a single working system.",
    capabilities: [
      "Cross-brand hardware and software integration",
      "Network and systems integration",
      "Installation and configuration",
      "Post-integration support",
    ],
    technologyCategories: [
      { label: "Computing & End-User Devices", href: "/products/computing" },
      { label: "Server, Storage & Data Infrastructure", href: "/products/servers-storage" },
      { label: "Networking & Connectivity", href: "/products/networking" },
    ],
    clientRequirements: [
      "Organizations combining hardware and software from multiple vendors",
      "Institutions integrating new systems with existing infrastructure",
      "Buyers who want one team accountable for integration, not separate vendors",
    ],
    benefits: [
      "One team accountable for the integrated outcome",
      "Multi-brand integration experience",
      "Support continues after go-live",
    ],
  },
  "surveillance-security": {
    overview:
      "CCTV, video surveillance and physical security technology, sourced and deployed for institutional and government facilities.",
    capabilities: [
      "CCTV and video surveillance systems",
      "Physical security technology",
      "Installation and configuration",
      "Integration with existing facility infrastructure",
    ],
    technologyCategories: [
      { label: "Surveillance, Security & Biometrics", href: "/products/security-biometrics" },
    ],
    clientRequirements: [
      "Facilities requiring surveillance coverage",
      "Institutions upgrading physical security infrastructure",
      "Buyers needing surveillance integrated with access control",
    ],
    benefits: [
      "Surveillance technology matched to the facility",
      "Deployment and configuration handled as one engagement",
      "Related access control technology sourced from the same portfolio",
    ],
  },
  "biometric-access-control": {
    overview:
      "Biometric attendance and physical access control systems for institutional and enterprise facilities.",
    capabilities: [
      "Biometric attendance systems",
      "Physical access control",
      "Installation and integration with facility infrastructure",
      "Integration with surveillance systems",
    ],
    technologyCategories: [
      { label: "Surveillance, Security & Biometrics", href: "/products/security-biometrics" },
    ],
    clientRequirements: [
      "Institutions needing attendance or access tracking",
      "Facilities controlling physical access to sensitive areas",
      "Buyers integrating access control with existing surveillance infrastructure",
    ],
    benefits: [
      "Access control integrated with related surveillance technology",
      "Deployment handled alongside supply",
      "Sourced from a multi-brand security portfolio",
    ],
  },
  "collaboration-video-conferencing": {
    overview:
      "Video conferencing, displays and collaboration technology for meeting rooms and hybrid workplaces.",
    capabilities: [
      "Video conferencing systems",
      "Interactive displays and large-format screens",
      "Meeting room technology",
      "Installation and configuration",
    ],
    technologyCategories: [
      { label: "Collaboration, Display & Audio", href: "/products/collaboration-display" },
    ],
    clientRequirements: [
      "Organizations equipping meeting rooms for hybrid work",
      "Institutions upgrading conferencing and display technology",
      "Buyers standardizing collaboration technology across locations",
    ],
    benefits: [
      "Collaboration technology matched to room and use case",
      "Deployment handled alongside supply",
      "Works alongside the wider IT infrastructure we deploy",
    ],
  },
  "power-business-continuity": {
    overview:
      "Online and line-interactive UPS, power backup and voltage stabilization to keep critical systems running.",
    capabilities: [
      "Online and line-interactive UPS systems",
      "Power backup for critical infrastructure",
      "Voltage stabilization",
      "Installation and integration with existing power infrastructure",
    ],
    technologyCategories: [{ label: "Power & Business Continuity", href: "/products/power" }],
    clientRequirements: [
      "Facilities protecting servers and critical systems from power interruption",
      "Institutions needing backup power across multiple sites",
      "Buyers sizing power backup to their infrastructure",
    ],
    benefits: [
      "Power backup sized to the infrastructure it protects",
      "Sourced from a multi-brand power portfolio",
      "Installed alongside the systems it supports",
    ],
  },
  "software-licensing": {
    overview:
      "Operating system, productivity, security and enterprise software licensing, sourced alongside the hardware it runs on.",
    capabilities: [
      "Operating system and productivity software licensing",
      "Security software licensing",
      "Enterprise software licensing",
      "License sourcing alongside hardware procurement",
    ],
    technologyCategories: [{ label: "Software & Licensing", href: "/products/software" }],
    clientRequirements: [
      "Organizations licensing software alongside new hardware",
      "Institutions consolidating software licensing across departments",
      "Buyers needing licensing sourced as part of a broader procurement",
    ],
    benefits: [
      "Software and hardware sourced together",
      "Licensing matched to the infrastructure it runs on",
      "Support continues after purchase",
    ],
  },
  "digital-workplace": {
    overview:
      "A synthesis of computing, collaboration and software technology for institutions modernizing an office or campus environment as a single initiative.",
    capabilities: [
      "Computing and end-user devices",
      "Collaboration and display technology",
      "Software licensing",
      "Deployment across an office or campus environment",
    ],
    technologyCategories: [
      { label: "Computing & End-User Devices", href: "/products/computing" },
      { label: "Collaboration, Display & Audio", href: "/products/collaboration-display" },
      { label: "Software & Licensing", href: "/products/software" },
    ],
    clientRequirements: [
      "Institutions modernizing office or campus technology as one initiative",
      "Organizations standardizing devices, collaboration tools and software together",
      "Buyers wanting one engagement rather than separate purchases",
    ],
    benefits: [
      "Computing, collaboration and software sourced and deployed together",
      "One team accountable for the combined environment",
      "Support continues after deployment",
    ],
  },
  "deployment-support": {
    overview:
      "Technical consulting, implementation and after-sales support across the technology we supply and integrate.",
    capabilities: [
      "Technical consulting and requirement scoping",
      "Implementation and deployment support",
      "After-sales technical support",
      "Maintenance support, scoped per engagement",
    ],
    technologyCategories: [],
    clientRequirements: [
      "Organizations needing technical support after deployment",
      "Institutions without in-house capacity for implementation",
      "Buyers wanting a single point of contact for ongoing support",
    ],
    benefits: [
      "Support continues after the point of sale",
      "Technical consulting available before and during implementation",
      "One point of contact across supply, deployment and support",
    ],
  },
  "turnkey-projects": {
    overview:
      "End-to-end delivery of infrastructure and integration projects — from requirement through sourcing, integration, deployment and support — as a single engagement.",
    capabilities: [
      "Requirement scoping and technology sourcing",
      "Multi-category infrastructure integration",
      "Installation and deployment",
      "Post-deployment support",
    ],
    technologyCategories: [
      { label: "Computing & End-User Devices", href: "/products/computing" },
      { label: "Server, Storage & Data Infrastructure", href: "/products/servers-storage" },
      { label: "Networking & Connectivity", href: "/products/networking" },
      { label: "Power & Business Continuity", href: "/products/power" },
    ],
    clientRequirements: [
      "Institutions running a defined infrastructure project end-to-end",
      "Organizations wanting one accountable vendor across sourcing, integration and deployment",
      "Buyers consolidating multiple technology categories into a single project",
    ],
    benefits: [
      "One accountable team from requirement through deployment",
      "Multi-category sourcing and integration handled together",
      "Support continues after project completion",
    ],
  },
};

// docs/PROJECT.md §3 — the approved positioning framework, reused as the
// implementation workflow on every solution detail page and as the
// "delivery methodology" on the Solutions landing page. One definition, not
// re-worded per page, so it can't drift.
export const deliveryMethodology = [
  {
    title: "Understand",
    description: "We start by understanding the requirement — scope, environment and constraints.",
  },
  {
    title: "Source",
    description: "The right technology is sourced across our multi-brand portfolio, matched to the requirement.",
  },
  {
    title: "Integrate",
    description: "Hardware, software and network components are brought together into a working system.",
  },
  {
    title: "Deploy",
    description: "Solutions are installed, configured and deployed on-site as required.",
  },
  {
    title: "Support",
    description: "Technical support continues after deployment, not only at the point of sale.",
  },
];

// Procurement/RFQ-specific flow (docs/UX.md §5) — distinct from the delivery
// methodology above: this describes how a requirement becomes an order, not
// how a project is executed once won.
export const sourcingWorkflow = [
  {
    title: "Share your requirement",
    description: "Tell us what you're trying to solve, starting with a single request for quote.",
  },
  {
    title: "Technology sourced",
    description: "We identify and source the right hardware, software or services across our portfolio.",
  },
  {
    title: "Quotation",
    description: "You receive a quotation matched to your requirement.",
  },
  {
    title: "Order & delivery",
    description: "Once confirmed, your order is processed and delivered.",
  },
  {
    title: "Deployment & support",
    description: "Where applicable, we deploy, integrate and continue support after delivery.",
  },
];

// docs/PROJECT.md §9 — target-audience *categories*, not named clients
// (docs/CONTENT_STRATEGY.md §5.2: category-level entries only).
export const industriesServed = [
  "Central Government departments",
  "State Government departments",
  "Public Sector Undertakings (PSUs)",
  "Defence & security organizations",
  "Educational institutions",
  "Research institutions",
  "Healthcare & public institutions",
  "Enterprise & corporate organizations",
];
