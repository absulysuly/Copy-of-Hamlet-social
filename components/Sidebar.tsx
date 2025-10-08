import React from 'react';
// Fix: added .ts extension to types import
import { AppTab, UserRole, User } from '../types.ts';
// Fix: added .tsx extension to Icons import
import { HomeIcon, DashboardIcon, SettingsIcon, DebateIcon, MapIcon, UsersIcon } from './icons/Icons.tsx';

interface SidebarProps {
    user: User | null;
    activeTab: AppTab;
    onNavigate: (tab: AppTab) => void;
    isElectionMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ user, activeTab, onNavigate, isElectionMode }) => {
    const navItems = [
        { label: AppTab.Home, icon: HomeIcon, tab: AppTab.Home, enabled: true },
        { label: AppTab.UserProfile, icon: UsersIcon, tab: AppTab.UserProfile, enabled: user != null },
        { label: AppTab.AskNeighbor, icon: MapIcon, tab: AppTab.AskNeighbor, enabled: true },
        { label: AppTab.DebateRoom, icon: DebateIcon, tab: AppTab.DebateRoom, enabled: true },
        { label: AppTab.Dashboard, icon: DashboardIcon, tab: AppTab.Dashboard, enabled: user?.role === UserRole.Candidate },
        { label: AppTab.Settings, icon: SettingsIcon, tab: AppTab.Settings, enabled: true },
    ];

    const sidebarBg = isElectionMode ? 'bg-election-card-bg border-r border-neutral-gray-medium' : 'bg-white/[.05] backdrop-blur-[20px] border-r border-white/[.1]';
    
    const getLinkClasses = (tab: AppTab) => {
        const isActive = activeTab === tab;
        if (isElectionMode) {
            return isActive
                ? 'bg-election-green/10 text-election-green'
                : 'text-election-dark-text hover:bg-neutral-gray-light';
        } else {
            return isActive
                ? 'bg-white/20 text-white'
                : 'text-slate-200 hover:bg-white/10';
        }
    };

     const getIconClasses = (tab: AppTab) => {
        const isActive = activeTab === tab;
        if (isElectionMode) {
            return isActive ? 'text-election-green' : 'text-gray-500 group-hover:text-election-dark-text';
        } else {
            return isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-100';
        }
    };

    return (
        <aside className="fixed top-28 left-0 z-30 w-64 h-[calc(100vh-7rem)] transition-transform -translate-x-full lg:translate-x-0" aria-label="Sidebar">
            <div className={`h-full px-3 py-4 overflow-y-auto ${sidebarBg}`}>
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
