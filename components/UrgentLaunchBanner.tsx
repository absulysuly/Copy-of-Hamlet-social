import React, { useState, useEffect } from 'react';
import { useCountdown } from './election/hooks/useCountdown.ts';

const UrgentLaunchBanner: React.FC = () => {
    const [registeredCount, setRegisteredCount] = useState(0);
    const [remainingSpots, setRemainingSpots] = useState(50);

    // Simulate real-time registration count
    useEffect(() => {
        const interval = setInterval(() => {
            setRegisteredCount(prev => {
                const newCount = prev + Math.floor(Math.random() * 3);
                setRemainingSpots(Math.max(0, 50 - newCount));
                return newCount;
            });
        }, 30000); // Update every 30 seconds

        return () => clearInterval(interval);
    }, []);

    // Countdown to end of day
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const [hours, minutes, seconds] = useCountdown(endOfDay);

    return (
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-4 rounded-lg shadow-lg border-2 border-red-400">
            <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl">🚨</span>
                    <h2 className="text-xl font-bold font-arabic">عاجل | URGENT</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    {/* Registered Count */}
                    <div className="bg-white/20 rounded-lg p-3">
                        <div className="text-3xl font-bold text-yellow-300">
                            {registeredCount}
                        </div>
                        <div className="text-sm font-arabic">
                            مرشح مسجل
                        </div>
                        <div className="text-xs">
                            Registered
                        </div>
                    </div>

                    {/* Remaining Spots */}
                    <div className="bg-white/20 rounded-lg p-3">
                        <div className="text-3xl font-bold text-yellow-300">
                            {remainingSpots}
                        </div>
                        <div className="text-sm font-arabic">
                            شارة ذهبية متبقي
                        </div>
                        <div className="text-xs">
                            Gold Badges Left
                        </div>
                    </div>

                    {/* Time Remaining */}
                    <div className="bg-white/20 rounded-lg p-3">
                        <div className="text-lg font-bold text-yellow-300">
                            {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </div>
                        <div className="text-sm font-arabic">
                            ساعات متبقية
                        </div>
                        <div className="text-xs">
                            Hours Left
                        </div>
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-sm font-arabic mb-2">
                        أول 50 مرشح يحصلون على شارة "المؤسس الذهبي" مجاناً
                    </p>
                    <p className="text-xs mb-3">
                        First 50 candidates get "Gold Founder" badge FREE
                    </p>
                    
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full transition-colors">
                        <span className="font-arabic">سجل الآن | Register Now</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UrgentLaunchBanner;
