import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const originalGeminiMode = process.env.GEMINI_MODE;

describe('Gemini Service', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    if (originalGeminiMode) {
      process.env.GEMINI_MODE = originalGeminiMode;
    } else {
      delete process.env.GEMINI_MODE;
    }
  });

  it('returns stub response when GEMINI_MODE is undefined', async () => {
    delete process.env.GEMINI_MODE;
    const { generateText } = await import('@/services/geminiService');

    const result = await generateText('test prompt');

    expect(result.text).toContain('stub');
  });

  it('returns stub response when GEMINI_MODE is stub', async () => {
    process.env.GEMINI_MODE = 'stub';
    const { generateText } = await import('@/services/geminiService');

    const result = await generateText('summary analysis');

    expect(result.text).toContain('stub');
  });

  it('produces deterministic stubbed output', async () => {
    process.env.GEMINI_MODE = 'stub';
    const { generateText } = await import('@/services/geminiService');

    const first = await generateText('Analyze candidate performance');
    const second = await generateText('Analyze candidate performance');

    expect(first.text).toBe(second.text);
  });
});
