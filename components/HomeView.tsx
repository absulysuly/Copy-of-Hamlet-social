import React, { useState, useEffect } from 'react';
import { User, UserRole, Governorate, Language, MainContentTab, AppTab, Post, Event, GOVERNORATES, GOVERNORATE_AR_MAP } from '../../types.ts';
import { UI_TEXT } from '../../translations.ts';
import * as api from '../../services/apiService.ts';

import HeroSection from '../HeroSection.tsx';
import Stories from '../Stories.tsx';
import ComposeView from './ComposeView.tsx';
import PostCard from '../PostCard.tsx';
import TopNavBar from '../TopNavBar.tsx';

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
    onSelectCandidate: (candidate: User) => void;
    onSelectReel: (reel: Post) => void;
    language: Language;
    isElectionMode: boolean;
}

const HomeView: React.FC<HomeViewProps> = ({ user, requestLogin, selectedGovernorate, onGovernorateChange, selectedParty, onPartyChange, parties, onSelectCandidate, onSelectReel, language, isElectionMode }) => {
    const [mainTab, setMainTab] = useState<MainContentTab>(AppTab.Posts);
    
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
    const texts = UI_TEXT[language];
    
    const MobileFilterBar = () => (
        <div className="sm:hidden flex gap-4 p-3 bg-black/20 backdrop-blur-sm my-4 rounded-lg border border-white/20">
            {/* Governorate Filter */}
            <div className="flex-1">
                <label htmlFor="mobile-gov-filter" className="block text-xs font-medium text-slate-300 font-arabic">المحافظة</label>
                <select 
                    id="mobile-gov-filter"
                    value={selectedGovernorate}
                    onChange={(e) => onGovernorateChange(e.target.value as Governorate | 'All')}
                    className="mt-1 block w-full p-1.5 border border-white/20 rounded-md bg-white/20 text-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-neon-purple font-arabic text-right"
                >
                    <option value="All">كل العراق</option>
                    {GOVERNORATES.map(gov => (
                        <option key={gov} value={gov}>{GOVERNORATE_AR_MAP[gov]}</option>
                    ))}
                </select>
            </div>
            {/* Party Filter */}
            <div className="flex-1">
                <label htmlFor="mobile-party-filter" className="block text-xs font-medium text-slate-300 font-arabic">الحزب</label>
                <select 
                    id="mobile-party-filter"
                    value={selectedParty}
                    onChange={(e) => onPartyChange(e.target.value)}
                    className="mt-1 block w-full p-1.5 border border-white/20 rounded-md bg-white/20 text-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-neon-purple font-arabic text-right"
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
            return <div className="text-center py-10 text-slate-200">Loading...</div>;
        }

        switch (mainTab) {
            case AppTab.Posts:
                const composer = user?.role === UserRole.Candidate ? <ComposeView user={user} onPost={handlePost} /> : null;
                return (
                     <div className="mt-4">
                        {composer && <div className="mb-4">{composer}</div>}
                        {socialPosts.length > 0 
                            ? socialPosts.map(post => <PostCard key={post.id} post={post} user={user} requestLogin={requestLogin} language={language} />)
                            : <p className="text-center py-10 text-slate-300">No posts found for the selected filters.</p>
                        }
                    </div>
                );
            case AppTab.Reels:
                return <ReelsView selectedGovernorate={selectedGovernorate} selectedParty={selectedParty} onSelectReel={onSelectReel} user={user} requestLogin={requestLogin} />;
            case AppTab.Candidates:
                return <CandidatesView selectedGovernorate={selectedGovernorate} selectedParty={selectedParty} parties={parties} onSelectCandidate={onSelectCandidate} user={user} requestLogin={requestLogin} />;
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
                <div className="mt-4">
                    <HeroSection />
                </div>
                
                <div className="mt-4">
                    <Stories users={candidates} />
                </div>
                
                <MobileFilterBar />

                <div className="mt-2 sticky top-28 bg-transparent z-20 py-2 -my-2 backdrop-blur-sm">
                    <TopNavBar<MainContentTab>
                        tabs={[AppTab.Posts, AppTab.Reels, AppTab.Candidates, AppTab.Debates, AppTab.Events]}
                        activeTab={mainTab}
                        onTabChange={setMainTab}
                        isElectionMode={false}
                    />
                </div>
                
                {renderSocialContent()}
            </main>

            {/* Right Sidebar (Desktop) */}
            <aside className={`hidden lg:block lg:col-span-1 space-y-6 text-white`}>
                <div className="glass-card rounded-lg p-4">
                    <h3 className="font-bold mb-3 font-arabic">{texts.whoToFollow}</h3>
                    <div className="space-y-3">
                        {candidatesToFollow.length > 0 ? candidatesToFollow.map(candidate => (
                            <div key={candidate.id} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectCandidate(candidate)}>
                                    <img src={candidate.avatarUrl} alt={candidate.name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-sm">{candidate.name}</p>
                                        <p className="text-xs text-slate-400">{candidate.party}</p>
                                    </div>
                                </div>
                                <button onClick={(e) => handleFollow(e, candidate.id)} className="px-3 py-1 text-xs font-semibold rounded-full bg-brand-neon-purple text-white transition-all hover:brightness-110">Follow</button>
                            </div>
                        )) : <p className="text-xs text-slate-400">No candidates to show.</p>}
                    </div>
                </div>

                <div className="glass-card rounded-lg p-4">
                    <h3 className="font-bold mb-3 font-arabic">{texts.platformRules}</h3>
                    <ul className="text-sm space-y-2 list-disc list-inside text-slate-300 font-arabic">
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