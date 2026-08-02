// Typed homepage content — kept separate from JSX per docs/TECHNICAL_ARCHITECTURE.md
// §3/§22. Every item here is grounded in docs/PROJECT.md, docs/CONTENT_STRATEGY.md,
// and docs/INFORMATION_ARCHITECTURE.md; nothing is invented. Sections with no
// verified public data (clients, projects, credentials, testimonials, media)
// export an empty array on purpose — the components that consume them render
// nothing rather than fabricated placeholders (docs/CONTENT_STRATEGY.md §4).

import { primaryNav } from "@/config/navigation";

export type IconName =
  | "ClipboardList"
  | "Server"
  | "ShieldCheck"
  | "Headset"
  | "Building2"
  | "Landmark"
  | "Layers"
  | "Globe"
  | "Laptop"
  | "Database"
  | "Router"
  | "Camera"
  | "MonitorSmartphone"
  | "BatteryCharging"
  | "Network"
  | "Video"
  | "KeySquare"
  | "Handshake";

export type SnapshotItem = {
  icon: IconName;
  title: string;
  description: string;
};

// docs/PROJECT.md §7 (four capability pillars) + §6 (mission) + §10 (GeM
// distinction) + docs/CONTENT_STRATEGY.md §2 (established year is
// publishable; PAN India is intent/scope, not a guaranteed SLA).
export const companySnapshot: SnapshotItem[] = [
  {
    icon: "Building2",
    title: "Established 2021",
    description:
      "i3it Solutions was established in 2021 to support technology procurement and infrastructure needs for government and enterprise.",
  },
  {
    icon: "Landmark",
    title: "GeM-registered seller",
    description:
      "Registered and verified seller on the Government e-Marketplace (GeM), supporting transparent public-sector procurement.",
  },
  {
    icon: "Layers",
    title: "Multi-category technology portfolio",
    description:
      "A broad portfolio spanning computing, infrastructure, networking, security, collaboration and power systems.",
  },
  {
    icon: "Globe",
    title: "PAN-India service intent",
    description:
      "Built to support technology sourcing and deployment for organizations across India.",
  },
];

export type CapabilityItem = {
  icon: IconName;
  title: string;
  description: string;
  href: string;
};

// docs/PROJECT.md §7 — the four capability pillars, unchanged in scope.
export const capabilities: CapabilityItem[] = [
  {
    icon: "ClipboardList",
    title: "IT procurement & supply",
    description:
      "Government, institutional and enterprise technology procurement, including GeM-based and bulk supply.",
    href: "/solutions/government-procurement",
  },
  {
    icon: "Server",
    title: "IT infrastructure & integration",
    description:
      "Computing, servers, storage, networking and system integration, deployed end-to-end.",
    href: "/solutions/it-infrastructure",
  },
  {
    icon: "ShieldCheck",
    title: "Specialized technology solutions",
    description:
      "Surveillance, access control, biometrics, video conferencing, displays and power backup.",
    href: "/solutions/surveillance-security",
  },
  {
    icon: "Headset",
    title: "Support & technology services",
    description:
      "Technical consulting, implementation and after-sales support across our technology portfolio.",
    href: "/solutions/deployment-support",
  },
];

export type WhyPoint = {
  title: string;
  description: string;
};

// docs/PROJECT.md §3 (positioning framework) and §6 (mission). Every point
// ties to a specific documented fact — no generic filler.
export const whyPoints: WhyPoint[] = [
  {
    title: "Solution-led, not just supply",
    description:
      "We work to understand the requirement, source the right technology and see it through integration and deployment.",
  },
  {
    title: "Government procurement expertise",
    description:
      "A registered GeM seller supporting transparent, efficient public-sector procurement.",
  },
  {
    title: "Broad, multi-brand technology portfolio",
    description:
      "Sourcing across computing, infrastructure, networking, security, collaboration and power systems, matched to the requirement rather than a fixed catalogue.",
  },
  {
    title: "Ongoing support",
    description:
      "Technical support intended to help clients keep systems running after deployment, not only at the point of sale.",
  },
];

// Featured Solutions/Products are derived FROM the approved nav taxonomy
// (src/config/navigation.ts) rather than re-declared, so the homepage can
// never drift from the mega menu's labels/routes. Descriptions are homepage-
// only copy (nav items don't carry them) and live in the lookup maps below.
const solutionsMenu = primaryNav.find((item) => item.label === "Solutions")?.menu;
const productsMenu = primaryNav.find((item) => item.label === "Products")?.menu;

const allSolutionLinks = solutionsMenu?.kind === "mega" ? solutionsMenu.columns.flatMap((c) => c.items) : [];
const allProductLinks = productsMenu?.kind === "mega" ? productsMenu.columns.flatMap((c) => c.items) : [];

export type FeaturedItem = {
  icon: IconName;
  label: string;
  href: string;
  description: string;
};

const featuredSolutionCopy: Record<string, { icon: IconName; description: string }> = {
  "/solutions/government-procurement": {
    icon: "Landmark",
    description: "GeM-based procurement support for government and public-sector requirements.",
  },
  "/solutions/it-infrastructure": {
    icon: "Server",
    description: "Computing, server, storage and networking infrastructure, sourced and deployed.",
  },
  "/solutions/system-integration": {
    icon: "Network",
    description: "Bringing hardware, software and network components together into a working system.",
  },
  "/solutions/surveillance-security": {
    icon: "ShieldCheck",
    description: "CCTV, video surveillance and physical security technology.",
  },
  "/solutions/collaboration-video-conferencing": {
    icon: "Video",
    description: "Video conferencing, displays and collaboration technology for modern workplaces.",
  },
  "/solutions/software-licensing": {
    icon: "KeySquare",
    description: "Operating systems, productivity, security and enterprise software licensing.",
  },
};

export const featuredSolutions: FeaturedItem[] = Object.keys(featuredSolutionCopy)
  .map((href) => {
    const link = allSolutionLinks.find((item) => item.href === href);
    const copy = featuredSolutionCopy[href];
    if (!link) return null;
    return { icon: copy.icon, label: link.label, href: link.href, description: copy.description };
  })
  .filter((item): item is FeaturedItem => item !== null);

const featuredProductCopy: Record<string, { icon: IconName; description: string }> = {
  "/products/computing": {
    icon: "Laptop",
    description: "Laptops, desktops, workstations and monitors for institutional and enterprise use.",
  },
  "/products/servers-storage": {
    icon: "Database",
    description: "Servers, enterprise storage and backup infrastructure.",
  },
  "/products/networking": {
    icon: "Router",
    description: "Switches, routers, wireless networking and structured cabling.",
  },
  "/products/security-biometrics": {
    icon: "Camera",
    description: "Surveillance cameras, biometric attendance and access control devices.",
  },
  "/products/collaboration-display": {
    icon: "MonitorSmartphone",
    description: "Video conferencing systems, interactive panels and large-format displays.",
  },
  "/products/power": {
    icon: "BatteryCharging",
    description: "Online and line-interactive UPS, power backup and voltage stabilizers.",
  },
};

export const featuredProducts: FeaturedItem[] = Object.keys(featuredProductCopy)
  .map((href) => {
    const link = allProductLinks.find((item) => item.href === href);
    const copy = featuredProductCopy[href];
    if (!link) return null;
    return { icon: copy.icon, label: link.label, href: link.href, description: copy.description };
  })
  .filter((item): item is FeaturedItem => item !== null);

// docs/PROJECT.md §10 — sourced GeM-registered-seller distinction; sectors
// described are the target-audience categories from §9, not client claims.
export const governmentHighlights: string[] = [
  "GeM-based procurement transparency and efficiency",
  "Technology sourcing and bulk or institutional supply",
  "Deployment, integration and after-sales support",
  "Positioned to serve central and state government departments, public sector undertakings, defence and security organizations, and educational and research institutions",
];

// docs/INFORMATION_ARCHITECTURE.md §4.1 (approved brand list) + §4.2 (neutral
// terminology only — no "Partner"/"Authorized"/"Certified" language, since
// every brand's relationshipType is still TBD per §4.3). Names only, no
// logos — none are verified for logo usage.
export const technologyEcosystem: string[] = [
  "HP",
  "HPE",
  "Samsung",
  "Microsoft",
  "Acer",
  "ASUS",
  "Digisol",
  "Matrix",
  "Panasonic",
  "LG",
  "QNAP",
  "Autodesk",
  "Adobe",
  "Canon",
];

// ---------------------------------------------------------------------------
// No verified public data exists yet for the sections below. Each type/array
// is defined so the corresponding component (and a future CMS/data layer)
// has a real shape to fill in — the components themselves render nothing
// while these stay empty (docs/CONTENT_STRATEGY.md §4, §13; IA §6.3/§7).
// ---------------------------------------------------------------------------

export type TrustedOrganization = { name: string; category: string; logoSrc?: string };
export const trustedOrganizations: TrustedOrganization[] = [];

export type FeaturedProject = {
  title: string;
  clientCategory: string;
  solutionCategory: string;
  scope: string;
  year: string;
  href: string;
};
export const featuredProjects: FeaturedProject[] = [];

export type Credential = { name: string; type: string; description: string };
export const credentials: Credential[] = [];

export type Testimonial = { quote: string; name: string; title: string; organization: string };
export const testimonials: Testimonial[] = [];

export type MediaItem = { title: string; date: string; href: string };
export const mediaItems: MediaItem[] = [];
