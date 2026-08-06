import { redirect, notFound } from "next/navigation";
import { getProjectById } from "@/lib/projectMetrics";

type Props = { params: Promise<{ id: string }> };

// /dashboard/projects/[id] itself isn't a real page (see the sibling
// route list — Overview/Tasks/Team/Timeline/Documents/Activity) —
// redirects to Overview, the layout's first tab.
export default async function ProjectIndexPage({ params }: Props) {
  const { id } = await params;
  if (!getProjectById(id)) notFound();
  redirect(`/dashboard/projects/${id}/overview`);
}
