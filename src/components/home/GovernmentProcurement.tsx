import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { governmentHighlights } from "@/config/homepage";

// Dark navy treatment per docs/DESIGN_SYSTEM.md's institutional direction —
// government procurement is the primary differentiator (docs/PROJECT.md §8)
// and gets a visually distinct section. The GeM-seller-not-government-entity
// distinction (docs/CONTENT_STRATEGY.md §6) is stated explicitly, not implied.
export function GovernmentProcurement() {
  return (
    // The global focus ring (--color-focus-ring) is navy, invisible against
    // this section's navy background — docs/DESIGN_SYSTEM.md §7 explicitly
    // calls for a white ring on dark surfaces. Overriding the same variable
    // locally cascades it to the CTA button without touching the sitewide
    // default.
    <Section spacing="compact" className="bg-primary [--color-focus-ring:var(--palette-white)]">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="flex flex-col gap-4">
          <p className="text-overline uppercase tracking-wide text-primary-foreground/70">
            Government &amp; institutional procurement
          </p>
          <h2 className="text-h2 text-primary-foreground">
            Supporting government and public-sector technology procurement
          </h2>
          <p className="text-body-lg text-primary-foreground/80">
            i3it Solutions is a GeM-registered seller — not a government entity — working
            within the Government e-Marketplace to support transparent, efficient
            procurement, deployment and support for government departments, public sector
            undertakings and institutional organizations.
          </p>
          <div>
            <Button href="/government" variant="accent" size="lg">
              Explore Government Capabilities
            </Button>
          </div>
        </div>

        <ul className="flex flex-col gap-4 self-center">
          {governmentHighlights.map((item) => (
            <li key={item} className="flex gap-3">
              <CheckCircle2
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-primary-foreground/70"
              />
              <span className="text-body text-primary-foreground/90">{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
