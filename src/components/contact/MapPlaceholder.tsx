import { MapPin } from "lucide-react";

type MapPlaceholderProps = {
  /** Real embed URL, once an owner-confirmed office location exists. Never
   * default this to an example/placeholder location — no coordinates are
   * fabricated (Phase 3G brief). */
  embedUrl?: string;
};

export function MapPlaceholder({ embedUrl }: MapPlaceholderProps) {
  if (embedUrl) {
    return (
      <iframe
        src={embedUrl}
        title="Office location map"
        loading="lazy"
        className="h-80 w-full rounded-md border border-border"
      />
    );
  }

  return (
    <div className="flex h-80 flex-col items-center justify-center gap-3 rounded-md border border-dashed border-border bg-surface text-center">
      <MapPin aria-hidden="true" className="h-8 w-8 text-muted-foreground" />
      <p className="max-w-xs text-body-sm text-muted-foreground">
        Map will be displayed here once our office location is confirmed.
      </p>
    </div>
  );
}
