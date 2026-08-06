import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { MilestoneCard } from "@/components/dashboard/MilestoneCard";
import { DocumentList } from "@/components/dashboard/DocumentList";
import { ProjectActivityFeed } from "@/components/dashboard/ProjectActivityFeed";
import { getProjectById } from "@/lib/projectMetrics";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  return { title: project ? `${project.name} — Overview` : "Project" };
}

export default async function ProjectOverviewPage({ params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-6 lg:col-span-2">
        <Card className="flex flex-col gap-3">
          <p className="text-h5 text-foreground">Description</p>
          <p className="text-body-sm text-muted-foreground">{project.description}</p>
        </Card>

        <Card className="flex flex-col gap-3">
          <p className="text-h5 text-foreground">Technology stack</p>
          <ul className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>
        </Card>

        <DashboardCard title="Milestones" action={{ label: "Open timeline", href: `/dashboard/projects/${project.id}/timeline` }}>
          <ul className="flex flex-col gap-2">
            {project.milestones.map((milestone) => (
              <MilestoneCard key={milestone.id} milestone={milestone} />
            ))}
          </ul>
        </DashboardCard>
      </div>

      <div className="flex flex-col gap-6">
        <DashboardCard title="Assigned team" action={{ label: "View team", href: `/dashboard/projects/${project.id}/team` }}>
          <ul className="flex flex-col gap-3">
            {project.team.map((member) => (
              <li key={member.id} className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-caption font-semibold text-primary">
                  {member.initials}
                </span>
                <div className="flex flex-col">
                  <span className="text-body-sm text-foreground">{member.name}</span>
                  <span className="text-caption text-muted-foreground">{member.role}</span>
                </div>
              </li>
            ))}
          </ul>
        </DashboardCard>

        <DashboardCard title="Attachments" action={{ label: "View all", href: `/dashboard/projects/${project.id}/documents` }}>
          <DocumentList documents={project.documents} limit={4} />
        </DashboardCard>

        <DashboardCard title="Activity" action={{ label: "View all", href: `/dashboard/projects/${project.id}/activity` }}>
          <ProjectActivityFeed items={project.activity.slice(0, 4)} />
        </DashboardCard>
      </div>
    </div>
  );
}
