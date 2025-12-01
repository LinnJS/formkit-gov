import eslintConfig from '@formkit-gov/eslint-config/react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['storybook-static/**', '.storybook/storybook.css', '.storybook/test-runner.cjs'],
  },
  ...eslintConfig,
];
