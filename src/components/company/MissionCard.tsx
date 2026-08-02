import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

type MissionCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

// Left-aligned brochure-style card — used for Mission pillars and Business
// Focus areas, where each item reads as a capability statement.
export function MissionCard({ title, description, icon: Icon }: MissionCardProps) {
  return (
    <Card className="flex flex-col gap-3">
      <Icon aria-hidden="true" className="h-6 w-6 text-secondary" />
      <p className="text-h5 text-foreground">{title}</p>
      <p className="text-body-sm text-muted-foreground">{description}</p>
    </Card>
  );
}
