import React from "react";
import TypeEffect from './TypingAnimation';
import { motion } from 'framer-motion';
import { useSearch } from './Search';
import Highlight from './Highlight';

const ProjectCard = ({ title, tech, description, link}) => {
    const { searchTerm } = useSearch();
 
    // Determine if this card matches the search term
    const term = searchTerm.toLowerCase().trim();
    const matches = !term || (
        title.toLowerCase().includes(term)       ||
        description.toLowerCase().includes(term) ||
        tech.some(t => t.toLowerCase().includes(term))
    );


    return (
        <div className={`project-card ${!matches && term ? 'project-dimmed' : ''}`}>            
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
                    <span key={index} className={`tech-tag ${term && item.toLowerCase().includes(term) ? 'tech-tag-match' : ''}`}>
                        <Highlight text={item} term={searchTerm} />
                    </span> ))}
            </div>
            <a href={link} target="_blank" rel="noreferrer" className="source-link"> [ view_source ] </a>
            </div>
        </div>
    );
};

export default ProjectCard;