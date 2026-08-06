import { CheckCircle2, Diamond, CheckSquare } from "lucide-react";
import type { MockProject, MockTask } from "@/config/dashboardMockData";
import { formatDate } from "@/lib/formatDate";

type TimelineProps = {
  project: MockProject;
  tasks: MockTask[];
};

// Gantt-style architecture, mock data only (Phase 4C brief) — milestone
// and task due dates are positioned proportionally along a project
// start-to-deadline axis. Dependencies are listed as text next to the
// dependent task rather than drawn as connector lines between arbitrary
// row positions — accurate SVG line-routing between rows is real
// complexity this mock view doesn't need to earn its keep.
export function Timeline({ project, tasks }: TimelineProps) {
  const start = new Date(project.startDate).getTime();
  const end = new Date(project.deadline).getTime();
  const totalDuration = Math.max(end - start, 1);

  function positionPercent(dateStr: string): number {
    const date = new Date(dateStr).getTime();
    const clamped = Math.max(start, Math.min(end, date));
    return ((clamped - start) / totalDuration) * 100;
  }

  const axisPoints = [0, 25, 50, 75, 100].map((percent) => {
    const date = new Date(start + (totalDuration * percent) / 100);
    return { percent, label: formatDate(date.toISOString()) };
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="relative h-6 border-b border-border">
        {axisPoints.map((point) => (
          <span
            key={point.percent}
            className="absolute -translate-x-1/2 text-caption text-muted-foreground"
            style={{ left: `${point.percent}%` }}
          >
            {point.label}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-body-sm font-medium text-foreground">Milestones</p>
        {project.milestones.map((milestone) => (
          <div key={milestone.id} className="flex items-center gap-4">
            <span
              className={`w-40 shrink-0 truncate text-body-sm ${
                milestone.done ? "text-muted-foreground line-through" : "text-foreground"
              }`}
            >
              {milestone.label}
            </span>
            <div className="relative h-2 flex-1 rounded-full bg-surface-muted">
              {milestone.done ? (
                <CheckCircle2
                  aria-hidden="true"
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 fill-success text-success"
                  style={{ left: `${positionPercent(milestone.dueDate)}%` }}
                />
              ) : (
                <Diamond
                  aria-hidden="true"
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 fill-secondary text-secondary"
                  style={{ left: `${positionPercent(milestone.dueDate)}%` }}
                />
              )}
            </div>
            <span className="w-24 shrink-0 text-right text-caption text-muted-foreground">
              {formatDate(milestone.dueDate)}
            </span>
          </div>
        ))}
      </div>

      {tasks.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-body-sm font-medium text-foreground">Task deadlines</p>
          {tasks.map((task) => {
            const dependencyTitles = task.dependsOn
              .map((depId) => tasks.find((t) => t.id === depId)?.title)
              .filter((title): title is string => Boolean(title));
            return (
              <div key={task.id} className="flex items-center gap-4">
                <span className="w-40 shrink-0 truncate text-body-sm text-muted-foreground">{task.title}</span>
                <div className="relative h-2 flex-1 rounded-full bg-surface-muted">
                  <CheckSquare
                    aria-hidden="true"
                    className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-accent"
                    style={{ left: `${positionPercent(task.dueDate)}%` }}
                  />
                </div>
                <span className="w-40 shrink-0 truncate text-right text-caption text-muted-foreground">
                  {dependencyTitles.length > 0 ? `Depends on: ${dependencyTitles.join(", ")}` : formatDate(task.dueDate)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
