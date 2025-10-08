import { User, UserRole, Post, Event, Article, Debate, Governorate } from '../types.ts';
import { MOCK_USERS, MOCK_POSTS, MOCK_EVENTS, MOCK_ARTICLES, MOCK_DEBATES } from '../constants.ts';

// --- SIMULATE API LATENCY ---
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// --- API FUNCTIONS ---

export const getParties = async (): Promise<string[]> => {
    await delay(100);
    return [...new Set(MOCK_USERS.filter(u => u.role === UserRole.Candidate && u.party !== 'Independent').map(u => u.party))];
};

export const getUsers = async (filters: { role?: UserRole, governorate?: Governorate | 'All', party?: string | 'All', partySlug?: string, governorateSlug?: string }): Promise<User[]> => {
    await delay(300);
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
    if (filters.partySlug) {
        users = users.filter(u => u.partySlug === filters.partySlug);
    }
     if (filters.governorateSlug) {
        users = users.filter(u => u.governorateSlug === filters.governorateSlug);
    }

    return users;
};


export const getPosts = async (filters: { type?: 'Post' | 'Reel' | 'VoiceNote', authorId?: string, governorate?: Governorate | 'All', party?: string | 'All' }): Promise<Post[]> => {
    await delay(500);
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
    return [...posts].sort(() => Math.random() - 0.5); // Randomize for demo
};

export const getEvents = async (filters: { governorate?: Governorate | 'All', party?: string | 'All' }): Promise<Event[]> => {
    await delay(400);
    let events = MOCK_EVENTS;
    if (filters.governorate && filters.governorate !== 'All') {
        events = events.filter(e => e.organizer.governorate === filters.governorate);
    }
    if (filters.party && filters.party !== 'All') {
        events = events.filter(e => e.organizer.party === filters.party);
    }
    return events;
}

export const getArticles = async (filters: { governorate?: Governorate | 'All' }): Promise<Article[]> => {
    await delay(600);
    // Filtering by governorate is not supported by mock data, returning all
    return MOCK_ARTICLES;
}

export const getDebates = async (filters: { governorate?: Governorate | 'All', party?: string | 'All', participantIds?: string[] }): Promise<Debate[]> => {
    await delay(450);
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
    return debates;
}


export const createPost = async (postDetails: Partial<Post>, author: User): Promise<Post> => {
    await delay(200);
    const newPost: Post = {
        id: `post${Date.now()}`,
        author: author,
        content: postDetails.content || '',
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        shares: 0,
        type: postDetails.type || 'Post',
        ...postDetails
    };
    MOCK_POSTS.unshift(newPost);
    return newPost;
};

export const createReel = async (details: { caption: string }, author: User): Promise<Post> => {
    await delay(200);
    const newReel: Post = {
        id: `reel${Date.now()}`,
        author: author,
        content: details.caption,
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        shares: 0,
        type: 'Reel',
        mediaUrl: `https://picsum.photos/seed/newReel${Date.now()}/400/700`,
    };
    MOCK_POSTS.unshift(newReel);
    return newReel;
};

export const createEvent = async (details: { title: string, date: string, location: string }, organizer: User): Promise<Event> => {
    await delay(200);
    const newEvent: Event = {
        id: `event${Date.now()}`,
        title: details.title,
        date: details.date,
        location: details.location,
        organizer: organizer,
    };
    MOCK_EVENTS.unshift(newEvent);
    return newEvent;
};


export const login = async (role: UserRole): Promise<User | null> => {
    await delay(100);
    if (role === UserRole.Voter) {
        return MOCK_USERS.find(u => u.id === 'voter1') || null;
    }
    if (role === UserRole.Candidate) {
        return MOCK_USERS.find(u => u.id === 'user1') || null;
    }
    return null;
};

export const updateUser = async (userId: string, updates: Partial<User>): Promise<User | null> => {
    await delay(150);
    const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
    if (userIndex > -1) {
        MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...updates };
        return MOCK_USERS[userIndex];
    }
    return null;
};


export const followCandidate = async (candidateId: string): Promise<{ success: boolean }> => {
    await delay(100);
    console.log(`User followed candidate with id: ${candidateId}`);
    return { success: true };
};

export const likePost = async (postId: string): Promise<{ success: boolean }> => {
    await delay(50);
    const post = MOCK_POSTS.find(p => p.id === postId);
    if (post) {
        post.likes += 1;
    }
    console.log(`Liked post with id: ${postId}`);
    return { success: true };
};
