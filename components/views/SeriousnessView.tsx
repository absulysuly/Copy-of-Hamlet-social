

import React, { useState, useEffect } from 'react';
import { Governorate, Article } from '../../types.ts';
import { LinkIcon } from '../icons/Icons.tsx';
import * as api from '../../services/apiService.ts';

interface SeriousnessViewProps {
    selectedGovernorate: Governorate | 'All';
}

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
    return (
        <div className="glass-card rounded-lg shadow-sm p-5 flex flex-col h-full transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1">
            <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{article.source}</span>
                    <span className="text-xs text-slate-400">{article.timestamp}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{article.title}</h3>
                <p className="text-sm text-slate-300 mt-1">by {article.authorName}</p>
                <p className="mt-3 text-slate-200 text-sm">
                    {article.contentSnippet}
                </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-sm font-semibold text-brand-teal hover:underline">
                    <LinkIcon className="w-4 h-4" />
                    <span>Read Full Article</span>
                </a>
            </div>
        </div>
    );
}

const SeriousnessView: React.FC<SeriousnessViewProps> = ({ selectedGovernorate }) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            try {
                const data = await api.getArticles({ governorate: selectedGovernorate });
                setArticles(data);
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchArticles();
    }, [selectedGovernorate]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Latest News & Analysis</h2>
            {isLoading ? (
                 <p className="text-slate-300 col-span-full text-center mt-8">Loading articles...</p>
            ) : articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles.map(article => <ArticleCard key={article.id} article={article} />)}
                </div>
            ) : (
                <p className="text-slate-300 col-span-full text-center mt-8">No articles found for {selectedGovernorate}.</p>
            )}
        </div>
    );
};

export default SeriousnessView;