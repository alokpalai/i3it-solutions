import { CompanyHero } from "@/components/company/CompanyHero";
import { LeadershipSection } from "@/components/company/LeadershipSection";
import { ContentSection } from "@/components/internal/ContentSection";
import { RelatedLinks } from "@/components/internal/RelatedLinks";
import { PageCTA } from "@/components/internal/PageCTA";
import { JsonLd } from "@/components/internal/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { leadershipIntro, leadershipPhilosophy, leadershipPlaceholderNote } from "@/config/companyContent";

export const metadata = buildMetadata({
  title: "Leadership",
  description: "How i3it Solutions' leadership approaches client engagements — introduction and management philosophy.",
  path: "/company/leadership",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Company", href: "/company" },
  { label: "Leadership" },
];

// No individual directors/profiles are invented here — see
// src/components/company/LeadershipSection.tsx.
export default function LeadershipPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <CompanyHero
        title="Leadership"
        breadcrumbs={breadcrumbs}
        primaryCta={{ label: "Request Quote", href: "/request-quote" }}
        secondaryCta={{ label: "Back to Company overview", href: "/company" }}
      />

      <ContentSection title="Management philosophy">
        <LeadershipSection
          intro={leadershipIntro}
          philosophy={leadershipPhilosophy}
          placeholderNote={leadershipPlaceholderNote}
        />
      </ContentSection>

      <RelatedLinks
        title="More about i3it"
        items={[
          { label: "About", href: "/company/about" },
          { label: "Vision & Mission", href: "/company/vision-mission" },
          { label: "Careers", href: "/company/careers" },
        ]}
      />

      <PageCTA title="Have a question for our team?" secondary={{ label: "Contact Sales", href: "/contact" }} />
    </>
  );
}
