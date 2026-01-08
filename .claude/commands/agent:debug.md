# Debug Agent

Investigate and fix bugs in FormKit Gov packages.

## Before Starting

ultrathink

**STOP - Gather information about the issue:**

1. **What is the error/issue?**
   - Error message or exception
   - Unexpected behavior
   - Type error
   - Test failure
   - Build failure

2. **Where does it occur?**
   - Package (core, react, wizard, etc.)
   - Specific file/function
   - During build, test, or runtime

3. **How was it discovered?**
   - Test failure
   - TypeScript error
   - Runtime error
   - Manual testing
   - User report

4. **Can you provide?**
   - Error message/stack trace
   - Steps to reproduce
   - Expected vs actual behavior
   - Relevant code snippets

5. **What changed recently?**
   - New code added
   - Dependencies updated
   - Configuration changed

## Debug Process

### 1. Understand the Problem

think

Clarify:

- What is expected behavior?
- What is actual behavior?
- When did this start happening?
- Is it reproducible?

### 2. Reproduce the Issue

think hard

Create minimal reproduction:

```typescript
// In a test file
it('reproduces the issue', () => {
  // Minimal code that triggers the bug
  const result = buggyFunction(input);
  expect(result).toBe(expected); // Fails
});
```

Or in console:

```bash
# Run specific test
pnpm --filter @formkit-gov/core test -- [file].test.ts

# Run with verbose output
pnpm --filter @formkit-gov/core test -- --reporter=verbose
```

### 3. Locate the Problem

megathink

Trace execution:

```typescript
// Add debug logging
console.log('Input:', input);
console.log('State at point A:', state);
console.log('Result:', result);
```

Check related files:

```bash
# Find usages
grep -r "functionName" packages/

# Check imports
grep -r "import.*from.*file" packages/
```

### 4. Analyze Root Cause

ultrathink

Common bug categories:

#### Type Issues

```typescript
// Issue: Type mismatch
const value: string = someFunction(); // Returns string | undefined

// Fix: Handle undefined
const value = someFunction() ?? '';
```

#### Schema Validation

```typescript
// Issue: Schema too strict/loose
const schema = z.string().min(1);

// Debug: Check what values fail
console.log(schema.safeParse(input));
```

#### React State

```typescript
// Issue: Stale closure
useEffect(() => {
  // Uses old value
}, []); // Missing dependency

// Fix: Add dependencies
useEffect(() => {
  // Uses current value
}, [dependency]);
```

#### Event Handling

```typescript
// Issue: VA DS event not handled
<va-text-input onInput={handleInput} />

// Debug: Check event structure
const handleInput = (e) => {
  console.log('Event:', e);
  console.log('Value:', e.target.value);
};
```

### 5. Implement Fix

think hard

Apply minimal fix:

1. Fix the root cause, not symptoms
2. Don't introduce new features
3. Follow existing patterns
4. Add appropriate error handling

### 6. Verify Fix

think

Run tests:

```bash
# Run affected tests
pnpm --filter @formkit-gov/[package] test -- [file].test.ts

# Run all package tests
pnpm --filter @formkit-gov/[package] test

# Run full test suite
pnpm test
```

### 7. Add Regression Test

think

Prevent future occurrences:

```typescript
describe('regression tests', () => {
  it('handles [edge case] correctly - fixes #XX', () => {
    // Test that prevents this bug from recurring
    const result = fixedFunction(problematicInput);
    expect(result).toBe(expectedValue);
  });
});
```

### 8. Cleanup

- Remove debug logging
- Run linting
- Verify types

```bash
pnpm --filter @formkit-gov/[package] lint
pnpm --filter @formkit-gov/[package] typecheck
```

## Common Debug Commands

```bash
# Check TypeScript errors
pnpm --filter @formkit-gov/core typecheck

# Run specific test with debug output
pnpm --filter @formkit-gov/core test -- [file].test.ts --reporter=verbose

# Check for type issues
npx tsc --noEmit --pretty

# View dependency tree
pnpm why [package-name]

# Check for circular dependencies
pnpm --filter @formkit-gov/core exec madge --circular src/
```

## Output Format

```markdown
## Bug Fix Report

**Issue:** [Description] **Package:** @formkit-gov/[package] **File:** `path/to/file.ts:line`

### Root Cause

[Explanation of why the bug occurred]

### Fix Applied

[Description of the fix]

### Files Changed

- `path/to/file.ts` - [What changed]
- `path/to/file.test.ts` - [Regression test added]

### Verification

- [x] Reproduction test passes
- [x] All existing tests pass
- [x] No type errors
- [x] Linting passes

### Testing Instructions

[How to verify the fix manually]

### Related Issues

[Any similar issues or areas to check]
```

## Example Usage

```bash
/agent:debug "SSN schema accepts invalid format 000-00-0000"
```

```bash
/agent:debug "TextInputField not updating form state on blur"
```

```bash
/agent:debug "TypeScript error: Type 'undefined' is not assignable"
```

## Task

$ARGUMENTS
