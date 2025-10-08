import React from 'react';
import { useCountdown } from './election/hooks/useCountdown.ts';
import IraqFlagIcon from './election/icons/IraqFlagIcon.tsx';

const CountdownTimer: React.FC = () => {
    // This date is set to roughly match the screenshot's remaining time
    const electionDate = new Date();
    electionDate.setDate(electionDate.getDate() + 34);
    electionDate.setHours(electionDate.getHours() + 8);
    electionDate.setMinutes(electionDate.getMinutes() + 23);
    electionDate.setSeconds(electionDate.getSeconds() + 35);

    const [days, hours, minutes, seconds] = useCountdown(electionDate);
    
    const items = [
        { label: 'أيام', value: days },
        { label: 'ساعات', value: hours },
        { label: 'دقائق', value: minutes },
        { label: 'ثواني', value: seconds },
    ];

    return (
        <div className="flex justify-center items-center space-x-2 sm:space-x-4 rtl:space-x-reverse text-center text-white" dir="rtl">
            {items.map(item => (
                <div key={item.label} className="bg-white/10 rounded-lg p-2 sm:p-4 w-16 sm:w-20 backdrop-blur-sm">
                    <div className="text-2xl sm:text-4xl font-bold">{String(item.value).padStart(2, '0')}</div>
                    <div className="text-xs sm:text-sm uppercase tracking-wider">{item.label}</div>
                </div>
            ))}
        </div>
    );
}

const ElectionHero: React.FC = () => {
    return (
        <div className="w-full hero-election-bg text-white text-center rounded-lg shadow-lg flex flex-col justify-center items-center aspect-square md:aspect-[2/1] lg:aspect-[3/1] p-4 sm:p-6">
             {/* The layout is reversed for RTL, but the visual order from the screenshot should be preserved */}
            <div className="flex flex-col-reverse sm:flex-row justify-center items-center gap-6" dir="rtl">
                 {/* Text block */}
                 <div className="text-center sm:text-right">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">انتخابات العراق البرلمانية ٢٠٢٥</h1>
                    <p className="mt-2 text-lg text-slate-200 max-w-lg">منصتك الرقمية لمعلومات الانتخابات والشفافية والمشاركة المواطنية.</p>
                 </div>
                 {/* Flag block */}
                 <div className="flex-shrink-0">
                    <div className="w-40 h-auto shadow-md rounded border-2 border-white/50 overflow-hidden">
                        <IraqFlagIcon />
                    </div>
                 </div>
            </div>
            <div className="mt-8">
                <CountdownTimer />
            </div>
        </div>
    );
};

export default ElectionHero;