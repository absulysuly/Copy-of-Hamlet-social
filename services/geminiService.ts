import { User, Post } from '../types.ts';

const fallbackSuggestions = [
  (topic: string) => `Share your thoughts about ${topic} with your community!`,
  (topic: string) => `What's your perspective on ${topic}? Let's discuss!`,
  (topic: string) => `Join the conversation about ${topic} — your voice matters!`,
  (topic: string) => `Share your experience with ${topic} and inspire others!`,
];

const getRandomFallback = (topic: string): string => {
  const generator = fallbackSuggestions[Math.floor(Math.random() * fallbackSuggestions.length)];
  return generator(topic);
};

export const generatePostSuggestion = async (topic: string): Promise<string> => {
  if (!topic.trim()) {
    return 'Share an update with your community.';
  }
  return getRandomFallback(topic);
};

export const translateText = async (text: string, _targetLanguage: 'en' | 'ku' | 'ar'): Promise<string> => {
  return text;
};

export const generateLikelyMpResponse = async (
  candidate: User,
  question: string,
  recentPosts: Partial<Post>[]
): Promise<string> => {
  const postSnippets = recentPosts
    .filter((post) => Boolean(post.content))
    .map((post) => `- "${post.content!.slice(0, 100)}..."`)
    .join('\n');

  return `Thank you for your question. Based on the public information we have for ${candidate.name} from ${candidate.party} in ${candidate.governorate}, here is a helpful summary:\n${postSnippets || '- No recent posts provided.'}\n\nA dedicated representative would review your question about "${question}" and respond as soon as possible.`;
};
