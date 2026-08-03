import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { technologyEcosystem } from "@/config/homepage";

// Names only, no logos (docs/INFORMATION_ARCHITECTURE.md §4.1/§4.2) — every
// brand's relationshipType is still TBD, so this uses neutral "brands we
// work with" framing, never "Partner"/"Authorized"/"Certified" language.
export function TechnologyEcosystem() {
  return (
    <Section spacing="compact">
      <Container className="flex flex-col gap-8">
        <SectionHeader
          eyebrow="Technology ecosystem"
          title="Brands we work with"
          description="We source across a broad set of technology brands to match the right product to your requirement."
        />
        <div className="flex flex-wrap gap-3">
          {technologyEcosystem.map((brand) => (
            <Badge key={brand}>{brand}</Badge>
          ))}
        </div>
        <div>
          <Button href="/brands" variant="ghost">
            View all brands
          </Button>
        </div>
      </Container>
    </Section>
  );
}
