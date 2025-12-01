# FormKit Gov - Claude Code Configuration

## Project Overview

FormKit Gov is a production-quality, open-source form system for government applications. It
integrates VA Design System web components with Zod validation and React Hook Form, following
shadcn/ui composable patterns.

## Tech Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **Language**: TypeScript (strict mode)
- **React**: 17+ with hooks
- **Validation**: Zod schemas
- **Forms**: React Hook Form with @hookform/resolvers
- **Components**: VA Design System (@department-of-veterans-affairs/component-library)
- **Testing**: Vitest + React Testing Library + Playwright
- **Build**: tsup (ESM + CJS output)
- **Linting**: ESLint 9 flat config + Prettier
- **Releases**: Changesets

## Project Structure

```text
apps/
  demo-nextjs/    # Next.js demo application
  demo-vite/      # Vite demo application
  docs/           # Nextra documentation site
  landing/        # Landing page (formkit-gov.org)
  storybook/      # Component documentation

packages/
  core/           # Zod schemas, patterns, validators
  react/          # React components wrapping VA DS
  store/          # State management adapters
  wizard/         # Multi-step form orchestration
  openapi/        # OpenAPI to Zod generation
  validators/     # Extended validation rules
  test-utils/     # Testing utilities
  eslint-config/  # Shared ESLint configuration
  typescript-config/ # Shared TypeScript configuration

assets/           # Shared brand assets (logo, favicons)
```

## Code Style Guidelines

### File Naming

- Use kebab-case: `text-input-field.ts`
- Tests: `[name].test.ts` or `[name].test.tsx`
- React components: `[ComponentName].tsx`

### Code Conventions

- PascalCase for components: `TextInputField`
- camelCase for functions: `createSSNSchema`
- UPPER_SNAKE_CASE for constants: `SSN_PATTERN`
- PascalCase for types/interfaces: `TextSchemaOptions`

### TypeScript

- Always use strict mode
- Export types alongside implementations
- Prefer explicit return types on public APIs
- Use meaningful generic names (TSchema, TData, etc.)

### React Components

- Use function components with hooks
- Props interface named `[Component]Props`
- Always include displayName
- Support ref forwarding where appropriate
- Wrap VA Design System web components

### Testing

- Place tests next to implementation: `ssn.ts` → `ssn.test.ts`
- Use describe/it pattern with descriptive names
- Follow Arrange-Act-Assert pattern
- Test behavior, not implementation
- Minimum 80% coverage, 100% for critical paths

### Documentation

- JSDoc for all public APIs with @example
- README in each package
- Storybook stories for components

## Commands Reference

Common development commands:

```bash
pnpm install          # Install dependencies
pnpm build            # Build all packages
pnpm test             # Run all tests
pnpm test:coverage    # Run tests with coverage
pnpm lint             # Run ESLint
pnpm format           # Format with Prettier
pnpm typecheck        # TypeScript check
pnpm changeset        # Create changeset
pnpm dev              # Development mode
```

## Architecture Decisions

Key decisions are documented in `docs/ARCHITECTURE.md`. Major ones:

1. **ADR-001**: Turborepo + pnpm for monorepo
2. **ADR-002**: React Hook Form for form state
3. **ADR-003**: Zod for validation
4. **ADR-004**: Wrap VA DS web components
5. **ADR-005**: Pluggable state adapters
6. **ADR-006**: shadcn/ui composable form pattern

## Important Patterns

### Schema Factory Pattern

```typescript
export function createSchema(options: SchemaOptions = {}) {
  const { required = true, messages = {} } = options;

  let schema = z.string();
  // Add validations...

  if (!required) {
    schema = schema.optional();
  }

  return schema;
}
```

### Component Pattern (VA DS Wrapper)

```typescript
export const TextInputField = React.forwardRef<
  HTMLVaTextInputElement,
  TextInputFieldProps
>(({ label, error, ...props }, ref) => {
  return (
    <va-text-input
      ref={ref}
      label={label}
      error={error}
      {...props}
    />
  );
});
TextInputField.displayName = 'TextInputField';
```

### Form Integration Pattern

```typescript
<FormField
  control={form.control}
  name="fieldName"
  render={({ field, fieldState }) => (
    <TextInputField
      {...field}
      label="Label"
      error={fieldState.error?.message}
    />
  )}
/>
```

## Accessibility Requirements

- All components must pass axe-core tests
- WCAG 2.1 AA compliance required
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatible
- Error messages associated with fields

## Git Workflow

- Conventional commits (feat, fix, docs, chore, etc.)
- Changesets required for user-facing changes
- PR template must be filled out
- CI must pass before merge

## Don't Do

- Don't use `any` type without justification
- Don't skip accessibility attributes
- Don't commit console.log statements
- Don't add dependencies without discussion
- Don't break the public API without major version
- Don't skip tests for new features
