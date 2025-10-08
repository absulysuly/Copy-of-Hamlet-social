import { User, UserRole, Post, Governorate, Event, Article, Debate } from './types.ts';

// --- SLUG MAPPINGS ---
export const PARTY_SLUG_MAP: Record<string, string> = {
    'Future Alliance': 'future-alliance',
    'Progress Party': 'progress-party',
    'National Unity': 'national-unity',
    'Kurdistan Future': 'kurdistan-future',
    'Independent': 'independent',
};

export const GOVERNORATE_SLUG_MAP: Record<Governorate, string> = {
    'Baghdad': 'baghdad',
    'Basra': 'basra',
    'Nineveh': 'nineveh',
    'Erbil': 'erbil',
    'Anbar': 'anbar',
    'Dhi Qar': 'dhi-qar',
    'Salah al-Din': 'salah-al-din',
    'Diyala': 'diyala',
    'Kirkuk': 'kirkuk',
    'Sulaymaniyah': 'sulaymaniyah',
    'Babil': 'babil',
    'Wasit': 'wasit',
    'Maysan': 'maysan',
    'Muthanna': 'muthanna',
    'Qadisiyyah': 'qadisiyyah',
    'Najaf': 'najaf',
    'Karbala': 'karbala',
    'Dohuk': 'dohuk',
};

// Reverse maps for display purposes on discover page
export const SLUG_PARTY_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(PARTY_SLUG_MAP).map(([name, slug]) => [slug, name])
);

export const SLUG_GOVERNORATE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(GOVERNORATE_SLUG_MAP).map(([name, slug]) => [slug, name])
);


export const MOCK_USERS: User[] = [
    { id: 'user1', name: 'Ahmed Al-Iraqi', role: UserRole.Candidate, avatarUrl: 'https://picsum.photos/seed/user1/150/150', verified: true, party: 'Future Alliance', governorate: 'Baghdad', isElected: false, bio: 'Striving for a better Baghdad. Focused on infrastructure and youth employment.', partySlug: 'future-alliance', governorateSlug: 'baghdad' },
    { id: 'user2', name: 'Fatima Al-Basri', role: UserRole.Candidate, avatarUrl: 'https://picsum.photos/seed/user2/150/150', verified: true, party: 'Progress Party', governorate: 'Basra', bio: 'Economist and activist, working to bring economic prosperity to Basra.', partySlug: 'progress-party', governorateSlug: 'basra' },
    { id: 'user3', name: 'Yusuf Al-Mosuli', role: UserRole.Candidate, avatarUrl: 'https://picsum.photos/seed/user3/150/150', verified: false, party: 'National Unity', governorate: 'Nineveh', bio: 'Dedicated to rebuilding our communities and fostering unity.', partySlug: 'national-unity', governorateSlug: 'nineveh' },
    { id: 'user4', name: 'Layla Al-Erbili', role: UserRole.Candidate, avatarUrl: 'https://picsum.photos/seed/user4/150/150', verified: true, party: 'Kurdistan Future', governorate: 'Erbil', isElected: false, bio: 'Championing modern education and technology for the next generation.', partySlug: 'kurdistan-future', governorateSlug: 'erbil' },
    { id: 'user5', name: 'Omar Al-Anbari', role: UserRole.Candidate, avatarUrl: 'https://picsum.photos/seed/user5/150/150', verified: false, party: 'Independent', governorate: 'Anbar', bio: 'An independent voice for the people of Anbar.', partySlug: 'independent', governorateSlug: 'anbar'},
    { id: 'user6', name: 'Zahra Al-Najafi', role: UserRole.Candidate, avatarUrl: 'https://picsum.photos/seed/user6/150/150', verified: false, party: 'Progress Party', governorate: 'Najaf', bio: 'Working to improve healthcare and social services.', partySlug: 'progress-party', governorateSlug: 'najaf'},
    { id: 'voter1', name: 'Ali Hussein', role: UserRole.Voter, avatarUrl: 'https://picsum.photos/seed/voter1/150/150', verified: false, party: 'N/A', governorate: 'Baghdad' },
    { id: 'voter2', name: 'Noor Khalid', role: UserRole.Voter, avatarUrl: 'https://picsum.photos/seed/voter2/150/150', verified: false, party: 'N/A', governorate: 'Basra' },
];

export const MOCK_POSTS: Post[] = [
    { id: 'post1', author: MOCK_USERS[0], content: 'Today we inaugurated the new water treatment plant in Sadr City. This is a crucial step towards providing clean water for all residents. #Baghdad #Progress', timestamp: '2 hours ago', likes: 1200, comments: 150, shares: 80, type: 'Post', mediaUrl: 'https://picsum.photos/seed/post1/800/600', isSponsored: true },
    { id: 'post2', author: MOCK_USERS[1], content: 'Met with local fishermen in Basra to discuss the challenges they face. Protecting our environment and our local industries is my top priority.', timestamp: '5 hours ago', likes: 850, comments: 95, shares: 45, type: 'Post' },
    { id: 'post3', author: MOCK_USERS[2], content: 'Rebuilding the historic Al-Nuri Mosque is a symbol of our city\'s resilience. We must continue to work together to restore Nineveh\'s heritage.', timestamp: '1 day ago', likes: 2500, comments: 300, shares: 200, type: 'Post', mediaUrl: 'https://picsum.photos/seed/post3/800/600' },
    { id: 'post4', author: MOCK_USERS[3], content: 'Launching a new coding bootcamp for young people in Erbil! Technology is the future, and we must empower our youth with the skills they need to succeed.', timestamp: '2 days ago', likes: 1800, comments: 210, shares: 120, type: 'Post' },
    { id: 'post5', author: MOCK_USERS[0], content: 'Here is a short message for my constituents.', timestamp: '3 days ago', likes: 500, comments: 60, shares: 30, type: 'VoiceNote', duration: 30 },
    { id: 'reel1', author: MOCK_USERS[1], content: 'A quick tour of the Basra port development project! #Basra #Economy', timestamp: '4 days ago', likes: 3200, comments: 400, shares: 250, type: 'Reel', mediaUrl: 'https://picsum.photos/seed/reel1/400/700' },
];

export const MOCK_EVENTS: Event[] = [
    { id: 'event1', title: 'Town Hall with Ahmed Al-Iraqi', date: '2024-08-15T18:00:00', location: 'Baghdad Community Hall', organizer: MOCK_USERS[0] },
    { id: 'event2', title: 'Economic Forum on Basra\'s Future', date: '2024-08-20T10:00:00', location: 'Basra Chamber of Commerce', organizer: MOCK_USERS[1] },
    { id: 'event3', title: 'Youth Empowerment Summit', date: '2024-08-22T11:00:00', location: 'Erbil International Fair', organizer: MOCK_USERS[3] },
];

export const MOCK_ARTICLES: Article[] = [
    { id: 'article1', title: 'Parliament Debates New Infrastructure Bill', source: 'Al-Sabah Newspaper', timestamp: 'July 28, 2024', authorName: 'Mustafa Adel', contentSnippet: 'Lawmakers gathered this week to discuss a landmark bill aimed at funding major infrastructure projects across the country, with a focus on electricity and water services...', url: '#' },
    { id: 'article2', title: 'Election Commission Announces Key Dates', source: 'Iraq News Agency', timestamp: 'July 27, 2024', authorName: 'Sarah Mahmoud', contentSnippet: 'The Independent High Electoral Commission has released the official timetable for the upcoming parliamentary elections, urging all citizens to register and participate...', url: '#' },
];

export const MOCK_DEBATES: Debate[] = [
    { id: 'debate1', title: 'The Future of Iraq\'s Economy', topic: 'Economic Policy and Diversification', scheduledTime: '2024-09-01T20:00:00', isLive: true, participants: [MOCK_USERS[0], MOCK_USERS[1]], reactions: { justice: 120, idea: 345, warning: 50 } },
    { id: 'debate2', title: 'Healthcare Reform Debate', topic: 'Improving Public Health Services', scheduledTime: '2024-09-05T20:00:00', isLive: false, participants: [MOCK_USERS[2], MOCK_USERS[3], MOCK_USERS[5]], reactions: { justice: 88, idea: 210, warning: 95 } },
];