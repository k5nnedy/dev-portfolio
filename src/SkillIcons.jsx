import React from 'react';
import { useSearch } from './Search';

const SkillIcon = ({IconComponent, name}) => {
    
    const { searchTerm } = useSearch();
 
    const term = searchTerm.toLowerCase().trim();
    const matches = !term || name.toLowerCase().includes(term);

    return (
        <div className={`skill-icon-wrapper ${!matches && term ? 'skill-dimmed' : ''}`}>
            <IconComponent className="skill-svg"/>
            <span className="skill-label">{name}</span>
        </div>
    );
};
export default SkillIcon;