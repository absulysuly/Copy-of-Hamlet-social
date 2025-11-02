import { GoogleGenAI } from "@google/genai";

// The API_KEY is expected to be set in the environment variables.
const API_KEY = process.env.API_KEY;

// Initialize the GoogleGenAI client only if the API key is available.
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

/**
 * Generates a social media post using the Gemini API.
 * The prompt is tailored to create content that is witty, culturally relevant to Iraq,
 * and suitable for a young audience.
 * @returns A promise that resolves to the generated post content as a string.
 */
export const generateSocialPost = async (): Promise<string> => {
    if (!ai) {
        console.warn("API_KEY for Gemini is not set. AI features are disabled.");
        return "AI is currently unavailable. Please try again later.";
    }

    try {
        const prompt = "Write a short, witty, and slightly humorous social media post about daily life, politics, or tea in Iraq. Keep it under 280 characters. The tone should be optimistic and engaging for a young Iraqi audience. Do not use hashtags.";

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        return response.text;
    } catch (error) {
        console.error("Error generating social post:", error);
        return "Couldn't generate a post right now. Try again in a moment!";
    }
};
