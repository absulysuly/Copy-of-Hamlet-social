import React from 'react';

interface TopNavBarProps<T extends string> {
    tabs: T[];
    activeTab: T;
    onTabChange: (tab: T) => void;
}

function TopNavBar<T extends string>({ tabs, activeTab, onTabChange }: TopNavBarProps<T>) {
    const navBarClasses = 'border-b border-[var(--color-glass-border)]';

    const getTabClasses = (tab: T) => {
        const isActive = activeTab === tab;
        return isActive
            ? 'border-primary text-primary glow'
            : 'border-transparent text-theme-text-muted hover:text-theme-text-base hover:border-theme-text-muted';
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