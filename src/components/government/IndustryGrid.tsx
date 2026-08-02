import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

export type IndustryItem = { label: string; icon: LucideIcon };

type IndustryGridProps = {
  items: IndustryItem[];
};

export function IndustryGrid({ items }: IndustryGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ label, icon: Icon }) => (
        <Card key={label} className="flex items-center gap-3 py-4">
          <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-secondary" />
          <span className="text-body font-medium text-foreground">{label}</span>
        </Card>
      ))}
    </div>
  );
}
