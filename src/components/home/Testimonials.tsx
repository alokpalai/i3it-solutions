import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { testimonials } from "@/config/homepage";

// No approved testimonial exists — no name, title, department or quote is
// invented. Renders nothing while testimonials is empty.
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section spacing="compact">
      <Container className="flex flex-col gap-10">
        <SectionHeader eyebrow="Testimonials" title="What clients say" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name} className="flex flex-col gap-3">
              <p className="text-body-sm text-foreground">&ldquo;{item.quote}&rdquo;</p>
              <p className="text-caption text-muted-foreground">
                {item.name}, {item.title} &middot; {item.organization}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
