import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { getOrganizationById } from "@/config/crmMockData";
import { getProjectsByOrganization } from "@/lib/crmMetrics";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const organization = getOrganizationById(id);
  return { title: organization ? `${organization.name} — Projects` : "Organization" };
}

export default async function OrganizationProjectsPage({ params }: Props) {
  const { id } = await params;
  const organization = getOrganizationById(id);
  if (!organization) notFound();

  const projects = getProjectsByOrganization(organization);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-body-sm text-muted-foreground">
        {projects.length} project{projects.length === 1 ? "" : "s"} delivered for {organization.name}.
      </p>
      {projects.length === 0 ? (
        <p className="rounded-md border border-dashed border-border px-4 py-10 text-center text-body-sm text-muted-foreground">
          No projects yet — projects appear here once an opportunity for this organization is won.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      )}
    </div>
  );
}
