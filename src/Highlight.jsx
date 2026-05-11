import React from 'react';

/**
 * Splits `text` on every occurrence of `term` (case-insensitive)
 * and wraps each match in a <mark> with the highlight class.
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