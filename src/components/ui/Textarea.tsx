import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid, rows = 5, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(
        "w-full rounded-md border bg-background px-4 py-3 text-body text-foreground placeholder:text-muted-foreground",
        "transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60",
        invalid ? "border-error" : "border-border",
        className,
      )}
      {...props}
    />
  );
});
