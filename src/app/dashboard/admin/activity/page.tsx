import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { AdminActivityView } from "@/components/dashboard/AdminActivityView";
import { mockAuditLog } from "@/config/adminMockData";

export const metadata: Metadata = { title: "Activity — Admin" };

export default function AdminActivityPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-h3 text-foreground">Activity Log</h1>
        <p className="text-body-sm text-muted-foreground">
          {mockAuditLog.length} events across the platform. Timestamp, user, module, action, object, and
          placeholder IP/device columns per the enterprise audit log spec.
        </p>
      </div>
      <Card>
        <AdminActivityView entries={mockAuditLog} />
      </Card>
    </div>
  );
}
