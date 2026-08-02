import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

export type TechnologyItem = { label: string; icon: LucideIcon; href?: string };

type TechnologyGridProps = {
  items: TechnologyItem[];
};

export function TechnologyGrid({ items }: TechnologyGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ label, icon: Icon, href }) => {
        const cardContent = (
          <Card interactive={Boolean(href)} className="flex items-center gap-3 py-4">
            <Icon aria-hidden="true" className="h-6 w-6 shrink-0 text-secondary" />
            <span className="text-body font-medium text-foreground">{label}</span>
          </Card>
        );

        if (!href) {
          return <div key={label}>{cardContent}</div>;
        }

        return (
          <Link key={label} href={href} className="block">
            {cardContent}
          </Link>
        );
      })}
    </div>
  );
}
