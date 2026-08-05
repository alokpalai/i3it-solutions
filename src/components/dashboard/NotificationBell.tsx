import Link from "next/link";
import { Bell } from "lucide-react";
import type { MockNotification } from "@/config/dashboardMockData";

type NotificationBellProps = {
  notifications: MockNotification[];
};

// Same <details>/<summary> dropdown pattern as ProfileDropdown — a Server
// Component, no client state needed just to show/hide a panel.
export function NotificationBell({ notifications }: NotificationBellProps) {
  const unread = notifications.filter((n) => !n.read);
  const preview = notifications.slice(0, 4);

  return (
    <details className="group relative">
      <summary className="relative flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-sm text-foreground marker:content-none hover:bg-surface hover:text-primary">
        <Bell aria-hidden="true" className="h-5 w-5" />
        {unread.length > 0 && (
          <span
            aria-hidden="true"
            className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground"
          >
            {unread.length}
          </span>
        )}
        <span className="sr-only">
          Notifications{unread.length > 0 ? ` (${unread.length} unread)` : ""}
        </span>
      </summary>

      <div className="absolute right-0 z-50 mt-2 w-80 rounded-md border border-border bg-background py-2 shadow-lg">
        <div className="flex items-center justify-between px-4 py-1.5">
          <p className="text-body-sm font-medium text-foreground">Notifications</p>
          {unread.length > 0 && (
            <span className="text-caption text-muted-foreground">{unread.length} unread</span>
          )}
        </div>
        <ul className="flex flex-col">
          {preview.map((notification) => (
            <li key={notification.id} className="border-t border-border px-4 py-2.5">
              <div className="flex items-start gap-2">
                {!notification.read && (
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                )}
                <div className={notification.read ? "pl-3.5" : ""}>
                  <p className="text-body-sm font-medium text-foreground">{notification.title}</p>
                  <p className="text-caption text-muted-foreground">{notification.message}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="border-t border-border px-4 pt-2">
          <Link href="/dashboard/notifications" className="text-body-sm font-medium text-primary hover:underline">
            View all notifications
          </Link>
        </div>
      </div>
    </details>
  );
}
