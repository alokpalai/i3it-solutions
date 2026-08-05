import type { MockCalendarEvent, CalendarEventType } from "@/config/dashboardMockData";

const EVENT_COLOR: Record<CalendarEventType, string> = {
  Meeting: "bg-secondary",
  Deadline: "bg-error",
  Task: "bg-accent",
  Leave: "bg-warning",
  Birthday: "bg-success",
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

type CalendarWidgetProps = {
  events: MockCalendarEvent[];
  /** Defaults to the current month — a fixed reference date lets this stay
   * a Server Component (no client-side "today" or month-navigation state
   * needed for a first version). */
  referenceDate?: Date;
};

export function CalendarWidget({ events, referenceDate = new Date() }: CalendarWidgetProps) {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const todayIso = toIsoDate(new Date());

  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = firstOfMonth.getDay();

  const eventsByDate = new Map<string, MockCalendarEvent[]>();
  for (const event of events) {
    const list = eventsByDate.get(event.date) ?? [];
    list.push(event);
    eventsByDate.set(event.date, list);
  }

  const cells: { date: string | null; day: number | null }[] = [
    ...Array.from({ length: leadingBlanks }, () => ({ date: null, day: null })),
    ...Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const date = new Date(year, month, day);
      return { date: toIsoDate(date), day };
    }),
  ];

  return (
    <div className="flex flex-col gap-4">
      <p className="text-h5 text-foreground">
        {referenceDate.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
      </p>

      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map((day) => (
          <div key={day} className="py-1 text-center text-caption font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        {cells.map((cell, index) => {
          if (!cell.date) {
            return <div key={`blank-${index}`} />;
          }
          const dayEvents = eventsByDate.get(cell.date) ?? [];
          const isToday = cell.date === todayIso;
          return (
            <div
              key={cell.date}
              className={`flex min-h-16 flex-col gap-1 rounded-md border p-1.5 ${
                isToday ? "border-secondary bg-surface-muted" : "border-transparent"
              }`}
            >
              <span
                className={`text-caption ${isToday ? "font-semibold text-primary" : "text-muted-foreground"}`}
              >
                {cell.day}
              </span>
              <div className="flex flex-wrap gap-0.5">
                {dayEvents.slice(0, 3).map((event) => (
                  <span
                    key={event.id}
                    aria-hidden="true"
                    title={event.title}
                    className={`h-1.5 w-1.5 rounded-full ${EVENT_COLOR[event.type]}`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <ul className="sr-only">
        {events.map((event) => (
          <li key={event.id}>
            {event.title} — {event.type} on {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
