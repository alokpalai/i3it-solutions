import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { CalendarWidget } from "@/components/dashboard/CalendarWidget";
import { mockCalendarEvents, type CalendarEventType } from "@/config/dashboardMockData";
import { formatDate } from "@/lib/formatDate";

export const metadata: Metadata = { title: "Calendar" };

const EVENT_COLOR: Record<CalendarEventType, string> = {
  Meeting: "bg-secondary",
  Deadline: "bg-error",
  Task: "bg-accent",
  Leave: "bg-warning",
  Birthday: "bg-success",
};

export default function CalendarPage() {
  const sortedEvents = [...mockCalendarEvents].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h2 text-foreground">Calendar</h1>
        <p className="text-body-sm text-muted-foreground">
          Meetings, deadlines, tasks, leave and birthdays for your team.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CalendarWidget events={mockCalendarEvents} />
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4">
            {Object.entries(EVENT_COLOR).map(([type, colorClass]) => (
              <div key={type} className="flex items-center gap-2">
                <span aria-hidden="true" className={`h-2 w-2 rounded-full ${colorClass}`} />
                <span className="text-caption text-muted-foreground">{type}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <p className="mb-4 text-h5 text-foreground">Upcoming</p>
          <ul className="flex flex-col gap-4">
            {sortedEvents.map((event) => (
              <li key={event.id} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${EVENT_COLOR[event.type]}`}
                />
                <div className="flex flex-col">
                  <span className="text-body-sm text-foreground">{event.title}</span>
                  <span className="text-caption text-muted-foreground">
                    {event.type} &middot; {formatDate(event.date)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
