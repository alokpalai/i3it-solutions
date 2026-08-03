import { Clock } from "lucide-react";

export type OfficeHoursEntry = { day: string; hours: string };

type OfficeHoursProps = {
  schedule?: OfficeHoursEntry[];
};

// No hours are invented — until an owner-confirmed schedule exists, this
// renders the same honest "awaiting official information" pattern used by
// ContactCard (docs/DECISIONS.md A13).
export function OfficeHours({ schedule }: OfficeHoursProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Clock aria-hidden="true" className="h-5 w-5 text-secondary" />
        <p className="text-body-sm font-medium text-foreground">Business hours</p>
      </div>
      {schedule && schedule.length > 0 ? (
        <dl className="flex flex-col gap-1">
          {schedule.map((entry) => (
            <div key={entry.day} className="flex justify-between gap-4 text-body-sm text-muted-foreground">
              <dt>{entry.day}</dt>
              <dd>{entry.hours}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="text-body-sm italic text-muted-foreground">Awaiting official information</p>
      )}
    </div>
  );
}
