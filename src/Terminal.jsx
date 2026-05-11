import { color } from 'framer-motion';
import React, { useState } from 'react';

const Terminal = () => {
    
    // Stores the list of commands and their outputs
    const [history, setHistory] = useState([
        { type: 'output', text: 'Type "help" to see available commands.' }
    ]);
  
    // Stores what the user is currently typing
    const [input, setInput] = useState('');
  
    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const command = input.trim().toLowerCase();
            // Adds the users command to show as history
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
                        text: `AVAILABLE COMMANDS:\n  whoami      Display current user profile\n  resume      Open resume.pdf in new tab\n  clear       Clear terminal\n  ls          list files\n  cat [filename]       To print contents of a file on your screen (use ls to see files)\n  ` 
                    });
                break;

                case 'cat about.txt':
                    newHistory.push({
                        type: 'output',
                        text: "Computer Science & Mathematics student athlete at Pace University.\nInterested in learning more about low level computing and how it can optimize tools in the world of AI.\nCurrently learning C & Rust to understand the layers under abstraction, and to build my programming fundemental skills.\nOpen to internships."
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
                
                case 'ls ~/projects':
                    newHistory.push({
                        type: 'output',
                        text: 'RECENT BUILDS:\n  [1] Java Web Server. (COMPLETE)\n  [2] C++ Vector Implementation in C. (IN-PROGRESS)\n  [3] Terminal Chatroom (COMPLETE)\n  [4] Music Playlist Sorter (COMPLETE)'
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