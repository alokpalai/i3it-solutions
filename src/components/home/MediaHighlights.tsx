import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { mediaItems } from "@/config/homepage";

// docs/CONTENT_STRATEGY.md §15: only ship media with a real content
// pipeline. Renders nothing while mediaItems is empty — no fake dated
// articles.
export function MediaHighlights() {
  if (mediaItems.length === 0) return null;

  return (
    <Section className="bg-surface">
      <Container className="flex flex-col gap-8">
        <SectionHeader eyebrow="Media" title="News & updates" />
        <ul className="flex flex-col gap-4">
          {mediaItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-body font-medium text-primary hover:underline">
                {item.title}
              </Link>
              <p className="text-caption text-muted-foreground">{item.date}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
