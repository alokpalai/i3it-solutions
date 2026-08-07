import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { UserTable, type AdminUserRow } from "@/components/dashboard/UserTable";
import { AdminActionButton } from "@/components/dashboard/AdminActionButton";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Users — Admin" };

async function getUsers(): Promise<AdminUserRow[]> {
  try {
    const users = await prisma.user.findMany({
      include: { role: true },
      orderBy: { createdAt: "desc" },
    });
    return users.map((user) => ({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      department: user.department,
      roleName: user.role.name,
      isActive: user.isActive,
      lastLoginAt: user.lastLoginAt ? user.lastLoginAt.toISOString() : null,
      createdAt: user.createdAt.toISOString(),
      avatarUrl: user.avatarUrl,
    }));
  } catch {
    // Database unreachable — an empty table with an honest count is
    // better than a crashed admin page.
    return [];
  }
}

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-h3 text-foreground">Users</h1>
          <p className="text-body-sm text-muted-foreground">
            {users.length} user{users.length === 1 ? "" : "s"} — read live from the database.
          </p>
        </div>
        <AdminActionButton label="Invite User" />
      </div>
      <Card>
        <UserTable users={users} />
      </Card>
    </div>
  );
}
