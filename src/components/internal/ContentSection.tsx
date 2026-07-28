import { Container } from "@/components/ui/Container";
import { Section, type SectionSpacing } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

type ContentSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  spacing?: SectionSpacing;
  className?: string;
  children: React.ReactNode;
};

// Formalizes the Section + Container (+ optional SectionHeader) composition
// already used ad hoc across the homepage into one named, reusable block
// for internal-page content — a titled group of content, nothing more.
export function ContentSection({
  eyebrow,
  title,
  description,
  spacing = "default",
  className,
  children,
}: ContentSectionProps) {
  return (
    <Section spacing={spacing} className={className}>
      <Container className="flex flex-col gap-8">
        {title && <SectionHeader eyebrow={eyebrow} title={title} description={description} />}
        {children}
      </Container>
    </Section>
  );
}
