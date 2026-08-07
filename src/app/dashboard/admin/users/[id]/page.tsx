import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Building2, Calendar, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { RoleBadge } from "@/components/auth/RoleBadge";
import { UserRowActions } from "@/components/dashboard/UserRowActions";
import { prisma } from "@/lib/prisma";
import { DEFAULT_ROLE_PERMISSIONS, ROLE_NAMES, type RoleName } from "@/lib/permissions";
import { formatDate } from "@/lib/formatDate";

type Props = { params: Promise<{ id: string }> };

async function getUser(id: string) {
  try {
    return await prisma.user.findUnique({ where: { id }, include: { role: true } });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const user = await getUser(id);
  return { title: user ? `${user.fullName} — Users` : "User" };
}

function isKnownRole(name: string): name is RoleName {
  return (ROLE_NAMES as readonly string[]).includes(name);
}

export default async function AdminUserDetailPage({ params }: Props) {
  const { id } = await params;
  const user = await getUser(id);
  if (!user) notFound();

  const initials = user.fullName.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  const rolePermissions = isKnownRole(user.role.name) ? DEFAULT_ROLE_PERMISSIONS[user.role.name] : [];

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/dashboard/admin/users"
        className="inline-flex w-fit items-center gap-1.5 text-caption font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        All users
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-surface-muted text-h5 font-semibold text-primary">
            {initials}
          </span>
          <div className="flex flex-col gap-1.5">
            <h1 className="text-h2 text-foreground">{user.fullName}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <RoleBadge role={user.role.name} />
              <span
                className={`inline-flex w-fit items-center rounded-sm border px-2.5 py-1 text-caption font-medium ${
                  user.isActive ? "border-success/30 bg-success/10 text-success" : "border-error/30 bg-error/10 text-error"
                }`}
              >
                {user.isActive ? "Active" : "Disabled"}
              </span>
            </div>
          </div>
        </div>
        <UserRowActions userId={user.id} isActive={user.isActive} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="flex flex-col gap-4 lg:col-span-2">
          <p className="text-h5 text-foreground">Profile</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-body-sm text-foreground">
              <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
              {user.email}
            </div>
            <div className="flex items-center gap-2 text-body-sm text-foreground">
              <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
              {user.phone ?? "—"}
            </div>
            <div className="flex items-center gap-2 text-body-sm text-foreground">
              <Building2 aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
              {user.department ?? "—"}
            </div>
            <div className="flex items-center gap-2 text-body-sm text-foreground">
              <Clock aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
              {user.lastLoginAt ? `Last login ${formatDate(user.lastLoginAt.toISOString())}` : "Never logged in"}
            </div>
            <div className="flex items-center gap-2 text-body-sm text-foreground">
              <Calendar aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
              Created {formatDate(user.createdAt.toISOString())}
            </div>
          </div>
        </Card>

        <Card className="flex flex-col gap-3">
          <p className="text-h5 text-foreground">Permissions via {user.role.name}</p>
          {rolePermissions.length === 0 ? (
            <p className="text-body-sm text-muted-foreground">
              No default permission set found for this role name — it may have been renamed since this user was
              assigned it.
            </p>
          ) : (
            <ul className="flex flex-wrap gap-1.5">
              {rolePermissions.map((permission) => (
                <li key={permission} className="rounded-sm bg-surface-muted px-2 py-1 text-caption text-muted-foreground">
                  {permission}
                </li>
              ))}
            </ul>
          )}
          <Link href="/dashboard/admin/roles" className="text-caption font-medium text-primary hover:underline">
            Manage roles
          </Link>
        </Card>
      </div>
    </div>
  );
}
