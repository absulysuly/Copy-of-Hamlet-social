import axios from 'axios';
import { Candidate, Governorate, Stats, PaginatedCandidates } from './types';

// Primary API: Railway backend
// Fallback: Cloudflare Worker proxy
const getApiBaseURL = (): string => {
  // Priority: NEXT_PUBLIC_API_URL (Railway) > NEXT_PUBLIC_BACKUP_API (Worker) > NEXT_PUBLIC_API_BASE_URL > localhost
  return (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_BACKUP_API ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'http://localhost:4001'
  );
};

const api = axios.create({
  baseURL: getApiBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for error handling with fallback
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If primary API fails and we have a backup, try the backup
    if (
      error.config &&
      !error.config._retry &&
      process.env.NEXT_PUBLIC_BACKUP_API &&
      error.config.baseURL === process.env.NEXT_PUBLIC_API_URL
    ) {
      error.config._retry = true;
      error.config.baseURL = process.env.NEXT_PUBLIC_BACKUP_API;
      return api.request(error.config);
    }
    return Promise.reject(error);
  }
);

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

export const fetchCandidateById = async (id: string): Promise<Candidate> => {
    const { data } = await api.get(`/api/candidates/${id}`);
    return data;
};

export const fetchTrendingCandidates = async (limit: number = 6): Promise<Candidate[]> => {
    const { data } = await api.get('/api/trending', { params: { limit } });
    return data;
};

export const fetchGovernorates = async (): Promise<Governorate[]> => {
    const { data } = await api.get('/api/governorates');
    return data;
};

export const fetchStats = async (): Promise<Stats> => {
    const { data } = await api.get('/api/stats');
    return data;
};