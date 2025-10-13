export interface CandidatePayload {
  name: string;
  phone: string;
  province: string;
  district?: string;
  party?: string;
  facebookUrl?: string;
  notes?: string;
}

export type CandidateStatus = 'new' | 'contacted' | 'interested' | 'not-interested';

export interface CandidateRecord extends CandidatePayload {
  id: string;
  invitationSent: boolean;
  invitationSentAt?: string;
  responded: boolean;
  respondedAt?: string;
  status: CandidateStatus;
  createdAt: string;
}

export interface CandidateStats {
  total: number;
  invited: number;
  responded: number;
  responseRate: number;
  byProvince: Record<string, number>;
  byStatus: Record<string, number>;
}

const BASE_PATH = '/portal/candidates';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export async function getCandidates(): Promise<CandidateRecord[]> {
  const response = await fetch(BASE_PATH);
  if (!response.ok) {
    throw new Error('Failed to fetch candidates');
  }
  const payload = await response.json();
  return payload.candidates ?? [];
}

export async function getStats(): Promise<CandidateStats> {
  const response = await fetch(`${BASE_PATH}/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch candidate stats');
  }
  const payload = await response.json();
  return payload.stats;
}

export async function addCandidate(candidate: CandidatePayload): Promise<CandidateRecord> {
  const response = await fetch(BASE_PATH, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(candidate),
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || 'Failed to add candidate');
  }
  const payload = await response.json();
  return payload.candidate;
}

export async function bulkImport(candidates: CandidatePayload[]): Promise<number> {
  const response = await fetch(`${BASE_PATH}/bulk`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ candidates }),
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || 'Failed to import candidates');
  }
  const payload = await response.json();
  return payload.imported ?? 0;
}

export async function sendInvitations(candidateIds?: string[], customMessage?: string): Promise<number> {
  const response = await fetch(`${BASE_PATH}/send-invitations`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ candidateIds, customMessage }),
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || 'Failed to send invitations');
  }
  const payload = await response.json();
  return payload.sent ?? 0;
}

export async function updateCandidateStatus(id: string, status: CandidateStatus, notes?: string): Promise<CandidateRecord> {
  const response = await fetch(`${BASE_PATH}/${id}/status`, {
    method: 'PUT',
    headers: defaultHeaders,
    body: JSON.stringify({ status, notes }),
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || 'Failed to update candidate');
  }
  const payload = await response.json();
  return payload.candidate;
}
