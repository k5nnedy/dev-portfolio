import React from 'react';
import './styles.css';

const StatusBar = ({theme, onToggle}) => {
  const navItems = [
    { id: '00', label: 'About', link: '#about' },
    { id: '01', label: 'Skills', link: '#skills' },
    { id: '02', label: 'Projects', link: '#projects' },
    { id: '03', label: 'Contact', link: '#contact' },
    { id: '04', label: 'Resume', link: '/resume.pdf'}

  ];

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
          className="nav-link"
          /* if its the resume, open new tab, if not just use self*/
          target={item.id === '04' ? "_blank" : "_self"}
          >
            <span className="dim-text">[</span> 
            {item.id}: {item.label} 
            <span className="dim-text">]</span>
          </a>
        ))
        }
      </div>
      <div className="right-info">
        <span className="dim-text">[unix]</span> 100% 0:1
      </div>
    </nav>
  );
};

export default StatusBar;