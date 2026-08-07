import type { Metadata } from "next";
import { SecurityCard } from "@/components/dashboard/SecurityCard";
import { getActiveSessionCount } from "@/lib/adminMetrics";

export const metadata: Metadata = { title: "Security — Admin" };

export default async function AdminSecurityPage() {
  const activeSessionCount = await getActiveSessionCount();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-h3 text-foreground">Security</h1>
        <p className="text-body-sm text-muted-foreground">Authentication and access-control configuration.</p>
      </div>
      <SecurityCard activeSessionCount={activeSessionCount} />
    </div>
  );
}
