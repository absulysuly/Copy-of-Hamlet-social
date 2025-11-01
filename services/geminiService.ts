// Gemini service - optional feature, can be enabled when package is installed
// import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { User, Post } from '../types';

// Mock implementation until @google/genai is installed
export const translatePost = async (post: Post, targetLanguage: string): Promise<string> => {
    // Placeholder - returns original content
    return post.content;
};

export const generateSummary = async (content: string): Promise<string> => {
    // Placeholder - returns truncated content
    return content.substring(0, 150) + '...';
};

export const analyzeSentiment = async (content: string): Promise<'positive' | 'neutral' | 'negative'> => {
    // Placeholder - returns neutral
    return 'neutral';
};
