import React from 'react';
import { motion } from 'framer-motion';
import TypeEffect from './TypingAnimation';
import './header.css';

const Header = ()=> {
    return (
    <header className="header-container">
        <motion.div initial="hidden" animate="visible" transition={{ delay: 1 }}>
            <TypeEffect text="Kennedy Elekwachi" />
        </motion.div>

        <p className="header-subtitle"> software engineer · python · java · c </p>
    </header>
    );
}

export default Header;