/**
 * FRONTEND API SERVICE - Iraqi Election Platform
 * File: lib/api.ts (place this in your frontend project)
 * 
 * SETUP:
 * 1. Copy this to lib/api.ts in your Next.js project
 * 2. Set NEXT_PUBLIC_API_BASE_URL in Vercel environment variables
 * 3. Use these functions in your React components
 */

import axios from 'axios';

// API Configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// TypeScript Interfaces
export interface Candidate {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  governorate: string;
  party: string;
  ballot_number: number;
}

export interface PaginatedCandidates {
  data: Candidate[];
  total: number;
  page: number;
  limit: number;
}

export interface Governorate {
  id: number;
  name_en: string;
  name_ar: string;
}

export interface Stats {
  total_candidates: number;
  gender_distribution: {
    Male: number;
    Female: number;
  };
  candidates_per_governorate: {
    governorate_name: string;
    candidate_count: number;
  }[];
}

// API Functions

/**
 * Fetch paginated candidates with filters
 * Usage: const data = await fetchCandidates({ page: 1, limit: 50, governorate: 'Baghdad' });
 */
export const fetchCandidates = async (params: {
  page?: number,
  limit?: number,
  query?: string,
  governorate?: string,
  gender?: 'Male' | 'Female',
  sort?: string,
}): Promise<PaginatedCandidates> => {
  const { data } = await api.get('/api/candidates', { params });
  return data;
};

/**
 * Fetch single candidate by ID
 * Usage: const candidate = await fetchCandidateById('clx123abc');
 */
export const fetchCandidateById = async (id: string): Promise<Candidate> => {
  const { data } = await api.get(`/api/candidates/${id}`);
  return data.data || data;
};

/**
 * Get all 18 Iraqi governorates
 * Usage: const governorates = await fetchGovernorates();
 */
export const fetchGovernorates = async (): Promise<Governorate[]> => {
  const { data } = await api.get('/api/governorates');
  return data;
};

/**
 * Get election statistics
 * Usage: const stats = await fetchStats();
 */
export const fetchStats = async (): Promise<Stats> => {
  const { data } = await api.get('/api/stats');
  return data;
};

/**
 * Search candidates by name or party
 * Usage: const results = await searchCandidates('mohammed');
 */
export const searchCandidates = async (query: string) => {
  const { data } = await api.get('/api/candidates/search', {
    params: { q: query }
  });
  return data;
};

export default api;
