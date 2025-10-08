import React from 'react';
import { AppTab, User, Language } from '../types.ts';
import { HomeIcon, DebateIcon, MapIcon, UsersIcon } from './icons/Icons.tsx';
import { UI_TEXT } from '../translations.ts';

interface BottomBarProps {
    user: User | null;
    activeTab: AppTab;
    onNavigate: (tab: AppTab) => void;
    language: Language;
    isElectionMode: boolean;
}

const BottomBar: React.FC<BottomBarProps> = ({ user, activeTab, onNavigate, language, isElectionMode }) => {
    const texts = UI_TEXT[language];

    const navItems = [
        { label: texts.appName, icon: HomeIcon, tab: AppTab.Home, enabled: true },
        { label: AppTab.Debates, icon: DebateIcon, tab: AppTab.Debates, enabled: true },
        { label: AppTab.AskNeighbor, icon: MapIcon, tab: AppTab.AskNeighbor, enabled: true },
        { label: AppTab.UserProfile, icon: UsersIcon, tab: AppTab.UserProfile, enabled: user != null },
    ];
    
    const barClasses = isElectionMode
        ? 'bg-election-card-bg border-t border-neutral-gray-medium'
        : 'bg-black/20 backdrop-blur-lg border-t border-white/20';

    const getItemClasses = (tab: AppTab) => {
        const isActive = activeTab === tab;
        if (isElectionMode) {
            return isActive ? 'text-election-green' : 'text-gray-500';
        } else {
            return isActive ? 'text-brand-hot-pink' : 'text-slate-400';
        }
    };

    // Determine the number of visible items for grid layout
    const visibleItemCount = navItems.filter(item => item.enabled).length;
    
    return (
        <div className={`fixed bottom-0 left-0 right-0 z-50 h-16 lg:hidden ${barClasses}`}>
            <div className={`grid h-full max-w-lg mx-auto font-medium grid-cols-${visibleItemCount}`}>
                {navItems.map(item => item.enabled && (
                    <button
                        key={item.tab}
                        onClick={() => onNavigate(item.tab)}
                        type="button"
                        className={`inline-flex flex-col items-center justify-center px-2 group ${isElectionMode ? 'hover:bg-neutral-gray-light' : 'hover:bg-white/10'} ${getItemClasses(item.tab)}`}
                    >
                        <item.icon className="w-6 h-6 mb-1" />
                        <span className="text-xs font-arabic">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BottomBar;