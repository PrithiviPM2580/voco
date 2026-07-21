"use client"

import Logo from "@/components/logo"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  sidebarLinksFirstSection,
  sidebarLinksSecondSection,
} from "@/lib/constants"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import DashboardUserButton from "./dashboard-user-button"

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          <Logo color="#ffffff" title="Voco" className="h-10 w-10" />
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarLinksFirstSection.map((link) => (
                <SidebarMenuItem key={link.id}>
                  <SidebarMenuButton
                    className={cn(
                      "h-10 border border-transparent from-sidebar-accent from-5% via-sidebar/50 via-30% to-sidebar/50 hover:border-[#5D6B68]/10 hover:bg-linear-to-r",
                      pathname === link.href &&
                        "border-[#5D6B68]/10 bg-linear-to-r"
                    )}
                    isActive={pathname === link.href}
                    render={
                      <Link href={link.href}>
                        <link.icon />
                        <span className="text-sm font-medium tracking-tight">
                          {link.label}
                        </span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-4 py-2">
          <Separator />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarLinksSecondSection.map((link) => (
                <SidebarMenuItem key={link.id}>
                  <SidebarMenuButton
                    className={cn(
                      "h-10 border border-transparent from-sidebar-accent from-5% via-sidebar/50 via-30% to-sidebar/50 hover:border-[#5D6B68]/10 hover:bg-linear-to-r",
                      pathname === link.href &&
                        "border-[#5D6B68]/10 bg-linear-to-r"
                    )}
                    isActive={pathname === link.href}
                    render={
                      <Link href={link.href}>
                        <link.icon />
                        <span className="text-sm font-medium tracking-tight">
                          {link.label}
                        </span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  )
}
