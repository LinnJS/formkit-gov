# Team: Code Review

Orchestrate a multi-agent workflow to perform comprehensive code review.

## Task

$ARGUMENTS

## Workflow

Execute this review workflow by spawning specialized agents for each phase. All phases should
complete before providing the final review summary.

### Phase 1: Context Gathering

Spawn an **Explore agent** to:

- Identify all files in the review scope (PR, commit, or specified files)
- Find related code that might be affected
- Locate existing tests for the changed code
- Check for similar patterns in the codebase

Report findings before proceeding.

### Phase 2: Code Quality Review

megathink

Review the code for quality issues:

- TypeScript types are correct and strict (no `any` without justification)
- Functions have clear, single responsibilities
- No unnecessary complexity or duplicate code
- Meaningful variable and function names
- No console.log or debug statements
- Error handling is appropriate
- Follows project conventions from `.claude/CLAUDE.md`

Run linting and type checks:

```bash
pnpm lint
pnpm typecheck
```

### Phase 3: Testing Review

think hard

Spawn an agent to analyze test coverage:

- Check if tests exist for new functionality
- Verify tests cover edge cases
- Confirm tests follow AAA pattern (Arrange, Act, Assert)
- Verify coverage meets requirements (80%+ overall, 100% critical paths)

Run tests with coverage:

```bash
pnpm test:coverage
```

### Phase 4: Security Review

ultrathink

Check for security issues with deep analysis:

- No hardcoded secrets or credentials
- PII (SSN, addresses, etc.) handled appropriately
- No XSS vulnerabilities in React components
- Input validation in place for user data
- No SQL injection risks (if applicable)
- Check for OWASP Top 10 vulnerabilities
- Verify secure data handling patterns

### Phase 5: Accessibility Review

megathink

For React components, verify accessibility:

- ARIA attributes are correct
- Keyboard navigation works
- Error messages associated with form fields
- Labels connected to inputs
- Focus management is correct

Run accessibility checks if tests exist:

```bash
pnpm --filter @formkit-gov/react test
```

### Phase 6: Performance Review

think deeply

Check for performance issues:

- No unnecessary re-renders in React components
- No expensive computations in render path
- Memoization used where appropriate
- Bundle size impact considered
- No N+1 patterns or inefficient loops

### Phase 7: Documentation Review

think

Verify documentation is complete:

- JSDoc comments on all public APIs
- @example tags included where helpful
- README updated if API changed
- Changeset added for user-facing changes

## Output

After completing all phases, provide a structured review following this format:

### Code Review Summary

- **Scope**: [Files/PR reviewed]
- **Reviewer**: Claude (team-review workflow)
- **Date**: [Date]

### Overall Assessment

State one of: APPROVED / CHANGES REQUESTED / NEEDS DISCUSSION

Provide a brief summary of the changes and overall quality.

### Findings

Organize findings into these categories:

**Critical (Must Fix)** - Issues that must be addressed before merge:

1. **[Category]**: [Issue description]
   - File: `path/to/file.ts:line`
   - Reason: [Why this is critical]
   - Suggestion: [How to fix]

**Warnings (Should Fix)** - Issues that should be addressed:

1. **[Category]**: [Issue description]
   - File: `path/to/file.ts:line`
   - Suggestion: [How to improve]

**Suggestions (Nice to Have)** - Improvements that would enhance the code:

1. **[Category]**: [Suggestion]
   - File: `path/to/file.ts:line`

**Positive Observations** - Good practices observed:

1. [What was done well]

### Checklist Results

**Code Quality**:

- [ ] TypeScript types correct and strict
- [ ] No `any` without justification
- [ ] Single responsibility functions
- [ ] No duplicate code
- [ ] No debug statements

**Testing**:

- [ ] Tests exist for new functionality
- [ ] Edge cases covered
- [ ] Coverage requirements met
- [ ] Tests follow AAA pattern

**Security**:

- [ ] No hardcoded secrets
- [ ] PII handled appropriately
- [ ] Input validation present

**Accessibility**:

- [ ] ARIA attributes correct
- [ ] Keyboard navigation works
- [ ] Error messages associated

**Documentation**:

- [ ] JSDoc on public APIs
- [ ] README updated if needed
- [ ] Changeset added

### Verification Commands

Include the results of running:

```bash
pnpm lint        # [PASS/FAIL]
pnpm typecheck   # [PASS/FAIL]
pnpm test        # [PASS/FAIL] (X tests)
```

### Next Steps

1. [Action items for the author]

## Example Usage

```text
/team-review packages/core/src/schemas/ssn.ts
```

```text
/team-review PR #42
```

```text
/team-review Recent changes to @formkit-gov/react
```

```text
/team-review All uncommitted changes
```
