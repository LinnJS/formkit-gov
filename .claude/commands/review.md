# Code Review

Perform a thorough code review on the specified files or changes.

## Instructions

You are performing a code review following the project's guidelines and best practices.

### Review Checklist

#### Code Quality

- [ ] TypeScript types are correct and strict
- [ ] No `any` types without justification
- [ ] Functions have clear, single responsibilities
- [ ] No unnecessary complexity
- [ ] No duplicate code
- [ ] Meaningful variable and function names
- [ ] No console.log or debug statements

#### Testing

- [ ] Tests exist for new functionality
- [ ] Tests cover edge cases
- [ ] Tests follow AAA pattern
- [ ] Coverage requirements met (80%+ overall, 100% critical)
- [ ] Tests are readable and maintainable

#### Documentation

- [ ] JSDoc comments on public APIs
- [ ] @example included where helpful
- [ ] README updated if needed
- [ ] Changeset added for user-facing changes

#### Accessibility

- [ ] ARIA attributes correct
- [ ] Keyboard navigation works
- [ ] Error messages associated with fields
- [ ] No axe violations

#### Security

- [ ] No hardcoded secrets
- [ ] PII handled appropriately
- [ ] No XSS vulnerabilities
- [ ] Input validation in place

#### Performance

- [ ] No unnecessary re-renders
- [ ] No expensive computations in render
- [ ] Memoization used where appropriate
- [ ] Bundle size impact considered

#### React Specific

- [ ] Hooks follow rules of hooks
- [ ] Dependencies arrays correct
- [ ] No memory leaks (cleanup in useEffect)
- [ ] ref forwarding where appropriate
- [ ] displayName set on components

#### Schema/Validation Specific

- [ ] Error messages are user-friendly
- [ ] Custom messages supported
- [ ] Required/optional handled correctly
- [ ] Edge cases validated

### Review Output Format

```markdown
## Summary

Brief overview of what was reviewed.

## Findings

### Critical

Issues that must be fixed before merge.

### Suggestions

Improvements that would be nice to have.

### Positive

Good practices observed.

## Checklist Results

- [x] TypeScript types correct
- [ ] Tests cover edge cases - Missing test for empty input
- ...
```

### Focus Areas by Package

- **core**: Schema correctness, error messages, patterns
- **react**: Component API, accessibility, form integration
- **store**: State management, persistence, adapters
- **wizard**: Navigation logic, step validation, progress
- **openapi**: Schema generation accuracy, type safety

## Arguments

$ARGUMENTS - Files or PR to review (e.g., "packages/core/src/schemas/ssn.ts" or "PR #42")
