import reactConfig from './react.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...reactConfig,
  {
    rules: {
      // Next.js specific rules
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
      // Allow Next.js Image component usage
      '@next/next/no-img-element': 'off',
    },
  },
];
