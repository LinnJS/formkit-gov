import tailwind from 'eslint-plugin-tailwindcss';

import nextConfig from './next.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...nextConfig,
  ...tailwind.configs['flat/recommended'],
  {
    rules: {
      // Tailwind CSS rules
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/enforces-negative-arbitrary-values': 'warn',
      'tailwindcss/enforces-shorthand': 'warn',
      'tailwindcss/no-arbitrary-value': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/no-contradicting-classname': 'error',
    },
  },
];
