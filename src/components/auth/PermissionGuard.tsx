import { hasPermission, type ResourceName, type PermissionAction } from "@/lib/permissions";

type PermissionGuardProps = {
  /** The signed-in user's permission list, e.g. session.user.permissions —
   * passed explicitly rather than read internally, so this stays a plain
   * Server Component usable from both server and client parents. */
  permissions: string[];
  resource: ResourceName;
  action?: PermissionAction;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

// No Dashboard/Projects/CRM/etc. pages exist yet to actually gate with
// this (Phase 4B+) — built now so those pages have a ready-made,
// consistent way to hide/show UI by permission from day one, e.g.:
//   <PermissionGuard permissions={session.user.permissions} resource="Users" action="manage">
//     <Link href="/users">Manage users</Link>
//   </PermissionGuard>
export function PermissionGuard({
  permissions,
  resource,
  action = "view",
  children,
  fallback = null,
}: PermissionGuardProps) {
  if (!hasPermission(permissions, resource, action)) return <>{fallback}</>;
  return <>{children}</>;
}
