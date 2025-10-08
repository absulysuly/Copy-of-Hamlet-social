import React from 'react';
import { AppTab, UserRole, User } from '../types.ts';
import { DashboardIcon, SettingsIcon, DebateIcon, TeaHouseIcon, UsersIcon } from './icons/Icons.tsx';

interface SidebarProps {
    user: User | null;
    activeTab: AppTab;
    onNavigate: (tab: AppTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, activeTab, onNavigate }) => {
    const navItems = [
        { label: AppTab.UserProfile, icon: UsersIcon, tab: AppTab.UserProfile, enabled: user != null },
        { label: AppTab.TeaHouse, icon: TeaHouseIcon, tab: AppTab.TeaHouse, enabled: true },
        { label: AppTab.DebateRoom, icon: DebateIcon, tab: AppTab.DebateRoom, enabled: true },
        { label: AppTab.Dashboard, icon: DashboardIcon, tab: AppTab.Dashboard, enabled: user?.role === UserRole.Candidate },
        { label: AppTab.Settings, icon: SettingsIcon, tab: AppTab.Settings, enabled: true },
    ];
    
    const getLinkClasses = (tab: AppTab) => {
        const isActive = activeTab === tab;
        return isActive
            ? 'bg-primary/20 text-primary'
            : 'text-theme-text-muted hover:bg-primary/10 hover:text-theme-text-base';
    };

     const getIconClasses = (tab: AppTab) => {
        const isActive = activeTab === tab;
        return isActive ? 'text-primary' : 'text-theme-text-muted group-hover:text-theme-text-base';
    };

    return (
        <aside className="fixed top-24 left-0 z-30 w-64 h-[calc(100vh-6rem)] transition-transform -translate-x-full lg:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-[var(--color-glass-bg)] backdrop-blur-[20px] border-r border-[var(--color-glass-border)]">
                <ul className="space-y-2 font-medium">
                    {navItems.map(item => item.enabled && (
                        <li key={item.label}>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); onNavigate(item.tab); }}
                                className={`flex items-center p-2 rounded-lg group ${getLinkClasses(item.tab)}`}
                            >
                                <item.icon className={`w-6 h-6 transition duration-75 ${getIconClasses(item.tab)}`} />
                                <span className="ml-3">{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;