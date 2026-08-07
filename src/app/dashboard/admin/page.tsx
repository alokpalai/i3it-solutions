import type { Metadata } from "next";
import {
  Users,
  Building2,
  FolderKanban,
  Landmark,
  Radio,
  HardDrive,
  ClipboardList,
  CheckCircle2,
  Bell,
  Database,
  Server,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { AuditTimeline } from "@/components/dashboard/AuditTimeline";
import {
  getUserCount,
  getActiveSessionCount,
  getDatabaseStatus,
  getDepartmentCount,
  getProjectCount,
  getNotificationCount,
  adminDashboardMockCounts,
} from "@/lib/adminMetrics";
import { mockAuditLog } from "@/config/adminMockData";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default async function AdminDashboardPage() {
  const [userCount, activeSessions, databaseStatus] = await Promise.all([
    getUserCount(),
    getActiveSessionCount(),
    getDatabaseStatus(),
  ]);
  const { clients, openRfqs, pendingApprovals, storageUsagePercent } = adminDashboardMockCounts();
  const recentActivity = [...mockAuditLog].sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Users" value={userCount} icon={Users} />
        <StatCard label="Departments" value={getDepartmentCount()} icon={Building2} />
        <StatCard label="Projects" value={getProjectCount()} icon={FolderKanban} />
        <StatCard label="Clients" value={clients} icon={Landmark} />
        <StatCard label="Active Sessions" value={activeSessions} icon={Radio} />
        <StatCard label="Storage Usage" value={`${storageUsagePercent}%`} icon={HardDrive} />
        <StatCard label="Open RFQs" value={openRfqs} icon={ClipboardList} />
        <StatCard label="Pending Approvals" value={pendingApprovals} icon={CheckCircle2} />
        <StatCard label="Notifications" value={getNotificationCount()} icon={Bell} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardCard title="Recent activity" action={{ label: "View all", href: "/dashboard/admin/activity" }}>
            <AuditTimeline entries={recentActivity} limit={6} />
          </DashboardCard>
        </div>

        <DashboardCard title="System health" action={{ label: "View analytics", href: "/dashboard/admin/analytics" }}>
          <ul className="flex flex-col divide-y divide-border">
            <li className="flex items-center justify-between gap-3 py-3 first:pt-0">
              <span className="flex items-center gap-2 text-body-sm text-foreground">
                <Database aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
                Database
              </span>
              <span className={`flex items-center gap-1.5 text-caption font-medium ${databaseStatus === "Operational" ? "text-success" : "text-error"}`}>
                <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${databaseStatus === "Operational" ? "bg-success" : "bg-error"}`} />
                {databaseStatus}
              </span>
            </li>
            <li className="flex items-center justify-between gap-3 py-3">
              <span className="flex items-center gap-2 text-body-sm text-foreground">
                <Server aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
                API
              </span>
              <span className="flex items-center gap-1.5 text-caption font-medium text-success">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-success" />
                Operational
              </span>
            </li>
            <li className="flex items-center justify-between gap-3 py-3 last:pb-0">
              <span className="flex items-center gap-2 text-body-sm text-foreground">
                <Users aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
                Authentication
              </span>
              <span className="flex items-center gap-1.5 text-caption font-medium text-success">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-success" />
                Operational
              </span>
            </li>
          </ul>
        </DashboardCard>
      </div>

      <p className="text-caption text-muted-foreground">
        Users, Active Sessions and Database status are read live from the database. Clients, Open RFQs, Pending
        Approvals and Storage Usage are illustrative — the CRM and Procurement modules that would back them live on
        separate feature branches, not this one.
      </p>
    </div>
  );
}
