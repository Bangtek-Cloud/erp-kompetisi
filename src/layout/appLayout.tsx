import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Outlet } from "react-router"

export default function AppsLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <Outlet />
          <footer className="border-t p-6">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                © 2025 TechComp ERP. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

