"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { OpportunityCard } from "@/components/dashboard/OpportunityCard";
import { pipelineStages, type MockOpportunity, type PipelineStage } from "@/config/crmMockData";

// Same real native-HTML5-drag-and-drop, local-state-only architecture as
// TaskBoard.tsx (Projects) — moves aren't persisted, there's no pipeline
// mutation endpoint yet. Renders its own column markup rather than
// reusing KanbanColumn.tsx, which is typed specifically to MockTask/
// TaskCard; generalizing it for a second, differently-shaped card type
// wasn't worth the risk of touching already-shipped Phase 4C code for a
// one-off reuse.
export function PipelineBoard({ opportunities }: { opportunities: MockOpportunity[] }) {
  const [stages, setStages] = useState<Record<string, PipelineStage>>(() =>
    Object.fromEntries(opportunities.map((opp) => [opp.id, opp.stage])),
  );
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<PipelineStage | null>(null);

  function handleDrop(stage: PipelineStage) {
    if (draggedId) {
      setStages((prev) => ({ ...prev, [draggedId]: stage }));
    }
    setDraggedId(null);
    setDragOverStage(null);
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {pipelineStages.map((stage) => {
        const inStage = opportunities.filter((opp) => stages[opp.id] === stage);
        const isDragOver = dragOverStage === stage;
        return (
          <div
            key={stage}
            onDragOver={(event) => { event.preventDefault(); setDragOverStage(stage); }}
            onDragLeave={() => setDragOverStage((current) => (current === stage ? null : current))}
            onDrop={(event) => { event.preventDefault(); handleDrop(stage); }}
            className={cn(
              "flex w-80 shrink-0 flex-col gap-3 rounded-md border border-border bg-surface p-3 transition-colors",
              isDragOver && "border-secondary bg-surface-muted",
            )}
          >
            <div className="flex items-center justify-between px-1">
              <p className="text-body-sm font-medium text-foreground">{stage}</p>
              <span className="rounded-full bg-surface-muted px-2 py-0.5 text-caption text-muted-foreground">{inStage.length}</span>
            </div>
            <div className="flex flex-col gap-2">
              {inStage.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={{ ...opportunity, stage: stages[opportunity.id] }}
                  draggable
                  onDragStart={(event) => {
                    setDraggedId(opportunity.id);
                    event.dataTransfer.effectAllowed = "move";
                  }}
                />
              ))}
              {inStage.length === 0 && (
                <p className="rounded-md border border-dashed border-border px-3 py-6 text-center text-caption text-muted-foreground">
                  No opportunities
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
