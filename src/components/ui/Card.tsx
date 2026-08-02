import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Only apply hover elevation when the card is actually an interactive
   * target (e.g. wraps a link) — a static informational card shouldn't
   * imply affordance it doesn't have. */
  interactive?: boolean;
};

// docs/DESIGN_SYSTEM.md §6: flat, 1px border, 8px radius, no shadow by
// default. Domain-specific cards (Product, Brand, Client, ...) compose this
// primitive later — it provides structure only, not a fixed layout.
export function Card({ interactive = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-background p-6",
        interactive &&
          "transition-[box-shadow,border-color] duration-150 ease-out hover:border-secondary hover:shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
