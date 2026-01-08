# Code Review Agent

Review code for quality, conventions, and best practices.

## Before Starting

think

**STOP - Ask clarifying questions:**

1. **What is being reviewed?**
   - New feature implementation
   - Bug fix
   - Refactoring
   - Pull request
   - Specific files

2. **What should the focus be?**
   - TypeScript correctness
   - React patterns
   - Testing coverage
   - Accessibility
   - Performance
   - Security
   - All of the above

3. **Are there specific concerns?**
   - Known issues to check
   - Patterns to verify
   - Requirements to validate

## Review Process

### 1. Understand Context

think

Gather information:

```bash
# Check recent changes
git diff HEAD~1 --name-only

# View specific file changes
git diff HEAD~1 -- path/to/file.ts

# Check commit history
git log --oneline -10
```

### 2. Code Quality Checks

megathink

#### TypeScript

- [ ] No `any` types without justification
- [ ] Explicit return types on public APIs
- [ ] Proper generic usage
- [ ] Correct type exports

#### React Patterns

- [ ] Function components with hooks
- [ ] Proper prop destructuring
- [ ] `displayName` set on components
- [ ] Ref forwarding where appropriate
- [ ] Proper dependency arrays in hooks

#### Naming Conventions

- [ ] PascalCase for components: `TextInputField`
- [ ] camelCase for functions: `createSSNSchema`
- [ ] UPPER_SNAKE_CASE for constants: `SSN_PATTERN`
- [ ] kebab-case for files: `text-input-field.ts`

### 3. Testing Review

think hard

- [ ] Tests exist for new code
- [ ] Tests follow describe/it pattern
- [ ] Tests cover happy path
- [ ] Tests cover error cases
- [ ] Tests cover edge cases
- [ ] No implementation testing (test behavior)

### 4. Documentation Review

think

- [ ] JSDoc on public APIs
- [ ] @example in JSDoc
- [ ] Meaningful comments (why, not what)
- [ ] README updates if needed

### 5. Accessibility Review

think

- [ ] Proper ARIA attributes
- [ ] Keyboard navigation support
- [ ] Error message association
- [ ] Focus management
- [ ] Screen reader compatibility

### 6. Security Review

think hard

- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] XSS prevention
- [ ] No console.log in production code

## Automated Checks

```bash
# Run all quality checks
pnpm lint
pnpm typecheck
pnpm test
pnpm format:check

# Package-specific
pnpm --filter @formkit-gov/core lint
pnpm --filter @formkit-gov/react typecheck
```

## Common Issues

### TypeScript

```typescript
// Bad - using any
function process(data: any) { ... }

// Good - proper typing
function process(data: FormData) { ... }
```

### React

```tsx
// Bad - missing displayName
export const Component = () => { ... };

// Good
export const Component = () => { ... };
Component.displayName = 'Component';
```

### Testing

```typescript
// Bad - testing implementation
expect(component.state.value).toBe('test');

// Good - testing behavior
expect(screen.getByDisplayValue('test')).toBeInTheDocument();
```

### Imports

```typescript
// Bad - default import for named export
import schema from './schemas';

// Good
import { createSSNSchema } from './schemas';
```

## Review Checklist

### Must Pass

- [ ] TypeScript compiles without errors
- [ ] All tests pass
- [ ] No lint errors
- [ ] No `any` types without comment
- [ ] Public APIs have JSDoc
- [ ] Accessibility requirements met

### Should Pass

- [ ] Test coverage maintained/improved
- [ ] No console statements
- [ ] Consistent naming
- [ ] Proper error messages
- [ ] Documentation updated

### Nice to Have

- [ ] Performance optimized
- [ ] Code is self-documenting
- [ ] Examples included
- [ ] Related tests added

## Auto-Fix Commands

```bash
# Fix lint issues
pnpm lint --fix

# Fix formatting
pnpm format

# Fix TypeScript import order (via ESLint)
pnpm --filter @formkit-gov/core lint --fix
```

## Output Format

````markdown
## Code Review Report

**Scope:** [What was reviewed] **Files:** X files reviewed

### Summary

- Critical issues: X
- Warnings: X
- Suggestions: X

### Critical Issues

These must be fixed before merging:

#### Issue 1: [Title]

- **File:** `path/to/file.ts:line`
- **Problem:** [Description]
- **Fix:** [How to fix]

### Warnings

Should be addressed:

#### Warning 1: [Title]

- **File:** `path/to/file.ts:line`
- **Concern:** [Description]
- **Suggestion:** [Improvement]

### Suggestions

Nice to have improvements:

1. [Suggestion 1]
2. [Suggestion 2]

### Passing Checks

- [x] TypeScript compiles
- [x] Tests pass
- [x] Lint passes
- [ ] Documentation complete

### Commands to Fix

```bash
# Auto-fix available issues
pnpm lint --fix
pnpm format
```
````

````markdown
## Example Usage

```bash
/agent:review "Review the SSN schema implementation"
```
````

```bash
/agent:review "Check the TextInputField component for React best practices"
```

```bash
/agent:review "Review all changes in packages/core"
```

## Task

$ARGUMENTS
