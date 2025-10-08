

// --- ENUMS & LITERAL TYPES ---

export enum UserRole {
    Voter = 'Voter',
    Candidate = 'Candidate',
}

export enum AppTab {
    Home = 'Home',
    Discover = 'Discover',
    AskNeighbor = 'Ask a Neighbor',
    DebateRoom = 'Debate Room',
    Settings = 'Settings',
    UserProfile = 'My Profile',
    CandidateProfile = 'Candidate Profile',
    Dashboard = 'Dashboard',
    // For HomeView tabs
    Posts = 'Posts',
    Reels = 'Reels',
    Candidates = 'Candidates',
    Debates = 'Debates',
    Events = 'Events',
}

export type Language = 'en' | 'ar' | 'ku';

export const GOVERNORATES = [
    'Baghdad', 'Basra', 'Nineveh', 'Erbil', 'Anbar', 'Dhi Qar', 'Salah al-Din',
    'Diyala', 'Kirkuk', 'Sulaymaniyah', 'Babil', 'Wasit', 'Maysan', 'Muthanna',
    'Qadisiyyah', 'Najaf', 'Karbala', 'Dohuk'
] as const;

export type Governorate = typeof GOVERNORATES[number];

export const GOVERNORATE_AR_MAP: Record<Governorate, string> = {
    'Baghdad': 'بغداد',
    'Basra': 'البصرة',
    'Nineveh': 'نينوى',
    'Erbil': 'أربيل',
    'Anbar': 'الأنبار',
    'Dhi Qar': 'ذي قار',
    'Salah al-Din': 'صلاح الدين',
    'Diyala': 'ديالى',
    'Kirkuk': 'كركوك',
    'Sulaymaniyah': 'السليمانية',
    'Babil': 'بابل',
    'Wasit': 'واسط',
    'Maysan': 'ميسان',
    'Muthanna': 'المثنى',
    'Qadisiyyah': 'القادسية',
    'Najaf': 'النجف',
    'Karbala': 'كربلاء',
    'Dohuk': 'دهوك',
};

export type MainContentTab = AppTab.Posts | AppTab.Reels | AppTab.Candidates | AppTab.Debates | AppTab.Events;

export type HomeViewMode = 'Social' | 'Election';


// --- INTERFACES ---

export interface User {
    id: string;
    name: string;
    role: UserRole;
    avatarUrl: string;
    verified: boolean;
    party: string;
    governorate: Governorate;
    isElected?: boolean;
    bio?: string;
    partySlug?: string;
    governorateSlug?: string;
}

export interface Post {
    id: string;
    author: User;
    content: string;
    timestamp: string;
    likes: number;
    comments: number;
    shares: number;
    type: 'Post' | 'Reel' | 'VoiceNote';
    mediaUrl?: string;
    isSponsored?: boolean;
    duration?: number; // for voice notes
}

export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    organizer: User;
}

export interface Article {
    id: string;
    title: string;
    source: string;
    timestamp: string;
    authorName: string;
    contentSnippet: string;
    url: string;
}

export interface Debate {
    id: string;
    title: string;
    topic: string;
    scheduledTime: string;
    isLive: boolean;
    participants: User[];
    reactions: {
        justice: number;
        idea: number;
        warning: number;
    };
}