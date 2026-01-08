// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import eslintConfig from '@formkit-gov/eslint-config/react';
import storybook from 'eslint-plugin-storybook';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['storybook-static/**', '.storybook/storybook.css', '.storybook/test-runner.cjs'],
  },
  ...eslintConfig,
  ...storybook.configs['flat/recommended'],
];
