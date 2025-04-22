import ResetPasswordForm from "./ResetPasswordForm";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token_hash: string; type: string }>;
}) {
  const { token_hash, type } = await searchParams;

  if (!token_hash || !type) {
    return <h1 className="text-xl font-semibold">Invalid token or expired</h1>;
  }

  if (type !== "recovery") {
    return <h1 className="text-xl font-semibold">Invalid token or expired</h1>;
  }

  return <ResetPasswordForm token={token_hash} />;
}
