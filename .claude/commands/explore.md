# Explore Codebase

Explore and understand the FormKit Gov codebase structure.

## Instructions

You are helping someone understand the codebase. Provide clear explanations with file references.

### Package Overview

```text
formkit-gov/
├── packages/
│   ├── core/           # Zod schemas, patterns, validators
│   ├── react/          # React components (VA DS wrappers)
│   ├── store/          # State management adapters
│   ├── wizard/         # Multi-step form orchestration
│   ├── openapi/        # OpenAPI to Zod generation
│   ├── validators/     # Extended validation rules
│   └── test-utils/     # Testing utilities
├── apps/
│   ├── demo-nextjs/    # Next.js demo application
│   └── demo-vite/      # Vite demo application
├── docs/               # Internal documentation
└── .github/            # CI/CD and GitHub config
```

### Key Files by Package

#### @formkit-gov/core

- `src/index.ts` - Main exports
- `src/types.ts` - TypeScript types
- `src/patterns/index.ts` - Regex patterns (SSN, phone, ZIP, etc.)
- `src/schemas/*.ts` - Schema factories
- `src/validators/index.ts` - Validation utilities
- `src/utils/index.ts` - Helper functions

#### @formkit-gov/react

- `src/index.ts` - Component exports
- `src/components/*.tsx` - Form components
- `src/form/*.tsx` - Form context components
- `src/hooks/*.ts` - Custom hooks

#### @formkit-gov/store

- `src/index.ts` - Adapter exports
- `src/types.ts` - Adapter interface
- `src/adapters/*.ts` - Storage adapters

#### @formkit-gov/wizard

- `src/index.ts` - Wizard exports
- `src/wizard.tsx` - Main wizard component
- `src/step.tsx` - Step component
- `src/hooks/*.ts` - Wizard hooks

### Configuration Files

- `package.json` - Root package with workspace scripts
- `turbo.json` - Turborepo task configuration
- `pnpm-workspace.yaml` - Workspace definition
- `.changeset/config.json` - Changesets configuration

### Documentation

- `docs/SCOPE.md` - Project scope and goals
- `docs/ROADMAP.md` - Development phases
- `docs/ARCHITECTURE.md` - Architecture decisions
- `docs/PACKAGE_GUIDELINES.md` - Development standards
- `docs/RELEASE_PROCESS.md` - Release workflow
- `docs/TESTING_STRATEGY.md` - Testing approach

### Common Exploration Commands

```bash
# See all packages
ls packages/

# See package structure
tree packages/core/src -L 2

# Find all schema files
find packages -name "*.ts" -path "*/schemas/*"

# Find all test files
find packages -name "*.test.ts*"

# Search for specific pattern
grep -r "createSSNSchema" packages/

# Check exports
cat packages/core/src/index.ts
```

### Understanding the Code

When exploring:

1. Start with `src/index.ts` to see what's exported
2. Read `types.ts` to understand data structures
3. Look at tests to see expected behavior
4. Check Storybook stories for component usage

## Arguments

$ARGUMENTS - What to explore (e.g., "schema validation flow" or "how components integrate with
forms")
