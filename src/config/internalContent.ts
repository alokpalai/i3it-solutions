// Content for internal-page shells and Company sub-pages that isn't
// homepage-specific. Grounded in docs/PROJECT.md and docs/DECISIONS.md;
// nothing here is invented — see the comment on each field.

export type ShellSection = "solutions" | "products" | "government" | "resources";

// Honest, uniform placeholder copy for detail pages whose full content
// belongs to a later Phase 3 checkpoint (docs/ROADMAP.md Phase 3/4). Every
// slug in a section gets the same sentence rather than fabricating
// category-specific detail for some items and not others — see the Phase 3A
// report for why consistency matters here (docs/CONTENT_STRATEGY.md §4).
export const shellIntro: Record<ShellSection, string> = {
  solutions:
    "Detailed information for this solution area is being finalized and will be published here as it becomes available.",
  products:
    "Detailed information for this product category is being finalized and will be published here as it becomes available.",
  government:
    "Detailed information for this section is being finalized and will be published here as it becomes available.",
  resources: "This resource is being prepared and will be published here once available.",
};

export type VisionMission = {
  vision: string;
  missionPillars: string[];
};

// docs/PROJECT.md §5 (vision, profile-stated, preserved in meaning — framed
// explicitly as an aspiration ("To be..."), not a present-tense market
// claim) and §6 (mission, four profile-stated pillars).
export const visionMission: VisionMission = {
  vision:
    "To be a leading force in driving digital transformation in India's public sector through dependable and innovative IT solutions.",
  missionPillars: [
    "Provide high-quality IT hardware and software tailored to government departments and institutions.",
    "Improve transparency and efficiency in government procurement through the Government e-Marketplace (GeM).",
    "Build lasting client relationships through trust, reliability, and consistent service.",
    "Provide responsive support and dependable solutions that help clients achieve operational goals.",
  ],
};

// docs/DECISIONS.md B8/B9: ISO and CMMI status are still open verification
// items, not owner-confirmed for publication. GeM registration is the one
// credential that IS clear (docs/DECISIONS.md B4) and is stated on its own.
export const certificationsStatus = {
  gemStatement:
    "i3it Solutions is a registered seller on the Government e-Marketplace (GeM), supporting transparent public-sector procurement.",
  pendingStatement:
    "Additional certifications and registrations are in the process of verification and will be published here once confirmed.",
};

// No fabricated job listings (docs/DECISIONS.md A13) — states the current,
// real position rather than leaving an unexplained empty page.
export const careersStatus =
  "There are no open positions listed at this time. Check back here for future opportunities.";
