import PageContainer from "@/components/PageContainer";
import { getUserData } from "@/actions/auth";
import ChangePasswordForm from "./ChangePasswordForm";

export default async function ChangePasswordPage() {
  const user = await getUserData();

  return (
    <PageContainer title="Change Password" description="Here is your password">
      <ChangePasswordForm user={user} />
    </PageContainer>
  );
}
