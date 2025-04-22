import { Calendar, LayoutDashboardIcon, LayoutPanelLeft, LayoutPanelTop, Trophy } from "lucide-react";

export const menuAllUser = [
  {
    title: "Dashboard",
    url: "/apps/home",
    icon: LayoutDashboardIcon,
  },
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
]

export const menuManagement = [
  {
    title: "Website Route",
    url: "/apps/management/web-route",
    icon: LayoutPanelLeft,
  },
  {
    title: "Website",
    url: "/apps/management/website",
    icon: LayoutPanelTop,
  }
]