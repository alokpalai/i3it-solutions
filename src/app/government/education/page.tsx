import { GovernmentHero } from "@/components/government/GovernmentHero";
import { GovernmentCTA } from "@/components/government/GovernmentCTA";
import { ContentSection } from "@/components/internal/ContentSection";
import { FeatureGrid, type FeatureGridItem } from "@/components/internal/FeatureGrid";
import { JsonLd } from "@/components/internal/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { educationOverview, educationSolutions } from "@/config/governmentContent";

export const metadata = buildMetadata({
  title: "Education",
  description:
    "Computer labs, interactive panels, campus WiFi, servers, networking, attendance systems, CCTV, library technology and digital classrooms for schools, universities and research institutes.",
  path: "/government/education",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "Education" },
];

export default function EducationPage() {
  const items: FeatureGridItem[] = educationSolutions.map((item) => ({
    title: item.title,
    description: item.description,
    href: item.href,
  }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <GovernmentHero
        eyebrow="Education"
        title="Technology solutions for educational institutions"
        description={educationOverview}
        breadcrumbs={breadcrumbs}
        primaryCta={{ label: "Request Consultation", href: "/request-quote" }}
        secondaryCta={{ label: "Back to Government overview", href: "/government" }}
      />

      <ContentSection title="Solutions for schools, universities and research institutes">
        <FeatureGrid items={items} columns={3} />
      </ContentSection>

      <GovernmentCTA description="Tell us about your institution's requirement." />
    </>
  );
}
