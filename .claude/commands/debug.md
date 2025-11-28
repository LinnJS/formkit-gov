# Debug Issue

Debug and fix an issue in the FormKit Gov codebase.

## Instructions

You are debugging an issue following a systematic approach.

### Debugging Process

1. **Understand the Problem**
   - What is the expected behavior?
   - What is the actual behavior?
   - Can you reproduce it?
   - When did it start happening?

2. **Gather Information**
   - Read relevant source code
   - Check test files for expected behavior
   - Look at recent changes (git log)
   - Check related issues/PRs

3. **Isolate the Issue**
   - Which package is affected?
   - Which function/component?
   - What inputs cause the issue?
   - Is it a regression?

4. **Debug Systematically**
   - Add focused test case that reproduces issue
   - Use debugger or console.log strategically
   - Check TypeScript types
   - Verify assumptions

5. **Fix and Verify**
   - Make minimal fix
   - Ensure test passes
   - Check for side effects
   - Run full test suite

### Common Issues by Package

#### @formkit-gov/core

- Schema validation edge cases
- Pattern matching failures
- Error message formatting
- Type inference issues

```bash
# Run core tests
pnpm --filter @formkit-gov/core test

# Run specific test
pnpm --filter @formkit-gov/core test ssn
```

#### @formkit-gov/react

- Web component integration
- Form state not updating
- Ref forwarding issues
- Event handling problems
- Accessibility violations

```bash
# Run react tests
pnpm --filter @formkit-gov/react test

# Run with coverage
pnpm --filter @formkit-gov/react test:coverage
```

#### @formkit-gov/store

- State not persisting
- Adapter errors
- Sync issues
- Memory leaks

#### @formkit-gov/wizard

- Navigation not working
- Step validation failing
- Progress not updating
- State reset issues

### Debugging Commands

```bash
# Type check
pnpm typecheck

# Lint
pnpm lint

# Run specific test file
pnpm --filter [package] test [filename]

# Run tests in watch mode
pnpm --filter [package] test:watch

# Check for circular dependencies
pnpm --filter [package] build
```

### Fix Guidelines

- Make minimal changes
- Add regression test
- Update documentation if behavior changes
- Add changeset if user-facing

### Output Format

```markdown
## Issue Analysis

**Package:** @formkit-gov/[name] **File:** path/to/file.ts **Line:** 42

## Root Cause

Explanation of what's causing the issue.

## Fix

Description of the fix applied.

## Verification

- [ ] Regression test added
- [ ] All tests pass
- [ ] No side effects
- [ ] Changeset added (if needed)
```

## Arguments

$ARGUMENTS - Description of the issue to debug (e.g., "SSN validation fails for valid 9-digit
numbers")
