"use client";
import { ArrowRight, Menu, Microchip } from "lucide-react";
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { ModeToggle } from "./toogle-theme";
import { ScrollArea } from "./ui/scroll-area";

interface RouteProps {
    href: string;
    label: string;
}

const routeList: RouteProps[] = [
    {
        href: "/",
        label: "Home",
    },
    // {
    //     href: "#tournament",
    //     label: "Tournament",
    // },
    {
        href: "/about",
        label: "About Us",
    },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
            <Link to="/" className="font-bold text-lg flex items-center">
            <img src="/B-dark.png" className="w-8 h-8 hidden dark:block" />
            <img src="/B-light.png" className="w-8 h-8 block dark:hidden" />
            Bangtek.
            </Link>
            {/* <!-- Mobile --> */}
            <div className="flex items-center lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Menu
                            onClick={() => setIsOpen(!isOpen)}
                            className="cursor-pointer lg:hidden"
                        />
                    </SheetTrigger>

                    <SheetContent
                        side="left"
                        className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
                    >
                        <div>
                            <SheetHeader className="mb-4 ml-4">
                                <SheetTitle className="flex items-center">
                                    <Link to="/" className="flex items-center">
                                        <Microchip className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary p-1 rounded-lg w-9 h-9 mr-2 border text-white" />
                                        Bangtek.
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>

                            <ScrollArea className="h-42">
                                <div className="flex flex-col gap-2">
                                    {routeList.map(({ href, label }) => (
                                        <Button
                                            key={href}
                                            onClick={() => setIsOpen(false)}
                                            asChild
                                            variant="ghost"
                                            className="justify-start text-base"
                                        >
                                            <Link to={href}>{label}</Link>
                                        </Button>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>

                        <SheetFooter className="flex-col sm:flex-col justify-start items-start">
                            <Separator className="mb-2" />

                            <ModeToggle />
                            <Separator className="mb-2" />
                            <Link to={'/auth'}>
                                <Button className="w-full">
                                    Login <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>

            {/* <!-- Desktop --> */}
            <NavigationMenu className="hidden lg:block mx-auto">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        {routeList.map(({ href, label }) => (
                            <NavigationMenuLink key={href} asChild>
                                <Link to={href} className="text-base px-2">
                                    {label}
                                </Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <div className="hidden lg:flex lg:items-center lg:gap-4">
                <ModeToggle />

                <Button asChild size="sm">
                    <Link
                        aria-label="View on GitHub"
                        to="/auth"
                    >
                        Masuk <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </header>
    );
};