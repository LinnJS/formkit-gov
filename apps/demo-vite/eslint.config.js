import eslintConfig from '@formkit-gov/eslint-config/react-tailwind';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['dist/**'],
  },
  ...eslintConfig,
];
