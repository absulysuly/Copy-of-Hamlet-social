
import { GoogleGenAI } from "@google/genai";

// --- SECURITY WARNING ---
// Exposing an API key on the client-side is a significant security risk.
// This key can be easily stolen and used maliciously, leading to unexpected charges.
// For a production application, this entire service should be moved to a backend server.
// Create a secure API endpoint on your server (e.g., /api/generate-suggestion)
// that calls the Gemini API. The client should then call your secure endpoint.
// See the README.md for more details.
// --------------------

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey) {
    ai = new GoogleGenAI({ apiKey: apiKey });
} else {
    console.error("API_KEY environment variable not set. Gemini features will be disabled.");
}


export const generatePostSuggestion = async (topic: string): Promise<string> => {
    if (!ai) {
        return "API key not configured. Please check your environment variables.";
    }
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a short, engaging, and bilingual (English and Arabic) social media post for an Iraqi political candidate about: "${topic}". The tone should be positive, civic-minded, and inspiring. Include relevant hashtags.`,
            config: {
                systemInstruction: "You are a helpful assistant for a political campaign in Iraq, creating social media content.",
                // Fix: `temperature` should be a number (e.g. 0.7), not a float.
                temperature: 0.7,
                topP: 1,
                topK: 32,
            }
        });
        
        return response.text;
    } catch (error) {
        console.error("Error generating content with Gemini API:", error);
        return "Failed to generate content. Please try again later.";
    }
};
