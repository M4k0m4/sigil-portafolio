import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({ text, className = "", el: Wrapper = "p", once = true }) => {
    const textArray = Array.isArray(text) ? text : [text];

    const defaultAnimations = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <Wrapper className={className}>
            <motion.span
                key={textArray.join("")}
                initial="hidden"
                whileInView="visible"
                viewport={{ once, margin: "-50px" }}
                transition={{ staggerChildren: 0.05 }}
                aria-hidden
            >
                {textArray.map((line, lineIndex) => (
                    <span className="block" key={`${line}-${lineIndex}`}>
                        {line.split(" ").map((word, wordIndex) => (
                            <span className="inline-block" key={`${word}-${wordIndex}`}>
                                {word.split("").map((char, charIndex) => (
                                    <motion.span
                                        className="inline-block"
                                        variants={defaultAnimations}
                                        key={`${char}-${charIndex}`}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                                <span className="inline-block">&nbsp;</span>
                            </span>
                        ))}
                    </span>
                ))}
            </motion.span>
            <span className="sr-only">{textArray.join(" ")}</span>
        </Wrapper>
    );
};

export default AnimatedText;