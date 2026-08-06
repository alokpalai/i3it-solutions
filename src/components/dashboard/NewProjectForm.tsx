"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  newProjectSchema,
  projectPriorities,
  projectRiskLevels,
  techStackOptions,
  type NewProjectInput,
  type NewProjectValues,
} from "@/lib/validation/project";
import { computeProjectHealth, daysRemaining } from "@/lib/projectMetrics";
import { mockUsers } from "@/config/dashboardMockData";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { FieldError } from "@/components/ui/FieldError";
import { Button } from "@/components/ui/Button";
import { ProjectHealthBadge } from "@/components/dashboard/ProjectHealthBadge";
import { SuccessMessage } from "@/components/contact/SuccessMessage";

const projectManagers = mockUsers.filter((user) => user.role === "Project Manager");

// No Project model exists in Prisma yet (only User/Role/Permission/
// Session, Phase 4A) — this validates fully and computes a real preview
// (via computeProjectHealth) but doesn't persist anywhere. Same
// "architecture ready, not wired to a backend yet" pattern as
// AvatarUploader and NotificationPreferences.
export function NewProjectForm() {
  const [createdName, setCreatedName] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewProjectInput, unknown, NewProjectValues>({
    // budget's z.coerce.number() makes the schema's input type (what the
    // form fields hold) differ from its output type (what onSubmit
    // receives) — the three-generic useForm<TFieldValues, TContext,
    // TTransformedValues> form is exactly RHF's supported shape for that.
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      name: "",
      client: "",
      description: "",
      projectManagerId: "",
      teamIds: [],
      priority: "Medium",
      riskLevel: "Low",
      budget: 0,
      techStack: [],
      startDate: "",
      deadline: "",
    },
  });

  const watched = watch();
  const previewHealth =
    watched.startDate && watched.deadline
      ? computeProjectHealth({
          progress: 0,
          budget: Number(watched.budget) || 0,
          budgetUtilized: 0,
          riskLevel: watched.riskLevel,
          status: "Planning",
          daysRemaining: daysRemaining(watched.deadline),
        })
      : null;

  const onSubmit = async (values: NewProjectValues) => {
    // Simulated latency so the loading state is visible — same shape a
    // real server-action round-trip would have once one exists.
    await new Promise((resolve) => setTimeout(resolve, 400));
    setCreatedName(values.name);
    reset();
  };

  if (createdName) {
    return (
      <SuccessMessage
        title="Project created"
        description={`"${createdName}" has been validated and is ready — project storage isn't connected to a database yet, so it won't appear in the projects list until that's wired up.`}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name" required>Project Name</Label>
          <Input id="name" invalid={!!errors.name} {...register("name")} />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="client" required>Client</Label>
          <Input id="client" placeholder="e.g. State Government Department" invalid={!!errors.client} {...register("client")} />
          <FieldError id="client-error" message={errors.client?.message} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description" required>Description</Label>
        <Textarea id="description" invalid={!!errors.description} {...register("description")} />
        <FieldError id="description-error" message={errors.description?.message} />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="projectManagerId" required>Project Manager</Label>
          <Select id="projectManagerId" invalid={!!errors.projectManagerId} {...register("projectManagerId")}>
            <option value="">Select…</option>
            {projectManagers.map((pm) => (
              <option key={pm.id} value={pm.id}>{pm.name}</option>
            ))}
          </Select>
          <FieldError id="projectManagerId-error" message={errors.projectManagerId?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="priority" required>Priority</Label>
          <Select id="priority" {...register("priority")}>
            {projectPriorities.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="riskLevel" required>Risk Level</Label>
          <Select id="riskLevel" {...register("riskLevel")}>
            {projectRiskLevels.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="budget" required>Budget (INR)</Label>
          <Input id="budget" type="number" min={0} invalid={!!errors.budget} {...register("budget")} />
          <FieldError id="budget-error" message={errors.budget?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="startDate" required>Start Date</Label>
          <Input id="startDate" type="date" invalid={!!errors.startDate} {...register("startDate")} />
          <FieldError id="startDate-error" message={errors.startDate?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="deadline" required>Deadline</Label>
          <Input id="deadline" type="date" invalid={!!errors.deadline} {...register("deadline")} />
          <FieldError id="deadline-error" message={errors.deadline?.message} />
        </div>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-body-sm font-medium text-foreground">Technology Stack</legend>
        <Controller
          control={control}
          name="techStack"
          render={({ field }) => (
            <div className="flex flex-wrap gap-3">
              {techStackOptions.map((tech) => (
                <label key={tech} className="flex items-center gap-2 text-body-sm text-foreground">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded-sm border border-border"
                    style={{ accentColor: "var(--color-primary)" }}
                    checked={field.value.includes(tech)}
                    onChange={(e) => {
                      field.onChange(
                        e.target.checked ? [...field.value, tech] : field.value.filter((t) => t !== tech),
                      );
                    }}
                  />
                  {tech}
                </label>
              ))}
            </div>
          )}
        />
        <FieldError id="techStack-error" message={errors.techStack?.message} />
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-body-sm font-medium text-foreground">Team Members</legend>
        <Controller
          control={control}
          name="teamIds"
          render={({ field }) => (
            <div className="grid gap-2 sm:grid-cols-2">
              {mockUsers.map((user) => (
                <label key={user.id} className="flex items-center gap-2 text-body-sm text-foreground">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded-sm border border-border"
                    style={{ accentColor: "var(--color-primary)" }}
                    checked={field.value.includes(user.id)}
                    onChange={(e) => {
                      field.onChange(
                        e.target.checked ? [...field.value, user.id] : field.value.filter((id) => id !== user.id),
                      );
                    }}
                  />
                  {user.name} <span className="text-caption text-muted-foreground">({user.role})</span>
                </label>
              ))}
            </div>
          )}
        />
      </fieldset>

      {previewHealth && (
        <div className="flex items-center gap-3 rounded-md border border-dashed border-border p-4">
          <span className="text-body-sm text-muted-foreground">Estimated initial health:</span>
          <ProjectHealthBadge health={previewHealth} />
        </div>
      )}

      <Button type="submit" variant="accent" size="lg" loading={isSubmitting} className="w-fit">
        {isSubmitting ? "Creating…" : "Create Project"}
      </Button>
    </form>
  );
}
