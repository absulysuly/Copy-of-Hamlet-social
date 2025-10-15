/**
 * Performance Monitoring Utilities
 * Track and report performance metrics for the Hamlet platform
 */

interface PerformanceMetrics {
  componentMount: number;
  dataLoad: number;
  csvParse: number;
  firstRender: number;
  searchTime: number;
  filterTime: number;
  memoryUsage?: number;
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private marks: Map<string, number> = new Map();

  /**
   * Start a performance mark
   */
  mark(name: string): void {
    this.marks.set(name, performance.now());
  }

  /**
   * Measure time since mark
   */
  measure(name: string, markName: string): number {
    const startTime = this.marks.get(markName);
    if (!startTime) {
      console.warn(`Mark "${markName}" not found`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.metrics[name as keyof PerformanceMetrics] = duration;
    
    // Clean up mark
    this.marks.delete(markName);
    
    return duration;
  }

  /**
   * Get all metrics
   */
  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  /**
   * Get memory usage (if available)
   */
  getMemoryUsage(): number | null {
    if ('memory' in performance && (performance as any).memory) {
      const memory = (performance as any).memory;
      return Math.round(memory.usedJSHeapSize / 1024 / 1024); // MB
    }
    return null;
  }

  /**
   * Log metrics to console
   */
  logMetrics(): void {
    console.group('🔍 Performance Metrics');
    
    Object.entries(this.metrics).forEach(([key, value]) => {
      const formatted = typeof value === 'number' ? `${value.toFixed(2)}ms` : value;
      console.log(`${key}: ${formatted}`);
    });

    const memoryUsage = this.getMemoryUsage();
    if (memoryUsage !== null) {
      console.log(`Memory Usage: ${memoryUsage}MB`);
    }

    console.groupEnd();
  }

  /**
   * Get Web Vitals (if available)
   */
  getWebVitals(): Promise<any> {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        const vitals: any = {};

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          vitals.LCP = lastEntry.renderTime || lastEntry.loadTime;
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            vitals.FID = entry.processingStart - entry.startTime;
          });
        });
        fidObserver.observe({ type: 'first-input', buffered: true });

        // Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          vitals.CLS = clsValue;
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });

        // Return vitals after a short delay
        setTimeout(() => {
          resolve(vitals);
        }, 3000);
      } else {
        resolve({});
      }
    });
  }

  /**
   * Generate performance report
   */
  generateReport(): string {
    const metrics = this.getMetrics();
    const memory = this.getMemoryUsage();

    let report = '📊 PERFORMANCE REPORT\n';
    report += '='.repeat(50) + '\n\n';

    report += '⏱️  Timing Metrics:\n';
    Object.entries(metrics).forEach(([key, value]) => {
      const formatted = typeof value === 'number' ? `${value.toFixed(2)}ms` : value;
      report += `  • ${key}: ${formatted}\n`;
    });

    if (memory !== null) {
      report += `\n💾 Memory Usage: ${memory}MB\n`;
    }

    report += '\n' + '='.repeat(50) + '\n';

    return report;
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    this.metrics = {};
    this.marks.clear();
  }
}

// Export singleton instance
export const perfMonitor = new PerformanceMonitor();

// Export hook for React components
export function usePerformanceMonitor() {
  const monitor = perfMonitor;

  return {
    mark: (name: string) => monitor.mark(name),
    measure: (name: string, markName: string) => monitor.measure(name, markName),
    getMetrics: () => monitor.getMetrics(),
    logMetrics: () => monitor.logMetrics(),
    generateReport: () => monitor.generateReport(),
  };
}

export default perfMonitor;
