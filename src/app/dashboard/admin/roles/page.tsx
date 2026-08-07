import type { Metadata } from "next";
import { RoleMatrix, type RoleMatrixRow } from "@/components/dashboard/RoleMatrix";
import { AdminActionButton } from "@/components/dashboard/AdminActionButton";
import { ROLE_NAMES } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Roles — Admin" };

async function getRoleUserCounts(): Promise<RoleMatrixRow[]> {
  try {
    const roles = await prisma.role.findMany({ include: { _count: { select: { users: true } } } });
    return roles.map((role) => ({ name: role.name, userCount: role._count.users }));
  } catch {
    return [];
  }
}

export default async function AdminRolesPage() {
  const roleCounts = await getRoleUserCounts();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-h3 text-foreground">Roles</h1>
          <p className="text-body-sm text-muted-foreground">
            {ROLE_NAMES.length} roles configured in src/lib/permissions.ts, the real source of truth prisma/seed.ts
            writes to the database.
          </p>
        </div>
        <AdminActionButton label="New Role" />
      </div>
      <RoleMatrix roles={roleCounts} />
    </div>
  );
}
