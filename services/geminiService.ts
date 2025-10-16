import { GoogleGenAI } from "@google/genai";

// In-memory cache to store translations { [cacheKey]: translation }
const translationCache: { [key: string]: string } = {};

// Access environment variables from the window.process shim defined in index.html
const apiKey = (window as any).process?.env?.VITE_API_KEY;

// Check if the API key is missing or is still the placeholder value
const isApiKeyInvalid = !apiKey || apiKey.includes('your_google_gemini_api_key_here');

if (isApiKeyInvalid) {
    console.error("API_KEY is not set or is a placeholder in index.html. AI features will be disabled.");
}

// Initialize the Google AI client only if the API key is valid
const ai = !isApiKeyInvalid ? new GoogleGenAI({ apiKey }) : null;

export const generatePostSuggestion = async (topic: string): Promise<string> => {
    if (!ai) {
        return "AI features are disabled. Please configure your API_KEY in index.html.";
    }

    try {
        const prompt = `Generate a concise and engaging social media post for an Iraqi political candidate about the topic: "${topic}". The post should be in Arabic, under 280 characters, and suitable for a platform that encourages civic engagement.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error getting post suggestion from Gemini API:", error);
        return "Failed to generate content due to an API error.";
    }
};

export const translateText = async (text: string, targetLanguage: 'en' | 'ku' | 'ar'): Promise<string> => {
    if (!text) return "";
    
    const cacheKey = `${targetLanguage}:${text}`;
    if (translationCache[cacheKey]) {
        return translationCache[cacheKey];
    }
    
    if (!ai) {
        console.warn("Translation failed. AI features are disabled due to missing API key.");
        return text; // Fallback to original text
    }

    try {
        const langMap = {
            en: 'English',
            ar: 'Arabic',
            ku: 'Kurdish (Sorani)'
        };
        const targetLangName = langMap[targetLanguage];
        const prompt = `Translate the following text to ${targetLangName}:\n\n"${text}"`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        const translatedText = response.text;
        translationCache[cacheKey] = translatedText;
        return translatedText;

    } catch (error) {
        console.error("Error translating text with Gemini API:", error);
        return text; // Fallback to original text on error
    }
};