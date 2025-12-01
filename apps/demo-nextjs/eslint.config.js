import eslintConfig from '@formkit-gov/eslint-config/next-tailwind';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Global ignores - must be a standalone object with only ignores property
  {
    ignores: ['.next/**', 'out/**', 'next-env.d.ts', '*.d.ts'],
  },
  ...eslintConfig,
];
