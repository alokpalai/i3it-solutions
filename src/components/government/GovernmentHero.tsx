import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/internal/Breadcrumbs";

type GovernmentHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

// Distinct from the generic internal PageHero (src/components/internal/PageHero.tsx)
// only in supporting a second, secondary CTA button — every Government page
// wants a primary action plus a secondary way to keep exploring, which
// PageHero's single-cta API doesn't cover. Reuses the same
// Breadcrumbs/Section/Container primitives as PageHero, not reimplemented.
export function GovernmentHero({
  eyebrow = "Government",
  title,
  description,
  breadcrumbs,
  primaryCta,
  secondaryCta,
}: GovernmentHeroProps) {
  return (
    <Section spacing="compact" className="border-b border-border bg-surface">
      <Container className="flex flex-col gap-4">
        <Breadcrumbs items={breadcrumbs} />
        <div className="flex flex-col gap-3">
          <p className="text-overline uppercase tracking-wide text-secondary">{eyebrow}</p>
          <h1 className="text-h1 text-foreground">{title}</h1>
          {description && (
            <p className="max-w-2xl text-body-lg text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <Button href={primaryCta.href} variant="accent" size="md">
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button href={secondaryCta.href} variant="secondary" size="md">
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </Container>
    </Section>
  );
}
