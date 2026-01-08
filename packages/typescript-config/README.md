# @formkit-gov/typescript-config

Shared TypeScript configurations for FormKit Gov projects.

## Overview

This package provides pre-configured TypeScript settings for different project types within the
FormKit Gov monorepo.

## Available Configs

| Config               | Description               | Use Case                 |
| -------------------- | ------------------------- | ------------------------ |
| `base.json`          | Strict base configuration | All projects             |
| `react-library.json` | React library settings    | React component packages |
| `nextjs.json`        | Next.js optimized         | Next.js applications     |
| `node.json`          | Node.js settings          | CLI tools, scripts       |

## Usage

```json
{
  "extends": "@formkit-gov/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

## Key Settings

All configs include:

- `strict: true` - Full strict mode
- `noUncheckedIndexedAccess: true` - Safe array/object access
- `noImplicitOverride: true` - Explicit override keyword
- `verbatimModuleSyntax: true` - Explicit type imports

## See Also

- [@formkit-gov/eslint-config](../eslint-config) - ESLint configurations
- [CLAUDE.md](../../.claude/CLAUDE.md) - Coding standards

## License

MIT
