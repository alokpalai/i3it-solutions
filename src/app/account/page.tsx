import { auth } from "@/auth";
import { ProtectedLayout } from "@/components/auth/ProtectedLayout";
import { AvatarUploader } from "@/components/auth/AvatarUploader";
import { ChangePasswordForm } from "@/components/auth/ChangePasswordForm";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import { Card } from "@/components/ui/Card";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Account",
  description: "Manage your i3it Solutions staff account settings.",
  path: "/account",
  noindex: true,
});

export default async function AccountPage() {
  const session = await auth();

  return (
    <ProtectedLayout session={session}>
      {session?.user && <AccountContent userId={session.user.id} permissions={session.user.permissions ?? []} />}
    </ProtectedLayout>
  );
}

async function AccountContent({
  userId,
  permissions,
}: {
  userId: string;
  permissions: string[];
}) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl flex-col gap-10 px-6 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-h2 text-foreground">Account settings</h1>
        <p className="text-body text-muted-foreground">
          Manage your profile picture, password and account access.
        </p>
      </div>

      <Card className="flex flex-col gap-4">
        <p className="text-h5 text-foreground">Profile picture</p>
        <AvatarUploader currentAvatarUrl={user?.avatarUrl} />
      </Card>

      <Card className="flex flex-col gap-5">
        <p className="text-h5 text-foreground">Change password</p>
        <ChangePasswordForm />
      </Card>

      {/* Demonstrates PermissionGuard — no admin pages exist yet (Phase
          4B+) to actually link to, so this shows an informational note
          rather than a link to a route that doesn't exist. */}
      <PermissionGuard permissions={permissions} resource="Users" action="manage">
        <Card className="flex flex-col gap-2">
          <p className="text-h5 text-foreground">Administration</p>
          <p className="text-body-sm text-muted-foreground">
            Your role includes user management permissions. User administration tools are part of
            a later phase of this platform.
          </p>
        </Card>
      </PermissionGuard>
    </div>
  );
}
