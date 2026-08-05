import { ShieldAlert } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Access Denied",
  description: "You don't have permission to view this page.",
  path: "/access-denied",
  noindex: true,
});

// Reached when a signed-in user hits a route/action their role doesn't
// have permission for — distinct from being redirected to /login, which
// is for not being signed in at all. No protected feature pages exist yet
// to actually trigger this (Phase 4B+); PermissionGuard-gated UI and
// future route-level permission checks both point here once they do.
export default function AccessDeniedPage() {
  return (
    <Section className="flex items-center">
      <Container className="flex flex-col items-center gap-6 py-12 text-center">
        <ShieldAlert aria-hidden="true" className="h-12 w-12 text-error" />
        <div className="flex flex-col gap-3">
          <h1 className="text-h1 text-foreground">Access denied</h1>
          <p className="max-w-md text-body-lg text-muted-foreground">
            Your account doesn&rsquo;t have permission to view this page. If you believe this is
            a mistake, contact your administrator.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Button href="/profile" variant="accent" size="md">
            Go to Profile
          </Button>
          <Button href="/" variant="secondary" size="md">
            Return Home
          </Button>
        </div>
      </Container>
    </Section>
  );
}
