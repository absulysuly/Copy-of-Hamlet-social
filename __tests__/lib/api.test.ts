import { describe, it, expect, vi, beforeEach } from 'vitest';

const axiosMocks = vi.hoisted(() => {
  const getMock = vi.fn();
  const createMock = vi.fn(() => ({ get: getMock }));
  return { getMock, createMock };
});

const telemetryMocks = vi.hoisted(() => ({
  reportApiFallback: vi.fn(),
  reportHydrationWarning: vi.fn(),
}));

vi.mock('axios', () => ({
  default: {
    create: axiosMocks.createMock,
  },
}));

vi.mock('@/lib/telemetry', () => ({
  reportApiFallback: telemetryMocks.reportApiFallback,
  reportHydrationWarning: telemetryMocks.reportHydrationWarning,
}));

import * as api from '@/lib/api';
import { reportApiFallback } from '@/lib/telemetry';

describe('API Client', () => {
  beforeEach(() => {
    axiosMocks.getMock.mockReset();
    telemetryMocks.reportApiFallback.mockReset();
  });

  describe('fetchCandidates', () => {
    it('normalizes array responses to paginated format', async () => {
      const mockData = [
        { id: '1', name: 'Candidate A' },
        { id: '2', name: 'Candidate B' },
      ];

      axiosMocks.getMock.mockResolvedValueOnce({ data: mockData });

      const result = await api.fetchCandidates({ limit: 2 });

      expect(result.data).toEqual(mockData);
      expect(result.total).toBe(mockData.length);
      expect(result.limit).toBe(2);
      expect(result.page).toBe(1);
    });

    it('normalizes object responses with data property', async () => {
      const mockData = { data: [{ id: '1', name: 'Test' }], total: 1, page: 3, limit: 5 };
      axiosMocks.getMock.mockResolvedValueOnce({ data: mockData });

      const result = await api.fetchCandidates({});

      expect(result.data).toEqual(mockData.data);
      expect(result.total).toBe(1);
      expect(result.page).toBe(3);
      expect(result.limit).toBe(5);
    });

    it('returns fallback and reports telemetry on invalid schema', async () => {
      axiosMocks.getMock.mockResolvedValueOnce({ data: { invalid: true } });

      const result = await api.fetchCandidates({ page: 2, limit: 20 });

      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
      expect(result.page).toBe(2);
      expect(result.limit).toBe(20);
      expect(reportApiFallback).toHaveBeenCalledWith(
        '/api/candidates',
        expect.stringContaining('Schema validation failed'),
        expect.anything(),
      );
    });

    it('returns fallback on network error', async () => {
      axiosMocks.getMock.mockRejectedValueOnce(new Error('Network error'));

      const result = await api.fetchCandidates({ limit: 5 });

      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
      expect(reportApiFallback).toHaveBeenCalled();
    });
  });

  describe('fetchStats', () => {
    it('validates and returns stats data', async () => {
      const stats = {
        total_candidates: 10,
        gender_distribution: { Male: 5, Female: 5 },
        candidates_per_governorate: [],
      };

      axiosMocks.getMock.mockResolvedValueOnce({ data: stats });

      const result = await api.fetchStats();

      expect(result).toEqual(stats);
    });

    it('returns fallback when stats schema invalid', async () => {
      axiosMocks.getMock.mockResolvedValueOnce({ data: { invalid: true } });

      const result = await api.fetchStats();

      expect(result.total_candidates).toBe(0);
      expect(reportApiFallback).toHaveBeenCalledWith(
        '/api/stats',
        expect.stringContaining('Schema validation failed'),
        expect.anything(),
      );
    });
  });
});
