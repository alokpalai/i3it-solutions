import { cn } from "@/lib/utils";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export function Label({ children, required, className, ...props }: LabelProps) {
  return (
    <label className={cn("text-body-sm font-medium text-foreground", className)} {...props}>
      {children}
      {required && (
        <span aria-hidden="true" className="ml-0.5 text-error">
          *
        </span>
      )}
    </label>
  );
}
