import axios from 'axios';
import { Candidate, Governorate, Stats, PaginatedCandidates } from './types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4001',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 second timeout
});

export const fetchCandidates = async (params: {
    page?: number,
    limit?: number,
    query?: string,
    governorate?: string,
    gender?: 'Male' | 'Female',
    sort?: string,
}): Promise<PaginatedCandidates> => {
    try {
        const { data } = await api.get('/api/candidates', { params });
        return data;
    } catch (error) {
        console.warn('Backend API not available, returning empty data');
        return { data: [], total: 0, page: 1, limit: 12 };
    }
};

export const fetchCandidateById = async (id: string): Promise<Candidate> => {
    try {
        const { data } = await api.get(`/api/candidates/${id}`);
        return data;
    } catch (error) {
        throw new Error('Candidate not found - backend unavailable');
    }
};

export const fetchGovernorates = async (): Promise<Governorate[]> => {
    try {
        const { data } = await api.get('/api/governorates');
        return data;
    } catch (error) {
        console.warn('Backend API not available, returning empty governorates');
        return [];
    }
};

export const fetchStats = async (): Promise<Stats> => {
    try {
        const { data } = await api.get('/api/stats');
        return data;
    } catch (error) {
        console.warn('Backend API not available, returning empty stats');
        return {
            total_candidates: 0,
            gender_distribution: { Male: 0, Female: 0 },
            candidates_per_governorate: [],
        };
    }
};
