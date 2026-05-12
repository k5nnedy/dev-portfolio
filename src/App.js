import React, { useState, useEffect } from 'react';
import {motion} from "motion/react";

import StatusBar from './StatusBar'; 
import ProjectCard from './ProjectCard';
import TypeEffect from './TypingAnimation';
import Terminal from './Terminal';
import VimCommandPalette from './VimCommandPalette';
import LoadingCycle from './LoadingCycle';
import Neofetch from './Neofetch';
import ControlsPanel from './ControlsPanel';
import Header from './Header';
import AnimationBlock from "./AnimationBlock";
import SkillIcon from './SkillIcons';
import { SearchProvider } from './Search';
import GitHubRepos from './GithubRepos';



import './styles.css';
import './controls-panel.css';
import './newstyles.css';
import './search.css';
import './Githubrepos.css';


import {SiPython, SiC, SiRust, SiDocker, SiNeovim, SiJavascript, SiPhp, SiUbuntu, SiGmail, SiGithub, SiMaildotcom, SiMailgun, SiPytorch, SiNumpy, SiCplusplus} from 'react-icons/si';
import {FaJava, FaGitAlt, FaLinkedin, FaReact} from 'react-icons/fa';




function App() {

    const alreadyBooted = sessionStorage.getItem('booted') === 'true';
    const [booting, setBooting] = useState(!alreadyBooted);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    useEffect (() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            switch (e.key) {
                case 'j':
                    window.scrollBy({ top: 150, behavior: 'smooth' });
                    break;
                case 'k':
                    window.scrollBy({ top: -150, behavior: 'smooth' });
                    break;
                case 'i':
                    setTheme('dark');
                    break;
                case 'Escape':
                    setTheme('light');
                    break;
                    default:
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => { window.removeEventListener('keydown', handleKeyDown);
        };

    }, []);

    //Highlighting navbar when scrolling
    const [activeSection, setActiveSection] = useState('about');

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { threshold: 0.5 } );
        
        const sections = document.querySelectorAll('section[id]');
        sections.forEach((s) => observer.observe(s));

        return () => observer.disconnect();

    }, []);

    const [scrollPct, setScrollPct] = useState(0);
    
    useEffect(() => {
        const handleScroll = () => {
        const scrolled = window.scrollY;
        const total = document.body.scrollHeight - window.innerHeight;
        const pct = total > 0 ? Math.round((scrolled / total) * 100) : 0;
        setScrollPct(pct);
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

    }, []);



  return (
    <SearchProvider>
        <div className="App">
            
            {booting && <LoadingCycle onComplete={() => setBooting(false)} />}
            <StatusBar theme={theme} onToggle={toggleTheme} activeSection={activeSection} scrollPct={scrollPct} />
            <Header/>
            
            <main className="content-area">
                <AnimationBlock>
                    <div className="inner-container">
                        <section id="about">
                            <h2>- About Me</h2>
                            <div className="indent-block">
                                <Neofetch />
                                <AnimationBlock>
                                    <Terminal/>
                                </AnimationBlock>        
                            </div>
                        </section>
                        
                    </div>
                    
                </AnimationBlock>
            
                <AnimationBlock>
                    <div className="inner-container">
                    <section id="skills">
                        <h2>- Skills</h2>
                        <div className="indent-block">
                            <h3>Languages</h3>
                            <div className="icons-grid">
                                <SkillIcon IconComponent={FaJava} name="Java"/>
                                <SkillIcon IconComponent={SiPython} name="Python"/>
                                <SkillIcon IconComponent={SiC} name="C"/>
                                <SkillIcon IconComponent={SiRust} name="Rust"/>
                                <SkillIcon IconComponent={SiCplusplus}name ="C++"/>
                                <SkillIcon IconComponent={SiJavascript} name="JavaScript"/>
                            </div>
                            <h3>Tools/Libraries</h3>
                            <div className="icons-grid">
                                <SkillIcon IconComponent={FaGitAlt} name="Git"/>
                                <SkillIcon IconComponent={SiDocker} name="Docker"/>
                                <SkillIcon IconComponent={SiUbuntu} name ="Ubuntu"/>
                                <SkillIcon IconComponent={SiPytorch} name="PyTorch"/>
                                <SkillIcon IconComponent={SiNumpy} name = "NumPy"/>
                                <SkillIcon IconComponent={FaReact} name="React"/>
                                <SkillIcon IconComponent={SiNeovim} name="Neovim"/>
                            </div>
                        </div>
                    </section>
                    </div>
                </AnimationBlock>
            
                <AnimationBlock>
                    <div className="inner-container">
                    <section id="projects">
                        <h2>- Projects</h2>
                        <div className="indent-block">

                            <ProjectCard
                            title="Java Web Server"
                            tech={["Java", "ServerSockets", "Concurrency"]}
                            description="Implemented a simple HTTP Server from scratch to learn more about networking and understand web servers on a deeper level."
                            link="https://github.com/k5nnedy/web-server"
                            />

                            <ProjectCard
                            title="Multi-Threaded Chatroom"
                            tech={["Java", "Sockets", "Concurrency"]}
                            description="A real-time terminal chat application built from scratch to understand how data moves through a system using TCP/IP and multi-threaded server architecture."
                            link="https://github.com/k5nnedy/terminal-group-chat"
                            />

                            <ProjectCard
                            title="Music Playlist Analyzer"
                            tech={["Java", "OpenCSV", "JUnit"]} 
                            description=" Sorting Algorithm analysis framework for DSA course. This project serves as a tool to visualize how different algorithms scale with large data and to practice writing object-oriented Java code for algorithmic problem-solving. "
                            link="https://github.com/k5nnedy/CS241TermProject"
                            />
                            <GitHubRepos username="k5nnedy" />
                            
                            
                        </div>
                    </section>
                    </div>
                </AnimationBlock>
            
                <AnimationBlock>
                    <div className="inner-container">
                    <section id="contact">
                        <h2>- Contact Me</h2>
                            <div className="icons-grid">
                                <a href="mailto:kennedyelekwachi123@gmail.com" className="contact-link">
                                <SkillIcon IconComponent={SiGmail} name="Email"/>
                                </a>
                                <a href="https://github.com/k5nnedy" target="_blank" rel="noreferrer" className="contact-link">
                                <SkillIcon IconComponent={SiGithub} name="Github"/>
                                </a>
                                <a href="https://www.linkedin.com/in/kennedy-elekwachi-700235293/" target="_blank" rel="noreferrer" className="contact-link" >
                                <SkillIcon IconComponent={FaLinkedin} name="LinkedIn"/>
                                </a>
                            </div>
                    </section>
                    </div>
                </AnimationBlock>
            </main>
            <ControlsPanel />
            <VimCommandPalette />
        </div>
    </SearchProvider>
   
  );
}

export default App;