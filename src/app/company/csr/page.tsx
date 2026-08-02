import { CompanyHero } from "@/components/company/CompanyHero";
import { ValueCard } from "@/components/company/ValueCard";
import { ContentSection } from "@/components/internal/ContentSection";
import { RelatedLinks } from "@/components/internal/RelatedLinks";
import { PageCTA } from "@/components/internal/PageCTA";
import { JsonLd } from "@/components/internal/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { csrDisclaimer, csrFocusAreas } from "@/config/companyContent";

export const metadata = buildMetadata({
  title: "Corporate Social Responsibility",
  description: "i3it Solutions' focus areas for corporate responsibility — technology for education, digital inclusion, environmental awareness and ethical business practices.",
  path: "/company/csr",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Company", href: "/company" },
  { label: "CSR" },
];

// Every focus area describes intent/commitment, not a completed project —
// see the disclaimer rendered directly on the page and
// src/config/companyContent.ts's header comment.
export default function CsrPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <CompanyHero
        title="Corporate Social Responsibility"
        breadcrumbs={breadcrumbs}
        primaryCta={{ label: "Request Quote", href: "/request-quote" }}
        secondaryCta={{ label: "Back to Company overview", href: "/company" }}
      />

      <ContentSection title="Our approach">
        <p className="max-w-3xl text-body-lg text-muted-foreground">{csrDisclaimer}</p>
      </ContentSection>

      <ContentSection title="Focus areas" className="bg-surface">
        <div className="grid gap-6 sm:grid-cols-2">
          {csrFocusAreas.map((area) => (
            <ValueCard key={area.title} {...area} />
          ))}
        </div>
      </ContentSection>

      <RelatedLinks
        title="More about i3it"
        items={[
          { label: "About", href: "/company/about" },
          { label: "Vision & Mission", href: "/company/vision-mission" },
        ]}
      />

      <PageCTA title="Want to know more about how we work?" secondary={{ label: "Contact Sales", href: "/contact" }} />
    </>
  );
}
