import DashboardContent from "@/components/DashboardContent";
import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const { userId } = await auth();
  return <DashboardContent userId={userId ?? ""} page="all" />;
}
