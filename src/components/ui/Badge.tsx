import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "accent";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

// docs/DESIGN_SYSTEM.md §6: navy-tint bg + navy text by default;
// orange-deep reserved for the rare "featured"/priority marker.
const variants: Record<BadgeVariant, string> = {
  default: "bg-surface-muted text-primary",
  accent: "border border-accent text-accent",
};

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2.5 py-1 text-caption font-medium",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
