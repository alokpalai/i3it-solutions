import { CompanyHero } from "@/components/company/CompanyHero";
import { MissionCard } from "@/components/company/MissionCard";
import { ValueCard } from "@/components/company/ValueCard";
import { ContentSection } from "@/components/internal/ContentSection";
import { RelatedLinks } from "@/components/internal/RelatedLinks";
import { PageCTA } from "@/components/internal/PageCTA";
import { JsonLd } from "@/components/internal/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { visionMission } from "@/config/internalContent";
import { coreValues, missionCardIcons } from "@/config/companyContent";

export const metadata = buildMetadata({
  title: "Vision & Mission",
  description:
    "i3it Solutions' vision and mission for supporting government, public-sector and enterprise technology procurement.",
  path: "/company/vision-mission",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Company", href: "/company" },
  { label: "Vision & Mission" },
];

// docs/PROJECT.md §5's vision is itself forward-looking ("To be a leading
// force..."), so "Future goals" restates it and the mission pillars as
// forward intent rather than introducing new, unstated targets.
const futureGoals = [
  "Continue building GeM-based procurement capability for government and public-sector buyers",
  "Expand the multi-brand technology portfolio to match a broader range of institutional requirements",
  "Deepen infrastructure integration and after-sales support capability",
  "Work toward supporting digital transformation across India's public sector",
];

export default function VisionMissionPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <CompanyHero
        title="Vision & Mission"
        breadcrumbs={breadcrumbs}
        primaryCta={{ label: "Request Quote", href: "/request-quote" }}
        secondaryCta={{ label: "Back to Company overview", href: "/company" }}
      />

      <ContentSection eyebrow="Vision" title="Where we're headed">
        <p className="max-w-3xl text-h3 text-foreground">{visionMission.vision}</p>
      </ContentSection>

      <ContentSection eyebrow="Mission" title="How we get there" className="bg-surface">
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

      <ContentSection eyebrow="Core Values" title="What guides how we work">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((value) => (
            <ValueCard key={value.title} {...value} />
          ))}
        </div>
      </ContentSection>

      <ContentSection eyebrow="Future Goals" title="What we're working toward" className="bg-surface">
        <ul className="flex flex-col gap-3">
          {futureGoals.map((goal) => (
            <li key={goal} className="flex gap-3 text-body text-muted-foreground">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
              {goal}
            </li>
          ))}
        </ul>
      </ContentSection>

      <RelatedLinks
        title="More about i3it"
        items={[
          { label: "About", href: "/company/about" },
          { label: "Why i3it", href: "/company/why-i3it" },
          { label: "Leadership", href: "/company/leadership" },
        ]}
      />

      <PageCTA title="See how this applies to your requirement" secondary={{ label: "Explore Solutions", href: "/solutions" }} />
    </>
  );
}
