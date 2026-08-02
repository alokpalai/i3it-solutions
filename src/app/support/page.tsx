import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/internal/PageHero";
import { ContentSection } from "@/components/internal/ContentSection";
import { FeatureGrid, type FeatureGridItem } from "@/components/internal/FeatureGrid";
import { FAQAccordion } from "@/components/internal/FAQAccordion";
import { PageCTA } from "@/components/internal/PageCTA";
import { JsonLd } from "@/components/internal/JsonLd";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { supportCategories, supportFaq } from "@/config/contactContent";

export const metadata = buildMetadata({
  title: "Support",
  description: "Technical support, warranty, AMC and general help for equipment and solutions supplied by i3it Solutions.",
  path: "/support",
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Support" }];

export default function SupportPage() {
  const categoryItems: FeatureGridItem[] = supportCategories.map((category) => ({
    title: category.title,
    description: category.description,
    href: category.href,
  }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqJsonLd(supportFaq)} />

      <PageHero
        eyebrow="Support"
        title="Support"
        description="Technical support, warranty coordination and general help for equipment and solutions we've supplied."
        breadcrumbs={breadcrumbs}
        cta={{ label: "Contact Support", href: "/contact" }}
      />

      <ContentSection title="Support categories">
        <FeatureGrid items={categoryItems} columns={2} />
      </ContentSection>

      <ContentSection title="Downloads" className="bg-surface">
        <div className="flex flex-col gap-3">
          <p className="max-w-2xl text-body text-muted-foreground">
            Product literature, technical guides and compliance documents are available in our
            download center.
          </p>
          <Link
            href="/resources/downloads"
            className="inline-flex w-fit items-center gap-1.5 text-body-sm font-medium text-primary hover:underline"
          >
            Visit Downloads
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </div>
      </ContentSection>

      <ContentSection title="Frequently asked questions">
        <FAQAccordion items={supportFaq} />
      </ContentSection>

      <ContentSection title="Contact options" className="bg-surface">
        <FeatureGrid
          items={[
            { title: "Contact us", href: "/contact" },
            { title: "Request a quote", href: "/request-quote" },
          ]}
          columns={2}
        />
      </ContentSection>

      <PageCTA title="Need help with something specific?" secondary={{ label: "Request a Quote", href: "/request-quote" }} />
    </>
  );
}
