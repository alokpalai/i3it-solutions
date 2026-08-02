import { GovernmentHero } from "@/components/government/GovernmentHero";
import { GovernmentFAQ } from "@/components/government/GovernmentFAQ";
import { GovernmentCTA } from "@/components/government/GovernmentCTA";
import { ContentSection } from "@/components/internal/ContentSection";
import { JsonLd } from "@/components/internal/JsonLd";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { governmentFaqGroups } from "@/config/governmentContent";

export const metadata = buildMetadata({
  title: "Government FAQ",
  description:
    "Frequently asked questions about government procurement, GeM, delivery, deployment, warranty, support and the procurement process.",
  path: "/government/faq",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "Government FAQ" },
];

export default function GovernmentFaqPage() {
  const allFaqs = governmentFaqGroups.flatMap((group) => group.items);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqJsonLd(allFaqs)} />

      <GovernmentHero
        eyebrow="Government FAQ"
        title="Frequently asked questions"
        description="Common questions about government procurement, GeM, delivery, deployment, warranty and support."
        breadcrumbs={breadcrumbs}
        primaryCta={{ label: "Request Consultation", href: "/request-quote" }}
        secondaryCta={{ label: "Back to Government overview", href: "/government" }}
      />

      <ContentSection>
        <GovernmentFAQ groups={governmentFaqGroups} />
      </ContentSection>

      <GovernmentCTA description="Still have a question about procurement?" />
    </>
  );
}
