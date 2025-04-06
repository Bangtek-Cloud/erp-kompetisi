import {
  Calendar,
  // CreditCard,
  // DollarSign,
  // FileText,
  // HelpCircleIcon,
  LayoutDashboardIcon,
  // SettingsIcon,
  // Sword,
  Trophy,
  // User,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
// import { NavNormal } from "./nav-normal"
import { NavUser } from "./nav-user"
// import { NavSecondary } from "./nav-secondary"
import { Link } from "react-router"
import { IUser } from "@/types/user"

interface sidebarProps {
  user: IUser | null,
  logout: () => void
}

const data = {
  user: {
    name: "Kevin Doe",
    email: "kevin@example.com",
    avatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Christopher",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/apps/home",
      icon: LayoutDashboardIcon,
    },
    // {
    //   title: "Matches",
    //   url: "/apps/match",
    //   icon: Sword,
    // },
    {
      title: "Events",
      url: "/apps/schedule",
      icon: Calendar,
    },
    {
      title: "Tournaments",
      url: "/apps/tournament",
      icon: Trophy,
    },
    // {
    //   title: "Peserta",
    //   url: "/apps/technician",
    //   icon: User,
    // },
  ],
  // finance: [
  //   {
  //     title: "Financial Dashboard",
  //     icon: DollarSign,
  //     url: "/apps/finance/home",
  //   },
  //   {
  //     title: "Transactions",
  //     icon: CreditCard,
  //     url: "/apps/finance/transactions",
  //   },
  //   {
  //     title: "Financial Reports",
  //     icon: FileText,
  //     url: "/apps/finance/reports",
  //   },
  //   {
  //     title: "Public Reports",
  //     icon: FileText,
  //     url: "/apps/finance/public",
  //   },
  //   {
  //     title: "Donors",
  //     icon: DollarSign,
  //     url: "/apps/finance/donors",
  //   },
  // ],
  // management: [
  //   {
  //     title: "Leaderboard",
  //     icon: DollarSign,
  //     url: "/apps/leaderboard",
  //   },
  //   {
  //     title: "Reports",
  //     icon: CreditCard,
  //     url: "/apps/reports",
  //   },
  // ],
  // navSecondary: [
  //   {
  //     title: "Settings",
  //     url: "/apps/settings",
  //     icon: SettingsIcon,
  //   },
  //   {
  //     title: "Get Help",
  //     url: "#",
  //     icon: HelpCircleIcon,
  //   },
  // ],
}

export function AppSidebar(props: sidebarProps) {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader  className="bg-background">
        <SidebarMenu  className="bg-background">
          <SidebarMenuItem  className="bg-background">
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
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <NavMain items={data.navMain} />
        {/* <NavNormal nameMenu="Finance" items={data.finance} />
        <NavNormal nameMenu="Management" items={data.management} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter className="bg-background">
        <NavUser user={props.user} logout={props.logout} />
      </SidebarFooter>
    </Sidebar>
  )
}
