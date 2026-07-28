import type { Metadata } from "next";
import { PageHero } from "@/components/internal/PageHero";
import { ContentSection } from "@/components/internal/ContentSection";
import { FeatureGrid, type FeatureGridItem } from "@/components/internal/FeatureGrid";
import { PageCTA } from "@/components/internal/PageCTA";
import { getMegaMenuItems } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Products",
  description:
    "A broad, multi-brand technology portfolio spanning computing, infrastructure, networking, security, collaboration and power systems.",
};

export default function ProductsPage() {
  const items: FeatureGridItem[] = getMegaMenuItems("Products").map((item) => ({
    title: item.label,
    href: item.href,
  }));

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="A broad, multi-brand technology portfolio"
        description="Sourced and supplied on request across computing, infrastructure, networking, security, collaboration and power categories."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />
      <ContentSection title="Explore by category">
        <FeatureGrid items={items} />
      </ContentSection>
      <PageCTA
        title="Looking for something specific?"
        description="Let us know what you need and we'll help source the right products."
        secondary={{ label: "Browse brands", href: "/brands" }}
      />
    </>
  );
}
