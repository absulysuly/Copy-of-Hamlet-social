
import React from 'react';
// Fix: added .ts extension to constants import
import { MOCK_ARTICLES } from '../../constants.ts';
// Fix: added .ts extension to types import
import { Governorate } from '../../types.ts';
// Fix: added .tsx extension to Icons import
import { LinkIcon } from '../icons/Icons.tsx';

interface SeriousnessViewProps {
    selectedGovernorate: Governorate | 'All';
}

const ArticleCard: React.FC<{ article: typeof MOCK_ARTICLES[0] }> = ({ article }) => {
    return (
        <div className="bg-mocha-white dark:bg-gray-800 rounded-lg shadow-sm border border-neutral-gray-medium dark:border-gray-700 p-5 flex flex-col h-full">
            <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-gray-dark dark:text-gray-400">{article.source}</span>
                    <span className="text-xs text-neutral-gray-dark dark:text-gray-400">{article.timestamp}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{article.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">by {article.authorName}</p>
                <p className="mt-3 text-gray-800 dark:text-gray-200 text-sm">
                    {article.contentSnippet}
                </p>
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-gray-light dark:border-gray-700">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-sm font-semibold text-action-blue hover:underline">
                    <LinkIcon className="w-4 h-4" />
                    <span>Read Full Article</span>
                </a>
            </div>
        </div>
    );
}

const SeriousnessView: React.FC<SeriousnessViewProps> = ({ selectedGovernorate }) => {
    const filteredArticles = MOCK_ARTICLES.filter(article =>
        selectedGovernorate === 'All' || article.governorates.includes(selectedGovernorate)
    );

    return (
        <div>
            {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredArticles.map(article => <ArticleCard key={article.id} article={article} />)}
                </div>
            ) : (
                <p className="text-gray-500 col-span-full text-center mt-8">No articles found for {selectedGovernorate}.</p>
            )}
        </div>
    );
};

export default SeriousnessView;