export interface ApiFallbackEvent { endpoint: string; reason: string; sample?: string; timestamp: string; environment: string; }

export function reportApiFallback(endpoint: string, reason: string, sample?: any): void {
  const isDev = process.env.NODE_ENV !== 'production';
  const timestamp = new Date().toISOString();
  const event: ApiFallbackEvent = { endpoint, reason, timestamp, environment: process.env.NODE_ENV || 'development' };

  if (isDev && sample) {
    const sampleStr = typeof sample === 'string' ? sample : JSON.stringify(sample);
    const truncated = sampleStr.slice(0, 1024);
    console.debug('[Telemetry] API Fallback', { ...event, sample: truncated });
  } else {
    console.error('[Telemetry] API Fallback', { endpoint: event.endpoint, reason: event.reason, timestamp: event.timestamp });
  }
}