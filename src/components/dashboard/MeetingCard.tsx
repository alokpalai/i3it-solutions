import Link from "next/link";
import { CalendarClock, Users, ListChecks } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { MeetingStatusBadge } from "@/components/dashboard/MeetingStatusBadge";
import type { MockMeeting } from "@/config/crmMockData";
import { getOrganizationById, getContactById } from "@/config/crmMockData";
import { formatDate } from "@/lib/formatDate";

export function MeetingCard({ meeting }: { meeting: MockMeeting }) {
  const organization = getOrganizationById(meeting.organizationId);
  const contacts = meeting.contactIds.map((id) => getContactById(id)).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const doneActionItems = meeting.actionItems.filter((item) => item.done).length;

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-body-sm font-medium text-foreground">{meeting.title}</p>
        <MeetingStatusBadge status={meeting.status} />
      </div>

      {organization && (
        <Link href={`/dashboard/crm/organizations/${organization.id}/overview`} className="text-caption text-secondary hover:underline">
          {organization.name}
        </Link>
      )}

      <p className="text-caption text-muted-foreground">{meeting.agenda}</p>

      <div className="flex items-center gap-2 text-caption text-muted-foreground">
        <CalendarClock aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
        {formatDate(meeting.datetime)} &middot;{" "}
        {new Date(meeting.datetime).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}
      </div>

      {contacts.length > 0 && (
        <div className="flex items-center gap-2 text-caption text-muted-foreground">
          <Users aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          {contacts.map((contact) => contact.name).join(", ")}
        </div>
      )}

      {meeting.actionItems.length > 0 && (
        <div className="flex items-center gap-2 border-t border-border pt-2 text-caption text-muted-foreground">
          <ListChecks aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          {doneActionItems}/{meeting.actionItems.length} action items complete
        </div>
      )}

      {meeting.notes && <p className="border-t border-border pt-2 text-caption text-muted-foreground">{meeting.notes}</p>}
    </Card>
  );
}
