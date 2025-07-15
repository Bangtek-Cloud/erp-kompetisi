import { Banknote, Calendar, Landmark, LayoutDashboardIcon, LayoutPanelLeft, LayoutPanelTop, Trophy, UserCog, UserRoundXIcon } from "lucide-react";

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

export const FinanceMenu = [
  {
    title: "Finance",
    url: "/apps/finance/home",
    icon: Landmark,
  },
  {
    title: "Asset",
    url: "/apps/finance/assets",
    icon: LayoutPanelTop,
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
  },
  {
    title: "User",
    url: "/apps/management/user",
    icon: UserCog
  },
  {
    title: "Session",
    url: "/apps/management/session",
    icon: UserRoundXIcon
  },
  {
    title: "Bank Account",
    url: "/apps/management/bank",
    icon: Banknote
  }
]