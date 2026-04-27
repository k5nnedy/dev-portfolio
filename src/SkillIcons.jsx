import React from 'react';

const SkillIcon = ({IconComponent, name}) => {
    return (
    <div className="skill-icon-wrapper">
        <IconComponent className="skill-svg"/>
        <span className="skill-label">{name}</span>
    </div>
    );
}
export default SkillIcon;