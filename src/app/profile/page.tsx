import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { ProtectedLayout } from "@/components/auth/ProtectedLayout";
import { ProfileCard } from "@/components/auth/ProfileCard";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Profile",
  description: "Your i3it Solutions staff profile.",
  path: "/profile",
  noindex: true,
});

export default async function ProfilePage() {
  const session = await auth();

  return (
    <ProtectedLayout session={session}>
      {session?.user && <ProfileContent userId={session.user.id} role={session.user.role} />}
    </ProtectedLayout>
  );
}

async function ProfileContent({ userId, role }: { userId: string; role?: string }) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) notFound();

  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl flex-col gap-8 px-6 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-h2 text-foreground">Your profile</h1>
        <p className="text-body text-muted-foreground">
          Personal details associated with your account.
        </p>
      </div>
      <ProfileCard
        user={{
          fullName: user.fullName,
          email: user.email,
          role: role ?? "Employee",
          department: user.department,
          phone: user.phone,
          avatarUrl: user.avatarUrl,
          lastLoginAt: user.lastLoginAt,
        }}
      />
    </div>
  );
}
