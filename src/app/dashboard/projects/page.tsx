import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProjectStats } from "@/components/dashboard/ProjectStats";
import { ProjectTable } from "@/components/dashboard/ProjectTable";
import { mockProjects } from "@/config/dashboardMockData";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-h2 text-foreground">Projects</h1>
          <p className="text-body-sm text-muted-foreground">
            {mockProjects.length} technology implementation project{mockProjects.length === 1 ? "" : "s"}.
          </p>
        </div>
        <Button href="/dashboard/projects/new" variant="accent" size="md">
          <Plus aria-hidden="true" className="h-4 w-4" />
          Create Project
        </Button>
      </div>

      <ProjectStats projects={mockProjects} />

      <Card>
        <ProjectTable projects={mockProjects} />
      </Card>
    </div>
  );
}
