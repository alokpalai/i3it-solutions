import { GovernmentHero } from "@/components/government/GovernmentHero";
import { GovernmentCapabilities } from "@/components/government/GovernmentCapabilities";
import { WorkflowTimeline } from "@/components/government/WorkflowTimeline";
import { IndustryGrid } from "@/components/government/IndustryGrid";
import { TechnologyGrid } from "@/components/government/TechnologyGrid";
import { ComplianceSection } from "@/components/government/ComplianceSection";
import { GovernmentFAQ } from "@/components/government/GovernmentFAQ";
import { GovernmentCTA } from "@/components/government/GovernmentCTA";
import { ContentSection } from "@/components/internal/ContentSection";
import { JsonLd } from "@/components/internal/JsonLd";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import {
  procurementCapabilities,
  procurementWorkflow,
  industriesServedGov,
  whyChooseGov,
  technologyCategoriesGov,
  complianceIntro,
  compliancePoints,
  complianceCertificationNote,
  governmentLandingFaqs,
} from "@/config/governmentContent";

export const metadata = buildMetadata({
  title: "Government",
  description:
    "i3it Solutions helps government departments, educational institutions, public-sector organizations and enterprises source, deploy and support technology through transparent procurement, including GeM procurement support.",
  path: "/government",
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Government" }];

export default function GovernmentPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqJsonLd(governmentLandingFaqs)} />

      <GovernmentHero
        title="Technology Procurement for Government & Institutional Organizations"
        description="i3it Solutions helps government departments, educational institutions, public-sector organizations and enterprises source, deploy and support technology solutions through transparent procurement processes, including GeM procurement support."
        breadcrumbs={breadcrumbs}
        primaryCta={{ label: "Request Consultation", href: "/request-quote" }}
        secondaryCta={{ label: "Explore Procurement Services", href: "/solutions/government-procurement" }}
      />

      <ContentSection
        eyebrow="Capabilities"
        title="Procurement capabilities"
        description="Technology sourcing, infrastructure and support services available through a single procurement engagement."
      >
        <GovernmentCapabilities items={procurementCapabilities} />
      </ContentSection>

      <ContentSection title="Procurement workflow" className="bg-surface">
        <WorkflowTimeline steps={procurementWorkflow} />
      </ContentSection>

      <ContentSection title="Industries & sectors we serve">
        <IndustryGrid items={industriesServedGov} />
      </ContentSection>

      <ContentSection title="Why choose i3it Solutions" className="bg-surface">
        <GovernmentCapabilities items={whyChooseGov} />
      </ContentSection>

      <ContentSection title="Technology categories">
        <TechnologyGrid items={technologyCategoriesGov} />
      </ContentSection>

      <ContentSection title="Procurement compliance & documentation" className="bg-surface">
        <ComplianceSection
          intro={complianceIntro}
          points={compliancePoints}
          certificationNote={complianceCertificationNote}
        />
      </ContentSection>

      <ContentSection title="Frequently asked questions">
        <GovernmentFAQ items={governmentLandingFaqs} />
      </ContentSection>

      <GovernmentCTA description="Tell us what you're trying to source and we'll help identify the right approach." />
    </>
  );
}
