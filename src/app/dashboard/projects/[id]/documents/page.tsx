import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DocumentList } from "@/components/dashboard/DocumentList";
import { UploadDocumentButton } from "@/components/dashboard/UploadDocumentButton";
import { getProjectById } from "@/lib/projectMetrics";
import type { ProjectDocumentCategory } from "@/config/dashboardMockData";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  return { title: project ? `${project.name} — Documents` : "Project" };
}

export default async function ProjectDocumentsPage({ params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const categories = Array.from(
    new Set(project.documents.map((doc) => doc.category)),
  ) as ProjectDocumentCategory[];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-body-sm text-muted-foreground">
          {project.documents.length} document{project.documents.length === 1 ? "" : "s"} across{" "}
          {categories.length} categor{categories.length === 1 ? "y" : "ies"}.
        </p>
        <UploadDocumentButton />
      </div>

      {project.documents.length === 0 ? (
        <DashboardCard title="All documents">
          <DocumentList documents={[]} />
        </DashboardCard>
      ) : (
        categories.map((category) => (
          <DashboardCard key={category} title={category}>
            <DocumentList documents={project.documents.filter((doc) => doc.category === category)} />
          </DashboardCard>
        ))
      )}
    </div>
  );
}
