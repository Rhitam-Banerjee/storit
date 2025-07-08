import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="-mt-[45px]" />
      <section className="px-10 py-3 max-sm:px-1 max-sm:py-4">
        {children}
      </section>
    </SidebarProvider>
  )
}