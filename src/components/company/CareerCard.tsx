import { Card } from "@/components/ui/Card";

type CareerCardProps = {
  title: string;
  description: string;
};

// Used for the Departments section (functional areas of work) — never for
// individual job openings, since no real openings exist to list
// (docs/CONTENT_STRATEGY.md §15: no fabricated postings).
export function CareerCard({ title, description }: CareerCardProps) {
  return (
    <Card className="flex flex-col gap-2">
      <p className="text-h5 text-foreground">{title}</p>
      <p className="text-body-sm text-muted-foreground">{description}</p>
    </Card>
  );
}
