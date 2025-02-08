import PageContainer from "@/components/PageContainer";
import AnalyticsContent from "./AnalyticsContent";

export default function Home() {
  return (
    <PageContainer
      title="Dashboard"
      description="Here is your analytics store details"
    >
      <AnalyticsContent />
    </PageContainer>
  );
}
