import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/internal/PageHero";
import { IntroSection } from "@/components/internal/IntroSection";
import { ContentSection } from "@/components/internal/ContentSection";
import { FeatureGrid, type FeatureGridItem } from "@/components/internal/FeatureGrid";
import { ProcessSteps } from "@/components/internal/ProcessSteps";
import { PageCTA } from "@/components/internal/PageCTA";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getMegaMenuColumns } from "@/lib/nav";
import { whyPoints, governmentHighlights } from "@/config/homepage";
import { deliveryMethodology, sourcingWorkflow, industriesServed } from "@/config/solutionsContent";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Technology sourcing, integration and support for government, public-sector and enterprise organizations, organized around what you're trying to accomplish.",
};

export default function SolutionsPage() {
  const columns = getMegaMenuColumns("Solutions");

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Technology solutions organized around your requirement"
        description="From government procurement to specialized infrastructure, our solution areas bring together the right technology, integration and support for the problem you're solving."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
        cta={{ label: "Request Quote", href: "/request-quote" }}
      />

      <IntroSection>
        <p>
          i3it Solutions works as a technology solutions partner, not a product reseller —
          understanding a requirement, sourcing the right technology across multiple brands,
          integrating it, deploying it, and supporting it afterward. The solution areas below
          organize that work around what you&rsquo;re actually trying to accomplish.
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

      <ContentSection title="Why choose i3it Solutions">
        <ul className="grid gap-6 sm:grid-cols-2">
          {whyPoints.map((point) => (
            <li key={point.title} className="flex gap-3">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <div>
                <p className="text-h5 text-foreground">{point.title}</p>
                <p className="text-body-sm text-muted-foreground">{point.description}</p>
              </div>
            </li>
          ))}
        </ul>
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

      <ContentSection title="Our delivery methodology">
        <ProcessSteps steps={deliveryMethodology} />
      </ContentSection>

      <ContentSection title="Government & institutional procurement" className="bg-primary [--color-focus-ring:var(--palette-white)]">
        <div className="flex flex-col gap-6">
          <p className="max-w-2xl text-body-lg text-primary-foreground/90">
            i3it Solutions is a registered seller on the Government e-Marketplace (GeM) — not a
            Government of India entity — supporting transparent, efficient technology procurement
            for public-sector organizations.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {governmentHighlights.map((point) => (
              <li key={point} className="flex gap-3 text-body text-primary-foreground/80">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>
          <div>
            <Button href="/government" variant="accent" size="md">
              Explore Government Solutions
            </Button>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="How a requirement becomes an order" className="bg-surface">
        <ProcessSteps steps={sourcingWorkflow} />
      </ContentSection>

      <PageCTA
        title="Have a requirement in mind?"
        description="Tell us what you're trying to solve and we'll help identify the right approach."
        secondary={{ label: "Contact Sales", href: "/contact" }}
      />
    </>
  );
}
