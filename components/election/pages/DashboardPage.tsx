import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData.ts';
import { UsersGroupIcon, ClipboardCheckIcon, ClockIcon, ChevronUpIcon, ChevronDownIcon, ChevronUpDownIcon } from '../../icons/Icons.tsx';

// --- SUB-COMPONENTS for FORMAL DASHBOARD ---

const FormalHeader: React.FC = () => (
    <div className="formal-header rounded-lg p-6 mb-8 text-white">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold">Election Dashboard</h1>
                <p className="text-lg text-slate-300 font-arabic">لوحة بيانات الانتخابات</p>
            </div>
            <div className="text-right">
                <p className="font-bold text-lg">Iraqi Parliamentary Elections</p>
                <p className="text-slate-300">2025</p>
            </div>
        </div>
    </div>
);

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; }> = ({ title, value, icon }) => (
    <div className="formal-stats p-4 rounded-lg">
        <div className="flex items-center">
            <div className="p-3 bg-formal-primary-500 rounded-full text-white mr-4">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-official-700">{title}</p>
                <p className="text-2xl font-bold text-official-900">{value}</p>
            </div>
        </div>
    </div>
);

const TimelineItem: React.FC<{ date: string; title: string; isComplete: boolean }> = ({ date, title, isComplete }) => (
    <div className="flex items-center">
        <div className={`w-4 h-4 rounded-full mr-4 ${isComplete ? 'bg-formal-primary-500' : 'bg-official-300'}`}></div>
        <div>
            <p className={`font-bold ${isComplete ? 'text-official-900' : 'text-official-700'}`}>{title}</p>
            <p className="text-sm text-official-700">{date}</p>
        </div>
    </div>
);

const useSortableData = (items: any[], config = null) => {
    const [sortConfig, setSortConfig] = React.useState<{key: string, direction: 'ascending' | 'descending'} | null>(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    // Fix: Corrected typo from `sort-config` to `sortConfig`.
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key: string) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

const GovernorateTable: React.FC<{ data: any[] }> = ({ data }) => {
    const { items, requestSort, sortConfig } = useSortableData(data);

    const getSortIcon = (name: string) => {
        if (!sortConfig || sortConfig.key !== name) {
            return <ChevronUpDownIcon className="w-4 h-4" />;
        }
        return sortConfig.direction === 'ascending' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />;
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-right">
                <thead className="bg-official-200">
                    <tr>
                        <th className="p-3 text-sm font-semibold tracking-wide">
                             <button onClick={() => requestSort('governorateName')} className="flex items-center gap-1">المحافظة {getSortIcon('governorateName')}</button>
                        </th>
                        <th className="p-3 text-sm font-semibold tracking-wide">
                            <button onClick={() => requestSort('estimatedTurnout')} className="flex items-center gap-1">المشاركة المتوقعة {getSortIcon('estimatedTurnout')}</button>
                        </th>
                        <th className="p-3 text-sm font-semibold tracking-wide">الحالة</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-official-300">
                    {items.map(gov => (
                        <tr key={gov.governorateId} className="hover:bg-official-100">
                            <td className="p-3 text-sm text-official-800 font-bold">{gov.governorateName}</td>
                            <td className="p-3 text-sm text-official-800">{gov.estimatedTurnout}%</td>
                            <td className="p-3">
                                <span className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 ${gov.estimatedTurnout > 50 ? 'status-active' : 'status-pending'}`}>
                                    {gov.estimatedTurnout > 50 ? 'نشط' : 'متوسط'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


const DashboardPage: React.FC = () => {
  const { data, isLoading, error } = useDashboardData();

  if (isLoading) {
    return <div className="p-8 text-center">Loading Dashboard Data...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-600">Error: {error.message}</div>;
  }

  const stats = data!.stats;
  const participation = data!.participation;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <FormalHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Registered Voters" value={stats.totalRegisteredVoters.toLocaleString()} icon={<UsersGroupIcon className="w-6 h-6"/>} />
        <StatCard title="Approved Candidates" value={stats.approvedCandidatesCount.toLocaleString()} icon={<ClipboardCheckIcon className="w-6 h-6"/>} />
        <StatCard title="Expected Turnout" value={`${stats.expectedTurnoutPercentage}%`} icon={<ClockIcon className="w-6 h-6"/>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 formal-card p-6">
             <h2 className="text-xl font-bold text-official-900 mb-4">Governorate Statistics</h2>
             <GovernorateTable data={participation} />
        </div>
        <div className="formal-card p-6">
            <h2 className="text-xl font-bold text-official-900 mb-4">Election Timeline</h2>
            <div className="space-y-4">
                <TimelineItem date="August 1, 2024" title="Voter Registration Opens" isComplete={true} />
                <TimelineItem date="September 15, 2024" title="Candidate Filing Deadline" isComplete={true} />
                <TimelineItem date="October 1, 2024" title="Campaign Period Begins" isComplete={false} />
                <TimelineItem date="November 5, 2024" title="Election Day" isComplete={false} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;