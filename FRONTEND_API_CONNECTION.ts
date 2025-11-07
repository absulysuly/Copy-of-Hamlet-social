/**
 * FRONTEND API SERVICE - Connect to Railway Backend
 * File: lib/api.ts or services/apiService.ts
 * 
 * INSTRUCTIONS:
 * 1. Copy this file to your frontend project as lib/api.ts
 * 2. Update NEXT_PUBLIC_API_BASE_URL in Vercel environment variables
 * 3. Redeploy frontend
 */

import axios from 'axios';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://iraq-election-masterpiece-production.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Types
export interface Candidate {
  id: string;
  name: string;
  nameArabic: string;
  nameEnglish: string;
  gender: 'Male' | 'Female';
  governorate: string;
  party: string;
  partyArabic: string;
  partyEnglish: string;
  ballot_number: number;
  photo: string;
  views: number;
  supporters: number;
  verified: boolean;
  bio?: string;
}

export interface PaginatedCandidates {
  data: Candidate[];
  total: number;
  page: number;
  limit: number;
  pages: number;
  hasMore: boolean;
}

export interface Governorate {
  id: number;
  name_en: string;
  name_ar: string;
  name_ku: string;
  candidate_count: number;
}

export interface Stats {
  total_candidates: number;
  verified_candidates: number;
  gender_distribution: {
    Male: number;
    Female: number;
    percentage_female: string;
  };
  candidates_per_governorate: Array<{
    governorate_name: string;
    candidate_count: number;
  }>;
  top_parties: Array<{
    party_name: string;
    candidate_count: number;
  }>;
}

// API Functions

/**
 * Fetch paginated list of candidates with filters
 */
export const fetchCandidates = async (params: {
  page?: number;
  limit?: number;
  query?: string;
  governorate?: string;
  gender?: 'Male' | 'Female';
  party?: string;
  sort?: string;
}): Promise<PaginatedCandidates> => {
  try {
    const { data } = await api.get('/api/candidates', { params });
    return data;
  } catch (error) {
    console.error('Error fetching candidates:', error);
    throw error;
  }
};

/**
 * Fetch single candidate by ID
 */
export const fetchCandidateById = async (id: string): Promise<Candidate> => {
  try {
    const { data } = await api.get(`/api/candidates/${id}`);
    return data.data || data;
  } catch (error) {
    console.error(`Error fetching candidate ${id}:`, error);
    throw error;
  }
};

/**
 * Search candidates
 */
export const searchCandidates = async (query: string, filters?: {
  governorate?: string;
  sex?: string;
  limit?: number;
}): Promise<{ success: boolean; data: Candidate[]; meta: any }> => {
  try {
    const { data } = await api.get('/api/candidates/search', {
      params: { q: query, ...filters }
    });
    return data;
  } catch (error) {
    console.error('Error searching candidates:', error);
    throw error;
  }
};

/**
 * Fetch all Iraqi governorates
 */
export const fetchGovernorates = async (): Promise<Governorate[]> => {
  try {
    const { data } = await api.get('/api/governorates');
    return data;
  } catch (error) {
    console.error('Error fetching governorates:', error);
    throw error;
  }
};

/**
 * Fetch all political parties
 */
export const fetchParties = async (): Promise<Array<{
  name_ar: string;
  name_en: string;
  candidate_count: number;
}>> => {
  try {
    const { data } = await api.get('/api/parties');
    return data.data || data;
  } catch (error) {
    console.error('Error fetching parties:', error);
    throw error;
  }
};

/**
 * Fetch election statistics
 */
export const fetchStats = async (): Promise<Stats> => {
  try {
    const { data } = await api.get('/api/stats');
    return data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

/**
 * Fetch trending candidates
 */
export const fetchTrending = async (limit: number = 20): Promise<Candidate[]> => {
  try {
    const { data } = await api.get('/api/trending', { params: { limit } });
    return data.data || data;
  } catch (error) {
    console.error('Error fetching trending candidates:', error);
    throw error;
  }
};

/**
 * Fetch featured candidates
 */
export const fetchFeatured = async (): Promise<Candidate[]> => {
  try {
    const { data } = await api.get('/api/featured');
    return data.data || data;
  } catch (error) {
    console.error('Error fetching featured candidates:', error);
    throw error;
  }
};

/**
 * Create new candidate
 */
export const createCandidate = async (candidateData: {
  name: string;
  phone: string;
  province: string;
  party?: string;
  email?: string;
  gender?: string;
  bio?: string;
}): Promise<Candidate> => {
  try {
    const { data } = await api.post('/api/candidates', candidateData);
    return data.data || data;
  } catch (error) {
    console.error('Error creating candidate:', error);
    throw error;
  }
};

/**
 * Health check
 */
export const checkHealth = async (): Promise<{
  status: string;
  database: string;
  timestamp: string;
}> => {
  try {
    const { data } = await api.get('/health');
    return data;
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};

// Export axios instance for custom requests
export default api;

// Export API base URL for reference
export { API_BASE_URL };
