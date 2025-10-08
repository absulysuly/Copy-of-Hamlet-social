// Fix: Populating components/views/CandidatesView.tsx with a list of candidates.
import React, { useState, useEffect } from 'react';
import { Governorate, User, UserRole, GOVERNORATES, GOVERNORATE_AR_MAP } from '../../types.ts';
import CandidatePill from '../CandidatePill.tsx';
import * as api from '../../services/apiService.ts';

interface CandidatesViewProps {
    selectedGovernorate: Governorate | 'All';
    selectedParty: string | 'All';
    parties: string[];
    onSelectCandidate: (candidate: User) => void;
    user: User | null;
    requestLogin: () => void;
}

const CandidatesView: React.FC<CandidatesViewProps> = ({ selectedGovernorate, selectedParty, parties, onSelectCandidate, user, requestLogin }) => {
    const [candidates, setCandidates] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Local state for filters, initialized from global props but managed independently.
    const [localGovernorate, setLocalGovernorate] = useState<Governorate | 'All'>(selectedGovernorate);
    const [localParty, setLocalParty] = useState<string | 'All'>(selectedParty);


    useEffect(() => {
        const fetchCandidates = async () => {
            setIsLoading(true);
            try {
                const users = await api.getUsers({
                    role: UserRole.Candidate,
                    governorate: localGovernorate,
                    party: localParty,
                });
                setCandidates(users);
            } catch (error) {
                console.error("Failed to fetch candidates:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCandidates();
    }, [localGovernorate, localParty]);


    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                <h2 className="text-2xl font-bold font-arabic text-white">المرشحون</h2>
            </div>

            {/* Custom Filters for this View */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 p-3 glass-card mb-6 rounded-lg shadow-lg">
                {/* Governorate Filter */}
                <div className="flex-1 min-w-[150px]">
                    <label htmlFor="gov-filter" className="block text-sm font-medium text-slate-300 font-arabic">المحافظة</label>
                    <select 
                        id="gov-filter"
                        value={localGovernorate}
                        onChange={(e) => setLocalGovernorate(e.target.value as Governorate | 'All')}
                        className="mt-1 block w-full p-2 border border-white/20 rounded-md bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand-hot-pink font-arabic text-right"
                    >
                        <option value="All">كل العراق</option>
                        {GOVERNORATES.map(gov => (
                            <option key={gov} value={gov}>{GOVERNORATE_AR_MAP[gov]}</option>
                        ))}
                    </select>
                </div>
                {/* Party Filter */}
                 <div className="flex-1 min-w-[150px]">
                    <label htmlFor="party-filter" className="block text-sm font-medium text-slate-300 font-arabic">الحزب أو التحالف</label>
                    <select 
                        id="party-filter"
                        value={localParty}
                        onChange={(e) => setLocalParty(e.target.value)}
                        className="mt-1 block w-full p-2 border border-white/20 rounded-md bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand-hot-pink font-arabic text-right"
                    >
                        <option value="All">جميع الأحزاب</option>
                        {parties.map(party => (
                            <option key={party} value={party}>{party}</option>
                        ))}
                    </select>
                </div>
            </div>

             {isLoading ? (
                <p className="text-slate-300 col-span-full text-center mt-8">Loading candidates...</p>
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {candidates.length > 0 ? (
                        candidates.map(candidate => (
                            <CandidatePill 
                                key={candidate.id} 
                                candidate={candidate} 
                                onSelect={onSelectCandidate} 
                                user={user}
                                requestLogin={requestLogin}
                            />
                        ))
                    ) : (
                        <p className="text-slate-300 col-span-full text-center mt-8">لم يتم العثور على مرشحين للفلاتر المحددة.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CandidatesView;