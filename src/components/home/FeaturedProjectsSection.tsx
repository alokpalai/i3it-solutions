import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { featuredProjects } from "@/config/homepage";

// docs/INFORMATION_ARCHITECTURE.md §7: no project case study is invented.
// Renders nothing while featuredProjects is empty — not three fabricated
// case studies to fill a grid.
export function FeaturedProjectsSection() {
  if (featuredProjects.length === 0) return null;

  return (
    <Section spacing="compact">
      <Container className="flex flex-col gap-10">
        <SectionHeader eyebrow="Experience" title="Featured projects" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <Card key={project.title} className="flex flex-col gap-2">
              <h3 className="text-h5 text-foreground">{project.title}</h3>
              <p className="text-body-sm text-muted-foreground">{project.scope}</p>
              <p className="text-caption text-muted-foreground">
                {project.clientCategory} &middot; {project.solutionCategory} &middot;{" "}
                {project.year}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
