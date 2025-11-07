import axios from 'axios';
import { Candidate, Governorate, Stats, PaginatedCandidates } from './types';
import { IRAQI_GOVERNORATES_INFO } from '../constants.ts';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const USE_REMOTE_API = Boolean(API_BASE_URL && API_BASE_URL !== 'http://localhost:4001');

const api = USE_REMOTE_API
  ? axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  : null;

const FALLBACK_CANDIDATES: Candidate[] = [
  {
    id: 'candidate-1',
    name: 'Alaa Hussein',
    gender: 'Male',
    governorate: 'Baghdad',
    party: 'Independent',
    nomination_type: 'General',
    ballot_number: 101,
  },
  {
    id: 'candidate-2',
    name: 'Sara Ahmed',
    gender: 'Female',
    governorate: 'Basra',
    party: 'Reform Bloc',
    nomination_type: 'General',
    ballot_number: 214,
  },
  {
    id: 'candidate-3',
    name: 'Karim Abdullah',
    gender: 'Male',
    governorate: 'Erbil',
    party: 'Unity Alliance',
    nomination_type: 'Minority',
    ballot_number: 87,
  },
];

const FALLBACK_STATS: Stats = {
  total_candidates: FALLBACK_CANDIDATES.length,
  gender_distribution: {
    Male: FALLBACK_CANDIDATES.filter((c) => c.gender === 'Male').length,
    Female: FALLBACK_CANDIDATES.filter((c) => c.gender === 'Female').length,
  },
  candidates_per_governorate: FALLBACK_CANDIDATES.map((candidate) => ({
    governorate_name: candidate.governorate,
    candidate_count: FALLBACK_CANDIDATES.filter((c) => c.governorate === candidate.governorate).length,
  })),
};

const mapToGovernorates = (): Governorate[] =>
  IRAQI_GOVERNORATES_INFO.map((gov) => ({
    id: gov.id,
    name_en: gov.enName,
    name_ar: gov.name,
  }));

const filterCandidates = (params: {
  page?: number;
  limit?: number;
  query?: string;
  governorate?: string;
  gender?: 'Male' | 'Female';
}): PaginatedCandidates => {
  let candidates = [...FALLBACK_CANDIDATES];
  if (params.gender) {
    candidates = candidates.filter((candidate) => candidate.gender === params.gender);
  }
  if (params.governorate) {
    candidates = candidates.filter((candidate) => candidate.governorate === params.governorate);
  }
  if (params.query) {
    const term = params.query.toLowerCase();
    candidates = candidates.filter((candidate) =>
      candidate.name.toLowerCase().includes(term) || candidate.party.toLowerCase().includes(term)
    );
  }
  const limit = params.limit ?? candidates.length;
  const page = params.page ?? 1;
  const start = (page - 1) * limit;
  return {
    data: candidates.slice(start, start + limit),
    total: candidates.length,
    page,
    limit,
  };
};

export const fetchCandidates = async (params: {
    page?: number,
    limit?: number,
    query?: string,
    governorate?: string,
    gender?: 'Male' | 'Female',
    sort?: string,
}): Promise<PaginatedCandidates> => {
    if (!USE_REMOTE_API || !api) {
        return filterCandidates(params);
    }

    try {
        const { data } = await api.get('/api/candidates', { params });
        return data;
    } catch (error) {
        console.warn('Falling back to local candidate data:', error);
        return filterCandidates(params);
    }
};

export const fetchCandidateById = async (id: string): Promise<Candidate> => {
    if (!USE_REMOTE_API || !api) {
        return FALLBACK_CANDIDATES.find((candidate) => candidate.id === id) ?? FALLBACK_CANDIDATES[0];
    }

    try {
        const { data } = await api.get(`/api/candidates/${id}`);
        return data;
    } catch (error) {
        console.warn('Falling back to local candidate detail:', error);
        return FALLBACK_CANDIDATES.find((candidate) => candidate.id === id) ?? FALLBACK_CANDIDATES[0];
    }
};

export const fetchTrendingCandidates = async (limit: number = 6): Promise<Candidate[]> => {
    if (!USE_REMOTE_API || !api) {
        return FALLBACK_CANDIDATES.slice(0, limit);
    }

    try {
        const { data } = await api.get('/api/trending', { params: { limit } });
        return data;
    } catch (error) {
        console.warn('Falling back to local trending candidates:', error);
        return FALLBACK_CANDIDATES.slice(0, limit);
    }
};

export const fetchGovernorates = async (): Promise<Governorate[]> => {
    if (!USE_REMOTE_API || !api) {
        return mapToGovernorates();
    }

    try {
        const { data } = await api.get('/api/governorates');
        return data;
    } catch (error) {
        console.warn('Falling back to local governorate list:', error);
        return mapToGovernorates();
    }
};

export const fetchStats = async (): Promise<Stats> => {
    if (!USE_REMOTE_API || !api) {
        return FALLBACK_STATS;
    }

    try {
        const { data } = await api.get('/api/stats');
        return data;
    } catch (error) {
        console.warn('Falling back to local stats data:', error);
        return FALLBACK_STATS;
    }
};
