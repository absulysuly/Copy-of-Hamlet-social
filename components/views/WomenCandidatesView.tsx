import React, { useState, useEffect } from 'react';
import { User, UserRole, Governorate } from '../../types.ts';
import { GOVERNORATES, GOVERNORATE_AR_MAP } from '../../constants.ts';
import CandidatePill from '../CandidatePill.tsx';
import VerificationBadge from '../VerificationBadge.tsx';
import { VerificationBadge as BadgeType } from '../../types.ts';
import * as api from '../../services/apiService.ts';
import { ResponsiveGrid } from '../UI/Responsive.tsx';

interface WomenCandidatesViewProps {
    selectedGovernorate: Governorate | 'All';
    selectedParty: string | 'All';
    parties: string[];
    onSelectCandidate: (candidate: User) => void;
    user: User | null;
    requestLogin: () => void;
}

const WomenCandidatesView: React.FC<WomenCandidatesViewProps> = ({ 
    selectedGovernorate, 
    selectedParty, 
    parties, 
    onSelectCandidate, 
    user, 
    requestLogin 
}) => {
    const [candidates, setCandidates] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        totalWomen: 0,
        totalCandidates: 0,
        percentage: 0,
        byGovernorate: [] as { governorate: string; count: number; percentage: number }[]
    });

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch all candidates first
                const allCandidates = await api.getUsers({
                    role: UserRole.Candidate,
                    governorate: selectedGovernorate,
                    party: selectedParty,
                });

                // Filter for women candidates
                const womenCandidates = allCandidates.filter(candidate => {
                    const name = candidate.name.toLowerCase();
                    return name.includes('زينب') || name.includes('فاطمة') || name.includes('عائشة') || 
                           name.includes('مريم') || name.includes('خديجة') || name.includes('نور') ||
                           name.includes('لينا') || name.includes('رنا') || name.includes('هند') ||
                           name.includes('سارة') || name.includes('نورا') || name.includes('ريم');
                });

                setCandidates(womenCandidates);

                // Calculate statistics
                const totalCandidates = allCandidates.length;
                const totalWomen = womenCandidates.length;
                const percentage = totalCandidates > 0 ? Math.round((totalWomen / totalCandidates) * 100) : 0;

                // Calculate by governorate
                const governorateStats = GOVERNORATES.map(gov => {
                    const govCandidates = allCandidates.filter(c => c.governorate === gov);
                    const govWomen = womenCandidates.filter(c => c.governorate === gov);
                    return {
                        governorate: gov,
                        count: govWomen.length,
                        percentage: govCandidates.length > 0 ? Math.round((govWomen.length / govCandidates.length) * 100) : 0
                    };
                }).filter(stat => stat.count > 0);

                setStats({
                    totalWomen,
                    totalCandidates,
                    percentage,
                    byGovernorate: governorateStats
                });

            } catch (error) {
                console.error("Failed to fetch women candidates:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedGovernorate, selectedParty]);

    return (
        <div className="p-4 sm:p-6">
            {/* Header with Women Empowerment Message */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-4xl">👩‍💼</span>
                    <h1 className="text-3xl font-bold font-arabic text-white">المرشحات العراقيات</h1>
                </div>
                <p className="text-lg text-slate-300 font-arabic max-w-2xl mx-auto">
                    منصة هاملت تفتخر بدعم وتمكين المرشحات العراقيات. نؤمن بأن التمثيل النسائي ضروري لبناء عراق ديمقراطي ومزدهر.
                </p>
                <p className="text-sm text-slate-400 mt-2">
                    Hamlet platform proudly supports and empowers Iraqi women candidates. We believe women's representation is essential for building a democratic and prosperous Iraq.
                </p>
            </div>

            {/* Statistics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6 text-center rounded-lg">
                    <div className="text-3xl font-bold text-pink-400 mb-2">{stats.totalWomen}</div>
                    <div className="text-sm font-arabic text-slate-300">مرشحة مسجلة</div>
                    <div className="text-xs text-slate-400">Registered Women Candidates</div>
                </div>
                <div className="glass-card p-6 text-center rounded-lg">
                    <div className="text-3xl font-bold text-blue-400 mb-2">{stats.percentage}%</div>
                    <div className="text-sm font-arabic text-slate-300">نسبة التمثيل النسائي</div>
                    <div className="text-xs text-slate-400">Women's Representation</div>
                </div>
                <div className="glass-card p-6 text-center rounded-lg">
                    <div className="text-3xl font-bold text-green-400 mb-2">{stats.totalCandidates}</div>
                    <div className="text-sm font-arabic text-slate-300">إجمالي المرشحين</div>
                    <div className="text-xs text-slate-400">Total Candidates</div>
                </div>
            </div>

            {/* Governorate Breakdown */}
            {stats.byGovernorate.length > 0 && (
                <div className="glass-card p-6 mb-8 rounded-lg">
                    <h3 className="text-xl font-bold font-arabic text-white mb-4">التمثيل النسائي حسب المحافظة</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stats.byGovernorate.map(stat => (
                            <div key={stat.governorate} className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                                <span className="font-arabic text-slate-300">{GOVERNORATE_AR_MAP[stat.governorate]}</span>
                                <div className="text-right">
                                    <div className="font-bold text-pink-400">{stat.count}</div>
                                    <div className="text-xs text-slate-400">{stat.percentage}%</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Women Empowerment Badge */}
            <div className="glass-card p-6 mb-8 rounded-lg border-2 border-pink-400/30">
                <div className="flex items-center gap-4">
                    <div className="text-4xl">🌟</div>
                    <div>
                        <h3 className="text-xl font-bold font-arabic text-pink-400 mb-2">شارة تمكين المرأة</h3>
                        <p className="text-slate-300 font-arabic">
                            جميع المرشحات يحصلن على شارة خاصة تبرز دورهن في بناء المستقبل الديمقراطي للعراق
                        </p>
                        <p className="text-sm text-slate-400 mt-1">
                            All women candidates receive a special badge highlighting their role in building Iraq's democratic future
                        </p>
                    </div>
                </div>
            </div>

            {/* Candidates List */}
            <div className="mb-4">
                <h2 className="text-2xl font-bold font-arabic text-white mb-4">
                    المرشحات المسجلات ({candidates.length})
                </h2>
            </div>

            {isLoading ? (
                <p className="text-slate-300 text-center mt-8">جاري تحميل المرشحات...</p>
            ) : (
                <ResponsiveGrid>
                    {candidates.length > 0 ? (
                        candidates.map(candidate => (
                            <div key={candidate.id} className="relative">
                                <CandidatePill 
                                    candidate={candidate} 
                                    onSelect={onSelectCandidate} 
                                    user={user}
                                    requestLogin={requestLogin}
                                />
                                {/* Women Empowerment Badge */}
                                <div className="absolute top-2 right-2">
                                    <VerificationBadge badge={BadgeType.PartyVerified} size="sm" />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <div className="text-6xl mb-4">👩‍💼</div>
                            <p className="text-slate-300 font-arabic text-lg mb-2">لا توجد مرشحات في الفلاتر المحددة</p>
                            <p className="text-slate-400 text-sm">No women candidates found with current filters</p>
                        </div>
                    )}
                </ResponsiveGrid>
            )}

            {/* Call to Action */}
            <div className="mt-12 text-center">
                <div className="glass-card p-8 rounded-lg border-2 border-pink-400/30">
                    <h3 className="text-2xl font-bold font-arabic text-pink-400 mb-4">
                        هل أنت مرشحة عراقية؟
                    </h3>
                    <p className="text-slate-300 font-arabic mb-6">
                        انضمي إلى منصة هاملت واحصلي على شارة "تمكين المرأة" مجاناً
                    </p>
                    <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                        <span className="font-arabic">سجلي الآن مجاناً</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WomenCandidatesView;
