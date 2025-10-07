// TODO: This file simulates a backend API. Replace with actual HTTP calls to the Windsurf backend.

import { MOCK_USERS, MOCK_POSTS, MOCK_EVENTS, MOCK_DEBATES, MOCK_ARTICLES } from '../constants.ts';
import { User, UserRole, Post, Event, Debate, Article, Governorate } from '../types.ts';

const LATENCY = 200; // ms to simulate network delay

// --- DATA FETCHING ---

export const getUsers = async (filters: { role?: UserRole, governorate?: Governorate | 'All' }): Promise<User[]> => {
    console.log('API: getUsers called with', filters);
    return new Promise(resolve => {
        setTimeout(() => {
            let users = MOCK_USERS;
            if (filters.role) {
                users = users.filter(u => u.role === filters.role);
            }
            if (filters.governorate && filters.governorate !== 'All') {
                users = users.filter(u => u.governorate === filters.governorate);
            }
            resolve(users);
        }, LATENCY);
    });
};

export const getPosts = async (filters: { type?: 'Post' | 'Reel', governorate?: Governorate | 'All', authorId?: string }): Promise<Post[]> => {
    console.log('API: getPosts called with', filters);
    return new Promise(resolve => {
        setTimeout(() => {
            let posts = MOCK_POSTS;
            if (filters.type) {
                posts = posts.filter(p => p.type === filters.type);
            }
            if (filters.governorate && filters.governorate !== 'All') {
                posts = posts.filter(p => p.governorates.includes(filters.governorate as Governorate));
            }
            if (filters.authorId) {
                posts = posts.filter(p => p.author.id === filters.authorId);
            }
            resolve([...posts].sort(() => Math.random() - 0.5)); // Simulate dynamic feed
        }, LATENCY);
    });
};

export const getEvents = async (filters: { governorate?: Governorate | 'All' }): Promise<Event[]> => {
    console.log('API: getEvents called with', filters);
    return new Promise(resolve => {
        setTimeout(() => {
            const events = MOCK_EVENTS.filter(event =>
                !filters.governorate || filters.governorate === 'All' || event.governorate === filters.governorate
            );
            resolve(events);
        }, LATENCY);
    });
};

export const getDebates = async (filters: { governorate?: Governorate | 'All', participantIds?: string[] }): Promise<Debate[]> => {
    console.log('API: getDebates called with', filters);
    return new Promise(resolve => {
        setTimeout(() => {
            let debates = MOCK_DEBATES;
            if (filters.governorate && filters.governorate !== 'All') {
                debates = debates.filter(debate =>
                    debate.participants.some(p => p.governorate === filters.governorate)
                );
            }
            if (filters.participantIds && filters.participantIds.length > 0) {
                debates = debates.filter(debate =>
                    debate.participants.some(p => filters.participantIds!.includes(p.id))
                );
            }
            resolve(debates);
        }, LATENCY);
    });
};

export const getArticles = async (filters: { governorate?: Governorate | 'All' }): Promise<Article[]> => {
    console.log('API: getArticles called with', filters);
    return new Promise(resolve => {
        setTimeout(() => {
            const articles = MOCK_ARTICLES.filter(article =>
                !filters.governorate || filters.governorate === 'All' || article.governorates.includes(filters.governorate as Governorate)
            );
            resolve(articles);
        }, LATENCY);
    });
};


// --- AUTHENTICATION ---

export const login = async (role: UserRole): Promise<User | null> => {
    console.log('API: login called with role', role);
    // TODO: Replace with a real authentication API call.
    return new Promise(resolve => {
        setTimeout(() => {
            const userToLogin = MOCK_USERS.find(user => user.role === role);
            resolve(userToLogin || null);
        }, LATENCY);
    });
};


// --- INTERACTIONS (PLACEHOLDERS) ---

export const followCandidate = async (candidateId: string): Promise<{ success: boolean }> => {
    console.log(`API: Follow candidate ${candidateId}`);
    // TODO: Wire up to Windsurf backend
    return Promise.resolve({ success: true });
};

export const likePost = async (postId: string): Promise<{ success: boolean }> => {
    console.log(`API: Like post ${postId}`);
    // TODO: Wire up to Windsurf backend
    return Promise.resolve({ success: true });
};

export const createPost = async (content: string, user: User): Promise<Post> => {
    console.log(`API: Create post with content: "${content}"`);
    // TODO: Wire up to Windsurf backend. This is a mock response.
    const newPost: Post = {
        id: `post-${Date.now()}`,
        author: user,
        timestamp: 'Just now',
        content: content,
        likes: 0,
        comments: 0,
        shares: 0,
        isSponsored: false,
        type: 'Post',
        governorates: [user.governorate],
    };
    return Promise.resolve(newPost);
};

export const createReel = async (details: { caption: string }, user: User): Promise<Post> => {
    console.log(`API: Create reel with caption: "${details.caption}"`);
    // TODO: Wire up to Windsurf backend, handle video file upload. This is a mock response.
     const newReel: Post = {
        id: `reel-${Date.now()}`,
        author: user,
        timestamp: 'Just now',
        content: details.caption,
        mediaUrl: 'https://images.unsplash.com/photo-1599518559222-1b6a71ac337d?w=400', // Placeholder
        likes: 0,
        comments: 0,
        shares: 0,
        isSponsored: false,
        type: 'Reel',
        governorates: [user.governorate],
    };
    return Promise.resolve(newReel);
}

export const createEvent = async (details: { title: string, date: string, location: string }, user: User): Promise<Event> => {
    console.log(`API: Create event:`, details);
    // TODO: Wire up to Windsurf backend. This is a mock response.
    const newEvent: Event = {
        id: `event-${Date.now()}`,
        title: details.title,
        date: new Date(details.date).toISOString(),
        location: details.location,
        organizer: user,
        governorate: user.governorate,
    };
    return Promise.resolve(newEvent);
};
