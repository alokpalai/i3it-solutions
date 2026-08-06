"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Same "architecture only" honesty as AvatarUploader — there's no
// member-assignment endpoint yet, so clicking says so rather than doing
// nothing silently.
export function AssignMemberButton() {
  const [notice, setNotice] = useState(false);

  return (
    <div className="flex flex-col items-end gap-1.5">
      <Button variant="secondary" size="sm" type="button" onClick={() => setNotice(true)}>
        <Plus aria-hidden="true" className="h-4 w-4" />
        Assign Member
      </Button>
      {notice && (
        <p className="text-caption text-muted-foreground">Member assignment isn&rsquo;t connected yet.</p>
      )}
    </div>
  );
}
