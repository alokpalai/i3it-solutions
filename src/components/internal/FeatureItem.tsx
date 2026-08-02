import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureItemProps = {
  title: string;
  description?: string;
  href?: string;
  icon?: LucideIcon;
};

// Deliberately not card-wrapped by default — a bordered rectangle per item
// isn't warranted for a simple linked list of categories (Phase 3A design
// guidance: not every piece of information belongs in a card). Callers that
// want a bordered card compose Card around this directly.
export function FeatureItem({ title, description, href, icon: Icon }: FeatureItemProps) {
  const content = (
    <>
      {Icon && <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />}
      <span className="flex flex-col gap-1">
        <span className={cn("text-h5 text-foreground", href && "group-hover:text-primary")}>
          {title}
        </span>
        {description && <span className="text-body-sm text-muted-foreground">{description}</span>}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="group flex items-start gap-3 transition-colors duration-150">
        {content}
      </Link>
    );
  }

  return <div className="flex items-start gap-3">{content}</div>;
}
