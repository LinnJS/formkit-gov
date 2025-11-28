# Pull Request

Create or review a pull request following project standards.

## Instructions

You are helping with pull request workflows.

### Creating a PR

1. **Ensure Branch is Ready**

   ```bash
   # Check status
   git status

   # Ensure all changes committed
   git add .
   git commit -m "feat: description"

   # Push branch
   git push -u origin feature/branch-name
   ```

2. **Run Checks Locally**

   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   pnpm build
   ```

3. **Create Changeset**

   ```bash
   pnpm changeset
   ```

4. **Create PR** Use the PR template in `.github/PULL_REQUEST_TEMPLATE.md`

### PR Template

```markdown
## Description

Brief description of changes.

## Type of Change

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as
      expected)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)

## Checklist

- [ ] I have performed a self-review of my code
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally
- [ ] I have added/updated documentation as needed
- [ ] I have added a changeset for user-facing changes
- [ ] My changes generate no new warnings
- [ ] I have checked accessibility requirements

## Testing Instructions

Steps to test these changes.

## Screenshots (if applicable)

Before/after screenshots.

## Related Issues

Closes #XX
```

### PR Review Checklist

#### Code Quality

- [ ] Code follows project style guidelines
- [ ] No unnecessary complexity
- [ ] No duplicate code
- [ ] Good naming conventions

#### Testing

- [ ] Tests exist and pass
- [ ] Edge cases covered
- [ ] Coverage maintained

#### Documentation

- [ ] JSDoc updated
- [ ] README updated if needed
- [ ] Changeset included

#### Accessibility

- [ ] ARIA attributes correct
- [ ] Keyboard navigation works
- [ ] No axe violations

### PR Review Commands

```bash
# Checkout PR locally
gh pr checkout [PR_NUMBER]

# Run tests
pnpm test

# Check types
pnpm typecheck

# Run lint
pnpm lint

# Build
pnpm build
```

### PR Comments

Use these prefixes:

- `nit:` - Minor suggestion, not blocking
- `question:` - Seeking clarification
- `suggestion:` - Improvement idea
- `issue:` - Must be addressed before merge

### Merging

Requirements before merge:

- All CI checks pass
- At least one approval
- No unresolved comments
- Changeset included (if needed)
- Branch up to date with main

## Arguments

$ARGUMENTS - PR action (e.g., "review PR #42" or "prepare PR for SSN validation fix")
