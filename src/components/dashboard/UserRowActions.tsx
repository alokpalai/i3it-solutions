"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal, Eye, Pencil, UserX, UserCheck, KeyRound, ShieldCheck } from "lucide-react";

type UserRowActionsProps = {
  userId: string;
  isActive: boolean;
};

// "View" is a real link (the detail page reads real data). Everything
// else — Edit/Disable/Enable/Reset Password/Assign Role — is a mutation
// with no endpoint behind it yet, so each shows the same honest notice
// pattern as AssignMemberButton/ProcurementActionButton rather than
// silently doing nothing. Native <details>/<summary> menu (ProfileDropdown's
// pattern) needs client state here only for the notice text, not the
// open/close behavior itself.
export function UserRowActions({ userId, isActive }: UserRowActionsProps) {
  const [notice, setNotice] = useState<string | null>(null);

  function announce(action: string) {
    setNotice(`${action} isn't connected to a backend yet.`);
  }

  return (
    <div className="relative flex justify-end">
      <details className="group">
        <summary
          aria-label="User actions"
          className="flex h-8 w-8 cursor-pointer list-none items-center justify-center rounded-md text-muted-foreground marker:content-none hover:bg-surface hover:text-foreground"
        >
          <MoreHorizontal aria-hidden="true" className="h-4 w-4" />
        </summary>
        <div className="absolute right-0 z-50 mt-1 w-52 rounded-md border border-border bg-background py-1.5 text-left shadow-lg">
          <Link
            href={`/dashboard/admin/users/${userId}`}
            className="flex items-center gap-2.5 px-4 py-2 text-body-sm text-foreground hover:bg-surface"
          >
            <Eye aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
            View
          </Link>
          <button type="button" onClick={() => announce("Edit")} className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-body-sm text-foreground hover:bg-surface">
            <Pencil aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
            Edit
          </button>
          <button type="button" onClick={() => announce(isActive ? "Disable" : "Enable")} className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-body-sm text-foreground hover:bg-surface">
            {isActive ? <UserX aria-hidden="true" className="h-4 w-4 text-muted-foreground" /> : <UserCheck aria-hidden="true" className="h-4 w-4 text-muted-foreground" />}
            {isActive ? "Disable" : "Enable"}
          </button>
          <button type="button" onClick={() => announce("Reset Password")} className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-body-sm text-foreground hover:bg-surface">
            <KeyRound aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
            Reset Password
          </button>
          <button type="button" onClick={() => announce("Assign Role")} className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-body-sm text-foreground hover:bg-surface">
            <ShieldCheck aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
            Assign Role
          </button>
        </div>
      </details>
      {notice && <p className="absolute right-0 top-full mt-1 w-52 text-caption text-muted-foreground">{notice}</p>}
    </div>
  );
}
