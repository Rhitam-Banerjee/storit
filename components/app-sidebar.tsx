"use client"
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
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const items = [
  {
    title: "dashboard",
    url: "/dashboard",
    icon: TbHome,
  },
  {
    title: "starred",
    url: "/dashboard/starred",
    icon: TiStar,
  },
  {
    title: "trash",
    url: "/dashboard/trash",
    icon: TbTrashX,
  },
]
export function AppSidebar() {
  const pathname = usePathname()
  const [activePage, setActivePage] = useState("dashboard")
  useEffect(() => {
    setActivePage(pathname?.split("/")?.pop() || "dashboard")
  }, [pathname])
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
                  <SidebarMenuButton asChild className={`${activePage === item.title ? "bg-primary text-secondary" : ""} hover:bg-primary hover:text-secondary`}>
                    <a href={item.url} className="">
                      <item.icon />
                      <span className="capitalize">{item.title}</span>
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
            <Link href={"/account"} className="flex flex-row justify-start items-center gap-2">
              <TiUser />
              <span>My Account</span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}