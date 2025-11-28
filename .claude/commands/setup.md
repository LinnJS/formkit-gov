# Project Setup

Set up the FormKit Gov development environment.

## Instructions

Help a new contributor set up their development environment.

### Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm 8+ (`npm install -g pnpm`)
- Git

### Initial Setup

```bash
# Clone repository
git clone https://github.com/LinnJS/formkit-gov.git
cd formkit-gov

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Start development
pnpm dev
```

### Verify Installation

```bash
# Check Node version
node --version  # Should be 18+

# Check pnpm version
pnpm --version  # Should be 8+

# Check installation
pnpm --filter @formkit-gov/core test
```

### IDE Setup

#### VS Code

Recommended extensions:

- ESLint
- Prettier
- TypeScript Vue Plugin (Volar)
- Tailwind CSS IntelliSense

Settings (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

### Package-Specific Setup

#### @formkit-gov/react

Requires VA Design System web components:

```bash
pnpm --filter @formkit-gov/react add @department-of-veterans-affairs/component-library
```

#### @formkit-gov/openapi

CLI tool for schema generation:

```bash
# Build CLI
pnpm --filter @formkit-gov/openapi build

# Use CLI
pnpm --filter @formkit-gov/openapi exec formkit-openapi generate
```

### Development Workflow

```bash
# Start all packages in watch mode
pnpm dev

# Work on specific package
pnpm --filter @formkit-gov/core dev

# Run Storybook
pnpm storybook

# Run tests in watch mode
pnpm test:watch
```

### Common Commands

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Lint all packages
pnpm lint

# Format code
pnpm format

# Type check
pnpm typecheck

# Create changeset
pnpm changeset

# Clean build artifacts
pnpm clean
```

### Troubleshooting

#### pnpm install fails

```bash
# Clear pnpm cache
pnpm store prune

# Remove node_modules
rm -rf node_modules packages/*/node_modules

# Reinstall
pnpm install
```

#### Build fails

```bash
# Clean and rebuild
pnpm clean
pnpm build
```

#### Tests fail

```bash
# Run with verbose output
pnpm test -- --reporter=verbose

# Run specific test file
pnpm --filter [package] test [filename]
```

### Environment Variables

Create `.env.local` in root (not committed):

```bash
# For demo apps
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Git Hooks

Husky is configured for:

- `pre-commit`: Lint staged files
- `commit-msg`: Validate commit message

To bypass (not recommended):

```bash
git commit --no-verify -m "message"
```

## Arguments

$ARGUMENTS - Setup help needed (e.g., "VS Code configuration" or "troubleshoot build failure")
