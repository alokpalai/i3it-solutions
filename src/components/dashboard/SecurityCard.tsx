import { CheckCircle2, Circle } from "lucide-react";
import { SettingsPanel } from "@/components/dashboard/SettingsPanel";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";

const PASSWORD_RULES = [
  "At least 10 characters",
  "At least one uppercase letter",
  "At least one lowercase letter",
  "At least one number",
  "At least one symbol",
];

// The brief's "SecurityCard" — three of these panels describe the real,
// currently-enforced configuration (password policy from
// src/lib/validation/auth.ts, session timeout from src/auth.config.ts,
// rate limiting from src/lib/rateLimit.ts), not mock numbers; the rest
// (MFA, IP restrictions, login history, device sessions) are honest
// placeholders/architecture, same as the brief's own naming for them.
export function SecurityCard({ activeSessionCount }: { activeSessionCount: number }) {
  return (
    <div className="flex flex-col gap-6">
      <SettingsPanel title="Password policy" description="Enforced today on signup, password change and reset — src/lib/validation/auth.ts." saveable={false}>
        <ul className="flex flex-col gap-2">
          {PASSWORD_RULES.map((rule) => (
            <li key={rule} className="flex items-center gap-2 text-body-sm text-foreground">
              <CheckCircle2 aria-hidden="true" className="h-4 w-4 shrink-0 text-success" />
              {rule}
            </li>
          ))}
        </ul>
      </SettingsPanel>

      <SettingsPanel title="Session timeout" description="src/auth.config.ts." saveable={false}>
        <ul className="flex flex-col gap-2 text-body-sm text-foreground">
          <li>Default session: 8 hours</li>
          <li>&ldquo;Remember me&rdquo; at login extends this to 30 days</li>
        </ul>
      </SettingsPanel>

      <SettingsPanel title="Rate limiting" description="src/lib/rateLimit.ts — in-memory only today; resets on redeploy and doesn't share state across serverless instances." saveable={false}>
        <p className="text-body-sm text-foreground">5 attempts per 15-minute window on login and forgot-password requests.</p>
      </SettingsPanel>

      <SettingsPanel title="Multi-factor authentication" description="Not implemented yet.">
        <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
          <Circle aria-hidden="true" className="h-4 w-4 shrink-0" />
          Require MFA for all users
        </div>
      </SettingsPanel>

      <SettingsPanel title="IP restrictions" description="Not implemented yet.">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ip-allowlist">Allowed IP ranges</Label>
          <Input id="ip-allowlist" placeholder="e.g. 203.0.113.0/24" />
        </div>
      </SettingsPanel>

      <SettingsPanel title="Device sessions" description={`${activeSessionCount} active session${activeSessionCount === 1 ? "" : "s"} right now — the count is real; individual device/location detail isn't captured yet.`} saveable={false}>
        <p className="text-body-sm text-muted-foreground">
          The Session table (Auth.js) tracks who and when, not device or location — that would need its own columns
          added to capture at sign-in time.
        </p>
      </SettingsPanel>

      <SettingsPanel title="Login history" description="No LoginHistory table exists yet — the Activity Log's Security entries are the closest real proxy today." saveable={false}>
        <p className="text-body-sm text-muted-foreground">See the Activity page for recorded login/logout events.</p>
      </SettingsPanel>
    </div>
  );
}
