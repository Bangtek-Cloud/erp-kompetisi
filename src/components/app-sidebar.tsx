import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { NavNormal } from "./nav-normal"
import { NavUser } from "./nav-user"
import { Link } from "react-router"
import { IUser } from "@/types/user"
import { menuAllUser, menuManagement } from "@/constant/menu"
import useAuthStore from "@/store/feature/authStand";

interface sidebarProps {
  user: IUser | null,
  logout: () => void
}

export function AppSidebar(props: sidebarProps) {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "ADMIN" || user?.role === "SU";
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="bg-background">
        <SidebarMenu className="bg-background">
          <SidebarMenuItem className="bg-background">
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/apps/home">
                <img src="/B-dark.png" className="w-8 h-8 hidden dark:block" />
                <img src="/B-light.png" className="w-8 h-8 block dark:hidden" />
                <span className="text-base font-semibold">Bangtek.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarTrigger className="absolute right-2 top-2" />
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <NavMain items={menuAllUser} />
        {/* <NavNormal nameMenu="Finance" items={data.finance} />
        <NavNormal nameMenu="Management" items={data.management} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
        {isAdmin && (
           <NavNormal nameMenu="Management" items={menuManagement} />
        )}
      </SidebarContent>
      <SidebarFooter className="bg-background">
        <NavUser user={props.user} logout={props.logout} />
      </SidebarFooter>
    </Sidebar>
  )
}
