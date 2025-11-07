

import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData.ts';
// Fix: Added ChartIcon to the import list.
import { UsersGroupIcon, ClipboardCheckIcon, ClockIcon, ChevronUpIcon, ChevronDownIcon, ChevronUpDownIcon, ChartIcon } from '../../icons/Icons.tsx';
import { Language, GovernorateParticipation } from '../../../types.ts';
import { UI_TEXT } from '../../../translations.ts';
import { useSortableData } from '../hooks/useSortableData.ts';


interface DashboardPageProps {
    language: Language;
}

// --- SUB-COMPONENTS for FORMAL DASHBOARD ---

const FormalHeader: React.FC<{ language: Language }> = ({ language }) => {
    const texts = UI_TEXT[language];
    return (
        <div className="formal-header rounded-lg p-6 mb-8 text-white">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">{texts.electionDashboard}</h1>
                    <p className="text-lg text-slate-300 font-arabic">{texts.dashboardSubtitle}</p>
                </div>
                <div className="text-right">
                    <p className="font-bold text-lg">{texts.iraqiElections}</p>
                    <p className="text-2xl font-bold">{texts.electionYear}</p>
                </div>
            </div>
        </div>
    );
};

const StatCard: React.FC<{ icon: React.ReactElement; title: string; value: string; }> = ({ icon, title, value }) => (
    <div className="glass-card p-4 rounded-lg flex items-center space-x-4 rtl:space-x-reverse">
        <div className="p-3 bg-primary/10 rounded-full">{icon}</div>
        <div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-slate-400 font-arabic">{title}</p>
        </div>
    </div>
);

const ElectionTimeline: React.FC<{ language: Language }> = ({ language }) => {
    const texts = UI_TEXT[language];
    const timelineItems = [
        { title: texts.timeline.voterRegistration, date: '2025-07-01' },
        { title: texts.timeline.candidateDeadline, date: '2025-09-15' },
        { title: texts.timeline.campaignPeriod, date: '2025-10-01' },
        { title: texts.timeline.electionDay, date: '2025-11-11' },
    ];

    return (
        <div className="glass-card p-6 rounded-lg h-full">
            <h3 className="text-xl font-bold text-white mb-4">{texts.electionTimeline}</h3>
            <ol className="relative border-l border-gray-200 dark:border-gray-700 rtl:border-r rtl:border-l-0">
                {timelineItems.map((item, index) => (
                    <li key={index} className="mb-6 ml-6 rtl:mr-6 rtl:ml-0">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -left-3 ring-8 ring-white/10 rtl:-right-3 rtl:left-auto">
                            <ClockIcon className="w-4 h-4 text-primary" />
                        </span>
                        <h4 className="flex items-center mb-1 text-md font-semibold text-white">{item.title}</h4>
                        <time className="block mb-2 text-sm font-normal leading-none text-slate-400">{new Date(item.date).toLocaleDateString(language, { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    </li>
                ))}
            </ol>
        </div>
    );
};

const ParticipationTable: React.FC<{ data: GovernorateParticipation[]; language: Language; }> = ({ data, language }) => {
    // Fix: Explicitly provide the generic type to `useSortableData` to prevent incorrect type inference.
    // This ensures `requestSort` can accept any key of `GovernorateParticipation`.
    const { items, requestSort, sortConfig } = useSortableData<GovernorateParticipation>(data, { key: 'governorateName', direction: 'ascending' });
    const texts = UI_TEXT[language];

    const getSortIcon = (key: keyof GovernorateParticipation) => {
        if (!sortConfig || sortConfig.key !== key) {
            return <ChevronUpDownIcon className="w-4 h-4" />;
        }
        if (sortConfig.direction === 'ascending') {
            return <ChevronUpIcon className="w-4 h-4" />;
        }
        return <ChevronDownIcon className="w-4 h-4" />;
    };
    
    const getTurnoutStatus = (turnout: number) => {
        if (turnout > 60) return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-300">{texts.status.active}</span>;
        if (turnout > 45) return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-300">{texts.status.medium}</span>;
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-500/20 text-red-300">Low</span>;
    };

    return (
        <div className="glass-card rounded-lg overflow-hidden">
            <h3 className="text-xl font-bold text-white p-6">{texts.governorateStats}</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left rtl:text-right">
                    <thead className="bg-white/10">
                        <tr>
                            <th className="p-4">
                                <button onClick={() => requestSort('governorateName')} className="flex items-center space-x-1 rtl:space-x-reverse font-semibold text-sm">
                                    <span>{texts.table.governorate}</span>
                                    {getSortIcon('governorateName')}
                                </button>
                            </th>
                            <th className="p-4">
                                <button onClick={() => requestSort('estimatedTurnout')} className="flex items-center space-x-1 rtl:space-x-reverse font-semibold text-sm">
                                    <span>{texts.table.turnout}</span>
                                    {getSortIcon('estimatedTurnout')}
                                </button>
                            </th>
                            <th className="p-4 font-semibold text-sm">{texts.table.status}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((gov) => (
                            <tr key={gov.governorateId} className="border-b border-white/10">
                                <td className="p-4 font-medium text-white">{gov.governorateName}</td>
                                <td className="p-4">
                                    <div className="flex items-center">
                                        <div className="w-full bg-white/20 rounded-full h-2.5 mr-2 rtl:ml-2 rtl:mr-0">
                                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${gov.estimatedTurnout}%` }}></div>
                                        </div>
                                        <span className="text-sm font-medium">{gov.estimatedTurnout.toFixed(1)}%</span>
                                    </div>
                                </td>
                                <td className="p-4">{getTurnoutStatus(gov.estimatedTurnout)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const DashboardPage: React.FC<DashboardPageProps> = ({ language }) => {
    const { data, isLoading, error } = useDashboardData();
    const texts = UI_TEXT[language];

    if (isLoading) return <div className="text-center py-20 text-white">Loading dashboard data...</div>;
    if (error || !data) return <div className="text-center py-20 text-red-400">Error: {error?.message || 'Failed to load dashboard data.'}</div>;

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
            <FormalHeader language={language} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard 
                    icon={<UsersGroupIcon className="w-6 h-6 text-primary" />}
                    title={texts.totalVoters}
                    value={data.stats.totalRegisteredVoters.toLocaleString(language)}
                />
                <StatCard 
                    icon={<ClipboardCheckIcon className="w-6 h-6 text-primary" />}
                    title={texts.approvedCandidates}
                    value={data.stats.approvedCandidatesCount.toLocaleString(language)}
                />
                <StatCard 
                    icon={<ChartIcon className="w-6 h-6 text-primary" />}
                    title={texts.expectedTurnout}
                    value={`${data.stats.expectedTurnoutPercentage}%`}
                />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <ParticipationTable data={data.participation} language={language} />
                </div>
                <div className="lg:col-span-1">
                    <ElectionTimeline language={language} />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;