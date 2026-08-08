import type { Metadata } from "next";
import Link from "next/link";
import { Bell, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { mockFollowUps, followUpBucket, type MockFollowUp } from "@/config/crmMockData";
import { formatDate } from "@/lib/formatDate";

export const metadata: Metadata = { title: "Follow-ups — CRM" };

function FollowUpRow({ followUp }: { followUp: MockFollowUp }) {
  return (
    <li className="flex items-center justify-between gap-4 py-3">
      <div className="flex flex-col gap-0.5">
        <Link href={`/dashboard/crm/organizations/${followUp.organizationId}/overview`} className="text-body-sm font-medium text-foreground hover:underline">
          {followUp.relatedLabel}
        </Link>
        <span className="text-caption text-muted-foreground">{followUp.relatedType} &middot; {followUp.note}</span>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-0.5">
        <span className="text-caption text-muted-foreground">{formatDate(followUp.dueDate)}</span>
        <span className="text-caption text-muted-foreground">{followUp.assignedTo.name}</span>
      </div>
    </li>
  );
}

// "Reminder architecture" per the brief — buckets are computed from
// dueDate/status rather than a separate stored field, so Today/Overdue/
// Upcoming never drift from the actual date. No reminder-dispatch
// backend exists yet (same "architecture, not wired up" footing as
// notification preferences elsewhere in the dashboard).
export default function CrmFollowUpsPage() {
  const pending = mockFollowUps.filter((f) => f.status === "Pending");
  const completed = mockFollowUps.filter((f) => f.status === "Completed");

  const overdue = pending.filter((f) => followUpBucket(f.dueDate) === "Overdue");
  const today = pending.filter((f) => followUpBucket(f.dueDate) === "Today");
  const upcoming = pending
    .filter((f) => followUpBucket(f.dueDate) === "Upcoming")
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h3 text-foreground">Follow-ups</h1>
        <p className="text-body-sm text-muted-foreground">{pending.length} pending, {completed.length} completed.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardCard title="Overdue">
          <div className="mb-3 flex items-center gap-2 text-caption text-error">
            <AlertTriangle aria-hidden="true" className="h-3.5 w-3.5" />
            {overdue.length} overdue
          </div>
          {overdue.length === 0 ? (
            <p className="text-body-sm text-muted-foreground">Nothing overdue.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-border">{overdue.map((f) => <FollowUpRow key={f.id} followUp={f} />)}</ul>
          )}
        </DashboardCard>

        <DashboardCard title="Today">
          <div className="mb-3 flex items-center gap-2 text-caption text-secondary">
            <Bell aria-hidden="true" className="h-3.5 w-3.5" />
            {today.length} due today
          </div>
          {today.length === 0 ? (
            <p className="text-body-sm text-muted-foreground">Nothing due today.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-border">{today.map((f) => <FollowUpRow key={f.id} followUp={f} />)}</ul>
          )}
        </DashboardCard>

        <DashboardCard title="Upcoming">
          <div className="mb-3 flex items-center gap-2 text-caption text-muted-foreground">
            <Clock aria-hidden="true" className="h-3.5 w-3.5" />
            {upcoming.length} upcoming
          </div>
          {upcoming.length === 0 ? (
            <p className="text-body-sm text-muted-foreground">Nothing scheduled.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-border">{upcoming.map((f) => <FollowUpRow key={f.id} followUp={f} />)}</ul>
          )}
        </DashboardCard>

        <DashboardCard title="Completed">
          <div className="mb-3 flex items-center gap-2 text-caption text-success">
            <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5" />
            {completed.length} completed
          </div>
          {completed.length === 0 ? (
            <p className="text-body-sm text-muted-foreground">Nothing completed yet.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-border">{completed.map((f) => <FollowUpRow key={f.id} followUp={f} />)}</ul>
          )}
        </DashboardCard>
      </div>
    </div>
  );
}
