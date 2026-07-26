import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { capabilities } from "@/config/homepage";
import { IconCard } from "./IconCard";

export function WhatWeDo() {
  return (
    <Section>
      <Container className="flex flex-col gap-10">
        <SectionHeader
          eyebrow="What we do"
          title="Technology procurement, infrastructure and support"
          description="Four capability areas covering how we work with government, institutional and enterprise organizations."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item) => (
            <IconCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              href={item.href}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
