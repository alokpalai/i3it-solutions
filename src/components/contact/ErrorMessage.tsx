import { AlertCircle } from "lucide-react";

type ErrorMessageProps = {
  title: string;
  description: string;
};

// role="alert" (assertive live region) — interrupts to announce a
// submission failure immediately, unlike SuccessMessage's polite status.
export function ErrorMessage({ title, description }: ErrorMessageProps) {
  return (
    <div role="alert" className="flex items-start gap-3 rounded-md border border-error bg-surface p-4">
      <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-error" />
      <div className="flex flex-col gap-1">
        <p className="text-body-sm font-medium text-foreground">{title}</p>
        <p className="text-body-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
