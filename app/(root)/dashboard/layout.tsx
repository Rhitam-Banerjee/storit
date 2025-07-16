import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider className="w-full" defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarTrigger />
      <section className="w-full max-w-[1440px] mx-auto px-16 pl-9 py-3 max-sm:px-8 max-sm:pl-1 max-sm:py-4">
        <div className="flex flex-col justify-between items-center w-full gap-[30px]">
          {children}
        </div>
      </section>
    </SidebarProvider>
  );
}
