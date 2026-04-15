import { QueryClient } from '@tanstack/react-query';

/**
 * Global TanStack Query Client configuration.
 * Production settings for cache time, stale time, and retry logic.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 2, // Retry failed requests twice
      refetchOnWindowFocus: false, // Avoid excessive refetching on mobile
    },
    mutations: {
      retry: 1,
    },
  },
});
