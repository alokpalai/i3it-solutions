import { CheckCircle2 } from "lucide-react";
import { CompanyHero } from "@/components/company/CompanyHero";
import { IconCard } from "@/components/home/IconCard";
import { ContentSection } from "@/components/internal/ContentSection";
import { SplitContent } from "@/components/internal/SplitContent";
import { FeatureGrid, type FeatureGridItem } from "@/components/internal/FeatureGrid";
import { PageCTA } from "@/components/internal/PageCTA";
import { JsonLd } from "@/components/internal/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { companySnapshot, capabilities } from "@/config/homepage";
import { industriesServed } from "@/config/solutionsContent";
import { getMegaMenuColumns } from "@/lib/nav";
import { companyHistory, enterpriseApproachPoints } from "@/config/companyContent";

export const metadata = buildMetadata({
  title: "About",
  description:
    "i3it Solutions is an IT procurement, infrastructure and technology solutions partner for government, public-sector, institutional and enterprise organizations. Established 2021.",
  path: "/company/about",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Company", href: "/company" },
  { label: "About" },
];

export default function AboutPage() {
  const technologyAreas: FeatureGridItem[] = getMegaMenuColumns("Products")
    .flatMap((column) => column.items)
    .map((item) => ({ title: item.label, href: item.href }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <CompanyHero
        title="About i3it Solutions"
        breadcrumbs={breadcrumbs}
        primaryCta={{ label: "Request Quote", href: "/request-quote" }}
        secondaryCta={{ label: "Read our Vision & Mission", href: "/company/vision-mission" }}
      />

      <ContentSection title="History">
        <p className="max-w-3xl text-body-lg text-muted-foreground">{companyHistory}</p>
      </ContentSection>

      <ContentSection title="Business focus" className="bg-surface">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((pillar) => (
            <IconCard
              key={pillar.title}
              icon={pillar.icon}
              title={pillar.title}
              description={pillar.description}
              href={pillar.href}
            />
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Technology areas">
        <FeatureGrid items={technologyAreas} columns={3} />
      </ContentSection>

      <ContentSection title="Industries" className="bg-surface">
        <ul className="flex flex-wrap gap-3">
          {industriesServed.map((sector) => (
            <li key={sector}>
              <Badge>{sector}</Badge>
            </li>
          ))}
        </ul>
      </ContentSection>

      <SplitContent
        aside={
          <ul className="flex flex-col gap-4">
            {companySnapshot.map((item) => (
              <li key={item.title} className="border-l-2 border-secondary pl-4">
                <p className="text-h5 text-foreground">{item.title}</p>
                <p className="text-body-sm text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </ul>
        }
      >
        <p className="text-h3 text-foreground">Enterprise approach</p>
        <ul className="flex flex-col gap-3">
          {enterpriseApproachPoints.map((point) => (
            <li key={point} className="flex gap-3">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <span className="text-body text-muted-foreground">{point}</span>
            </li>
          ))}
        </ul>
      </SplitContent>

      <PageCTA
        title="Want to know more about how we work?"
        secondary={{ label: "Read our Vision & Mission", href: "/company/vision-mission" }}
      />
    </>
  );
}
