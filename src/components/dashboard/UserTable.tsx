"use client";

import { useMemo, useState } from "react";
import { Search, Inbox, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { RoleBadge } from "@/components/auth/RoleBadge";
import { UserRowActions } from "@/components/dashboard/UserRowActions";
import { formatDate, formatRelativeTime } from "@/lib/formatDate";

export type AdminUserRow = {
  id: string;
  fullName: string;
  email: string;
  department: string | null;
  roleName: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  avatarUrl: string | null;
};

const PAGE_SIZE = 10;

type SortKey = "fullName" | "lastLoginAt" | "createdAt";
type SortDirection = "asc" | "desc";

function initialsOf(name: string): string {
  return name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
}

function compareValues(a: AdminUserRow, b: AdminUserRow, key: SortKey): number {
  switch (key) {
    case "fullName":
      return a.fullName.localeCompare(b.fullName);
    case "lastLoginAt":
      return (a.lastLoginAt ?? "").localeCompare(b.lastLoginAt ?? "");
    case "createdAt":
      return a.createdAt.localeCompare(b.createdAt);
  }
}

// Hoisted outside UserTable (react-hooks/static-components) — same
// reason every other sortable table's SortHeader in this codebase is.
function SortHeader({
  sortKeyValue,
  activeKey,
  direction,
  onSort,
  children,
}: {
  sortKeyValue: SortKey;
  activeKey: SortKey;
  direction: SortDirection;
  onSort: (key: SortKey) => void;
  children: React.ReactNode;
}) {
  const isActive = activeKey === sortKeyValue;
  return (
    <th scope="col" className="py-2 pr-4">
      <button type="button" onClick={() => onSort(sortKeyValue)} className="flex items-center gap-1 hover:text-foreground">
        {children}
        {isActive ? (
          direction === "asc" ? <ArrowUp aria-hidden="true" className="h-3 w-3" /> : <ArrowDown aria-hidden="true" className="h-3 w-3" />
        ) : (
          <ArrowUpDown aria-hidden="true" className="h-3 w-3 opacity-40" />
        )}
      </button>
    </th>
  );
}

export function UserTable({ users }: { users: AdminUserRow[] }) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Disabled">("All");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);

  const roles = useMemo(() => Array.from(new Set(users.map((u) => u.roleName))).sort(), [users]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = users.filter((user) => {
      const matchesSearch =
        query === "" ||
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        (user.department ?? "").toLowerCase().includes(query);
      const matchesRole = roleFilter === "All" || user.roleName === roleFilter;
      const matchesStatus = statusFilter === "All" || (statusFilter === "Active") === user.isActive;
      return matchesSearch && matchesRole && matchesStatus;
    });
    return [...result].sort((a, b) => {
      const comparison = compareValues(a, b, sortKey);
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [users, search, roleFilter, statusFilter, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, email or department…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9"
            aria-label="Search users"
          />
        </div>
        <Select aria-label="Filter by role" value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }} className="lg:w-48">
          <option value="All">All roles</option>
          {roles.map((role) => <option key={role} value={role}>{role}</option>)}
        </Select>
        <Select aria-label="Filter by status" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value as "All" | "Active" | "Disabled"); setPage(1); }} className="lg:w-40">
          <option value="All">All statuses</option>
          <option value="Active">Active</option>
          <option value="Disabled">Disabled</option>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Inbox aria-hidden="true" className="h-8 w-8 text-muted-foreground" />
          <p className="text-body-sm text-muted-foreground">No users match your search or filters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border text-caption font-medium text-muted-foreground">
                <th scope="col" className="py-2 pr-4">User ID</th>
                <SortHeader sortKeyValue="fullName" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Name</SortHeader>
                <th scope="col" className="py-2 pr-4">Email</th>
                <th scope="col" className="py-2 pr-4">Department</th>
                <th scope="col" className="py-2 pr-4">Role</th>
                <th scope="col" className="py-2 pr-4">Status</th>
                <SortHeader sortKeyValue="lastLoginAt" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Last Login</SortHeader>
                <SortHeader sortKeyValue="createdAt" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Created</SortHeader>
                <th scope="col" className="py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((user) => (
                <tr key={user.id} className="border-b border-border text-body-sm">
                  <td className="py-3 pr-4 font-mono text-caption text-muted-foreground">{user.id.slice(0, 8)}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-muted text-caption font-semibold text-primary">
                        {initialsOf(user.fullName)}
                      </span>
                      <span className="max-w-40 truncate font-medium text-foreground">{user.fullName}</span>
                    </div>
                  </td>
                  <td className="max-w-52 truncate py-3 pr-4 text-muted-foreground">{user.email}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{user.department ?? "—"}</td>
                  <td className="py-3 pr-4"><RoleBadge role={user.roleName} /></td>
                  <td className="py-3 pr-4">
                    <span
                      className={`inline-flex w-fit items-center rounded-sm border px-2.5 py-1 text-caption font-medium ${
                        user.isActive
                          ? "border-success/30 bg-success/10 text-success"
                          : "border-error/30 bg-error/10 text-error"
                      }`}
                    >
                      {user.isActive ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{user.lastLoginAt ? formatRelativeTime(user.lastLoginAt) : "Never"}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{formatDate(user.createdAt)}</td>
                  <td className="py-3">
                    <UserRowActions userId={user.id} isActive={user.isActive} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-caption text-muted-foreground">
            Page {currentPage} of {totalPages} &middot; {filtered.length} user{filtered.length === 1 ? "" : "s"}
          </p>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" size="sm" disabled={currentPage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</Button>
            <Button type="button" variant="secondary" size="sm" disabled={currentPage === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}
