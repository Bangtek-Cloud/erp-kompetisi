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
                        <Link to={item.url} className="flex items-center gap-2">
                            <SidebarMenuButton tooltip={item.title} isActive={pathname.startsWith(item.url)} >
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
