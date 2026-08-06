"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

// Mock upload UI only (Phase 4C brief) — same honest "not connected yet"
// pattern as AvatarUploader/AssignMemberButton: there's no document
// storage backend, so a picked file doesn't pretend to upload anywhere.
export function UploadDocumentButton() {
  const [notice, setNotice] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.[0]) setNotice(true);
    event.target.value = "";
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <label
        htmlFor="document-upload"
        className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-4 text-button text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary-hover active:bg-primary-active"
      >
        <Upload aria-hidden="true" className="h-4 w-4" />
        Upload Document
      </label>
      <input id="document-upload" type="file" className="sr-only" onChange={handleChange} />
      {notice && (
        <p className="text-caption text-muted-foreground">Document storage isn&rsquo;t connected yet — nothing was uploaded.</p>
      )}
    </div>
  );
}
