import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

// Purely decorative network/infrastructure motif — original, hand-authored
// SVG (not sourced from anywhere), aria-hidden since it conveys no
// information of its own. Static, no animation library needed.
function InfrastructureMotif() {
  const nodes = [
    [40, 40],
    [160, 20],
    [260, 70],
    [90, 130],
    [220, 160],
    [40, 210],
    [180, 240],
    [300, 200],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 3],
    [3, 4],
    [2, 4],
    [3, 5],
    [3, 6],
    [4, 6],
    [4, 7],
    [6, 7],
  ];

  return (
    <svg
      viewBox="0 0 340 280"
      aria-hidden="true"
      className="h-full w-full text-primary"
      fill="none"
    >
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1.5"
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={i % 3 === 0 ? 5 : 3.5}
          fill="currentColor"
          fillOpacity={i % 3 === 0 ? 0.5 : 0.28}
        />
      ))}
    </svg>
  );
}

export function Hero() {
  return (
    <Section spacing="spacious" className="border-b border-border bg-background">
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

        <div className="relative mx-auto aspect-[340/280] w-full max-w-md lg:max-w-none">
          <InfrastructureMotif />
        </div>
      </Container>
    </Section>
  );
}
