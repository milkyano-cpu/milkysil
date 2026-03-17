import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TooltipProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
          } as React.CSSProperties
        }
      >
        <AppSidebar />

      <SidebarInset>
        {/* 🔥 HEADER HANYA MOBILE */}
        <div className="md:hidden">
          <SiteHeader />
        </div>

        <div className="p-6">{children}</div>
      </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}