import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

// Same white-focus-ring override as GovernmentProcurement.tsx — see that
// file for why. Closing CTA bridging into the footer.
export function ProcurementCTA() {
  return (
    <Section
      spacing="compact"
      className="bg-primary [--color-focus-ring:var(--palette-white)]"
    >
      <Container className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-h2 text-primary-foreground">
          Need technology procurement support?
        </h2>
        <p className="max-w-2xl text-body-lg text-primary-foreground/80">
          Tell us about your government, institutional or enterprise technology requirement
          — we&rsquo;ll help you scope, source and deploy the right solution.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Button href="/request-quote" variant="accent" size="lg">
            Request Quote
          </Button>
          {/* Button's "secondary" variant is navy-border/navy-text — illegible
              on this navy section, and none of Button's variants are designed
              for a dark background. Rather than override a variant's own
              conflicting classes (unreliable without tailwind-merge, see
              src/lib/utils.ts), the secondary action is a plain text link. */}
          <Link
            href="/contact"
            className="text-body font-medium text-primary-foreground underline underline-offset-4 hover:text-primary-foreground/80"
          >
            Contact Sales
          </Link>
        </div>
      </Container>
    </Section>
  );
}
