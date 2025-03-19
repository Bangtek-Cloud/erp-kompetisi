"use client"

import {
    type LucideIcon,
} from "lucide-react"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router"

export function NavNormal({
    nameMenu,
    items,
}: {
    nameMenu: string
    items: {
        title: string
        url: string
        icon: LucideIcon
    }[]
}) {
    const location = useLocation()
    const pathname = location.pathname

    
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>{nameMenu}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={!pathname.startsWith(item.url)} className={"bg-primary/80 text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"}>
                            <Link to={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
