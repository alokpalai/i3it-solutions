// Shared by Sidebar/MobileDrawer. Exact match for "/dashboard" itself
// (every dashboard route starts with that prefix, so it can't also be a
// prefix match); every other nav item also matches its own subtree —
// needed since Phase 4C added nested routes like
// /dashboard/projects/[id]/tasks that should still highlight "Projects".
export function isNavItemActive(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  if (href === "/dashboard") return false;
  return pathname.startsWith(`${href}/`);
}
