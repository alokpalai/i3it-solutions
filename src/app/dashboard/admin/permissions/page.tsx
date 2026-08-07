import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { PermissionMatrix } from "@/components/dashboard/PermissionMatrix";
import { RESOURCE_NAMES, ROLE_NAMES } from "@/lib/permissions";

export const metadata: Metadata = { title: "Permissions — Admin" };

export default function AdminPermissionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-h3 text-foreground">Permissions</h1>
        <p className="text-body-sm text-muted-foreground">
          {RESOURCE_NAMES.length} permission categories across {ROLE_NAMES.length} roles. Granular assignment
          architecture — editing a cell here isn&rsquo;t wired up yet; the underlying grants are configured in
          src/lib/permissions.ts and applied to the database via prisma/seed.ts.
        </p>
      </div>
      <Card>
        <PermissionMatrix />
      </Card>
    </div>
  );
}
