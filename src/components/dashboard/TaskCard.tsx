import { MessageCircle, ListChecks } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { PriorityBadge } from "@/components/dashboard/PriorityBadge";
import type { MockTask } from "@/config/dashboardMockData";
import { formatDate } from "@/lib/formatDate";

type TaskCardProps = {
  task: MockTask;
  draggable?: boolean;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
};

export function TaskCard({ task, draggable, onDragStart }: TaskCardProps) {
  const doneSubtasks = task.subtasks.filter((s) => s.done).length;

  return (
    <Card
      draggable={draggable}
      onDragStart={onDragStart}
      className={draggable ? "flex cursor-grab flex-col gap-3 active:cursor-grabbing" : "flex flex-col gap-3"}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-body-sm font-medium text-foreground">{task.title}</p>
        <PriorityBadge priority={task.priority} />
      </div>

      {task.dependsOn.length > 0 && (
        <p className="text-caption text-muted-foreground">Depends on {task.dependsOn.length} task{task.dependsOn.length === 1 ? "" : "s"}</p>
      )}

      <div className="flex items-center justify-between">
        <span
          title={task.assignee.name}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-muted text-[10px] font-semibold text-primary"
        >
          {task.assignee.initials}
        </span>
        <span className="text-caption text-muted-foreground">{formatDate(task.dueDate)}</span>
      </div>

      {(task.subtasks.length > 0 || task.commentsCount > 0) && (
        <div className="flex items-center gap-3 border-t border-border pt-2 text-caption text-muted-foreground">
          {task.subtasks.length > 0 && (
            <span className="flex items-center gap-1">
              <ListChecks aria-hidden="true" className="h-3.5 w-3.5" />
              {doneSubtasks}/{task.subtasks.length}
            </span>
          )}
          {task.commentsCount > 0 && (
            <span className="flex items-center gap-1">
              <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
              {task.commentsCount}
            </span>
          )}
        </div>
      )}
    </Card>
  );
}
