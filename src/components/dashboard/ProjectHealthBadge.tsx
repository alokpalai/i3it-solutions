import { CheckCircle2, AlertTriangle, AlertOctagon } from "lucide-react";
import type { ProjectHealth } from "@/config/dashboardMockData";
import { cn } from "@/lib/utils";

const HEALTH_CONFIG: Record<ProjectHealth, { icon: typeof CheckCircle2; className: string }> = {
  Healthy: { icon: CheckCircle2, className: "border-success/30 bg-success/10 text-success" },
  Warning: { icon: AlertTriangle, className: "border-warning/30 bg-warning/10 text-warning" },
  Critical: { icon: AlertOctagon, className: "border-error/30 bg-error/10 text-error" },
};

// Mock calculation only (Phase 4C brief) — see getProjectHealth in
// src/lib/projectMetrics.ts for how a project's `health` field is derived
// from task completion, deadline proximity and budget utilization.
export function ProjectHealthBadge({ health }: { health: ProjectHealth }) {
  const { icon: Icon, className } = HEALTH_CONFIG[health];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-caption font-medium",
        className,
      )}
    >
      <Icon aria-hidden="true" className="h-3.5 w-3.5" />
      {health}
    </span>
  );
}
