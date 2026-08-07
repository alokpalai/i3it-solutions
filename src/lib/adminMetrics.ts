import { prisma } from "@/lib/prisma";
import { mockProjects, mockNotifications } from "@/config/dashboardMockData";
import { mockDepartments, mockSystemLogs } from "@/config/adminMockData";

// ---------------------------------------------------------------------------
// Real data (queried from the actual database — Phase 4A's User/Session
// tables are live and committed on this branch, unlike CRM/Procurement's
// mock datasets which live on their own not-yet-merged branches). Every
// query is wrapped so a DB hiccup degrades to a dash rather than a
// crashed admin dashboard — this page's job is to stay up even when the
// thing it's reporting on is having a bad day.
// ---------------------------------------------------------------------------

async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export function getUserCount(): Promise<number> {
  return safeQuery(() => prisma.user.count(), 0);
}

export function getActiveSessionCount(): Promise<number> {
  return safeQuery(() => prisma.session.count({ where: { expires: { gt: new Date() } } }), 0);
}

export type DatabaseStatus = "Operational" | "Unreachable";

export async function getDatabaseStatus(): Promise<DatabaseStatus> {
  const ok = await safeQuery(async () => {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  }, false);
  return ok ? "Operational" : "Unreachable";
}

// ---------------------------------------------------------------------------
// Mock/derived data (Clients/Open RFQs/Pending Approvals/Storage Usage
// have no real backing on this branch — CRM and Procurement exist as
// code on feature/phase-4-crm and feature/phase-4-procurement, not here.
// Kept as clearly-labeled mock constants rather than querying tables
// that don't exist.)
// ---------------------------------------------------------------------------

export function adminDashboardMockCounts() {
  return {
    clients: 7, // mirrors Phase 4D's seeded client-organization count
    openRfqs: 4, // mirrors Phase 4E's seeded open-RFQ count
    pendingApprovals: 3,
    storageUsagePercent: 34,
  };
}

export function getDepartmentCount(): number {
  return mockDepartments.length;
}

export function getProjectCount(): number {
  return mockProjects.length;
}

export function getNotificationCount(): number {
  return mockNotifications.filter((n) => !n.read).length;
}

export function getRecentErrorCount(): number {
  return mockSystemLogs.filter((log) => log.level === "Error").length;
}
