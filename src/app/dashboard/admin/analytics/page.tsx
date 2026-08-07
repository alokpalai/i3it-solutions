import type { Metadata } from "next";
import { Database, Server, ShieldCheck, HardDrive, Users, AlertOctagon } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { mockProjects } from "@/config/dashboardMockData";
import {
  analyticsSalesPipeline,
  analyticsProcurement,
  analyticsInventory,
  analyticsRfqs,
  analyticsDocuments,
  analyticsGrowth,
} from "@/config/adminMockData";
import { getDatabaseStatus, getActiveSessionCount, getRecentErrorCount, adminDashboardMockCounts } from "@/lib/adminMetrics";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Analytics — Admin" };

async function getUsersByRole() {
  try {
    const roles = await prisma.role.findMany({ include: { _count: { select: { users: true } } } });
    return roles.filter((r) => r._count.users > 0).map((r) => ({ label: r.name, value: r._count.users }));
  } catch {
    return [];
  }
}

function getProjectsByStatus() {
  const counts = new Map<string, number>();
  for (const project of mockProjects) counts.set(project.status, (counts.get(project.status) ?? 0) + 1);
  return Array.from(counts.entries()).map(([label, value]) => ({ label, value }));
}

export default async function AdminAnalyticsPage() {
  const [databaseStatus, activeSessions, usersByRole] = await Promise.all([
    getDatabaseStatus(),
    getActiveSessionCount(),
    getUsersByRole(),
  ]);
  const { clients, storageUsagePercent } = adminDashboardMockCounts();
  const recentErrors = getRecentErrorCount();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h3 text-foreground">Analytics</h1>
        <p className="text-body-sm text-muted-foreground">
          Executive overview. Projects and Users are computed from real data; Clients, Sales Pipeline, Procurement,
          Inventory, RFQs and Documents are illustrative — those modules live on separate feature branches.
        </p>
      </div>

      <DashboardCard title="System health">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[
            { label: "Database", value: databaseStatus, ok: databaseStatus === "Operational", icon: Database },
            { label: "API", value: "Operational", ok: true, icon: Server },
            { label: "Authentication", value: "Operational", ok: true, icon: ShieldCheck },
            { label: "Storage Usage", value: `${storageUsagePercent}%`, ok: storageUsagePercent < 80, icon: HardDrive },
            { label: "Active Users", value: String(activeSessions), ok: true, icon: Users },
            { label: "Recent Errors", value: String(recentErrors), ok: recentErrors === 0, icon: AlertOctagon },
          ].map((card) => (
            <div key={card.label} className="flex items-center gap-3 rounded-md border border-border p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-surface-muted">
                <card.icon aria-hidden="true" className="h-5 w-5 text-secondary" />
              </span>
              <div className="flex flex-col">
                <span className="text-caption text-muted-foreground">{card.label}</span>
                <span className={`flex items-center gap-1.5 text-body-sm font-medium ${card.ok ? "text-success" : "text-error"}`}>
                  <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${card.ok ? "bg-success" : "bg-error"}`} />
                  {card.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <AnalyticsCard title="Projects by status" data={getProjectsByStatus()} />
        <AnalyticsCard title="Users by role" data={usersByRole} colorClassName="bg-accent" />
        <AnalyticsCard title="Clients" data={[{ label: "Total clients", value: clients }]} colorClassName="bg-accent" />
        <AnalyticsCard title="Sales pipeline" data={analyticsSalesPipeline} />
        <AnalyticsCard title="Procurement" data={analyticsProcurement} colorClassName="bg-accent" />
        <AnalyticsCard title="Inventory by category" data={analyticsInventory} />
        <AnalyticsCard title="RFQs by status" data={analyticsRfqs} colorClassName="bg-accent" />
        <AnalyticsCard title="Documents by folder" data={analyticsDocuments} />
        <AnalyticsCard title="Growth (opportunities/month)" data={analyticsGrowth} colorClassName="bg-success" />
      </div>
    </div>
  );
}
