import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';

const COMMANDS = {
    about: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }),
    skills: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }),
    projects: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }),
    contact: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
    help: () => 'AVAILABLE COMMANDS: :about  :skills  :projects  :contact  :resume  :wq',
    resume:   () => window.open('/resume.pdf', '_blank'),
    wq: () => 'nice try — you cannot quit your browser from here!',
    q: () => 'nice try — you cannot quit your browser from here!',
    'q!': () => 'nice try — you cannot quit your browser from here!',
};

const VimCommandPalette = ({ onShake }) => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const inputRef = useRef(null);

  // Open palette when user presses `:` outside of any input/textarea
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')
                 return;

            if (e.key === ':') {
                e.preventDefault();
                flushSync(() => {
                    setOpen(true);
                    setInput('');
                    setMessage('');
                    setError(false);
                });
                inputRef.current?.focus();
            }
            if (e.key === 'Escape') {
                setOpen(false);
                setInput('');
                setMessage('');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
    
    const runCommand = (raw) => {
        const cmd = raw.trim().toLowerCase();
        
        if (!cmd) { setOpen(false); return; }

        const fn = COMMANDS[cmd];
        
        if (!fn) {
            setError(true);
            setMessage(`Error: Not an editor command: ${cmd}`);
            return;
        }
        
        const result = fn();
        
        if (typeof result === 'string') {
            setError(false);
            setMessage(result);
        } else {
        // Navigation commands — close after a tick
            setTimeout(() => { setOpen(false); setInput(''); setMessage(''); }, 100);
        }
    };
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            runCommand(input);
        } else if (e.key === 'Escape') {
            setOpen(false);
            setInput('');
            setMessage('');
        }
    };
    
    if (!open) return null;
    
    return (
    <div className="vcp-overlay" onClick={() => { setOpen(false); setMessage(''); }}>
        <div className="vcp-bar" onClick={(e) => e.stopPropagation()}>
            {message ? (
                <div className={`vcp-message ${error ? 'vcp-error' : 'vcp-info'}`}>
                    {message}
                </div>
                ) : (
                
                <div className="vcp-input-row">
                    <span className="vcp-colon">:</span>
                    <input
                    ref={inputRef}
                    className="vcp-input"
                    value={input}
                    onChange={(e) => { setInput(e.target.value); setError(false); setMessage(''); }}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    autoComplete="off"
                    />
                </div>
            )}
            
            <div className="vcp-hint">
                {error ? <span onClick={() => setMessage('')} style={{ cursor: 'pointer' }}>type : to continue</span>
                : 'enter command · esc to close · try :help'}
            </div>
        </div>
    </div>
  );
};

export default VimCommandPalette;