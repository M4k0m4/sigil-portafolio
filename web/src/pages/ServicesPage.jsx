import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MonitorSmartphone, Code, MailPlus, Lightbulb, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HoverCard = ({ icon: Icon, title, desc, cta, link, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{ perspective: 1000 }}
            className="h-full relative"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group h-full relative z-10"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-xl" />
                <div className="relative h-full flex flex-col p-8 rounded-2xl border border-primary/20 bg-background/40 backdrop-blur-xl transition-all duration-500 group-hover:border-primary/50 group-hover:bg-background/60 shadow-lg cursor-pointer">
                    <div style={{ transform: "translateZ(30px)" }}>
                        <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-[0_0_15px_rgba(45,139,111,0)] group-hover:shadow-[0_0_20px_rgba(45,139,111,0.5)]">
                            <Icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-foreground mb-4">{title}</h3>
                        <p className="text-foreground/70 leading-relaxed mb-10 flex-1">{desc}</p>
                    </div>
                    
                    <div className="mt-auto" style={{ transform: "translateZ(20px)" }}>
                        <Link to={link}>
                            <button className="flex items-center gap-3 text-primary font-bold hover:text-[#d4a84b] transition-colors duration-300 w-full group/btn">
                                <span>{cta}</span>
                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                            </button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ServicesPage = () => {
    const { t } = useTranslation();

    const servicesData = [
        {
            icon: MonitorSmartphone,
            title: t("services.items.web.title"),
            desc: t("services.items.web.desc"),
            cta: t("services.items.web.cta"),
            link: "/contact"
        },
        {
            icon: Code,
            title: t("services.items.digital.title"),
            desc: t("services.items.digital.desc"),
            cta: t("services.items.digital.cta"),
            link: "/contact"
        },
        {
            icon: MailPlus,
            title: t("services.items.events.title"),
            desc: t("services.items.events.desc"),
            cta: t("services.items.events.cta"),
            link: "/portfolio"
        },
        {
            icon: Lightbulb,
            title: t("services.items.consulting.title"),
            desc: t("services.items.consulting.desc"),
            cta: t("services.items.consulting.cta"),
            link: "/contact"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#d4a84b]/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />
            
            <Header />
            <main className="flex-1 container mx-auto px-4 pt-32 pb-16 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="text-[#d4a84b] font-serif font-bold tracking-widest uppercase text-sm mb-4 block">{t("services.badge")}</span>
                        <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6 text-primary tracking-tight">{t("services.title")}</h1>
                        <p className="text-xl text-foreground/80 leading-relaxed">
                            {t("services.description")}
                        </p>
                    </motion.div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto align-stretch">
                    {servicesData.map((service, index) => (
                        <HoverCard key={index} {...service} index={index} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ServicesPage;
