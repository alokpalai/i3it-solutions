import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/internal/PageHero";
import { ContentSection } from "@/components/internal/ContentSection";
import { RelatedLinks } from "@/components/internal/RelatedLinks";
import { PageCTA } from "@/components/internal/PageCTA";
import { Badge } from "@/components/ui/Badge";
import { getMegaMenuItems } from "@/lib/nav";
import { productCategoryDetails } from "@/config/productsContent";
import { solutionDetails } from "@/config/solutionsContent";

type Props = { params: Promise<{ slug: string }> };

function findItem(slug: string) {
  return getMegaMenuItems("Products").find((item) => item.href === `/products/${slug}`);
}

export function generateStaticParams() {
  return getMegaMenuItems("Products").map((item) => ({
    slug: item.href.replace("/products/", ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findItem(slug);
  const detail = productCategoryDetails[slug];
  if (!item || !detail) return {};
  return {
    title: item.label,
    description: detail.overview,
  };
}

export default async function ProductCategoryPage({ params }: Props) {
  const { slug } = await params;
  const item = findItem(slug);
  const detail = productCategoryDetails[slug];
  if (!item || !detail) notFound();

  const relatedCategories = getMegaMenuItems("Products").filter((i) => i.href !== item.href);

  const relatedSolutions = Object.entries(solutionDetails)
    .filter(([, solution]) => solution.technologyCategories.some((tc) => tc.href === item.href))
    .map(([solutionSlug]) => {
      const label = getMegaMenuItems("Solutions").find(
        (i) => i.href === `/solutions/${solutionSlug}`,
      )?.label;
      return label ? { label, href: `/solutions/${solutionSlug}` } : null;
    })
    .filter((link): link is { label: string; href: string } => link !== null);

  return (
    <>
      <PageHero
        eyebrow="Products"
        title={item.label}
        description={detail.overview}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: item.label },
        ]}
        cta={{ label: "Request Quote", href: "/request-quote" }}
      />

      <ContentSection title="Typical products supplied">
        <ul className="flex flex-wrap gap-2">
          {detail.typicalProducts.map((product) => (
            <li key={product}>
              <Badge>{product}</Badge>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection title="Use cases" className="bg-surface">
        <ul className="grid gap-4 sm:grid-cols-2">
          {detail.useCases.map((useCase) => (
            <li key={useCase} className="flex gap-3">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <span className="text-body text-foreground">{useCase}</span>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection title="Enterprise deployment scenarios">
        <ul className="flex flex-col gap-3">
          {detail.deploymentScenarios.map((scenario) => (
            <li key={scenario} className="flex gap-3 text-body text-muted-foreground">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
              {scenario}
            </li>
          ))}
        </ul>
      </ContentSection>

      {detail.keyTechnologies.length > 0 && (
        <ContentSection title="Key technologies" className="bg-surface">
          <ul className="flex flex-wrap gap-3">
            {detail.keyTechnologies.map((brand) => (
              <li key={brand}>
                <Badge>{brand}</Badge>
              </li>
            ))}
          </ul>
        </ContentSection>
      )}

      <ContentSection title="Commonly requested configurations">
        <ul className="grid gap-4 sm:grid-cols-2">
          {detail.commonConfigurations.map((configuration) => (
            <li key={configuration} className="flex gap-3">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <span className="text-body text-foreground">{configuration}</span>
            </li>
          ))}
        </ul>
      </ContentSection>

      {relatedSolutions.length > 0 && (
        <RelatedLinks title="Related solutions" items={relatedSolutions} />
      )}

      <RelatedLinks
        title="Related categories"
        items={relatedCategories.map((i) => ({ label: i.label, href: i.href }))}
      />

      <PageCTA
        title={`Discuss your ${item.label.toLowerCase()} requirement`}
        secondary={{ label: "Explore all products", href: "/products" }}
      />
    </>
  );
}
