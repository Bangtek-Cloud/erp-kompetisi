// "use client"
// import { Link } from "react-router"
// import {
//   Trophy,
//   Home,
//   Users,
//   DollarSign,
//   BarChart2,
//   Settings,
//   Calendar,
//   Swords,
//   Medal,
//   FileText,
//   CreditCard,
// } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarSeparator,
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarGroupContent,
// } from "@/components/ui/sidebar"



// export function AppSidebar() {
//   return (
//     <Sidebar>
//       <SidebarHeader className="pb-0">
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg" asChild>
//               <Link to="/">
//                 <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
//                   <Trophy className="size-4" />
//                 </div>
//                 <div className="flex flex-col gap-0.5 leading-none">
//                   <span className="font-semibold">TechComp ERP</span>
//                   <span className="text-xs text-muted-foreground">v1.0.0</span>
//                 </div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>

//       <SidebarContent>
//         {menuItems.map((group, index) => (
//           <div key={group.label}>
//             <SidebarGroup>
//               <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
//               <SidebarGroupContent>
//                 <SidebarMenu>
//                   {group.items.map((item) => (
//                     <SidebarMenuItem key={item.path}>
//                       <SidebarMenuButton asChild>
//                         <Link to={item.path}>
//                           <item.icon className="h-4 w-4" />
//                           <span>{item.label}</span>
//                         </Link>
//                       </SidebarMenuButton>
//                     </SidebarMenuItem>
//                   ))}
//                 </SidebarMenu>
//               </SidebarGroupContent>
//             </SidebarGroup>
//             {index < menuItems.length - 1 && <SidebarSeparator />}
//           </div>
//         ))}
//       </SidebarContent>

//       <SidebarFooter>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg">
//               <Avatar className="h-8 w-8">
//                 <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
//                 <AvatarFallback>AD</AvatarFallback>
//               </Avatar>
//               <div className="flex flex-col gap-0.5 leading-none">
//                 <span className="font-medium">Admin User</span>
//                 <span className="text-xs text-muted-foreground">admin@techcomp.com</span>
//               </div>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   )
// }


"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  Calendar,
  CreditCard,
  DollarSign,
  FileText,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  Sword,
  Trophy,
  User,
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
import { NavNormal } from "./nav-normal"
import { NavUser } from "./nav-user"
import { NavSecondary } from "./nav-secondary"
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
    {
      title: "Matches",
      url: "/apps/match",
      icon: Sword,
    },
    {
      title: "Tournaments",
      url: "/apps/tournament",
      icon: Trophy,
    },
    {
      title: "Technicians",
      url: "/apps/technician",
      icon: User,
    },
    {
      title: "Schedule",
      url: "/apps/schedule",
      icon: Calendar,
    },
  ],
  finance: [
    {
      title: "Financial Dashboard",
      icon: DollarSign,
      url: "/apps/finance/home",
    },
    {
      title: "Transactions",
      icon: CreditCard,
      url: "/apps/finance/transactions",
    },
    {
      title: "Financial Reports",
      icon: FileText,
      url: "/apps/finance/reports",
    },
    {
      title: "Public Reports",
      icon: FileText,
      url: "/apps/finance/public",
    },
    {
      title: "Donors",
      icon: DollarSign,
      url: "/apps/finance/donors",
    },
  ],
  management: [
    {
      title: "Leaderboard",
      icon: DollarSign,
      url: "/apps/leaderboard",
    },
    {
      title: "Reports",
      icon: CreditCard,
      url: "/apps/reports",
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/apps/settings",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
  ],
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
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Bangtek.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <NavMain items={data.navMain} />
        <NavNormal nameMenu="Finance" items={data.finance} />
        <NavNormal nameMenu="Management" items={data.management} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="bg-background">
        <NavUser user={props.user} logout={props.logout} />
      </SidebarFooter>
    </Sidebar>
  )
}
