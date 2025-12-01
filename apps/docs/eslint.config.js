import baseConfig from '@formkit-gov/eslint-config/next';

export default [
  ...baseConfig,
  {
    ignores: ['out/**', '.next/**', 'next-env.d.ts'],
  },
];
