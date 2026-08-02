import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

type ContactCardProps = {
  icon: LucideIcon;
  label: string;
  /** Omit (or pass null) when no owner-confirmed value exists yet — never
   * fabricate a phone number, email address or office address
   * (docs/CONTENT_STRATEGY.md §9.2, docs/DECISIONS.md A13). */
  value?: string | null;
  href?: string;
};

export function ContactCard({ icon: Icon, label, value, href }: ContactCardProps) {
  const content = (
    <Card className="flex flex-col gap-2">
      <Icon aria-hidden="true" className="h-5 w-5 text-secondary" />
      <p className="text-body-sm font-medium text-foreground">{label}</p>
      {value ? (
        <p className="text-body text-muted-foreground">{value}</p>
      ) : (
        <p className="text-body-sm italic text-muted-foreground">Awaiting official information</p>
      )}
    </Card>
  );

  if (href && value) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}
