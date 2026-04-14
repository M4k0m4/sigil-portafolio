import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SkillBadge from '../components/SkillBadge';
import logoVerde from '../assets/logo Verde sin fondo.png';
import logoMarfil from '../assets/logo Marfil sin fondo.png';

const AboutPage = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 pt-32 pb-12">
                <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto mb-20 text-left">
                    <div className="flex-1 space-y-6">
                        <h1 className="text-5xl font-bold font-serif mb-8 text-primary">{t('about.hero.title')}</h1>
                        <p className="text-lg text-foreground/80 leading-relaxed font-medium">{t('about.hero.p1')}</p>
                        <p className="text-xl text-primary font-serif italic my-4">{t('about.hero.p2')}</p>
                        <p className="text-lg text-foreground/80 leading-relaxed">{t('about.hero.p3')}</p>
                        <p className="text-lg text-foreground/80 leading-relaxed">{t('about.hero.p4')}</p>
                        <p className="text-lg text-foreground/80 leading-relaxed font-medium">{t('about.hero.p5')}</p>
                        <p className="text-2xl font-bold font-serif mt-6 tracking-wide">{t('about.hero.p6')}</p>
                    </div>
                    <div className="w-full md:w-1/3 flex justify-center drop-shadow-2xl opacity-90 hover:scale-105 transition-transform duration-500">
                        <img src={logoVerde} alt="Sigil Logo" className="w-[300px] h-auto dark:hidden" />
                        <img src={logoMarfil} alt="Sigil Logo" className="w-[300px] h-auto hidden dark:block" />
                    </div>
                </div>
                
                <section className="py-16 border-t border-border/50">
                    <h2 className="text-3xl font-bold text-center mb-10 font-serif">{t('about.skills.title')}</h2>
                    <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                        {["C", "C#", "C++", "CSS3", "HTML5", "Java", "JavaScript", "Python", "Oracle", "Google Cloud", "ANDROID", "UNITY", "Adobe Audition", "Adobe After Effects", "Adobe Illustrator", "Adobe Lightroom", "Adobe Photoshop", "Adobe Premiere Pro"].map((skill, index) => (
                            <SkillBadge key={index} name={skill} index={index} />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AboutPage;
