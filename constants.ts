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
export const SLUG_GOVERNORATE_MAP: Record<string, Governorate> = Object.fromEntries(
  IRAQI_GOVERNORATES_INFO.map(g => [g.slug, g.enName as Governorate])
);

export const MOCK_USERS: User[] = [
  { id: '4200', name: 'زياد طارق احمد ذرب الحدادي', role: UserRole.Candidate, avatarUrl: 'https://picsum.photos/seed/4200/150/150', verified: true, party: 'الجسم الوطني', governorate: 'Baghdad', bio: 'Candidate for الجسم الوطني' },
  { id: '4201', name: 'عمر حبيب عبدالرزاق حبيب العاني', role: UserRole.Candidate, avatarUrl: 'https://picsum.photos/seed/4201/150/150', verified: true, party: 'الجسم الوطني', governorate: 'Baghdad', bio: 'Candidate for الجسم الوطني' },
  { id: '4202', name: 'صادق صالح حمزه علي الغريري', role: UserRole.Candidate, avatarUrl: 'https://picsum.photos/seed/4202/150/150', verified: true, party: 'الجسم الوطني', governorate: 'Baghdad', bio: 'Candidate for الجسم الوطني' },
];

export const MOCK_POSTS: Post[] = [
  { id: 'post1', author: MOCK_USERS[0], content: 'Today we inaugurated the new water treatment plant in Sadr City. This is a crucial step towards providing clean water for all residents. #Baghdad #Progress', timestamp: '2 hours ago', likes: 1200, comments: 150, shares: 80, type: 'Post', mediaUrl: 'https://picsum.photos/seed/post1/800/600' },
  { id: 'post2', author: MOCK_USERS[1], content: 'Met with local fishermen in Basra to discuss the challenges they face. Protecting our environment and our local industries is my top priority.', timestamp: '5 hours ago', likes: 850, comments: 95, shares: 45, type: 'Post' },
  { id: 'post3', author: MOCK_USERS[2], content: 'Launching a new coding bootcamp for young people in Baghdad! Technology is the future, and we must empower our youth with the skills they need to succeed.', timestamp: '2 days ago', likes: 1800, comments: 210, shares: 120, type: 'Post' },
];

export const MOCK_EVENTS: Event[] = [];

export const MOCK_ARTICLES: Article[] = [];

export const MOCK_DEBATES: Debate[] = [];

// --- TEA HOUSE MOCK DATA ---
export const MOCK_TEA_HOUSE_TOPICS: TeaHouseTopic[] = [];

export const MOCK_TEA_HOUSE_MESSAGES: TeaHouseMessage[] = [];