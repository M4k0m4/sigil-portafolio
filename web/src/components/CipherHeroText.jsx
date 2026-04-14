import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CipherHeroText = () => {
    const { t } = useTranslation();

    const textVariants = {
        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
        visible: (custom) => ({
            opacity: 1, 
            y: 0,
            filter: "blur(0px)",
            transition: { delay: custom * 0.15, duration: 1.2, ease: "easeOut" }
        })
    };

    return (
        <div className="w-full flex flex-col items-center justify-center py-20 px-4 bg-transparent select-none min-h-[60vh]">
            <div className="flex flex-col items-center w-full gap-8">
                <div className="text-center font-serif flex flex-col gap-4">
                    <motion.h1 
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="text-[#f5efe0] uppercase text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide opacity-95 drop-shadow-md leading-tight"
                    >
                        {t('home.hero.pre_title')}
                    </motion.h1>
                    
                    <motion.span 
                        custom={4}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="text-[#4a8c6a] text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-[0_0_20px_rgba(74,140,106,0.3)]"
                    >
                        {t('home.hero.title_green')}
                    </motion.span>
                    <motion.span 
                        custom={6}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="text-[#f5efe0] text-2xl md:text-4xl lg:text-5xl font-semibold tracking-wide opacity-90"
                    >
                        {t('home.hero.title_cream')}
                    </motion.span>
                </div>
                
                <motion.div
                    custom={9}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="mt-8"
                >
                    <Link to="/services">
                        <motion.button 
                            whileHover={{ backgroundColor: '#d4a84b', color: '#0d1f16' }}
                            whileTap={{ scale: 0.98 }}
                            className="px-10 py-4 rounded-md bg-transparent border-[1.5px] border-[#d4a84b] text-[#d4a84b] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] transition-all duration-300 text-sm md:text-base"
                        >
                            {t('home.hero.cta_services')}
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            <motion.p 
               custom={12}
               initial="hidden"
               animate="visible"
               variants={textVariants}
               className="mt-16 md:mt-24 text-xl md:text-3xl font-serif font-semibold italic text-[#f4f1eb] transition-colors duration-1000 hover:text-[#d4a84b] drop-shadow-2xl cursor-default"
            >
                {t('home.hero.subtitle')}
            </motion.p>
        </div>
    );
};

export default CipherHeroText;
