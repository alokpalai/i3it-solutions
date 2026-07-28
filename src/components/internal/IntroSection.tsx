import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type IntroSectionProps = {
  children: React.ReactNode;
};

// Single-column lead paragraph block directly under PageHero — kept
// separate from PageHero's own (shorter) description so pages needing a
// fuller opening statement aren't forced to cram it into the hero.
export function IntroSection({ children }: IntroSectionProps) {
  return (
    <Section spacing="compact" as="div">
      <Container>
        <div className="max-w-3xl text-body-lg text-muted-foreground [&>p+p]:mt-4">
          {children}
        </div>
      </Container>
    </Section>
  );
}
