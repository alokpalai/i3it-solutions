import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/internal/PageHero";
import { ContentSection } from "@/components/internal/ContentSection";
import { ProcessSteps } from "@/components/internal/ProcessSteps";
import { RelatedLinks } from "@/components/internal/RelatedLinks";
import { PageCTA } from "@/components/internal/PageCTA";
import { getMegaMenuItems } from "@/lib/nav";
import { solutionDetails, deliveryMethodology } from "@/config/solutionsContent";

type Props = { params: Promise<{ slug: string }> };

function findItem(slug: string) {
  return getMegaMenuItems("Solutions").find((item) => item.href === `/solutions/${slug}`);
}

export function generateStaticParams() {
  return getMegaMenuItems("Solutions").map((item) => ({
    slug: item.href.replace("/solutions/", ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findItem(slug);
  const detail = solutionDetails[slug];
  if (!item || !detail) return {};
  return {
    title: item.label,
    description: detail.overview,
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = findItem(slug);
  const detail = solutionDetails[slug];
  if (!item || !detail) notFound();

  const related = getMegaMenuItems("Solutions").filter((i) => i.href !== item.href);

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={item.label}
        description={detail.overview}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: item.label },
        ]}
      />

      <ContentSection title="Key capabilities">
        <ul className="grid gap-4 sm:grid-cols-2">
          {detail.capabilities.map((capability) => (
            <li key={capability} className="flex gap-3">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <span className="text-body text-foreground">{capability}</span>
            </li>
          ))}
        </ul>
      </ContentSection>

      {detail.technologyCategories.length > 0 && (
        <RelatedLinks title="Technology categories" items={detail.technologyCategories} />
      )}

      <ContentSection title="Typical requirements we help with">
        <ul className="flex flex-col gap-3">
          {detail.clientRequirements.map((requirement) => (
            <li key={requirement} className="flex gap-3 text-body text-muted-foreground">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
              {requirement}
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection title="How we deliver this" className="bg-surface">
        <ProcessSteps steps={deliveryMethodology} />
      </ContentSection>

      <ContentSection title="Benefits">
        <ul className="grid gap-4 sm:grid-cols-2">
          {detail.benefits.map((benefit) => (
            <li key={benefit} className="flex gap-3">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <span className="text-body text-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </ContentSection>

      <RelatedLinks
        title="Related solutions"
        items={related.map((i) => ({ label: i.label, href: i.href }))}
      />

      <PageCTA
        title={`Discuss your ${item.label.toLowerCase()} requirement`}
        secondary={{ label: "Explore all solutions", href: "/solutions" }}
      />
    </>
  );
}
