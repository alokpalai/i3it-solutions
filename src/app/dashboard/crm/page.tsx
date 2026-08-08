import type { Metadata } from "next";
import Link from "next/link";
import { UserPlus, CheckCircle2, Target, Landmark, CalendarClock, Bell, IndianRupee, Percent } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { CrmActivityFeed } from "@/components/dashboard/CrmActivityFeed";
import { MeetingStatusBadge } from "@/components/dashboard/MeetingStatusBadge";
import { crmDashboardKpis, formatCurrency, salesPerformance, getOrganizationById } from "@/lib/crmMetrics";
import { mockCrmActivity, mockMeetings } from "@/config/crmMockData";
import { formatDate } from "@/lib/formatDate";

export const metadata: Metadata = { title: "CRM" };

export default function CrmDashboardPage() {
  const kpis = crmDashboardKpis();
  const performance = salesPerformance();

  const upcomingMeetings = mockMeetings
    .filter((meeting) => meeting.status === "Upcoming")
    .sort((a, b) => a.datetime.localeCompare(b.datetime))
    .slice(0, 5);

  const recentActivity = [...mockCrmActivity].sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h2 text-foreground">CRM</h1>
        <p className="text-body-sm text-muted-foreground">Leads, clients and the sales pipeline at a glance.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Leads" value={kpis.totalLeads} icon={UserPlus} />
        <StatCard label="Qualified Leads" value={kpis.qualifiedLeads} icon={CheckCircle2} />
        <StatCard label="Active Opportunities" value={kpis.activeOpportunities} icon={Target} />
        <StatCard label="Clients" value={kpis.clients} icon={Landmark} />
        <StatCard label="Meetings Today" value={kpis.meetingsToday} icon={CalendarClock} />
        <StatCard label="Follow-ups Due" value={kpis.followUpsDue} icon={Bell} />
        <StatCard label="Revenue Pipeline" value={formatCurrency(kpis.revenuePipeline)} icon={IndianRupee} />
        <StatCard label="Conversion Rate" value={`${kpis.conversionRate}%`} icon={Percent} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <DashboardCard title="Recent activity" action={{ label: "View all", href: "/dashboard/crm/activity" }}>
            <CrmActivityFeed items={recentActivity} limit={6} />
          </DashboardCard>

          <DashboardCard title="Sales performance">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-border text-caption font-medium text-muted-foreground">
                    <th scope="col" className="py-2 pr-4">Executive</th>
                    <th scope="col" className="py-2 pr-4">Won deals</th>
                    <th scope="col" className="py-2 pr-4">Won revenue</th>
                    <th scope="col" className="py-2 pr-4">Active deals</th>
                    <th scope="col" className="py-2">Active pipeline</th>
                  </tr>
                </thead>
                <tbody>
                  {performance.map(({ executive, wonCount, wonRevenue, activeCount, activeRevenue }) => (
                    <tr key={executive.id} className="border-b border-border text-body-sm">
                      <td className="py-3 pr-4 font-medium text-foreground">{executive.name}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{wonCount}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{formatCurrency(wonRevenue)}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{activeCount}</td>
                      <td className="py-3 text-muted-foreground">{formatCurrency(activeRevenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashboardCard>
        </div>

        <div className="flex flex-col gap-6">
          <DashboardCard title="Upcoming meetings" action={{ label: "View all", href: "/dashboard/crm/meetings" }}>
            {upcomingMeetings.length === 0 ? (
              <p className="text-body-sm text-muted-foreground">No upcoming meetings.</p>
            ) : (
              <ul className="flex flex-col gap-4">
                {upcomingMeetings.map((meeting) => {
                  const organization = getOrganizationById(meeting.organizationId);
                  return (
                    <li key={meeting.id} className="flex flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-body-sm font-medium text-foreground">{meeting.title}</span>
                        <MeetingStatusBadge status={meeting.status} />
                      </div>
                      {organization && (
                        <Link
                          href={`/dashboard/crm/organizations/${organization.id}/overview`}
                          className="text-caption text-secondary hover:underline"
                        >
                          {organization.name}
                        </Link>
                      )}
                      <span className="text-caption text-muted-foreground">
                        {formatDate(meeting.datetime)} &middot;{" "}
                        {new Date(meeting.datetime).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
