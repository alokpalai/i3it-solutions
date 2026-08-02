import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/internal/Breadcrumbs";

export type TwoCtaHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

// Shared by GovernmentHero (Phase 3D) and CompanyHero (Phase 3E) — both
// sections want a primary + optional secondary CTA button pair, which the
// generic PageHero (src/components/internal/PageHero.tsx) doesn't support.
// Extracted here once a second section needed the identical structure,
// rather than duplicating the markup a second time.
export function TwoCtaHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  primaryCta,
  secondaryCta,
}: TwoCtaHeroProps) {
  return (
    <Section spacing="compact" className="border-b border-border bg-surface">
      <Container className="flex flex-col gap-4">
        <Breadcrumbs items={breadcrumbs} />
        <div className="flex flex-col gap-3">
          {eyebrow && (
            <p className="text-overline uppercase tracking-wide text-secondary">{eyebrow}</p>
          )}
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
