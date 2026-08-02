import { PageCTA } from "@/components/internal/PageCTA";
import { requestQuoteLink } from "@/config/navigation";

type GovernmentCTAProps = {
  title?: string;
  description?: string;
};

// Government-specific defaults over the shared PageCTA banner (title copy +
// Request Quote / Contact Sales button pair repeat identically across all 7
// Government pages) — a thin default wrapper, not a reimplementation, so
// the banner markup stays defined in exactly one place
// (src/components/internal/PageCTA.tsx).
export function GovernmentCTA({
  title = "Need assistance with technology procurement?",
  description,
}: GovernmentCTAProps) {
  return (
    <PageCTA
      title={title}
      description={description}
      primary={requestQuoteLink}
      secondary={{ label: "Contact Sales", href: "/contact" }}
    />
  );
}
