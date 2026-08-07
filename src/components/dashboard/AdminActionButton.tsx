"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Reused across Admin list pages for the "Add/Invite ___" action the
// brief doesn't ask for a dedicated route/form for — same "architecture
// only, honest about it" pattern as AssignMemberButton (Phase 4C) and its
// per-phase equivalents in CRM/Procurement (built on branches not present
// here, so recreated rather than imported).
export function AdminActionButton({ label }: { label: string }) {
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
