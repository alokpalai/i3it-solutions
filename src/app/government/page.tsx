import type { Metadata } from "next";
import { PageHero } from "@/components/internal/PageHero";
import { ContentSection } from "@/components/internal/ContentSection";
import { FeatureGrid, type FeatureGridItem } from "@/components/internal/FeatureGrid";
import { PageCTA } from "@/components/internal/PageCTA";
import { getSimpleMenuItems } from "@/lib/nav";
import { governmentHighlights } from "@/config/homepage";

export const metadata: Metadata = {
  title: "Government Solutions",
  description:
    "GeM-registered seller supporting technology procurement for government and public-sector organizations.",
};

export default function GovernmentPage() {
  const items: FeatureGridItem[] = getSimpleMenuItems("Government")
    .filter((item) => item.href !== "/government")
    .map((item) => ({ title: item.label, href: item.href }));

  return (
    <>
      <PageHero
        eyebrow="Government"
        title="Government & institutional procurement"
        description="i3it Solutions is a registered seller on the Government e-Marketplace (GeM) — not a Government of India entity — supporting transparent, efficient technology procurement for public-sector organizations."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Government" }]}
      />
      <ContentSection title="How we support government procurement">
        <ul className="flex flex-col gap-3">
          {governmentHighlights.map((point) => (
            <li key={point} className="flex gap-3 text-body text-muted-foreground">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
              {point}
            </li>
          ))}
        </ul>
      </ContentSection>
      <ContentSection title="Explore government solutions" className="bg-surface">
        <FeatureGrid items={items} />
      </ContentSection>
      <PageCTA
        title="Evaluating a government requirement?"
        secondary={{ label: "Contact Sales", href: "/contact" }}
      />
    </>
  );
}
