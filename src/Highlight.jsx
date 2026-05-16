import React from 'react';

/**
 * Used for search feature
 * Splits `text` on every occurrence of `term`
 * wraps each match with the highlight class.
 * Returns plain text if term is empty.
 */
const Highlight = ({ text, term }) => {
    if (!term || !term.trim()) return <>{text}</>;

    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex   = new RegExp(`(${escaped})`, 'gi');
    const parts   = String(text).split(regex);

    return (
        <>
            {parts.map((part, i) =>
                regex.test(part)
                    ? <mark key={i} className="search-highlight">{part}</mark>
                    : part
            )}
        </>
    );
};

export default Highlight;