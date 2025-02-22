import PageContainer from "@/components/PageContainer";
import SettingCard from "./SettingCard";
import { getUserData } from "@/actions/auth";

export default async function Settings() {
  const user = await getUserData();

  return (
    <PageContainer title="Settings" description="Here is your settings">
      <SettingCard user={user} />
    </PageContainer>
  );
}
