import {
  BatteryCharging,
  Building2,
  Camera,
  ClipboardList,
  Database,
  Globe,
  Handshake,
  Headset,
  KeySquare,
  Landmark,
  Laptop,
  Layers,
  MonitorSmartphone,
  Network,
  Router,
  Server,
  ShieldCheck,
  Video,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/config/homepage";

// Named per-icon imports stay tree-shakeable; this map just gives the typed
// content model (src/config/homepage.ts) a way to reference an icon by
// string without every section component importing lucide-react directly.
export const homeIcons: Record<IconName, LucideIcon> = {
  ClipboardList,
  Server,
  ShieldCheck,
  Headset,
  Building2,
  Landmark,
  Layers,
  Globe,
  Laptop,
  Database,
  Router,
  Camera,
  MonitorSmartphone,
  BatteryCharging,
  Network,
  Video,
  KeySquare,
  Handshake,
};
