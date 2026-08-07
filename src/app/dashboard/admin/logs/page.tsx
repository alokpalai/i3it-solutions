import type { Metadata } from "next";
import { Info, AlertTriangle, AlertOctagon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { mockSystemLogs, type LogLevel } from "@/config/adminMockData";
import { formatRelativeTime } from "@/lib/formatDate";

export const metadata: Metadata = { title: "Logs — Admin" };

const LEVEL_STYLE: Record<LogLevel, string> = {
  Info: "border-secondary/30 bg-secondary/10 text-secondary",
  Warning: "border-warning/30 bg-warning/10 text-warning",
  Error: "border-error/30 bg-error/10 text-error",
};

const LEVEL_ICON: Record<LogLevel, typeof Info> = {
  Info: Info,
  Warning: AlertTriangle,
  Error: AlertOctagon,
};

// System-level technical log — distinct from /dashboard/admin/activity's
// user-facing audit trail (who did what). This is what a service would
// emit (scheduler runs, backup jobs, rate-limit engagements) rather than
// what a person did. No real log aggregation exists yet — same mock
// footing as the rest of this module's non-database-backed pages.
export default function AdminLogsPage() {
  const entries = [...mockSystemLogs].sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-h3 text-foreground">System Logs</h1>
        <p className="text-body-sm text-muted-foreground">{entries.length} recent system events.</p>
      </div>
      <Card>
        <ol className="flex flex-col divide-y divide-border">
          {entries.map((entry) => {
            const Icon = LEVEL_ICON[entry.level];
            return (
              <li key={entry.id} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
                <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${LEVEL_STYLE[entry.level]}`}>
                  <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-body-sm font-medium text-foreground">{entry.source}</span>
                    <span className={`inline-flex w-fit items-center rounded-sm border px-2 py-0.5 text-[10px] font-semibold uppercase ${LEVEL_STYLE[entry.level]}`}>
                      {entry.level}
                    </span>
                  </div>
                  <p className="text-body-sm text-muted-foreground">{entry.message}</p>
                  <p className="text-caption text-muted-foreground">{formatRelativeTime(entry.timestamp)}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Card>
    </div>
  );
}
