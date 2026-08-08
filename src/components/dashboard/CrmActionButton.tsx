"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Reused across every CRM list page (Leads, Contacts, Meetings,
// Opportunities) for the "Add ___" action the brief doesn't ask for a
// dedicated route/form for — same "architecture only, honest about it"
// pattern as AssignMemberButton/UploadDocumentButton rather than four
// near-identical single-purpose button components.
export function CrmActionButton({ label }: { label: string }) {
  const [notice, setNotice] = useState(false);

  return (
    <div className="flex flex-col items-end gap-1.5">
      <Button variant="secondary" size="sm" type="button" onClick={() => setNotice(true)}>
        <Plus aria-hidden="true" className="h-4 w-4" />
        {label}
      </Button>
      {notice && <p className="text-caption text-muted-foreground">This isn&rsquo;t connected to a backend yet.</p>}
    </div>
  );
}
