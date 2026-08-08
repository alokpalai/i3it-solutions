import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { CrmActivityFeed } from "@/components/dashboard/CrmActivityFeed";
import { mockCrmActivity } from "@/config/crmMockData";

export const metadata: Metadata = { title: "Activity — CRM" };

export default function CrmActivityPage() {
  const items = [...mockCrmActivity].sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-h3 text-foreground">Activity</h1>
        <p className="text-body-sm text-muted-foreground">{items.length} events recorded across the CRM, most recent first.</p>
      </div>
      <Card>
        <CrmActivityFeed items={items} />
      </Card>
    </div>
  );
}
