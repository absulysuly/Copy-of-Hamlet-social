import React from 'react';
import { Language } from '../types';
import { UI_TEXT } from '../translations';
import { SparklesIcon } from './icons/Icons';

interface MarqueeNewsProps {
    language: Language;
}

const MarqueeNews: React.FC<MarqueeNewsProps> = ({ language }) => {
    const texts = UI_TEXT[language].marquee;
    const newsItems = Object.values(texts);

    // Duplicate the items for a seamless loop effect with the CSS animation
    const marqueeItems = [...newsItems, ...newsItems];

    return (
        <div className="relative flex overflow-x-hidden bg-black/10 text-theme-text-muted py-2 border-y border-[var(--color-glass-border)]">
            <div className="flex animate-marquee whitespace-nowrap">
                {marqueeItems.map((item, index) => (
                    <div key={index} className="flex items-center mx-4 text-sm">
                        <SparklesIcon className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarqueeNews;
