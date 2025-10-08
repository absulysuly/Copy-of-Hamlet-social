import React, { useState, useEffect } from 'react';
import { User, UserRole, GOVERNORATES, GOVERNORATE_AR_MAP } from '../../types.ts';
import * as api from '../../services/apiService.ts';
import PublicDiscoverCandidateCard from '../PublicDiscoverCandidateCard.tsx';
import { SLUG_PARTY_MAP, SLUG_GOVERNORATE_MAP } from '../../constants.ts';

const PublicDiscoverView: React.FC = () => {
    const [candidates, setCandidates] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [partyName, setPartyName] = useState('');
    const [governorateName, setGovernorateName] = useState('');
    const [governorateArName, setGovernorateArName] = useState('');

    useEffect(() => {
        const fetchCandidates = async () => {
            setIsLoading(true);
            try {
                const params = new URLSearchParams(window.location.search);
                const partySlug = params.get('party');
                const govSlug = params.get('gov');

                // Set header text
                const party = partySlug ? SLUG_PARTY_MAP[partySlug] : '';
                const governorate = govSlug ? SLUG_GOVERNORATE_MAP[govSlug] : '';
                setPartyName(party);
                setGovernorateName(governorate);
                
                // Set Arabic name for governorate
                if(governorate && GOVERNORATES.includes(governorate as any)){
                    setGovernorateArName(GOVERNORATE_AR_MAP[governorate as keyof typeof GOVERNORATE_AR_MAP]);
                }

                // Fetch candidates based on slugs
                if (partySlug && govSlug) {
                    const filteredCandidates = await api.getUsers({
                        role: UserRole.Candidate,
                        partySlug,
                        governorateSlug: govSlug,
                    });
                    setCandidates(filteredCandidates);
                }
            } catch (error) {
                console.error("Failed to fetch candidates for discovery:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCandidates();
    }, []);

    const pageTitle = partyName && governorateArName 
        ? `مرشحو ${partyName} في ${governorateArName}`
        : "Discover Candidates";

    return (
        <div className="p-4 sm:p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-4 text-center font-arabic">{pageTitle}</h1>
            <p className="text-center text-slate-200 mb-8">
                Scan a candidate's QR code to see all of their party's candidates running in the same governorate.
            </p>
            {isLoading ? (
                <p className="text-slate-300 text-center mt-8">Loading candidates...</p>
            ) : candidates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {candidates.map(candidate => (
                        <PublicDiscoverCandidateCard 
                            key={candidate.id}
                            candidate={candidate}
                        />
                    ))}
                </div>
            ) : (
                 <p className="text-slate-200 text-center mt-8 glass-card p-8 rounded-lg">
                    No candidates found for this party and governorate combination.
                </p>
            )}
        </div>
    );
};

export default PublicDiscoverView;