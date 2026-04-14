import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParallaxSection from '../components/ParallaxSection';
import CipherHeroText from '../components/CipherHeroText';
import CircuitBackground from '../components/CircuitBackground';
import AnimatedText from '../components/AnimatedText';
import ProjectCard from '../components/ProjectCard';
import SkillBadge from '../components/SkillBadge';
import bgImage from '../assets/logo Marfil sin fondo.png'; 
import bgVideo from '../assets/Fondo.mp4';
import arcanusImg from '../assets/Logo Arcanus.png';
import bodaImg from '../assets/Invitacion Boda Daniel & Biani.png';
import bodaEjemploImg from '../assets/Invitación Boda Ejemplo 1.png';
import portafolioImg from '../assets/logo Marfil sin fondo.png';

const HomePage = () => {
    const { t } = useTranslation();
    
    // Sample data so the cards look good
    const skills = ["C", "C#", "C++", "CSS3", "HTML5", "Java", "JavaScript", "Python", "Oracle", "Google Cloud", "ANDROID", "UNITY", "Adobe Audition", "Adobe After Effects", "Adobe Illustrator", "Adobe Lightroom", "Adobe Photoshop", "Adobe Premiere Pro"];
    const projects = [
        {
            title: t('portfolio.projects.arcanus.title'),
            description: t('portfolio.projects.arcanus.description'),
            image: arcanusImg,
            technologies: ["HTML5", "CSS3", "JavaScript"],
            link: "https://arcanusv8.netlify.app/"
        },
        {
            title: t('portfolio.projects.boda_daniel.title'),
            description: t('portfolio.projects.boda_daniel.description'),
            image: bodaImg,
            technologies: ["React", "CSS3", "Vite"],
            link: "https://bodadanielybiani2027.netlify.app/"
        },
        {
            title: t('portfolio.projects.boda_ejemplo.title'),
            description: t('portfolio.projects.boda_ejemplo.description'),
            image: bodaEjemploImg,
            technologies: ["React", "Tailwind CSS"],
            link: "https://invitacionbodaejemplo1.netlify.app/"
        },
        {
            title: t('portfolio.projects.portfolio.title'),
            description: t('portfolio.projects.portfolio.description'),
            image: portafolioImg,
            technologies: ["React", "Tailwind CSS", "Framer Motion"],
            link: "/"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#070e0a]">
                    {/* Video Background */}
                    <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                        style={{ filter: 'brightness(0.8)', animationPlayState: 'running' }}
                        ref={(el) => {
                            if (el) {
                                el.playbackRate = 0.5;
                            }
                        }}
                    >
                        <source src={bgVideo} type="video/mp4" />
                    </video>
                    
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-[#070e0a]/60 z-[1]" />
                    
                    {/* Modern Ambient Glowing Orbs */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] md:w-[900px] md:h-[900px] bg-[#1a3a28] rounded-full blur-[120px] md:blur-[180px] opacity-50 pointer-events-none -translate-y-1/3 translate-x-1/3 mix-blend-screen z-[2]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-[#2d5a3d]/40 rounded-full blur-[100px] md:blur-[150px] opacity-40 pointer-events-none translate-y-1/3 -translate-x-1/3 mix-blend-screen z-[2]" />
                    
                    {/* Subtle noise and grid overlays */}
                    <div className="absolute inset-0 opacity-[0.03] z-[3] mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-[4]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

                    {/* Animated Circuit / Data Flow Lines */}
                    <div className="absolute inset-0 z-[5]">
                        <CircuitBackground />
                    </div>

                    <div className="container mx-auto px-4 w-full relative z-10">
                        <CipherHeroText />
                    </div>
                </section>

                {/* Skills Section */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4 text-center">
                        <AnimatedText text={t('about.skills.title', 'Mis Habilidades')} el="h2" className="text-3xl font-bold mb-10" />
                        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                            {skills.map((skill, index) => (
                                <SkillBadge key={index} name={skill} index={index} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects Highlights */}
                <section className="py-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <AnimatedText text={t('portfolio.title')} el="h2" className="text-4xl font-bold mb-4" />
                            <p className="text-muted-foreground max-w-2xl mx-auto">{t('portfolio.subtitle')}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {projects.map((project, index) => (
                                <ProjectCard 
                                    key={index} 
                                    index={index}
                                    title={project.title}
                                    description={project.description}
                                    image={project.image}
                                    technologies={project.technologies}
                                    link={project.link}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;
