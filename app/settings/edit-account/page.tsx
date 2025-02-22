import PageContainer from "@/components/PageContainer";
import { getUserData } from "@/actions/auth";
import EditAccountForm from "./EditAccountForm";

export default async function EditAccountPage() {
  const user = await getUserData();

  return (
    <PageContainer title="Edit Account" description="Here is your account">
      <EditAccountForm user={user} />
    </PageContainer>
  );
}
