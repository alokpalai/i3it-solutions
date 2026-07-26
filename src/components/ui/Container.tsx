import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

// docs/DESIGN_SYSTEM.md §4: 1280px max-width, 24/32/64px gutters
// (mobile/tablet/desktop), never full-bleed beyond that on large screens.
export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1280px] px-6 md:px-8 lg:px-16", className)}
      {...props}
    >
      {children}
    </div>
  );
}
