import { Circle, Building2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { RoleBadge } from "@/components/auth/RoleBadge";
import type { MockUser } from "@/config/dashboardMockData";
import { cn } from "@/lib/utils";

const AVAILABILITY_STYLE: Record<NonNullable<MockUser["availability"]>, string> = {
  Available: "bg-success",
  Busy: "bg-warning",
  "On Leave": "bg-error",
};

export function TeamCard({ member, isManager }: { member: MockUser; isManager?: boolean }) {
  return (
    <Card className="flex items-center gap-4">
      <div className="relative">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-muted text-body-sm font-semibold text-primary">
          {member.initials}
        </span>
        {member.availability && (
          <span
            aria-hidden="true"
            className={cn(
              "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background",
              AVAILABILITY_STYLE[member.availability],
            )}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <p className="text-body-sm font-medium text-foreground">{member.name}</p>
          {isManager && (
            <span className="rounded-sm border border-accent px-1.5 py-0.5 text-[10px] font-semibold uppercase text-accent">
              PM
            </span>
          )}
        </div>
        <RoleBadge role={member.role} />
        <div className="flex items-center gap-1.5 text-caption text-muted-foreground">
          <Building2 aria-hidden="true" className="h-3 w-3" />
          {member.department}
        </div>
      </div>
      {member.availability && (
        <div className="flex shrink-0 items-center gap-1.5 text-caption text-muted-foreground">
          <Circle
            aria-hidden="true"
            className={cn("h-2.5 w-2.5 rounded-full", AVAILABILITY_STYLE[member.availability])}
            fill="currentColor"
          />
          {member.availability}
        </div>
      )}
    </Card>
  );
}
