import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils.js';

const GlassCard = ({ children, className, hoverEffect = false, ...props }) => {
    return (
        <motion.div
            className={cn(
                "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md dark:border-white/5 dark:bg-black/20",
                "shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]",
                hoverEffect && "transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.1)] dark:hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.4)] hover:bg-white/10 dark:hover:bg-white/5",
                className
            )}
            {...props}
        >
            {/* Subtle gradient overlay for premium feel */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 dark:from-white/5" />
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;