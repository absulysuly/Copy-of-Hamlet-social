import { useState, useEffect } from 'react';
import { IRAQ_GOVERNORATES } from '../constants.ts';
import { Candidate, NewsArticle } from '../types.ts';

const generateMockCandidates = (count: number): Candidate[] => {
    const parties = ['Future Alliance', 'Progress Party', 'National Unity', 'Kurdistan Future', 'Independent'];
    return Array.from({ length: count }, (_, i) => ({
        id: `cand-${i + 1}`,
        name: `المرشح ${i + 1}`,
        party: parties[i % parties.length],
        imageUrl: `https://picsum.photos/seed/cand${i + 1}/200/200`,
        verified: Math.random() > 0.3,
    }));
};

const generateMockNews = (count: number): NewsArticle[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: `news-${i + 1}`,
        title: `خبر عاجل بخصوص الانتخابات رقم ${i + 1}`,
        summary: 'هذا ملخص سريع للخبر، يناقش آخر التطورات على الساحة السياسية المحلية والاستعدادات الجارية للانتخابات القادمة.',
        date: '10 أغسطس 2024',
    }));
};


export const useGovernorateData = (name: string | undefined) => {
    const [data, setData] = useState<{ governorate: any; candidates: Candidate[]; news: NewsArticle[] } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            const governorate = IRAQ_GOVERNORATES.find(g => g.enName.toLowerCase() === name?.toLowerCase());

            if (governorate) {
                setData({
                    governorate,
                    candidates: generateMockCandidates(15),
                    news: generateMockNews(5),
                });
            } else {
                setError(new Error('Governorate not found.'));
            }
            setIsLoading(false);
        }, 500); // Simulate network delay

        return () => clearTimeout(timer);
    }, [name]);

    return { data, isLoading, error };
};
