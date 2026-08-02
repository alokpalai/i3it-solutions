import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

export type CapabilityCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type GovernmentCapabilitiesProps = {
  items: CapabilityCard[];
};

// Bordered feature cards — the Government section leans on Card explicitly
// (unlike Solutions/Products, which deliberately avoid cards per the Phase
// 3A "not everything is a card" guidance) because this section is meant to
// read as an enterprise capability brochure, matching the brief's Dell/
// Cisco/HPE-style comparison.
export function GovernmentCapabilities({ items }: GovernmentCapabilitiesProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ title, description, icon: Icon }) => (
        <Card key={title} className="flex flex-col gap-3">
          <Icon aria-hidden="true" className="h-6 w-6 text-secondary" />
          <p className="text-h5 text-foreground">{title}</p>
          <p className="text-body-sm text-muted-foreground">{description}</p>
        </Card>
      ))}
    </div>
  );
}
