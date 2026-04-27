import React from 'react';
import StatusBar from './StatusBar'; 
import './styles.css';
import Header from './Header';
import SkillIcon from './SkillIcons';
import {SiPython, SiC, SiRust, SiDocker, SiNeovim, SiJavascript, SiPhp, SiUbuntu, SiGmail, SiGithub, SiMaildotcom, SiMailgun} from 'react-icons/si';
import {FaJava, FaGitAlt, FaLinkedin} from 'react-icons/fa';
import {motion} from "motion/react";
import { SlSocialLinkedin } from 'react-icons/sl';
import { FaMailchimp } from 'react-icons/fa6';
import { TiSocialLinkedin } from 'react-icons/ti';


function App() {
  return (
    <div className="App">
      {}
      <StatusBar />
      <Header />
      {}
      <main className="content-area">

        <div className="inner-container">
            <section id="about">
                <h2>- About Me</h2>
                <div style={{marginLeft: '20px', borderLeft: '2px solid #313244', paddingLeft: '15px'}}>
                    <p>About me here</p>
                </div>
            </section>
        </div>

        <div className="inner-container">
            <section id="skills">
                <h2>- Skills</h2>
                <div style={{marginLeft: '20px', borderLeft: '2px, solid #313244', paddingLeft: '15px;'}}>
                    <h3>Languages</h3>
                    <div className="icons-grid">
                        <SkillIcon IconComponent={FaJava} name="Java"/>
                        <SkillIcon IconComponent={SiPython} name="Python"/>
                        <SkillIcon IconComponent={SiC} name="C"/>
                        <SkillIcon IconComponent={SiRust} name="Rust"/>
                        <SkillIcon IconComponent={SiJavascript} name="JavaScript"/>
                        <SkillIcon IconComponent={SiPhp} name="PHP"/>
                    </div>
                    <h3>Tools</h3>
                    <div className="icons-grid">
                        <SkillIcon IconComponent={FaGitAlt} name="Git"/>
                        <SkillIcon IconComponent={SiDocker} name="Docker"/>
                        <SkillIcon IconComponent={SiUbuntu} name ="Ubuntu"/>
                        <SkillIcon IconComponent={SiNeovim} name="Neovim"/>
                    </div>
                </div>
            </section>
        </div>
        
        <div className="inner-container">
            <section id="projects">
                <h2>- Projects</h2>
                <div style={{marginLeft: '20px', borderLeft: '2px solid #313244', paddingLeft: '15px'}}>
                    <p>Projects Displayed here</p>
                </div>
            </section>
        </div>
        
        <div className="inner-container">
            <section id="contact">
                <h2>- Contact Me</h2>
                <div style={{marginLeft: '20px', borderLeft: '2px solid #313244', paddingLeft: '15px'}}>
                    <div className="icons-grid">
                        <SkillIcon IconComponent={SiGmail} name="Email"/>
                        <SkillIcon IconComponent={SiGithub} name="Github"/>
                        <SkillIcon IconComponent={FaLinkedin} name="LinkedIn"/>
                    </div>
                    <p>These will be links later</p>
                </div>
            </section>
        </div> 
      </main>
    </div>
  );
}

export default App;

