import Link from "next/link";
import { ArrowLeft, CalendarDays, Wallet, Shield } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { PriorityBadge } from "@/components/dashboard/PriorityBadge";
import { ProjectHealthBadge } from "@/components/dashboard/ProjectHealthBadge";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import type { MockProject } from "@/config/dashboardMockData";
import { formatDate } from "@/lib/formatDate";
import { formatCurrency } from "@/lib/projectMetrics";

export function ProjectHeader({ project }: { project: MockProject }) {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-6">
      <Link
        href="/dashboard/projects"
        className="inline-flex w-fit items-center gap-1.5 text-caption font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        All projects
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-h2 text-foreground">{project.name}</h1>
          <p className="text-body-sm text-muted-foreground">{project.client}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
          <PriorityBadge priority={project.priority} />
          <ProjectHealthBadge health={project.health} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
          <Wallet aria-hidden="true" className="h-4 w-4 shrink-0" />
          {formatCurrency(project.budgetUtilized)} of {formatCurrency(project.budget)} utilized
        </div>
        <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
          <CalendarDays aria-hidden="true" className="h-4 w-4 shrink-0" />
          {formatDate(project.startDate)} &ndash; {formatDate(project.deadline)}
        </div>
        <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
          <Shield aria-hidden="true" className="h-4 w-4 shrink-0" />
          {project.riskLevel} risk
        </div>
      </div>

      <ProgressBar label="Overall progress" value={project.progress} colorClassName="bg-secondary" className="max-w-md" />
    </div>
  );
}
