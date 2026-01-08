# Team: Code Review

Orchestrate a comprehensive multi-agent code review workflow.

## Team Composition

| Phase | Agent           | Responsibility     |
| ----- | --------------- | ------------------ |
| 1     | `agent:explore` | Understand changes |
| 2     | `agent:review`  | Code quality       |
| 3     | `agent:test`    | Test coverage      |
| 4     | `agent:a11y`    | Accessibility      |
| 5     | `agent:docs`    | Documentation      |

## Before Starting

ultrathink

**STOP - Ask clarifying questions:**

1. **What is being reviewed?**
   - Pull request
   - Specific files
   - Recent commits
   - Entire package

2. **What is the scope?**
   - New feature
   - Bug fix
   - Refactoring
   - Documentation

3. **What are the review priorities?**
   - TypeScript correctness
   - React patterns
   - Testing coverage
   - Accessibility
   - Performance
   - Security

4. **Are there specific concerns?**
   - Known issues to verify
   - Patterns to check
   - Requirements to validate

## Workflow

### Phase 1: Understand Changes (agent:explore)

think hard

Spawn an **Explore agent** to understand the scope:

```bash
/agent:explore "Understand changes in [scope]"
```

Gather:

- Files changed
- Lines added/removed
- Components affected
- Dependencies changed

```bash
# For PR review
git diff main...HEAD --stat

# For recent changes
git diff HEAD~5 --stat

# View specific changes
git diff main...HEAD -- packages/[pkg]/src/
```

### Phase 2: Code Quality Review (agent:review)

megathink

Spawn a **Review agent** for thorough code review:

```bash
/agent:review "[scope of review]"
```

Check:

- TypeScript correctness
- React patterns
- Naming conventions
- Code organization
- Error handling
- Performance concerns

### Phase 3: Test Coverage (agent:test)

think hard

Spawn a **Test agent** to verify testing:

```bash
/agent:test "Verify test coverage for [changes]"
```

Verify:

- Tests exist for new code
- Tests cover edge cases
- Tests follow patterns
- Coverage is maintained

Run tests:

```bash
pnpm test
pnpm test:coverage
```

### Phase 4: Accessibility Review (agent:a11y)

think

If UI changes, spawn **A11y agent**:

```bash
/agent:a11y "Review accessibility of [component changes]"
```

Check:

- WCAG compliance
- Keyboard navigation
- Screen reader support
- Focus management

### Phase 5: Documentation Review (agent:docs)

think

Spawn **Docs agent** if public API changes:

```bash
/agent:docs "Review documentation for [changes]"
```

Verify:

- JSDoc is updated
- README reflects changes
- Storybook updated (for components)
- Breaking changes documented

### Phase 6: Automated Checks

Run all automated checks in parallel:

```bash
pnpm lint
pnpm typecheck
pnpm test
```

### Phase 7: Synthesize Findings

Compile findings from all agents into comprehensive review.

## Parallel Execution

```text
Phase 1: agent:explore (sequential - need context)
Phase 2-5: agent:review + agent:test + agent:a11y + agent:docs (PARALLEL)
Phase 6: Automated checks (PARALLEL commands)
Phase 7: Synthesize (sequential)
```

## Output

````markdown
## Code Review Summary

**Scope:** [What was reviewed] **Files:** X files reviewed **Lines:** +X/-Y

### Overall Assessment

**Recommendation:** [Approve / Request Changes / Comment]

### Code Quality

| Category       | Status   | Issues |
| -------------- | -------- | ------ |
| TypeScript     | ✅/⚠️/❌ | X      |
| React Patterns | ✅/⚠️/❌ | X      |
| Naming         | ✅/⚠️/❌ | X      |
| Error Handling | ✅/⚠️/❌ | X      |

### Test Coverage

| Metric      | Value           |
| ----------- | --------------- |
| Tests Added | X               |
| Coverage    | X%              |
| Edge Cases  | Covered/Missing |

### Accessibility

| Check           | Status   |
| --------------- | -------- |
| WCAG Compliance | ✅/⚠️/❌ |
| Keyboard Nav    | ✅/⚠️/❌ |
| Screen Reader   | ✅/⚠️/❌ |

### Documentation

| Item      | Status   |
| --------- | -------- |
| JSDoc     | ✅/⚠️/❌ |
| README    | ✅/⚠️/❌ |
| Storybook | ✅/⚠️/❌ |

### Critical Issues

Must be resolved:

#### Issue 1: [Title]

- **File:** `path/to/file.ts:line`
- **Problem:** [Description]
- **Suggested Fix:** [How to fix]

### Warnings

Should be addressed:

#### Warning 1: [Title]

- **File:** `path/to/file.ts:line`
- **Concern:** [Description]
- **Suggestion:** [Improvement]

### Suggestions

Nice to have:

1. [Suggestion 1]
2. [Suggestion 2]

### Automated Check Results

```bash
pnpm lint      # ✅ Passing
pnpm typecheck # ✅ Passing
pnpm test      # ✅ Passing (X tests)
```
````

### Checklist

- [ ] Code follows project conventions
- [ ] Tests are comprehensive
- [ ] Accessibility requirements met
- [ ] Documentation is updated
- [ ] No security concerns
- [ ] Performance acceptable

````markdown
## Example Usage

```bash
/team:review "Review PR #42 adding SSN schema"
```
````

```bash
/team:review "Review changes in packages/react/src/components/"
```

```bash
/team:review "Full review of wizard package refactoring"
```

## Task

$ARGUMENTS
