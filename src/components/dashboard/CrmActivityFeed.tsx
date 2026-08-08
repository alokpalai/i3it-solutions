import Link from "next/link";
import { UserPlus, Phone, CalendarClock, FileUp, Landmark, FolderPlus, ClipboardList } from "lucide-react";
import type { CrmActivityItem, CrmActivityType } from "@/config/crmMockData";
import { getOrganizationById } from "@/config/crmMockData";
import { formatRelativeTime } from "@/lib/formatDate";

const TYPE_ICON: Record<CrmActivityType, typeof UserPlus> = {
  "Lead Created": UserPlus,
  "Call Logged": Phone,
  "Meeting Scheduled": CalendarClock,
  "Quotation Sent": FileUp,
  "Client Updated": Landmark,
  "Project Created": FolderPlus,
  "Task Assigned": ClipboardList,
};

// Distinct from ProjectActivityFeed (Projects, ProjectActivityItem shape)
// and the dashboard homepage's ActivityFeed (MockActivityItem, free-text
// actor/action/target) — this renders CrmActivityItem, typed by the CRM's
// own fixed activity taxonomy.
export function CrmActivityFeed({ items, limit }: { items: CrmActivityItem[]; limit?: number }) {
  const visible = limit ? items.slice(0, limit) : items;

  if (visible.length === 0) {
    return <p className="text-body-sm text-muted-foreground">No activity recorded yet.</p>;
  }

  return (
    <ol className="flex flex-col gap-4">
      {visible.map((item) => {
        const Icon = TYPE_ICON[item.type];
        const organization = item.organizationId ? getOrganizationById(item.organizationId) : undefined;
        return (
          <li key={item.id} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-muted">
              <Icon aria-hidden="true" className="h-3.5 w-3.5 text-secondary" />
            </span>
            <div className="flex flex-col">
              <p className="text-body-sm text-foreground">
                <span className="font-medium">{item.actor}</span> &mdash; {item.detail}
              </p>
              <p className="text-caption text-muted-foreground">
                {item.type} &middot; {formatRelativeTime(item.timestamp)}
                {organization && (
                  <>
                    {" "}
                    &middot;{" "}
                    <Link href={`/dashboard/crm/organizations/${organization.id}/overview`} className="hover:text-primary hover:underline">
                      {organization.name}
                    </Link>
                  </>
                )}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
