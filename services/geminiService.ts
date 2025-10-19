/**
 * Gemini AI Service
 * Supports two modes via GEMINI_MODE env var:
 * - 'remote': Use real Gemini API (production)
 * - 'stub' or undefined: Use deterministic mock (local dev)
 */

function resolveMode(): 'remote' | 'stub' {
  return process.env.GEMINI_MODE === 'remote' ? 'remote' : 'stub';
}

const GEMINI_MODE = resolveMode();

type GeminiTextResponse = { text: string };

async function callRealGemini(prompt: string): Promise<GeminiTextResponse> {
  // EXISTING PRODUCTION CODE - DO NOT REMOVE
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Gemini API key is not configured');
  }

  const { GoogleGenAI } = await import('@google/genai');
  const client = new GoogleGenAI({ apiKey });

  const response = await client.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  const text = extractTextFromResponse(response);
  return { text };
}

function extractTextFromResponse(response: any): string {
  if (!response) {
    return '';
  }

  if (typeof response.text === 'string') {
    return response.text;
  }

  if (Array.isArray(response.candidates)) {
    return response.candidates
      .map((candidate: any) => {
        if (!candidate?.content?.parts) {
          return '';
        }

        return candidate.content.parts
          .map((part: any) => (typeof part?.text === 'string' ? part.text : ''))
          .join('');
      })
      .filter(Boolean)
      .join('\n')
      .trim();
  }

  if (response.output_text) {
    return String(response.output_text);
  }

  return '';
}

function getStubResponse(prompt: string): GeminiTextResponse {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('candidate')) {
    return {
      text: 'Stubbed candidate analysis: This candidate demonstrates strong leadership qualities. [GEMINI_MODE=stub]',
    };
  }

  if (lowerPrompt.includes('summary')) {
    return {
      text: 'Stubbed summary: Key points extracted from content. [GEMINI_MODE=stub]',
    };
  }

  return {
    text: 'Stubbed Gemini response. Enable GEMINI_MODE=remote to use real Gemini API. [GEMINI_MODE=stub]',
  };
}

export async function generateText(prompt: string): Promise<GeminiTextResponse> {
  const mode = resolveMode();

  if (mode === 'remote') {
    console.log('[Gemini] Using remote API');
    try {
      return await callRealGemini(prompt);
    } catch (error) {
      console.error('[Gemini] Remote API failed, falling back to stub:', error);
      return getStubResponse(prompt);
    }
  }

  console.log('[Gemini] Using local stub (GEMINI_MODE=stub)');
  return getStubResponse(prompt);
}

export async function generatePostSuggestion(topic: string): Promise<string> {
  const prompt = `Generate a short, engaging social media post about: "${topic}"`;
  const fallbackSuggestions = [
    `Share your thoughts about ${topic} with your community!`,
    `What's your perspective on ${topic}? Let's discuss!`,
    `Join the conversation about ${topic} - your voice matters!`,
    `Share your experience with ${topic} and inspire others!`,
  ];

  const fallback = fallbackSuggestions[0];

  try {
    const { text } = await generateText(prompt);
    return text || fallback;
  } catch (error) {
    console.error('[Gemini] Failed to generate post suggestion:', error);
    return fallback;
  }
}

export async function translateText(text: string, targetLanguage: 'en' | 'ku' | 'ar'): Promise<string> {
  if (!text) {
    return '';
  }

  const mode = resolveMode();

  if (mode !== 'remote') {
    return text;
  }

  const languageMap: Record<'en' | 'ku' | 'ar', string> = {
    en: 'English',
    ku: 'Kurdish (Sorani)',
    ar: 'Arabic',
  };

  const prompt = `Translate to ${languageMap[targetLanguage]}: "${text}"`;

  try {
    const { text: translated } = await callRealGemini(prompt);
    return translated || text;
  } catch (error) {
    console.error('[Gemini] Translation error:', error);
    return text;
  }
}

export async function generateLikelyMpResponse(
  candidate: { name?: string; party?: string; governorate?: string; bio?: string },
  question: string,
  recentPosts: { content?: string }[],
): Promise<string> {
  const postSnippets = recentPosts
    .map((post) => (post.content ? `- "${post.content.substring(0, 100)}..."` : undefined))
    .filter(Boolean)
    .join('\n');

  const context = `
You are simulating a response from an Iraqi Member of Parliament (MP).
MP's Profile:
- Name: ${candidate.name ?? 'Unknown'}
- Political Party: ${candidate.party ?? 'Unknown'}
- Governorate: ${candidate.governorate ?? 'Unknown'}
- Biography: ${candidate.bio ?? 'Not provided.'}
- Snippets from recent posts:
${postSnippets || '- No recent posts provided.'}

Based *only* on the information above, answer the following question from a citizen.
Your response should be in the first person, as if you are the MP.
Keep the response concise, professional, and relevant to an Iraqi political context.
If the information is not available to answer the question, politely state that you will look into the matter.
`;

  const prompt = `${context}\nQuestion from citizen: "${question}"`;
  const fallback =
    "Thank you for your question. As an AI simulation, I'd recommend looking at the candidate's recent posts for information on this topic. A real response would be forthcoming from their office.";

  try {
    const { text } = await generateText(prompt);
    return text || fallback;
  } catch (error) {
    console.error('[Gemini] Failed to generate MP response:', error);
    return fallback;
  }
}

export { GEMINI_MODE };
