import { WorkflowTimeline, type WorkflowStep } from "@/components/internal/WorkflowTimeline";

type HiringProcessProps = {
  steps: WorkflowStep[];
};

// Thin, named wrapper over the shared WorkflowTimeline (also used by
// Government's procurement workflow) — keeps the numbered-step markup
// defined in exactly one place while giving the Careers page its own
// semantically named component, as the brief asks for.
export function HiringProcess({ steps }: HiringProcessProps) {
  return <WorkflowTimeline steps={steps} />;
}
