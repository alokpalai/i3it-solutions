import { Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { MockDepartment } from "@/config/adminMockData";

export function DepartmentCard({ department }: { department: MockDepartment }) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-body-sm font-medium text-foreground">{department.name}</p>
        <span className="flex shrink-0 items-center gap-1 text-caption text-muted-foreground">
          <Users aria-hidden="true" className="h-3.5 w-3.5" />
          {department.headcount}
        </span>
      </div>
      <p className="text-caption text-muted-foreground">{department.description}</p>
      <div className="mt-auto flex items-center gap-2 border-t border-border pt-3 text-caption text-muted-foreground">
        {department.head ? (
          <>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-muted text-[10px] font-semibold text-primary">
              {department.head.initials}
            </span>
            {department.head.name}
          </>
        ) : (
          "Unassigned"
        )}
      </div>
    </Card>
  );
}
