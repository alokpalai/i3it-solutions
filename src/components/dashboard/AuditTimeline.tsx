import { Users, ShieldCheck, FolderKanban, Handshake, ShoppingCart, FileText, Settings, Lock, Monitor } from "lucide-react";
import type { MockAuditLogEntry, AuditModule } from "@/config/adminMockData";
import { formatRelativeTime } from "@/lib/formatDate";

const MODULE_ICON: Record<AuditModule, typeof Users> = {
  Users: Users,
  Roles: ShieldCheck,
  Projects: FolderKanban,
  CRM: Handshake,
  Procurement: ShoppingCart,
  Documents: FileText,
  Settings: Settings,
  Security: Lock,
};

// The brief's "AuditTimeline" — enterprise activity log. Distinct from
// CrmActivityFeed/ProjectActivityFeed (each renders their own module's
// own activity-item shape) — this one renders MockAuditLogEntry, which
// additionally carries the IP/device placeholder columns the brief's
// ACTIVITY LOG section asks for.
export function AuditTimeline({ entries, limit }: { entries: MockAuditLogEntry[]; limit?: number }) {
  const visible = limit ? entries.slice(0, limit) : entries;

  if (visible.length === 0) {
    return <p className="text-body-sm text-muted-foreground">No activity recorded yet.</p>;
  }

  return (
    <ol className="flex flex-col gap-4">
      {visible.map((entry) => {
        const Icon = MODULE_ICON[entry.module];
        return (
          <li key={entry.id} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-muted">
              <Icon aria-hidden="true" className="h-3.5 w-3.5 text-secondary" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="text-body-sm text-foreground">
                <span className="font-medium">{entry.actor}</span> {entry.action.toLowerCase()}
                {entry.object !== "—" && <> &mdash; {entry.object}</>}
              </p>
              <p className="flex flex-wrap items-center gap-x-2 text-caption text-muted-foreground">
                <span>{entry.module}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{formatRelativeTime(entry.timestamp)}</span>
                {entry.device !== "—" && (
                  <span className="flex items-center gap-1">
                    <Monitor aria-hidden="true" className="h-3 w-3" />
                    {entry.device}
                  </span>
                )}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
