# @formkit-gov/eslint-config

Shared ESLint configurations for FormKit Gov projects.

## Overview

This package provides pre-configured ESLint 9 flat configs for different project types within the
FormKit Gov monorepo.

## Available Configs

| Config              | Description                    | Use Case                   |
| ------------------- | ------------------------------ | -------------------------- |
| `index.js`          | Base TypeScript + import rules | Libraries, utilities       |
| `react.js`          | React + JSX accessibility      | React component libraries  |
| `react-tailwind.js` | React + Tailwind CSS           | React apps with Tailwind   |
| `next.js`           | Next.js optimized              | Next.js applications       |
| `next-tailwind.js`  | Next.js + Tailwind CSS         | Next.js apps with Tailwind |

## Usage

```javascript
// eslint.config.js
import baseConfig from '@formkit-gov/eslint-config';
import reactConfig from '@formkit-gov/eslint-config/react';

export default [...baseConfig, ...reactConfig];
```

## Included Plugins

- `@eslint/js` - Core ESLint rules
- `typescript-eslint` - TypeScript support
- `eslint-plugin-import-x` - Import/export linting
- `eslint-plugin-react` - React rules
- `eslint-plugin-react-hooks` - Hooks rules
- `eslint-plugin-jsx-a11y` - Accessibility rules
- `eslint-plugin-tailwindcss` - Tailwind CSS rules
- `eslint-config-prettier` - Prettier compatibility
- `eslint-config-turbo` - Turborepo cache rules

## See Also

- [@formkit-gov/typescript-config](../typescript-config) - TypeScript configurations
- [CLAUDE.md](../../.claude/CLAUDE.md) - Coding standards

## License

MIT
