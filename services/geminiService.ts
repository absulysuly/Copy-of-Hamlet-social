import { GoogleGenAI, type GenerateContentResponse } from "@google/genai";
import { Post, User } from "../types";

const RAW_API_KEY =
    (typeof process !== "undefined" &&
        (process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? process.env.GEMINI_API_KEY)) ||
    "";

const API_KEY = RAW_API_KEY && RAW_API_KEY !== "your_google_gemini_api_key_here" ? RAW_API_KEY : "";

let cachedClient: GoogleGenAI | null = null;

const ensureClient = (): GoogleGenAI | null => {
    if (!API_KEY) {
        return null;
    }

    if (!cachedClient) {
        try {
            cachedClient = new GoogleGenAI({ apiKey: API_KEY });
        } catch (error) {
            console.error("Failed to initialise Google Gemini client:", error);
            cachedClient = null;
        }
    }

    return cachedClient;
};

const extractText = (response: GenerateContentResponse): string => {
    const maybeResponse = (response as unknown as { response?: { text?: () => string } }).response;
    if (maybeResponse?.text) {
        try {
            const value = maybeResponse.text();
            if (value) {
                return value;
            }
        } catch (error) {
            console.error("Failed to extract Gemini response text via response.text():", error);
        }
    }

    const maybeText = (response as unknown as { text?: string | (() => string) }).text;
    if (typeof maybeText === "function") {
        return maybeText();
    }
    if (typeof maybeText === "string") {
        return maybeText;
    }

    return "";
};

const FALLBACK_POST_SUGGESTIONS = [
    (topic: string) => `Share your thoughts about ${topic} with your community!`,
    (topic: string) => `What's your perspective on ${topic}? Let's discuss!`,
    (topic: string) => `Join the conversation about ${topic} - your voice matters!`,
    (topic: string) => `Share your experience with ${topic} and inspire others!`,
];

export const AI_UNAVAILABLE_MESSAGE =
    "AI features are temporarily unavailable. The platform team is working to restore this service soon.";

export const isGeminiConfigured = (): boolean => Boolean(API_KEY);

export const generatePostSuggestion = async (topic: string): Promise<string> => {
    const fallback = FALLBACK_POST_SUGGESTIONS[Math.floor(Math.random() * FALLBACK_POST_SUGGESTIONS.length)](topic);
    const client = ensureClient();

    if (!client) {
        return fallback;
    }

    try {
        const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate a short, engaging social media post about: "${topic}"`,
        });

        return extractText(response) || fallback;
    } catch (error) {
        console.error("AI post suggestion error:", error);
        return fallback;
    }
};

export const translateText = async (
    text: string,
    targetLanguage: "en" | "ku" | "ar",
): Promise<string> => {
    if (!text) {
        return "";
    }

    const client = ensureClient();
    if (!client) {
        return text;
    }

    try {
        const languageMap = {
            en: "English",
            ku: "Kurdish (Sorani)",
            ar: "Arabic",
        } as const;

        const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Translate to ${languageMap[targetLanguage]}: "${text}"`,
        });

        return extractText(response) || text;
    } catch (error) {
        console.error("Translation error:", error);
        return text;
    }
};

export const generateCandidateResponse = async (
    candidate: User,
    question: string,
    recentPosts: Partial<Post>[],
): Promise<string> => {
    const client = ensureClient();
    if (!client) {
        return "Thank you for your question. As an AI simulation, I'd recommend looking at the candidate's recent posts for information on this topic. A real response would be forthcoming from their office.";
    }

    const postSnippets = recentPosts.map((p) => `- "${p.content?.substring(0, 100)}..."`).join("\n");
    const context = `
        You are simulating a response from an Iraqi Member of Parliament (MP).
        MP's Profile:
        - Name: ${candidate.name}
        - Political Party: ${candidate.party}
        - Governorate: ${candidate.governorate}
        - Biography: ${candidate.bio || "Not provided."}
        - Snippets from recent posts:
        ${postSnippets || "- No recent posts provided."}

        Based *only* on the information above, answer the following question from a citizen.
        Your response should be in the first person, as if you are the MP.
        Keep the response concise, professional, and relevant to an Iraqi political context.
        If the information is not available to answer the question, politely state that you will look into the matter.
    `;

    try {
        const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Question from citizen: "${question}"`,
            config: {
                systemInstruction: context,
            },
        });
        return extractText(response) || AI_UNAVAILABLE_MESSAGE;
    } catch (error) {
        console.error("AI MP Response service error:", error);
        return AI_UNAVAILABLE_MESSAGE;
    }
};

export const generateAnswerForNeighbor = async (question: string, governorate: string): Promise<string> => {
    const client = ensureClient();
    if (!client) {
        return "Thank you for your question. As an AI assistant, I can provide general information. For specific local issues, consulting official sources or local representatives is always recommended.";
    }

    const context = `
        You are "Hayy AI", a helpful and neutral AI assistant for an Iraqi social platform.
        Your goal is to provide informative, balanced, and constructive answers to questions from Iraqi citizens.
        The question is from a user in the ${governorate} governorate.
        Your answer should be:
        - Non-partisan and objective.
        - Respectful of all Iraqi communities and viewpoints.
        - Focused on providing factual information or helpful context.
        - If the question is about a local issue, acknowledge the local context if possible but provide a general, helpful response.
        - Keep the answer concise and easy to understand for a general audience.
        - Answer in the same language as the question.
    `;

    try {
        const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Question: "${question}"`,
            config: {
                systemInstruction: context,
            },
        });
        return extractText(response) || AI_UNAVAILABLE_MESSAGE;
    } catch (error) {
        console.error("Hayy AI service error:", error);
        return AI_UNAVAILABLE_MESSAGE;
    }
};

export const generateTeaHouseResponse = async (message: string): Promise<string> => {
    const client = ensureClient();
    if (!client) {
        return AI_UNAVAILABLE_MESSAGE;
    }

    try {
        const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Respond empathetically and constructively to the following community discussion message: "${message}"`,
        });
        return extractText(response) || AI_UNAVAILABLE_MESSAGE;
    } catch (error) {
        console.error("Tea House AI service error:", error);
        return AI_UNAVAILABLE_MESSAGE;
    }
};