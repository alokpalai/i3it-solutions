import { cn } from "@/lib/utils";

export type ReportChartDatum = { label: string; value: number; sublabel?: string; colorClassName?: string };

type ReportChartProps = {
  data: ReportChartDatum[];
  valueFormatter?: (value: number) => string;
  colorClassName?: string;
};

// Mock calculations only, per the brief — no charting library dependency
// (none exists in package.json); a horizontal bar treatment covers every
// report the brief asks for (distributions, a funnel in stage order, a
// two-bar Won-vs-Lost comparison) without needing five different chart
// shapes for a mock-data reporting view. Each bar's label and value are
// real visible text, not canvas/SVG-only — the colored fill is purely
// decorative reinforcement of what the text already says, so it's
// aria-hidden rather than needing its own ARIA description.
export function ReportChart({ data, valueFormatter = (value) => String(value), colorClassName = "bg-secondary" }: ReportChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  if (data.length === 0) {
    return <p className="text-body-sm text-muted-foreground">No data yet.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {data.map((datum) => (
        <div key={datum.label} className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2 text-caption text-muted-foreground">
            <span className="truncate">
              {datum.label}
              {datum.sublabel ? ` · ${datum.sublabel}` : ""}
            </span>
            <span className="shrink-0 font-medium text-foreground">{valueFormatter(datum.value)}</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-muted">
            <div
              aria-hidden="true"
              className={cn("h-full rounded-full transition-[width]", datum.colorClassName ?? colorClassName)}
              style={{ width: `${(datum.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
