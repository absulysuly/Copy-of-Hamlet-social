

import React from 'react';

interface TopNavBarProps<T extends string> {
    tabs: T[];
    activeTab: T;
    onTabChange: (tab: T) => void;
    isElectionMode: boolean;
}

function TopNavBar<T extends string>({ tabs, activeTab, onTabChange, isElectionMode }: TopNavBarProps<T>) {
    const navBarClasses = isElectionMode
        ? 'border-b border-neutral-gray-medium'
        : 'border-b border-white/20';

    const getTabClasses = (tab: T) => {
        const isActive = activeTab === tab;
        if (isElectionMode) {
            return isActive
                ? 'border-election-green text-election-green'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
        } else {
            return isActive
                ? 'border-brand-hot-pink text-brand-hot-pink glow'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500';
        }
    };

    return (
        <div className={navBarClasses}>
            <nav className="-mb-px flex justify-center space-x-6 px-4 sm:px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`whitespace-nowac py-4 px-1 border-b-2 font-medium text-sm transition-colors font-arabic ${getTabClasses(tab)}`}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default TopNavBar;