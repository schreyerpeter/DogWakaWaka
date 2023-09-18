import PageLayout from "../src/components/layouts/PageLayout";
import AppointmentsColumn from "@/src/components/molecules/AppointmentsColumn";

export default function Home() {
  return (
    <PageLayout>
      <AppointmentsColumn />
    </PageLayout>
  );
}
