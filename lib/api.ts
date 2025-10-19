import axios from 'axios';
import { z } from 'zod';

import { reportApiFallback } from '@/lib/telemetry';

import { Candidate, Governorate, PaginatedCandidates, Stats } from './types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4001',
  headers: {
    'Content-Type': 'application/json',
  },
});

const CandidateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  gender: z.string().optional(),
  governorate: z.string().optional(),
  party: z.string().optional(),
  nomination_type: z.string().optional(),
  ballot_number: z.number().optional(),
});

const PaginatedCandidatesSchema = z.object({
  data: z.array(CandidateSchema),
  total: z.number(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

const StatsSchema = z.object({
  total_candidates: z.number(),
  gender_distribution: z.object({
    Male: z.number(),
    Female: z.number(),
  }),
  candidates_per_governorate: z.array(z.any()),
});

const GovernorateSchema = z.object({
  id: z.number().optional(),
  name_en: z.string().optional(),
  name_ar: z.string().optional(),
});

const GovernoratesSchema = z.array(GovernorateSchema);
const CandidateArraySchema = z.array(CandidateSchema);

const isDev = process.env.NODE_ENV !== 'production';

const FALLBACK_PAGINATION = {
  page: 1,
  limit: 10,
} as const;

const FALLBACK_CANDIDATE: Candidate = {
  id: 'unknown',
  name: 'Unknown Candidate',
  gender: 'Male',
  governorate: 'Unknown',
  party: 'Independent',
  nomination_type: 'General',
  ballot_number: 0,
};

const FALLBACK_STATS: Stats = {
  total_candidates: 0,
  gender_distribution: {
    Male: 0,
    Female: 0,
  },
  candidates_per_governorate: [],
};

function truncateSample(payload: unknown): unknown {
  if (!isDev) {
    return undefined;
  }

  try {
    const serialized = JSON.stringify(payload);
    if (!serialized) {
      return undefined;
    }

    return serialized.length > 1024 ? `${serialized.slice(0, 1024)}…` : serialized;
  } catch (error) {
    return undefined;
  }
}

function logValidationError(endpoint: string, error: Error, payload: unknown) {
  const sample = truncateSample(payload);
  reportApiFallback(endpoint, 'Schema validation failed', sample);

  if (isDev) {
    console.debug('[API Validation]', endpoint, error.message, sample);
  } else {
    console.error('[API Validation] Schema mismatch:', error.message);
  }
}

function handleNetworkFailure<T>(endpoint: string, error: unknown, fallback: T): T {
  const reason = error instanceof Error ? error.message : 'Unknown network error';
  reportApiFallback(endpoint, 'Network error', reason);

  if (isDev) {
    console.error(`[API] ${endpoint} request failed`, error);
  }

  return fallback;
}

function ensurePaginationDefaults(
  result: { data: Candidate[]; total: number; page?: number; limit?: number },
  params: FetchCandidateParams
): PaginatedCandidates {
  return {
    data: result.data,
    total: result.total,
    page: result.page ?? params.page ?? FALLBACK_PAGINATION.page,
    limit: result.limit ?? params.limit ?? result.data.length ?? FALLBACK_PAGINATION.limit,
  };
}

function normalizeCandidatesPayload(raw: unknown, params: FetchCandidateParams) {
  if (Array.isArray(raw)) {
    return {
      data: raw,
      total: raw.length,
      page: params.page ?? FALLBACK_PAGINATION.page,
      limit:
        params.limit ?? (typeof raw.length === 'number' ? raw.length : FALLBACK_PAGINATION.limit),
    };
  }

  if (raw && typeof raw === 'object') {
    const response = raw as Record<string, unknown>;

    if (Array.isArray(response.data)) {
      return {
        data: response.data,
        total: typeof response.total === 'number' ? response.total : response.data.length,
        page: typeof response.page === 'number' ? response.page : params.page ?? FALLBACK_PAGINATION.page,
        limit:
          typeof response.limit === 'number'
            ? response.limit
            : params.limit ?? (Array.isArray(response.data) ? response.data.length : undefined) ?? FALLBACK_PAGINATION.limit,
      };
    }

    if (response.success && Array.isArray(response.result)) {
      return {
        data: response.result,
        total: typeof response.total === 'number' ? response.total : response.result.length,
        page: params.page ?? FALLBACK_PAGINATION.page,
        limit:
          params.limit ?? (Array.isArray(response.result) ? response.result.length : undefined) ?? FALLBACK_PAGINATION.limit,
      };
    }
  }

  return raw;
}

type FetchCandidateParams = {
  page?: number;
  limit?: number;
  query?: string;
  governorate?: string;
  gender?: 'Male' | 'Female';
  sort?: string;
};

const createCandidatesFallback = (params: FetchCandidateParams): PaginatedCandidates => ({
  data: [],
  total: 0,
  page: params.page ?? FALLBACK_PAGINATION.page,
  limit: params.limit ?? FALLBACK_PAGINATION.limit,
});

export const fetchCandidates = async (params: FetchCandidateParams = {}): Promise<PaginatedCandidates> => {
  try {
    const { data } = await api.get('/api/candidates', { params });
    const normalized = normalizeCandidatesPayload(data, params);
    const parsed = PaginatedCandidatesSchema.safeParse(normalized);

    if (!parsed.success) {
      logValidationError('/api/candidates', parsed.error, normalized);
      return createCandidatesFallback(params);
    }

    return ensurePaginationDefaults(parsed.data, params);
  } catch (error) {
    return handleNetworkFailure('/api/candidates', error, createCandidatesFallback(params));
  }
};

export const fetchCandidateById = async (id: string): Promise<Candidate> => {
  try {
    const { data } = await api.get(`/api/candidates/${id}`);
    const parsed = CandidateSchema.safeParse(data);

    if (!parsed.success) {
      logValidationError(`/api/candidates/${id}`, parsed.error, data);
      return { ...FALLBACK_CANDIDATE, id };
    }

    return parsed.data;
  } catch (error) {
    return handleNetworkFailure(`/api/candidates/${id}`, error, { ...FALLBACK_CANDIDATE, id });
  }
};

export const fetchTrendingCandidates = async (limit: number = 6): Promise<Candidate[]> => {
  try {
    const { data } = await api.get('/api/trending', { params: { limit } });
    const parsed = CandidateArraySchema.safeParse(data);

    if (!parsed.success) {
      logValidationError('/api/trending', parsed.error, data);
      return [];
    }

    return parsed.data;
  } catch (error) {
    return handleNetworkFailure('/api/trending', error, []);
  }
};

export const fetchGovernorates = async (): Promise<Governorate[]> => {
  try {
    const { data } = await api.get('/api/governorates');
    const parsed = GovernoratesSchema.safeParse(data);

    if (!parsed.success) {
      logValidationError('/api/governorates', parsed.error, data);
      return [];
    }

    return parsed.data as Governorate[];
  } catch (error) {
    return handleNetworkFailure('/api/governorates', error, []);
  }
};

export const fetchStats = async (): Promise<Stats> => {
  try {
    const { data } = await api.get('/api/stats');
    const parsed = StatsSchema.safeParse(data);

    if (!parsed.success) {
      logValidationError('/api/stats', parsed.error, data);
      return FALLBACK_STATS;
    }

    return parsed.data;
  } catch (error) {
    return handleNetworkFailure('/api/stats', error, FALLBACK_STATS);
  }
};
