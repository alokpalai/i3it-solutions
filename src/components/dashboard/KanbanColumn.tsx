import type { TaskStatus, MockTask } from "@/config/dashboardMockData";
import { TaskCard } from "@/components/dashboard/TaskCard";
import { cn } from "@/lib/utils";

type KanbanColumnProps = {
  status: TaskStatus;
  tasks: MockTask[];
  isDragOver?: boolean;
  onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
  onTaskDragStart?: (event: React.DragEvent<HTMLDivElement>, taskId: string) => void;
};

export function KanbanColumn({
  status,
  tasks,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onTaskDragStart,
}: KanbanColumnProps) {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={cn(
        "flex w-72 shrink-0 flex-col gap-3 rounded-md border border-border bg-surface p-3 transition-colors",
        isDragOver && "border-secondary bg-surface-muted",
      )}
    >
      <div className="flex items-center justify-between px-1">
        <p className="text-body-sm font-medium text-foreground">{status}</p>
        <span className="rounded-full bg-surface-muted px-2 py-0.5 text-caption text-muted-foreground">
          {tasks.length}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            draggable
            onDragStart={(event) => onTaskDragStart?.(event, task.id)}
          />
        ))}
        {tasks.length === 0 && (
          <p className="rounded-md border border-dashed border-border px-3 py-6 text-center text-caption text-muted-foreground">
            No tasks
          </p>
        )}
      </div>
    </div>
  );
}
