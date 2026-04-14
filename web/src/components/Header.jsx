import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Globe } from 'lucide-react';
import { cn } from '@/lib/utils.js';
import { useTranslation } from 'react-i18next';
import logoVerde from '../assets/logo Verde sin fondo.png';
import logoMarfil from '../assets/logo Marfil sin fondo.png';

const Header = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { path: '/', label: t('nav.home') },
        { path: '/services', label: t('nav.services', 'Servicios') },
        { path: '/portfolio', label: t('nav.portfolio') },
        { path: '/about', label: t('nav.about') },
        { path: '/contact', label: t('nav.contact') }
    ];

    const isActive = (path) => location.pathname === path;

    const toggleLanguage = () => {
        const newLang = i18n.language.startsWith('en') ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300",
                scrolled
                    ? "bg-background/70 py-3 backdrop-blur-lg shadow-sm border-b border-border/50"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link 
                    to="/" 
                    className="group relative z-10 flex items-center gap-3"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <img 
                        src={logoVerde} 
                        alt="SIGIL Logo" 
                        className={cn("h-10 w-auto transition-transform group-hover:scale-105", (!scrolled && isHome) ? "hidden" : "dark:hidden")} 
                    />
                    <img 
                        src={logoMarfil} 
                        alt="SIGIL Logo" 
                        className={cn("h-10 w-auto transition-transform group-hover:scale-105", (!scrolled && isHome) ? "block" : "hidden dark:block")} 
                    />
                    <span className={cn(
                        "text-2xl font-serif font-bold tracking-tight transition-colors",
                        (!scrolled && isHome) ? "text-[#F4F1EB]" : "text-foreground"
                    )}>
                        SIGIL
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    <nav className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    "relative text-sm font-medium transition-colors",
                                    (!scrolled && isHome) ? "text-[#F4F1EB]/90 hover:text-[#F4F1EB]" : "text-foreground/80 hover:text-foreground"
                                )}
                            >
                                {link.label}
                                {isActive(link.path) && (
                                    <motion.div
                                        layoutId="activeNavIndicator"
                                        className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-primary"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleLanguage}
                        className={cn(
                            "hidden md:flex items-center gap-2 hover:bg-primary/10",
                            (!scrolled && isHome) ? "text-[#F4F1EB]/90 hover:text-[#F4F1EB]" : "text-foreground/80 hover:text-primary"
                        )}
                    >
                        <Globe className="h-4 w-4" />
                        <span className="font-semibold">{i18n.language.startsWith('en') ? 'EN' : 'ES'}</span>
                    </Button>

                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon" className={cn("relative z-10", (!scrolled && isHome) ? "text-[#F4F1EB]" : "")}>
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] border-l-white/10 bg-background/80 backdrop-blur-xl">
                            <nav className="flex flex-col gap-6 pt-12">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.path}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "text-2xl font-medium transition-colors",
                                                isActive(link.path) ? "text-primary" : "text-foreground/70 hover:text-foreground"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="pt-4 border-t border-border/50"
                                >
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            toggleLanguage();
                                            setIsOpen(false);
                                        }}
                                        className="w-full justify-center gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary"
                                    >
                                        <Globe className="h-4 w-4" />
                                        {i18n.language.startsWith('en') ? 'Switch to Spanish (ES)' : 'Cambiar a Inglés (EN)'}
                                    </Button>
                                </motion.div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Header;