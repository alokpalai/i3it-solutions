import { ChevronDown, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { DEFAULT_ROLE_PERMISSIONS, ROLE_NAMES, type RoleName } from "@/lib/permissions";

const ROLE_DESCRIPTIONS: Record<RoleName, string> = {
  "Super Admin": "Full access to every resource, including Settings — the only role that can manage company/security configuration.",
  Admin: "Full operational access to every module except Settings management.",
  "Project Manager": "Manages projects, documents and delivery timelines.",
  Sales: "Owns CRM records and RFQ intake for prospective clients.",
  Support: "Views documents and RFQs to assist clients post-deployment.",
  Procurement: "Owns vendor sourcing, RFQs, quotations, purchase orders and inventory.",
  Finance: "Owns reporting and has visibility into procurement and inventory spend.",
  HR: "Views the employee directory, documents and reports.",
  Employee: "Baseline access — dashboard and documents only.",
  Viewer: "Broad read-only access across projects, CRM, procurement and inventory.",
};

const ELEVATED_ROLES = new Set<RoleName>(["Super Admin", "Admin"]);

export type RoleMatrixRow = { name: string; userCount: number };

// The brief's "RoleMatrix" — one card per role, summarizing what it
// grants. Reads directly from src/lib/permissions.ts's
// DEFAULT_ROLE_PERMISSIONS (the real RBAC source of truth this codebase
// already has, not a fictional mock matrix) — userCount alone comes from
// the caller, since that's a live database count.
export function RoleMatrix({ roles }: { roles: RoleMatrixRow[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {ROLE_NAMES.map((roleName) => {
        const permissions = DEFAULT_ROLE_PERMISSIONS[roleName];
        const manageCount = permissions.filter((p) => p.endsWith(":manage")).length;
        const userCount = roles.find((r) => r.name === roleName)?.userCount ?? 0;
        const isElevated = ELEVATED_ROLES.has(roleName);

        return (
          <Card key={roleName} className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <p className="flex items-center gap-1.5 text-body-sm font-medium text-foreground">
                {isElevated && <ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />}
                {roleName}
              </p>
              <span className="shrink-0 text-caption text-muted-foreground">{userCount} user{userCount === 1 ? "" : "s"}</span>
            </div>
            <p className="text-caption text-muted-foreground">{ROLE_DESCRIPTIONS[roleName]}</p>
            <div className="flex items-center gap-3 text-caption text-muted-foreground">
              <span>{permissions.length} permissions</span>
              <span aria-hidden="true">&middot;</span>
              <span>{manageCount} manage</span>
            </div>
            <details className="group mt-auto border-t border-border pt-3">
              <summary className="flex cursor-pointer list-none items-center justify-between text-caption font-medium text-primary marker:content-none">
                View permissions
                <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
              </summary>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {permissions.map((permission) => (
                  <li key={permission} className="rounded-sm bg-surface-muted px-2 py-1 text-caption text-muted-foreground">
                    {permission}
                  </li>
                ))}
              </ul>
            </details>
          </Card>
        );
      })}
    </div>
  );
}
