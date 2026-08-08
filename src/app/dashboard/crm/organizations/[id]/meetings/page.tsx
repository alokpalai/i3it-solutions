import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MeetingCard } from "@/components/dashboard/MeetingCard";
import { CrmActionButton } from "@/components/dashboard/CrmActionButton";
import { getOrganizationById } from "@/config/crmMockData";
import { getMeetingsByOrganization } from "@/lib/crmMetrics";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const organization = getOrganizationById(id);
  return { title: organization ? `${organization.name} — Meetings` : "Organization" };
}

export default async function OrganizationMeetingsPage({ params }: Props) {
  const { id } = await params;
  const organization = getOrganizationById(id);
  if (!organization) notFound();

  const meetings = getMeetingsByOrganization(organization.id).sort((a, b) => b.datetime.localeCompare(a.datetime));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-body-sm text-muted-foreground">
          {meetings.length} meeting{meetings.length === 1 ? "" : "s"} with {organization.name}.
        </p>
        <CrmActionButton label="Schedule Meeting" />
      </div>
      {meetings.length === 0 ? (
        <p className="rounded-md border border-dashed border-border px-4 py-10 text-center text-body-sm text-muted-foreground">
          No meetings recorded yet.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}
        </div>
      )}
    </div>
  );
}
