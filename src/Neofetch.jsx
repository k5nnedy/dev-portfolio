import React, { useEffect, useState } from 'react';
import { useSearch } from './Search';
import Highlight from './Highlight';


const ASCII_ART = `
██╗  ██╗███████╗
██║ ██╔╝██╔════╝
█████╔╝ █████╗  
██╔═██╗ ██╔══╝  
██║  ██╗███████╗
╚═╝  ╚═╝╚══════╝`.trim();

const INFO_ROWS = [
    { key: 'user', value: 'k5nnedy student@pace-u' },
    { key: null, value: '─────────────────────────' },
    { key: 'OS', value: 'macOS / Ubuntu 24.04 LTS'},
    { key: 'Shell', value: 'zsh' },
    { key: 'Editor', value: 'vscode, neovim'},
    { key: 'Lang', value: 'Java · Python · C ' },
    { key: 'Tools', value: 'Git · Linux · Docker · React' },
    { key: 'Studying', value: 'CS & Mathematics @ Pace' },
    { key: 'Status', value: 'open to internships' },
    { key: 'Colors', value: null }, // rendered as color swatches
];

const SWATCHES = ['#1e1e2e','#313244','#89b4fa','#a6e3a1','#f9e2af','#cba6f7','#f38ba8','#cdd6f4'];

const Neofetch = () => {
    const [visible, setVisible] = useState(false);
    const { searchTerm } = useSearch();
    const term = searchTerm.toLowerCase().trim();

    
    useEffect(() => {
    // Small delay so the AnimationBlock parent doesn't conflict
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);

    }, []);

    const rowMatches = (row) => {
        if (!term) {
            return false;
        }
        const inKey   = row.key   && row.key.toLowerCase().includes(term);
        const inValue = row.value && row.value.toLowerCase().includes(term);
        return inKey || inValue;
    };

    return (
    <div className={`neofetch ${visible ? 'neofetch-visible' : ''}`}>
        {/* Left column ASCII art */}
        <pre className="neo-ascii">{ASCII_ART}</pre>
        
        {/* Right column system info */}
        
        <div className="neo-info">
            {INFO_ROWS.map((row, i) => {
                if (row.value === null) return null;
                const highlighted = rowMatches(row);
                // Color swatches row
                if (row.key === 'Colors') {
                    return (
                    <div key={i} className="neo-row">
                        <span className="neo-key">Colors</span>
                        <span className="neo-val neo-swatches">
                            {SWATCHES.map((c, j) => (
                                <span
                                key={j}
                                className="neo-swatch"
                                style={{ backgroundColor: c }}
                                title={c}
                                />
                            ))}
                        </span>
                    </div>
                    );
                }
                // Separator row (no key)
                if (!row.key) {
                    return (
                    <div key={i} className="neo-row neo-separator">
                        <span className="neo-val">{row.value}</span>
                    </div>
                    );
                }
                // User header row (styled differently)
                if (row.key === 'user') {
                    return (
                    
                    <div key={i} className={`neo-row neo-user-row ${highlighted ? 'neo-row-match' : ''}`}>
                        <span className="neo-val neo-user">
                            <Highlight text={row.value} term={searchTerm} />
                        </span>
                    </div>
                    );
                }
                return (
                <div key={i} className={`neo-row ${highlighted ? 'neo-row-match' : ''}`}>
                    <span className="neo-key">
                        <Highlight text={row.key} term={searchTerm}/>
                    </span>

                    <span className="neo-colon">:</span>

                    <span className="neo-val">
                        <Highlight text={row.value} term={searchTerm}/>
                    </span>
                </div>
                );
                })}
        </div>
    </div>
    );
};

export default Neofetch;