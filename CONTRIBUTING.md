# Contributing to FormKit Gov

Thank you for your interest in contributing to FormKit Gov! This document provides guidelines and
instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected
to uphold this code.

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Git

### Development Setup

1. Fork the repository on GitHub.

2. Clone your fork locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/formkit-gov.git
   cd formkit-gov
   ```

3. Add the upstream repository:

   ```bash
   git remote add upstream https://github.com/LinnJS/formkit-gov.git
   ```

4. Install dependencies:

   ```bash
   pnpm install
   ```

5. Build all packages:

   ```bash
   pnpm build
   ```

6. Run tests to ensure everything is working:

   ```bash
   pnpm test
   ```

## Project Structure

````text
formkit-gov/
├── apps/
│   ├── docs/           # Documentation site (Nextra)
│   ├── storybook/      # Component documentation
│   ├── demo-nextjs/    # Next.js demo application
│   └── demo-vite/      # Vite demo application
├── packages/
│   ├── core/           # @formkit-gov/core - Zod schemas & utilities
│   ├── react/          # @formkit-gov/react - React components
│   ├── store/          # @formkit-gov/store - State management
│   ├── wizard/         # @formkit-gov/wizard - Multi-step forms
│   ├── openapi/        # @formkit-gov/openapi - OpenAPI integration
│   ├── validators/     # @formkit-gov/validators - Extended validators
│   └── test-utils/     # @formkit-gov/test-utils - Testing utilities
└── ...config files
```text

## Making Changes

### Branch Naming

Create a branch for your changes:

```bash
git checkout -b <type>/<scope>/<description>
```text

Examples:

- `feat/react/add-date-picker`
- `fix/core/ssn-validation`
- `docs/wizard/update-examples`

### Development Workflow

1. Make your changes in the appropriate package(s).

2. Run the development server:

   ```bash
   # Run all packages in watch mode
   pnpm dev

   # Run a specific package
   pnpm --filter @formkit-gov/react dev
````

3. Test your changes:

   ```bash
   # Run all tests
   pnpm test

   # Run tests for a specific package
   pnpm --filter @formkit-gov/react test

   # Run tests in watch mode
   pnpm test:watch
   ```

4. Ensure linting passes:

   ```bash
   pnpm lint
   pnpm typecheck
   ```

5. Format your code:

   ```bash
   pnpm format
   ```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/). Each commit message should
have a type, optional scope, and description.

### Format

````text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```text

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes (dependencies, configs)
- `revert`: Reverting a previous commit

### Scopes

- `core`, `react`, `store`, `wizard`, `openapi`, `validators`, `test-utils`
- `docs`, `storybook`, `playground`
- `deps`, `release`, `repo`

### Examples

```bash
feat(react): add TextInputField component

fix(core): correct SSN regex pattern for edge cases

docs(wizard): add save-in-progress guide

chore(deps): update zod to v3.23
```text

## Pull Request Process

1. **Create a changeset** if your PR includes user-facing changes:

   ```bash
   pnpm changeset
````

Follow the prompts to describe your changes.

2. **Update documentation** if needed.

3. **Ensure all checks pass**:
   - Linting
   - Type checking
   - Tests
   - Build

4. **Submit your PR** with a clear title and description.

5. **Address review feedback** promptly.

### PR Title Format

Follow the same format as commit messages:

````text
<type>(<scope>): <description>
```text

### PR Description Template

Your PR description should include:

- Summary of changes
- Related issue(s)
- Testing performed
- Screenshots (for UI changes)
- Breaking changes (if any)

## Testing

### Running Tests

```bash
# All tests
pnpm test

# With coverage
pnpm test:coverage

# Watch mode
pnpm test:watch

# Specific package
pnpm --filter @formkit-gov/react test
```text

### Writing Tests

- Place test files next to the source files with `.test.ts` or `.test.tsx`
  extension.
- Use descriptive test names.
- Test both happy paths and edge cases.
- Include accessibility tests for components.

Example:

```typescript
import { describe, it, expect } from 'vitest';
import { createSSNSchema } from './ssn';

describe('createSSNSchema', () => {
  const schema = createSSNSchema();

  it('validates correctly formatted SSN', () => {
    expect(schema.safeParse('123-45-6789').success).toBe(true);
  });

  it('rejects SSN without dashes', () => {
    const result = schema.safeParse('123456789');
    expect(result.success).toBe(false);
  });

  it('provides user-friendly error message', () => {
    const result = schema.safeParse('invalid');
    expect(result.error?.issues[0].message).toContain('Social Security');
  });
});
```text

## Documentation

### Package Documentation

Each package should have:

- README.md with usage examples
- JSDoc comments for public APIs
- Storybook stories for components

### Docs Site

The documentation site is in `apps/docs/`. To run locally:

```bash
pnpm --filter docs dev
```text

## Questions?

If you have questions, feel free to:

- Open a [Discussion](https://github.com/LinnJS/formkit-gov/discussions)
- Check existing [Issues](https://github.com/LinnJS/formkit-gov/issues)

Thank you for contributing!
````
