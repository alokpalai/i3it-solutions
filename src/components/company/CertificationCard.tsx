import { CheckCircle2, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";

export type CertificationStatus = "confirmed" | "pending";

type CertificationCardProps = {
  name: string;
  description: string;
  status: CertificationStatus;
};

// "confirmed" is reserved for the one fact that's actually publishable
// today (GeM registered seller). Everything else on the Certifications
// page renders as "pending" by design — docs/CONTENT_STRATEGY.md §8.3: no
// item moves to confirmed without a verified document, and this card makes
// that distinction visible rather than implying every listed item is held.
export function CertificationCard({ name, description, status }: CertificationCardProps) {
  const isConfirmed = status === "confirmed";
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {isConfirmed ? (
          <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0 text-secondary" />
        ) : (
          <Clock aria-hidden="true" className="h-5 w-5 shrink-0 text-muted-foreground" />
        )}
        <p className="text-h5 text-foreground">{name}</p>
      </div>
      <p className="text-body-sm text-muted-foreground">{description}</p>
      <span
        className={
          isConfirmed
            ? "w-fit rounded-sm bg-surface-muted px-2.5 py-1 text-caption font-medium text-primary"
            : "w-fit rounded-sm border border-border px-2.5 py-1 text-caption font-medium text-muted-foreground"
        }
      >
        {isConfirmed ? "Confirmed" : "Pending verification"}
      </span>
    </Card>
  );
}
