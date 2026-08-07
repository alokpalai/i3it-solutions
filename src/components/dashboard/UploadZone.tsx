"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

// "Support architecture for uploads and previews" per the brief — real
// drag-and-drop and file-picker interaction (drag-over highlight, click
// to browse), same honest "not connected yet" footing as
// AvatarUploader/UploadDocumentButton: there's no document storage
// backend, so a dropped/picked file surfaces a notice rather than
// pretending to upload.
export function UploadZone({ label = "Upload documents" }: { label?: string }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const names = Array.from(files).map((file) => file.name).join(", ");
    setNotice(`Document storage isn't connected yet — "${names}" wasn't uploaded.`);
  }

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="upload-zone-input"
        onDragOver={(event) => { event.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragOver(false);
          handleFiles(event.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed px-6 py-10 text-center transition-colors",
          isDragOver ? "border-secondary bg-surface-muted" : "border-border hover:border-secondary",
        )}
      >
        <UploadCloud aria-hidden="true" className="h-8 w-8 text-muted-foreground" />
        <span className="text-body-sm font-medium text-foreground">{label}</span>
        <span className="text-caption text-muted-foreground">Drag and drop, or click to browse</span>
        <input
          id="upload-zone-input"
          type="file"
          multiple
          className="sr-only"
          onChange={(event) => handleFiles(event.target.files)}
        />
      </label>
      {notice && <p className="text-caption text-muted-foreground">{notice}</p>}
    </div>
  );
}
