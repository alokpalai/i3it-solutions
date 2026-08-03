import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { credentials } from "@/config/homepage";

// docs/CONTENT_STRATEGY.md §8 / docs/DECISIONS.md §C: ISO/CMMI validity are
// still open verification items, not yet owner-confirmed for publication.
// Renders nothing while credentials is empty — no invented badges/seals.
export function Credentials() {
  if (credentials.length === 0) return null;

  return (
    <Section spacing="compact" className="bg-surface">
      <Container className="flex flex-col gap-10">
        <SectionHeader eyebrow="Credentials" title="Certifications & registrations" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {credentials.map((item) => (
            <Card key={item.name} className="flex flex-col gap-2">
              <h3 className="text-h5 text-foreground">{item.name}</h3>
              <p className="text-body-sm text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
