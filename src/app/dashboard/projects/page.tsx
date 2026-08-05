import type { Metadata } from "next";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { mockProjects } from "@/config/dashboardMockData";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h2 text-foreground">Projects</h1>
        <p className="text-body-sm text-muted-foreground">
          {mockProjects.length} project{mockProjects.length === 1 ? "" : "s"} you&rsquo;re assigned to.
        </p>
      </div>

      {mockProjects.length === 0 ? (
        <p className="text-body-sm text-muted-foreground">You&rsquo;re not assigned to any projects yet.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
