import Link from "next/link";
import { CompanyHero } from "@/components/company/CompanyHero";
import { MissionCard } from "@/components/company/MissionCard";
import { ValueCard } from "@/components/company/ValueCard";
import { Timeline } from "@/components/company/Timeline";
import { ContentSection } from "@/components/internal/ContentSection";
import { IntroSection } from "@/components/internal/IntroSection";
import { PageCTA } from "@/components/internal/PageCTA";
import { JsonLd } from "@/components/internal/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { visionMission } from "@/config/internalContent";
import { whyPoints } from "@/config/homepage";
import { industriesServed } from "@/config/solutionsContent";
import {
  companyOverview,
  missionCardIcons,
  coreValues,
  businessPhilosophy,
  companyTimeline,
} from "@/config/companyContent";

export const metadata = buildMetadata({
  title: "Company",
  description:
    "i3it Solutions is a technology solutions partner for government, public-sector, institutional and enterprise organizations, established 2021.",
  path: "/company",
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Company" }];

export default function CompanyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <CompanyHero
        title="A technology solutions partner for government and enterprise"
        description={companyOverview}
        breadcrumbs={breadcrumbs}
        primaryCta={{ label: "Request Quote", href: "/request-quote" }}
        secondaryCta={{ label: "Read our story", href: "/company/about" }}
      />

      <ContentSection title="Mission">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visionMission.missionPillars.map((pillar, index) => (
            <MissionCard
              key={pillar}
              title={`Pillar ${index + 1}`}
              description={pillar}
              icon={missionCardIcons[index]}
            />
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Vision" className="bg-surface">
        <p className="max-w-3xl text-body-lg text-muted-foreground">{visionMission.vision}</p>
      </ContentSection>

      <ContentSection
        eyebrow="Values"
        title="What guides how we work"
        description="Values already central to how we approach every engagement, not aspirational language added for the website."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((value) => (
            <ValueCard key={value.title} {...value} />
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Business philosophy" className="bg-surface">
        <p className="max-w-3xl text-body-lg text-muted-foreground">{businessPhilosophy}</p>
      </ContentSection>

      <ContentSection title="Industries & sectors we serve">
        <ul className="flex flex-wrap gap-3">
          {industriesServed.map((sector) => (
            <li key={sector}>
              <Badge>{sector}</Badge>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection title="Why i3it Solutions" className="bg-surface">
        <ul className="grid gap-6 sm:grid-cols-2">
          {whyPoints.map((point) => (
            <li key={point.title} className="flex flex-col gap-1">
              <p className="text-h5 text-foreground">{point.title}</p>
              <p className="text-body-sm text-muted-foreground">{point.description}</p>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection title="Our story so far">
        <Timeline entries={companyTimeline} />
      </ContentSection>

      <IntroSection>
        <p className="text-body-sm">
          Looking for more detail? Read our <Link href="/company/about" className="font-medium text-primary hover:underline">full company profile</Link>.
        </p>
      </IntroSection>

      <PageCTA
        title="Want to know more about how we work?"
        secondary={{ label: "Explore Solutions", href: "/solutions" }}
      />
    </>
  );
}
