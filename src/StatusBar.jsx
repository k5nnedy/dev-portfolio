import React, {useRef, useState, useEffect } from 'react';
import { useSearch } from './Search';
import './styles.css';

const StatusBar = ({theme, onToggle, activeSection, scrollPct}) => {
    const { searchTerm, setSearchTerm, clearSearch } = useSearch();
    const searchRef = useRef(null);

    const navItems = [
        { id: '00', label: 'About',    link: '#about',    sectionId: 'about' },
        { id: '01', label: 'Skills',   link: '#skills',   sectionId: 'skills' },
        { id: '02', label: 'Projects', link: '#projects', sectionId: 'projects' },
        { id: '03', label: 'Contact',  link: '#contact',  sectionId: 'contact' },
        { id: '04', label: 'Resume',   link: '/resume.pdf' },
    ];
    
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')
                return;
            if ((e.ctrlKey && e.key === 'f') || e.key === '/') {
                e.preventDefault();
                searchRef.current?.focus();
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
    
    const handleSearchKeyDown = (e) => {
        if (e.key === 'Escape') {
            clearSearch();
            searchRef.current?.blur();
        }
    };




  return (
    <nav className="status-bar">
        <div className={`mode-indicator ${theme === 'dark' ? 'insert-mode' : 'normal-mode'}`}
        onClick={onToggle}
        style={{ cursor: 'pointer' }}
        >
            {theme === 'light' ? 'NORMAL' : 'INSERT'}
        </div>

    <div className="nav-container">
        {navItems.map((item) => (
        <a key={item.id}
          href={item.link} 
          className={`nav-link ${activeSection === item.sectionId ? 'nav-active' : ''}`}
          /* if its the resume, open new tab, if not just use self*/
          target={item.id === '04' ? "_blank" : "_self"}
          >
            <span className="dim-text">[</span> 
            {item.id}: {item.label} 
            <span className="dim-text">]</span>
        </a>
        ))}
      </div>
        {/* Search bar */}
        <div className={`search-wrapper ${searchTerm ? 'search-active' : ''}`}>
            <span className="search-icon">⌕</span>
                <input
                ref={searchRef}
                type="text"
                className="search-input"
                placeholder="search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                spellCheck={false}
                autoComplete="off"
                />
                {searchTerm && (
                    <button className="search-clear" onClick={clearSearch} title="Clear (Esc)">
                        ×
                    </button>
                )}
        </div>

      <div className="right-info">
        <span className="dim-text">[unix]</span> {scrollPct}% 0:1
      </div>
    </nav>
  );
};

export default StatusBar;