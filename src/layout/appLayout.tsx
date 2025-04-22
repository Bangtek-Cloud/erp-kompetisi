import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { logout } from "@/store/feature/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router"
import PendingTransaction from "@/components/pending-transaction";
import useAuthStore from "@/store/feature/authStand";

export default function AppsLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
      <SidebarProvider>
        <AppSidebar user={user || null} logout={handleLogout} />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <PendingTransaction />
            <Outlet />
            <footer className="border-t p-6">
              <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  © 2025 Bangtek ERP. All rights reserved - Kepsgurih
                </p>
              </div>
            </footer>
          </div>
        </SidebarInset>
      </SidebarProvider>
  )
}

