# Team: Debug Issue

Orchestrate a multi-agent workflow to systematically investigate and fix an issue.

## Team Composition

| Phase | Agent           | Responsibility         |
| ----- | --------------- | ---------------------- |
| 1     | `agent:explore` | Locate relevant code   |
| 2     | `agent:debug`   | Investigate root cause |
| 3     | Plan            | Design the fix         |
| 4     | Implement       | Apply the fix          |
| 5     | `agent:test`    | Add regression test    |
| 6     | `agent:a11y`    | Verify a11y (if UI)    |
| 7     | `agent:review`  | Verify fix quality     |

## Before Starting

ultrathink

**STOP - Gather information about the issue:**

1. **What is the error/issue?**
   - Error message/exception
   - Unexpected behavior
   - Type error
   - Test failure
   - Performance problem

2. **Where does it occur?**
   - Package (core, react, wizard, etc.)
   - Specific file/function
   - During build, test, or runtime

3. **How was it discovered?**
   - Test failure
   - TypeScript error
   - Runtime error in demo app
   - User report
   - CI failure

4. **Can you provide?**
   - Error message or stack trace
   - Steps to reproduce
   - Expected vs actual behavior
   - Relevant code snippets

5. **What changed recently?**
   - Recent commits
   - Dependency updates
   - Configuration changes

## Workflow

### Phase 1: Understand the Problem

think

Gather information:

- What is expected behavior?
- What is actual behavior?
- When did this start happening?
- Is it reproducible?

Check recent changes:

```bash
git log --oneline -10 -- packages/[affected-package]
git diff HEAD~5 -- packages/[affected-package]
```

### Phase 2: Locate Relevant Code (agent:explore)

think hard

Spawn an **Explore agent** to:

- Find the affected code paths
- Identify the error source
- Locate related tests
- Check dependencies

```bash
/agent:explore "Find code related to [issue area]"
```

### Phase 3: Reproduce the Issue

Create a failing test or console reproduction:

```typescript
// In test file
it('reproduces the issue', () => {
  // Minimal code that triggers the bug
  const result = buggyFunction(problematicInput);
  expect(result).toBe(expected); // Should fail
});
```

Run to confirm:

```bash
pnpm --filter @formkit-gov/[package] test -- --reporter=verbose
```

### Phase 4: Analyze Root Cause (agent:debug)

megathink

Spawn a **Debug agent** to investigate deeply:

```bash
/agent:debug "[issue description with details]"
```

The agent will:

- Trace execution flow
- Check data state at each point
- Review type expectations
- Look for edge cases
- Identify the root cause

Document findings:

- **Location**: File and line number
- **Root Cause**: Why it's happening
- **Impact**: What else might be affected

### Phase 5: Design Fix

think hard

Design the fix:

- Evaluate solution approaches
- Consider backwards compatibility
- Assess impact on related code
- Choose minimal, focused changes

**Checkpoint**: Present fix approach for approval.

### Phase 6: Implement Fix

Apply the fix:

- Fix the root cause, not symptoms
- Don't introduce new features
- Follow existing patterns
- Add appropriate error handling

### Phase 7: Add Regression Test (agent:test)

think

Spawn a **Test agent** to:

```bash
/agent:test "Add regression test for [issue]"
```

Create test that:

- Prevents this bug from recurring
- Documents the edge case
- Is well-commented with issue reference

### Phase 8: Accessibility Check (agent:a11y)

think

If the bug involves UI components, spawn **A11y agent**:

```bash
/agent:a11y "Verify fix doesn't break accessibility"
```

### Phase 9: Verify Fix

Run all verification:

```bash
# Run reproduction test (should pass now)
pnpm --filter @formkit-gov/[package] test -- [file].test.ts

# Run full test suite
pnpm --filter @formkit-gov/[package] test

# Type check
pnpm --filter @formkit-gov/[package] typecheck

# Lint
pnpm --filter @formkit-gov/[package] lint
```

### Phase 10: Review (agent:review)

think

Spawn a **Review agent** for final check:

```bash
/agent:review "Review bug fix for [issue]"
```

Ensure:

- No debug code left
- Fix is minimal and focused
- Tests are comprehensive
- No new issues introduced

## Parallel Execution

```text
Phase 1-4: Sequential (need context progression)
Phase 5-6: Sequential (design before implement)
Phase 7-8: agent:test + agent:a11y (PARALLEL if UI bug)
Phase 9-10: agent:review + Verify (can overlap)
```

## Output

````markdown
## Bug Fix Report

**Issue:** [Description] **Package:** @formkit-gov/[package] **Severity:**
[Critical/High/Medium/Low]

### Root Cause

[Detailed explanation of why the bug occurred]

### Location

- **File:** `packages/[pkg]/src/[path]/[file].ts`
- **Line:** [line number]
- **Function:** [function name]

### Fix Applied

[Description of the fix]

**Before:**

```typescript
// Problematic code
```
````

**After:**

```typescript
// Fixed code
```

### Files Changed

- `packages/[pkg]/src/[path]/[file].ts` - [what changed]
- `packages/[pkg]/src/[path]/[file].test.ts` - [regression test added]

### Regression Test

```typescript
it('handles [edge case] correctly - fixes #XX', () => {
  // Test code
});
```

### Verification

- [x] Reproduction test now passes
- [x] All existing tests pass
- [x] No type errors
- [x] Linting passes
- [x] Build succeeds
- [x] Accessibility verified (if UI)

### Testing Instructions

[How to verify the fix manually]

### Related Areas

[Any similar code that should be checked]

````markdown
## Example Usage

```bash
/team:debug "SSN schema accepts invalid format 000-00-0000"
```
````

```bash
/team:debug "TextInputField error prop not displaying in form"
```

```bash
/team:debug "TypeScript error when using createSSNSchema with custom messages"
```

## Task

$ARGUMENTS
