import React, { useState, useEffect } from 'react';
import { User, UserRole, Governorate, Language, MainContentTab, AppTab, Post } from '../../types.ts';
import { GOVERNORATES, GOVERNORATE_AR_MAP } from '../../constants.ts';
import { UI_TEXT } from '../../translations.ts';
import * as api from '../../services/apiService.ts';

import HeroSection from '../HeroSection.tsx';
import Stories from '../Stories.tsx';
import ComposeView from './ComposeView.tsx';
import PostCard from '../PostCard.tsx';
import TopNavBar from '../TopNavBar.tsx';
import { SearchIcon } from '../icons/Icons.tsx';

import ReelsView from './ReelsView.tsx';
import CandidatesView from './CandidatesView.tsx';
import DebatesView from './DebatesView.tsx';
import EventsView from './EventsView.tsx';


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
    language: Language;
    activeTab: MainContentTab;
    onTabChange: (tab: MainContentTab) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ user, requestLogin, selectedGovernorate, onGovernorateChange, selectedParty, onPartyChange, parties, onSelectProfile, onSelectReel, onSelectPost, language, activeTab, onTabChange }) => {
    
    // --- STATE FOR ASYNC DATA ---
    const [socialPosts, setSocialPosts] = useState<Post[]>([]);
    const [candidates, setCandidates] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- DATA FETCHING ---
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const filters = { governorate: selectedGovernorate, party: selectedParty };
                const postsPromise = api.getPosts(filters);
                const candidatesPromise = api.getUsers({ role: UserRole.Candidate, ...filters });
                
                const [postsData, candidatesData] = await Promise.all([postsPromise, candidatesPromise]);
                
                setSocialPosts(postsData);
                setCandidates(candidatesData);
            } catch (error) {
                console.error("Failed to fetch home view data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedGovernorate, selectedParty]);

    // --- API HANDLERS ---
    const handlePost = (postDetails: Partial<Post>) => {
        if (!user) return;
        api.createPost(postDetails, user).then(newPost => {
            setSocialPosts(prevPosts => [newPost, ...prevPosts]);
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
    
    const MobileFilterBar = () => (
        <div className="sm:hidden flex gap-4 p-3 bg-black/20 backdrop-blur-sm my-4 rounded-lg border border-[var(--color-glass-border)]">
            {/* Governorate Filter */}
            <div className="flex-1">
                <label htmlFor="mobile-gov-filter" className="block text-xs font-medium text-theme-text-muted font-arabic">المحافظة</label>
                <select 
                    id="mobile-gov-filter"
                    value={selectedGovernorate}
                    onChange={(e) => onGovernorateChange(e.target.value as Governorate | 'All')}
                    className="mt-1 block w-full p-1.5 border border-[var(--color-glass-border)] rounded-md bg-white/20 text-theme-text-base text-sm focus:outline-none focus:ring-1 focus:ring-primary font-arabic text-right"
                >
                    <option value="All">كل العراق</option>
                    {GOVERNORATES.map(gov => (
                        <option key={gov} value={gov}>{GOVERNORATE_AR_MAP[gov]}</option>
                    ))}
                </select>
            </div>
            {/* Party Filter */}
            <div className="flex-1">
                <label htmlFor="mobile-party-filter" className="block text-xs font-medium text-theme-text-muted font-arabic">الحزب</label>
                <select 
                    id="mobile-party-filter"
                    value={selectedParty}
                    onChange={(e) => onPartyChange(e.target.value)}
                    className="mt-1 block w-full p-1.5 border border-[var(--color-glass-border)] rounded-md bg-white/20 text-theme-text-base text-sm focus:outline-none focus:ring-1 focus:ring-primary font-arabic text-right"
                >
                    <option value="All">الكل</option>
                    {parties.map(party => (
                        <option key={party} value={party}>{party}</option>
                    ))}
                </select>
            </div>
        </div>
    );

    // --- RENDER LOGIC ---
    const renderSocialContent = () => {
        if (isLoading) {
            return <div className="text-center py-10 text-theme-text-muted">Loading...</div>;
        }

        switch (activeTab) {
            case AppTab.Posts:
                const composer = user ? <ComposeView user={user} onPost={handlePost} language={language} /> : null;
                const postsWithStories = socialPosts.reduce((acc, post, index) => {
                    acc.push(<PostCard key={post.id} post={post} user={user} requestLogin={requestLogin} language={language} onSelectAuthor={onSelectProfile} onSelectPost={onSelectPost} />);
                    // Inject stories every 4 posts
                    if ((index + 1) % 4 === 0) {
                        acc.push(<div key={`stories-${index}`} className="my-6"><Stories users={storyCandidates} onSelectProfile={onSelectProfile} /></div>);
                    }
                    return acc;
                }, [] as React.ReactNode[]);

                return (
                     <div className="mt-4">
                        {composer && <div className="mb-4">{composer}</div>}
                        {postsWithStories.length > 0 
                            ? postsWithStories
                            : <p className="text-center py-10 text-theme-text-muted">No posts found for the selected filters.</p>
                        }
                    </div>
                );
            case AppTab.Reels:
                return <ReelsView selectedGovernorate={selectedGovernorate} selectedParty={selectedParty} onSelectReel={onSelectReel} user={user} requestLogin={requestLogin} />;
            case AppTab.Candidates:
                return <CandidatesView selectedGovernorate={selectedGovernorate} selectedParty={selectedParty} parties={parties} onSelectCandidate={onSelectProfile} user={user} requestLogin={requestLogin} />;
            case AppTab.Debates:
                return <DebatesView selectedGovernorate={selectedGovernorate} selectedParty={selectedParty} />;
            case AppTab.Events:
                return <EventsView selectedGovernorate={selectedGovernorate} selectedParty={selectedParty} />;
            default:
                return null;
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 sm:p-6">
            {/* Main Content Column */}
            <main className="lg:col-span-3">
                 {/* Search Bar - Moved from Header */}
                <div className="w-full max-w-2xl mx-auto">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <SearchIcon className="w-5 h-5 text-theme-text-muted" />
                        </div>
                        <input
                            type="text"
                            placeholder="ابحث عن مرشحين، مواضيع..."
                            className="block w-full text-sm pl-11 pr-4 py-2.5 border rounded-full text-theme-text-base focus:outline-none focus:ring-2 focus:ring-primary font-arabic border-white/20 bg-white/10 placeholder-theme-text-muted"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <HeroSection />
                </div>

                <div className="mt-6">
                    <Stories users={storyCandidates} onSelectProfile={onSelectProfile}/>
                </div>
                
                <MobileFilterBar />

                {/* Non-sticky TopNavBar */}
                <div className="mt-2 z-10 py-2">
                    <TopNavBar<MainContentTab>
                        tabs={[AppTab.Posts, AppTab.Reels, AppTab.Candidates, AppTab.Debates, AppTab.Events]}
                        activeTab={activeTab}
                        onTabChange={onTabChange}
                    />
                </div>
                
                {renderSocialContent()}
            </main>

            {/* Right Sidebar (Desktop) */}
            <aside className="hidden lg:block lg:col-span-1 space-y-6">
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
                                <button onClick={(e) => handleFollow(e, candidate.id)} className="px-3 py-1 text-xs font-semibold rounded-full bg-primary text-on-primary transition-all hover:brightness-110">Follow</button>
                            </div>
                        )) : <p className="text-xs text-theme-text-muted">No candidates to show.</p>}
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