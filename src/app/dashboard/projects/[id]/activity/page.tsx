import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { ProjectActivityFeed } from "@/components/dashboard/ProjectActivityFeed";
import { getProjectById } from "@/lib/projectMetrics";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  return { title: project ? `${project.name} — Activity` : "Project" };
}

export default async function ProjectActivityPage({ params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const items = [...project.activity].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return (
    <div className="flex flex-col gap-4">
      <p className="text-body-sm text-muted-foreground">
        {items.length} event{items.length === 1 ? "" : "s"} recorded for this project, most recent first.
      </p>
      <Card>
        <ProjectActivityFeed items={items} />
      </Card>
    </div>
  );
}
