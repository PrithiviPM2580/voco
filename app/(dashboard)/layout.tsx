import { SidebarProvider } from "@/components/ui/sidebar"
import DashboardSidebar from "@/modules/dashboard/components/dashboard-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex h-dvh w-full flex-col bg-muted">{children}</main>
    </SidebarProvider>
  )
}
