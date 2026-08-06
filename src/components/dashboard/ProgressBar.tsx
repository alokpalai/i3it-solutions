import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number; // 0-100
  label?: string;
  colorClassName?: string;
  className?: string;
};

// Extracted once the same "label + percentage + filled track" markup
// started repeating across ProjectCard, TaskTable and TaskCard.
export function ProgressBar({ value, label, colorClassName = "bg-secondary", className }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <div className="flex items-center justify-between text-caption text-muted-foreground">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-2 w-full overflow-hidden rounded-full bg-surface-muted"
      >
        <div className={cn("h-full rounded-full transition-[width]", colorClassName)} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
