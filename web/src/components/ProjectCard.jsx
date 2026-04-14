import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import GlassCard from './GlassCard.jsx';

const ProjectCard = ({ image, title, description, technologies, index, link }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

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
        >
            <motion.a
                href={link}
                target={link?.startsWith('/') ? "_self" : "_blank"}
                rel={link?.startsWith('/') ? "" : "noopener noreferrer"}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d", display: "block" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group h-full cursor-pointer"
            >
                <GlassCard className="flex h-full flex-col p-0 transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/10">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <img
                            src={image}
                            alt={title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute bottom-4 right-4 z-20 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                                <ArrowUpRight className="h-5 w-5" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6" style={{ transform: "translateZ(30px)" }}>
                        <h3 className="mb-2 text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                            {title}
                        </h3>
                        <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                            {description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {technologies.map((tech, i) => (
                                <Badge
                                    key={i}
                                    variant="secondary"
                                    className="bg-secondary/50 text-xs font-medium backdrop-blur-sm transition-colors group-hover:bg-secondary"
                                >
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </GlassCard>
            </motion.a>
        </motion.div>
    );
};

export default ProjectCard;