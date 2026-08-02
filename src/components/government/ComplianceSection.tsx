import Link from "next/link";
import { FileCheck } from "lucide-react";

type ComplianceSectionProps = {
  intro: string;
  points: string[];
  certificationNote: string;
};

// Explains procurement documentation/coordination honestly — never a
// certification claim itself; the certification-status link routes to the
// one page (/company/certifications) that states verification status per
// item (docs/CONTENT_STRATEGY.md §8.3), so this section can't drift into an
// implied claim.
export function ComplianceSection({ intro, points, certificationNote }: ComplianceSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <p className="max-w-2xl text-body text-muted-foreground">{intro}</p>
      <ul className="grid gap-4 sm:grid-cols-2">
        {points.map((point) => (
          <li key={point} className="flex gap-3">
            <FileCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
            <span className="text-body text-foreground">{point}</span>
          </li>
        ))}
      </ul>
      <p className="text-body-sm text-muted-foreground">
        {certificationNote}{" "}
        <Link href="/company/certifications" className="font-medium text-primary hover:underline">
          View certifications &amp; registrations
        </Link>
      </p>
    </div>
  );
}
