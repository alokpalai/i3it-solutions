import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ProjectHealthBadge } from "@/components/dashboard/ProjectHealthBadge";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import type { MockProject } from "@/config/dashboardMockData";
import { formatDate } from "@/lib/formatDate";

export function ProjectCard({ project }: { project: MockProject }) {
  const completedMilestones = project.milestones.filter((m) => m.done).length;

  return (
    <Link href={`/dashboard/projects/${project.id}`} className="block">
      <Card interactive className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-h5 text-foreground">{project.name}</p>
            <p className="text-caption text-muted-foreground">{project.client}</p>
          </div>
          <ProjectHealthBadge health={project.health} />
        </div>

        <p className="line-clamp-2 text-body-sm text-muted-foreground">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          <StatusBadge status={project.status} />
        </div>

        <ProgressBar label="Progress" value={project.progress} colorClassName="bg-secondary" />

        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex -space-x-2">
            {project.team.slice(0, 4).map((member) => (
              <span
                key={member.id}
                title={member.name}
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-surface-muted text-caption font-semibold text-primary"
              >
                {member.initials}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-caption text-muted-foreground">
            <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
            <span>
              {completedMilestones}/{project.milestones.length} milestones &middot; Due{" "}
              {formatDate(project.deadline)}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
