import { Language } from './types.ts';

type Translations = {
    [key in Language]: {
        appName: string;
        social: string;
        serious: string;
        whoToFollow: string;
        platformRules: string;
        rule1: string;
        rule2: string;
        rule3: string;
        rule4: string;
        welcomeToApp: string;
        chooseYourRole: string;
        iAmVoter: string;
        voterDescription: string;
        iAmCandidate: string;
        candidateDescription: string;
        navigate: string;
        teaHouse: string;
        teaHouseFooter: string;
        register: string;
        fullName: string;
        dateOfBirth: string;
        emailAddress: string;
        createAccount: string;
        registerAsVoter: string;
        registerAsCandidate: string;
        back: string;
        saveDraft: string;
        preview: string;
        privacy: string;
        public: string;
        friends: string;
        private: string;
    }
}

export const UI_TEXT: Translations = {
    en: {
        appName: 'Smart Campaign',
        social: 'Social Interaction',
        serious: 'Election Management',
        whoToFollow: 'Who to follow',
        platformRules: 'Platform Rules',
        rule1: 'Be respectful to others.',
        rule2: 'No hate speech or harassment.',
        rule3: 'Verify information before sharing.',
        rule4: 'Engage in constructive dialogue.',
        welcomeToApp: 'Welcome to {appName}',
        chooseYourRole: 'Choose your role to get started.',
        iAmVoter: 'I am a Voter',
        voterDescription: 'Follow candidates, join debates, and stay informed.',
        iAmCandidate: 'I am a Candidate',
        candidateDescription: 'Create posts, share your message, and engage with voters.',
        navigate: 'Navigate',
        teaHouse: 'Tea House',
        teaHouseFooter: "People's Diwaniya",
        register: 'Register',
        fullName: 'Full Name',
        dateOfBirth: 'Date of Birth',
        emailAddress: 'Email Address',
        createAccount: 'Create Account',
        registerAsVoter: 'Register as a Voter',
        registerAsCandidate: 'Register as a Candidate',
        back: 'Back',
        saveDraft: 'Save Draft',
        preview: 'Preview',
        privacy: 'Privacy',
        public: 'Public',
        friends: 'Friends',
        private: 'Private',
    },
    ku: {
        appName: 'هەڵمەتی زیرەک',
        social: 'کارلێکی کۆمەڵایەتی',
        serious: 'بەڕێوەبردنی هەڵبژاردن',
        whoToFollow: 'کێ فۆڵۆ بکەیت',
        platformRules: 'ڕێنماییەکان',
        rule1: 'ڕێز لە کەسانی تر بگرە.',
        rule2: 'دووربە لە وتاری ڕق و گێچەڵی ئەلکترۆni.',
        rule3: 'پێش بڵاوکردنەوە، لە ڕاستی زانیارییەکان دڵنیابە.',
        rule4: 'بەشداری بکە لە گفتوگۆی بنیاتنەرانە.',
        welcomeToApp: 'بەخێربێن بۆ {appName}',
        chooseYourRole: 'ڕۆڵی خۆت هەڵبژێرە بۆ دەستپێکردن.',
        iAmVoter: 'من دەنگدەرم',
        voterDescription: 'فۆڵۆی کاندیدەکان بکە، بەشداری لە دیبەیتەکان بکە و ئاگادار بە.',
        iAmCandidate: 'من کاندیدم',
        candidateDescription: 'پۆست دروست بکە، پەیامەکەت بڵاوبکەرەوە و لەگەڵ دەنگدەران بەردەوام بە.',
        navigate: 'ڕێدۆزی',
        teaHouse: 'چایخانە',
        teaHouseFooter: 'قەهوەخانەی گەلەکە',
        register: 'تۆمارکردن',
        fullName: 'ناوی تەواو',
        dateOfBirth: 'ڕێکەوتی لەدایکبوون',
        emailAddress: 'ئیمەیڵ',
        createAccount: 'هەژمار دروست بکە',
        registerAsVoter: 'تۆمارکردن وەک دەنگدەر',
        registerAsCandidate: 'تۆمارکردن وەک کاندید',
        back: 'گەڕانەوە',
        saveDraft: 'پاشەکەوتکردن وەک ڕەشنووس',
        preview: 'پێشبینین',
        privacy: 'تایبەتمەندی',
        public: 'گشتی',
        friends: 'هاوڕێیان',
        private: 'تایبەت',
    },
    ar: {
        appName: 'الحملة الذكية',
        social: 'التفاعل الاجتماعي',
        serious: 'إدارة الانتخابات',
        whoToFollow: 'من تتابعه',
        platformRules: 'قواعد المنصة',
        rule1: 'كن محترما للآخرين.',
        rule2: 'لا لخطاب الكراهية أو التحرش.',
        rule3: 'تحقق من المعلومات قبل مشاركتها.',
        rule4: 'انخرط في حوار بناء.',
        welcomeToApp: 'أهلاً بك في {appName}',
        chooseYourRole: 'اختر دورك للبدء.',
        iAmVoter: 'أنا ناخب',
        voterDescription: 'تابع المرشحين، شارك في المناقشات، وابق على اطلاع.',
        iAmCandidate: 'أنا مرشح',
        candidateDescription: 'أنشئ منشورات، شارك رسالتك، وتفاعل مع الناخبين.',
        navigate: 'التنقل',
        teaHouse: 'المقهى',
        teaHouseFooter: 'ديوانية الشعب',
        register: 'تسجيل',
        fullName: 'الاسم الكامل',
        dateOfBirth: 'تاريخ الميلاد',
        emailAddress: 'البريد الإلكتروني',
        createAccount: 'إنشاء حساب',
        registerAsVoter: 'التسجيل كناخب',
        registerAsCandidate: 'التسجيل كمرشح',
        back: 'رجوع',
        saveDraft: 'حفظ كمسودة',
        preview: 'معاينة',
        privacy: 'الخصوصية',
        public: 'عام',
        friends: 'الأصدقاء',
        private: 'خاص',
    }
};
