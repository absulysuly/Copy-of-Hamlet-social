import { useState, useEffect } from 'react';
import { IRAQ_GOVERNORATES } from '../constants.ts';

const MOCK_DATA = {
    stats: {
        totalRegisteredVoters: 18543210,
        expectedTurnoutPercentage: 43.5,
        turnoutChangeLastWeek: 1.2,
        approvedCandidatesCount: 3249,
        verifiedViolationsCount: 187,
        newViolationsChangeLastWeek: 5.1,
        greenCampaignImpact: {
            treesSaved: 15,
            paperPostersSaved: 1250,
            co2EmissionsReducedKg: 45,
        },
        candidateDistribution: {
            men: { count: 2310, percentage: 71.1 },
            women: { count: 939, percentage: 28.9 },
        },
    },
    participation: IRAQ_GOVERNORATES.map(gov => ({
        governorateId: gov.id,
        governorateName: gov.name,
        estimatedTurnout: Math.floor(Math.random() * (65 - 30 + 1) + 30),
    })).sort((a, b) => b.estimatedTurnout - a.estimatedTurnout),
};


export const useDashboardData = () => {
    const [data, setData] = useState<typeof MOCK_DATA | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                setData(MOCK_DATA);
            } catch (e) {
                setError(new Error("Failed to load mock data"));
            } finally {
                setIsLoading(false);
            }
        }, 1000); // Simulate network delay

        return () => clearTimeout(timer);
    }, []);

    return { data, isLoading, error };
};
