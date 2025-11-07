import React, { useState, useEffect, Suspense, lazy } from 'react';
import { User, UserRole, Governorate, Language, MainContentTab, AppTab, Post, HomeViewMode } from '../../types.ts';
import { GOVERNORATES, GOVERNORATE_AR_MAP } from '../../constants.ts';
import { UI_TEXT } from '../../translations.ts';
import * as api from '../../services/apiService.ts';

import ComposeView from './ComposeView.tsx';
import PostCard from '../PostCard.tsx';
import TopNavBar from '../TopNavBar.tsx';
import Spinner from '../Spinner.tsx';
import ReelsView from './ReelsView.tsx';
import CandidatesView from './CandidatesView.tsx';
import SkeletonPostCard from '../SkeletonPostCard.tsx';
import SearchBar from '../SearchBar.tsx';
import Stories from '../Stories.tsx';

// Lazy load views
const WhisperView = lazy(() => import('./WhisperView.tsx'));
const WomenCandidatesView = lazy(() => import('./WomenCandidatesView.tsx'));
const MinoritiesView = lazy(() => import('./MinoritiesView.tsx'));
const CrossPlatformNavigationView = lazy(() => import('./CrossPlatformNavigationView.tsx'));
const PollingCenterFinder = lazy(() => import('./PollingCenterFinder.tsx'));
const DebatesView = lazy(() => import('./DebatesView.tsx'));
const EventsView = lazy(() => import('./EventsView.tsx'));
const SeriousnessView = lazy(() => import('./SeriousnessView.tsx')); // This is for Articles
const TeaHouseView = lazy(() => import('./TeaHouseView.tsx'));
const HeroSection = lazy(() => import('../HeroSection.tsx'));


interface HomeViewProps {
    user: User | null;
    requestLogin: () => void;
    selectedGovernorate: Governorate | 'All';
    onGovernorateChange: (gov: Governorate | 'All') => void;
    selectedParty: string | 'All';
    onPartyChange: (party: string | 'All') => void;
    parties: string[];
    onSelectProfile: (profile: User) => void;
    onSelectReel: (reel: Post) => void;
    onSelectPost: (post: Post) => void;
    onSelectStory: (user: User) => void;
    language: Language;
    activeTab: MainContentTab;
    onTabChange: (tab: MainContentTab) => void;
    onCompose: () => void;
    homeViewMode: HomeViewMode;
}

const SOCIAL_TABS: MainContentTab[] = [AppTab.Feed, AppTab.Real, AppTab.Whisper, AppTab.TeaHouse, AppTab.Women, AppTab.Components];
const ELECTION_TABS: MainContentTab[] = [AppTab.Candidates, AppTab.PollingCenter, AppTab.Women, AppTab.Minorities, AppTab.Debates, AppTab.Events, AppTab.Articles];

const HomeView: React.FC<HomeViewProps> = ({ user, requestLogin, selectedGovernorate, onGovernorateChange, selectedParty, onPartyChange, parties, onSelectProfile, onSelectReel, onSelectPost, onSelectStory, language, activeTab, onTabChange, onCompose, homeViewMode }) => {
    
    const [socialPosts, setSocialPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [genderFilter, setGenderFilter] = useState<'All' | 'Male' | 'Female'>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [storyUsers, setStoryUsers] = useState<User[]>([]);

    // Reset active tab and search when mode changes
    useEffect(() => {
        setSearchQuery('');
        if (homeViewMode === 'Social') {
            onTabChange(AppTab.Feed);
        } else {
            onTabChange(AppTab.Candidates);
        }
    }, [homeViewMode, onTabChange]);


    useEffect(() => {
        if (activeTab === AppTab.Feed) {
            const fetchFeedData = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const postsData = await api.getPosts({ 
                        governorate: selectedGovernorate, 
                        party: selectedParty,
                        query: searchQuery,
                    });
                    setSocialPosts(postsData);
                } catch (error) {
                    console.error("Failed to fetch feed data:", error);
                    setError("Failed to load feed. Please try again.");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchFeedData();
        }
    }, [activeTab, selectedGovernorate, selectedParty, searchQuery]);
    
    useEffect(() => {
        api.getUsers({ role: UserRole.Candidate }).then(users => {
            setStoryUsers(users.slice(0, 15)); // Get some users for stories
        });
    }, []);

    const handlePost = (postDetails: Partial<Post>) => {
        if (!user) return;
        api.createPost(postDetails, user).then(newPost => {
            if (activeTab === AppTab.Feed) {
                setSocialPosts(prevPosts => [newPost, ...prevPosts]);
            }
            alert("Post created successfully (simulation).");
        });
    };

    const texts = UI_TEXT[language];
    
    const CandidateFilters = () => (
        <div className="flex flex-col gap-4 p-4 glass-card my-4 rounded-lg shadow-lg w-full max-w-md mx-auto">
             <h2 className="text-xl font-bold text-center text-theme-text-base font-arabic">
                {texts.electionCandidates}
             </h2>
             <SearchBar onSearch={setSearchQuery} placeholder={texts.search} />
            <div>
                <label htmlFor="gov-filter" className="block text-sm font-medium text-theme-text-muted font-arabic">{texts.governorate}</label>
                <select id="gov-filter" value={selectedGovernorate} onChange={(e) => onGovernorateChange(e.target.value as Governorate | 'All')} className="mt-1 block w-full p-2 border border-white/20 rounded-md bg-white/10 text-theme-text-base focus:outline-none focus:ring-1 focus:ring-primary font-arabic text-right">
                    <option value="All">{texts.allIraq}</option>
                    {GOVERNORATES.map(gov => <option key={gov} value={gov}>{GOVERNORATE_AR_MAP[gov]}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="party-filter" className="block text-sm font-medium text-theme-text-muted font-arabic">{texts.party}</label>
                <select id="party-filter" value={selectedParty} onChange={(e) => onPartyChange(e.target.value)} className="mt-1 block w-full p-2 border border-white/20 rounded-md bg-white/10 text-theme-text-base focus:outline-none focus:ring-1 focus:ring-primary font-arabic text-right">
                    <option value="All">{texts.all}</option>
                    {parties.map(party => <option key={party} value={party}>{party}</option>)}
                </select>
            </div>
             <div>
                <label htmlFor="gender-filter" className="block text-sm font-medium text-theme-text-muted font-arabic">{texts.gender}</label>
                <select id="gender-filter" value={genderFilter} onChange={(e) => setGenderFilter(e.target.value as 'All' | 'Male' | 'Female')} className="mt-1 block w-full p-2 border border-white/20 rounded-md bg-white/10 text-theme-text-base focus:outline-none focus:ring-1 focus:ring-primary font-arabic text-right">
                    <option value="All">{texts.all}</option>
                    <option value="Male">{texts.male}</option>
                    <option value="Female">{texts.female}</option>
                </select>
            </div>
        </div>
    );

    const tabs = homeViewMode === 'Social' ? SOCIAL_TABS : ELECTION_TABS;
    const showFilters = [AppTab.Candidates, AppTab.Feed, AppTab.Women, AppTab.Minorities].includes(activeTab);

    const renderContent = () => {
        switch (activeTab) {
            case AppTab.Feed:
                return (
                    <div className="max-w-2xl mx-auto">
                        {isLoading ? (
                            [...Array(3)].map((_, i) => <SkeletonPostCard key={i} />)
                        ) : error ? (
                            <p className="text-center text-red-400">{error}</p>
                        ) : socialPosts.length > 0 ? (
                            socialPosts.map(post => (
                                <PostCard key={post.id} post={post} user={user} requestLogin={requestLogin} language={language} onSelectAuthor={onSelectProfile} onSelectPost={onSelectPost} />
                            ))
                        ) : (
                            <p className="text-center py-10 text-theme-text-muted">{texts.noPostsFound}</p>
                        )}
                    </div>
                );
            case AppTab.Real:
                return <ReelsView selectedGovernorate={selectedGovernorate} selectedParty={selectedParty} onSelectReel={onSelectReel} user={user} requestLogin={requestLogin} language={language} />;
            case AppTab.Candidates:
                return <CandidatesView selectedGovernorate={selectedGovernorate} selectedParty={selectedParty} selectedGender={genderFilter} onSelectCandidate={onSelectProfile} user={user} requestLogin={requestLogin} language={language} />;
            case AppTab.Whisper:
                return <Suspense fallback={<Spinner />}><WhisperView user={user} requestLogin={requestLogin} language={language} onSelectAuthor={onSelectProfile} onSelectPost={onSelectPost} /></Suspense>;
            case AppTab.Women:
                return <Suspense fallback={<Spinner />}><WomenCandidatesView onSelectCandidate={onSelectProfile} user={user} requestLogin={requestLogin} language={language} /></Suspense>;
            case AppTab.Minorities:
                return <Suspense fallback={<Spinner />}><MinoritiesView language={language} /></Suspense>;
            case AppTab.Components:
                 return <Suspense fallback={<Spinner />}><CrossPlatformNavigationView onNavigateToCandidates={() => onTabChange(AppTab.Candidates)} onQrScan={() => { /* TODO */ }} /></Suspense>;
            case AppTab.PollingCenter:
                return <Suspense fallback={<Spinner />}><PollingCenterFinder language={language} /></Suspense>;
            case AppTab.TeaHouse:
                return <Suspense fallback={<Spinner />}><TeaHouseView user={user} requestLogin={requestLogin} language={language} /></Suspense>;
            case AppTab.Events:
                return <Suspense fallback={<Spinner />}><EventsView selectedGovernorate={selectedGovernorate} selectedParty={selectedParty} language={language} /></Suspense>;
            case AppTab.Articles:
                 return <Suspense fallback={<Spinner />}><SeriousnessView selectedGovernorate={selectedGovernorate} language={language} /></Suspense>;
            case AppTab.Debates:
                return <Suspense fallback={<Spinner />}><DebatesView selectedGovernorate={selectedGovernorate} selectedParty={selectedParty} language={language} /></Suspense>;
            default:
                return null;
        }
    };

    return (
        <div>
            {homeViewMode === 'Social' && user && storyUsers.length > 0 && <Stories users={storyUsers} onSelectStory={onSelectStory} />}
            {homeViewMode === 'Social' && user && (
                <div className="max-w-2xl mx-auto my-4 px-4 sm:px-0">
                    <ComposeView user={user} onPost={handlePost} language={language} />
                </div>
            )}
            {homeViewMode === 'Social' && !user && <Suspense fallback={<div className="h-40"></div>}><HeroSection /></Suspense>}

            <TopNavBar tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} language={language} />

            {showFilters && <CandidateFilters />}
            
            {renderContent()}
        </div>
    );
};

export default HomeView;
