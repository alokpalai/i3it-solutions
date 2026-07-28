import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/internal/PageHero";
import { ContentSection } from "@/components/internal/ContentSection";
import { RelatedLinks } from "@/components/internal/RelatedLinks";
import { PageCTA } from "@/components/internal/PageCTA";
import { getSimpleMenuItems } from "@/lib/nav";
import { visionMission, certificationsStatus, careersStatus } from "@/config/internalContent";
import { whyPoints } from "@/config/homepage";
import { CheckCircle2 } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

function sectionItems() {
  return getSimpleMenuItems("Company").filter((item) => item.href.startsWith("/company/"));
}

function findItem(slug: string) {
  return sectionItems().find((item) => item.href === `/company/${slug}`);
}

export function generateStaticParams() {
  return sectionItems().map((item) => ({ slug: item.href.replace("/company/", "") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) return {};
  return { title: item.label, description: `${item.label} — i3it Solutions.` };
}

// Unlike the Solutions/Products/Government/Resources detail templates, each
// Company sub-page here has real, already-approved content (docs/PROJECT.md
// §5/§6, or content reused from src/config/homepage.ts) rather than a
// generic shell — so this route renders per-slug content directly instead
// of a uniform placeholder.
export default async function CompanyDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) notFound();

  const related = sectionItems().filter((i) => i.href !== item.href);
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Company", href: "/about" },
    { label: item.label },
  ];
  const relatedLinks = related.map((i) => ({ label: i.label, href: i.href }));

  if (slug === "vision-mission") {
    return (
      <>
        <PageHero eyebrow="Company" title="Vision & Mission" breadcrumbs={breadcrumbs} />
        <ContentSection title="Vision">
          <p className="max-w-3xl text-body-lg text-muted-foreground">{visionMission.vision}</p>
        </ContentSection>
        <ContentSection title="Mission" className="bg-surface">
          <ul className="flex flex-col gap-4">
            {visionMission.missionPillars.map((pillar) => (
              <li key={pillar} className="flex gap-3">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <span className="text-body text-foreground">{pillar}</span>
              </li>
            ))}
          </ul>
        </ContentSection>
        <RelatedLinks title="More about i3it" items={relatedLinks} />
        <PageCTA title="See how this applies to your requirement" secondary={{ label: "Explore Solutions", href: "/solutions" }} />
      </>
    );
  }

  if (slug === "why-i3it") {
    return (
      <>
        <PageHero eyebrow="Company" title="Why i3it Solutions" breadcrumbs={breadcrumbs} />
        <ContentSection title="What sets us apart">
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
        <RelatedLinks title="More about i3it" items={relatedLinks} />
        <PageCTA title="Ready to discuss your requirement?" />
      </>
    );
  }

  if (slug === "certifications") {
    return (
      <>
        <PageHero eyebrow="Company" title="Certifications & Registrations" breadcrumbs={breadcrumbs} />
        <ContentSection title="Current status">
          <p className="max-w-2xl text-body-lg text-muted-foreground">
            {certificationsStatus.gemStatement}
          </p>
          <p className="max-w-2xl text-body text-muted-foreground">
            {certificationsStatus.pendingStatement}
          </p>
        </ContentSection>
        <RelatedLinks title="More about i3it" items={relatedLinks} />
        <PageCTA title="Have a compliance question?" secondary={{ label: "Contact Sales", href: "/contact" }} />
      </>
    );
  }

  // careers
  return (
    <>
      <PageHero eyebrow="Company" title="Careers" breadcrumbs={breadcrumbs} />
      <ContentSection title="Open positions">
        <p className="max-w-2xl text-body-lg text-muted-foreground">{careersStatus}</p>
      </ContentSection>
      <RelatedLinks title="More about i3it" items={relatedLinks} />
      <PageCTA title="Have a question about working with us?" secondary={{ label: "Contact Sales", href: "/contact" }} />
    </>
  );
}
