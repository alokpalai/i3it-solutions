import { Container } from "@/components/ui/Container";
import { Section, type SectionSpacing } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type SplitContentProps = {
  children: React.ReactNode;
  aside: React.ReactNode;
  reverse?: boolean;
  spacing?: SectionSpacing;
};

// Two-column layout for a narrative block paired with related supporting
// content (e.g. a short facts list) — stacks to one column below lg. Used
// where a page has two genuinely distinct but related pieces of content,
// not as a generic "make the page look busier" pattern.
export function SplitContent({ children, aside, reverse = false, spacing = "default" }: SplitContentProps) {
  return (
    <Section spacing={spacing}>
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className={cn("flex flex-col gap-4", reverse && "lg:order-2")}>{children}</div>
        <div className={cn("flex flex-col gap-4", reverse && "lg:order-1")}>{aside}</div>
      </Container>
    </Section>
  );
}
