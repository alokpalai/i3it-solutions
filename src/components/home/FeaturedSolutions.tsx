import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { featuredSolutions } from "@/config/homepage";
import { IconCard } from "./IconCard";

export function FeaturedSolutions() {
  if (featuredSolutions.length === 0) return null;

  return (
    <Section spacing="compact">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Solutions"
            title="Solutions we deliver"
            description="A selection of our solution areas — the full taxonomy is organized by the problem you're solving."
          />
          <Button href="/solutions" variant="ghost">
            View all solutions
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredSolutions.map((item) => (
            <IconCard
              key={item.href}
              icon={item.icon}
              title={item.label}
              description={item.description}
              href={item.href}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
