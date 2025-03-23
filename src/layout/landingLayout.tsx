import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router";

export default function LandingLayout() {
    return (
        <div className={cn("min-h-screen bg-background")}>
            <Navbar />
            <Outlet />
        </div>
    )
} 