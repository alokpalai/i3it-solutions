"use client";

import { useState } from "react";
import Image from "next/image";
import { User as UserIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";

type AvatarUploaderProps = {
  currentAvatarUrl?: string | null;
};

// Architecture only, like every other "not yet wired to a real backend"
// piece in this codebase (src/lib/email.ts, src/config/spamProtection.ts):
// picks a file and shows a local preview via an object URL, but there's no
// object storage (S3/Cloudinary/Vercel Blob/etc.) provisioned to actually
// persist it to, so the "Save" action says so honestly rather than
// pretending to succeed.
export function AvatarUploader({ currentAvatarUrl }: AvatarUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatarUrl ?? null);
  const [notice, setNotice] = useState<string | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    setNotice(null);
  }

  function handleSave() {
    setNotice("Profile picture storage isn't connected yet — this preview isn't saved.");
  }

  return (
    <div className="flex items-center gap-5">
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-muted">
        {previewUrl ? (
          <Image src={previewUrl} alt="" fill sizes="64px" className="object-cover" />
        ) : (
          <UserIcon aria-hidden="true" className="h-7 w-7 text-secondary" />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <label
            htmlFor="avatar-upload"
            className="flex h-9 cursor-pointer items-center gap-2 rounded-md border border-border px-4 text-body-sm font-medium text-foreground hover:border-secondary"
          >
            <Upload aria-hidden="true" className="h-4 w-4" />
            Choose photo
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleFileChange}
          />
          <Button type="button" variant="secondary" size="sm" onClick={handleSave}>
            Save
          </Button>
        </div>
        {notice && <p className="text-caption text-muted-foreground">{notice}</p>}
      </div>
    </div>
  );
}
