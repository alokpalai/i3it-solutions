import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Caller controls the semantic level so document heading order stays
   * valid in context — this component never assumes its position on the page. */
  headingLevel?: "h2" | "h3";
  className?: string;
};

const headingSize: Record<NonNullable<SectionHeaderProps["headingLevel"]>, string> = {
  h2: "text-h2",
  h3: "text-h3",
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  headingLevel = "h2",
  className,
}: SectionHeaderProps) {
  const HeadingTag = headingLevel;

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-overline uppercase tracking-wide text-secondary">{eyebrow}</p>
      )}
      <HeadingTag className={cn(headingSize[headingLevel], "text-foreground")}>
        {title}
      </HeadingTag>
      {description && (
        <p className="text-body-lg max-w-2xl text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
