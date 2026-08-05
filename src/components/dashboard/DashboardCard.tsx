import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

type DashboardCardProps = {
  title: string;
  action?: { label: string; href: string };
  children: React.ReactNode;
  className?: string;
};

// Generic titled-section wrapper used across the dashboard homepage's
// widgets (ActivityFeed, QuickActions, project/notification previews,
// etc.) — one place for the "card with a heading and an optional 'view
// all' link" shape, rather than each widget re-implementing it.
export function DashboardCard({ title, action, children, className }: DashboardCardProps) {
  return (
    <Card className={className}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-h5 text-foreground">{title}</h2>
        {action && (
          <Link
            href={action.href}
            className="inline-flex shrink-0 items-center gap-1 text-caption font-medium text-primary hover:underline"
          >
            {action.label}
            <ArrowRight aria-hidden="true" className="h-3 w-3" />
          </Link>
        )}
      </div>
      {children}
    </Card>
  );
}
