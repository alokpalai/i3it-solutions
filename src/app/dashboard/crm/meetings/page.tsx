import type { Metadata } from "next";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { MeetingCard } from "@/components/dashboard/MeetingCard";
import { CrmActionButton } from "@/components/dashboard/CrmActionButton";
import { mockMeetings } from "@/config/crmMockData";

export const metadata: Metadata = { title: "Meetings — CRM" };

export default function CrmMeetingsPage() {
  const upcoming = mockMeetings.filter((m) => m.status === "Upcoming").sort((a, b) => a.datetime.localeCompare(b.datetime));
  const completed = mockMeetings.filter((m) => m.status === "Completed").sort((a, b) => b.datetime.localeCompare(a.datetime));
  const cancelled = mockMeetings.filter((m) => m.status === "Cancelled").sort((a, b) => b.datetime.localeCompare(a.datetime));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-h3 text-foreground">Meetings</h1>
          <p className="text-body-sm text-muted-foreground">{mockMeetings.length} meetings recorded across every organization.</p>
        </div>
        <CrmActionButton label="Schedule Meeting" />
      </div>

      <DashboardCard title={`Upcoming (${upcoming.length})`}>
        {upcoming.length === 0 ? (
          <p className="text-body-sm text-muted-foreground">No upcoming meetings.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {upcoming.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}
          </div>
        )}
      </DashboardCard>

      <DashboardCard title={`Completed (${completed.length})`}>
        {completed.length === 0 ? (
          <p className="text-body-sm text-muted-foreground">No completed meetings yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {completed.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}
          </div>
        )}
      </DashboardCard>

      <DashboardCard title={`Cancelled (${cancelled.length})`}>
        {cancelled.length === 0 ? (
          <p className="text-body-sm text-muted-foreground">No cancelled meetings.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cancelled.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}
          </div>
        )}
      </DashboardCard>
    </div>
  );
}
