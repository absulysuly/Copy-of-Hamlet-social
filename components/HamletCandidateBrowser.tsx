import React, { useEffect, useState } from 'react';

interface Candidate {
  CandidateID: string;
  FullName: string;
  BallotName: string;
  ElectoralDistrict: string;
  Sex: string;
  DataQuality: string;
  LastUpdated: string;
}

const HamletCandidateBrowser: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      const response = await fetch('/candidates.csv');
      
      if (!response.ok) {
        throw new Error('Failed to load candidates data');
      }

      const text = await response.text();
      const parsed = parseCSV(text);
      setCandidates(parsed);
      setError(null);
    } catch (err) {
      console.error('Error loading candidates:', err);
      setError(err instanceof Error ? err.message : 'Failed to load candidates');
    } finally {
      setLoading(false);
    }
  };

  const parseCSV = (text: string): Candidate[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    const data: Candidate[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      if (values.length === headers.length) {
        const candidate: any = {};
        headers.forEach((header, index) => {
          candidate[header] = values[index];
        });
        data.push(candidate as Candidate);
      }
    }

    return data;
  };

  const parseCSVLine = (line: string): string[] => {
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
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = 
      candidate.FullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.BallotName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.CandidateID?.includes(searchTerm);
    
    const matchesDistrict = 
      selectedDistrict === 'all' || 
      candidate.ElectoralDistrict === selectedDistrict;

    return matchesSearch && matchesDistrict;
  });

  const districts = Array.from(new Set(candidates.map(c => c.ElectoralDistrict).filter(Boolean)));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading candidates...</p>
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
            Total Candidates: <span className="font-semibold text-primary">{candidates.length.toLocaleString()}</span>
          </p>
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
                    {district || 'Unknown'} ({candidates.filter(c => c.ElectoralDistrict === district).length})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-primary">{filteredCandidates.length}</span> of {candidates.length} candidates
            </p>
          </div>
        </div>

        {/* Candidates List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCandidates.slice(0, 50).map((candidate, index) => (
            <div key={`${candidate.CandidateID}-${index}`} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {candidate.FullName || 'Name not available'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {candidate.BallotName || 'No party affiliation'}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  candidate.DataQuality === 'OK' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
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
                    <span className="font-medium">{candidate.ElectoralDistrict}</span>
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
          ))}
        </div>

        {filteredCandidates.length > 50 && (
          <div className="mt-6 text-center bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-600">
              Showing first 50 results. Use filters to narrow down your search.
            </p>
          </div>
        )}

        {filteredCandidates.length === 0 && (
          <div className="text-center bg-white rounded-lg shadow-md p-8">
            <p className="text-xl text-gray-500">No candidates found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HamletCandidateBrowser;
