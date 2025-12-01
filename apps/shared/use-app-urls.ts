'use client';

import { useMemo } from 'react';

import { developmentUrls, productionUrls } from './config';

import type { AppName, AppUrls } from './config';

/**
 * Check if running in development mode (client-side)
 */
function isDevelopment(): boolean {
  if (typeof window === 'undefined') {
    return process.env.NODE_ENV === 'development';
  }
  return (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.startsWith('192.168.')
  );
}

/**
 * React hook to get environment-aware app URLs
 */
export function useAppUrls(): AppUrls {
  return useMemo(() => {
    return isDevelopment() ? { ...developmentUrls } : { ...productionUrls };
  }, []);
}

/**
 * React hook to get a specific app URL
 */
export function useAppUrl(app: AppName): string {
  const urls = useAppUrls();
  return urls[app];
}

export { isDevelopment };
