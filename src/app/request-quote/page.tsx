import type { Metadata } from "next";
import { PageHero } from "@/components/internal/PageHero";
import { IntroSection } from "@/components/internal/IntroSection";

// noindex: the RFQ form itself is later Phase 3 work (docs/UX.md §5 defines
// the field plan) — this route shell exists so the site's primary CTA
// (Header, Hero, every PageCTA) resolves to a real page instead of a 404.
export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Request a quote for technology procurement, infrastructure or support.",
  robots: { index: false, follow: true },
};

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request Quote"
        title="Request a quote"
        description="Tell us about your requirement and our team will follow up with the right approach."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Request Quote" }]}
      />
      <IntroSection>
        <p>
          The request-a-quote form is currently being finalized. Once available, it will let you
          submit your requirement — organization, requirement type and a short description — in a
          single step, with the option to add more detail afterward.
        </p>
      </IntroSection>
    </>
  );
}
