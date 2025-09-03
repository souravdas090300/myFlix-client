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
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${componentName} rendered ${renderCount.current} times`);
      
      // Log render time (only warn if render is truly slow)
      const renderTime = Date.now() - startTime.current;
      const SLOW_RENDER_THRESHOLD = 200; // ms
      if (renderTime > SLOW_RENDER_THRESHOLD) {
        console.warn(`[Performance] ${componentName} slow render: ${renderTime}ms`);
      }
    }
    
    startTime.current = Date.now();
  });

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${componentName} mounted`);
      
      return () => {
        console.log(`[Performance] ${componentName} unmounted after ${renderCount.current} renders`);
      };
    }
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
