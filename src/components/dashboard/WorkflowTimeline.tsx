import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type WorkflowTimelineProps = {
  steps: readonly string[];
  /** Index of the current/furthest-reached step. Omit for a purely
   * informational, non-progress view (e.g. the dashboard's static
   * workflow reference). */
  currentStepIndex?: number;
};

// Visual workflow per the brief — a horizontal stepper, scrolling on
// narrow viewports. Generic over `steps` so it can show the static
// 9-stage procurement lifecycle reference (no currentStepIndex) or, if
// wired to a specific RFQ/PO's status later, highlight progress through
// it — the same component either way.
export function WorkflowTimeline({ steps, currentStepIndex }: WorkflowTimelineProps) {
  return (
    <ol className="flex min-w-max items-center overflow-x-auto py-2">
      {steps.map((step, index) => {
        const isDone = currentStepIndex !== undefined && index < currentStepIndex;
        const isCurrent = currentStepIndex !== undefined && index === currentStepIndex;
        const isLast = index === steps.length - 1;

        return (
          <li key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-caption font-semibold",
                  // Solid fill only for "current" (reuses Button.tsx's
                  // primary/primary-foreground pair); "done" uses the
                  // same light border+tint+text treatment every other
                  // badge in this codebase uses — there's no
                  // success-foreground token for solid-fill-plus-text.
                  isDone && "border-success bg-success/10 text-success",
                  isCurrent && "border-primary bg-primary text-primary-foreground",
                  !isDone && !isCurrent && "border-border-strong bg-surface-muted text-muted-foreground",
                )}
              >
                {isDone ? <Check aria-hidden="true" className="h-4 w-4" /> : index + 1}
              </span>
              <span
                className={cn(
                  "w-24 text-center text-caption",
                  isCurrent ? "font-semibold text-foreground" : "text-muted-foreground",
                )}
              >
                {step}
              </span>
            </div>
            {!isLast && (
              <div
                aria-hidden="true"
                className={cn("mx-2 h-0.5 w-10 shrink-0 sm:w-16", isDone ? "bg-success" : "bg-border-strong")}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
