// Government section content — Phase 3D. Every claim stays inside
// docs/CONTENT_STRATEGY.md §6 (government-facing communication rules) and
// docs/DECISIONS.md B4 (GeM registered-seller wording, never government
// affiliation/appointment) — no fabricated certifications, awards,
// government approvals, partnerships, project counts, employee counts,
// customer counts, revenue, or "10 years" company-age claims (§B3).
//
// Route reconciliation: the Phase 3D brief specifies
// /government/{gem-procurement,public-sector,education,defence,smart-city,faq}
// — replacing the earlier-planned /government/{sectors-served,clients}
// (docs/INFORMATION_ARCHITECTURE.md §9, docs/SEO.md §1 draft). No client
// showcase page had real, approved client data yet anyway (no entry has
// displayPermission: Approved per §6.3), so nothing publishable is lost;
// navigation.ts and docs/SEO.md are updated to match this phase's route set.

import type { LucideIcon } from "lucide-react";
import {
  Landmark,
  ClipboardList,
  Building2,
  Network,
  Database,
  Server,
  ShieldCheck,
  BatteryCharging,
  Monitor,
  Cpu,
  Headset,
  FileCheck,
  GraduationCap,
  FlaskConical,
  Building,
  Globe,
  HeartPulse,
  Video,
} from "lucide-react";

export type CapabilityCard = { title: string; description: string; icon: LucideIcon };

export const procurementCapabilities: CapabilityCard[] = [
  {
    title: "GeM Procurement Support",
    description: "Requirement scoping and procurement support through the Government e-Marketplace (GeM).",
    icon: Landmark,
  },
  {
    title: "Technology Consulting",
    description: "Guidance matching the right technology to your requirement and budget before you procure.",
    icon: ClipboardList,
  },
  {
    title: "Infrastructure Planning",
    description: "Planning computing, network and storage infrastructure ahead of procurement.",
    icon: Building2,
  },
  {
    title: "Network Solutions",
    description: "Switching, routing, wireless and structured cabling sourced and deployed together.",
    icon: Network,
  },
  {
    title: "Data Centre Equipment",
    description: "Servers, storage and rack infrastructure for data center and server room environments.",
    icon: Database,
  },
  {
    title: "Servers & Storage",
    description: "Server and enterprise storage hardware sourced across a multi-brand portfolio.",
    icon: Server,
  },
  {
    title: "Security Systems",
    description: "CCTV, surveillance and access-control technology for institutional facilities.",
    icon: ShieldCheck,
  },
  {
    title: "Power Backup",
    description: "UPS and power backup systems sized to the infrastructure they protect.",
    icon: BatteryCharging,
  },
  {
    title: "Software Procurement",
    description: "Operating system, productivity and enterprise software licensing sourced alongside hardware.",
    icon: Monitor,
  },
  {
    title: "Installation & Deployment",
    description: "On-site installation, configuration and deployment support.",
    icon: Cpu,
  },
  {
    title: "Annual Support",
    description: "Ongoing technical support beyond the point of delivery.",
    icon: Headset,
  },
  {
    title: "AMC Assistance",
    description: "Assistance coordinating annual maintenance contracts for supplied equipment.",
    icon: FileCheck,
  },
];

export type WorkflowStep = { title: string; description: string };

export const procurementWorkflow: WorkflowStep[] = [
  { title: "Requirement Analysis", description: "Understanding the technology requirement, scope and constraints." },
  { title: "Technology Consultation", description: "Discussing options and matching technology to the requirement." },
  { title: "Solution Design", description: "Designing the solution across the categories involved." },
  { title: "Quotation", description: "A quotation is prepared, matched to the confirmed requirement." },
  { title: "Procurement", description: "The order is processed, including GeM procurement where applicable." },
  { title: "Delivery", description: "Equipment is delivered to the specified location." },
  { title: "Installation", description: "On-site installation of the supplied equipment." },
  { title: "Configuration", description: "Equipment is configured for the environment it will run in." },
  { title: "Support", description: "Technical support continues after deployment." },
];

export type IndustryItem = { label: string; icon: LucideIcon };

export const industriesServedGov: IndustryItem[] = [
  { label: "Central Government", icon: Landmark },
  { label: "State Government", icon: Landmark },
  { label: "Public Sector Undertakings", icon: Building2 },
  { label: "Educational Institutions", icon: GraduationCap },
  { label: "Universities", icon: GraduationCap },
  { label: "Schools", icon: GraduationCap },
  { label: "Research Institutes", icon: FlaskConical },
  { label: "Municipal Corporations", icon: Building },
  { label: "Smart Cities", icon: Globe },
  { label: "Healthcare", icon: HeartPulse },
  { label: "Corporate Enterprises", icon: Building2 },
];

export const whyChooseGov: CapabilityCard[] = [
  {
    title: "Transparent Procurement",
    description: "Clear, GeM-based procurement processes with proper documentation at every step.",
    icon: FileCheck,
  },
  {
    title: "Multi-brand Technology Sourcing",
    description: "Technology sourced across a broad, multi-brand portfolio rather than a single vendor catalogue.",
    icon: Globe,
  },
  {
    title: "Professional Documentation",
    description: "Quotations, invoices and procurement documentation handled professionally.",
    icon: ClipboardList,
  },
  {
    title: "Deployment Assistance",
    description: "On-site installation and configuration support after delivery.",
    icon: Cpu,
  },
  {
    title: "Technical Support",
    description: "Support continues after deployment, not only at the point of sale.",
    icon: Headset,
  },
  {
    title: "Scalable Infrastructure Solutions",
    description: "Infrastructure sized and designed to grow with your requirement.",
    icon: Server,
  },
];

export type TechnologyItem = { label: string; icon: LucideIcon; href?: string };

export const technologyCategoriesGov: TechnologyItem[] = [
  { label: "Computing", icon: Monitor, href: "/products/computing" },
  { label: "Servers", icon: Server, href: "/products/servers-storage" },
  { label: "Networking", icon: Network, href: "/products/networking" },
  { label: "Security", icon: ShieldCheck, href: "/products/security-biometrics" },
  { label: "Power", icon: BatteryCharging, href: "/products/power" },
  { label: "Audio Visual", icon: Video, href: "/products/collaboration-display" },
  { label: "Software", icon: FileCheck, href: "/products/software" },
  { label: "Storage", icon: Database, href: "/products/servers-storage" },
  { label: "Cloud Ready Infrastructure", icon: Globe, href: "/solutions/it-infrastructure" },
];

export const complianceIntro =
  "Procurement support extends beyond sourcing technology — proper documentation and coordination matter as much as the equipment itself, particularly for government and institutional buyers.";

export const compliancePoints: string[] = [
  "Quotations and GST-compliant invoices provided for every order",
  "Vendor coordination across multiple brands, handled as a single point of contact",
  "Deployment planning coordinated alongside procurement, not treated as an afterthought",
  "Documentation prepared to support institutional and government audit and approval processes",
];

export const complianceCertificationNote =
  "Certifications and registrations are listed separately, with each item's verification status stated clearly — nothing here implies a certification beyond what's confirmed there.";

export type FAQItem = { question: string; answer: string };

export const governmentLandingFaqs: FAQItem[] = [
  {
    question: "How does GeM procurement work?",
    answer:
      "GeM (Government e-Marketplace) is the official government procurement platform. We support departments and institutions through the GeM procurement process as a registered seller, from requirement scoping through delivery.",
  },
  {
    question: "Can you help with technology selection?",
    answer: "Yes — we offer technology consulting to help match the right solution to your requirement and budget before you procure.",
  },
  {
    question: "Do you supply nationwide?",
    answer: "We're built to support technology sourcing and deployment for organizations across India, scoped per requirement and location.",
  },
  {
    question: "Which brands do you source?",
    answer: "We source across a broad, multi-brand technology portfolio rather than a single brand — let us know your requirement and we'll confirm availability.",
  },
  {
    question: "Do you install equipment?",
    answer: "Yes — installation, configuration and deployment support is available as part of our infrastructure and integration work.",
  },
  {
    question: "Can educational institutions procure through you?",
    answer: "Yes — educational institutions, including schools, universities and research institutes, can procure through us in the same way as other institutional buyers.",
  },
];

// ---------------------------------------------------------------------------
// GeM Procurement page
// ---------------------------------------------------------------------------

export const gemWhatIsGem =
  "The Government e-Marketplace (GeM) is the Government of India's official online procurement platform, used by central and state government departments, PSUs and other public institutions to purchase goods and services.";

export const gemRoleStatement =
  "i3it Solutions is a registered seller on GeM — not a government body or GeM-appointed authority — supporting departments and institutions through the procurement process.";

export const gemBenefits: string[] = [
  "Transparent, published pricing and processes",
  "Standardized procurement documentation",
  "Access to a wide base of registered sellers across categories",
  "A structured, auditable procurement trail for institutional buyers",
];

export const whyOrganizationsChooseGem: string[] = [
  "Transparency in pricing and vendor selection",
  "Standardized, auditable procurement documentation",
  "A single platform covering a broad range of product and service categories",
  "Direct utilization of allocated procurement budgets through an official channel",
];

export const howI3itSupportsGem: string[] = [
  "GeM-based procurement transparency and efficiency",
  "Technology sourcing and bulk or institutional supply",
  "Deployment, integration and after-sales support",
  "Requirement scoping and GeM catalogue navigation assistance",
];

export const gemFaqs: FAQItem[] = [
  {
    question: "Is i3it Solutions an official GeM partner?",
    answer:
      "“Official GeM partner” isn't a real designation. i3it Solutions is a registered seller on GeM, supporting procurement through the platform.",
  },
  {
    question: "Who can buy through GeM?",
    answer: "Central and state government departments, PSUs and other public institutions registered as GeM buyers.",
  },
  {
    question: "Do you help with GeM catalogue navigation?",
    answer: "Yes — we help identify the right products and categories within the GeM catalogue for your requirement.",
  },
  {
    question: "What happens after an order is placed on GeM?",
    answer:
      "We process the order, coordinate delivery and installation where applicable, and provide the documentation required to close out the procurement.",
  },
];

// ---------------------------------------------------------------------------
// Public Sector page
// ---------------------------------------------------------------------------

export const publicSectorOverview =
  "Public sector organizations — including PSUs, municipal corporations and public institutions — need technology procurement that's transparent, well-documented and delivered by a single accountable vendor across categories.";

export type LinkedItem = { title: string; description: string; href: string };

export const publicSectorCapabilities: LinkedItem[] = [
  { title: "Technology Procurement", description: "Requirement-based sourcing across hardware, software and services.", href: "/solutions/enterprise-technology-procurement" },
  { title: "Networking", description: "Switching, routing, wireless networking and structured cabling.", href: "/products/networking" },
  { title: "Servers", description: "Server infrastructure for institutional data and applications.", href: "/products/servers-storage" },
  { title: "Storage", description: "Enterprise and backup storage infrastructure.", href: "/products/servers-storage" },
  { title: "Security", description: "CCTV, surveillance and access-control technology.", href: "/products/security-biometrics" },
  { title: "Power", description: "UPS and power backup systems for critical infrastructure.", href: "/products/power" },
  { title: "Deployment", description: "On-site installation and configuration support.", href: "/solutions/deployment-support" },
  { title: "Support", description: "Technical support continuing after deployment.", href: "/solutions/deployment-support" },
];

// ---------------------------------------------------------------------------
// Education page
// ---------------------------------------------------------------------------

export const educationOverview =
  "Schools, universities and research institutes need reliable computing, networking and classroom technology — sourced, deployed and supported as a single institutional engagement.";

export const educationSolutions: LinkedItem[] = [
  { title: "Computer Labs", description: "Laptops, desktops and workstations for computer labs and teaching spaces.", href: "/products/computing" },
  { title: "Interactive Panels", description: "Interactive panels and displays for classrooms and training rooms.", href: "/products/collaboration-display" },
  { title: "Campus WiFi", description: "Wireless networking designed for campus-wide coverage.", href: "/products/networking" },
  { title: "Servers", description: "Server infrastructure for institutional data and applications.", href: "/products/servers-storage" },
  { title: "Networking", description: "Switching, routing and structured cabling for campus networks.", href: "/products/networking" },
  { title: "Attendance Systems", description: "Biometric or RFID-based attendance systems for staff and students.", href: "/products/security-biometrics" },
  { title: "CCTV", description: "Surveillance coverage for campus and facility security.", href: "/products/security-biometrics" },
  { title: "Library Technology", description: "Computing and access devices for library and resource centers.", href: "/products/computing" },
  { title: "Digital Classrooms", description: "Displays, audio and collaboration technology for digital classrooms.", href: "/products/collaboration-display" },
];

// ---------------------------------------------------------------------------
// Defence page — conservative wording only, no military claims
// ---------------------------------------------------------------------------

export const defenceOverview =
  "We support defence and security-adjacent organizations with standard technology infrastructure — computing, networking, storage and power systems — supplied and deployed the same way as for any institutional buyer. We do not make claims about specific defence projects, deployments or classified environments.";

export const defenceCapabilities: LinkedItem[] = [
  { title: "Secure Networking", description: "Networking infrastructure deployed to institutional standards, with attention to access control and segmentation.", href: "/products/networking" },
  { title: "Infrastructure", description: "Computing, server and storage infrastructure sourced and deployed as a working environment.", href: "/solutions/it-infrastructure" },
  { title: "Power Backup", description: "UPS and power backup systems for facilities where uptime matters.", href: "/products/power" },
  { title: "Data Storage", description: "Enterprise and backup storage infrastructure.", href: "/products/servers-storage" },
  { title: "Computing", description: "End-user computing devices for administrative and operational use.", href: "/products/computing" },
];

export const missionSupportNote =
  "“Mission-support infrastructure” here means technology that supports day-to-day operational and administrative functions — not combat systems, weapons platforms or classified technology.";

// ---------------------------------------------------------------------------
// Smart City page
// ---------------------------------------------------------------------------

export const smartCityOverview =
  "Smart city and municipal projects bring together surveillance, connectivity and public-facing technology across distributed locations — sourced and deployed as a coordinated infrastructure effort.";

export const smartCityCapabilities: LinkedItem[] = [
  { title: "Integrated Surveillance", description: "CCTV and video surveillance technology for public and municipal infrastructure.", href: "/products/security-biometrics" },
  { title: "Networking", description: "Networking infrastructure connecting distributed smart city systems.", href: "/products/networking" },
  { title: "Digital Signage", description: "Large-format displays for public information and wayfinding.", href: "/products/collaboration-display" },
  { title: "Control Rooms", description: "Display walls and collaboration technology for control room environments.", href: "/products/collaboration-display" },
  { title: "Command Centers", description: "Technology infrastructure for command and monitoring center environments.", href: "/products/collaboration-display" },
  { title: "Connectivity", description: "Wired and wireless connectivity infrastructure for public spaces.", href: "/products/networking" },
  { title: "Public WiFi", description: "Wireless networking for public access points.", href: "/products/networking" },
  { title: "Monitoring", description: "Surveillance and monitoring technology for public safety.", href: "/products/security-biometrics" },
];

// No real product-taxonomy mapping exists for IoT sensor/device hardware
// specifically (docs/INFORMATION_ARCHITECTURE.md §3) — described honestly
// without a fabricated category link, unlike the items above.
export const smartCityIotNote =
  "Supporting infrastructure for IoT sensor and device deployments — networking, power and storage sourced to fit the specific sensor and monitoring systems a project requires.";

// ---------------------------------------------------------------------------
// Government FAQ page — grouped
// ---------------------------------------------------------------------------

export type FAQGroup = { heading: string; items: FAQItem[] };

export const governmentFaqGroups: FAQGroup[] = [
  {
    heading: "General",
    items: [
      {
        question: "What does i3it Solutions do?",
        answer: "We help government, institutional and enterprise organizations source, deploy and support technology across computing, infrastructure, networking, security and related categories.",
      },
      {
        question: "Are you a government organization?",
        answer: "No — i3it Solutions is a private technology sourcing and integration company. We are a registered seller on the Government e-Marketplace (GeM), not a government entity.",
      },
    ],
  },
  {
    heading: "GeM",
    items: [
      {
        question: "What is GeM?",
        answer: "The Government e-Marketplace (GeM) is the Government of India's official online procurement platform for government departments and public institutions.",
      },
      {
        question: "Are you an official GeM partner?",
        answer: "“Official GeM partner” isn't a real designation. We are a registered seller on GeM.",
      },
    ],
  },
  {
    heading: "Delivery",
    items: [
      {
        question: "Do you deliver nationwide?",
        answer: "We're built to support technology sourcing and deployment for organizations across India, scoped per requirement and location.",
      },
      {
        question: "How long does delivery take?",
        answer: "Delivery timelines depend on the product, quantity and sourcing involved — we confirm a timeline as part of the quotation.",
      },
    ],
  },
  {
    heading: "Deployment",
    items: [
      {
        question: "Do you install and configure equipment?",
        answer: "Yes — installation, configuration and deployment support is available as part of our infrastructure and integration work.",
      },
      {
        question: "Can you deploy across multiple sites?",
        answer: "Yes — deployment can be coordinated across multiple locations as part of a single engagement, scoped per requirement.",
      },
    ],
  },
  {
    heading: "Warranty",
    items: [
      {
        question: "Do products come with a warranty?",
        answer: "Warranty terms are set by the manufacturer for each product and are shared with you as part of the quotation and documentation.",
      },
      {
        question: "Do you handle warranty claims?",
        answer: "We help coordinate manufacturer warranty support for equipment we've supplied.",
      },
    ],
  },
  {
    heading: "Support",
    items: [
      {
        question: "Do you provide support after delivery?",
        answer: "Yes — technical support is available after deployment, not only at the point of sale. Scope and terms are confirmed per engagement.",
      },
      {
        question: "Do you assist with AMC (Annual Maintenance Contracts)?",
        answer: "Yes — we can assist with coordinating annual maintenance contracts for equipment we've supplied.",
      },
    ],
  },
  {
    heading: "Procurement",
    items: [
      {
        question: "How does the procurement process work?",
        answer: "It starts with understanding your requirement, followed by technology consultation, solution design, quotation, procurement, delivery, installation, configuration and ongoing support.",
      },
      {
        question: "Is pricing published on the website?",
        answer: "No — pricing is confirmed through a quotation matched to your specific requirement.",
      },
    ],
  },
];
