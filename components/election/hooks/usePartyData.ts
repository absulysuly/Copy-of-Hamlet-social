import { useState, useEffect } from 'react';
import { Candidate, PoliticalParty } from '../types.ts';

const MOCK_PARTIES: PoliticalParty[] = [
    { id: '1', name: 'Future Alliance', description: 'A forward-thinking party focused on technology and youth.', leader: 'Ahmed Al-Iraqi', founded: 2020, logoUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?Text=FA' },
    { id: '2', name: 'Progress Party', description: 'Dedicated to economic growth and infrastructure.', leader: 'Fatima Al-Basri', founded: 2018, logoUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=PP' },
];

const MOCK_CANDIDATES: Candidate[] = [
    { id: 'cand-1', name: 'Candidate One', party: 'Future Alliance', imageUrl: `https://picsum.photos/seed/cand1/200/200`, verified: true },
    { id: 'cand-2', name: 'Candidate Two', party: 'Future Alliance', imageUrl: `https://picsum.photos/seed/cand2/200/200`, verified: false },
    { id: 'cand-3', name: 'Candidate Three', party: 'Progress Party', imageUrl: `https://picsum.photos/seed/cand3/200/200`, verified: true },
];

export const usePartyData = (id: string | undefined) => {
    const [data, setData] = useState<{ party: PoliticalParty; candidates: Candidate[] } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            const party = MOCK_PARTIES.find(p => p.id === id);

            if (party) {
                setData({
                    party,
                    candidates: MOCK_CANDIDATES.filter(c => c.party === party.name),
                });
            } else {
                setError(new Error('Party not found.'));
            }
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [id]);

    return { data, isLoading, error };
};
