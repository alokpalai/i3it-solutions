import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

// Owner-supplied hero graphic.
function HeroGraphic() {
  return (
    <Image
      src="/homepage-hero.png"
      alt=""
      aria-hidden="true"
      width={1434}
      height={1097}
      priority
      className="h-full w-full object-contain"
    />
  );
}

export function Hero() {
  return (
    <Section spacing="compact" className="border-b border-border bg-background">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <p className="text-overline uppercase tracking-wide text-secondary">
            Technology procurement &amp; infrastructure solutions
          </p>
          <h1 className="text-h1 text-foreground lg:text-display">
            IT infrastructure &amp; procurement solutions for government and enterprise
          </h1>
          <p className="max-w-xl text-body-lg text-muted-foreground">
            We help government, public-sector and enterprise organizations source, integrate
            and deploy the right technology — from IT infrastructure and networking to
            specialized systems — with GeM-registered procurement and ongoing support.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/request-quote" variant="accent" size="lg">
              Request Quote
            </Button>
            <Button href="/solutions" variant="secondary" size="lg">
              Explore Solutions
            </Button>
          </div>
        </div>

        <div className="relative mx-auto aspect-[1434/1097] w-full max-w-md lg:max-w-none">
          <HeroGraphic />
        </div>
      </Container>
    </Section>
  );
}
