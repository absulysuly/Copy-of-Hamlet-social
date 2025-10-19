/**
 * Telemetry hooks for observability
 * This is a placeholder implementation. Replace with real telemetry (Sentry, CloudWatch, etc.)
 */

const MAX_SAMPLE_LENGTH = 1024;

function serializeSample(sample: unknown): string | undefined {
  try {
    if (sample === undefined) {
      return undefined;
    }

    const serialized = JSON.stringify(sample);
    if (!serialized) {
      return undefined;
    }

    return serialized.length > MAX_SAMPLE_LENGTH
      ? `${serialized.slice(0, MAX_SAMPLE_LENGTH)}…`
      : serialized;
  } catch (error) {
    return undefined;
  }
}

export function reportApiFallback(
  endpoint: string,
  reason: string,
  sample?: any
): void {
  const isDev = process.env.NODE_ENV !== 'production';
  const payload = {
    endpoint,
    reason,
    sample: isDev ? serializeSample(sample) : undefined,
    timestamp: new Date().toISOString(),
  };

  if (isDev) {
    console.debug('[Telemetry] API fallback used:', payload);
  } else {
    console.error('[Telemetry] API fallback used:', {
      endpoint: payload.endpoint,
      reason: payload.reason,
      timestamp: payload.timestamp,
    });
  }
}

export function reportHydrationWarning(component: string, details: string): void {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[Telemetry] Hydration warning in ${component}:`, details);
  }
}

// TODO: Replace with real telemetry implementation
// Example Sentry integration:
// import * as Sentry from '@sentry/nextjs';
// Sentry.captureMessage(`API Fallback: ${endpoint} - ${reason}`, 'warning');
