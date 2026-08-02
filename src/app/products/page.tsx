import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/internal/PageHero";
import { IntroSection } from "@/components/internal/IntroSection";
import { ContentSection } from "@/components/internal/ContentSection";
import { FeatureGrid, type FeatureGridItem } from "@/components/internal/FeatureGrid";
import { ProcessSteps } from "@/components/internal/ProcessSteps";
import { FAQAccordion } from "@/components/internal/FAQAccordion";
import { PageCTA } from "@/components/internal/PageCTA";
import { Badge } from "@/components/ui/Badge";
import { getMegaMenuColumns, slugFromHref } from "@/lib/nav";
import { productCategoryDetails, productFaqs } from "@/config/productsContent";
import { sourcingWorkflow, industriesServed } from "@/config/solutionsContent";
import { technologyEcosystem } from "@/config/homepage";

export const metadata: Metadata = {
  title: "Products",
  description:
    "A broad, multi-brand technology portfolio spanning computing, infrastructure, networking, security, collaboration and power — sourced and supplied on request.",
};

export default function ProductsPage() {
  const columns = getMegaMenuColumns("Products");

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="A broad, multi-brand technology portfolio"
        description="We source and supply technology across computing, infrastructure, networking, security, collaboration and power categories — matched to your requirement, not sold off a shelf."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        cta={{ label: "Request Quote", href: "/request-quote" }}
      />

      <IntroSection>
        <p>
          i3it Solutions works as a technology sourcing and integration partner rather than a
          retailer — every category below represents a class of technology we can source across
          multiple brands, supply in the quantity you need, and support through installation and
          after. Nothing here is stocked for individual sale; it&rsquo;s sourced against a
          requirement, whether that&rsquo;s a single device or a multi-site rollout.
        </p>
      </IntroSection>

      {columns.map((column, index) => {
        const items: FeatureGridItem[] = column.items.map((item) => ({
          title: item.label,
          href: item.href,
        }));
        return (
          <ContentSection
            key={column.heading}
            title={column.heading}
            spacing="compact"
            className={index % 2 === 1 ? "bg-surface" : undefined}
          >
            <FeatureGrid items={items} columns={3} />
          </ContentSection>
        );
      })}

      <ContentSection
        eyebrow="Technology domains"
        title="What's inside each category"
        description="A closer look at the product types within each category — sourced as described, never as fabricated model numbers or specifications."
      >
        <div className="flex flex-col gap-8">
          {columns.flatMap((column) => column.items).map((item) => {
            const slug = slugFromHref(item.href, "/products");
            const detail = productCategoryDetails[slug];
            if (!detail) return null;
            return (
              <div key={item.href} className="flex flex-col gap-3">
                <p className="text-h5 text-foreground">{item.label}</p>
                <ul className="flex flex-wrap gap-2">
                  {detail.typicalProducts.map((product) => (
                    <li key={product}>
                      <Badge>{product}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </ContentSection>

      <ContentSection title="How a requirement becomes an order" className="bg-surface">
        <ProcessSteps steps={sourcingWorkflow} />
      </ContentSection>

      <ContentSection
        title="Brands we work with"
        description="A multi-brand technology portfolio, sourced and supplied on request."
      >
        <div className="flex flex-col gap-6">
          <ul className="flex flex-wrap gap-3">
            {technologyEcosystem.map((brand) => (
              <li key={brand}>
                <Badge>{brand}</Badge>
              </li>
            ))}
          </ul>
          <Link
            href="/brands"
            className="inline-flex w-fit text-body-sm font-medium text-primary hover:underline"
          >
            View all brands
          </Link>
        </div>
      </ContentSection>

      <ContentSection title="Industries & sectors we serve" className="bg-surface">
        <ul className="flex flex-wrap gap-3">
          {industriesServed.map((sector) => (
            <li key={sector}>
              <Badge>{sector}</Badge>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection title="Frequently asked questions">
        <FAQAccordion items={productFaqs} />
      </ContentSection>

      <PageCTA
        title="Looking for something specific?"
        description="Tell us what you need and we'll help source the right products."
        secondary={{ label: "Browse brands", href: "/brands" }}
      />
    </>
  );
}
