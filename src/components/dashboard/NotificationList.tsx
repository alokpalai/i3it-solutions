import { Bell, CheckSquare, FolderKanban, MessageSquare, Megaphone, Settings } from "lucide-react";
import type { MockNotification, NotificationCategory } from "@/config/dashboardMockData";
import { formatRelativeTime } from "@/lib/formatDate";

const CATEGORY_ICON: Record<NotificationCategory, typeof Bell> = {
  Task: CheckSquare,
  Project: FolderKanban,
  Message: MessageSquare,
  System: Settings,
  Announcement: Megaphone,
};

export function NotificationList({ notifications }: { notifications: MockNotification[] }) {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <Bell aria-hidden="true" className="h-8 w-8 text-muted-foreground" />
        <p className="text-body-sm text-muted-foreground">You&rsquo;re all caught up — no notifications.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col divide-y divide-border">
      {notifications.map((notification) => {
        const Icon = CATEGORY_ICON[notification.category];
        return (
          <li
            key={notification.id}
            className={`flex items-start gap-4 py-4 ${notification.read ? "" : "bg-surface-muted/40"}`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted">
              <Icon aria-hidden="true" className="h-4 w-4 text-secondary" />
            </span>
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="text-body-sm font-medium text-foreground">{notification.title}</p>
                {!notification.read && (
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-secondary" />
                )}
                {notification.priority === "High" && (
                  <span className="rounded-sm border border-error px-1.5 py-0.5 text-[10px] font-semibold uppercase text-error">
                    High
                  </span>
                )}
              </div>
              <p className="text-body-sm text-muted-foreground">{notification.message}</p>
              <p className="text-caption text-muted-foreground">
                {notification.category} &middot; {formatRelativeTime(notification.date)}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
