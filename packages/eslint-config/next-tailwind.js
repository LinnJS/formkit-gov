import nextConfig from './next.js';
import { tailwindConfigs, tailwindRules } from './tailwind-rules.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...nextConfig,
  ...tailwindConfigs,
  {
    rules: tailwindRules,
  },
];
