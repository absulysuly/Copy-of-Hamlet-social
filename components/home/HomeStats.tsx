import { fetchStats } from '@/lib/api';
import { Stats } from '@/lib/types';
import { FaUsers, FaUserCheck, FaMapMarkedAlt } from 'react-icons/fa';

type HomeStatsProps = {
  dictionary: any;
};

export default async function HomeStats({ dictionary }: HomeStatsProps) {
  let stats: Stats;

  const timeoutPromise = new Promise<never>((_, reject) => 
    setTimeout(() => reject(new Error('Request timed out after 3 seconds')), 3000)
  );

  try {
    stats = await Promise.race([
      fetchStats(),
      timeoutPromise
    ]);
  } catch (error) {
    console.error("HomeStats fetch failed or timed out:", error);
    stats = {
      total_candidates: 0,
      gender_distribution: { Male: 0, Female: 0 },
      candidates_per_governorate: [],
    };
  }

  const statsData = [
    { name: dictionary.totalCandidates, value: stats.total_candidates.toLocaleString(), icon: FaUsers },
    { name: dictionary.maleCandidates, value: stats.gender_distribution.Male.toLocaleString(), icon: FaUserCheck },
    { name: dictionary.femaleCandidates, value: stats.gender_distribution.Female.toLocaleString(), icon: FaUserCheck },
    { name: dictionary.participatingGovernorates, value: stats.candidates_per_governorate.length, icon: FaMapMarkedAlt },
  ];

  return (
    <div className="bg-gray-50 py-16 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat) => (
            <div key={stat.name}>
              <stat.icon className="mx-auto h-12 w-12 text-green-600 dark:text-green-400" />
              <p className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="mt-2 text-lg font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}