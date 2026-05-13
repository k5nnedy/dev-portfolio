import React, { useState } from 'react';

const CONTROLS = [
    {key: 'j', desc: 'scroll down'},
    {key: 'k', desc: 'scroll up'},
    {key: ':', desc: 'command/search bar'},
    {key: 'i', desc: 'dark mode (INSERT)'},
    {key: 'esc', desc: 'light mode (NORMAL)'},
];

const NAV_COMMANDS = [
    {key: ':about', desc: 'go to about'},
    {key: ':skills', desc: 'go to skills'},
    {key: ':projects', desc: 'go to projects'},
    {key: ':contact', desc: 'go to contact'},
    {key: ':resume', desc: 'open resume'},
    {key: ':wq', desc: '...'},
];

const ControlsPanel = () => {
    const [collapsed, setCollapsed] = useState(false);
    
    return (
    <div className={`controls-panel ${collapsed ? 'controls-collapsed' : ''}`}>
        <div className="controls-header" onClick={() => setCollapsed(!collapsed)}>
            <span className="controls-title">-- CONTROLS --</span>
            <span className="controls-toggle">{collapsed ? '▸' : '▾'}</span>
        </div>
        
        {!collapsed && (
            <>
            <div className="controls-section-label">motion</div>
            <div className="controls-list">
                {CONTROLS.map(({ key, desc }) => (
                    <div key={key} className="controls-row">
                        <kbd className="controls-key">{key}</kbd>
                        <span className="controls-desc">{desc}</span>
                    </div>
                ))}
            </div>
            
            <div className="controls-section-label">commands</div>
            <div className="controls-list">
                {NAV_COMMANDS.map(({ key, desc }) => (
                    <div key={key} className="controls-row">
                        <kbd className="controls-key controls-key-cmd">{key}</kbd>
                        <span className="controls-desc">{desc}</span>
                    </div>
                ))}
            </div>
            </>
        )}
    </div>
    );
};

export default ControlsPanel;