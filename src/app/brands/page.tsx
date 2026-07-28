import type { Metadata } from "next";
import { PageHero } from "@/components/internal/PageHero";
import { ContentSection } from "@/components/internal/ContentSection";
import { Badge } from "@/components/ui/Badge";
import { technologyEcosystem } from "@/config/homepage";

export const metadata: Metadata = {
  title: "Brands",
  description: "Technology brands in the i3it Solutions portfolio.",
};

// Reuses the same approved, neutral brand-name list already used on the
// homepage's Technology Ecosystem section (docs/INFORMATION_ARCHITECTURE.md
// §4.1/§4.2) — names only, no logos, no "Partner"/"Authorized" language,
// since every brand's relationshipType is still TBD (§4.3). Individual
// /brands/[brand-slug] detail pages are docs/ROADMAP.md Phase 4 scope.
export default function BrandsPage() {
  return (
    <>
      <PageHero
        eyebrow="Brands"
        title="Brands we work with"
        description="A multi-brand technology portfolio, sourced and supplied on request."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Brands" }]}
      />
      <ContentSection>
        <ul className="flex flex-wrap gap-3">
          {technologyEcosystem.map((brand) => (
            <li key={brand}>
              <Badge>{brand}</Badge>
            </li>
          ))}
        </ul>
      </ContentSection>
    </>
  );
}
