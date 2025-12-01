/**
 * Shared configuration for FormKit Gov apps
 *
 * Provides environment-aware URLs for linking between apps.
 * In development, uses localhost ports. In production, uses deployed URLs.
 */

export type AppName = 'docs' | 'demo-nextjs' | 'demo-vite' | 'landing' | 'storybook' | 'github';

/**
 * Check if running in development mode
 */
export function isDevelopment(): boolean {
  // Check for common development indicators
  if (typeof window !== 'undefined') {
    return (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.startsWith('192.168.')
    );
  }
  // Node.js environment
  return process.env.NODE_ENV === 'development';
}

/**
 * App port configuration (development only)
 */
export const ports = {
  docs: 4000,
  'demo-nextjs': 4001,
  'demo-vite': 4002,
  landing: 4003,
  storybook: 4004,
} as const;

/**
 * Production URLs
 */
export const productionUrls = {
  docs: 'https://docs.formkit-gov.org',
  'demo-nextjs': 'https://nextjs-demo.formkit-gov.org',
  'demo-vite': 'https://vite-demo.formkit-gov.org',
  landing: 'https://formkit-gov.org',
  storybook: 'https://storybook.formkit-gov.org',
  github: 'https://github.com/LinnJS/formkit-gov',
} as const;

/**
 * Development URLs (localhost)
 */
export const developmentUrls = {
  docs: `http://localhost:${ports.docs}`,
  'demo-nextjs': `http://localhost:${ports['demo-nextjs']}`,
  'demo-vite': `http://localhost:${ports['demo-vite']}`,
  landing: `http://localhost:${ports.landing}`,
  storybook: `http://localhost:${ports.storybook}`,
  github: 'https://github.com/LinnJS/formkit-gov',
} as const;

export type AppUrls = typeof productionUrls;

/**
 * Get the appropriate URL for an app based on environment
 */
export function getAppUrl(app: AppName): string {
  return isDevelopment() ? developmentUrls[app] : productionUrls[app];
}

/**
 * Get all app URLs for the current environment
 */
export function getAppUrls(): AppUrls {
  return isDevelopment() ? { ...developmentUrls } : { ...productionUrls };
}

// Default export for convenience
export default {
  isDevelopment,
  ports,
  productionUrls,
  developmentUrls,
  getAppUrl,
  getAppUrls,
};
