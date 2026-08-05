import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Forgot Password",
  description: "Reset your i3it Solutions staff account password.",
  path: "/forgot-password",
  noindex: true,
});

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-16">
      <div className="flex w-full max-w-sm flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-h2 text-foreground">Forgot your password?</h1>
          <p className="text-body text-muted-foreground">
            Enter your company email and we&rsquo;ll send you a link to reset it.
          </p>
        </div>
        <ForgotPasswordForm />
        <Link href="/login" className="text-body-sm font-medium text-primary hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  );
}
