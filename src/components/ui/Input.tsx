import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "h-11 w-full rounded-md border bg-background px-4 text-body text-foreground placeholder:text-muted-foreground",
        "transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60",
        invalid ? "border-error" : "border-border",
        className,
      )}
      {...props}
    />
  );
});
