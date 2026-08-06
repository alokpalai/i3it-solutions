"use client";

import { useState } from "react";
import { List, LayoutGrid } from "lucide-react";
import { TaskTable } from "@/components/dashboard/TaskTable";
import { TaskBoard } from "@/components/dashboard/TaskBoard";
import type { MockTask } from "@/config/dashboardMockData";
import { cn } from "@/lib/utils";

type ViewMode = "list" | "board";

export function ProjectTasksView({ tasks }: { tasks: MockTask[] }) {
  const [view, setView] = useState<ViewMode>("board");

  return (
    <div className="flex flex-col gap-4">
      <div role="tablist" aria-label="Task view" className="inline-flex w-fit rounded-md border border-border p-1">
        <button
          type="button"
          role="tab"
          aria-selected={view === "board"}
          onClick={() => setView("board")}
          className={cn(
            "flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-body-sm font-medium",
            view === "board" ? "bg-surface-muted text-primary" : "text-muted-foreground",
          )}
        >
          <LayoutGrid aria-hidden="true" className="h-4 w-4" />
          Board
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === "list"}
          onClick={() => setView("list")}
          className={cn(
            "flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-body-sm font-medium",
            view === "list" ? "bg-surface-muted text-primary" : "text-muted-foreground",
          )}
        >
          <List aria-hidden="true" className="h-4 w-4" />
          List
        </button>
      </div>

      {view === "board" ? <TaskBoard tasks={tasks} /> : <TaskTable tasks={tasks} />}
    </div>
  );
}
