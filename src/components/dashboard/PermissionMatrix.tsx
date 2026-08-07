import { Check } from "lucide-react";
import { ROLE_NAMES, RESOURCE_NAMES, DEFAULT_ROLE_PERMISSIONS, hasPermission } from "@/lib/permissions";

// The brief's "PermissionMatrix" — the classic RBAC cross-tab: resources
// as rows, roles as columns. Reads directly from
// src/lib/permissions.ts's real DEFAULT_ROLE_PERMISSIONS, not a mock
// dataset — this is an accurate picture of what's actually configured
// (pending a prisma/seed.ts re-run to sync it to the database — see the
// file's own header comment).
export function PermissionMatrix() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1400px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border text-caption font-medium text-muted-foreground">
            <th scope="col" className="sticky left-0 bg-background py-2 pr-4">Resource</th>
            {ROLE_NAMES.map((role) => (
              <th key={role} scope="col" className="px-3 py-2 text-center">{role}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {RESOURCE_NAMES.map((resource) => (
            <tr key={resource} className="border-b border-border text-body-sm">
              <td className="sticky left-0 bg-background py-2.5 pr-4 font-medium text-foreground">{resource}</td>
              {ROLE_NAMES.map((role) => {
                const permissions = DEFAULT_ROLE_PERMISSIONS[role];
                const canView = hasPermission(permissions, resource, "view");
                const canManage = hasPermission(permissions, resource, "manage");
                const label = canManage ? "View and manage" : canView ? "View only" : "No access";
                return (
                  <td key={role} className="px-3 py-2.5 text-center">
                    <span className="sr-only">{label}</span>
                    <span aria-hidden="true" className="flex items-center justify-center gap-1">
                      <span
                        title="View"
                        className={`flex h-5 w-5 items-center justify-center rounded-sm ${canView ? "bg-secondary/15 text-secondary" : "bg-surface-muted text-border-strong"}`}
                      >
                        {canView && <Check className="h-3 w-3" />}
                      </span>
                      <span
                        title="Manage"
                        className={`flex h-5 w-5 items-center justify-center rounded-sm ${canManage ? "bg-accent/15 text-accent" : "bg-surface-muted text-border-strong"}`}
                      >
                        {canManage && <Check className="h-3 w-3" />}
                      </span>
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
