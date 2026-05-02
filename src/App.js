import React, { useState, useEffect } from 'react';
import StatusBar from './StatusBar'; 
import './styles.css';
import Header from './Header';
import SkillIcon from './SkillIcons';
import {SiPython, SiC, SiRust, SiDocker, SiNeovim, SiJavascript, SiPhp, SiUbuntu, SiGmail, SiGithub, SiMaildotcom, SiMailgun} from 'react-icons/si';
import {FaJava, FaGitAlt, FaLinkedin, FaReact} from 'react-icons/fa';
import {motion} from "motion/react";
import AnimationBlock from "./AnimationBlock";
import { SlSocialLinkedin } from 'react-icons/sl';
import { FaMailchimp } from 'react-icons/fa6';
import { TiSocialLinkedin } from 'react-icons/ti';
import ProjectCard from './ProjectCard';
import TypeEffect from './TypingAnimation';


function App() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

  return (
    <div className="App">
        <StatusBar theme={theme} onToggle={toggleTheme} />
        <Header/>
      
      <main className="content-area">
        <AnimationBlock>
            <div className="inner-container">
            <section id="about">
                <h2>- About Me</h2>
                <div className="indent-block">
                    <div className="about-text">
                    <p> Hello, I am a current student at Pace University studying Computer Science and Mathematics.
                    </p>

                    <p> I believe that to truly understand a technology, you have to build it yourself.
                        I am driven to understand the layers under abstraction and diving deep into the fundamentals of computing.
                    </p>

                    <p> While my foundation is in Java & Python, I have been pivoting my time in learning C, and Rust.
                        This shift was because of many factors. I wanted to understand how computers operate under the hood, and to challenge myself with lower level languages.
                        Another reason is that I believe that as applications & AI grow (and RAM gets more expensive), more people will be needed to build their hardware backends and engines that power & optimize them. 
                        These languages show me why performance truly matters, especially as tech scales. 
                        Most of my projects consists of me building things from the ground up. 
                        Whether it be programming real-time terminal applications or multithreaded servers, I do this to truly grasp how data moves through a system.
                    </p>

                    </div>                
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
                        <SkillIcon IconComponent={SiJavascript} name="JavaScript"/>
                    </div>
                    <h3>Tools/Libraries</h3>
                    <div className="icons-grid">
                        <SkillIcon IconComponent={FaGitAlt} name="Git"/>
                        <SkillIcon IconComponent={SiDocker} name="Docker"/>
                        <SkillIcon IconComponent={SiUbuntu} name ="Ubuntu"/>
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
    </div>
  );
}

export default App;