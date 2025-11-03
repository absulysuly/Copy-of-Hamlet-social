// lib/api.ts - Frontend API Service for Iraqi Election Platform
// Connect this to Railway backend

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4001',
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export const searchCandidates = async (query: string) => {
  const { data } = await api.get('/api/candidates/search', {
    params: { q: query }
  });
  return data;
};

export default api;
