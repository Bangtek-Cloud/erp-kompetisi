import { Home, Calendar, Trophy, Image, Video, FileText, Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, Link as RouterLink } from 'react-router';

export default function LandingLayout() {
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('vite-ui-theme');
        return savedTheme ? savedTheme === 'dark' : true;
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('vite-ui-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('vite-ui-theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(prev => !prev);

    const navLinks = [
        { to: '/', icon: <Home size={20} />, label: 'Home' },
        { to: '/events', icon: <Calendar size={20} />, label: 'Events' },
        { to: '/tournaments', icon: <Trophy size={20} />, label: 'Tourneys' },
        { to: '/gallery', icon: <Image size={20} />, label: 'Gallery' },
        { to: '/videos', icon: <Video size={20} />, label: 'Clips' },
        { to: '/articles', icon: <FileText size={20} />, label: 'News' },
    ];
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 selection:bg-primary selection:text-white">
            {/* Desktop Header - Solid with subtle blur */}
            <header className="hidden md:flex fixed top-0 left-0 right-0 h-20 bg-card/98 border-b border-border z-50 items-center justify-between px-8 lg:px-16 shadow-sm backdrop-blur-md">
                <div className="flex items-center gap-3 font-lat1">
                    <img src="/B-dark.png" className="w-8 h-8 hidden dark:block" />
                    <img src="/B-light.png" className="w-8 h-8 block dark:hidden" />
                    Bangtek.
                </div>

                <nav className="flex items-center bg-muted/50 p-1.5 rounded-2xl border border-border">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `px-4 lg:px-6 py-2 rounded-xl font-accent text-[11px] lg:text-xs uppercase tracking-widest transition-all ${isActive
                                    ? 'text-primary-foreground bg-primary shadow-md shadow-primary/20'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-3 rounded-xl bg-muted border border-border hover:border-primary/50 transition-all text-foreground group"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? (
                            <Sun size={18} className="group-hover:rotate-45 transition-transform" />
                        ) : (
                            <Moon size={18} className="group-hover:-rotate-12 transition-transform" />
                        )}
                    </button>
                    <RouterLink to="/auth/login" className="bg-foreground text-background px-6 py-2.5 rounded-xl font-accent text-xs tracking-widest uppercase hover:brightness-125 transition-all shadow-lg active:scale-95">
                        PARTICIPATE
                    </RouterLink>
                </div>
            </header>

            {/* Mobile/Tablet Top Bar - Solid */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center justify-between px-6 shadow-sm">
                <div className="flex items-center gap-2">
                    <Trophy className="text-primary" size={20} />
                    <span className="font-heading text-lg tracking-tighter uppercase">PROTOURNEY</span>
                </div>
                <div className='flex items-center gap-2'>
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl bg-muted border border-border text-foreground"
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <RouterLink to="/auth/login" className="bg-foreground text-background px-6 py-2.5 rounded-xl font-accent text-xs tracking-widest uppercase hover:brightness-125 transition-all shadow-lg active:scale-95">
                        PARTICIPATE
                    </RouterLink>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="max-w-360 mx-auto pt-20 pb-28 md:pt-36 md:pb-16 px-4 sm:px-8 md:px-12 transition-all">
                <Outlet />
            </main>

            {/* Mobile/Tablet Bottom Navigation Bar - Fully Solid, No Transparency */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-card border-t-2 border-border z-60 flex justify-around items-center px-4 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] pb-safe">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 relative ${isActive
                                ? 'text-primary'
                                : 'text-muted-foreground'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <div className={`transition-transform duration-300 ${isActive ? '-translate-y-1 scale-110' : ''}`}>
                                    {link.icon}
                                </div>
                                <span className={`text-[9px] font-accent uppercase mt-1 tracking-tighter transition-opacity duration-300 ${isActive ? 'opacity-100 font-bold' : 'opacity-70'}`}>
                                    {link.label}
                                </span>
                                {isActive && (
                                    <div className="absolute -top-1 w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>
        </div>
    )
} 