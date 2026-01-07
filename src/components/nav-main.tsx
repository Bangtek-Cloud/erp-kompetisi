"use client"

import { Bell, MailIcon, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation, useNavigate } from "react-router"

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
    }[]
}) {
    const location = useLocation()
    const pathname = location.pathname
    const navigate = useNavigate()

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2">
                        <SidebarMenuButton onClick={() => navigate("/apps/notification")}
                            tooltip="Quick Create"
                            className="min-w-8 duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                        >
                            <Bell />
                            <span>Notification</span>
                        </SidebarMenuButton>
                        <Button
                            size="icon"
                            className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
                            variant="outline"
                        >
                            <MailIcon />
                            <span className="sr-only">Inbox</span>
                        </Button>
                    </SidebarMenuItem>
                </SidebarMenu>
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
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
