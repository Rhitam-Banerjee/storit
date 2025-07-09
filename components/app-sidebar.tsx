import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { TiStar, TiUser } from "react-icons/ti";
import { TbHome, TbTrashX } from "react-icons/tb";
import Link from "next/link";
import { PiCloudArrowUpDuotone } from "react-icons/pi";
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: TbHome,
  },
  {
    title: "Starred",
    url: "/dashboard/starred",
    icon: TiStar,
  },
  {
    title: "Trash",
    url: "/dashboard/trash",
    icon: TbTrashX,
  },
]
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="px-[20px] py-[15px]">
          <SidebarGroupLabel className="mb-[20px]">
            <Link href={"/"} className="flex flex-row justify-start items-center gap-[10px]">
              <PiCloudArrowUpDuotone className="text-2xl" />
              <span className="text-2xl font-semibold">StorIt</span>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-primary hover:text-secondary">
                    <a href={item.url} className="">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </ SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-[20px] py-[15px]">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href={"/dashboard/account"} className="flex flex-row justify-start items-center gap-2">
              <TiUser />
              <span>My Account</span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}