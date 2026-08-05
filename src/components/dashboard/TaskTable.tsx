"use client";

import { useMemo, useState } from "react";
import { Search, Inbox } from "lucide-react";
import type { MockTask, TaskPriority, TaskStatus } from "@/config/dashboardMockData";
import { formatDate } from "@/lib/formatDate";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const PAGE_SIZE = 5;

const PRIORITIES: TaskPriority[] = ["Low", "Medium", "High", "Urgent"];
const STATUSES: TaskStatus[] = ["To Do", "In Progress", "In Review", "Done"];

const PRIORITY_VARIANT: Record<TaskPriority, "default" | "accent"> = {
  Low: "default",
  Medium: "default",
  High: "accent",
  Urgent: "accent",
};

export function TaskTable({ tasks }: { tasks: MockTask[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | TaskStatus>("All");
  const [priorityFilter, setPriorityFilter] = useState<"All" | TaskPriority>("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesSearch = query === "" || task.title.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "All" || task.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="Search tasks…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9"
            aria-label="Search tasks"
          />
        </div>
        <Select
          aria-label="Filter by status"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as "All" | TaskStatus);
            setPage(1);
          }}
          className="sm:w-44"
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
            setPriorityFilter(e.target.value as "All" | TaskPriority);
            setPage(1);
          }}
          className="sm:w-44"
        >
          <option value="All">All priorities</option>
          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>{priority}</option>
          ))}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Inbox aria-hidden="true" className="h-8 w-8 text-muted-foreground" />
          <p className="text-body-sm text-muted-foreground">No tasks match your filters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border text-caption font-medium text-muted-foreground">
                <th scope="col" className="py-2 pr-4">Task</th>
                <th scope="col" className="py-2 pr-4">Priority</th>
                <th scope="col" className="py-2 pr-4">Status</th>
                <th scope="col" className="py-2 pr-4">Due date</th>
                <th scope="col" className="py-2 pr-4">Assigned by</th>
                <th scope="col" className="py-2 pr-4">Project</th>
                <th scope="col" className="py-2">Progress</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((task) => (
                <tr key={task.id} className="border-b border-border text-body-sm">
                  <td className="max-w-56 truncate py-3 pr-4 font-medium text-foreground">{task.title}</td>
                  <td className="py-3 pr-4">
                    <Badge variant={PRIORITY_VARIANT[task.priority]}>{task.priority}</Badge>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{task.status}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{formatDate(task.dueDate)}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{task.assignedBy}</td>
                  <td className="max-w-48 truncate py-3 pr-4 text-muted-foreground">{task.project}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-muted">
                        <div className="h-full rounded-full bg-secondary" style={{ width: `${task.progress}%` }} />
                      </div>
                      <span className="text-caption text-muted-foreground">{task.progress}%</span>
                    </div>
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
            Page {currentPage} of {totalPages} &middot; {filtered.length} task{filtered.length === 1 ? "" : "s"}
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
