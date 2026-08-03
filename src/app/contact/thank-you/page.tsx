import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { thankYouMessage } from "@/config/contactContent";

// noindex: a post-submission confirmation page, not content meant to be
// found via search (docs/SEO.md §1).
export const metadata = buildMetadata({
  title: "Thank You",
  description: "Your enquiry has been received.",
  path: "/contact/thank-you",
  noindex: true,
});

// No fabricated response-time SLA (docs/CONTENT_STRATEGY.md §14) and no
// reference number, since no backend yet generates one (Phase 3G brief:
// architecture only, no production email/CRM integration).
export default function ThankYouPage() {
  return (
    <Section className="flex items-center">
      <Container className="flex flex-col items-center gap-6 py-12 text-center">
        <CheckCircle2 aria-hidden="true" className="h-12 w-12 text-success" />
        <div className="flex flex-col gap-3">
          <h1 className="text-h1 text-foreground">Thank you</h1>
          <p className="max-w-xl text-body-lg text-muted-foreground">{thankYouMessage}</p>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="accent" size="md">
            Return Home
          </Button>
          <Button href="/products" variant="secondary" size="md">
            Explore Products
          </Button>
          <Button href="/solutions" variant="secondary" size="md">
            Explore Solutions
          </Button>
        </div>
      </Container>
    </Section>
  );
}
