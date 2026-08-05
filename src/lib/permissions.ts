// Permission system — Phase 4A brief's example resource list, kept exactly
// as given rather than inventing additional ones. Two actions per
// resource ("view" / "manage") is deliberately simple rather than a full
// CRUD-per-resource matrix — scalable in the sense that adding a new
// resource or role is a one-line addition here (plus a re-run of
// prisma/seed.ts), not a schema change.
//
// This file is the single source of truth for what prisma/seed.ts writes
// into the Role/Permission/RolePermission tables. At runtime, a signed-in
// user's actual permission list always comes from the database (via
// auth.ts's Credentials authorize callback, embedded in the session) —
// never read from this matrix directly — so a role's permissions can be
// changed in the database later without a code deploy.

export const ROLE_NAMES = [
  "Super Admin",
  "Admin",
  "Sales",
  "Project Manager",
  "Support",
  "Procurement",
  "Finance",
  "Employee",
] as const;

export type RoleName = (typeof ROLE_NAMES)[number];

export const RESOURCE_NAMES = [
  "Dashboard",
  "Projects",
  "Users",
  "CRM",
  "RFQ",
  "Products",
  "Documents",
  "Reports",
  "Settings",
] as const;

export type ResourceName = (typeof RESOURCE_NAMES)[number];

export const PERMISSION_ACTIONS = ["view", "manage"] as const;
export type PermissionAction = (typeof PERMISSION_ACTIONS)[number];

export type PermissionKey = `${ResourceName}:${PermissionAction}`;

function key(resource: ResourceName, action: PermissionAction): PermissionKey {
  return `${resource}:${action}`;
}

function allResources(action: PermissionAction): PermissionKey[] {
  return RESOURCE_NAMES.map((resource) => key(resource, action));
}

// Seed-time default permission set per role. Deliberately conservative —
// every role gets Dashboard:view at minimum; "manage" rights are scoped to
// the resources that role's function actually owns, per
// docs/PROJECT.md §7-style pillar reasoning applied to internal roles
// rather than public-site content.
export const DEFAULT_ROLE_PERMISSIONS: Record<RoleName, PermissionKey[]> = {
  "Super Admin": [...allResources("view"), ...allResources("manage")],
  Admin: [
    ...allResources("view"),
    ...RESOURCE_NAMES.filter((r) => r !== "Settings").map((r) => key(r, "manage")),
  ],
  Sales: [
    key("Dashboard", "view"),
    key("CRM", "view"),
    key("CRM", "manage"),
    key("RFQ", "view"),
    key("RFQ", "manage"),
    key("Products", "view"),
    key("Reports", "view"),
  ],
  "Project Manager": [
    key("Dashboard", "view"),
    key("Projects", "view"),
    key("Projects", "manage"),
    key("Documents", "view"),
    key("Documents", "manage"),
    key("Products", "view"),
    key("Reports", "view"),
  ],
  Support: [
    key("Dashboard", "view"),
    key("Documents", "view"),
    key("RFQ", "view"),
    key("Reports", "view"),
  ],
  Procurement: [
    key("Dashboard", "view"),
    key("RFQ", "view"),
    key("RFQ", "manage"),
    key("Products", "view"),
    key("Products", "manage"),
    key("Documents", "view"),
    key("Reports", "view"),
  ],
  Finance: [
    key("Dashboard", "view"),
    key("Reports", "view"),
    key("Reports", "manage"),
    key("Documents", "view"),
    key("RFQ", "view"),
  ],
  Employee: [key("Dashboard", "view"), key("Documents", "view")],
};

/** True if the given permission list grants `resource:action`, or the
 * broader `resource:manage` (manage implies view for the same resource). */
export function hasPermission(
  permissions: string[],
  resource: ResourceName,
  action: PermissionAction = "view",
): boolean {
  if (permissions.includes(key(resource, action))) return true;
  if (action === "view" && permissions.includes(key(resource, "manage"))) return true;
  return false;
}
