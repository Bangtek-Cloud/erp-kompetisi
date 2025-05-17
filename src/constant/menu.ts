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
    url: "/apps/finance",
    icon: Landmark,
  },
  {
    title: "Asset",
    url: "/apps/finance/transaction",
    icon: LayoutPanelTop,
  },
  {
    title: "Donor",
    url: "/apps/finance/donor",
    icon: Banknote,
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
  }
]