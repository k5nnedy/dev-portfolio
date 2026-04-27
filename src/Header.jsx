import React from 'react';
import './header.css';

const Header = ()=> {
    return (
    <header className="header-container">
        <h1 className="header-name"> Kennedy Elekwachi 
            <span className="cursor">█</span>
        </h1>
        <p className="header-subtitle"> software engineer · python · java · c </p>
    </header>
    );
}

export default Header;