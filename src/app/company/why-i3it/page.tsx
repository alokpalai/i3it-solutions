import { CompanyHero } from "@/components/company/CompanyHero";
import { MissionCard } from "@/components/company/MissionCard";
import { ContentSection } from "@/components/internal/ContentSection";
import { RelatedLinks } from "@/components/internal/RelatedLinks";
import { PageCTA } from "@/components/internal/PageCTA";
import { JsonLd } from "@/components/internal/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { whyI3itPoints } from "@/config/companyContent";

export const metadata = buildMetadata({
  title: "Why i3it",
  description: "What sets i3it Solutions apart — technology expertise, professional procurement, enterprise delivery, multi-brand sourcing, deployment support and lifecycle services.",
  path: "/company/why-i3it",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Company", href: "/company" },
  { label: "Why i3it" },
];

export default function WhyI3itPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <CompanyHero
        title="Why i3it Solutions"
        breadcrumbs={breadcrumbs}
        primaryCta={{ label: "Request Quote", href: "/request-quote" }}
        secondaryCta={{ label: "Back to Company overview", href: "/company" }}
      />

      <ContentSection title="What sets us apart">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyI3itPoints.map((point) => (
            <MissionCard key={point.title} {...point} />
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

      <PageCTA title="Ready to discuss your requirement?" />
    </>
  );
}
