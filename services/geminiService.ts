import { GoogleGenAI } from "@google/genai";

export const generatePostSuggestion = async (topic: string): Promise<string> => {
    try {
        // Get API key from Vite environment variables
        const apiKey = import.meta.env.VITE_API_KEY;
        if (!apiKey || apiKey === 'your_google_gemini_api_key_here') {
            throw new Error('API key not configured');
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
        // Get API key from Vite environment variables
        const apiKey = import.meta.env.VITE_API_KEY;
        if (!apiKey || apiKey === 'your_google_gemini_api_key_here') {
            throw new Error('API key not configured');
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
