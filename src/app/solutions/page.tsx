import type { Metadata } from "next";
import { PageHero } from "@/components/internal/PageHero";
import { ContentSection } from "@/components/internal/ContentSection";
import { FeatureGrid, type FeatureGridItem } from "@/components/internal/FeatureGrid";
import { PageCTA } from "@/components/internal/PageCTA";
import { getMegaMenuItems } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Technology sourcing, integration and support for government, public-sector and enterprise organizations, organized around what you're trying to accomplish.",
};

export default function SolutionsPage() {
  const items: FeatureGridItem[] = getMegaMenuItems("Solutions").map((item) => ({
    title: item.label,
    href: item.href,
  }));

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Technology solutions organized around your requirement"
        description="From government procurement to specialized infrastructure, our solution areas bring together the right technology, integration and support for the problem you're solving."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
      />
      <ContentSection title="Explore by solution area">
        <FeatureGrid items={items} />
      </ContentSection>
      <PageCTA
        title="Have a requirement in mind?"
        description="Tell us what you're trying to solve and we'll help identify the right approach."
        secondary={{ label: "Contact Sales", href: "/contact" }}
      />
    </>
  );
}
