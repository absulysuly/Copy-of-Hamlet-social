import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';

interface Candidate {
  CandidateID: string;
  FullName: string;
  BallotName: string;
  ElectoralDistrict: string;
  Sex: string;
  DataQuality: string;
  LastUpdated: string;
}

// Debounce hook for search optimization
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Memoized candidate card component
const CandidateCard = React.memo<{ candidate: Candidate; style: React.CSSProperties }>(
  ({ candidate, style }) => (
    <div style={style} className="px-2">
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow h-full">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 mb-1 truncate">
              {candidate.FullName || 'Name not available'}
            </h3>
            <p className="text-sm text-gray-600 mb-2 truncate">
              {candidate.BallotName || 'No party affiliation'}
            </p>
          </div>
          <span
            className={`px-2 py-1 text-xs rounded-full flex-shrink-0 ml-2 ${
              candidate.DataQuality === 'OK'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {candidate.DataQuality || 'Unknown'}
          </span>
        </div>

        <div className="space-y-1 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">ID:</span>
            <span className="font-medium">{candidate.CandidateID}</span>
          </div>
          {candidate.ElectoralDistrict && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500">District:</span>
              <span className="font-medium truncate ml-2">{candidate.ElectoralDistrict}</span>
            </div>
          )}
          {candidate.Sex && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Gender:</span>
              <span className="font-medium">{candidate.Sex}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
);

CandidateCard.displayName = 'CandidateCard';

const HamletCandidateBrowserOptimized: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [parseTime, setParseTime] = useState(0);

  // Debounced search for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = useCallback(async () => {
    try {
      setLoading(true);
      const startTime = performance.now();
      
      const response = await fetch('/candidates.csv');

      if (!response.ok) {
        throw new Error('Failed to load candidates data');
      }

      const text = await response.text();
      const parsed = parseCSV(text);
      
      const endTime = performance.now();
      setParseTime(Math.round(endTime - startTime));
      
      setCandidates(parsed);
      setError(null);
    } catch (err) {
      console.error('Error loading candidates:', err);
      setError(err instanceof Error ? err.message : 'Failed to load candidates');
    } finally {
      setLoading(false);
    }
  }, []);

  // Optimized CSV parser with streaming approach
  const parseCSV = useCallback((text: string): Candidate[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    const data: Candidate[] = [];
    
    // Batch process for better performance
    const batchSize = 100;
    for (let i = 1; i < lines.length; i += batchSize) {
      const batch = lines.slice(i, Math.min(i + batchSize, lines.length));
      
      batch.forEach(line => {
        const values = parseCSVLine(line);
        if (values.length === headers.length) {
          const candidate: any = {};
          headers.forEach((header, index) => {
            candidate[header] = values[index];
          });
          data.push(candidate as Candidate);
        }
      });
    }

    return data;
  }, []);

  const parseCSVLine = useCallback((line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current.trim());
    return result.map(val => val.replace(/^"|"$/g, ''));
  }, []);

  // Memoized filtered candidates - only recalculate when needed
  const filteredCandidates = useMemo(() => {
    const searchLower = debouncedSearchTerm.toLowerCase();
    
    return candidates.filter(candidate => {
      const matchesSearch =
        !debouncedSearchTerm ||
        candidate.FullName?.toLowerCase().includes(searchLower) ||
        candidate.BallotName?.toLowerCase().includes(searchLower) ||
        candidate.CandidateID?.includes(debouncedSearchTerm);

      const matchesDistrict =
        selectedDistrict === 'all' || candidate.ElectoralDistrict === selectedDistrict;

      return matchesSearch && matchesDistrict;
    });
  }, [candidates, debouncedSearchTerm, selectedDistrict]);

  // Memoized districts list
  const districts = useMemo(
    () => Array.from(new Set(candidates.map(c => c.ElectoralDistrict).filter(Boolean))),
    [candidates]
  );

  // Memoized district counts
  const districtCounts = useMemo(() => {
    const counts = new Map<string, number>();
    candidates.forEach(c => {
      const district = c.ElectoralDistrict || 'Unknown';
      counts.set(district, (counts.get(district) || 0) + 1);
    });
    return counts;
  }, [candidates]);

  // Virtual list row renderer
  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const candidate = filteredCandidates[index];
      return <CandidateCard candidate={candidate} style={style} />;
    },
    [filteredCandidates]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading candidates...</p>
          <p className="text-sm text-gray-500 mt-2">Parsing CSV data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadCandidates}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🗳️ Iraqi Election Candidates
          </h1>
          <p className="text-gray-600">
            Total Candidates:{' '}
            <span className="font-semibold text-primary">{candidates.length.toLocaleString()}</span>
          </p>
          {parseTime > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              Loaded in {parseTime}ms
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Candidates
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, party, or ID..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {searchTerm !== debouncedSearchTerm && (
                <p className="text-xs text-gray-400 mt-1">Searching...</p>
              )}
            </div>

            {/* District Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Electoral District
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Districts ({candidates.length})</option>
                {districts.map(district => (
                  <option key={district} value={district}>
                    {district || 'Unknown'} ({districtCounts.get(district) || 0})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing{' '}
              <span className="font-semibold text-primary">{filteredCandidates.length}</span> of{' '}
              {candidates.length} candidates
            </p>
          </div>
        </div>

        {/* Virtual Scrolling List */}
        {filteredCandidates.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md p-4">
            <List
              height={600}
              itemCount={filteredCandidates.length}
              itemSize={180}
              width="100%"
              className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            >
              {Row}
            </List>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Scroll to see all {filteredCandidates.length} candidates
            </p>
          </div>
        ) : (
          <div className="text-center bg-white rounded-lg shadow-md p-8">
            <p className="text-xl text-gray-500">No candidates found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HamletCandidateBrowserOptimized;
