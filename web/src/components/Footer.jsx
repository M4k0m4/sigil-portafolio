import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logoVerde from '../assets/logo Verde sin fondo.png';
import logoMarfil from '../assets/logo Marfil sin fondo.png';

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Github, href: 'https://github.com', label: 'GitHub' },
        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' }
    ];

    return (
        <footer className="relative mt-24 overflow-hidden border-t border-border/50 bg-background/50 pb-8 pt-16 backdrop-blur-lg">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-primary/5" />

            <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-3">
                            <img 
                                src={logoVerde} 
                                alt="SIGIL Logo" 
                                className="h-10 w-auto dark:hidden" 
                            />
                            <img 
                                src={logoMarfil} 
                                alt="SIGIL Logo" 
                                className="h-10 w-auto hidden dark:block" 
                            />
                            <span className="text-2xl font-serif font-bold tracking-tight text-foreground">SIGIL</span>
                        </Link>
                        <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                            {t('footer.desc')}
                        </p>
                        <div className="mt-8 flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background/50 text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                                >
                                    <social.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">{t('footer.nav_title')}</h3>
                        <ul className="mt-6 space-y-4">
                            {[
                                { path: '/', label: t('nav.home') },
                                { path: '/portfolio', label: t('nav.portfolio') },
                                { path: '/about', label: t('nav.about') },
                                { path: '/contact', label: t('nav.contact') }
                            ].map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        {item.label}
                                        <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">{t('footer.contact_title')}</h3>
                        <ul className="mt-6 space-y-4">
                            <li>
                                <a
                                    href="mailto:contacto@sigil.com"
                                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                                >
                                    <Mail className="h-4 w-4" />
                                    contact@sigil.com
                                </a>
                            </li>
                            <li className="text-sm text-muted-foreground">
                                El Espinal, Oaxaca<br />
                                México
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} SIGIL. {t('footer.rights')}
                    </p>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <Link to="/privacy" className="transition-colors hover:text-foreground">{t('footer.privacy')}</Link>
                        <Link to="/terms" className="transition-colors hover:text-foreground">{t('footer.terms')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;