import { FolderKanban, AlertTriangle, CheckCircle2, CalendarPlus, Clock3, Wallet } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import type { MockProject } from "@/config/dashboardMockData";
import { daysRemaining, budgetUtilizationPercent, formatCurrency } from "@/lib/projectMetrics";

const ACTIVE_STATUSES = new Set(["Planning", "Quotation", "Approved", "Procurement", "Deployment", "Testing", "Training"]);

export function ProjectStats({ projects }: { projects: MockProject[] }) {
  const now = new Date();

  const active = projects.filter((p) => ACTIVE_STATUSES.has(p.status));
  const delayed = projects.filter((p) => p.health === "Critical" && p.status !== "Completed" && p.status !== "Cancelled");
  const completed = projects.filter((p) => p.status === "Completed");
  const thisMonth = projects.filter((p) => {
    const start = new Date(p.startDate);
    return start.getFullYear() === now.getFullYear() && start.getMonth() === now.getMonth();
  });
  const upcomingDeadlines = projects.filter((p) => {
    if (p.status === "Completed" || p.status === "Cancelled") return false;
    const remaining = daysRemaining(p.deadline, now);
    return remaining >= 0 && remaining <= 30;
  });

  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalUtilized = projects.reduce((sum, p) => sum + p.budgetUtilized, 0);
  const utilizationPercent = budgetUtilizationPercent(totalBudget, totalUtilized);

  const healthy = projects.filter((p) => p.health === "Healthy").length;
  const warning = projects.filter((p) => p.health === "Warning").length;
  const critical = projects.filter((p) => p.health === "Critical").length;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Active Projects" value={active.length} icon={FolderKanban} />
        <StatCard label="Delayed Projects" value={delayed.length} icon={AlertTriangle} />
        <StatCard label="Completed" value={completed.length} icon={CheckCircle2} />
        <StatCard label="Started This Month" value={thisMonth.length} icon={CalendarPlus} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-surface-muted">
            <Clock3 aria-hidden="true" className="h-5 w-5 text-secondary" />
          </span>
          <div className="flex flex-col">
            <span className="text-h3 text-foreground">{upcomingDeadlines.length}</span>
            <span className="text-caption text-muted-foreground">Upcoming deadlines (30 days)</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-surface-muted">
            <Wallet aria-hidden="true" className="h-5 w-5 text-secondary" />
          </span>
          <div className="flex flex-col">
            <span className="text-h3 text-foreground">{utilizationPercent}%</span>
            <span className="text-caption text-muted-foreground">
              Budget utilized &middot; {formatCurrency(totalUtilized)} of {formatCurrency(totalBudget)}
            </span>
          </div>
        </Card>

        <Card className="flex flex-col gap-2">
          <span className="text-caption text-muted-foreground">Project Health</span>
          <div className="flex h-2 w-full overflow-hidden rounded-full bg-surface-muted">
            {healthy > 0 && <div className="h-full bg-success" style={{ width: `${(healthy / projects.length) * 100}%` }} />}
            {warning > 0 && <div className="h-full bg-warning" style={{ width: `${(warning / projects.length) * 100}%` }} />}
            {critical > 0 && <div className="h-full bg-error" style={{ width: `${(critical / projects.length) * 100}%` }} />}
          </div>
          <div className="flex items-center gap-3 text-caption text-muted-foreground">
            <span className="flex items-center gap-1"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-success" />{healthy} Healthy</span>
            <span className="flex items-center gap-1"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-warning" />{warning} Warning</span>
            <span className="flex items-center gap-1"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-error" />{critical} Critical</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
