import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import { Link, Outlet } from "react-router";

export default function LandingLayout() {
    return (
        <div className={cn("min-h-screen bg-background")}>
            <Navbar />
            <Outlet />

            <footer className="border-t p-6 md:py-0">
                <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © 2025 Bangtek ERP. All rights reserved - Kepsgurih
                    </p>
                    <div className="flex items-center gap-4">
                        <Link to="/terms" className="text-sm text-muted-foreground hover:underline">
                            Terms
                        </Link>
                        <Link to="/privacy" className="text-sm text-muted-foreground hover:underline">
                            Privacy
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
} 