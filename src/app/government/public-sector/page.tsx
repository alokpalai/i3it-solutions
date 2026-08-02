import { GovernmentHero } from "@/components/government/GovernmentHero";
import { GovernmentCTA } from "@/components/government/GovernmentCTA";
import { ContentSection } from "@/components/internal/ContentSection";
import { FeatureGrid, type FeatureGridItem } from "@/components/internal/FeatureGrid";
import { JsonLd } from "@/components/internal/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { publicSectorOverview, publicSectorCapabilities } from "@/config/governmentContent";

export const metadata = buildMetadata({
  title: "Public Sector",
  description:
    "Technology procurement, networking, servers, storage, security, power, deployment and support for public sector undertakings and public institutions.",
  path: "/government/public-sector",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "Public Sector" },
];

export default function PublicSectorPage() {
  const items: FeatureGridItem[] = publicSectorCapabilities.map((item) => ({
    title: item.title,
    description: item.description,
    href: item.href,
  }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <GovernmentHero
        eyebrow="Public Sector"
        title="Technology procurement for public sector organizations"
        description={publicSectorOverview}
        breadcrumbs={breadcrumbs}
        primaryCta={{ label: "Request Consultation", href: "/request-quote" }}
        secondaryCta={{ label: "Back to Government overview", href: "/government" }}
      />

      <ContentSection title="What we support">
        <FeatureGrid items={items} columns={2} />
      </ContentSection>

      <GovernmentCTA description="Tell us about your public sector requirement." />
    </>
  );
}
