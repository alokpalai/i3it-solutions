import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { IconName } from "@/config/homepage";
import { homeIcons } from "./icons";

type IconCardProps = {
  icon: IconName;
  title: string;
  description: string;
  href?: string;
};

const content = (icon: IconName, title: string, description: string) => {
  const Icon = homeIcons[icon];
  return (
    <>
      <Icon aria-hidden="true" className="h-6 w-6 text-secondary" />
      <h3 className="text-h5 text-foreground">{title}</h3>
      <p className="text-body-sm text-muted-foreground">{description}</p>
    </>
  );
};

// Shared "icon + title + description(+link)" card used across Company
// Snapshot, What We Do, Why i3it, Featured Solutions and Featured Products.
// Non-link cards reuse the Card primitive; link cards hand-roll the same
// border/radius/hover treatment directly (Card's fixed p-6 can't be
// reliably overridden without tailwind-merge — see src/lib/utils.ts).
export function IconCard({ icon, title, description, href }: IconCardProps) {
  if (href) {
    return (
      <Link
        href={href}
        className="flex flex-col gap-3 rounded-md border border-border bg-background p-6 transition-[box-shadow,border-color] duration-150 ease-out hover:border-secondary hover:shadow-sm"
      >
        {content(icon, title, description)}
      </Link>
    );
  }

  return <Card className="flex flex-col gap-3">{content(icon, title, description)}</Card>;
}
