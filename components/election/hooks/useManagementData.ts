import { useState, useEffect } from 'react';
// Fix: Corrected import path and variable name to use IRAQI_GOVERNORATES_INFO from the root constants file.
import { IRAQI_GOVERNORATES_INFO } from '../../../constants.ts';

// --- MOCK DATA ---
const MOCK_API_CONFIG = [
    { id: 'facebook', name: 'Facebook Graph API', status: 'Connected', lastChecked: '2 minutes ago' },
    { id: 'twitter', name: 'X (Twitter) API v2', status: 'Disconnected', lastChecked: '1 hour ago' },
    { id: 'instagram', name: 'Instagram Basic Display API', status: 'Connected', lastChecked: '5 minutes ago' },
];

const MOCK_COLLECTION_STATS = {
    status: 'Running',
    candidatesFound: 1843,
    profilesScraped: 1512,
    contactsCollected: 987,
    progress: 82,
    log: [
        'INFO: Scraped profile for Ahmed Al-Iraqi.',
        'WARN: Could not find contact info for Fatima Al-Basri.',
        'INFO: Found 3 new candidates in Baghdad.',
        'ERROR: Twitter API rate limit exceeded. Pausing for 15 minutes.',
        'INFO: Collection process started.',
    ]
};

const MOCK_CONTACTS = Array.from({ length: 25 }, (_, i) => ({
    id: `c${i}`,
    contact: i % 2 === 0 ? `+964 780 123 45${String(i).padStart(2, '0')}` : `candidate${i}@email.com`,
    type: i % 2 === 0 ? 'Phone' : 'Email',
    candidate: `Candidate ${i}`,
    quality: Math.floor(Math.random() * (98 - 65 + 1) + 65),
    status: ['Verified', 'Invalid', 'Pending'][i % 3],
}));

const MOCK_ENRICHMENT_DATA = {
    'user1': {
        politicalProfile: 'Ahmed Al-Iraqi is a seasoned politician with a strong focus on economic reform and infrastructure development. His platform prioritizes job creation for youth and modernizing public services in Baghdad.',
        demographics: { age: 45, region: 'Central Iraq', education: 'M.Sc. Civil Engineering' },
        influence: { socialReach: 125000, engagementRate: 4.2, sentiment: 78 }
    }
};

const MOCK_ANALYTICS = {
    overallQuality: { verified: 72, pending: 18, invalid: 10 },
    // Fix: Use the correctly imported IRAQI_GOVERNORATES_INFO.
    qualityByGov: IRAQI_GOVERNORATES_INFO.map(g => ({ name: g.name.substring(0, 6), quality: Math.floor(Math.random() * (95 - 70 + 1) + 70) })),
};


// --- HOOKS ---
const useMockData = (data: any, delay = 500) => {
    const [state, setState] = useState<{ data: any, isLoading: boolean }>({ data: null, isLoading: true });
    useEffect(() => {
        const timer = setTimeout(() => setState({ data, isLoading: false }), delay);
        return () => clearTimeout(timer);
    }, [data]);
    return state;
};

export const useApiConfig = () => useMockData(MOCK_API_CONFIG);

export const useDataCollection = () => {
    const [stats, setStats] = useState(MOCK_COLLECTION_STATS);
    // Simulate real-time updates for demo
    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                profilesScraped: prev.profilesScraped + 1,
                contactsCollected: prev.contactsCollected + (Math.random() > 0.5 ? 1 : 0),
                progress: Math.min(100, prev.profilesScraped / (prev.candidatesFound * 1.1) * 100),
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    return { data: stats, isLoading: false };
};

export const useContactValidationData = () => useMockData(MOCK_CONTACTS);

export const useEnrichmentData = () => useMockData(MOCK_ENRICHMENT_DATA);

export const useQualityAnalyticsData = () => useMockData(MOCK_ANALYTICS);