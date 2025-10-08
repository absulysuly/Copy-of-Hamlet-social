import React from 'react';
import { AppTab, User, Language } from '../types.ts';
import { TeaHouseIcon, UsersIcon } from './icons/Icons.tsx';
import { UI_TEXT } from '../translations.ts';

interface BottomBarProps {
    user: User | null;
    activeTab: AppTab;
    onNavigate: (tab: AppTab) => void;
    language: Language;
}

const BottomBar: React.FC<BottomBarProps> = ({ user, activeTab, onNavigate, language }) => {
    const texts = UI_TEXT[language];

    const navItems = [
        { label: texts.teaHouse, icon: TeaHouseIcon, tab: AppTab.TeaHouse, enabled: true },
        { label: AppTab.UserProfile, icon: UsersIcon, tab: AppTab.UserProfile, enabled: user != null },
    ];
    
    const barClasses = 'bg-[var(--color-glass-bg)] backdrop-blur-lg border-t border-[var(--color-glass-border)]';

    const getItemClasses = (tab: AppTab) => {
        const isActive = activeTab === tab;
        return isActive ? 'text-primary' : 'text-theme-text-muted';
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
                        className={`inline-flex flex-col items-center justify-center px-2 group hover:bg-primary/10 ${getItemClasses(item.tab)}`}
                    >
                        <item.icon className="w-6 h-6 mb-1" />
                        <span className="text-[10px] leading-tight text-center font-arabic">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BottomBar;