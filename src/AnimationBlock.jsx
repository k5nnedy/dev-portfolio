import React from 'react';
import {easeIn, motion} from "motion/react";

const TextAnimation = ({children}) => {
    return (
    <motion.div
    initial ={{ x: -25, opacity=0}}
    whileInView={{x:0, opacity= 1}}
    animate = {{y: 0, opacity=1}}
    transition={{duration=1, ease= 'easeInOut'}}>
        Projects 
        </motion.div>
        );
    };