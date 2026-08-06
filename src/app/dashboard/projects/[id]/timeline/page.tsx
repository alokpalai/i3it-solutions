import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectById, getTasksByProjectId } from "@/lib/projectMetrics";
import { Timeline } from "@/components/dashboard/Timeline";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  return { title: project ? `${project.name} — Timeline` : "Project" };
}

export default async function ProjectTimelinePage({ params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const tasks = getTasksByProjectId(id);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-body-sm text-muted-foreground">
        Milestones and task deadlines plotted across the project timeline, from{" "}
        {new Date(project.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}{" "}
        to{" "}
        {new Date(project.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        . Mock timeline view — not a live scheduling tool.
      </p>
      <div className="overflow-x-auto rounded-md border border-border bg-surface p-6">
        <div className="min-w-[640px]">
          <Timeline project={project} tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
