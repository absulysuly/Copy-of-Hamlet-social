import React, { useState } from 'react';
import { SearchIcon } from './icons/Icons.tsx';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if (e.target.value === '') {
            onSearch('');
        }
    }

    return (
        <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
                <input
                    type="search"
                    value={query}
                    onChange={handleInputChange}
                    className="search-bar-input w-full p-3 pl-10 rounded-full"
                    placeholder={placeholder}
                />
                <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-text-muted" aria-label="Search">
                    <SearchIcon className="w-5 h-5" />
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
