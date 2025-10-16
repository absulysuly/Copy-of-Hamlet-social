import { User, UserRole, Post, Event, Article, Debate, Governorate } from '../types.ts';
import { MOCK_USERS, MOCK_POSTS, MOCK_EVENTS, MOCK_ARTICLES, MOCK_DEBATES } from '../constants.ts';

// --- MOCK API Service ---
// This service simulates a backend API by returning mock data.
// It uses setTimeout to mimic network latency.

const MOCK_LATENCY = 300; // ms

const simulateFetch = <T>(data: T): Promise<T> => {
    return new Promise(resolve => {
        setTimeout(() => {
            // Deep copy to prevent mutation issues with original mock data
            resolve(JSON.parse(JSON.stringify(data)));
        }, MOCK_LATENCY);
    });
};

export const getParties = (): Promise<string[]> => {
    const parties = [...new Set(MOCK_USERS.filter(u => u.role === UserRole.Candidate && u.party).map(u => u.party))];
    return simulateFetch(parties);
};

export const getUsers = (filters: { role?: UserRole, governorate?: Governorate | 'All', party?: string | 'All', authorId?: string, partySlug?: string, governorateSlug?: string, gender?: 'All' | 'Male' | 'Female' }): Promise<User[]> => {
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
    if (filters.authorId) {
        users = users.filter(u => u.id === filters.authorId);
    }
    if (filters.partySlug) {
        users = users.filter(u => u.partySlug === filters.partySlug);
    }
     if (filters.governorateSlug) {
        users = users.filter(u => u.governorateSlug === filters.governorateSlug);
    }
    if (filters.gender && filters.gender !== 'All') {
        // For now, we'll simulate gender filtering based on candidate names
        // In real implementation, this would come from the database
        users = users.filter(u => {
            // Simple heuristic: if name contains certain patterns, assume gender
            const name = u.name.toLowerCase();
            if (filters.gender === 'Female') {
                return name.includes('زينب') || name.includes('فاطمة') || name.includes('عائشة') || 
                       name.includes('مريم') || name.includes('خديجة') || name.includes('نور') ||
                       name.includes('لينا') || name.includes('رنا') || name.includes('هند');
            } else if (filters.gender === 'Male') {
                return !(name.includes('زينب') || name.includes('فاطمة') || name.includes('عائشة') || 
                        name.includes('مريم') || name.includes('خديجة') || name.includes('نور') ||
                        name.includes('لينا') || name.includes('رنا') || name.includes('هند'));
            }
            return true;
        });
    }

    return simulateFetch(users);
};

export const getPosts = (filters: { type?: 'Post' | 'Reel' | 'VoiceNote', authorId?: string, governorate?: Governorate | 'All', party?: string | 'All' }): Promise<Post[]> => {
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

    // Simulate server-side sorting by timestamp
    const sortedPosts = posts.sort((a, b) => {
        // A simple time ago parser for sorting
        const getTime = (timestamp: string) => {
            if (timestamp.includes('hour')) return parseInt(timestamp) * 60;
            if (timestamp.includes('day')) return parseInt(timestamp) * 60 * 24;
            return 0;
        };
        return getTime(a.timestamp) - getTime(b.timestamp);
    });

    return simulateFetch(sortedPosts);
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
    // Mock doesn't filter by governorate for articles, returning all.
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
    // The UI will optimistically update with this returned post.
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

export const login = (role: UserRole): Promise<User | null> => {
    // Log in as the first user found with the selected role
    const userToLogin = MOCK_USERS.find(u => u.role === role);
    return simulateFetch(userToLogin || null);
};

export const registerUser = (details: { name: string; email: string; dob: string; role: UserRole }): Promise<User> => {
    console.log("(Mock API) Registering new user:", details);
    const newUser: User = {
        id: `user-${Date.now()}`,
        name: details.name,
        role: details.role,
        avatarUrl: `https://picsum.photos/seed/user${Date.now()}/150/150`,
        verified: false,
        party: details.role === UserRole.Candidate ? 'Independent' : 'N/A',
        governorate: 'Baghdad', // Default for new users
        bio: `A new ${details.role} on the platform.`,
    };
    return simulateFetch(newUser);
};


export const updateUser = (userId: string, updates: Partial<User>): Promise<User | null> => {
    const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
    if (userIndex === -1) return simulateFetch(null);
    
    // NOTE: This doesn't actually mutate the constant, but simulates the return value.
    const updatedUser = { ...MOCK_USERS[userIndex], ...updates };
    return simulateFetch(updatedUser);
};

export const followCandidate = (candidateId: string): Promise<{ success: boolean }> => {
    console.log(`(Mock API) Followed candidate: ${candidateId}`);
    return simulateFetch({ success: true });
};

export const likePost = (postId: string): Promise<{ success: boolean }> => {
    console.log(`(Mock API) Liked post: ${postId}`);
    return simulateFetch({ success: true });
};

export const uploadVoiceNote = async (audioBlob: Blob): Promise<{ success: boolean; url: string }> => {
    console.log('(Mock API) Uploading voice note:', audioBlob);
    // Create a temporary URL for playback in the UI
    const url = URL.createObjectURL(audioBlob);
    return simulateFetch({ success: true, url: url });
};