# Project Status

Get a quick overview of project health.

## Actions

Run status checks in parallel:

```bash
# Git status
git status --short

# Check for uncommitted changes
git diff --stat

# Current branch
git branch --show-current

# Recent commits
git log --oneline -5
```

## Package Status

Check each package:

```bash
# List packages
ls packages/

# Check for build outputs
ls packages/*/dist/ 2>/dev/null || echo "No builds"
```

## Output

```markdown
## Project Status

**Branch:** [branch-name] **Clean:** [Yes/No]

### Recent Commits

- [commit 1]
- [commit 2]

### Packages

| Package | Built | Tests |
| ------- | ----- | ----- |
| core    | ✅/❌ | -     |
| react   | ✅/❌ | -     |

### Uncommitted Changes

[List or "None"]
```

## Arguments

$ARGUMENTS - Not used
