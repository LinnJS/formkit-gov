# Package Development Guidelines

Standards and best practices for developing packages in the FormKit Gov monorepo.

## Package Structure

Every package should follow this structure:

````text
packages/[name]/
├── src/
│   ├── index.ts           # Main entry point
│   ├── types.ts           # TypeScript types
│   ├── [feature]/
│   │   ├── index.ts       # Feature exports
│   │   ├── [name].ts      # Implementation
│   │   └── [name].test.ts # Tests
│   └── test-setup.ts      # Test configuration (if needed)
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── vitest.config.ts
├── eslint.config.js
└── README.md
```text

## Naming Conventions

### Files

- Use kebab-case for file names: `text-input-field.ts`
- Test files: `[name].test.ts` or `[name].test.tsx`
- Index files for re-exports: `index.ts`

### Code

- PascalCase for components: `TextInputField`
- camelCase for functions: `createSSNSchema`
- UPPER_SNAKE_CASE for constants: `SSN_PATTERN`
- PascalCase for types/interfaces: `TextSchemaOptions`

## Exports

### Entry Points

Each package should have a main entry point (`src/index.ts`) that exports:

```typescript
// Named exports for tree-shaking
export { createSSNSchema } from './schemas/ssn';
export { validateSSN } from './validators';

// Type exports
export type { SSNSchemaOptions } from './schemas/ssn';
```text

### Sub-path Exports

Use sub-path exports for logical groupings:

```json
{
  "exports": {
    ".": "./dist/index.js",
    "./schemas": "./dist/schemas/index.js",
    "./validators": "./dist/validators/index.js"
  }
}
```text

## TypeScript

### Strict Mode

All packages use strict TypeScript:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```text

### Type Exports

Always export types alongside implementations:

```typescript
export interface CreateSchemaOptions {
  required?: boolean;
  messages?: ErrorMessages;
}

export function createSchema(options: CreateSchemaOptions = {}) {
  // ...
}
```text

### Generics

Use meaningful generic names:

```typescript
// Good
function validateData<TSchema extends z.ZodType>(
  schema: TSchema,
  data: unknown
): z.infer<TSchema> {}

// Bad
function validateData<T>(schema: T, data: unknown) {}
```text

## Documentation

### JSDoc Comments

All public APIs must have JSDoc:

```typescript
/**
 * Creates a Social Security Number schema with validation
 *
 * @param options - Configuration options
 * @returns Zod schema for SSN validation
 *
 * @example
 * ```ts
 * const schema = createSSNSchema();
 * schema.parse('123-45-6789'); // valid
 * ```
 */
export function createSSNSchema(options: SSNSchemaOptions = {}) {}
```text

### README

Each package needs a README with:

1. Description
2. Installation
3. Basic usage
4. API reference
5. Examples

## Testing

### Test File Location

Place tests next to implementation:

```text
src/
├── schemas/
│   ├── ssn.ts
│   └── ssn.test.ts
```text

### Test Structure

```typescript
import { describe, it, expect } from 'vitest';

describe('createSSNSchema', () => {
  describe('valid inputs', () => {
    it('accepts correctly formatted SSN', () => {});
  });

  describe('invalid inputs', () => {
    it('rejects SSN without dashes', () => {});
  });

  describe('options', () => {
    it('supports flexible mode', () => {});
  });
});
```text

### Coverage Requirements

- Minimum 80% coverage
- 100% for critical paths (validation logic)
- Test edge cases and error conditions

## Error Messages

### User-Friendly Messages

Error messages should be:

- Clear and actionable
- Written in plain language
- Include examples when helpful

```typescript
// Good
'Enter a valid Social Security number (like 123-45-6789)'

// Bad
'Invalid SSN format'
```text

### Customizable Messages

Allow custom error messages:

```typescript
interface SchemaOptions {
  messages?: {
    required?: string;
    invalid?: string;
  };
}
```text

## Dependencies

### Peer Dependencies

External libraries used by consumers should be peer dependencies:

```json
{
  "peerDependencies": {
    "react": ">=17.0.0",
    "zod": ">=3.20.0"
  }
}
```text

### Internal Dependencies

Use workspace protocol for internal packages:

```json
{
  "dependencies": {
    "@formkit-gov/core": "workspace:*"
  }
}
```text

### Minimal Dependencies

- Avoid unnecessary dependencies
- Prefer peer dependencies for large libraries
- Document why each dependency is needed

## Performance

### Bundle Size

- Keep packages small and focused
- Use tree-shaking friendly exports
- Avoid importing entire libraries

### Runtime Performance

- Avoid unnecessary computations
- Use memoization where appropriate
- Profile hot paths

## Accessibility

### React Components

All components must:

- Have proper ARIA attributes
- Support keyboard navigation
- Work with screen readers
- Pass axe-core tests

### Error States

- Associate errors with fields
- Use aria-describedby
- Provide clear error announcements

## Versioning

### Changesets

Every user-facing change needs a changeset:

```bash
pnpm changeset
```text

### Breaking Changes

Breaking changes require:

1. Major version bump
2. Migration guide
3. Deprecation warning in previous version

## Code Review Checklist

Before submitting PR:

- [ ] Tests pass
- [ ] Types are correct
- [ ] JSDoc is complete
- [ ] README is updated
- [ ] Changeset is added
- [ ] No console.log statements
- [ ] Error messages are user-friendly
- [ ] Accessibility is maintained
````
