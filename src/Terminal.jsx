import React, { useState } from 'react';

const Terminal = () => {
    
    // Stores the list of commands and their outputs
    const [history, setHistory] = useState([
        { type: 'output', text: 'Type "help" to see available commands.' }
    ]);
  
    //Stores what the user is currently typing
    const [input, setInput] = useState('');

    //track previously entered commands and where we are in them
    const [cmdHistory, setCmdHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
  
    const handleCommand = (e) => {

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (cmdHistory.length === 0) return;
            const newIndex = historyIndex < cmdHistory.length - 1 
                ? historyIndex + 1 
                : historyIndex;
            setHistoryIndex(newIndex);
            setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
            return;
        }
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex <= 0) {
                setHistoryIndex(-1);
                setInput('');
                return;
            }
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
            return;
        }

        if (e.key === 'Enter') {
            const command = input.trim().toLowerCase();

            //Save non-empty commands to history
            if (command) {
                setCmdHistory(prev => [...prev, command]);
            }
            setHistoryIndex(-1);

            //Adds the users command to show as history
            let newHistory = [...history, { type: 'input', text: `guest@kennedy-system ~$ ${command}` }];
            
            switch (command) {

                case 'ls':
                    newHistory.push({
                        type: 'output',
                        text: 'about.txt  ~/projects  resume.pdf  skills.json'
                    })
                break;

                case 'help':
                    newHistory.push({ 
                        type: 'output', 
                        text: `AVAILABLE COMMANDS:\n  whoami      Display current user profile\n  resume      Open resume.pdf in new tab\n  clear       Clear terminal\n  ls          list files\n  cat [filename]   To print contents of a file on your screen (use ls to see files)\n  ` 
                    });
                break;

                case 'cat skills.json':
                    newHistory.push({
                        type: 'output',
                        text: `
                    {
                    "languages": {
                        "primary":   ["Java", "Python", "C"],
                        "learning":  ["Rust", "C++"],
                        "web":       ["JavaScript", "HTML", "CSS"]
                        },
                        s
                    "tools": ["Git", "Docker", "Linux", "Neovim", "VS Code", "Jupyter Notebook"],
                    "libraries": ["React", "PyTorch", "NumPy"],
                    "relevant courses taken": [
                        "Operating Systems",
                        "Data Structures & Algorithms",
                        "Linear Algebra & Multivariable Calculus",
                        "Distributed Systems"
                        ],
                    "interests": ["systems programming", "backend development",
                    "low-level computing", "AI infrastructure"]
                    }`
                    })
                break;

                case 'cat about.txt':
                    newHistory.push({
                        type: 'output',
                        text: "Computer Science & Mathematics student athlete at Pace University.\nOutside of my coursework I spend time playing football for Pace, I have also picked up a recent hobby in chess as well.\nInterested in learning more about low level computing and how it can optimize tech especially as AI grows in demand.\nCurrently learning C & Rust to understand these concepts, and to build my programming fundemental skills.\nOpen to internships and job opportunities."
                    })
                break;

                case 'whoami':
                    newHistory.push({ 
                        type: 'output', 
                        text: "Kennedy Elekwachi | Computer Science & Mathematics | Pace University Dec '27 "
                    });
                break;

                case 'resume':
                    newHistory.push({
                        type: 'output',
                        text: 'Opening resume pdf in a new tab..'
                    });
                    window.open('/resume.pdf', '_blank');
                break;
                case 'cat resume':
                    newHistory.push({
                        type: 'output',
                        text: 'Opening resume pdf in a new tab..'
                    });
                    window.open('/resume.pdf', '_blank');
                break;
                
                case 'ls ~/projects':
                    newHistory.push({
                        type: 'output',
                        text: 'RECENT BUILDS:\n  [1] Java Web Server. (COMPLETE)\n  [2] Neural Network Engine in C. (IN-PROGRESS)\n  [3] Terminal Chatroom (COMPLETE)\n  [4] Neural Network Engine in C (IN-PROGRESS)\n  [5] Music Playlist Sorter (COMPLETE)'
                    });
                break;

                case 'clear':
                    newHistory = []; // Clears terminal
                break;

                case '':
                // Do nothing if they just hit enter on a blank line like on a real terminal.
                // This has the same look as a real terminal
                break;

                default:
                    newHistory.push({ type: 'error', text: `bash: ${command}: command not found` });
                break;
            }
            // Updates the state and clear the input field
            setHistory(newHistory);
            setInput('');
        }
    };
    return (
        <div className="terminal-container">
            <div className="terminal-history">
                {history.map((line, index) => (
                    <div key={index} className={`terminal-line ${line.type}`}>
                        {/* Using CSS white-space. pre-wrap will shpw the \n line breaks */}
                        <span style={{ whiteSpace: 'pre-wrap' }}>{line.text}</span>
                    </div>
                    ))
                }
            </div>
            <div className="terminal-input-row">
                <span className="prompt">guest@k5nnedy-system ~$</span>
                <input
                type="text" 
                style={{ backgroundColor: 'transparent', border: 'none', outline: 'none'}}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="terminal-input"
                />
            </div>
        </div>
    );
};

export default Terminal;