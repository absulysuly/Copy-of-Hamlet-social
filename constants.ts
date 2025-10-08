import { User, UserRole, Post, Governorate, Event, Article, Debate, GovernorateInfo, TeaHouseTopic, TeaHouseMessage } from './types.ts';

// --- GOVERNORATE DATA (Single Source of Truth) ---
export const IRAQI_GOVERNORATES_INFO: GovernorateInfo[] = [
  { id: 1, name: 'بغداد', enName: 'Baghdad', slug: 'baghdad', region: 'central' },
  { id: 2, name: 'البصرة', enName: 'Basra', slug: 'basra', region: 'south' },
  { id: 3, name: 'نينوى', enName: 'Nineveh', slug: 'ninawa', region: 'north' },
  { id: 4, name: 'أربيل', enName: 'Erbil', slug: 'erbil', region: 'north' },
  { id: 5, name: 'الأنبار', enName: 'Anbar', slug: 'anbar', region: 'west' },
  { id: 6, name: 'ذي قار', enName: 'Dhi Qar', slug: 'dhiqar', region: 'south' },
  { id: 7, name: 'صلاح الدين', enName: 'Salah al-Din', slug: 'salahaddin', region: 'north' },
  { id: 8, name: 'ديالى', enName: 'Diyala', slug: 'diyala', region: 'central' },
  { id: 9, name: 'كركوك', enName: 'Kirkuk', slug: 'kirkuk', region: 'north' },
  { id: 10, name: 'السليمانية', enName: 'Sulaymaniyah', slug: 'sulaymaniyah', region: 'north' },
  { id: 11, name: 'بابل', enName: 'Babil', slug: 'babel', region: 'central' },
  { id: 12, name: 'واسط', enName: 'Wasit', slug: 'wasit', region: 'central' },
  { id: 13, name: 'ميسان', enName: 'Maysan', slug: 'maysan', region: 'south' },
  { id: 14, name: 'المثنى', enName: 'Muthanna', slug: 'muthanna', region: 'south' },
  { id: 15, name: 'القادسية', enName: 'Qadisiyyah', slug: 'qadisiyah', region: 'south' },
  { id: 16, name: 'النجف', enName: 'Najaf', slug: 'najaf', region: 'central' },
  { id: 17, name: 'كربلاء', enName: 'Karbala', slug: 'karbala', region: 'central' },
  { id: 18, name: 'دهوك', enName: 'Dohuk', slug: 'duhok', region: 'north' }
];

// --- Derived Governorate Constants ---
export const GOVERNORATES = IRAQI_GOVERNORATES_INFO.map(g => g.enName);
export const GOVERNORATE_AR_MAP: Record<Governorate, string> = Object.fromEntries(
    IRAQI_GOVERNORATES_INFO.map(g => [g.enName, g.name])
) as Record<Governorate, string>;
export const GOVERNORATE_SLUG_MAP: Record<Governorate, string> = Object.fromEntries(
    IRAQI_GOVERNORATES_INFO.map(g => [g.enName, g.slug])
) as Record<Governorate, string>;

// --- SLUG MAPPINGS ---
export const PARTY_SLUG_MAP: Record<string, string> = {
    'الحزب الاشتراكي الديمقراطي الكوردستاني': 'kurdistan-socialist-democratic-party',
    'الاتحاد الوطني الكوردستاني': 'patriotic-union-of-kurdistan',
    'تيار الموقف الوطني / هه لويست': 'national-position-current',
    'جبهة شعبنا / به روى گه له مان': 'our-peoples-front',
    'الجبهة التركمانية العراقية': 'iraqi-turkmen-front',
    'الحزب الديمقراطي الكوردستاني': 'kurdistan-democratic-party',
    'الاتحاد الإسلامي الكوردستاني': 'kurdistan-islamic-union',
    'جماعة العدل الكوردستانية / العراق': 'kurdistan-justice-group',
    'حراك الجيل الجديد': 'new-generation-movement',
    'حزب العمران': 'umran-party',
    'تحالف الانبار هويتنا': 'anbar-is-our-identity-alliance',
    'تحالف سيادة الوطني - تشريع': 'national-sovereignty-alliance',
    'الانتشار الوطني': 'national-dissemination',
    'حزب تقدم': 'taqadum-party',
    'تحالف عزم العراق / عزم': 'azm-alliance-iraq',
    'القيادة': 'al-qiyada',
    'تحالف التفوق': 'tafawuq-alliance',
    'الجسم الوطني': 'al-jism-al-watani',
    'تحالف قمم': 'qimam-alliance',
    'حركة الصادقون': 'al-sadiqoun-movement',
    'ائتلاف الاعمار والتنمية': 'reconstruction-and-development-coalition',
    'ائتلاف الأساس العراق': 'al-asas-al-iraqi-coalition',
    'التيار الوطني العشائري في العراق': 'national-tribal-current-of-iraq',
    'تجمع الفاو زاخو': 'fao-zakho-gathering',
    'منظمة بدر': 'badr-organization',
    'ابشر يا عراق': 'absher-ya-iraq',
    'تحالف قوى الدولة الوطنية': 'alliance-of-national-state-forces',
    'ائتلاف دولة القانون': 'state-of-law-coalition',
    'التحالف المدني الديمقراطي': 'civil-democratic-alliance',
    'حزب الداعي': 'al-daie-party',
    'تحالف البديل': 'al-badil-alliance',
    'منقذون': 'munqithun',
    'حركة حقوق': 'huqooq-movement',
    'تحالف تصميم': 'tasmeem-alliance',
    'تحالف خدمات': 'khadamat-alliance',
    'حركة سومريون': 'sumeriyon-movement',
    'اشراقة كانون': 'ishraqat-kanoon',
    'تيار قضيتنا': 'qadhiyatuna-current',
    'Independent': 'independent',
};


// Reverse maps for display purposes on discover page
export const SLUG_PARTY_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(PARTY_SLUG_MAP).map(([name, slug]) => [slug, name])
);

export const SLUG_GOVERNORATE_MAP: Record<string, string> = Object.fromEntries(
  IRAQI_GOVERNORATES_INFO.map(g => [g.slug, g.enName])
);

export const MOCK_USERS: User[] = [
    { id: 'user1', name: 'Ahmed Al-Iraqi', role: UserRole.Candidate, avatarUrl: 'https://picsum.photos/seed/user1/150/150', verified: true, party: 'حزب تقدم', governorate: 'Baghdad', isElected: true, bio: 'Striving for a better Baghdad. Focused on infrastructure and youth employment.', partySlug: 'taqadum-party', governorateSlug: 'baghdad' },
    { id: 'user2', name: 'Fatima Al-Basri', role: UserRole.Candidate, avatarUrl: 'https://picsum.photos/seed/user2/150/150', verified: true, party: 'تحالف عزم العراق / عزم', governorate: 'Basra', bio: 'Economist and activist, working to bring economic prosperity to Basra.', partySlug: 'azm-alliance-iraq', governorateSlug: 'basra' },
    { id: 'user3', name: 'Yusuf Al-Mosuli', role: UserRole.Candidate, avatarUrl: 'https://picsum.photos/seed/user3/150/150', verified: false, party: 'ائتلاف دولة القانون', governorate: 'Nineveh', bio: 'Dedicated to rebuilding our communities and fostering unity.', partySlug: 'state-of-law-coalition', governorateSlug: 'ninawa' },
    { id: 'user4', name: 'Layla Al-Erbili', role: UserRole.Candidate, avatarUrl: 'https://picsum.photos/seed/user4/150/150', verified: true, party: 'الحزب الديمقراطي الكوردستاني', governorate: 'Erbil', isElected: false, bio: 'Championing modern education and technology for the next generation.', partySlug: 'kurdistan-democratic-party', governorateSlug: 'erbil' },
    { id: 'user5', name: 'Omar Al-Anbari', role: UserRole.Candidate, avatarUrl: 'https://picsum.photos/seed/user5/150/150', verified: false, party: 'Independent', governorate: 'Anbar', bio: 'An independent voice for the people of Anbar.', partySlug: 'independent', governorateSlug: 'anbar' },
    { id: 'user6', name: 'Zahra Al-Najafi', role: UserRole.Candidate, avatarUrl: 'https://picsum.photos/seed/user6/150/150', verified: false, party: 'تحالف قوى الدولة الوطنية', governorate: 'Najaf', bio: 'Working to improve healthcare and social services.', partySlug: 'alliance-of-national-state-forces', governorateSlug: 'najaf' },
    { id: 'user7', name: 'Amir Al-Sadr', role: UserRole.Candidate, avatarUrl: 'https://picsum.photos/seed/user7/150/150', verified: true, party: 'حركة الصادقون', governorate: 'Basra', bio: 'Leading the movement for a sovereign Iraq.', partySlug: 'al-sadiqoun-movement', governorateSlug: 'basra' },
    { id: 'voter1', name: 'Ali Hussein', role: UserRole.Voter, avatarUrl: 'https://picsum.photos/seed/voter1/150/150', verified: false, party: 'N/A', governorate: 'Baghdad' },
    { id: 'voter2', name: 'Noor Khalid', role: UserRole.Voter, avatarUrl: 'https://picsum.photos/seed/voter2/150/150', verified: false, party: 'N/A', governorate: 'Basra' },
];

export const MOCK_POSTS: Post[] = [
    { id: 'post1', author: MOCK_USERS[0], content: 'Today we inaugurated the new water treatment plant in Sadr City. This is a crucial step towards providing clean water for all residents. #Baghdad #Progress', timestamp: '2 hours ago', likes: 1200, comments: 150, shares: 80, type: 'Post', mediaUrl: 'https://picsum.photos/seed/post1/800/600' },
    { id: 'post2', author: MOCK_USERS[1], content: 'Met with local fishermen in Basra to discuss the challenges they face. Protecting our environment and our local industries is my top priority.', timestamp: '5 hours ago', likes: 850, comments: 95, shares: 45, type: 'Post' },
    { id: 'post3', author: MOCK_USERS[2], content: 'Rebuilding the historic Al-Nuri Mosque is a symbol of our city\'s resilience. We must continue to work together to restore Nineveh\'s heritage.', timestamp: '1 day ago', likes: 2500, comments: 300, shares: 200, type: 'Post', mediaUrl: 'https://picsum.photos/seed/post3/800/600' },
    { id: 'post4', author: MOCK_USERS[3], content: 'Launching a new coding bootcamp for young people in Erbil! Technology is the future, and we must empower our youth with the skills they need to succeed.', timestamp: '2 days ago', likes: 1800, comments: 210, shares: 120, type: 'Post' },
    { id: 'post5', author: MOCK_USERS[0], content: 'Here is a short message for my constituents.', timestamp: '3 days ago', likes: 500, comments: 60, shares: 30, type: 'VoiceNote', duration: 30, mediaUrl: 'https://storage.googleapis.com/smart-campaign-_black-hole-assets/mock-voicenote.mp3' },
    { id: 'reel1', author: MOCK_USERS[1], content: 'A quick tour of the Basra port development project! #Basra #Economy', timestamp: '4 days ago', likes: 3200, comments: 400, shares: 250, type: 'Reel', mediaUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
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

// --- TEA HOUSE MOCK DATA ---
export const MOCK_TEA_HOUSE_TOPICS: TeaHouseTopic[] = [
    { id: 'th1', title: 'نقاش حول أزمة الكهرباء', lastMessage: 'نحتاج حلول جذرية وليس مؤقتة...', participants: 12, lastActivity: '5m ago', category: 'Services', language: 'ar' },
    { id: 'th2', title: 'فرص العمل للشباب في بغداد', lastMessage: 'هل هناك أي مبادرات جديدة؟', participants: 25, lastActivity: '22m ago', category: 'Economy', language: 'ar' },
    { id: 'th3', title: 'Electoral programs for independent candidates', lastMessage: 'How do we evaluate their promises?', participants: 8, lastActivity: '1h ago', category: 'Politics', language: 'en' },
    { id: 'th4', title: 'گفتوگۆ لەسەر هەلی کار', lastMessage: 'چۆن دەتوانین هەلی کاری زیاتر بۆ گەنجان دابین بکەین؟', participants: 5, lastActivity: '3h ago', category: 'Economy', language: 'ku' },
];

export const MOCK_TEA_HOUSE_MESSAGES: TeaHouseMessage[] = [
    { id: 'msg1', author: MOCK_USERS[7], type: 'text', content: 'السلام عليكم. برأيي، المشكلة ليست فقط في الانتاج، بل في شبكات التوزيع القديمة.', timestamp: '10m ago' },
    { id: 'msg2', author: MOCK_USERS[0], type: 'text', content: 'أتفق تماماً. نعمل على خطة لتحديث الشبكة في مناطق محددة كبداية.', timestamp: '8m ago' },
    { id: 'msg3', author: MOCK_USERS[8], type: 'voice', content: 'رسالة صوتية', mediaUrl: 'https://storage.googleapis.com/smart-campaign-_black-hole-assets/mock-voicenote.mp3', timestamp: '7m ago' },
    { id: 'msg4', author: MOCK_USERS[7], type: 'image', content: 'صورة للمحطة الجديدة', mediaUrl: 'https://picsum.photos/seed/powerplant/600/400', timestamp: '5m ago' },
    { id: 'msg5', author: MOCK_USERS[0], type: 'document', content: 'خطة تحديث الشبكة.pdf', mediaUrl: '#', timestamp: '2m ago' },
];