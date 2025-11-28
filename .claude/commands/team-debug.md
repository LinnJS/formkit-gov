# Team: Debug Issue

Orchestrate a multi-agent workflow to systematically debug and fix an issue.

## Task

$ARGUMENTS

## Workflow

Execute this debugging workflow with specialized agents for each phase.

### Phase 1: Understand the Problem

think

Gather information about the issue:

- What is the expected behavior?
- What is the actual behavior?
- When did it start happening?
- Are there any error messages?
- Can it be reproduced consistently?

If this is a GitHub issue, fetch the issue details:

```bash
gh issue view [NUMBER]
```

### Phase 2: Reproduce the Issue

Spawn an **Explore agent** to:

- Find the relevant code
- Identify the affected package(s)
- Locate related test files
- Check recent changes to the area (git log)

Create a minimal reproduction:

- Write a failing test that demonstrates the bug
- Or create a minimal code snippet that triggers it

```typescript
it('reproduces the issue', () => {
  // Minimal reproduction
  const result = functionUnderTest(problematicInput);
  expect(result).toBe(expected); // This should fail
});
```

### Phase 3: Analyze Root Cause

ultrathink

Spawn a **Plan agent** to investigate the code path deeply:

- Trace execution flow step by step
- Check for edge cases and boundary conditions
- Review TypeScript types for mismatches
- Look for recent changes that might have caused regression
- Analyze all code paths that could lead to this behavior
- Consider race conditions, timing issues, or state problems

Document findings:

- **Location**: File and line number
- **Root Cause**: Why it's happening
- **Impact**: What else might be affected

### Phase 4: Develop Fix

megathink

Spawn a **Plan agent** to design the fix:

- Evaluate multiple solution approaches
- Consider backwards compatibility
- Assess impact on related code
- Choose minimal, focused changes

Implement the fix:

- Make minimal changes
- Don't introduce new features
- Follow existing patterns
- Consider backwards compatibility

### Phase 5: Verify Fix

think hard

Run tests to verify:

```bash
# Run the reproduction test - should now pass
pnpm --filter [package] test [test-file]

# Run all package tests
pnpm --filter [package] test

# Run full test suite
pnpm test
```

Check for regressions:

- Related functionality still works
- No new test failures
- Types still check

### Phase 6: Add Regression Test

think

If not already added, create a regression test:

```typescript
describe('regression tests', () => {
  it('handles [specific edge case] - issue #XX', () => {
    // Test that prevents this bug from recurring
  });
});
```

### Phase 7: Document and Cleanup

1. Remove any debug code (console.log, etc.)
2. Add code comments if the fix isn't obvious
3. Update documentation if behavior changed

### Phase 8: Create Changeset

```bash
pnpm changeset
```

Select:

- Affected package(s)
- `patch` for bug fixes
- Clear description of what was fixed

## Output

Provide:

```markdown
## Bug Fix Report

**Issue**: [Description or issue number] **Package**: @formkit-gov/[name] **File**:
path/to/file.ts:line

### Root Cause

[Explanation of why the bug occurred]

### Fix Applied

[Description of the fix]

### Files Changed

- path/to/file.ts - [what changed]
- path/to/file.test.ts - [regression test added]

### Verification

- [x] Reproduction test passes
- [x] All existing tests pass
- [x] No type errors
- [x] Changeset created

### Testing Instructions

[How to verify the fix manually]
```

## Example Usage

```text
/team-debug SSN validation accepts invalid format "123456789" without dashes
```

```text
/team-debug TextInputField error message not announced to screen readers
```

```text
/team-debug Form state not persisting after page refresh with sessionStorage adapter
```
