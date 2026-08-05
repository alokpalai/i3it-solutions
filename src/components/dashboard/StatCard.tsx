import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

type StatCardProps = {
  label: string;
  value: string | number;
  icon: LucideIcon;
};

// The dashboard homepage's top stat row (Assigned Projects, Pending
// Tasks, etc.) — deliberately no fake trend/percentage-change arrows;
// there's no historical data behind this mock dataset to compute one
// honestly.
export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <Card className="flex items-center gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-surface-muted">
        <Icon aria-hidden="true" className="h-5 w-5 text-secondary" />
      </span>
      <div className="flex flex-col">
        <span className="text-h3 text-foreground">{value}</span>
        <span className="text-caption text-muted-foreground">{label}</span>
      </div>
    </Card>
  );
}
