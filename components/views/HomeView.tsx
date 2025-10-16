import React, { useState, useEffect, Suspense, lazy } from 'react';
import { User, UserRole, Governorate, Language, MainContentTab, AppTab, Post } from '../../types.ts';
import { GOVERNORATES, GOVERNORATE_AR_MAP } from '../../constants.ts';
import { UI_TEXT } from '../../translations.ts';
import * as api from '../../services/apiService.ts';

import HeroSection from '../HeroSection.tsx';
import Stories from '../Stories.tsx';
import ComposeView from './ComposeView.tsx';
import PostCard from '../PostCard.tsx';
import TopNavBar from '../TopNavBar.tsx';
import Spinner from '../Spinner.tsx';
import ReelsView from './ReelsView.tsx';
import CandidatesView from './CandidatesView.tsx';
import ReelComposer from './compose/ReelComposer.tsx';
import SkeletonPostCard from '../SkeletonPostCard.tsx';

// Lazy load views
const WhisperView = lazy(() => import('./WhisperView.tsx'));
const WomenCandidatesView = lazy(() => import('./WomenCandidatesView.tsx'));
const MinoritiesView = lazy(() => import('./MinoritiesView.tsx'));
const CrossPlatformNavigationView = lazy(() => import('./CrossPlatformNavigationView.tsx'));


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
}

const SUB_TABS: MainContentTab[] = [AppTab.Feed, AppTab.Real, AppTab.Candidates, AppTab.Women, AppTab.Minorities, AppTab.Whisper, AppTab.Components];

const getThemeClassForTab = (tab: MainContentTab) => {
    switch (tab) {
        case AppTab.Real: return 'theme-reels';
        case AppTab.Candidates: return 'theme-candidates';
        case AppTab.Whisper: return 'theme-whisper';
        default: return 'theme-default';
    }
};

const HomeView: React.FC<HomeViewProps> = ({ user, requestLogin, selectedGovernorate, onGovernorateChange, selectedParty, onPartyChange, parties, onSelectProfile, onSelectReel, onSelectPost, onSelectStory, language, activeTab, onTabChange, onCompose }) => {
    
    // --- STATE FOR ASYNC DATA ---
    const [socialPosts, setSocialPosts] = useState<Post[]>([]);
    const [candidates, setCandidates] = useState<User[]>([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(false);
    const [genderFilter, setGenderFilter] = useState<'All' | 'Male' | 'Female'>('All');

    // --- DATA FETCHING FOR FEED ---
    useEffect(() => {
        if (activeTab === AppTab.Feed) {
            const fetchFeedData = async () => {
                setIsLoadingPosts(true);
                try {
                    const postsPromise = api.getPosts({ governorate: selectedGovernorate, party: selectedParty });
                    const candidatesPromise = api.getUsers({ role: UserRole.Candidate, governorate: selectedGovernorate, party: selectedParty });
                    const [postsData, candidatesData] = await Promise.all([postsPromise, candidatesPromise]);
                    setSocialPosts(postsData);
                    setCandidates(candidatesData); // Used for stories and who-to-follow
                } catch (error) {
                    console.error("Failed to fetch feed data:", error);
                } finally {
                    setIsLoadingPosts(false);
                }
            };
            fetchFeedData();
        }
    }, [activeTab, selectedGovernorate, selectedParty]);

    // --- API HANDLERS ---
    const handlePost = (postDetails: Partial<Post>) => {
        if (!user) return;
        api.createPost(postDetails, user).then(newPost => {
            if (activeTab === AppTab.Feed) {
                setSocialPosts(prevPosts => [newPost, ...prevPosts]);
            }
            alert("Post created successfully (simulation).");
        });
    };
    
    const handleCreateReel = (reelDetails: { caption: string; videoFile?: File }) => {
        if (!user) return;
        api.createReel(reelDetails, user).then(newReel => {
            console.log("New reel created (simulation):", newReel);
            alert("Reel created successfully (simulation).");
        });
    };

    const handleFollow = (e: React.MouseEvent, candidateId: string) => {
        if (!user) {
            e.preventDefault();
            requestLogin();
        } else {
            api.followCandidate(candidateId);
        }
    };

    // --- DERIVED DATA & TEXTS ---
    const candidatesToFollow = candidates.filter(c => c.id !== user?.id).slice(0, 3);
    const storyCandidates = candidates.slice(0, 10);
    const texts = UI_TEXT[language];
    
    const FilterBar = () => (
        <div className="flex flex-col sm:flex-row gap-4 p-3 glass-card my-4 rounded-lg shadow-lg">
            <div className="flex-1 min-w-[120px]">
                <label htmlFor="gov-filter" className="block text-xs font-medium text-theme-text-muted font-arabic">{texts.governorate}</label>
                <select id="gov-filter" value={selectedGovernorate} onChange={(e) => onGovernorateChange(e.target.value as Governorate | 'All')} className="mt-1 block w-full p-1.5 border border-white/20 rounded-md bg-white/10 text-theme-text-base text-sm focus:outline-none focus:ring-1 focus:ring-primary font-arabic text-right">
                    <option value="All">{texts.allIraq}</option>
                    {GOVERNORATES.map(gov => <option key={gov} value={gov}>{GOVERNORATE_AR_MAP[gov]}</option>)}
                </select>
            </div>
            <div className="flex-1 min-w-[120px]">
                <label htmlFor="party-filter" className="block text-xs font-medium text-theme-text-muted font-arabic">{texts.party}</label>
                <select id="party-filter" value={selectedParty} onChange={(e) => onPartyChange(e.target.value)} className="mt-1 block w-full p-1.5 border border-white/20 rounded-md bg-white/10 text-theme-text-base text-sm focus:outline-none focus:ring-1 focus:ring-primary font-arabic text-right">
                    <option value="All">{texts.all}</option>
                    {parties.map(party => <option key={party} value={party}>{party}</option>)}
                </select>
            </div>
             <div className="flex-1 min-w-[120px]">
                <label htmlFor="gender-filter" className="block text-xs font-medium text-theme-text-muted font-arabic">{texts.gender}</label>
                <select id="gender-filter" value={genderFilter} onChange={(e) => setGenderFilter(e.target.value as 'All' | 'Male' | 'Female')} className="mt-1 block w-full p-1.5 border border-white/20 rounded-md bg-white/10 text-theme-text-base text-sm focus:outline-none focus:ring-1 focus:ring-primary font-arabic text-right">
                    <option value="All">{texts.all}</option>
                    <option value="Male">{texts.male}</option>
                    <option value="Female">{texts.female}</option>
                </select>
            </div>
        </div>
    );
    
    // --- RENDER LOGIC ---
    const renderTabContent = () => {
        switch (activeTab) {
            case AppTab.Feed:
                const postsWithStories = socialPosts.reduce((acc, post, index) => {
                    acc.push(<PostCard key={post.id} post={post} user={user} requestLogin={requestLogin} language={language} onSelectAuthor={onSelectProfile} onSelectPost={onSelectPost} />);
                    if ((index + 1) % 4 === 0) {
                        acc.push(<div key={`stories-${index}`} className="my-6"><Stories users={storyCandidates} onSelectStory={onSelectStory} /></div>);
                    }
                    return acc;
                }, [] as React.ReactNode[]);

                return (
                    <>
                        <div className="mt-6"><Stories users={storyCandidates} onSelectStory={onSelectStory}/></div>
                        <div className="mt-6"><HeroSection /></div>
                        <div className="mt-4">
                            {user ? <ComposeView user={user} onPost={handlePost} language={language} postType="Post" />
                                : <div onClick={requestLogin} className="glass-card rounded-lg p-3 flex items-center space-x-4 cursor-pointer hover:border-primary"><div className="flex-1 text-theme-text-muted font-arabic">{texts.whatsOnYourMind}</div><button className="px-4 py-2 text-sm font-bold bg-primary text-on-primary rounded-full">{texts.post}</button></div>
                            }
                        </div>
                        <div className="mt-4">
                            {isLoadingPosts ? [...Array(3)].map((_, i) => <SkeletonPostCard key={i} />)
                                : postsWithStories.length > 0 ? postsWithStories
                                : <p className="text-center py-10 text-theme-text-muted">{texts.noPostsFound}</p>
                            }
                        </div>
                    </>
                );
            case AppTab.Real:
                return (
                    <div className="mt-4">
                        {user?.role === UserRole.Candidate && <div className="mb-4"><ReelComposer user={user} onCreateReel={handleCreateReel} /></div>}
                        <ReelsView selectedGovernorate={selectedGovernorate} selectedParty={selectedParty} onSelectReel={onSelectReel} user={user} requestLogin={requestLogin} language={language} />
                    </div>
                );
            case AppTab.Candidates:
                 return (
                    <div className="mt-6">
                        <FilterBar />
                        <CandidatesView selectedGovernorate={selectedGovernorate} selectedParty={selectedParty} selectedGender={genderFilter} onSelectCandidate={onSelectProfile} user={user} requestLogin={requestLogin} language={language}/>
                    </div>
                );
            case AppTab.Women:
                return (
                    <Suspense fallback={<Spinner />}>
                        <WomenCandidatesView onSelectCandidate={onSelectProfile} user={user} requestLogin={requestLogin} language={language} />
                    </Suspense>
                );
            case AppTab.Minorities:
                return (
                    <Suspense fallback={<Spinner />}>
                        <MinoritiesView language={language} />
                    </Suspense>
                );
            case AppTab.Whisper:
                return (
                     <div className="mt-4">
                        {user && <div className="mb-4"><ComposeView user={user} onPost={handlePost} language={language} postType="Whisper" /></div>}
                         <Suspense fallback={<Spinner/>}>
                            <WhisperView user={user} requestLogin={requestLogin} language={language} onSelectAuthor={onSelectProfile} onSelectPost={onSelectPost} />
                         </Suspense>
                    </div>
                );
            case AppTab.Components:
                return (
                    <Suspense fallback={<Spinner />}>
                        <CrossPlatformNavigationView onNavigateToCandidates={() => onTabChange(AppTab.Candidates)} onQrScan={() => alert('QR Scan not implemented yet.')} />
                    </Suspense>
                );
            default:
                if (isLoadingPosts) return <Spinner />;
                return null;
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-0 sm:p-6">
            {/* Main Content Column */}
            <main className="lg:col-span-3">
                 {/* Non-sticky TopNavBar */}
                <div className="z-10 py-2 sticky top-14 lg:top-0 glass-nav lg:glass-card lg:rounded-t-xl">
                    <TopNavBar<MainContentTab>
                        tabs={SUB_TABS}
                        activeTab={activeTab}
                        onTabChange={onTabChange}
                        language={language}
                    />
                </div>
                
                <div className={`tab-content-wrapper ${getThemeClassForTab(activeTab)} px-4 sm:px-0`}>
                    {renderTabContent()}
                </div>
            </main>

            {/* Right Sidebar (Desktop) */}
            <aside className="hidden lg:block lg:col-span-1 space-y-6 pt-2">
                <div className="glass-card rounded-lg p-4">
                    <h3 className="font-bold mb-3 font-arabic">{texts.whoToFollow}</h3>
                    <div className="space-y-3">
                        {candidatesToFollow.length > 0 ? candidatesToFollow.map(candidate => (
                            <div key={candidate.id} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectProfile(candidate)}>
                                    <img src={candidate.avatarUrl} alt={candidate.name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-sm">{candidate.name}</p>
                                        <p className="text-xs text-theme-text-muted">{candidate.party}</p>
                                    </div>
                                </div>
                                <button onClick={(e) => handleFollow(e, candidate.id)} className="px-3 py-1 text-xs font-semibold rounded-full bg-primary text-on-primary transition-all hover:brightness-110">{texts.follow}</button>
                            </div>
                        )) : <p className="text-xs text-theme-text-muted">{texts.noCandidatesToShow}</p>}
                    </div>
                </div>

                <div className="glass-card rounded-lg p-4">
                    <h3 className="font-bold mb-3 font-arabic">{texts.platformRules}</h3>
                    <ul className="text-sm space-y-2 list-disc list-inside text-theme-text-muted font-arabic">
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