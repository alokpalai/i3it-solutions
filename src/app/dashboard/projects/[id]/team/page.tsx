import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamCard } from "@/components/dashboard/TeamCard";
import { AssignMemberButton } from "@/components/dashboard/AssignMemberButton";
import { getProjectById } from "@/lib/projectMetrics";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  return { title: project ? `${project.name} — Team` : "Project" };
}

export default async function ProjectTeamPage({ params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-body-sm text-muted-foreground">
          {project.team.length} member{project.team.length === 1 ? "" : "s"} assigned.
        </p>
        <AssignMemberButton />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {project.team.map((member) => (
          <TeamCard key={member.id} member={member} isManager={member.id === project.projectManager.id} />
        ))}
      </div>
    </div>
  );
}
