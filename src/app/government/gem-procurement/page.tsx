import { CheckCircle2 } from "lucide-react";
import { GovernmentHero } from "@/components/government/GovernmentHero";
import { WorkflowTimeline } from "@/components/government/WorkflowTimeline";
import { GovernmentFAQ } from "@/components/government/GovernmentFAQ";
import { GovernmentCTA } from "@/components/government/GovernmentCTA";
import { ContentSection } from "@/components/internal/ContentSection";
import { JsonLd } from "@/components/internal/JsonLd";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import {
  gemWhatIsGem,
  gemRoleStatement,
  gemBenefits,
  procurementWorkflow,
  whyOrganizationsChooseGem,
  howI3itSupportsGem,
  gemFaqs,
} from "@/config/governmentContent";

export const metadata = buildMetadata({
  title: "GeM Procurement",
  description:
    "i3it Solutions is a registered seller on the Government e-Marketplace (GeM), supporting government departments and institutions through transparent GeM procurement.",
  path: "/government/gem-procurement",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "GeM Procurement" },
];

export default function GemProcurementPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqJsonLd(gemFaqs)} />

      <GovernmentHero
        eyebrow="GeM Procurement"
        title="Government e-Marketplace (GeM) procurement support"
        description={gemRoleStatement}
        breadcrumbs={breadcrumbs}
        primaryCta={{ label: "Request Consultation", href: "/request-quote" }}
        secondaryCta={{ label: "Back to Government overview", href: "/government" }}
      />

      <ContentSection title="What is GeM">
        <p className="max-w-3xl text-body-lg text-muted-foreground">{gemWhatIsGem}</p>
      </ContentSection>

      <ContentSection title="Benefits of procuring through GeM" className="bg-surface">
        <ul className="grid gap-4 sm:grid-cols-2">
          {gemBenefits.map((benefit) => (
            <li key={benefit} className="flex gap-3">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <span className="text-body text-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection title="GeM procurement process">
        <WorkflowTimeline steps={procurementWorkflow} />
      </ContentSection>

      <ContentSection title="Why organizations choose GeM" className="bg-surface">
        <ul className="flex flex-col gap-3">
          {whyOrganizationsChooseGem.map((point) => (
            <li key={point} className="flex gap-3 text-body text-muted-foreground">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
              {point}
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection title="How i3it Solutions supports GeM procurement">
        <ul className="flex flex-col gap-3">
          {howI3itSupportsGem.map((point) => (
            <li key={point} className="flex gap-3 text-body text-muted-foreground">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
              {point}
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection title="Frequently asked questions" className="bg-surface">
        <GovernmentFAQ items={gemFaqs} />
      </ContentSection>

      <GovernmentCTA title="Have a GeM requirement in mind?" />
    </>
  );
}
