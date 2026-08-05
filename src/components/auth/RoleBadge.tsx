import { Badge } from "@/components/ui/Badge";

const ELEVATED_ROLES = new Set(["Super Admin", "Admin"]);

// Elevated roles (Super Admin, Admin) get the accent-outline treatment,
// same visual language Badge already uses for "featured"/priority
// markers elsewhere on the site — everyone else gets the default tint.
export function RoleBadge({ role }: { role: string }) {
  return <Badge variant={ELEVATED_ROLES.has(role) ? "accent" : "default"}>{role}</Badge>;
}
