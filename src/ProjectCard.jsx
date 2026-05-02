import React from "react";
import TypeEffect from './TypingAnimation';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, tech, description, link}) => {
    return (
        <div className="project-card">
            
            <div className="project-header">
                <span className="prompt">❯</span>

                <motion.div 
                style={{ display: 'inline-block' }}
                initial="hidden"
                whileInView="visible"
                viewport={{amount: 0.4 }}
                >
                    <TypeEffect text={`./show_project --name "${title}"`}/>
                
                    <motion.span variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 }
                    }} className="terminal-cursor" />
                    
                </motion.div>
            </div>
            <div className="project-content">
                <p className="project-desc">{description}</p>
            <div className="tech">
                {tech.map((item, index) => (
                    <span key={index} className="tech-tag">{item}</span>))
                }
            </div>
            <a href={link} target="_blank" rel="noreferrer" className="source-link"> [ view_source ] </a>
            </div>
        </div>
    );
};

export default ProjectCard;