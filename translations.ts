import { Language } from './types.ts';

type BaseTranslations = {
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
    teaHouseSubtitle: string;
    teaHouseCreateDiscussion: string;
    teaHouseNoDiscussions: string;
    teaHouseParticipantsCount: string;
    teaHouseMessagePlaceholder: string;
    createTopicTitle: string;
    createTopicTitleLabel: string;
    createTopicTitlePlaceholder: string;
    createTopicCategoryLabel: string;
    createTopicLanguageLabel: string;
    createTopicFirstMessageLabel: string;
    createTopicFirstMessagePlaceholder: string;
    createTopicSubmit: string;
    categoryPolitics: string;
    categoryServices: string;
    categoryCommunity: string;
    categoryEconomy: string;
    categoryGeneral: string;
    languageArabic: string;
    languageKurdish: string;
    languageEnglish: string;
    inviteTitle: string;
    inviteDescription: string;
    inviteStatTotal: string;
    inviteStatInvited: string;
    inviteStatResponded: string;
    inviteStatResponseRate: string;
    inviteTabAdd: string;
    inviteTabBulk: string;
    inviteTabList: string;
    inviteFeedbackErrorLoading: string;
    inviteFeedbackAddValidation: string;
    inviteFeedbackAddSuccess: string;
    inviteFeedbackAddError: string;
    inviteFeedbackBulkRowError: string;
    inviteFeedbackBulkEmpty: string;
    inviteFeedbackBulkSuccess: string;
    inviteFeedbackBulkError: string;
    inviteFeedbackSendNoPending: string;
    inviteFeedbackSendConfirm: string;
    inviteFeedbackSendSuccess: string;
    inviteFeedbackSendError: string;
    inviteAddTitle: string;
    inviteAddNameLabel: string;
    inviteAddPhoneLabel: string;
    inviteAddProvinceLabel: string;
    inviteAddDistrictLabel: string;
    inviteAddPartyLabel: string;
    inviteAddFacebookLabel: string;
    inviteAddNotesLabel: string;
    inviteAddSubmit: string;
    inviteAddSubmitting: string;
    inviteBulkTitle: string;
    inviteBulkInstruction: string;
    inviteBulkPlaceholder: string;
    inviteBulkSubmit: string;
    inviteBulkSubmitting: string;
    inviteBulkHelper: string;
    inviteListTitle: string;
    inviteListMessagePlaceholder: string;
    inviteListSendAll: string;
    inviteListSending: string;
    inviteFilterAll: string;
    inviteFilterPending: string;
    inviteFilterInvited: string;
    inviteFilterInterested: string;
    inviteTableNameHeader: string;
    inviteTablePhoneHeader: string;
    inviteTableProvinceHeader: string;
    inviteTablePartyHeader: string;
    inviteTableInvitationHeader: string;
    inviteTableStatusHeader: string;
    inviteTableActionsHeader: string;
    inviteFacebookLink: string;
    inviteDistrictLabel: string;
    invitePartyIndependent: string;
    inviteInvitationSent: string;
    inviteInvitationPending: string;
    inviteStatusNew: string;
    inviteStatusContacted: string;
    inviteStatusInterested: string;
    inviteStatusNotInterested: string;
    composePlaceholder: string;
    composeTopicPlaceholder: string;
    composeGenerateButton: string;
    composeGenerating: string;
    composeTopicAlert: string;
    composeDraftSaved: string;
    composePreviewTemplate: string;
    composePreviewPrivacyLabel: string;
    composePostButton: string;
    composeSpeechUnsupported: string;
    common: {
        all: string;
        cancel: string;
        search_placeholder: string;
    };
    invitations: {
        conversations_tab: string;
        invitations_tab: string;
        requests_tab: string;
        management_header: string;
        sent_invitations: string;
        received_invitations: string;
        sender: string;
        receiver: string;
        status: string;
        date: string;
        accepted: string;
        pending: string;
        rejected: string;
        send_invitation: string;
    };
    navigation: {
        social_home: string;
        social_tea_house: string;
        social_debates: string;
        social_profile: string;
        election_portal: string;
        election_candidates: string;
        election_data: string;
        election_resources: string;
    };
};

type Translations = {
    [key in Language]: BaseTranslations;
};

export const UI_TEXT = {
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
        common: {
            all: 'All',
            cancel: 'Cancel',
            search_placeholder: 'Search...',
        },
        invitations: {
            conversations_tab: 'Conversations',
            invitations_tab: 'Invitations',
            requests_tab: 'Requests',
            management_header: 'Invitation Management',
            sent_invitations: 'Sent Invitations',
            received_invitations: 'Received Invitations',
            sender: 'Sender',
            receiver: 'Receiver',
            status: 'Status',
            date: 'Date',
            accepted: 'Accepted',
            pending: 'Pending',
            rejected: 'Rejected',
            send_invitation: 'Send Invitation',
        },
        navigation: {
            social_home: 'Home',
            social_tea_house: 'Tea House',
            social_debates: 'Debates',
            social_profile: 'Profile',
            election_portal: 'Portal',
            election_candidates: 'Candidates',
            election_data: 'Data',
            election_resources: 'Resources',
        },
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
        common: {
            all: 'هەموو',
            cancel: 'هەڵوەشاندنەوە',
            search_placeholder: 'گەڕان...',
        },
        invitations: {
            conversations_tab: 'گفتوگۆکان',
            invitations_tab: 'بانگهێشتەکان',
            requests_tab: 'داواکاریەکان',
            management_header: 'بەڕێوەبردنی بانگهێشت',
            sent_invitations: 'بانگهێشتە نێردراوەکان',
            received_invitations: 'بانگهێشتە وەرگیراوەکان',
            sender: 'نێردەر',
            receiver: 'وەرگر',
            status: 'بار',
            date: 'بەروار',
            accepted: 'پەسەندکراو',
            pending: 'چاوەڕوان',
            rejected: 'ڕەتکراوە',
            send_invitation: 'بانگهێشت بنێرە',
        },
        navigation: {
            social_home: 'ماڵەوە',
            social_tea_house: 'چایخانە',
            social_debates: 'دیبەیتەکان',
            social_profile: 'پرۆفایلی من',
            election_portal: 'دەروازە',
            election_candidates: 'کاندیدەکان',
            election_data: 'داتا',
            election_resources: 'سەرچاوەکان',
        },
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
        common: {
            all: 'الكل',
            cancel: 'إلغاء',
            search_placeholder: 'ابحث...',
        },
        invitations: {
            conversations_tab: 'المحادثات',
            invitations_tab: 'الدعوات',
            requests_tab: 'الطلبات',
            management_header: 'إدارة الدعوات',
            sent_invitations: 'الدعوات المرسلة',
            received_invitations: 'الدعوات الواردة',
            sender: 'المرسل',
            receiver: 'المستلم',
            status: 'الحالة',
            date: 'التاريخ',
            accepted: 'مقبولة',
            pending: 'معلقة',
            rejected: 'مرفوضة',
            send_invitation: 'إرسال دعوة',
        },
        navigation: {
            social_home: 'الرئيسية',
            social_tea_house: 'المقهى',
            social_debates: 'المناظرات',
            social_profile: 'صفحتي',
            election_portal: 'البوابة',
            election_candidates: 'المرشحون',
            election_data: 'البيانات',
            election_resources: 'الموارد',
        },
    },
} as Translations;
