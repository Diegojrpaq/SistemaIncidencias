import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Incidencia } from '@/lib/interfaces';

interface SearchContextType {
    query: string;
    setQuery: (query: string) => void;
    filter: number;
    setFilter: (filter: number) => void;
    statusFilter: number[];
    setStatusFilter: (statusFilter: number[]) => void;
    origenFilter: string[]; // nuevo: para origen
    setOrigenFilter: (origenFilter: string[]) => void;
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
    const [statusFilter, setStatusFilter] = useState<number[]>([]); // ahora es un array
    const [origenFilter, setOrigenFilter] = useState<string[]>([]); // nuevo estado

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
                statusFilter,
                setStatusFilter,
                origenFilter, // nuevo
                setOrigenFilter, // nuevo
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