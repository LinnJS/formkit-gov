import tailwind from 'eslint-plugin-tailwindcss';

import reactConfig from './react.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...reactConfig,
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
