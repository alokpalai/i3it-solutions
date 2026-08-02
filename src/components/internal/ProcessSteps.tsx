export type ProcessStep = { title: string; description: string };

type ProcessStepsProps = {
  steps: ProcessStep[];
};

// Numbered methodology/workflow pattern — introduced in Phase 3B once a
// real, approved sequence existed to show (docs/PROJECT.md §3's
// understand -> source -> integrate -> deploy -> support framework, and the
// RFQ-to-delivery flow on the Solutions landing page). Not built in Phase 3A
// since there was no genuine content for it yet.
export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.title} className="flex flex-col gap-2">
          <span className="text-overline font-semibold text-secondary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-h5 text-foreground">{step.title}</span>
          <span className="text-body-sm text-muted-foreground">{step.description}</span>
        </li>
      ))}
    </ol>
  );
}
