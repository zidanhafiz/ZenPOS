import PageContainer from "@/components/PageContainer";
import ChangePasswordForm from "./ChangePasswordForm";

export default function ChangePasswordPage() {
  return (
    <PageContainer title="Change Password" description="Here is your password">
      <ChangePasswordForm />
    </PageContainer>
  );
}
