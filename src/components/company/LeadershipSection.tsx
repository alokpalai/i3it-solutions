import { CheckCircle2 } from "lucide-react";

type LeadershipSectionProps = {
  intro: string;
  philosophy: string[];
  placeholderNote: string;
};

// Deliberately has no names, titles or photos — the phase brief is explicit
// that leadership profiles must not be invented. The dashed-border block
// signals "this is a placeholder for future content," not a finished
// section, without resorting to fabricated bios to fill the space.
export function LeadershipSection({ intro, philosophy, placeholderNote }: LeadershipSectionProps) {
  return (
    <div className="flex flex-col gap-8">
      <p className="max-w-3xl text-body-lg text-muted-foreground">{intro}</p>
      <ul className="grid gap-4 sm:grid-cols-2">
        {philosophy.map((point) => (
          <li key={point} className="flex gap-3">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
            <span className="text-body text-foreground">{point}</span>
          </li>
        ))}
      </ul>
      <div className="rounded-md border border-dashed border-border p-8 text-center">
        <p className="text-body text-muted-foreground">{placeholderNote}</p>
      </div>
    </div>
  );
}
