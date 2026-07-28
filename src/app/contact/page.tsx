import type { Metadata } from "next";
import { PageHero } from "@/components/internal/PageHero";
import { IntroSection } from "@/components/internal/IntroSection";
import { PageCTA } from "@/components/internal/PageCTA";

// noindex: no contact form or confirmed contact details exist yet
// (docs/CONTENT_STRATEGY.md §9.2 — phone/email are not owner-confirmed for
// public display, so this page cannot show them). Route shell only; the
// real contact form is later Phase 3 work.
export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with i3it Solutions.",
  robots: { index: false, follow: true },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <IntroSection>
        <p>
          Our contact form is currently being finalized. In the meantime, the fastest way to
          reach us is to request a quote for your requirement.
        </p>
      </IntroSection>
      <PageCTA title="Ready to start?" description="Tell us what you need and we'll follow up." />
    </>
  );
}
