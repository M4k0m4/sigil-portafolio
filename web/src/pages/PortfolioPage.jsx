import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import arcanusImg from '../assets/Logo Arcanus.png';
import bodaImg from '../assets/Invitacion Boda Daniel & Biani.png';
import bodaEjemploImg from '../assets/Invitación Boda Ejemplo 1.png';
import portafolioImg from '../assets/logo Marfil sin fondo.png';

const PortfolioPage = () => {
    const { t } = useTranslation();

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
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 pt-32 pb-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">{t('portfolio.title')}</h1>
                    <p className="text-lg text-muted-foreground">{t('portfolio.subtitle')}</p>
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
            </main>
            <Footer />
        </div>
    );
};

export default PortfolioPage;
