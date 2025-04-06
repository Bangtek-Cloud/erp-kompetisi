import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { RootState } from "@/store";
import { logout } from "@/store/feature/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import PendingTransaction from "@/components/pending-transaction";

const queryClient = new QueryClient()

export default function AppsLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={import.meta.env.NODE_ENV !== 'production' ? true : false} />
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
                  © 2025 Bangtek ERP. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </QueryClientProvider>
  )
}

