import reactConfig from './react.js';
import { tailwindConfigs, tailwindRules } from './tailwind-rules.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...reactConfig,
  ...tailwindConfigs,
  {
    rules: tailwindRules,
  },
];
