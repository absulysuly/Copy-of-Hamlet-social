export type { Governorate as GovernorateName, User, UserRole, Article, Event, Post } from '../shared-schema/types';

export interface Governorate {
  id: string;
  name: string;
  enName: string;
  path: string;
}

export interface Candidate {
  id: number;
  name: string;
  party: string;
  imageUrl: string;
  verified: boolean;
  governorate: string;
  platformSummary?: string;
  votes?: number;
}

export interface GovernorateData {
    governorate: Governorate;
    candidates: Candidate[];
    news: NewsArticle[];
    localStats: {
        registeredVoters: number;
        pollingStations: number;
    };
}