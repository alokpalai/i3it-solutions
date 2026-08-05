import Link from "next/link";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { ErrorMessage } from "@/components/contact/ErrorMessage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Reset Password",
  description: "Set a new password for your i3it Solutions staff account.",
  path: "/reset-password",
  noindex: true,
});

type Props = { searchParams: Promise<{ token?: string }> };

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-16">
      <div className="flex w-full max-w-sm flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-h2 text-foreground">Reset your password</h1>
          <p className="text-body text-muted-foreground">Choose a new password for your account.</p>
        </div>
        {token ? (
          <ResetPasswordForm token={token} />
        ) : (
          <>
            <ErrorMessage
              title="Missing reset link"
              description="This page needs a valid reset link — check the link in your email, or request a new one."
            />
            <Link
              href="/forgot-password"
              className="text-body-sm font-medium text-primary hover:underline"
            >
              Request a new reset link
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
