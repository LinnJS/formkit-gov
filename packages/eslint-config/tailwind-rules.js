import tailwind from 'eslint-plugin-tailwindcss';

/**
 * Shared Tailwind CSS ESLint configuration
 *
 * Used by both react-tailwind and next-tailwind configs.
 *
 * Note: eslint-plugin-tailwindcss v4.0.0-beta.0 has limited support for
 * Tailwind CSS v4's CSS-based configuration (@theme directive).
 * The "Cannot resolve default tailwindcss config path" warning is expected
 * and doesn't affect linting functionality. The plugin still validates
 * Tailwind class names and ordering.
 *
 * @see https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/325
 */

/** @type {import('eslint').Linter.Config[]} */
export const tailwindConfigs = [...tailwind.configs['flat/recommended']];

/** @type {import('eslint').Linter.RulesRecord} */
export const tailwindRules = {
  'tailwindcss/classnames-order': 'warn',
  'tailwindcss/enforces-negative-arbitrary-values': 'warn',
  'tailwindcss/enforces-shorthand': 'warn',
  'tailwindcss/no-arbitrary-value': 'off',
  'tailwindcss/no-custom-classname': 'off',
  'tailwindcss/no-contradicting-classname': 'error',
};
