import { PageHero } from "@/components/internal/PageHero";
import { ContentSection } from "@/components/internal/ContentSection";
import { RFQForm } from "@/components/contact/RFQForm";
import { JsonLd } from "@/components/internal/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Request a Quote",
  description: "Request a quote for technology procurement, infrastructure or support — organization, requirement and timeline in one form.",
  path: "/request-quote",
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Request Quote" }];

export default function RequestQuotePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <PageHero
        eyebrow="Request Quote"
        title="Request a quote"
        description="Tell us about your requirement — only your organization, contact details and project name are required to get started; everything else helps us scope it faster."
        breadcrumbs={breadcrumbs}
      />

      <ContentSection>
        <div className="mx-auto max-w-3xl">
          <RFQForm />
        </div>
      </ContentSection>
    </>
  );
}
