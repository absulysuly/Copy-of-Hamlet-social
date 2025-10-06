
// Fix: Populating components/views/HomeView.tsx with the main feed view.
import React, { useState } from 'react';
import { User, UserRole, Governorate, Language, MainContentTab, AppTab, Post } from '../../types.ts';
import { MOCK_POSTS, MOCK_USERS } from '../../constants.ts';
import { UI_TEXT } from '../../translations.ts';

import HeroSection from '../HeroSection.tsx';
import Stories from '../Stories.tsx';
import ComposeView from './ComposeView.tsx';
import PostCard from '../PostCard.tsx';
import SeriousnessView from './SeriousnessView.tsx';
import TopNavBar from '../TopNavBar.tsx';
import LanguageSwitcher from '../LanguageSwitcher.tsx';

import ReelsView from './ReelsView.tsx';
import CandidatesView from './CandidatesView.tsx';
import DebatesView from './DebatesView.tsx';
import EventsView from './EventsView.tsx';
import ReelComposer from './compose/ReelComposer.tsx';
import EventComposer from './compose/EventComposer.tsx';


interface HomeViewProps {
    user: User | null;
    requestLogin: () => void;
    selectedGovernorate: Governorate | 'All';
    onSelectCandidate: (candidate: User) => void;
    onSelectReel: (reel: Post) => void;
    language: Language;
    onLanguageChange: (lang: Language) => void;
}

type HomeTab = 'Social' | 'Serious';

const HomeView: React.FC<HomeViewProps> = ({ user, requestLogin, selectedGovernorate, onSelectCandidate, onSelectReel, language, onLanguageChange }) => {
    const [socialTab, setSocialTab] = useState<HomeTab>('Social');
    const [mainTab, setMainTab] = useState<MainContentTab>(AppTab.Posts);

    // --- MOCK DATA HANDLERS ---
    // TODO: Replace these console.log statements with API calls to your backend to create new content.
    const handlePost = (content: string) => {
        console.log("New post created from HomeView:", content);
        // Example: apiService.createPost({ content }).then(() => { /* refresh feed */ });
    };
    
    const handleCreateReel = (details: { caption: string }) => {
        console.log("New reel created:", details);
    };

    const handleCreateEvent = (details: { title: string, date: string, location: string }) => {
        console.log("New event created:", details);
    };

    const handleFollow = (e: React.MouseEvent) => {
        if (!user) {
            e.preventDefault();
            requestLogin();
        }
        // TODO: Add API call to follow a user.
    };

    // --- DATA FILTERING ---
    // TODO: Replace these mock data filters with API calls.
    // Use a useEffect hook to fetch data when the `selectedGovernorate` changes.
    // Example:
    // const [socialPosts, setSocialPosts] = useState([]);
    // useEffect(() => {
    //   apiService.getPosts(selectedGovernorate).then(setSocialPosts);
    // }, [selectedGovernorate]);

    const socialPosts = MOCK_POSTS.filter(post => 
        post.type === 'Post' &&
        (selectedGovernorate === 'All' || post.governorates.includes(selectedGovernorate))
    );
    
    const candidatesForStories = MOCK_USERS.filter(u => 
        u.role === UserRole.Candidate &&
        (selectedGovernorate === 'All' || u.governorate === selectedGovernorate)
    );
    
    const candidatesToFollow = MOCK_USERS.filter(u => 
        u.role === UserRole.Candidate && 
        u.id !== user?.id &&
        (selectedGovernorate === 'All' || u.governorate === selectedGovernorate)
    ).slice(0, 3);

    // --- LOCALIZATION ---
    const texts = UI_TEXT[language];
    const socialTabLabel = texts.social as HomeTab;
    const seriousTabLabel = texts.serious as HomeTab;
    
    const mainTabs: MainContentTab[] = [AppTab.Posts, AppTab.Reels, AppTab.Candidates, AppTab.Debates, AppTab.Events];
    
    // --- RENDER LOGIC ---
    const renderComposer = () => {
        if (!user || user.role !== UserRole.Candidate) {
            return null; // Only candidates can compose content.
        }

        switch (mainTab) {
            case AppTab.Posts:
                return <ComposeView user={user} onPost={handlePost} />;
            case AppTab.Reels:
                return <ReelComposer user={user} onCreateReel={handleCreateReel} />;
            case AppTab.Events:
                return <EventComposer user={user} onCreateEvent={handleCreateEvent} />;
            default:
                return null;
        }
    };

    const renderMainContent = () => {
        switch (mainTab) {
            case AppTab.Posts:
                return (
                     <div className="mt-4">
                        {socialTab === 'Social' ? (
                            <div>
                                {socialPosts.map(post => <PostCard key={post.id} post={post} user={user} requestLogin={requestLogin} />)}
                            </div>
                        ) : (
                            <SeriousnessView selectedGovernorate={selectedGovernorate} />
                        )}
                    </div>
                );
            case AppTab.Reels:
                return <ReelsView selectedGovernorate={selectedGovernorate} onSelectReel={onSelectReel} user={user} requestLogin={requestLogin} />;
            case AppTab.Candidates:
                return <CandidatesView selectedGovernorate={selectedGovernorate} onSelectCandidate={onSelectCandidate} />;
            case AppTab.Debates:
                return <DebatesView selectedGovernorate={selectedGovernorate} />;
            case AppTab.Events:
                return <EventsView selectedGovernorate={selectedGovernorate} />;
            default:
                return null;
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 sm:p-6">
            {/* Main Content Column */}
            <main className="lg:col-span-3">
                <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} />
                <HeroSection />
                <div className="mt-2">
                     <TopNavBar<HomeTab>
                        tabs={[socialTabLabel, seriousTabLabel]}
                        activeTab={socialTab === 'Social' ? socialTabLabel : seriousTabLabel}
                        onTabChange={(tab) => setSocialTab(tab === socialTabLabel ? 'Social' : 'Serious')}
                    />
                </div>
                <div className="mt-2">
                    <Stories users={candidatesForStories} />
                </div>
                
                <div className="mt-2 sticky top-16 bg-neutral-gray-light dark:bg-gray-900 z-20 py-2 -my-2">
                    <TopNavBar<MainContentTab>
                        tabs={mainTabs}
                        activeTab={mainTab}
                        onTabChange={setMainTab}
                    />
                </div>

                <div className="my-4">
                    {renderComposer()}
                </div>
                
                {renderMainContent()}

            </main>

            {/* Right Sidebar (Desktop) */}
            <aside className="hidden lg:block lg:col-span-1 space-y-6">
                <div className="bg-mocha-white dark:bg-gray-800 rounded-lg shadow-sm border border-neutral-gray-medium dark:border-gray-700 p-4">
                    <h3 className="font-bold mb-3">{texts.whoToFollow}</h3>
                    <div className="space-y-3">
                        {candidatesToFollow.length > 0 ? candidatesToFollow.map(candidate => (
                            <div key={candidate.id} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectCandidate(candidate)}>
                                    <img src={candidate.avatarUrl} alt={candidate.name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-sm">{candidate.name}</p>
                                        <p className="text-xs text-neutral-gray-dark dark:text-gray-400">{candidate.party}</p>
                                    </div>
                                </div>
                                <button onClick={handleFollow} className="px-3 py-1 text-xs font-semibold text-white bg-action-blue rounded-full hover:bg-blue-700">Follow</button>
                            </div>
                        )) : <p className="text-xs text-neutral-gray-dark dark:text-gray-400">No candidates to show for this governorate.</p>}
                    </div>
                </div>

                <div className="bg-mocha-white dark:bg-gray-800 rounded-lg shadow-sm border border-neutral-gray-medium dark:border-gray-700 p-4">
                    <h3 className="font-bold mb-3">{texts.platformRules}</h3>
                    <ul className="text-sm space-y-2 text-neutral-gray-dark dark:text-gray-400 list-disc list-inside">
                        <li>{texts.rule1}</li>
                        <li>{texts.rule2}</li>
                        <li>{texts.rule3}</li>
                        <li>{texts.rule4}</li>
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default HomeView;
