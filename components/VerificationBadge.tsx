import React from 'react';
import { VerificationBadge as BadgeType } from '../types.ts';

interface VerificationBadgeProps {
    badge: BadgeType;
    size?: 'sm' | 'md' | 'lg';
    showText?: boolean;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
    badge, 
    size = 'md', 
    showText = true 
}) => {
    const badgeConfig = {
        [BadgeType.GoldFounder]: {
            icon: '👑',
            text: 'المؤسس الذهبي',
            textEn: 'Gold Founder',
            bgColor: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
            textColor: 'text-yellow-900',
            borderColor: 'border-yellow-500'
        },
        [BadgeType.SilverPioneer]: {
            icon: '🥈',
            text: 'الرائد الفضي',
            textEn: 'Silver Pioneer',
            bgColor: 'bg-gradient-to-r from-gray-300 to-gray-500',
            textColor: 'text-gray-800',
            borderColor: 'border-gray-400'
        },
        [BadgeType.Standard]: {
            icon: '✓',
            text: 'موثق رسمياً',
            textEn: 'Verified',
            bgColor: 'bg-gradient-to-r from-blue-400 to-blue-600',
            textColor: 'text-blue-900',
            borderColor: 'border-blue-500'
        },
        [BadgeType.PartyVerified]: {
            icon: '🏛️',
            text: 'حزب موثق',
            textEn: 'Party Verified',
            bgColor: 'bg-gradient-to-r from-purple-400 to-purple-600',
            textColor: 'text-purple-900',
            borderColor: 'border-purple-500'
        }
    };

    const config = badgeConfig[badge];
    const sizeClasses = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base'
    };

    return (
        <div className={`
            inline-flex items-center gap-1 rounded-full border-2
            ${config.bgColor} ${config.textColor} ${config.borderColor}
            ${sizeClasses[size]} font-semibold shadow-sm
        `}>
            <span className="text-lg">{config.icon}</span>
            {showText && (
                <span className="font-arabic">
                    {config.text}
                </span>
            )}
        </div>
    );
};

export default VerificationBadge;
