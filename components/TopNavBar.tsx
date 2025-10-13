import React from 'react';

interface TopNavBarProps<T extends string> {
    tabs: T[];
    activeTab: T;
    onTabChange: (tab: T) => void;
}

function TopNavBar<T extends string>({ tabs, activeTab, onTabChange }: TopNavBarProps<T>) {
    return (
        <div className="glass-nav sticky top-0 z-40">
            <nav className="-mb-px flex justify-center space-x-6 px-4 sm:px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`
                            relative group whitespace-nowrap py-4 px-3 font-medium text-sm transition-all duration-300 font-arabic
                            ${activeTab === tab
                                ? 'text-glass-primary-200 glass-text'
                                : 'text-glass-neutral-300 hover:text-glass-primary-200 hover:scale-105'}
                        `}
                    >
                        <span className="relative z-10">{tab}</span>

                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-glass-primary-400 to-glass-secondary-400 rounded-full glow-effect"></div>
                        )}

                        <div className={`
                            absolute inset-0 rounded-lg transition-all duration-300
                            ${activeTab === tab
                                ? 'bg-glass-primary-500/10 shadow-lg'
                                : 'group-hover:bg-glass-primary-500/5'}
                        `}></div>
                    </button>
                ))}
            </nav>
        </div>
    );
}

export default TopNavBar;
