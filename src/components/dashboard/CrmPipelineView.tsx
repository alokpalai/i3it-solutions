"use client";

import { useState } from "react";
import { List, LayoutGrid } from "lucide-react";
import { PipelineBoard } from "@/components/dashboard/PipelineBoard";
import { OpportunityTable } from "@/components/dashboard/OpportunityTable";
import type { MockOpportunity } from "@/config/crmMockData";
import { cn } from "@/lib/utils";

type ViewMode = "board" | "list";

// Same Board/List toggle pattern as ProjectTasksView — the List view is
// also the accessible alternative to the Kanban board's drag-and-drop,
// which isn't keyboard-operable.
export function CrmPipelineView({ opportunities }: { opportunities: MockOpportunity[] }) {
  const [view, setView] = useState<ViewMode>("board");

  return (
    <div className="flex flex-col gap-4">
      <div role="tablist" aria-label="Pipeline view" className="inline-flex w-fit rounded-md border border-border p-1">
        <button
          type="button"
          role="tab"
          aria-selected={view === "board"}
          onClick={() => setView("board")}
          className={cn("flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-body-sm font-medium", view === "board" ? "bg-surface-muted text-primary" : "text-muted-foreground")}
        >
          <LayoutGrid aria-hidden="true" className="h-4 w-4" />
          Board
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === "list"}
          onClick={() => setView("list")}
          className={cn("flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-body-sm font-medium", view === "list" ? "bg-surface-muted text-primary" : "text-muted-foreground")}
        >
          <List aria-hidden="true" className="h-4 w-4" />
          List
        </button>
      </div>

      {view === "board" ? <PipelineBoard opportunities={opportunities} /> : <OpportunityTable opportunities={opportunities} />}
    </div>
  );
}
