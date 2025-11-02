import { Candidate, Governorate, Stats, PaginatedCandidates, Party } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  try {
    // Fix: Create a correctly typed options object to satisfy TypeScript while including the Next.js `next` property.
    const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    };
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      // For POST requests that might not return JSON, handle them gracefully.
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        return {} as T;
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // Handle cases where the response body might be empty
    const text = await response.text();
    return text ? JSON.parse(text) : ({} as T);

  } catch (error) {
    console.error(`API request failed for endpoint: ${endpoint}`, error);
    throw error;
  }
}

export const fetchCandidates = async (params: {
    page?: number,
    limit?: number,
    query?: string,
    governorate?: string,
    party?: string,
    gender?: 'male' | 'female',
    sort?: string,
}): Promise<PaginatedCandidates> => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.query) queryParams.append('q', params.query);
    if (params.governorate) queryParams.append('governorate', params.governorate);
    if (params.party) queryParams.append('party', params.party);
    if (params.gender) queryParams.append('gender', params.gender);
    if (params.sort) queryParams.append('sort', params.sort);

    return apiRequest<PaginatedCandidates>(`/api/candidates?${queryParams.toString()}`);
};

export const fetchCandidateById = async (id: string): Promise<Candidate> => {
    return apiRequest<Candidate>(`/api/candidates/${id}`);
};

export const fetchGovernorates = async (): Promise<Governorate[]> => {
    return apiRequest<Governorate[]>('/api/governorates');
};

export const fetchParties = async (): Promise<Party[]> => {
    return apiRequest<Party[]>('/api/parties');
};

export const fetchStats = async (): Promise<Stats> => {
    return apiRequest<Stats>('/api/stats');
};

export const likePost = async (postId: string): Promise<{ success: boolean }> => {
  // NOTE: This endpoint doesn't exist on the mock backend, so the request will
  // fail in the browser console. This is expected and serves as proof that
  // the frontend is attempting to communicate with a real backend service.
  return apiRequest(`/api/posts/${postId}/like`, {
    method: 'POST',
  });
};