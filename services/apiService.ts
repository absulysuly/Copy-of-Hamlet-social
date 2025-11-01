import { User, UserRole, Post, Event, Article, Debate, Governorate, TeaHouseTopic, TeaHouseMessage, Language, PollingCenter, Question } from '../types';
import { MOCK_USERS, MOCK_POSTS, MOCK_WHISPERS, MOCK_EVENTS, MOCK_ARTICLES, MOCK_DEBATES, MOCK_TEA_HOUSE_TOPICS, MOCK_TEA_HOUSE_MESSAGES, IRAQI_GOVERNORATES_INFO, MOCK_QUESTIONS } from '../constants';
import { Candidate, NewsArticle, PoliticalParty } from '../components/election/types';

// Simulate a more realistic network delay
const simulateFetch = <T>(data: T, delay: number = 300): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(JSON.parse(JSON.stringify(data))), delay));
};

export const getParties = (): Promise<string[]> => {
    const parties = [...new Set(MOCK_USERS.filter(u => u.role === UserRole.Candidate).map(u => u.party))];
    return simulateFetch(parties);
};

export const getCandidateStats = (): Promise<{ total: number; women: number; men: number; }> => {
    const candidates = MOCK_USERS.filter(u => u.role === UserRole.Candidate);
    const women = candidates.filter(c => c.gender === 'Female').length;
    const men = candidates.length - women;
    return simulateFetch({ total: candidates.length, women, men });
};

export const getUsers = (filters: { role?: UserRole, governorate?: Governorate | 'All', party?: string | 'All', gender?: 'Male' | 'Female' | 'All', authorId?: string, partySlug?: string, governorateSlug?: string, query?: string }): Promise<User[]> => {
    let users = MOCK_USERS;
    if (filters.role) {
        users = users.filter(u => u.role === filters.role);
    }
    if (filters.governorate && filters.governorate !== 'All') {
        users = users.filter(u => u.governorate === filters.governorate);
    }
    if (filters.party && filters.party !== 'All') {
        users = users.filter(u => u.party === filters.party);
    }
    if (filters.gender && filters.gender !== 'All') {
        users = users.filter(u => u.gender === filters.gender);
    }
    if (filters.authorId) {
        users = users.filter(u => u.id === filters.authorId);
    }
    if (filters.partySlug) {
        users = users.filter(u => u.partySlug === filters.partySlug);
    }
    if (filters.governorateSlug) {
        users = users.filter(u => u.governorateSlug === filters.governorateSlug);
    }
    if (filters.query) {
        const lowercasedQuery = filters.query.toLowerCase();
        users = users.filter(u => 
            u.name.toLowerCase().includes(lowercasedQuery) ||
            u.party.toLowerCase().includes(lowercasedQuery)
        );
    }
    return simulateFetch(users);
};

export const getPosts = (filters: { type?: 'Post' | 'Reel', authorId?: string, governorate?: Governorate | 'All', party?: string | 'All', query?: string }): Promise<Post[]> => {
    let posts = MOCK_POSTS;
    if (filters.type) {
        posts = posts.filter(p => p.type === filters.type);
    }
    if (filters.authorId) {
        posts = posts.filter(p => p.author.id === filters.authorId);
    }
    if (filters.governorate && filters.governorate !== 'All') {
        posts = posts.filter(p => p.author.governorate === filters.governorate);
    }
    if (filters.party && filters.party !== 'All') {
        posts = posts.filter(p => p.author.party === filters.party);
    }
    if (filters.query) {
        const lowercasedQuery = filters.query.toLowerCase();
        posts = posts.filter(p => 
            p.content.toLowerCase().includes(lowercasedQuery) ||
            p.author.name.toLowerCase().includes(lowercasedQuery)
        );
    }

    const sortedPosts = posts.sort((a, b) => {
        const getTime = (timestamp: string) => {
            if (timestamp.includes('hour')) return parseInt(timestamp) * 60;
            if (timestamp.includes('day')) return parseInt(timestamp) * 60 * 24;
            return 0;
        };
        return getTime(a.timestamp) - getTime(b.timestamp);
    });

    return simulateFetch(sortedPosts);
};

export const getWhispers = (filters: {}): Promise<Post[]> => {
    const sorted = MOCK_WHISPERS.sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp));
    return simulateFetch(sorted);
};

export const getEvents = (filters: { governorate?: Governorate | 'All', party?: string | 'All' }): Promise<Event[]> => {
    let events = MOCK_EVENTS;
    if (filters.governorate && filters.governorate !== 'All') {
        events = events.filter(e => e.organizer.governorate === filters.governorate);
    }
    if (filters.party && filters.party !== 'All') {
        events = events.filter(e => e.organizer.party === filters.party);
    }
    return simulateFetch(events);
};

export const getArticles = (filters: { governorate?: Governorate | 'All' }): Promise<Article[]> => {
    return simulateFetch(MOCK_ARTICLES);
};

export const getDebates = (filters: { governorate?: Governorate | 'All', party?: string | 'All', participantIds?: string[] }): Promise<Debate[]> => {
    let debates = MOCK_DEBATES;
    
    if (filters.governorate && filters.governorate !== 'All') {
        debates = debates.filter(d => d.participants.some(p => p.governorate === filters.governorate));
    }
    if (filters.party && filters.party !== 'All') {
        debates = debates.filter(d => d.participants.some(p => p.party === filters.party));
    }
    if (filters.participantIds && filters.participantIds.length > 0) {
        debates = debates.filter(d => d.participants.some(p => filters.participantIds!.includes(p.id)));
    }

    return simulateFetch(debates);
};

// Fix: Add getQuestions function to provide data for the Ask a Neighbor feature.
export const getQuestions = (): Promise<Question[]> => {
    return simulateFetch(MOCK_QUESTIONS);
};

export const createPost = (postDetails: Partial<Post>, author: User): Promise<Post> => {
    const newPost: Post = {
        id: `post-${Date.now()}`,
        author: author,
        content: postDetails.content || '',
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        shares: 0,
        type: 'Post',
        ...postDetails,
    };
    return simulateFetch(newPost);
};

export const createReel = (details: { caption: string }, author: User): Promise<Post> => {
    const newReel: Post = {
        id: `reel-${Date.now()}`,
        author: author,
        content: details.caption,
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        shares: 0,
        type: 'Reel',
        mediaUrl: 'https://picsum.photos/seed/newreel/400/700'
    };
    return simulateFetch(newReel);
};

export const createEvent = (details: { title: string, date: string, location: string }, organizer: User): Promise<Event> => {
    const newEvent: Event = {
        id: `event-${Date.now()}`,
        organizer: organizer,
        ...details
    };
    return simulateFetch(newEvent);
};

export const socialLogin = (provider: 'google' | 'facebook'): Promise<User> => {
    // Return a mock voter user
    return simulateFetch(MOCK_USERS.find(u => u.role === UserRole.Voter)!);
};


export const registerUser = (details: { name: string; email: string; role: UserRole }): Promise<User> => {
    const newUser: User = {
        id: `user-${Date.now()}`,
        name: details.name,
        role: details.role,
        avatarUrl: `https://i.pravatar.cc/150?u=${Date.now()}`,
        verified: details.role === UserRole.Candidate,
        party: 'Independent',
        governorate: 'Baghdad',
        email: details.email,
        emailVerified: false,
    };
    MOCK_USERS.push(newUser);
    return simulateFetch(newUser);
};


export const checkVerificationStatus = (userId: string): Promise<User | null> => {
    const user = MOCK_USERS.find(u => u.id === userId);
    if (user) {
        // Simulate verification after a delay
        user.emailVerified = true;
    }
    return simulateFetch(user || null);
};

export const resendVerificationEmail = (userId: string): Promise<{ success: boolean }> => {
    return simulateFetch({ success: true });
};

export const updateUser = (userId: string, updates: Partial<User>): Promise<User | null> => {
    const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
    if (userIndex > -1) {
        MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...updates };
        return simulateFetch(MOCK_USERS[userIndex]);
    }
    return simulateFetch(null);
};

export const followCandidate = (candidateId: string): Promise<{ success: boolean }> => {
    console.log(`(Mock API) Followed candidate: ${candidateId}`);
    return simulateFetch({ success: true });
};

export const likePost = (postId: string): Promise<{ success: boolean }> => {
    console.log(`(Mock API) Liked post: ${postId}`);
    return simulateFetch({ success: true });
};

// --- Polling Center Finder API ---
const MOCK_POLLING_DATA = {
    'Baghdad': {
        'Karrada': ['Al-Jadriyah', 'Al-Wihda'],
        'Adhamiyah': ['Hayy Ur', 'Sha\'ab'],
    },
    'Basra': {
        'Basra City': ['Al-Ashar', 'Al-Jubaila'],
        'Al-Zubair': ['Safwan', 'Umm Qasr'],
    }
};

const MOCK_POLLING_CENTERS: PollingCenter[] = [
    { id: 'pc1', name: 'Al-Mansour Primary School', address: '123 Al-Mansour St, Al-Jadriyah, Karrada, Baghdad', centerCode: 'BGH-KRD-001', googleMapsUrl: 'https://maps.google.com' },
    { id: 'pc2', name: 'Basra International High School', address: '456 Corniche St, Al-Ashar, Basra City, Basra', centerCode: 'BSR-BC-001', googleMapsUrl: 'https://maps.google.com' }
];

export const getPollingDistricts = (governorate: Governorate): Promise<string[]> => {
    const districts = MOCK_POLLING_DATA[governorate] ? Object.keys(MOCK_POLLING_DATA[governorate]) : [];
    return simulateFetch(districts, 300);
}

export const getPollingAreas = (governorate: Governorate, district: string): Promise<string[]> => {
    const areas = MOCK_POLLING_DATA[governorate]?.[district] || [];
    return simulateFetch(areas, 300);
}

export const findPollingCenter = (governorate: Governorate, district: string, area: string): Promise<PollingCenter | null> => {
    if (governorate === 'Baghdad' && district === 'Karrada' && area === 'Al-Jadriyah') {
        return simulateFetch(MOCK_POLLING_CENTERS[0], 1000);
    }
    if (governorate === 'Basra' && district === 'Basra City' && area === 'Al-Ashar') {
        return simulateFetch(MOCK_POLLING_CENTERS[1], 1000);
    }
    return simulateFetch(null, 1000);
};


// --- Tea House API ---
export const getTeaHouseTopics = (language: Language): Promise<TeaHouseTopic[]> => {
    return simulateFetch(MOCK_TEA_HOUSE_TOPICS.filter(t => t.language === language));
};

export const getTeaHouseMessages = (topicId: string): Promise<TeaHouseMessage[]> => {
    return simulateFetch(MOCK_TEA_HOUSE_MESSAGES[topicId] || []);
};

export const createTeaHouseTopic = (data: { title: string; firstMessage: string; category: string; language: Language; }): Promise<TeaHouseTopic> => {
    const newTopic: TeaHouseTopic = {
        id: `topic-${Date.now()}`,
        title: data.title,
        lastMessage: data.firstMessage,
        participants: 1,
        lastActivity: 'Just now',
        language: data.language,
        category: data.category,
    };
    MOCK_TEA_HOUSE_TOPICS.unshift(newTopic);
    return simulateFetch(newTopic);
};

// --- Election Portal API ---
export const submitIntegrityReport = async (formData: FormData): Promise<{ success: boolean; trackingId: string }> => {
    console.log("Submitting integrity report with data:", Object.fromEntries(formData));
    return simulateFetch({ success: true, trackingId: `IQ-REP-${Date.now()}` });
};

export const getDashboardStats = (): Promise<any> => {
    return simulateFetch({
        stats: { totalRegisteredVoters: 12500000, approvedCandidatesCount: 7769, expectedTurnoutPercentage: 65 },
        participation: IRAQI_GOVERNORATES_INFO.map(g => ({
            governorateId: g.id,
            governorateName: g.name,
            estimatedTurnout: 40 + Math.random() * 30
        }))
    });
};

export const getGovernorateDataByName = (name: string): Promise<{ governorate: any; candidates: Candidate[]; news: NewsArticle[] }> => {
    const governorate = IRAQI_GOVERNORATES_INFO.find(g => g.enName === name);
    const candidates = MOCK_USERS.filter(u => u.role === UserRole.Candidate && u.governorate === name).slice(0, 12).map(c => ({
        id: c.id, name: c.name, party: c.party, imageUrl: c.avatarUrl, verified: c.verified
    }));
    const news = MOCK_ARTICLES.slice(0, 4).map(a => ({
        id: a.id, title: a.title, summary: a.contentSnippet, date: a.timestamp
    }));
    return simulateFetch({ governorate, candidates, news });
};

export const getPartyById = (id: string): Promise<{ party: PoliticalParty; candidates: Candidate[] }> => {
    // This is a mock; in a real app, you'd fetch the party by its ID.
    const candidates = MOCK_USERS.filter(u => u.role === UserRole.Candidate).slice(0, 8).map(c => ({
        id: c.id, name: c.name, party: c.party, imageUrl: c.avatarUrl, verified: c.verified
    }));
    return simulateFetch({
        party: { id, name: 'Future Alliance', description: 'A forward-thinking party...', leader: 'Dr. Ahmad Al-Jubouri', founded: 2020, logoUrl: '' },
        candidates
    });
};

export const getAllElectionCandidates = (): Promise<Candidate[]> => {
    const candidates = MOCK_USERS.filter(u => u.role === UserRole.Candidate).map(c => ({
        id: c.id, name: c.name, party: c.party, imageUrl: c.avatarUrl, verified: c.verified
    }));
    return simulateFetch(candidates);
};

export const getApiConfig = (): Promise<any[]> => {
    return simulateFetch([
        { id: '1', name: 'Facebook Graph API', status: 'Connected', lastChecked: '2m ago' },
        { id: '2', name: 'X (Twitter) API v2', status: 'Connected', lastChecked: '2m ago' },
        { id: '3', name: 'TikTok Developer API', status: 'Disconnected', lastChecked: '1h ago' },
    ]);
};

export const getDataCollectionStats = (): Promise<any> => {
    return simulateFetch({
        status: 'Running',
        candidatesFound: 1289,
        profilesScraped: 980,
        contactsCollected: 450,
        progress: 76.0,
        log: [
            `[INFO] ${new Date().toLocaleTimeString()} - Found 5 new profiles on Facebook.`,
            `[INFO] ${new Date().toLocaleTimeString()} - Scraped profile for 'Ahmed Al-Maliki'.`,
            `[WARN] ${new Date().toLocaleTimeString()} - Rate limit approaching for X API.`,
            `[INFO] ${new Date().toLocaleTimeString()} - Batch processing complete.`,
        ]
    });
};

const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const getContactValidationData = (): Promise<any[]> => {
     return simulateFetch(MOCK_USERS.slice(0, 10).map(u => ({
        id: u.id,
        contact: `+964 78********${Math.floor(10 + Math.random() * 89)}`,
        type: 'Phone',
        candidate: u.name,
        quality: 60 + Math.random() * 40,
        status: getRandom(['Verified', 'Pending', 'Invalid'])
    })));
};

export const getEnrichmentData = (candidateId: string): Promise<any> => {
    return simulateFetch({
        politicalProfile: 'Leans socially conservative with a focus on economic liberalization. Strong proponent of foreign investment and developing the private sector. Has voted consistently for measures that reduce government spending.',
        influence: { socialReach: 120500, engagementRate: 4.5, sentiment: 'Positive' },
    });
};

export const getQualityAnalyticsData = (): Promise<any> => {
    return simulateFetch({
        overallQuality: { verified: 78, pending: 15, invalid: 7 },
        qualityByGov: IRAQI_GOVERNORATES_INFO.map(g => ({ name: g.name.substring(0, 3), quality: 50 + Math.random() * 50 })).slice(0, 6),
    });
};