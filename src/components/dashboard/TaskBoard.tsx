"use client";

import { useState } from "react";
import { KanbanColumn } from "@/components/dashboard/KanbanColumn";
import type { MockTask, TaskStatus } from "@/config/dashboardMockData";

const COLUMNS: TaskStatus[] = ["To Do", "In Progress", "Review", "Blocked", "Completed"];

// Real client-side drag-and-drop (native HTML5 DnD, no library) — moves a
// task between columns in local component state only. Nothing persists
// past a page refresh; there's no task-status mutation endpoint yet. This
// is the "prepare for future implementation" architecture the brief asks
// for, built as far as it can go without a backend to write to.
export function TaskBoard({ tasks }: { tasks: MockTask[] }) {
  const [taskStatuses, setTaskStatuses] = useState<Record<string, TaskStatus>>(() =>
    Object.fromEntries(tasks.map((task) => [task.id, task.status])),
  );
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null);

  function handleDrop(status: TaskStatus) {
    if (draggedTaskId) {
      setTaskStatuses((prev) => ({ ...prev, [draggedTaskId]: status }));
    }
    setDraggedTaskId(null);
    setDragOverColumn(null);
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {COLUMNS.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          tasks={tasks
            .filter((task) => taskStatuses[task.id] === status)
            .map((task) => ({ ...task, status: taskStatuses[task.id] }))}
          isDragOver={dragOverColumn === status}
          onDragOver={(event) => {
            event.preventDefault();
            setDragOverColumn(status);
          }}
          onDragLeave={() => setDragOverColumn((current) => (current === status ? null : current))}
          onDrop={(event) => {
            event.preventDefault();
            handleDrop(status);
          }}
          onTaskDragStart={(event, taskId) => {
            setDraggedTaskId(taskId);
            event.dataTransfer.effectAllowed = "move";
          }}
        />
      ))}
    </div>
  );
}
