import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { TaskTable } from "@/components/dashboard/TaskTable";
import { mockTasks } from "@/config/dashboardMockData";

export const metadata: Metadata = { title: "Tasks" };

export default function TasksPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h2 text-foreground">Tasks</h1>
        <p className="text-body-sm text-muted-foreground">
          {mockTasks.length} task{mockTasks.length === 1 ? "" : "s"} across your active projects.
        </p>
      </div>

      <Card>
        <TaskTable tasks={mockTasks} />
      </Card>
    </div>
  );
}
