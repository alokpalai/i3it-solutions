import { GovernmentHero } from "@/components/government/GovernmentHero";
import { GovernmentCTA } from "@/components/government/GovernmentCTA";
import { ContentSection } from "@/components/internal/ContentSection";
import { IntroSection } from "@/components/internal/IntroSection";
import { FeatureGrid, type FeatureGridItem } from "@/components/internal/FeatureGrid";
import { JsonLd } from "@/components/internal/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { smartCityOverview, smartCityCapabilities, smartCityIotNote } from "@/config/governmentContent";

export const metadata = buildMetadata({
  title: "Smart City",
  description:
    "Integrated surveillance, networking, digital signage, control rooms, command centers and public connectivity for smart city and municipal projects.",
  path: "/government/smart-city",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "Smart City" },
];

export default function SmartCityPage() {
  const items: FeatureGridItem[] = smartCityCapabilities.map((item) => ({
    title: item.title,
    description: item.description,
    href: item.href,
  }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <GovernmentHero
        eyebrow="Smart City"
        title="Technology infrastructure for smart city & municipal projects"
        description={smartCityOverview}
        breadcrumbs={breadcrumbs}
        primaryCta={{ label: "Request Consultation", href: "/request-quote" }}
        secondaryCta={{ label: "Back to Government overview", href: "/government" }}
      />

      <ContentSection title="What we support">
        <FeatureGrid items={items} columns={3} />
      </ContentSection>

      <IntroSection>
        <p>{smartCityIotNote}</p>
      </IntroSection>

      <GovernmentCTA description="Tell us about your smart city or municipal requirement." />
    </>
  );
}
