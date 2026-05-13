import React from 'react';
import { motion } from 'framer-motion';

const TypeEffect = ({ text }) => {
    const letters = Array.from(text);
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
        }),
    };
    
    const child = {
        visible: {
            opacity: 1,
            display: "inline-block",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
        hidden: {
            opacity: 0,
            display: "none",
        },
    };
    return (
    <motion.h1 className="typewriter-text" variants={container}>
        {letters.map((letter, index) => (
            <motion.span variants={child} key={index}>
                {letter === " " ? "\u00A0" : letter}
            </motion.span> ))
        }
    </motion.h1>
    );
};
export default TypeEffect;