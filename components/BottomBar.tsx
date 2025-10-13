import React from 'react';
import { AppTab, Language, PlatformMode } from '../types.ts';
import type { IconProps } from './icons/Icons.tsx';

interface BottomNavItem {
    tab: AppTab;
    label: string;
    icon: React.FC<IconProps>;
    enabled?: boolean;
}

interface BottomBarProps {
    items: BottomNavItem[];
    activeTab: AppTab;
    onSelectTab: (tab: AppTab) => void;
    language: Language;
    platformMode: PlatformMode;
}

const BottomBar: React.FC<BottomBarProps> = ({ items, activeTab, onSelectTab, language, platformMode }) => {
    const isRtl = language === 'ar' || language === 'ku';

    const barClasses = 'bg-[var(--color-glass-bg)] backdrop-blur-lg border-t border-[var(--color-glass-border)]';

    const getItemClasses = (tab: AppTab) => {
        const isActive = activeTab === tab;
        return isActive ? 'text-primary' : 'text-theme-text-muted';
    };

    return (
        <div className={`fixed bottom-0 left-0 right-0 z-50 h-16 lg:hidden ${barClasses}`} dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="flex h-full max-w-lg mx-auto font-medium">
                {items
                    .filter(item => item.enabled !== false)
                    .map(item => (
                        <button
                            key={item.tab}
                            onClick={() => onSelectTab(item.tab)}
                            type="button"
                            className={`flex-1 inline-flex flex-col items-center justify-center px-2 group hover:bg-primary/10 ${getItemClasses(item.tab)}`}
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
