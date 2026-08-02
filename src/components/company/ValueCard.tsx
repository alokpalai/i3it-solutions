import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

type ValueCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

// Centered, badge-icon treatment — visually distinct from MissionCard's
// left-aligned brochure style, used for Core Values and CSR focus areas
// where each item reads as a principle rather than a capability.
export function ValueCard({ title, description, icon: Icon }: ValueCardProps) {
  return (
    <Card className="flex flex-col items-center gap-3 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted">
        <Icon aria-hidden="true" className="h-6 w-6 text-secondary" />
      </span>
      <p className="text-h5 text-foreground">{title}</p>
      <p className="text-body-sm text-muted-foreground">{description}</p>
    </Card>
  );
}
