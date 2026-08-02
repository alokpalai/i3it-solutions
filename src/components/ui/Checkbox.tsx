import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

// Native checkbox styled via accent-color (the design token itself, not an
// arbitrary value) — keeps full native keyboard/focus/AT behavior rather
// than hand-rolling a custom SVG control.
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, invalid, style, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type="checkbox"
      aria-invalid={invalid || undefined}
      style={{ accentColor: "var(--color-primary)", ...style }}
      className={cn(
        "mt-0.5 h-4 w-4 shrink-0 rounded-sm border border-border",
        invalid && "outline outline-2 outline-error",
        className,
      )}
      {...props}
    />
  );
});
