import { useEffect, useRef } from 'react';

/**
 * Hook to monitor component performance
 * @param {string} componentName - Name of the component being monitored
 */
export const usePerformanceMonitor = (componentName) => {
  const renderCount = useRef(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    renderCount.current += 1;

    const shouldLog = (typeof window !== 'undefined' && window.__DEBUG_PERF) || process.env.DEBUG_PERF === 'true';
    if (shouldLog && process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`[Performance] ${componentName} rendered ${renderCount.current} times`);
    }

    // Silence performance warnings in development to reduce console noise
    // Only log extremely slow renders (>10000ms) to identify real performance issues
    const renderTime = Date.now() - startTime.current;
    if (renderTime > 10000 && process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(`[Performance] ${componentName} slow render: ${renderTime}ms`);
    }

    startTime.current = Date.now();
  });

  useEffect(() => {
    const shouldLog = (typeof window !== 'undefined' && window.__DEBUG_PERF) || process.env.DEBUG_PERF === 'true';
    if (shouldLog && process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`[Performance] ${componentName} mounted`);
      return () => {
        // eslint-disable-next-line no-console
        console.log(`[Performance] ${componentName} unmounted after ${renderCount.current} renders`);
      };
    }
    return undefined;
  }, [componentName]);
};

/**
 * Hook to monitor memory usage
 */
export const useMemoryMonitor = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
      const logMemory = () => {
        const memInfo = performance.memory;
        console.log('[Memory]', {
          used: `${Math.round(memInfo.usedJSHeapSize / 1024 / 1024)}MB`,
          total: `${Math.round(memInfo.totalJSHeapSize / 1024 / 1024)}MB`,
          limit: `${Math.round(memInfo.jsHeapSizeLimit / 1024 / 1024)}MB`
        });
      };

      // Log memory usage every 10 seconds in development
      const interval = setInterval(logMemory, 10000);
      
      // Initial log
      logMemory();

      return () => clearInterval(interval);
    }
  }, []);
};
