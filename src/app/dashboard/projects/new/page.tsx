import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { NewProjectForm } from "@/components/dashboard/NewProjectForm";

export const metadata: Metadata = { title: "Create Project" };

export default function NewProjectPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h2 text-foreground">Create Project</h1>
        <p className="text-body-sm text-muted-foreground">
          Set up a new technology implementation project.
        </p>
      </div>

      <Card className="mx-auto w-full max-w-3xl">
        <NewProjectForm />
      </Card>
    </div>
  );
}
