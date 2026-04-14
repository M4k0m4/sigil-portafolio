import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
    // Numeros locales normalmente requieren código de país. Tehuantepec, MX es +52.
    const phoneNumber = "529711160989";
    const waLink = `https://wa.me/${phoneNumber}?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20SIGIL.`;

    return (
        <a 
            href={waLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-0 group"
            style={{ WebkitTapHighlightColor: 'transparent' }}
        >
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_15px_rgba(37,211,102,0.4)] flex items-center justify-center group-hover:shadow-[0_8px_30px_rgba(37,211,102,0.8)] transition-all duration-300"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md">
                        <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.761.458 3.473 1.332 5l-1.4 5.12 5.234-1.374a10.024 10.024 0 0 0 4.865 1.254h.004c5.536 0 10.031-4.495 10.031-10.031S17.567 2 12.031 2m5.457 14.542c-.227.64-1.312 1.229-1.8 1.282-.44.047-.999.123-3.155-.719-2.585-1.01-4.225-3.654-4.354-3.826-.129-.172-1.04-1.386-1.04-2.646s.664-1.884.898-2.128c.234-.244.509-.305.676-.305.172 0 .34.004.492.011.164.008.384-.062.599.458.227.548.742 1.83.805 1.956.062.125.105.27.02.441-.082.164-.125.267-.253.414-.125.148-.266.326-.379.453-.125.137-.26.287-.113.541.146.254.646 1.07 1.386 1.733.955.856 1.758 1.119 2.011 1.242.253.123.402.102.553-.066.152-.168.654-.761.83-1.021.176-.26.352-.217.58-.13.232.086 1.459.689 1.708.814.25.125.416.187.477.293.06.105.06.607-.167 1.247" />
                    </svg>
            </motion.div>
        </a>
    );
};

export default WhatsAppButton;
