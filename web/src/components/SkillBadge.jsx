import React from 'react';
import { motion } from 'framer-motion';

const SkillBadge = ({ icon: Icon, name, index = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -2, scale: 1.05 }}
            className="group flex items-center gap-2 rounded-xl border border-border/50 bg-background/50 px-4 py-2.5 text-sm font-medium shadow-sm backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
        >
            {Icon && <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />}
            <span>{name}</span>
        </motion.div>
    );
};

export default SkillBadge;