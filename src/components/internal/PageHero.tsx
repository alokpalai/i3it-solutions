import { Button, type ButtonVariant } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  cta?: { label: string; href: string; variant?: ButtonVariant };
};

// Compact, content-oriented hero for internal pages — deliberately smaller
// and simpler than the homepage Hero (no decorative motif, no two-column
// split, fixed text-h1 rather than scaling to text-display). Internal pages
// need to orient a buyer quickly and get to content, not make a first
// impression the way the homepage does.
export function PageHero({ eyebrow, title, description, breadcrumbs, cta }: PageHeroProps) {
  return (
    <Section spacing="compact" className="border-b border-border bg-surface">
      <Container className="flex flex-col gap-4">
        {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
        <div className="flex flex-col gap-3">
          {eyebrow && (
            <p className="text-overline uppercase tracking-wide text-secondary">{eyebrow}</p>
          )}
          <h1 className="text-h1 text-foreground">{title}</h1>
          {description && (
            <p className="max-w-2xl text-body-lg text-muted-foreground">{description}</p>
          )}
        </div>
        {cta && (
          <div className="pt-1">
            <Button href={cta.href} variant={cta.variant ?? "accent"} size="md">
              {cta.label}
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
