import { Banknote, Calendar, Image, Landmark, LayoutDashboardIcon, LayoutPanelTop, MonitorPlay, Rss, Trophy, UserCog, UserRoundXIcon } from "lucide-react";

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
    title: "Hero Banner",
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

export const menuEditor = [
  {
    title: "Article",
    url: "/apps/editor/article",
    icon: Rss,
  },
  {
    title: "Gallery",
    url: "/apps/editor/gallery",
    icon: Image,
  },
  {
    title: "Video",
    url: "/apps/editor/video",
    icon: MonitorPlay,
  }
]