import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxSection = ({ children, imageUrl, bgGradient, className = "", overlayOpacity = 0.6, overlayClass }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={ref} className={`relative overflow-hidden ${className}`}>
            {(imageUrl || bgGradient) && (
                <motion.div
                    style={{ y, opacity }}
                    className="absolute inset-0 z-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={bgGradient ? { background: bgGradient } : { backgroundImage: `url(${imageUrl})` }}
                    />
                    <div
                        className={`absolute inset-0 ${overlayClass || "bg-gradient-to-b from-background/20 via-background/60 to-background"}`}
                        style={{ opacity: overlayOpacity }}
                    />
                </motion.div>
            )}
            <div className="relative z-10 h-full">
                {children}
            </div>
        </section>
    );
};

export default ParallaxSection;