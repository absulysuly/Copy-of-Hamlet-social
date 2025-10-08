import React from 'react';
import { User, AppTab, Language, HomeViewMode } from '../types.ts';
import { EditIcon, UsersIcon, QrCodeIcon, HomeIcon } from './icons/Icons.tsx';
import { UI_TEXT } from '../translations.ts';

interface HeaderProps {
    user: User | null;
    onCompose: () => void;
    onRequestLogin: () => void;
    onNavigate: (tab: AppTab) => void;
    homeViewMode: HomeViewMode;
    onModeChange: (mode: HomeViewMode) => void;
    onQrScan: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onCompose, onRequestLogin, onNavigate, homeViewMode, onModeChange, onQrScan }) => {
    // This is a placeholder, language is now managed in App.tsx directly
    const language: Language = 'ar';
    const texts = UI_TEXT[language];

    const getModeTabClasses = (mode: HomeViewMode) => {
        const isActive = homeViewMode === mode;
        return isActive 
            ? 'bg-primary text-on-primary shadow-md' 
            : 'bg-transparent text-theme-text-muted hover:text-theme-text-base';
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-40 h-24 flex flex-col px-4 sm:px-6 glass-nav">
            {/* Top Bar: Logo, Lang Switcher & Actions */}
            <div className="flex items-center justify-between w-full h-14">
                {/* Left side: Home Icon */}
                <div className="flex-1 flex justify-start">
                    <button
                        onClick={() => { onModeChange('Social'); onNavigate(AppTab.Home); }}
                        className="p-2 rounded-full hover:bg-white/10 text-theme-text-base"
                        aria-label="Home"
                    >
                        <HomeIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Center: App Name */}
                <div className="flex-1 flex justify-center">
                    <button onClick={() => { onModeChange('Social'); onNavigate(AppTab.Home); }} className="text-xl font-bold font-arabic text-theme-text-base whitespace-nowrap">
                        {texts.appName}
                    </button>
                </div>

                {/* Right side: Actions */}
                <div className="flex-1 flex items-center justify-end space-x-1 sm:space-x-2">
                    <button 
                        onClick={onQrScan}
                        className="hidden lg:flex items-center justify-center w-9 h-9 text-sm font-semibold bg-white/10 text-theme-text-base rounded-full transition-all hover:bg-white/20"
                        title="Scan QR Code"
                    >
                        <QrCodeIcon className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={onCompose}
                        className="hidden lg:flex items-center space-x-2 px-4 py-2 text-sm font-semibold bg-primary text-on-primary rounded-full transition-all hover:brightness-110"
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
                            <UsersIcon className="w-5 h-5 text-theme-text-muted" />
                        </button>
                    )}
                </div>
            </div>
            
            {/* Bottom Bar: Main Navigation */}
            <nav className="h-10 flex items-center justify-center border-t border-[var(--color-glass-border)]">
                 <div className="flex space-x-2 bg-black/20 rounded-full p-1">
                    <button
                        onClick={() => onModeChange('Social')}
                        className={`px-6 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 font-arabic ${getModeTabClasses('Social')}`}
                    >
                        {texts.social}
                    </button>
                    <button
                        onClick={() => onModeChange('Election')}
                        className={`px-6 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 font-arabic ${getModeTabClasses('Election')}`}
                    >
                        {texts.serious}
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;