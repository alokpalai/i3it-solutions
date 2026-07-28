import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export type RelatedLink = { label: string; href: string };

type RelatedLinksProps = {
  title: string;
  items: RelatedLink[];
};

// Cross-navigation to sibling pages within the same section (e.g. other
// Solutions categories) — driven entirely by src/config/navigation.ts, so it
// can never surface a route that isn't already an approved nav entry.
export function RelatedLinks({ title, items }: RelatedLinksProps) {
  if (items.length === 0) return null;

  return (
    <Section spacing="compact" className="bg-surface">
      <Container className="flex flex-col gap-6">
        <SectionHeader title={title} headingLevel="h3" />
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex items-center gap-1.5 text-body-sm font-medium text-primary hover:underline"
              >
                {item.label}
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
