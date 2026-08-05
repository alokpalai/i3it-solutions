import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, Phone, Building2, Clock, PlusCircle } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { RoleBadge } from "@/components/auth/RoleBadge";
import { AvatarUploader } from "@/components/auth/AvatarUploader";

export const metadata: Metadata = { title: "Profile" };

// Fields with no backing Prisma model yet (emergency contact, employment
// details, skills, certificates) render an honest "not yet added" state
// rather than invented values — this page shows a real signed-in staff
// member's own data, which is a different situation from the dashboard's
// generic mock demo content (src/config/dashboardMockData.ts) elsewhere.
function EmptyField({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-md border border-dashed border-border px-3 py-2 text-body-sm text-muted-foreground hover:border-secondary hover:text-foreground"
    >
      <PlusCircle aria-hidden="true" className="h-4 w-4" />
      Add {label.toLowerCase()}
    </button>
  );
}

export default async function DashboardProfilePage() {
  const session = await auth();
  if (!session?.user?.id) return null; // parent layout already redirects

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h2 text-foreground">Profile</h1>
        <p className="text-body-sm text-muted-foreground">Your personal and employment details.</p>
      </div>

      <Card className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <AvatarUploader currentAvatarUrl={user.avatarUrl} />
        <div className="flex flex-col gap-1.5 sm:items-end">
          <p className="text-h4 text-foreground">{user.fullName}</p>
          <RoleBadge role={session.user.role ?? "Employee"} />
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="flex flex-col gap-4">
          <p className="text-h5 text-foreground">Contact details</p>
          <dl className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
              <dt className="sr-only">Email</dt>
              <dd className="text-body-sm text-foreground">{user.email}</dd>
            </div>
            <div className="flex items-center gap-3">
              <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
              <dt className="sr-only">Phone</dt>
              <dd className="text-body-sm text-foreground">{user.phone ?? "Not added yet"}</dd>
            </div>
            <div className="flex items-center gap-3">
              <Building2 aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
              <dt className="sr-only">Department</dt>
              <dd className="text-body-sm text-foreground">{user.department ?? "Not assigned yet"}</dd>
            </div>
            <div className="flex items-center gap-3">
              <Clock aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
              <dt className="sr-only">Last login</dt>
              <dd className="text-body-sm text-muted-foreground">
                {user.lastLoginAt
                  ? new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(
                      user.lastLoginAt,
                    )
                  : "This is your first login"}
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="flex flex-col gap-4">
          <p className="text-h5 text-foreground">Emergency contact</p>
          <p className="text-body-sm text-muted-foreground">
            No emergency contact on file. This is used only in urgent situations.
          </p>
          <EmptyField label="Emergency contact" />
        </Card>

        <Card className="flex flex-col gap-4">
          <p className="text-h5 text-foreground">Employment details</p>
          <p className="text-body-sm text-muted-foreground">
            Join date, employee ID and employment type haven&rsquo;t been recorded yet.
          </p>
          <EmptyField label="employment details" />
        </Card>

        <Card className="flex flex-col gap-4">
          <p className="text-h5 text-foreground">Skills</p>
          <p className="text-body-sm text-muted-foreground">No skills added yet.</p>
          <EmptyField label="skills" />
        </Card>

        <Card className="flex flex-col gap-4 lg:col-span-2">
          <p className="text-h5 text-foreground">Certificates</p>
          <p className="text-body-sm text-muted-foreground">No certificates added yet.</p>
          <EmptyField label="a certificate" />
        </Card>
      </div>
    </div>
  );
}
