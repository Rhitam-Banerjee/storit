import DashboardContent from "@/components/DashboardContent";
import { auth } from "@clerk/nextjs/server";
export default async function DashboardTrash() {
  const { userId } = await auth();
  return <DashboardContent userId={userId ?? ""} page="trash" />;
}
