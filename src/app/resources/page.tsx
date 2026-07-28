import type { Metadata } from "next";
import { PageHero } from "@/components/internal/PageHero";
import { ContentSection } from "@/components/internal/ContentSection";
import { FeatureGrid, type FeatureGridItem } from "@/components/internal/FeatureGrid";
import { PageCTA } from "@/components/internal/PageCTA";
import { getSimpleMenuItems } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Resources",
  description: "Company profile, certificates, brochures, case studies and downloads.",
};

export default function ResourcesPage() {
  const items: FeatureGridItem[] = getSimpleMenuItems("Resources").map((item) => ({
    title: item.label,
    href: item.href,
  }));

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Company resources & downloads"
        description="Reference material for evaluating i3it Solutions as a technology procurement and infrastructure partner."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources" }]}
      />
      <ContentSection title="Browse resources">
        <FeatureGrid items={items} />
      </ContentSection>
      <PageCTA
        title="Can't find what you're looking for?"
        secondary={{ label: "Contact Sales", href: "/contact" }}
      />
    </>
  );
}
