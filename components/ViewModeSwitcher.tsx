import React from 'react';
import { HomeViewMode, Language } from '../types.ts';
import { UI_TEXT } from '../translations.ts';
import { UsersIcon, ChartIcon } from './icons/Icons.tsx';

interface ViewModeSwitcherProps {
    activeMode: HomeViewMode;
    onModeChange: (mode: HomeViewMode) => void;
    language: Language;
}

const ViewModeSwitcher: React.FC<ViewModeSwitcherProps> = ({ activeMode, onModeChange, language }) => {
    const texts = UI_TEXT[language];

    const getButtonClasses = (mode: HomeViewMode) => {
        return activeMode === mode ? 'active' : 'inactive';
    };

    return (
        <div className="glass-card rounded-full p-1 flex items-center space-x-1 view-mode-switcher max-w-md w-full">
            <button 
                onClick={() => onModeChange('Social')} 
                className={`w-1/2 rounded-full py-2 px-4 font-bold flex items-center justify-center space-x-2 ${getButtonClasses('Social')}`}
            >
                <UsersIcon className="w-5 h-5" />
                <span>{texts.social}</span>
            </button>
            <button 
                onClick={() => onModeChange('Election')} 
                className={`w-1/2 rounded-full py-2 px-4 font-bold flex items-center justify-center space-x-2 ${getButtonClasses('Election')}`}
            >
                <ChartIcon className="w-5 h-5" />
                <span>{texts.serious}</span>
            </button>
        </div>
    );
};

export default ViewModeSwitcher;