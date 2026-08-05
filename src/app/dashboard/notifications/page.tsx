import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { NotificationList } from "@/components/dashboard/NotificationList";
import { mockNotifications } from "@/config/dashboardMockData";

export const metadata: Metadata = { title: "Notifications" };

export default function NotificationsPage() {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h2 text-foreground">Notifications</h1>
        <p className="text-body-sm text-muted-foreground">
          {unreadCount > 0
            ? `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`
            : "You're all caught up."}
        </p>
      </div>

      <Card>
        <NotificationList notifications={mockNotifications} />
      </Card>
    </div>
  );
}
