import { createContext, useContext, useState, useCallback } from 'react';

const SearchContext = createContext({ searchTerm: '', setSearchTerm: () => {} });

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const clearSearch = useCallback(() => setSearchTerm(''), []);

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm, clearSearch }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);