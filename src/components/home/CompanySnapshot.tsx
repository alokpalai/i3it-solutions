import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { companySnapshot } from "@/config/homepage";
import { IconCard } from "./IconCard";

export function CompanySnapshot() {
  return (
    <Section spacing="compact" className="bg-surface">
      <Container className="flex flex-col gap-10">
        <SectionHeader title="i3it Solutions at a glance" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {companySnapshot.map((item) => (
            <IconCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
