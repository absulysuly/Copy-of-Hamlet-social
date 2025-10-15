import { GoogleGenAI } from "@google/genai";

// Vite environment variable - must be prefixed with VITE_
const getApiKey = (): string => {
    return import.meta.env.VITE_GEMINI_API_KEY || '';
};

export const generatePostSuggestion = async (topic: string): Promise<string> => {
    try {
        const apiKey = getApiKey();
        if (!apiKey) {
            console.warn('VITE_GEMINI_API_KEY not set in environment variables');
            return 'AI features disabled. Set VITE_GEMINI_API_KEY to enable.';
        }
        
        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a short, engaging social media post about the following topic for an Iraqi political candidate. Keep it under 280 characters. The topic is: "${topic}"`,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating content with Gemini:", error);
        return "Failed to generate content. Please check the connection and try again.";
    }
};

export const translateText = async (text: string, targetLanguage: 'en' | 'ku' | 'ar'): Promise<string> => {
    if (!text) return "";

    try {
        const apiKey = getApiKey();
        if (!apiKey) {
            console.warn('VITE_GEMINI_API_KEY not set - translation disabled');
            return text; // Return original text if no API key
        }
        
        const ai = new GoogleGenAI({ apiKey });

        const languageMap = {
            en: 'English',
            ku: 'Kurdish (Sorani)',
            ar: 'Arabic',
        };
        const targetLanguageFullName = languageMap[targetLanguage];

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Translate the following text to ${targetLanguageFullName}. Provide only the translated text, with no additional commentary or formatting. The text to translate is: "${text}"`,
        });

        return response.text;
    } catch (error) {
        console.error("Error translating text with Gemini:", error);
        // Fallback to original text in case of an API error
        return text;
    }
};
