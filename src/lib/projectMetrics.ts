import { mockProjects, mockTasks, type ProjectHealth, type ProjectStatus, type RiskLevel } from "@/config/dashboardMockData";

export function getProjectById(id: string) {
  return mockProjects.find((project) => project.id === id);
}

export function getTasksByProjectId(id: string) {
  return mockTasks.filter((task) => task.projectId === id);
}

// "Mock calculations only" per the Phase 4C brief — a real formula over
// the four named factors (task/progress completion, deadline proximity,
// budget utilization, risk level), not a fabricated label. Used when a
// new project is created (src/app/dashboard/projects/new) to suggest an
// initial health from the form's own inputs, since there's no better
// signal yet at that point. Existing seeded projects carry an
// already-authored `health` field instead of a live recomputation here —
// recalculating every render off the real current date would make a
// fixed demo dataset's health labels drift unpredictably as time passes,
// which is worse than a stable, factor-informed value set once.
export function computeProjectHealth(input: {
  progress: number;
  budget: number;
  budgetUtilized: number;
  riskLevel: RiskLevel;
  status: ProjectStatus;
  daysRemaining: number;
}): ProjectHealth {
  if (input.status === "Completed") return "Healthy";
  if (input.status === "Cancelled") return "Critical";

  let score = 0;

  const budgetRatio = input.budget > 0 ? input.budgetUtilized / input.budget : 0;
  if (budgetRatio > 0.9) score += 2;
  else if (budgetRatio > 0.7) score += 1;

  if (input.daysRemaining < 0) score += 3;
  else if (input.daysRemaining < 14 && input.progress < 80) score += 2;
  else if (input.daysRemaining < 30 && input.progress < 50) score += 1;

  if (input.riskLevel === "High") score += 2;
  else if (input.riskLevel === "Medium") score += 1;

  if (input.status === "On Hold") score += 2;

  if (score >= 4) return "Critical";
  if (score >= 2) return "Warning";
  return "Healthy";
}

export function daysRemaining(deadline: string, from: Date = new Date()): number {
  const deadlineDate = new Date(deadline);
  const diffMs = deadlineDate.getTime() - from.getTime();
  return Math.round(diffMs / 86_400_000);
}

export function budgetUtilizationPercent(budget: number, budgetUtilized: number): number {
  if (budget <= 0) return 0;
  return Math.round((budgetUtilized / budget) * 100);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
