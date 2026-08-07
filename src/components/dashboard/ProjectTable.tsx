"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Inbox, ArrowUpDown, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";
import type { MockProject, ProjectStatus, Priority } from "@/config/dashboardMockData";
import { formatDate } from "@/lib/formatDate";
import { formatCurrency } from "@/lib/projectMetrics";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { PriorityBadge } from "@/components/dashboard/PriorityBadge";
import { ProgressBar } from "@/components/dashboard/ProgressBar";

const PAGE_SIZE = 6;

const STATUSES: ProjectStatus[] = [
  "Planning", "Quotation", "Approved", "Procurement", "Deployment",
  "Testing", "Training", "Completed", "On Hold", "Cancelled",
];
const PRIORITIES: Priority[] = ["Low", "Medium", "High", "Urgent"];

type SortKey = "name" | "deadline" | "budget" | "progress" | "updatedAt";
type SortDirection = "asc" | "desc";

function compareValues(a: MockProject, b: MockProject, key: SortKey): number {
  switch (key) {
    case "name":
      return a.name.localeCompare(b.name);
    case "deadline":
      return a.deadline.localeCompare(b.deadline);
    case "budget":
      return a.budget - b.budget;
    case "progress":
      return a.progress - b.progress;
    case "updatedAt":
      return a.updatedAt.localeCompare(b.updatedAt);
  }
}

// Hoisted outside ProjectTable (react-hooks/static-components) — a
// component declared inside another component's render is recreated
// every render, which resets any state it owns. Sort state lives in the
// parent instead and is passed down as props.
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
      <button
        type="button"
        onClick={() => onSort(sortKeyValue)}
        className="flex items-center gap-1 hover:text-foreground"
      >
        {children}
        {isActive ? (
          direction === "asc" ? (
            <ArrowUp aria-hidden="true" className="h-3 w-3" />
          ) : (
            <ArrowDown aria-hidden="true" className="h-3 w-3" />
          )
        ) : (
          <ArrowUpDown aria-hidden="true" className="h-3 w-3 opacity-40" />
        )}
      </button>
    </th>
  );
}

export function ProjectTable({ projects }: { projects: MockProject[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ProjectStatus>("All");
  const [priorityFilter, setPriorityFilter] = useState<"All" | Priority>("All");
  const [managerFilter, setManagerFilter] = useState<"All" | string>("All");
  const [sortKey, setSortKey] = useState<SortKey>("updatedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);

  const managers = useMemo(
    () => Array.from(new Set(projects.map((p) => p.projectManager.name))).sort(),
    [projects],
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = projects.filter((project) => {
      const matchesSearch =
        query === "" ||
        project.name.toLowerCase().includes(query) ||
        project.client.toLowerCase().includes(query) ||
        project.projectManager.name.toLowerCase().includes(query) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(query));
      const matchesStatus = statusFilter === "All" || project.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || project.priority === priorityFilter;
      const matchesManager = managerFilter === "All" || project.projectManager.name === managerFilter;
      return matchesSearch && matchesStatus && matchesPriority && matchesManager;
    });

    const sorted = [...result].sort((a, b) => {
      const comparison = compareValues(a, b, sortKey);
      return sortDirection === "asc" ? comparison : -comparison;
    });
    return sorted;
  }, [projects, search, statusFilter, priorityFilter, managerFilter, sortKey, sortDirection]);

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
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="Search by project, client, manager or technology…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9"
            aria-label="Search projects"
          />
        </div>
        <Select
          aria-label="Filter by status"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as "All" | ProjectStatus);
            setPage(1);
          }}
          className="lg:w-44"
        >
          <option value="All">All statuses</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </Select>
        <Select
          aria-label="Filter by priority"
          value={priorityFilter}
          onChange={(e) => {
            setPriorityFilter(e.target.value as "All" | Priority);
            setPage(1);
          }}
          className="lg:w-40"
        >
          <option value="All">All priorities</option>
          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>{priority}</option>
          ))}
        </Select>
        <Select
          aria-label="Filter by project manager"
          value={managerFilter}
          onChange={(e) => {
            setManagerFilter(e.target.value);
            setPage(1);
          }}
          className="lg:w-44"
        >
          <option value="All">All managers</option>
          {managers.map((manager) => (
            <option key={manager} value={manager}>{manager}</option>
          ))}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Inbox aria-hidden="true" className="h-8 w-8 text-muted-foreground" />
          <p className="text-body-sm text-muted-foreground">No projects match your search or filters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border text-caption font-medium text-muted-foreground">
                <th scope="col" className="py-2 pr-4">ID</th>
                <SortHeader sortKeyValue="name" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Project</SortHeader>
                <th scope="col" className="py-2 pr-4">Client</th>
                <th scope="col" className="py-2 pr-4">Manager</th>
                <th scope="col" className="py-2 pr-4">Priority</th>
                <th scope="col" className="py-2 pr-4">Status</th>
                <SortHeader sortKeyValue="budget" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Budget</SortHeader>
                <SortHeader sortKeyValue="progress" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Progress</SortHeader>
                <SortHeader sortKeyValue="deadline" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Deadline</SortHeader>
                <SortHeader sortKeyValue="updatedAt" activeKey={sortKey} direction={sortDirection} onSort={toggleSort}>Updated</SortHeader>
                <th scope="col" className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((project) => (
                <tr key={project.id} className="border-b border-border text-body-sm">
                  <td className="py-3 pr-4 font-mono text-caption text-muted-foreground">{project.id}</td>
                  <td className="max-w-56 truncate py-3 pr-4 font-medium text-foreground">{project.name}</td>
                  <td className="max-w-40 truncate py-3 pr-4 text-muted-foreground">{project.client}</td>
                  <td className="max-w-32 truncate py-3 pr-4 text-muted-foreground">{project.projectManager.name}</td>
                  <td className="py-3 pr-4"><PriorityBadge priority={project.priority} /></td>
                  <td className="py-3 pr-4"><StatusBadge status={project.status} /></td>
                  <td className="py-3 pr-4 text-muted-foreground">{formatCurrency(project.budget)}</td>
                  <td className="py-3 pr-4"><ProgressBar value={project.progress} className="w-24" /></td>
                  <td className="py-3 pr-4 text-muted-foreground">{formatDate(project.deadline)}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{formatDate(project.updatedAt)}</td>
                  <td className="py-3">
                    <Link
                      href={`/dashboard/projects/${project.id}`}
                      className="inline-flex items-center gap-1 text-caption font-medium text-primary hover:underline"
                    >
                      View
                      <ExternalLink aria-hidden="true" className="h-3 w-3" />
                    </Link>
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
            Page {currentPage} of {totalPages} &middot; {filtered.length} project{filtered.length === 1 ? "" : "s"}
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
