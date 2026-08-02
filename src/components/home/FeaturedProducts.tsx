import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { featuredProducts } from "@/config/homepage";
import { IconCard } from "./IconCard";

// B2G/B2B procurement catalogue browsing — no prices, no cart, no ratings.
// Every card terminates in navigation toward the category/RFQ flow, never a
// purchase action (docs/CONTENT_STRATEGY.md §10).
export function FeaturedProducts() {
  if (featuredProducts.length === 0) return null;

  return (
    <Section className="bg-surface">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Products"
            title="Technology we supply"
            description="A curated set of the categories in our portfolio — sourced and supplied on request."
          />
          <Button href="/products" variant="ghost">
            View all products
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((item) => (
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
