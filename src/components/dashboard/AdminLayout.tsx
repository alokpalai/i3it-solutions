import { ShieldCheck } from "lucide-react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { SectionTabNav } from "@/components/dashboard/SectionTabNav";
import { adminNavItems } from "@/config/adminNav";

// Wraps every /dashboard/admin/* route. Two navs, like Sidebar.tsx/
// MobileDrawer.tsx: AdminSidebar (real vertical nav, grouped, lg+ only)
// and a flattened SectionTabNav (horizontal scroll, below lg) — same
// component already reused by Procurement/Inventory/Documents in Phase
// 4E, just fed the admin section's own (flattened) item list.
export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 border-b border-border pb-4">
        <ShieldCheck aria-hidden="true" className="h-5 w-5 text-accent" />
        <div className="flex flex-col">
          <h1 className="text-h4 text-foreground">Enterprise Administration</h1>
          <p className="text-caption text-muted-foreground">Users, roles, configuration and system monitoring.</p>
        </div>
      </div>

      <div className="lg:hidden">
        <SectionTabNav items={adminNavItems} ariaLabel="Admin sections" rootHref="/dashboard/admin" />
      </div>

      <div className="flex gap-8">
        <AdminSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
