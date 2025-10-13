
import { useState, useEffect } from 'react';
import { Candidate } from '../types.ts';

const generateMockCandidates = (count: number): Candidate[] => {
    const parties = ['Future Alliance', 'Progress Party', 'National Unity', 'Kurdistan Future', 'Independent'];
    return Array.from({ length: count }, (_, i) => ({
        id: `cand-${i + 1}`,
        name: `المرشح ${i + 1}`,
        party: parties[i % parties.length],
        imageUrl: `https://picsum.photos/seed/cand${i + 1}/200/200`,
        verified: Math.random() > 0.3,
    }));
};

const MOCK_CANDIDATES = generateMockCandidates(50);

export const useAllCandidatesData = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                setCandidates(MOCK_CANDIDATES);
            } catch (e) {
                setError(new Error("Failed to load candidate data"));
            } finally {
                setIsLoading(false);
            }
        }, 800); // Simulate network delay

        return () => clearTimeout(timer);
    }, []);

    return { candidates, isLoading, error };
};
