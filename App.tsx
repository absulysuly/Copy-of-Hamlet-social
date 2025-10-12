import React, { useState, useEffect } from 'react';
import { User, UserRole, Governorate, Language, AppTab, Post, HomeViewMode, ThemeName, MainContentTab } from './types.ts';
import * as api from './services/apiService.ts';
import { SLUG_PARTY_MAP, GOVERNORATE_SLUG_MAP } from './constants.ts';
import Header from './components/Header.tsx';
import Sidebar from './components/Sidebar.tsx';
import BottomBar from './components/BottomBar.tsx';
import HomeView from './components/views/HomeView.tsx';
import PublicDiscoverView from './components/views/PublicDiscoverView.tsx';
import TeaHouseView from './components/views/TeaHouseView.tsx';
import DebateRoomView from './components/views/DebateRoomView.tsx';
import SettingsView from './components/views/SettingsView.tsx';
import UserProfileView from './components/views/UserProfileView.tsx';
import CandidateProfileView from './components/views/CandidateProfileView.tsx';
import CandidateDashboardView from './components/views/CandidateDashboardView.tsx';
import LoginModal from './components/LoginModal.tsx';
import ComposeModal from './components/ComposeModal.tsx';
import FullScreenReelView from './components/views/FullScreenReelView.tsx';
import ElectionManagementView from './components/views/ElectionManagementView.tsx';
import ElectionHero from './components/ElectionHero.tsx';
import { colorThemes } from './utils/colorThemes.ts';
import LanguageSwitcher from './components/LanguageSwitcher.tsx';
import PostDetailModal from './components/PostDetailModal.tsx';
import StoryViewModal from './components/views/StoryViewModal.tsx';
import { UI_TEXT } from './translations.ts';


const ModeSwitcher: React.FC<{
    mode: HomeViewMode;
    onModeChange: (mode: HomeViewMode) => void;
    language: Language;
}> = ({ mode, onModeChange, language }) => {
    const texts = UI_TEXT[language];
    const buttonBaseClasses = "w-1/2 py-1.5 text-sm font-semibold rounded-md transition-all duration-300";
    const activeClasses = "bg-primary text-on-primary shadow-lg";
    const inactiveClasses = "text-theme-text-muted hover:bg-white/10";

    return (
        <div className="p-1 rounded-lg bg-black/20 w-full max-w-md flex space-x-1">
            <button
                onClick={() => onModeChange('Social')}
                className={`${buttonBaseClasses} ${mode === 'Social' ? activeClasses : inactiveClasses}`}
            >
                {texts.social}
            </button>
            <button
                onClick={() => onModeChange('Election')}
                className={`${buttonBaseClasses} ${mode === 'Election' ? activeClasses : inactiveClasses}`}
            >
                {texts.serious}
            </button>
        </div>
    );
};


const App: React.FC = () => {
    // --- STATE MANAGEMENT ---
    const [user, setUser] = useState<User | null>(null);
    const [homeViewMode, setHomeViewMode] = useState<HomeViewMode>('Social');
    const [activeTab, setActiveTab] = useState<AppTab>(AppTab.Home);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isComposeModalOpen, setComposeModalOpen] = useState(false);
    const [isHighContrast, setHighContrast] = useState(false);
    const [language, setLanguage] = useState<Language>('ar');
    const [activeTheme, setActiveTheme] = useState<ThemeName>('euphratesTeal');

    // Filters
    const [selectedGovernorate, setSelectedGovernorate] = useState<Governorate | 'All'>('All');
    const [selectedParty, setSelectedParty] = useState<string | 'All'>('All');
    const [parties, setParties] = useState<string[]>([]);

    // View-specific state
    const [selectedProfile, setSelectedProfile] = useState<User | null>(null);
    const [selectedReel, setSelectedReel] = useState<Post | null>(null);
    const [selectedPostForDetail, setSelectedPostForDetail] = useState<Post | null>(null);
    const [selectedStoryUser, setSelectedStoryUser] = useState<User | null>(null);
    const [electionPath, setElectionPath] = useState('/');
    const [mainHomeTab, setMainHomeTab] = useState<MainContentTab>(AppTab.Posts);
    
    // --- ROUTING ---
    const [isPublicDiscoverPage, setIsPublicDiscoverPage] = useState(false);
    useEffect(() => {
        if (window.location.pathname === '/discover') {
            setIsPublicDiscoverPage(true);
        }
    }, []);


    // --- EFFECTS ---
    useEffect(() => {
        api.getParties().then(setParties);
    }, []);

    // Effect for handling language direction (LTR/RTL)
    useEffect(() => {
        const isRtl = language === 'ar' || language === 'ku';
        document.documentElement.lang = language;
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    }, [language]);

    // Effect for dual-brand theme switching
    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;
        
        // Determine which theme object to use
        const theme = homeViewMode === 'Election' 
            ? colorThemes.electionPortal 
            : colorThemes[activeTheme];
            
        // Apply CSS variables from the selected theme
        for (const [key, value] of Object.entries(theme)) {
            root.style.setProperty(key, value as string);
        }
        
        // Add/remove class to body for mode-specific global styles
        if (homeViewMode === 'Election') {
            body.classList.add('election-mode');
            body.classList.remove('social-mode');
            // When switching to election mode, reset social tab to home
            // to avoid being stuck on a profile page etc.
            if(activeTab !== AppTab.Home) setActiveTab(AppTab.Home);
        } else {
            body.classList.add('social-mode');
            body.classList.remove('election-mode');
        }

    }, [activeTheme, homeViewMode]);
    
    // When switching to election mode, set the active tab to the portal root
     useEffect(() => {
        if (homeViewMode === 'Election') {
            setElectionPath('/');
        }
    }, [homeViewMode]);


    // --- HANDLERS ---
    const handleLogin = (loggedInUser: User) => {
        setUser(loggedInUser);
        setLoginModalOpen(false);
        if (loggedInUser.role === UserRole.Candidate) {
            setActiveTab(AppTab.Dashboard);
        } else {
            setActiveTab(AppTab.Home);
        }
    };

    const handleUpdateUser = (updatedUser: User) => {
        setUser(updatedUser);
    }
    
    const handleNavigate = (tab: AppTab) => {
        setSelectedProfile(null);
        setActiveTab(tab);
        // Always switch to social mode when a social tab is clicked
        setHomeViewMode('Social');
    };

    const handleSelectProfile = (profile: User) => {
        if (!user) {
            setLoginModalOpen(true);
            return;
        }
        if (profile.id === user.id) {
            setActiveTab(AppTab.UserProfile);
            return;
        }
        if (profile.role === UserRole.Candidate) {
            setSelectedProfile(profile);
            setActiveTab(AppTab.CandidateProfile);
        }
    };

    const handleSelectReel = (reel: Post) => {
        if (!user) {
            setLoginModalOpen(true);
            return;
        }
        setSelectedReel(reel);
    };
    
    const handleSelectPost = (post: Post) => {
        setSelectedPostForDetail(post);
    };
    
    const handleSelectStory = (storyUser: User) => {
        setSelectedStoryUser(storyUser);
    };
    
    const handleClosePostDetail = () => {
        setSelectedPostForDetail(null);
    };
    
    // --- RENDER LOGIC ---
    if (isPublicDiscoverPage) {
        return (
             <div className="min-h-screen font-sans">
                <PublicDiscoverView language={language} />
            </div>
        )
    }
    
    const renderSocialContent = () => {
         if (selectedReel) {
            return <FullScreenReelView reel={selectedReel} onClose={() => setSelectedReel(null)} user={user} requestLogin={() => setLoginModalOpen(true)} />
        }
        
        const homeViewProps = {
            user: user,
            requestLogin: () => setLoginModalOpen(true),
            selectedGovernorate: selectedGovernorate,
            onGovernorateChange: setSelectedGovernorate,
            selectedParty: selectedParty,
            onPartyChange: setSelectedParty,
            parties: parties,
            onSelectProfile: handleSelectProfile,
            onSelectReel: handleSelectReel,
            onSelectPost: handleSelectPost,
            onSelectStory: handleSelectStory,
            language: language,
            activeTab: mainHomeTab,
            onTabChange: setMainHomeTab,
            onCompose: () => setComposeModalOpen(true),
        };

        switch (activeTab) {
            case AppTab.Home:
            case AppTab.Discover:
                return <HomeView {...homeViewProps} />;
            case AppTab.TeaHouse:
                return <TeaHouseView user={user} requestLogin={() => setLoginModalOpen(true)} language={language} />;
            case AppTab.DebateRoom:
                return <DebateRoomView language={language} />;
            case AppTab.Settings:
                return <SettingsView isHighContrast={isHighContrast} onToggleContrast={() => setHighContrast(p => !p)} activeTheme={activeTheme} onChangeTheme={setActiveTheme} language={language} />;
            case AppTab.UserProfile:
                return user ? <UserProfileView user={user} onUpdateUser={handleUpdateUser} language={language} onSelectProfile={handleSelectProfile} onSelectPost={handleSelectPost} /> : <HomeView {...homeViewProps} />;
            case AppTab.CandidateProfile:
                 return selectedProfile ? <CandidateProfileView candidate={selectedProfile} user={user} requestLogin={() => setLoginModalOpen(true)} language={language} onSelectProfile={handleSelectProfile} onSelectPost={handleSelectPost} /> : <HomeView {...homeViewProps} />;
            case AppTab.Dashboard:
                return user?.role === UserRole.Candidate ? <CandidateDashboardView user={user} language={language} onSelectProfile={handleSelectProfile} onSelectPost={handleSelectPost} /> : <HomeView {...homeViewProps} />;
            default:
                return <HomeView {...homeViewProps} />;
        }
    }
    
    return (
        <div className={`min-h-screen font-sans ${isHighContrast ? 'high-contrast' : ''}`}>
            <Header 
                user={user} 
                onRequestLogin={() => setLoginModalOpen(true)}
                onNavigate={handleNavigate}
                language={language}
            />
            
            <Sidebar 
                user={user} 
                activeTab={homeViewMode === 'Social' ? activeTab : electionPath} 
                onNavigate={homeViewMode === 'Social' ? handleNavigate : setElectionPath}
                homeViewMode={homeViewMode}
                language={language}
            />
            
            <main className="lg:pl-64 pt-14 pb-16 lg:pb-0">
                 <div className="px-4 sm:px-6 flex flex-col items-center gap-4">
                    <LanguageSwitcher
                        language={language}
                        onLanguageChange={setLanguage}
                    />
                    <ModeSwitcher 
                        mode={homeViewMode}
                        onModeChange={setHomeViewMode}
                        language={language}
                    />
                </div>
                {homeViewMode === 'Social' ? (
                    renderSocialContent()
                ) : (
                    <div className="p-4 sm:p-6">
                        <div className="mt-4">
                            <ElectionHero language={language} />
                        </div>
                        <div className="mt-6">
                            <ElectionManagementView path={electionPath} onNavigate={setElectionPath} language={language} />
                        </div>
                    </div>
                )}
            </main>
            
            <BottomBar 
                user={user} 
                homeViewMode={homeViewMode}
                socialActiveTab={activeTab} 
                onSocialNavigate={handleNavigate} 
                electionActivePath={electionPath}
                onElectionNavigate={setElectionPath}
                language={language}
            />

            {isLoginModalOpen && <LoginModal onLogin={handleLogin} onClose={() => setLoginModalOpen(false)} language={language} onLanguageChange={setLanguage} />}
            {isComposeModalOpen && user && <ComposeModal user={user} onClose={() => setComposeModalOpen(false)} language={language} />}
            {selectedPostForDetail && <PostDetailModal post={selectedPostForDetail} user={user} onClose={handleClosePostDetail} requestLogin={() => setLoginModalOpen(true)} language={language} />}
            {selectedStoryUser && <StoryViewModal storyUser={selectedStoryUser} onClose={() => setSelectedStoryUser(null)} onSelectProfile={(user) => { setSelectedStoryUser(null); handleSelectProfile(user);}} user={user} requestLogin={() => setLoginModalOpen(true)} />}
        </div>
    );
};

export default App;