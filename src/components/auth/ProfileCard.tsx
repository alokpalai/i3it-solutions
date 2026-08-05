import Image from "next/image";
import { User as UserIcon, Mail, Building2, Phone, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { RoleBadge } from "@/components/auth/RoleBadge";

export type ProfileCardData = {
  fullName: string;
  email: string;
  role: string;
  department?: string | null;
  phone?: string | null;
  avatarUrl?: string | null;
  lastLoginAt?: Date | null;
};

function formatLastLogin(date?: Date | null): string {
  if (!date) return "This is your first login";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function ProfileCard({ user }: { user: ProfileCardData }) {
  return (
    <Card className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-muted">
          {user.avatarUrl ? (
            <Image src={user.avatarUrl} alt="" fill sizes="64px" className="object-cover" />
          ) : (
            <UserIcon aria-hidden="true" className="h-7 w-7 text-secondary" />
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-h4 text-foreground">{user.fullName}</p>
          <RoleBadge role={user.role} />
        </div>
      </div>

      <dl className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
          <dt className="sr-only">Email</dt>
          <dd className="text-body-sm text-foreground">{user.email}</dd>
        </div>
        {user.department && (
          <div className="flex items-center gap-3">
            <Building2 aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
            <dt className="sr-only">Department</dt>
            <dd className="text-body-sm text-foreground">{user.department}</dd>
          </div>
        )}
        {user.phone && (
          <div className="flex items-center gap-3">
            <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
            <dt className="sr-only">Phone</dt>
            <dd className="text-body-sm text-foreground">{user.phone}</dd>
          </div>
        )}
        <div className="flex items-center gap-3">
          <Clock aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
          <dt className="sr-only">Last login</dt>
          <dd className="text-body-sm text-muted-foreground">
            Last login: {formatLastLogin(user.lastLoginAt)}
          </dd>
        </div>
      </dl>
    </Card>
  );
}
