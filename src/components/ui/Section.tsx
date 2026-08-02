import { cn } from "@/lib/utils";

export type SectionSpacing = "compact" | "default" | "spacious";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  spacing?: SectionSpacing;
  as?: "section" | "div";
};

// docs/DESIGN_SYSTEM.md §4: 64px vertical rhythm on mobile, 96-128px on
// desktop between major sections.
const spacingClasses: Record<SectionSpacing, string> = {
  compact: "py-10 md:py-16",
  default: "py-16 md:py-24 lg:py-32",
  spacious: "py-20 md:py-32",
};

export function Section({
  spacing = "default",
  as: Tag = "section",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn(spacingClasses[spacing], className)} {...props}>
      {children}
    </Tag>
  );
}
