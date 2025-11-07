import type { User, Post } from '../types.ts';

const POST_FALLBACKS = [
    'شارك أفكارك مع مجتمعك اليوم.',
    'ما هو رأيك؟ افتح النقاش مع الآخرين.',
    'صوتك مهم — شاركنا تجربتك الآن.',
    'اكتب رسالة تلهم الآخرين للتحرك.'
];

export const generatePostSuggestion = async (topic: string): Promise<string> => {
    const sanitizedTopic = topic.trim();
    const baseSuggestion = sanitizedTopic ? `شارك أفكارك حول "${sanitizedTopic}" ودع الآخرين يعرفون موقفك.` : POST_FALLBACKS[0];
    return baseSuggestion;
};

export const translateText = async (text: string, targetLanguage: 'en' | 'ku' | 'ar'): Promise<string> => {
    if (!text) {
        return '';
    }
    // Without external AI access we return the original text.
    return text;
};

export const generateLikelyMpResponse = async (
    candidate: User,
    question: string,
    recentPosts: Partial<Post>[]
): Promise<string> => {
    const snippets = recentPosts
        .map((post) => (post.content ? `- "${post.content.slice(0, 80)}..."` : null))
        .filter(Boolean)
        .join('\n');

    return [
        `شكرًا لسؤالك. أنا ${candidate.name} من حزب ${candidate.party}.`,
        question ? `بخصوص سؤالك: "${question.trim()}"، سأعمل على دراسة التفاصيل وتقديم متابعة رسمية.` : 'سأعمل على متابعة هذا الموضوع مع الفريق المختص.',
        snippets ? 'إليك بعض النقاط التي عملنا عليها مؤخرًا:\n' + snippets : 'سأقوم بمشاركة التحديثات معكم حال توفرها.',
        'أقدّر اهتمامك وسأبقى على تواصل.'
    ].join('\n\n');
};
