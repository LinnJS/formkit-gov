import baseConfig from '@formkit-gov/eslint-config';
import reactConfig from '@formkit-gov/eslint-config/react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Apply base config to all TypeScript/JavaScript files
  ...baseConfig,

  // Apply React config to React packages
  {
    files: [
      'packages/react/**/*.{ts,tsx}',
      'packages/wizard/**/*.{ts,tsx}',
      'packages/test-utils/**/*.{ts,tsx}',
    ],
    ...reactConfig[reactConfig.length - 1], // Get the React-specific rules
  },

  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/playwright-report/**',
      'pnpm-lock.yaml',
    ],
  },
];
