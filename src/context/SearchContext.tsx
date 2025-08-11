import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Incidencia } from '@/lib/interfaces';

interface SearchContextType {
    query: string;
    setQuery: (query: string) => void;
    filter: number;
    setFilter: (filter: number) => void;
    // Estados para la búsqueda API (navbar)
    searchResults: Incidencia[];
    setSearchResults: (results: Incidencia[]) => void;
    isSearching: boolean;
    setIsSearching: (searching: boolean) => void;
    hasSearched: boolean;
    setHasSearched: (searched: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [query, setQuery] = useState<string>('');
    const [filter, setFilter] = useState<number>(-1);

    // Estados para la búsqueda API
    const [searchResults, setSearchResults] = useState<Incidencia[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    return (
        <SearchContext.Provider
            value={{
                query,
                setQuery,
                filter,
                setFilter,
                searchResults,
                setSearchResults,
                isSearching,
                setIsSearching,
                hasSearched,
                setHasSearched,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = (): SearchContextType => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};