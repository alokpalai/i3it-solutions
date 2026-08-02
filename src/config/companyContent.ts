// Company section content — Phase 3E. Grounded entirely in docs/PROJECT.md
// (§4 background, §5 vision, §6 mission, §7 capability pillars) and
// docs/CONTENT_STRATEGY.md §12 (About), §15 (Careers). No invented
// directors, certifications, awards, statistics, offices, revenue, clients,
// company culture claims, or job openings (docs/DECISIONS.md A13).
//
// Route reconciliation: this phase moves the company hub from the previous
// top-level /about to /company (with About as a sub-page at /company/about)
// and adds Leadership + CSR. /about now redirects to /company/about
// (next.config.ts) rather than leaving a dead/orphaned route.

import type { LucideIcon } from "lucide-react";
import {
  Handshake,
  ShieldCheck,
  Eye,
  Sparkles,
  Zap,
  GraduationCap,
  Users,
  Leaf,
  Scale,
  Cpu,
  ClipboardList,
  Building2,
  Globe,
  Wrench,
  RefreshCw,
} from "lucide-react";

export type IconCard = { title: string; description: string; icon: LucideIcon };

// ---------------------------------------------------------------------------
// Company landing
// ---------------------------------------------------------------------------

export const companyOverview =
  "i3it Solutions is a technology solutions partner — not merely a product reseller — working to understand a buyer's requirement, source the right technology across multiple brands, integrate systems, deploy solutions, and support customers after delivery. We serve government departments, public-sector organizations, institutions and enterprises, with a particular focus on transparent, GeM-based procurement for government buyers.";

// docs/PROJECT.md §6 — the same four mission pillars used in
// src/config/internalContent.ts, presented here as cards with icons rather
// than a plain list. One source of truth for the wording (visionMission),
// icons layered on separately.
export const missionCardIcons: LucideIcon[] = [Cpu, Handshake, ShieldCheck, Zap];

// docs/PROJECT.md §6's mission pillars already name these values explicitly
// ("trust, reliability, and consistent service," "transparency and
// efficiency," "high-quality," "responsive support") — surfaced here as a
// values grid rather than introducing new, unstated principles.
export const coreValues: IconCard[] = [
  {
    title: "Trust",
    description: "Building lasting client relationships through trust and reliability.",
    icon: Handshake,
  },
  {
    title: "Reliability",
    description: "Consistent service and dependable solutions clients can count on.",
    icon: ShieldCheck,
  },
  {
    title: "Transparency",
    description: "Transparent, GeM-based procurement processes with clear documentation.",
    icon: Eye,
  },
  {
    title: "Quality",
    description: "High-quality IT hardware and software matched to the requirement.",
    icon: Sparkles,
  },
  {
    title: "Responsiveness",
    description: "Responsive support that helps clients achieve their operational goals.",
    icon: Zap,
  },
];

// docs/PROJECT.md §3 — the approved positioning framework, reused verbatim
// in meaning (same underlying steps as deliveryMethodology in
// src/config/solutionsContent.ts) but written as a "how we work" statement
// for the Company section's business-philosophy framing.
export const businessPhilosophy =
  "We work as a technology solutions partner rather than a product reseller: understanding a requirement, sourcing the right technology across multiple brands, integrating systems, deploying solutions, and supporting customers after delivery.";

// Only two entries — the one confirmed date (established 2021) plus the
// current state. No fabricated multi-year growth milestones
// (docs/DECISIONS.md A13, B3).
export const companyTimeline = [
  {
    period: "2021",
    description:
      "i3it Solutions is established to support technology procurement and infrastructure needs for government and enterprise organizations.",
  },
  {
    period: "Today",
    description:
      "A GeM-registered seller supporting government, public-sector, institutional and enterprise buyers across a broad, multi-brand technology portfolio.",
  },
];

// ---------------------------------------------------------------------------
// About page
// ---------------------------------------------------------------------------

export const companyHistory =
  "i3it Solutions was established in 2021 to support technology procurement and infrastructure needs for government and enterprise organizations. Since then, we've built a broad, multi-brand technology portfolio and a GeM-registered procurement capability, bringing the same understand-source-integrate-deploy-support approach to every engagement.";

export const enterpriseApproachPoints: string[] = [
  "Understanding the requirement before recommending a solution",
  "Sourcing across a broad, multi-brand technology portfolio rather than a fixed catalogue",
  "Integrating hardware, software and network components into a working system",
  "Deploying and configuring on-site, not just shipping equipment",
  "Supporting clients after delivery, not only at the point of sale",
];

// ---------------------------------------------------------------------------
// Why i3it
// ---------------------------------------------------------------------------

export const whyI3itPoints: IconCard[] = [
  {
    title: "Technology Expertise",
    description: "A team focused on matching the right technology to your requirement, across computing, infrastructure, networking, security and more.",
    icon: Cpu,
  },
  {
    title: "Professional Procurement",
    description: "Transparent, GeM-based procurement processes with proper documentation at every step.",
    icon: ClipboardList,
  },
  {
    title: "Enterprise Delivery",
    description: "Solutions delivered as a single accountable engagement — sourcing, integration and deployment handled together.",
    icon: Building2,
  },
  {
    title: "Multi-brand Sourcing",
    description: "A broad, multi-brand technology portfolio sourced and matched to your requirement rather than a fixed catalogue.",
    icon: Globe,
  },
  {
    title: "Deployment Support",
    description: "Installation, configuration and on-site deployment support as part of the engagement.",
    icon: Wrench,
  },
  {
    title: "Lifecycle Services",
    description: "Technical support continuing after deployment, not only at the point of sale.",
    icon: RefreshCw,
  },
];

// ---------------------------------------------------------------------------
// Leadership
// ---------------------------------------------------------------------------

export const leadershipIntro =
  "i3it Solutions is guided by a small, hands-on leadership approach focused on understanding each client's requirement directly and standing behind the solutions we deliver.";

export const leadershipPhilosophy: string[] = [
  "Direct accountability for every engagement, from requirement through delivery",
  "Decisions grounded in transparency, particularly for government and institutional procurement",
  "Long-term client relationships over one-off transactions",
  "Hands-on involvement in technical consulting and solution design",
];

export const leadershipPlaceholderNote =
  "Individual leadership profiles will be published here once finalized.";

// ---------------------------------------------------------------------------
// Certifications
// ---------------------------------------------------------------------------

export const certificationsIntro =
  "Rather than claim certifications we haven't yet verified, this page is built to show exactly where each item stands — confirmed facts stated plainly, everything else marked pending until a verifying document exists (docs/CONTENT_STRATEGY.md §8.3). Our commitment is to quality and compliant process; certification status is separate from that commitment and won't be overstated to support it.";

export const confirmedCertification: { name: string; description: string } = {
  name: "GeM Registered Seller",
  description: "Verified seller on the Government e-Marketplace (GeM), supporting transparent public-sector procurement.",
};

// Categories mirror docs/CONTENT_STRATEGY.md §8.1's profile-stated item
// table exactly — every one marked pending, none claimed as held. No
// "Government approval" or "OEM/Authorized Partner" category is listed
// here: neither is a real certification type, and both are explicitly
// prohibited claims for this page.
export const pendingCertifications: { name: string; description: string }[] = [
  { name: "ISO 9001:2015", description: "Quality Management System." },
  { name: "ISO/IEC 27001:2022", description: "Information Security Management System." },
  { name: "ISO/IEC 20000-1:2018", description: "IT Service Management." },
  { name: "ISO 22301:2019", description: "Business Continuity Management System." },
  { name: "CMMI Maturity Level 3", description: "Process maturity appraisal." },
  { name: "MSME / Udyam Registration", description: "Micro, Small and Medium Enterprise registration." },
  { name: "Trade License", description: "Business trade licensing." },
  { name: "Trademark Registration", description: "Brand/trademark registration." },
];

// ---------------------------------------------------------------------------
// Careers
// ---------------------------------------------------------------------------

export const careersHeroDescription =
  "Work at i3it Solutions spans real government, public-sector and enterprise technology engagements — procurement, infrastructure and deployment, not a narrow, siloed role.";

// Grounded directly in docs/PROJECT.md §7's four capability pillars, not
// generic "great culture" claims barred by docs/CONTENT_STRATEGY.md §15.
export const whyWorkWithUs: string[] = [
  "Exposure to a broad, multi-brand technology portfolio rather than one vendor's product line",
  "Direct involvement in government and institutional procurement, including GeM",
  "Work that spans the full engagement — sourcing, integration, deployment and support",
  "A small team where individual contribution is directly visible in client outcomes",
];

export const cultureStatement =
  "Work here typically spans multiple functional areas — procurement, technical delivery and client support — rather than narrow, siloed roles. Specific day-to-day expectations are discussed directly as part of the hiring process.";

export const hiringProcessSteps = [
  { title: "Application Review", description: "Your application and background are reviewed against the role." },
  { title: "Initial Conversation", description: "A conversation to understand your experience and interest." },
  { title: "Technical Discussion", description: "A closer discussion of relevant technical or domain experience." },
  { title: "Decision", description: "A hiring decision is communicated directly." },
  { title: "Onboarding", description: "Onboarding into the team and current engagements." },
];

// Generic functional areas derived directly from docs/PROJECT.md §7's four
// capability pillars — not a claim about current specific openings or
// headcount in any of them.
export const departments: { title: string; description: string }[] = [
  { title: "Technical Support & Deployment", description: "Installation, configuration and after-sales technical support." },
  { title: "Sales & Procurement", description: "Government, institutional and enterprise procurement, including GeM." },
  { title: "Operations & Logistics", description: "Order processing, delivery coordination and vendor logistics." },
  { title: "Administration & Compliance", description: "Documentation, compliance and business administration." },
];

export const benefitsStatement =
  "Specific benefits are discussed directly as part of the hiring process, matched to the role.";

export const applicationCtaNote =
  "Interested in working with us? Reach out and we'll follow up if a relevant opening comes available.";

// ---------------------------------------------------------------------------
// CSR
// ---------------------------------------------------------------------------

export const csrDisclaimer =
  "Our approach to corporate responsibility is still developing. The areas below reflect our current focus and commitments — not completed programs or initiatives — and will be updated as real initiatives are established.";

export const csrFocusAreas: IconCard[] = [
  {
    title: "Technology for Education",
    description: "We prioritize working with educational institutions to make reliable technology more accessible, through the same procurement and deployment support we provide to any institutional buyer.",
    icon: GraduationCap,
  },
  {
    title: "Digital Inclusion",
    description: "Supporting more transparent, accessible technology procurement for public institutions, including through GeM-based procurement that broadens participation and visibility.",
    icon: Users,
  },
  {
    title: "Environmental Awareness",
    description: "Environmental responsibility is a consideration we factor into how we advise clients on technology lifecycle and procurement decisions.",
    icon: Leaf,
  },
  {
    title: "Ethical Business Practices",
    description: "Transparent, GeM-based procurement processes and honest, factual communication with every client — the same standard we hold across all our work.",
    icon: Scale,
  },
];
