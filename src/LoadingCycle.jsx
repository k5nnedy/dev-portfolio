import React, { useState, useEffect } from 'react';

const BOOT_LINES = [
    {text: 'kennedy-os v1.0.0 — initializing...', delay: 0, color: 'boot-white' },
    {text: '[  OK  ] started kernel.service', delay: 300,  color: 'boot-ok' },
    {text: '[  OK  ] mounting projects.db', delay: 600,  color: 'boot-ok' },
    {text: '[  OK  ] loading skill-icons', delay: 900,  color: 'boot-ok' },
    {text: '[  OK  ] started portfolio.service', delay: 1200, color: 'boot-ok' },
    {text: '[ WARN ] coffee levels critical', delay: 1500, color: 'boot-warn' },
    {text: '[  OK  ] proceeding anyway', delay: 1700, color: 'boot-ok' },
    {text: '', delay: 2000, color: '' },
    {text: 'welcome, guest. press any key to skip...', delay: 2400, color: 'boot-dim' },
];

const LoadingCycle = ({ onComplete }) => {
    const [visibleCount, setVisibleCount] = useState(0);
    const [fading, setFading] = useState(false);
    
    const finish = () => {
        sessionStorage.setItem('booted', 'true');
        setFading(true);
        setTimeout(onComplete, 600);
    };

    // Shows the lines one by one
    useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
        setTimeout(() => 
            setVisibleCount(i + 1), line.delay));
    // Boots up after all lines + small pause
    const autoFinish = setTimeout(finish, 3200);

    return () => { timers.forEach(clearTimeout); clearTimeout(autoFinish); };

    }, []);

  // Any key can skip the sequence
  useEffect(() => {
    const skip = () => finish();
    window.addEventListener('keydown', skip, { once: true });

    return () => window.removeEventListener('keydown', skip);
    }, []);

  return (
    <div className={`boot-screen ${fading ? 'boot-fade-out' : ''}`}>
      <div className="boot-content">
        {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
          <div key={i} className={`boot-line ${line.color}`}>
            {line.text}
          </div>
        ))}
        {/* Blinking cursor after last visible line */}
        {visibleCount > 0 && visibleCount <= BOOT_LINES.length && (
          <span className="boot-cursor">█</span>
        )}
      </div>
    </div>
  );
};

export default LoadingCycle;