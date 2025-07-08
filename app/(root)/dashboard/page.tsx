import DashboardHeader from "@/components/DashboardHeader";

export default function Dashboard() {
  return (
    <section className="flex flex-col justify-between items-center w-full gap-[30px]">
      <DashboardHeader />
      <div className="w-full bg-blue-500">MainContent</div>
    </section>
  )
}