import { GovernmentHero } from "@/components/government/GovernmentHero";
import { GovernmentCTA } from "@/components/government/GovernmentCTA";
import { ContentSection } from "@/components/internal/ContentSection";
import { IntroSection } from "@/components/internal/IntroSection";
import { FeatureGrid, type FeatureGridItem } from "@/components/internal/FeatureGrid";
import { JsonLd } from "@/components/internal/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { defenceOverview, defenceCapabilities, missionSupportNote } from "@/config/governmentContent";

export const metadata = buildMetadata({
  title: "Defence",
  description:
    "Standard technology infrastructure — secure networking, computing, storage and power backup — for defence and security-adjacent organizations.",
  path: "/government/defence",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "Defence" },
];

// Conservative wording throughout, per the phase brief: no military claims,
// no combat/weapons-system language, no implied classified-project detail.
export default function DefencePage() {
  const items: FeatureGridItem[] = defenceCapabilities.map((item) => ({
    title: item.title,
    description: item.description,
    href: item.href,
  }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <GovernmentHero
        eyebrow="Defence"
        title="Technology infrastructure for defence-adjacent organizations"
        description={defenceOverview}
        breadcrumbs={breadcrumbs}
        primaryCta={{ label: "Request Consultation", href: "/request-quote" }}
        secondaryCta={{ label: "Back to Government overview", href: "/government" }}
      />

      <ContentSection title="What we support">
        <FeatureGrid items={items} columns={3} />
      </ContentSection>

      <IntroSection>
        <p>{missionSupportNote}</p>
      </IntroSection>

      <GovernmentCTA description="Tell us about your infrastructure requirement." />
    </>
  );
}
