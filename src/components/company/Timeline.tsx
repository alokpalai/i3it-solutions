export type TimelineEntry = { period: string; description: string };

type TimelineProps = {
  entries: TimelineEntry[];
};

// A connected-line vertical timeline — distinct from WorkflowTimeline's
// numbered-step grid, which is for sequential processes, not chronological
// history. Deliberately built to hold as few or as many entries as are
// actually true; nothing pads it out to look like a longer growth story
// than the verified facts support.
export function Timeline({ entries }: TimelineProps) {
  return (
    <ol className="flex flex-col gap-8 border-l-2 border-border pl-6">
      {entries.map((entry) => (
        <li key={entry.period} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[1.6rem] top-1 h-3 w-3 rounded-full border-2 border-background bg-primary"
          />
          <p className="text-overline uppercase tracking-wide text-secondary">{entry.period}</p>
          <p className="mt-1 max-w-2xl text-body text-foreground">{entry.description}</p>
        </li>
      ))}
    </ol>
  );
}
