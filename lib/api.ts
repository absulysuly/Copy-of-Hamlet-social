import axios from 'axios';
import { Candidate, Governorate, Stats, PaginatedCandidates } from './types';
import { MOCK_USERS, IRAQI_GOVERNORATES_INFO } from '../constants.ts';
import { User, UserRole } from '../types.ts';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4001',
  headers: {
    'Content-Type': 'application/json',
  },
});

const shouldUseMocks = !process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL.includes('localhost');

const mapUserToCandidate = (user: User, index: number): Candidate => {
  const ballotNumber = index + 1;
  return {
    id: user.id,
    name: user.name,
    gender: user.gender === 'Female' ? 'Female' : 'Male',
    governorate: user.governorate,
    party: user.party,
    nomination_type: user.party ? 'Party List' : 'Independent',
    ballot_number: ballotNumber,
    ballotNumber,
  };
};

const mockCandidates = MOCK_USERS.filter((user) => user.role === UserRole.Candidate).map(mapUserToCandidate);

const getFilteredCandidates = (params: {
  page?: number;
  limit?: number;
  query?: string;
  governorate?: string;
  gender?: 'Male' | 'Female';
}) => {
  const { page = 1, limit = 12, query, governorate, gender } = params;
  let candidates = [...mockCandidates];

  if (query) {
    const normalized = query.toLowerCase();
    candidates = candidates.filter((candidate) =>
      candidate.name.toLowerCase().includes(normalized) || candidate.party.toLowerCase().includes(normalized)
    );
  }

  if (governorate) {
    candidates = candidates.filter((candidate) => candidate.governorate === governorate);
  }

  if (gender) {
    candidates = candidates.filter((candidate) => candidate.gender === gender);
  }

  const total = candidates.length;
  const start = (page - 1) * limit;
  const data = candidates.slice(start, start + limit);

  return {
    data,
    total,
    page,
    limit,
  } satisfies PaginatedCandidates;
};

const getMockStats = (): Stats => {
  const totalCandidates = mockCandidates.length;
  const genderDistribution = mockCandidates.reduce(
    (acc, candidate) => {
      acc[candidate.gender] += 1;
      return acc;
    },
    { Male: 0, Female: 0 } as { Male: number; Female: number }
  );

  const candidatesPerGovernorate = mockCandidates.reduce<Record<string, number>>((acc, candidate) => {
    acc[candidate.governorate] = (acc[candidate.governorate] || 0) + 1;
    return acc;
  }, {});

  return {
    total_candidates: totalCandidates,
    gender_distribution: genderDistribution,
    candidates_per_governorate: Object.entries(candidatesPerGovernorate).map(([governorate_name, candidate_count]) => ({
      governorate_name,
      candidate_count,
    })),
  };
};

const getMockGovernorates = (): Governorate[] =>
  IRAQI_GOVERNORATES_INFO.map((gov) => ({
    id: gov.id,
    name_en: gov.enName,
    name_ar: gov.name,
  }));

const safeRequest = async <T>(request: () => Promise<T>, fallback: () => T | Promise<T>): Promise<T> => {
  if (shouldUseMocks) {
    return fallback();
  }
  try {
    return await request();
  } catch (error) {
    console.warn('[api] Falling back to mock data because the API request failed.', error);
    return fallback();
  }
};

export const fetchCandidates = async (params: {
  page?: number;
  limit?: number;
  query?: string;
  governorate?: string;
  gender?: 'Male' | 'Female';
  sort?: string;
}): Promise<PaginatedCandidates> =>
  safeRequest(
    async () => {
      const { data } = await api.get('/api/candidates', { params });
      return data;
    },
    () => getFilteredCandidates(params)
  );

export const fetchCandidateById = async (id: string): Promise<Candidate> =>
  safeRequest(
    async () => {
      const { data } = await api.get(`/api/candidates/${id}`);
      return data;
    },
    () => {
      const candidate = mockCandidates.find((item) => item.id === id);
      if (!candidate) {
        throw new Error(`Candidate with id ${id} not found in mock data.`);
      }
      return candidate;
    }
  );

export const fetchTrendingCandidates = async (limit: number = 6): Promise<Candidate[]> =>
  safeRequest(
    async () => {
      const { data } = await api.get('/api/trending', { params: { limit } });
      return data;
    },
    () => mockCandidates.slice(0, limit)
  );

export const fetchGovernorates = async (): Promise<Governorate[]> =>
  safeRequest(
    async () => {
      const { data } = await api.get('/api/governorates');
      return data;
    },
    () => getMockGovernorates()
  );

export const fetchStats = async (): Promise<Stats> =>
  safeRequest(
    async () => {
      const { data } = await api.get('/api/stats');
      return data;
    },
    () => getMockStats()
  );
