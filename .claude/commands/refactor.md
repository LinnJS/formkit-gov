# Refactor Code

Refactor code in the FormKit Gov project to improve quality without changing behavior.

## Instructions

You are refactoring code following the project's guidelines while preserving existing behavior.

### Refactoring Principles

1. **Preserve Behavior**
   - No functional changes
   - All existing tests must pass
   - No API changes without major version

2. **Improve Incrementally**
   - Small, focused changes
   - One concern at a time
   - Easy to review and revert

3. **Test First**
   - Ensure adequate test coverage before refactoring
   - Add tests if coverage is insufficient
   - Run tests after each change

### Common Refactoring Patterns

#### Extract Function

```typescript
// Before
function validateForm(data: FormData) {
  // 50 lines of validation logic
}

// After
function validateForm(data: FormData) {
  validateRequiredFields(data);
  validateFormats(data);
  validateBusinessRules(data);
}
```

#### Simplify Conditionals

```typescript
// Before
if (value !== null && value !== undefined && value !== '') {
  // ...
}

// After
if (hasValue(value)) {
  // ...
}
```

#### Extract Type

```typescript
// Before
function process(options: {
  required?: boolean;
  messages?: { invalid?: string; required?: string };
}) {}

// After
interface ProcessOptions {
  required?: boolean;
  messages?: ErrorMessages;
}

function process(options: ProcessOptions) {}
```

#### Replace Magic Values

```typescript
// Before
if (ssn.startsWith('9')) {
  // reject ITIN
}

// After
const ITIN_PREFIX = '9';
if (ssn.startsWith(ITIN_PREFIX)) {
  // reject ITIN
}
```

### Refactoring Checklist

- [ ] Tests pass before starting
- [ ] Understand existing code fully
- [ ] Make small, incremental changes
- [ ] Run tests after each change
- [ ] No API changes
- [ ] No feature additions
- [ ] Code is simpler/clearer after
- [ ] No performance regressions

### Don't Refactor When

- Tests are inadequate (add tests first)
- You don't fully understand the code
- Changes would break public API
- Time pressure is high
- Multiple concerns at once

### Tools

```bash
# Ensure tests pass
pnpm test

# Check types
pnpm typecheck

# Check lint
pnpm lint

# Format code
pnpm format
```

### Output Format

```markdown
## Refactoring Summary

**Files Changed:**

- path/to/file1.ts
- path/to/file2.ts

## Changes Made

### [Change Category]

Before: \`\`\`typescript // old code \`\`\`

After: \`\`\`typescript // new code \`\`\`

**Rationale:** Why this improves the code.

## Verification

- [x] All tests pass
- [x] Types check
- [x] Lint passes
- [x] No API changes
- [x] No performance regression
```

## Arguments

$ARGUMENTS - What to refactor (e.g., "packages/core/src/schemas/ssn.ts - extract validation
helpers")
