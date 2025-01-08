import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

interface SearchContextProps {
    query: string;
    setQuery: (query: string) => void;
    filter: number;
    setFilter: (filter: number) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState<string>("");
    const [filter, setFilter] = useState<number>(-1);
    return (
        <SearchContext.Provider value={{ query, setQuery, filter, setFilter }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if(!context) {
        throw new Error("useSearch debe usarse dentro de un SearchProvider");
    }
    return context;
};