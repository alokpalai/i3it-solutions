import { z } from "zod";

export const projectPriorities = ["Low", "Medium", "High", "Urgent"] as const;
export const projectRiskLevels = ["Low", "Medium", "High"] as const;

// Same category set as the Products taxonomy (docs/INFORMATION_ARCHITECTURE.md
// §3), kept short and recognizable rather than the full product list — a
// project's "technology stack" is naturally coarser-grained than an
// individual product category.
export const techStackOptions = [
  "Computing",
  "Servers",
  "Storage",
  "Networking",
  "Surveillance & Security",
  "Collaboration & Display",
  "Power Backup",
  "Software",
] as const;

export const newProjectSchema = z
  .object({
    name: z.string().trim().min(3, "Enter a project name"),
    client: z.string().trim().min(2, "Enter a client name"),
    description: z.string().trim().min(10, "Enter a short description (at least 10 characters)"),
    projectManagerId: z.string().min(1, "Select a project manager"),
    teamIds: z.array(z.string()),
    priority: z.enum(projectPriorities),
    riskLevel: z.enum(projectRiskLevels),
    budget: z.coerce.number().positive("Enter a budget greater than zero"),
    techStack: z.array(z.string()).min(1, "Select at least one technology area"),
    startDate: z.string().min(1, "Select a start date"),
    deadline: z.string().min(1, "Select a deadline"),
  })
  .refine((data) => data.deadline >= data.startDate, {
    message: "Deadline must be on or after the start date",
    path: ["deadline"],
  });

// `budget` uses z.coerce.number(), so the schema's input type (what the
// form actually holds pre-submit, `unknown`/string from the DOM) and
// output type (what the resolver hands to onSubmit, a real `number`)
// diverge. NewProjectForm's useForm<> needs both — see its own comment.
export type NewProjectInput = z.input<typeof newProjectSchema>;
export type NewProjectValues = z.infer<typeof newProjectSchema>;
