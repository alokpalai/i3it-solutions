export type WorkflowStep = { title: string; description: string };

type WorkflowTimelineProps = {
  steps: WorkflowStep[];
};

// A longer, genuinely sequential procurement workflow (9 ordered steps)
// reads better as a numbered timeline than ProcessSteps' "01"-overline grid
// (built for 3-6 non-sequential items, e.g. the four capability pillars) —
// this component is specifically for ordered, step-by-step processes, using
// a semantic <ol> with a filled numbered node per step.
export function WorkflowTimeline({ steps }: WorkflowTimelineProps) {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.title} className="flex flex-col gap-3">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-body-sm font-semibold text-primary-foreground"
          >
            {index + 1}
          </span>
          <p className="text-h5 text-foreground">{step.title}</p>
          <p className="text-body-sm text-muted-foreground">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
