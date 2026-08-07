import type { Metadata } from "next";
import { NotificationCard } from "@/components/dashboard/NotificationCard";
import { mockNotificationChannels } from "@/config/adminMockData";

export const metadata: Metadata = { title: "Notifications — Admin" };

export default function AdminNotificationsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-h3 text-foreground">Notifications</h1>
        <p className="text-body-sm text-muted-foreground">Channel configuration for platform-wide notifications.</p>
      </div>
      <NotificationCard channels={mockNotificationChannels} />
    </div>
  );
}
