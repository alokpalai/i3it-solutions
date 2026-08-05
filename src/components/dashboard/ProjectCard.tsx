import { CalendarDays, CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { MockProject } from "@/config/dashboardMockData";
import { formatDate } from "@/lib/formatDate";

const STATUS_VARIANT: Record<MockProject["status"], "default" | "accent"> = {
  "On Track": "default",
  Completed: "default",
  "At Risk": "accent",
  Delayed: "accent",
};

const STATUS_COLOR: Record<MockProject["status"], string> = {
  "On Track": "bg-secondary",
  Completed: "bg-success",
  "At Risk": "bg-warning",
  Delayed: "bg-error",
};

export function ProjectCard({ project }: { project: MockProject }) {
  const completedMilestones = project.milestones.filter((m) => m.done).length;

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-h5 text-foreground">{project.name}</p>
          <p className="text-body-sm text-muted-foreground">{project.description}</p>
        </div>
        <Badge variant={STATUS_VARIANT[project.status]}>{project.status}</Badge>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-caption text-muted-foreground">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted">
          <div
            className={`h-full rounded-full ${STATUS_COLOR[project.status]}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <ul className="flex flex-col gap-1.5">
        {project.milestones.map((milestone) => (
          <li key={milestone.label} className="flex items-center gap-2 text-body-sm">
            {milestone.done ? (
              <CheckCircle2 aria-hidden="true" className="h-4 w-4 shrink-0 text-success" />
            ) : (
              <Circle aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
            )}
            <span className={milestone.done ? "text-muted-foreground line-through" : "text-foreground"}>
              {milestone.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-border pt-3">
        <div className="flex -space-x-2">
          {project.team.map((member) => (
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
  );
}
