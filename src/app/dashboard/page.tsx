import type { Metadata } from "next";
import { FolderKanban, CheckSquare, CheckCircle2, MessageSquare, CalendarClock } from "lucide-react";
import { auth } from "@/auth";
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { CalendarWidget } from "@/components/dashboard/CalendarWidget";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatRelativeTime } from "@/lib/formatDate";
import {
  mockProjects,
  mockTasks,
  mockConversations,
  mockCalendarEvents,
  mockActivity,
  mockDocuments,
  mockRfqs,
  mockNotifications,
  mockAnnouncements,
  mockUsers,
} from "@/config/dashboardMockData";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardHomePage() {
  const session = await auth();
  const firstName = (session?.user?.name ?? "there").split(" ")[0];

  const pendingTasks = mockTasks.filter((t) => t.status !== "Completed");
  const completedTasks = mockTasks.filter((t) => t.status === "Completed");
  const unreadMessages = mockConversations.reduce((sum, c) => sum + c.unreadCount, 0);
  const upcomingMeetings = mockCalendarEvents.filter((e) => e.type === "Meeting");
  const upcomingDeadlines = mockCalendarEvents
    .filter((e) => e.type === "Deadline")
    .sort((a, b) => a.date.localeCompare(b.date));
  const onTimeRate = Math.round((completedTasks.length / mockTasks.length) * 100);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h2 text-foreground">Welcome back, {firstName}</h1>
        <p className="text-body-sm text-muted-foreground">Here&rsquo;s what&rsquo;s happening today.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Assigned Projects" value={mockProjects.length} icon={FolderKanban} />
        <StatCard label="Pending Tasks" value={pendingTasks.length} icon={CheckSquare} />
        <StatCard label="Completed Tasks" value={completedTasks.length} icon={CheckCircle2} />
        <StatCard label="Unread Messages" value={unreadMessages} icon={MessageSquare} />
        <StatCard label="Upcoming Meetings" value={upcomingMeetings.length} icon={CalendarClock} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <DashboardCard title="Project status" action={{ label: "View all", href: "/dashboard/projects" }}>
            <div className="grid gap-4 sm:grid-cols-2">
              {mockProjects.slice(0, 2).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Recent activity">
            <ActivityFeed items={mockActivity} />
          </DashboardCard>

          <div className="grid gap-6 sm:grid-cols-2">
            <DashboardCard title="Recent documents" action={{ label: "View all", href: "/dashboard/documents" }}>
              <ul className="flex flex-col gap-3">
                {mockDocuments.slice(0, 4).map((doc) => (
                  <li key={doc.id} className="flex items-center justify-between gap-3">
                    <span className="truncate text-body-sm text-foreground">{doc.name}</span>
                    <span className="shrink-0 text-caption text-muted-foreground">{formatDate(doc.updatedAt)}</span>
                  </li>
                ))}
              </ul>
            </DashboardCard>

            <DashboardCard title="Recent RFQs">
              <ul className="flex flex-col gap-3">
                {mockRfqs.map((rfq) => (
                  <li key={rfq.id} className="flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-body-sm text-foreground">{rfq.organization}</span>
                      <span className="text-caption text-muted-foreground">{rfq.requirement}</span>
                    </div>
                    <Badge variant={rfq.status === "Won" ? "accent" : "default"}>{rfq.status}</Badge>
                  </li>
                ))}
              </ul>
            </DashboardCard>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <DashboardCard title="Quick actions">
            <QuickActions />
          </DashboardCard>

          <DashboardCard title="Calendar" action={{ label: "Open calendar", href: "/dashboard/calendar" }}>
            <CalendarWidget events={mockCalendarEvents} />
          </DashboardCard>

          <DashboardCard title="Upcoming deadlines">
            {upcomingDeadlines.length === 0 ? (
              <p className="text-body-sm text-muted-foreground">No deadlines coming up.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {upcomingDeadlines.map((deadline) => (
                  <li key={deadline.id} className="flex items-center justify-between gap-3">
                    <span className="text-body-sm text-foreground">{deadline.title}</span>
                    <span className="shrink-0 text-caption text-muted-foreground">{formatDate(deadline.date)}</span>
                  </li>
                ))}
              </ul>
            )}
          </DashboardCard>

          <DashboardCard title="Team members">
            <ul className="flex flex-col gap-3">
              {mockUsers.map((user) => (
                <li key={user.id} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-caption font-semibold text-primary">
                    {user.initials}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-body-sm text-foreground">{user.name}</span>
                    <span className="text-caption text-muted-foreground">{user.role}</span>
                  </div>
                </li>
              ))}
            </ul>
          </DashboardCard>

          <DashboardCard title="My performance">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-body-sm text-muted-foreground">Tasks completed</span>
                <span className="text-body-sm font-medium text-foreground">{completedTasks.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-body-sm text-muted-foreground">On-time completion rate</span>
                <span className="text-body-sm font-medium text-foreground">{onTimeRate}%</span>
              </div>
              <p className="text-caption text-muted-foreground">Based on your current task list.</p>
            </div>
          </DashboardCard>

          <DashboardCard title="Announcements & company news">
            <ul className="flex flex-col gap-4">
              {mockAnnouncements.map((announcement) => (
                <li key={announcement.id} className="flex flex-col gap-1">
                  <p className="text-body-sm font-medium text-foreground">{announcement.title}</p>
                  <p className="text-caption text-muted-foreground">{announcement.body}</p>
                  <p className="text-caption text-muted-foreground">{formatDate(announcement.date)}</p>
                </li>
              ))}
            </ul>
          </DashboardCard>

          <DashboardCard title="Latest notifications" action={{ label: "View all", href: "/dashboard/notifications" }}>
            <ul className="flex flex-col gap-3">
              {mockNotifications.slice(0, 3).map((notification) => (
                <li key={notification.id} className="flex flex-col gap-0.5">
                  <span className="text-body-sm text-foreground">{notification.title}</span>
                  <span className="text-caption text-muted-foreground">
                    {formatRelativeTime(notification.date)}
                  </span>
                </li>
              ))}
            </ul>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
