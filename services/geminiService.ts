import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { User, Post } from "../types";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'your_google_gemini_api_key_here') {
    ai = new GoogleGenAI({ apiKey });
}

export const generatePostSuggestion = async (topic: string): Promise<string> => {
    if (!ai) {
        // Fallback suggestions
        const fallbacks = [
            `Share your thoughts about ${topic} with your community!`,
            `What's your perspective on ${topic}? Let's discuss!`,
            `Join the conversation about ${topic} - your voice matters!`,
            `Share your experience with ${topic} and inspire others!`
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
    
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a short, engaging social media post about: "${topic}"`
        });
        return response.text;
    } catch (error) {
        console.error("AI service error:", error);
    }
    
    // Final fallback
    return `Share your thoughts about ${topic} with your community!`;
};

export const translateText = async (text: string, targetLanguage: 'en' | 'ku' | 'ar'): Promise<string> => {
    if (!text) return "";
    
    if (!ai) {
        return text; // Return original text if no API key or AI client
    }
    
    try {
        const languageMap = {
            en: 'English',
            ku: 'Kurdish (Sorani)',
            ar: 'Arabic',
        };
        
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Translate to ${languageMap[targetLanguage]}: "${text}"`
        });
        
        return response.text;
    } catch (error) {
        console.error("Translation error:", error);
    }
    
    return text; // Return original text on error
};

export const generateCandidateResponse = async (candidate: User, question: string, recentPosts: Partial<Post>[]): Promise<string> => {
    if (!ai) {
        return "Thank you for your question. As an AI simulation, I'd recommend looking at the candidate's recent posts for information on this topic. A real response would be forthcoming from their office.";
    }

    const postSnippets = recentPosts.map(p => `- "${p.content?.substring(0, 100)}..."`).join('\n');
    const context = `
        You are simulating a response from an Iraqi Member of Parliament (MP).
        MP's Profile:
        - Name: ${candidate.name}
        - Political Party: ${candidate.party}
        - Governorate: ${candidate.governorate}
        - Biography: ${candidate.bio || 'Not provided.'}
        - Snippets from recent posts:
        ${postSnippets || '- No recent posts provided.'}

        Based *only* on the information above, answer the following question from a citizen.
        Your response should be in the first person, as if you are the MP.
        Keep the response concise, professional, and relevant to an Iraqi political context.
        If the information is not available to answer the question, politely state that you will look into the matter.
    `;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Question from citizen: "${question}"`,
            config: {
                systemInstruction: context
            }
        });
        return response.text;
    } catch (error) {
        console.error("AI MP Response service error:", error);
        return "An error occurred while generating a response. Please try again.";
    }
};

export const generateAnswerForNeighbor = async (question: string, governorate: string): Promise<string> => {
    if (!ai) {
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
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Question: "${question}"`,
            config: {
                systemInstruction: context
            }
        });
        return response.text;
    } catch (error) {
        console.error("Hayy AI service error:", error);
        return "I am sorry, but I was unable to process your request at this time. Please try again later.";
    }
};