import { CompanyHero } from "@/components/company/CompanyHero";
import { CareerCard } from "@/components/company/CareerCard";
import { HiringProcess } from "@/components/company/HiringProcess";
import { ContentSection } from "@/components/internal/ContentSection";
import { RelatedLinks } from "@/components/internal/RelatedLinks";
import { PageCTA } from "@/components/internal/PageCTA";
import { JsonLd } from "@/components/internal/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { careersStatus } from "@/config/internalContent";
import {
  careersHeroDescription,
  whyWorkWithUs,
  cultureStatement,
  hiringProcessSteps,
  departments,
  benefitsStatement,
  applicationCtaNote,
} from "@/config/companyContent";

export const metadata = buildMetadata({
  title: "Careers",
  description: "Careers at i3it Solutions — why work with us, our hiring process, and current openings.",
  path: "/company/careers",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Company", href: "/company" },
  { label: "Careers" },
];

// No fabricated job openings, perks, or culture claims — see
// docs/CONTENT_STRATEGY.md §15 and src/config/companyContent.ts for how
// every section here stays traceable to real, already-approved facts.
export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <CompanyHero
        title="Careers at i3it Solutions"
        description={careersHeroDescription}
        breadcrumbs={breadcrumbs}
        primaryCta={{ label: "Contact Sales", href: "/contact" }}
        secondaryCta={{ label: "Back to Company overview", href: "/company" }}
      />

      <ContentSection title="Why work with us">
        <ul className="flex flex-col gap-3">
          {whyWorkWithUs.map((point) => (
            <li key={point} className="flex gap-3 text-body text-muted-foreground">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
              {point}
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection title="How we work" className="bg-surface">
        <p className="max-w-3xl text-body-lg text-muted-foreground">{cultureStatement}</p>
      </ContentSection>

      <ContentSection title="Hiring process">
        <HiringProcess steps={hiringProcessSteps} />
      </ContentSection>

      <ContentSection title="Departments" className="bg-surface">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((dept) => (
            <CareerCard key={dept.title} title={dept.title} description={dept.description} />
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Benefits">
        <p className="max-w-2xl text-body-lg text-muted-foreground">{benefitsStatement}</p>
      </ContentSection>

      <ContentSection title="Current openings" className="bg-surface">
        <p className="max-w-2xl text-body-lg text-muted-foreground">{careersStatus}</p>
        <p className="mt-3 max-w-2xl text-body text-muted-foreground">{applicationCtaNote}</p>
      </ContentSection>

      <RelatedLinks
        title="More about i3it"
        items={[
          { label: "About", href: "/company/about" },
          { label: "Leadership", href: "/company/leadership" },
        ]}
      />

      <PageCTA title="Have a question about working with us?" secondary={{ label: "Contact Sales", href: "/contact" }} />
    </>
  );
}
