import { notFound } from "next/navigation";
import { ProjectHeader } from "@/components/dashboard/ProjectHeader";
import { ProjectSidebar } from "@/components/dashboard/ProjectSidebar";
import { getProjectById } from "@/lib/projectMetrics";

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

// Wraps every /dashboard/projects/[id]/* sub-route with the shared header
// and tab navigation. Each sub-page independently re-looks-up the project
// by id (getProjectById is an in-memory find() over 7 mock projects —
// cheap enough that threading it through layout->page via context isn't
// worth the extra machinery).
export default async function ProjectDetailLayout({ children, params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  return (
    <div className="flex flex-col gap-6">
      <ProjectHeader project={project} />
      <ProjectSidebar projectId={project.id} />
      {children}
    </div>
  );
}
