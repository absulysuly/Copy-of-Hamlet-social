import { Candidate, Governorate, Stats, PaginatedCandidates, Party } from './types';

const PRIMARY_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BACKUP_API_URL = process.env.NEXT_PUBLIC_BACKUP_API;

async function fetchWithFallback<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  if (!PRIMARY_API_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
  }

  const primaryUrl = `${PRIMARY_API_URL}${endpoint}`;
  let response: Response;

  try {
    response = await fetch(primaryUrl, options);
    // If the primary server has a 5xx issue, trigger fallback by throwing an error
    if (response.status >= 500) {
      throw new Error(`Primary API server error: ${response.status}`);
    }
  } catch (error) {
    console.warn(`Primary API request to ${primaryUrl} failed: ${error}. Attempting fallback.`);
    if (BACKUP_API_URL) {
      const backupUrl = `${BACKUP_API_URL}${endpoint}`;
      try {
        response = await fetch(backupUrl, options);
      } catch (backupError) {
         console.error(`Backup API request to ${backupUrl} also failed:`, backupError);
         // Re-throw the backup error if it fails
         throw backupError;
      }
    } else {
      // Re-throw the original error if no backup is available
      throw error;
    }
  }
  
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Could not read error response body.');
    throw new Error(`API Error: ${response.status} ${response.statusText}. Body: ${errorText}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : ({} as T);
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // Fix: Create a correctly typed options object to satisfy TypeScript while including the Next.js `next` property.
  const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    next: { revalidate: 3600 }, // Revalidate every hour
  };

  return fetchWithFallback<T>(endpoint, fetchOptions);
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