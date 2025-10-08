import React, { useState, useEffect } from 'react';
import { User, UserRole, Governorate, Language, AppTab, Post, HomeViewMode } from './types.ts';
import * as api from './services/apiService.ts';
import Header from './components/Header.tsx';
import Sidebar from './components/Sidebar.tsx';
import BottomBar from './components/BottomBar.tsx';
import HomeView from './components/views/HomeView.tsx';
import PublicDiscoverView from './components/views/PublicDiscoverView.tsx';
import AskNeighborView from './components/views/AskNeighborView.tsx';
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


const App: React.FC = () => {
    // --- STATE MANAGEMENT ---
    const [user, setUser] = useState<User | null>(null);
    const [homeViewMode, setHomeViewMode] = useState<HomeViewMode>('Social');
    const [activeTab, setActiveTab] = useState<AppTab>(AppTab.Home); // Sub-navigation for Social view
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isComposeModalOpen, setComposeModalOpen] = useState(false);
    const [isHighContrast, setHighContrast] = useState(false);
    const [language, setLanguage] = useState<Language>('ar');

    // Filters
    const [selectedGovernorate, setSelectedGovernorate] = useState<Governorate | 'All'>('All');
    const [selectedParty, setSelectedParty] = useState<string | 'All'>('All');
    const [parties, setParties] = useState<string[]>([]);

    // View-specific state
    const [selectedProfile, setSelectedProfile] = useState<User | null>(null);
    const [selectedReel, setSelectedReel] = useState<Post | null>(null);
    const [electionPath, setElectionPath] = useState('/');
    
    // --- ROUTING ---
    const [isPublicDiscoverPage, setIsPublicDiscoverPage] = useState(false);
    useEffect(() => {
        if (window.location.pathname === '/discover') {
            setIsPublicDiscoverPage(true);
        }
    }, []);


    // --- EFFECTS ---
    useEffect(() => {
        // Fetch parties for filters
        api.getParties().then(setParties);
    }, []);

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
        setSelectedProfile(null); // Clear selected profile when changing main tabs
        setActiveTab(tab);
    };

    const handleSelectProfile = (profile: User) => {
        if (!user) {
            setLoginModalOpen(true);
            return;
        }
        // If it's the current user, go to their own profile page
        if (profile.id === user.id) {
            setActiveTab(AppTab.UserProfile);
            return;
        }
        // If it's another candidate, go to their profile page
        if (profile.role === UserRole.Candidate) {
            setSelectedProfile(profile);
            setActiveTab(AppTab.CandidateProfile);
        } else {
            // No public page for other voters for now.
            console.log("Clicked on a voter profile, no public page for that yet.");
        }
    };

    const handleSelectReel = (reel: Post) => {
        if (!user) {
            setLoginModalOpen(true);
            return;
        }
        setSelectedReel(reel);
    };


    // --- RENDER LOGIC ---
    if (isPublicDiscoverPage) {
        return (
             <div className={`min-h-screen font-sans`}>
                <PublicDiscoverView />
            </div>
        )
    }
    
    const isElectionMode = homeViewMode === 'Election';

    const renderSocialContent = () => {
         if (selectedReel) {
            return <FullScreenReelView reel={selectedReel} onClose={() => setSelectedReel(null)} user={user} requestLogin={() => setLoginModalOpen(true)} />
        }
        
        // This logic is now specific to the "Social" section
        switch (activeTab) {
            case AppTab.Home:
            case AppTab.Discover: // Fallback to Home for now
                return <HomeView user={user} requestLogin={() => setLoginModalOpen(true)} selectedGovernorate={selectedGovernorate} onGovernorateChange={setSelectedGovernorate} selectedParty={selectedParty} onPartyChange={setSelectedParty} parties={parties} onSelectProfile={handleSelectProfile} onSelectReel={handleSelectReel} language={language} isElectionMode={isElectionMode} />;
            case AppTab.AskNeighbor:
                return <AskNeighborView />;
            case AppTab.DebateRoom:
                return <DebateRoomView />;
            case AppTab.Settings:
                return <SettingsView isHighContrast={isHighContrast} onToggleContrast={() => setHighContrast(p => !p)} />;
            case AppTab.UserProfile:
                return user ? <UserProfileView user={user} onUpdateUser={handleUpdateUser} language={language} onSelectProfile={handleSelectProfile} /> : <HomeView user={user} requestLogin={() => setLoginModalOpen(true)} selectedGovernorate={selectedGovernorate} onGovernorateChange={setSelectedGovernorate} selectedParty={selectedParty} onPartyChange={setSelectedParty} parties={parties} onSelectProfile={handleSelectProfile} onSelectReel={handleSelectReel} language={language} isElectionMode={isElectionMode} />;
            case AppTab.CandidateProfile:
                 return selectedProfile ? <CandidateProfileView candidate={selectedProfile} user={user} requestLogin={() => setLoginModalOpen(true)} language={language} onSelectProfile={handleSelectProfile} /> : <HomeView user={user} requestLogin={() => setLoginModalOpen(true)} selectedGovernorate={selectedGovernorate} onGovernorateChange={setSelectedGovernorate} selectedParty={selectedParty} onPartyChange={setSelectedParty} parties={parties} onSelectProfile={handleSelectProfile} onSelectReel={handleSelectReel} language={language} isElectionMode={isElectionMode} />;
            case AppTab.Dashboard:
                return user?.role === UserRole.Candidate ? <CandidateDashboardView user={user} language={language} onSelectProfile={handleSelectProfile} /> : <HomeView user={user} requestLogin={() => setLoginModalOpen(true)} selectedGovernorate={selectedGovernorate} onGovernorateChange={setSelectedGovernorate} selectedParty={selectedParty} onPartyChange={setSelectedParty} parties={parties} onSelectProfile={handleSelectProfile} onSelectReel={handleSelectReel} language={language} isElectionMode={isElectionMode} />;
            default:
                return <HomeView user={user} requestLogin={() => setLoginModalOpen(true)} selectedGovernorate={selectedGovernorate} onGovernorateChange={setSelectedGovernorate} selectedParty={selectedParty} onPartyChange={setSelectedParty} parties={parties} onSelectProfile={handleSelectProfile} onSelectReel={handleSelectReel} language={language} isElectionMode={isElectionMode} />;
        }
    }
    
    const appThemeClass = isElectionMode ? 'theme-election' : 'theme-social';

    return (
        <div className={`min-h-screen font-sans ${isHighContrast ? 'high-contrast' : ''} ${appThemeClass}`}>
            <Header 
                user={user} 
                onCompose={() => user ? setComposeModalOpen(true) : setLoginModalOpen(true)}
                onRequestLogin={() => setLoginModalOpen(true)}
                selectedGovernorate={selectedGovernorate}
                onGovernorateChange={setSelectedGovernorate}
                parties={parties}
                selectedParty={selectedParty}
                onPartyChange={setSelectedParty}
                onNavigate={handleNavigate}
                language={language}
                onLanguageChange={setLanguage}
                homeViewMode={homeViewMode}
                onModeChange={setHomeViewMode}
            />
            <Sidebar user={user} activeTab={activeTab} onNavigate={handleNavigate} isElectionMode={isElectionMode} />
            
            <main className="lg:pl-64 pt-40 pb-16 lg:pb-0">
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
            
            <BottomBar user={user} activeTab={activeTab} onNavigate={handleNavigate} language={language} isElectionMode={isElectionMode} />

            {isLoginModalOpen && <LoginModal onLogin={handleLogin} onClose={() => setLoginModalOpen(false)} language={language} onLanguageChange={setLanguage} isElectionMode={isElectionMode} />}
            {isComposeModalOpen && user && <ComposeModal user={user} onClose={() => setComposeModalOpen(false)} isElectionMode={isElectionMode} />}
        </div>
    );
};

export default App;