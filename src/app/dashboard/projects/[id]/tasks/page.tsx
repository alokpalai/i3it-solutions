import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectById, getTasksByProjectId } from "@/lib/projectMetrics";
import { ProjectTasksView } from "@/components/dashboard/ProjectTasksView";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  return { title: project ? `${project.name} — Tasks` : "Project" };
}

export default async function ProjectTasksPage({ params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const tasks = getTasksByProjectId(id);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-body-sm text-muted-foreground">
        {tasks.length} task{tasks.length === 1 ? "" : "s"}. Drag cards between columns on the board — moves
        aren&rsquo;t saved yet, there&rsquo;s no task backend to write to.
      </p>
      {tasks.length === 0 ? (
        <p className="rounded-md border border-dashed border-border px-4 py-10 text-center text-body-sm text-muted-foreground">
          No tasks on this project yet.
        </p>
      ) : (
        <ProjectTasksView tasks={tasks} />
      )}
    </div>
  );
}
