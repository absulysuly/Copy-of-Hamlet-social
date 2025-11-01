import React, { useState, useEffect } from 'react';
import { Language } from '../types.ts';
import { UI_TEXT } from '../translations.ts';
import { MagnifyingGlassIcon } from './icons/Icons.tsx';
import { useDebounce } from 'use-debounce';

interface SearchBarProps {
    onSearch: (query: string) => void;
    language: Language;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, language }) => {
    const texts = UI_TEXT[language];
    const [text, setText] = useState('');
    const [debouncedValue] = useDebounce(text, 500);

    useEffect(() => {
        onSearch(debouncedValue);
    }, [debouncedValue, onSearch]);

    return (
        <div className="w-full my-4 px-4 sm:px-0">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none rtl:left-auto rtl:right-0 rtl:pr-3">
                    <MagnifyingGlassIcon className="w-5 h-5 text-theme-text-muted" />
                </div>
                <input
                    type="search"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={texts.search}
                    className="w-full pl-10 pr-4 py-3 rounded-full search-bar-input focus:outline-none rtl:pl-4 rtl:pr-10"
                    aria-label={texts.search}
                />
            </div>
        </div>
    );
};

export default SearchBar;
