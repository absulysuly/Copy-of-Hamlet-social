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
import QRScannerModal from './components/QRScannerModal.tsx';
import { colorThemes } from './utils/colorThemes.ts';
import CrossPlatformNavigationView from './components/views/CrossPlatformNavigationView.tsx';
import LanguageSwitcher from './components/LanguageSwitcher.tsx';
import PostDetailModal from './components/PostDetailModal.tsx';


const App: React.FC = () => {
    // --- STATE MANAGEMENT ---
    const [user, setUser] = useState<User | null>(null);
    const [homeViewMode, setHomeViewMode] = useState<HomeViewMode>('Social');
    const [activeTab, setActiveTab] = useState<AppTab>(AppTab.Home);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isComposeModalOpen, setComposeModalOpen] = useState(false);
    const [isQrScannerOpen, setQrScannerOpen] = useState(false);
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
        } else {
            body.classList.add('social-mode');
            body.classList.remove('election-mode');
        }

    }, [activeTheme, homeViewMode]);

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
    
    const handleClosePostDetail = () => {
        setSelectedPostForDetail(null);
    };

    const handleQrScanSuccess = (data: string) => {
        try {
            const url = new URL(data);
            const partySlug = url.searchParams.get('party');
            const govSlug = url.searchParams.get('gov');

            if (partySlug && govSlug) {
                const party = SLUG_PARTY_MAP[partySlug] || 'All';
                const governorate = Object.entries(GOVERNORATE_SLUG_MAP).find(([_name, slug]) => slug === govSlug)?.[0] as Governorate | 'All' || 'All';
                
                setSelectedParty(party);
                setSelectedGovernorate(governorate);
                
                setHomeViewMode('Social');
                setActiveTab(AppTab.Home);
                setMainHomeTab(AppTab.Candidates);
                setQrScannerOpen(false);
            }
        } catch (error) {
            console.error("Invalid QR code data:", error);
            // Optionally, show an error to the user
        }
    };
    
    const handleNavigateToCandidates = () => {
        handleNavigate(AppTab.Home);
        setMainHomeTab(AppTab.Candidates);
    };


    // --- RENDER LOGIC ---
    if (isPublicDiscoverPage) {
        return (
             <div className="min-h-screen font-sans">
                <PublicDiscoverView />
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
            language: language,
            activeTab: mainHomeTab,
            onTabChange: setMainHomeTab,
        };

        switch (activeTab) {
            case AppTab.Home:
            case AppTab.Discover:
                return <HomeView {...homeViewProps} />;
            case AppTab.TeaHouse:
                return <TeaHouseView user={user} requestLogin={() => setLoginModalOpen(true)} language={language} />;
            case AppTab.DebateRoom:
                return <DebateRoomView />;
            case AppTab.Navigate:
                return <CrossPlatformNavigationView onNavigateToCandidates={handleNavigateToCandidates} onQrScan={() => setQrScannerOpen(true)} />;
            case AppTab.Settings:
                return <SettingsView isHighContrast={isHighContrast} onToggleContrast={() => setHighContrast(p => !p)} activeTheme={activeTheme} onChangeTheme={setActiveTheme} />;
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
                onCompose={() => user ? setComposeModalOpen(true) : setLoginModalOpen(true)}
                onRequestLogin={() => setLoginModalOpen(true)}
                onNavigate={handleNavigate}
                homeViewMode={homeViewMode}
                onModeChange={setHomeViewMode}
                onQrScan={() => setQrScannerOpen(true)}
            />
            <Sidebar user={user} activeTab={activeTab} onNavigate={handleNavigate} />
            
            <main className="lg:pl-64 pt-24 pb-16 lg:pb-0">
                 <div className="p-4 sm:px-6 flex justify-center">
                    <LanguageSwitcher
                        language={language}
                        onLanguageChange={setLanguage}
                    />
                </div>
                {homeViewMode === 'Social' ? (
                    renderSocialContent()
                ) : (
                    <div className="p-4 sm:p-6">
                        <div className="mt-4">
                            <ElectionHero />
                        </div>
                        <div className="mt-6">
                            <ElectionManagementView path={electionPath} onNavigate={setElectionPath} />
                        </div>
                    </div>
                )}
            </main>
            
            {activeTab !== AppTab.TeaHouse && (
                <BottomBar user={user} activeTab={activeTab} onNavigate={handleNavigate} language={language} />
            )}

            {isLoginModalOpen && <LoginModal onLogin={handleLogin} onClose={() => setLoginModalOpen(false)} language={language} onLanguageChange={setLanguage} />}
            {/* Fix: Passed language prop to ComposeModal to be used by ComposeView. */}
            {isComposeModalOpen && user && <ComposeModal user={user} onClose={() => setComposeModalOpen(false)} language={language} />}
            {isQrScannerOpen && <QRScannerModal onClose={() => setQrScannerOpen(false)} onScanSuccess={handleQrScanSuccess} />}
            {selectedPostForDetail && <PostDetailModal post={selectedPostForDetail} user={user} onClose={handleClosePostDetail} requestLogin={() => setLoginModalOpen(true)} language={language} />}
        </div>
    );
};

export default App;
