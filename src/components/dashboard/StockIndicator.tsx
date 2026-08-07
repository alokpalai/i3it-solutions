import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import type { MockStockItem } from "@/config/procurementMockData";
import { availableStock, stockLevel } from "@/lib/procurementMetrics";
import { cn } from "@/lib/utils";

const LEVEL_STYLE: Record<ReturnType<typeof stockLevel>, string> = {
  "Out of Stock": "text-error",
  Low: "text-warning",
  OK: "text-success",
};

const LEVEL_ICON = {
  "Out of Stock": XCircle,
  Low: AlertTriangle,
  OK: CheckCircle2,
} as const;

// Distinguishes level by icon shape as well as color (same WCAG
// 1.4.1-conscious pattern as MilestoneCard/Timeline elsewhere in the
// dashboard) — never color alone.
export function StockIndicator({ stock }: { stock: MockStockItem }) {
  const level = stockLevel(stock);
  const available = availableStock(stock);
  const Icon = LEVEL_ICON[level];

  return (
    <span className={cn("inline-flex items-center gap-1.5 text-caption font-medium", LEVEL_STYLE[level])}>
      <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
      {available} available &middot; {level}
    </span>
  );
}
