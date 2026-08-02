// Central navigation data — single source of truth for desktop, mobile, and
// footer navigation. Taxonomy and labels come from docs/INFORMATION_ARCHITECTURE.md
// (§1 approved 7-item nav, §5 solutions taxonomy, §3 product taxonomy, §10
// footer structure); URLs come from docs/SEO.md §1. Routes may point to
// pages not yet implemented (docs/ROADMAP.md phases build them out) — this
// is expected, not a bug.

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavColumn = {
  heading: string;
  href: string;
  items: NavLink[];
};

export type MegaMenu = {
  kind: "mega";
  intro: { title: string; description: string };
  columns: NavColumn[];
  featured: NavLink & { description: string };
};

export type SimpleMenu = {
  kind: "simple";
  items: NavLink[];
};

export type PrimaryNavItem = {
  label: string;
  href?: string;
  menu?: MegaMenu | SimpleMenu;
};

export const primaryNav: PrimaryNavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Solutions",
    href: "/solutions",
    menu: {
      kind: "mega",
      intro: {
        title: "Solutions",
        description:
          "Technology sourcing, integration and support organized around what you're trying to accomplish.",
      },
      columns: [
        {
          heading: "Procurement",
          href: "/solutions",
          items: [
            { label: "Government IT Procurement", href: "/solutions/government-procurement" },
            {
              label: "Enterprise Technology Procurement",
              href: "/solutions/enterprise-technology-procurement",
            },
          ],
        },
        {
          heading: "Infrastructure & Integration",
          href: "/solutions",
          items: [
            { label: "IT Infrastructure", href: "/solutions/it-infrastructure" },
            { label: "Network Infrastructure", href: "/solutions/network-infrastructure" },
            { label: "System Integration", href: "/solutions/system-integration" },
            { label: "Turnkey Technology Projects", href: "/solutions/turnkey-projects" },
          ],
        },
        {
          heading: "Specialized Solutions",
          href: "/solutions",
          items: [
            { label: "Surveillance & Security", href: "/solutions/surveillance-security" },
            { label: "Biometric & Access Control", href: "/solutions/biometric-access-control" },
            {
              label: "Collaboration & Video Conferencing",
              href: "/solutions/collaboration-video-conferencing",
            },
            { label: "Power & Business Continuity", href: "/solutions/power-business-continuity" },
          ],
        },
        {
          heading: "Software & Support",
          href: "/solutions",
          items: [
            { label: "Software Licensing", href: "/solutions/software-licensing" },
            { label: "Digital Workplace", href: "/solutions/digital-workplace" },
            { label: "Deployment & Technical Support", href: "/solutions/deployment-support" },
          ],
        },
      ],
      featured: {
        label: "Government Procurement",
        href: "/government",
        description: "GeM-registered seller supporting government and public-sector technology needs.",
      },
    },
  },
  {
    label: "Products",
    href: "/products",
    menu: {
      kind: "mega",
      intro: {
        title: "Products",
        description: "A broad, multi-brand technology portfolio sourced and supplied on request.",
      },
      columns: [
        {
          heading: "Computing & Infrastructure",
          href: "/products",
          items: [
            { label: "Computing & End-User Devices", href: "/products/computing" },
            { label: "Server, Storage & Data Infrastructure", href: "/products/servers-storage" },
            { label: "Networking & Connectivity", href: "/products/networking" },
          ],
        },
        {
          heading: "Imaging & Security",
          href: "/products",
          items: [
            { label: "Printing, Scanning & Imaging", href: "/products/printing-imaging" },
            { label: "Surveillance, Security & Biometrics", href: "/products/security-biometrics" },
            { label: "Collaboration, Display & Audio", href: "/products/collaboration-display" },
          ],
        },
        {
          heading: "Power & Software",
          href: "/products",
          items: [
            { label: "Power & Business Continuity", href: "/products/power" },
            { label: "Software & Licensing", href: "/products/software" },
          ],
        },
        {
          heading: "Accessories & Facility",
          href: "/products",
          items: [
            { label: "Accessories & Components", href: "/products/accessories" },
            { label: "Facility & Specialized Solutions", href: "/products/facility-solutions" },
          ],
        },
      ],
      featured: {
        label: "Brands",
        href: "/brands",
        description: "Browse the technology brands in our portfolio.",
      },
    },
  },
  {
    label: "Government",
    href: "/government",
    menu: {
      kind: "simple",
      // Phase 3D structure — supersedes the earlier-planned Sectors
      // Served / Clients pair (docs/INFORMATION_ARCHITECTURE.md §9,
      // docs/SEO.md §1 draft). No client showcase page had real, approved
      // client data yet (no entry has displayPermission: Approved per
      // §6.3), so nothing publishable was actually lost in the swap — see
      // src/config/governmentContent.ts's header comment for detail.
      items: [
        { label: "Government Solutions Overview", href: "/government" },
        { label: "GeM Procurement", href: "/government/gem-procurement" },
        { label: "Public Sector", href: "/government/public-sector" },
        { label: "Education", href: "/government/education" },
        { label: "Defence", href: "/government/defence" },
        { label: "Smart City", href: "/government/smart-city" },
        { label: "Government FAQ", href: "/government/faq" },
      ],
    },
  },
  {
    label: "Resources",
    href: "/resources",
    menu: {
      kind: "simple",
      items: [
        { label: "Company Profile", href: "/resources/company-profile" },
        { label: "Certificates", href: "/resources/certificates" },
        { label: "Brochures", href: "/resources/brochures" },
        { label: "Case Studies", href: "/resources/case-studies" },
        { label: "Downloads", href: "/resources/downloads" },
      ],
    },
  },
  {
    label: "Company",
    href: "/company",
    menu: {
      kind: "simple",
      // Phase 3E structure — hub moved from the previous top-level /about to
      // /company (About is now a sub-page at /company/about); Leadership and
      // CSR added. /about redirects to /company/about (next.config.ts).
      items: [
        { label: "Company Overview", href: "/company" },
        { label: "About", href: "/company/about" },
        { label: "Vision & Mission", href: "/company/vision-mission" },
        { label: "Leadership", href: "/company/leadership" },
        { label: "Certifications & Registrations", href: "/company/certifications" },
        { label: "Careers", href: "/company/careers" },
        { label: "CSR", href: "/company/csr" },
        { label: "Why i3it", href: "/company/why-i3it" },
      ],
    },
  },
  { label: "Contact", href: "/contact" },
];

export const requestQuoteLink: NavLink = { label: "Request Quote", href: "/request-quote" };

export type FooterColumn = {
  heading: string;
  links: NavLink[];
};

// docs/INFORMATION_ARCHITECTURE.md §10 (kept to 6 columns). Contact column
// intentionally links out rather than printing address/phone/email — those
// values are profile-stated but not yet owner-confirmed for public display
// (docs/CONTENT_STRATEGY.md §9.2); omitting is the documented rule, not an
// oversight. No social column: no verified official profiles exist.
export const footerNav: FooterColumn[] = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/company/about" },
      { label: "Vision & Mission", href: "/company/vision-mission" },
      { label: "Certifications", href: "/company/certifications" },
      { label: "Careers", href: "/company/careers" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Government Procurement", href: "/solutions/government-procurement" },
      { label: "IT Infrastructure", href: "/solutions/it-infrastructure" },
      { label: "System Integration", href: "/solutions/system-integration" },
      { label: "Security", href: "/solutions/surveillance-security" },
      { label: "Collaboration", href: "/solutions/collaboration-video-conferencing" },
      { label: "Power", href: "/solutions/power-business-continuity" },
      { label: "Software", href: "/solutions/software-licensing" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "Computing", href: "/products/computing" },
      { label: "Servers & Storage", href: "/products/servers-storage" },
      { label: "Networking", href: "/products/networking" },
      { label: "Printing", href: "/products/printing-imaging" },
      { label: "Security", href: "/products/security-biometrics" },
      { label: "Power", href: "/products/power" },
      { label: "Software", href: "/products/software" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Company Profile", href: "/resources/company-profile" },
      { label: "Case Studies", href: "/resources/case-studies" },
      { label: "Certificates", href: "/resources/certificates" },
      { label: "Downloads", href: "/resources/downloads" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Request a quote", href: "/request-quote" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];
