import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { requestQuoteLink } from "@/config/navigation";

type PageCTAProps = {
  title: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

// Configurable CTA banner for the bottom of internal pages — mirrors the
// safe navy-section pattern already used by
// src/components/home/ProcurementCTA.tsx (accent Button + plain underlined
// Link for the secondary action, never Button's secondary/ghost variants on
// a navy background — see that component's comments for why). Defaults to
// Request Quote when the caller doesn't specify a primary CTA, since that's
// the site's standing default conversion path (docs/DECISIONS.md B14).
export function PageCTA({ title, description, primary = requestQuoteLink, secondary }: PageCTAProps) {
  return (
    <Section spacing="compact" className="bg-primary [--color-focus-ring:var(--palette-white)]">
      <Container className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-h3 text-primary-foreground">{title}</h2>
          {description && <p className="text-body text-primary-foreground/80">{description}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-5">
          <Button href={primary.href} variant="accent" size="md">
            {primary.label}
          </Button>
          {secondary && (
            <Link
              href={secondary.href}
              className="text-body-sm font-medium text-primary-foreground underline underline-offset-4 hover:text-primary-foreground/80"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </Container>
    </Section>
  );
}
