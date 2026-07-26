import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { whyPoints } from "@/config/homepage";

export function WhyI3it() {
  return (
    <Section className="bg-surface">
      <Container className="flex flex-col gap-10">
        <SectionHeader title="Why i3it Solutions" />
        <div className="grid gap-x-8 gap-y-6 lg:grid-cols-2">
          {whyPoints.map((point) => (
            <div key={point.title} className="flex gap-4">
              <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0 text-secondary" />
              <div className="flex flex-col gap-1">
                <h3 className="text-h5 text-foreground">{point.title}</h3>
                <p className="text-body-sm text-muted-foreground">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
