import React, { useState } from 'react';
// Fix: added .ts extension to types import
import { User, Governorate, GOVERNORATES, GOVERNORATE_AR_MAP, AppTab, Language, HomeViewMode } from '../types.ts';
// Fix: added .tsx extension to Icons import
import { SearchIcon, EditIcon, ChevronDownIcon, UsersIcon } from './icons/Icons.tsx';
import { UI_TEXT } from '../translations.ts';
import LanguageSwitcher from './LanguageSwitcher.tsx';

interface HeaderProps {
    user: User | null;
    onCompose: () => void;
    onRequestLogin: () => void;
    selectedGovernorate: Governorate | 'All';
    onGovernorateChange: (gov: Governorate | 'All') => void;
    parties: string[];
    selectedParty: string | 'All';
    onPartyChange: (party: string | 'All') => void;
    onNavigate: (tab: AppTab) => void;
    language: Language;
    onLanguageChange: (lang: Language) => void;
    homeViewMode: HomeViewMode;
    onModeChange: (mode: HomeViewMode) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onCompose, onRequestLogin, selectedGovernorate, onGovernorateChange, parties, selectedParty, onPartyChange, onNavigate, language, onLanguageChange, homeViewMode, onModeChange }) => {
    const texts = UI_TEXT[language];

    const isElectionMode = homeViewMode === 'Election';
    const headerClasses = isElectionMode
        ? 'formal-header text-white'
        : 'glass-nav';
    const textColor = isElectionMode ? 'text-white' : 'text-white';
    const placeholderColor = isElectionMode ? 'placeholder-slate-200' : 'placeholder-slate-400';
    const inputBg = isElectionMode ? 'bg-black/20' : 'bg-white/10';

    const getModeTabClasses = (mode: HomeViewMode) => {
        const isActive = homeViewMode === mode;
        if (isActive) {
            return isElectionMode 
                ? 'bg-white text-formal-primary-700' 
                : 'border-brand-hot-pink text-brand-hot-pink glow';
        } else {
            return isElectionMode 
                ? 'text-white hover:bg-white/20' 
                : 'border-transparent text-slate-300 hover:text-white hover:border-slate-400';
        }
    };


    return (
        <header className={`fixed top-0 left-0 right-0 z-40 h-40 flex flex-col px-4 sm:px-6 ${headerClasses}`}>
            {/* Top Bar: Logo, Search, Actions */}
            <div className="flex items-center space-x-4 w-full h-16">
                <div className="flex items-center justify-start lg:w-64">
                    <button onClick={() => onModeChange('Social')} className={`text-xl font-bold font-arabic ${textColor}`}>
                        {texts.appName}
                    </button>
                </div>

                <div className="flex-1 flex justify-center">
                    <div className="w-full max-w-lg">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className={`w-5 h-5 ${isElectionMode ? 'text-slate-200' : 'text-slate-400'}`} />
                            </div>
                            <input
                                type="text"
                                placeholder="ابحث عن مرشحين أو مواضيع"
                                className={`block w-full pl-10 pr-3 py-2 border rounded-full text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-hot-pink font-arabic ${isElectionMode ? 'border-white/50' : 'border-white/20'} ${inputBg} ${placeholderColor}`}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2 lg:space-x-4 lg:w-auto justify-end flex-shrink-0">
                    <button 
                        onClick={onCompose}
                        className="hidden lg:flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-white bg-brand-hot-pink rounded-full transition-all hover:brightness-110"
                    >
                        <EditIcon className="w-4 h-4" />
                        <span className="font-arabic">انشر</span>
                    </button>
                    {user ? (
                         <button onClick={() => onNavigate(AppTab.UserProfile)} aria-label="View your profile">
                            <img className="w-9 h-9 rounded-full ring-2 ring-white/50" src={user.avatarUrl} alt={user.name} />
                         </button>
                    ) : (
                        <button onClick={onRequestLogin} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                            <UsersIcon className="w-5 h-5 text-slate-300" />
                        </button>
                    )}
                </div>
            </div>
             {/* Middle Bar: Language Switcher */}
            <div className="h-12 flex items-center justify-start border-t border-white/10">
                <LanguageSwitcher 
                    language={language} 
                    onLanguageChange={onLanguageChange} 
                    isElectionMode={isElectionMode}
                />
            </div>
            {/* Bottom Bar: Main Navigation */}
            <nav className="h-12 flex items-center justify-center border-t border-white/10">
                 <div className="flex space-x-4">
                    <button
                        onClick={() => onModeChange('Social')}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors duration-200 border-b-2 font-arabic ${getModeTabClasses('Social')}`}
                    >
                        {texts.social}
                    </button>
                    <button
                        onClick={() => onModeChange('Election')}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors duration-200 border-b-2 font-arabic ${getModeTabClasses('Election')}`}
                    >
                        {texts.serious}
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;