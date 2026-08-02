import { CheckCircle2 } from "lucide-react";

type SuccessMessageProps = {
  title: string;
  description: string;
};

// role="status" (polite live region) — announced to assistive tech without
// interrupting whatever the user is doing, appropriate for a success
// confirmation rather than an urgent alert.
export function SuccessMessage({ title, description }: SuccessMessageProps) {
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-md border border-success bg-surface p-4"
    >
      <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-success" />
      <div className="flex flex-col gap-1">
        <p className="text-body-sm font-medium text-foreground">{title}</p>
        <p className="text-body-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
