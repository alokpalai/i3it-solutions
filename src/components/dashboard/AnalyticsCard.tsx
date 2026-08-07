import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type AnalyticsCardProps = {
  title: string;
  data: { label: string; value: number }[];
  valueFormatter?: (value: number) => string;
  colorClassName?: string;
};

// The brief's "AnalyticsCard" — a titled card wrapping a horizontal bar
// chart. No charting library dependency (none exists in package.json —
// same reasoning as Phase 4D's ReportChart, which isn't present on this
// branch to reuse). Each bar's label/value is real visible text; the
// colored fill is aria-hidden decorative reinforcement, same
// WCAG-1.4.1-conscious pattern used throughout the dashboard's charts
// and indicators.
export function AnalyticsCard({ title, data, valueFormatter = (v) => String(v), colorClassName = "bg-secondary" }: AnalyticsCardProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <Card className="flex flex-col gap-4">
      <p className="text-h5 text-foreground">{title}</p>
      {data.length === 0 ? (
        <p className="text-body-sm text-muted-foreground">No data yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {data.map((datum) => (
            <div key={datum.label} className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2 text-caption text-muted-foreground">
                <span className="truncate">{datum.label}</span>
                <span className="shrink-0 font-medium text-foreground">{valueFormatter(datum.value)}</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-muted">
                <div
                  aria-hidden="true"
                  className={cn("h-full rounded-full transition-[width]", colorClassName)}
                  style={{ width: `${(datum.value / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
