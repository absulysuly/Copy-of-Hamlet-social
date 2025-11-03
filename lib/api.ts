import axios from 'axios';
import { Candidate, Governorate, Stats, PaginatedCandidates } from './types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://iraq-election-backend-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export const fetchGovernorates = async (): Promise<Governorate[]> => {
    const { data } = await api.get('/api/governorates');
    return data;
};

export const fetchStats = async (): Promise<Stats> => {
    const { data } = await api.get('/api/stats');
    return data;
};
