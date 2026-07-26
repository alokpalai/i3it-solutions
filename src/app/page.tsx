import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";

// Temporary Phase 2A development placeholder — confirms the foundation is
// wired up. Not the real homepage; see docs/UX.md §2 for that build.
export default function Home() {
  return (
    <Section className="flex flex-1 items-center">
      <Container className="flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-4">
          <Badge>Frontend foundation established</Badge>
          <h1 className="text-h1 text-foreground">{siteConfig.name}</h1>
          <p className="max-w-xl text-body-lg text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        <Card className="flex flex-col gap-4">
          <p className="text-body-sm text-muted-foreground">
            Design tokens, typography, and base UI primitives — Phase 2A
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
