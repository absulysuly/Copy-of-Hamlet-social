import React from 'react';
import { Language } from '../types.ts';
import { UI_TEXT } from '../translations.ts';

interface MarqueeNewsProps {
    language: Language;
}

const MarqueeNews: React.FC<MarqueeNewsProps> = ({ language }) => {
    const texts = UI_TEXT[language];
    const marqueeItems = Object.values(texts.marquee);

    // Duplicate items for seamless loop
    const displayItems = [...marqueeItems, ...marqueeItems];

    return (
        <div className="w-full overflow-hidden bg-black/10 py-3 relative">
            <div className="flex animate-marquee whitespace-nowrap">
                {displayItems.map((item, index) => (
                    <span key={index} className="text-sm text-theme-text-base mx-8">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default MarqueeNews;
