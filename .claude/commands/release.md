# Release Management

Manage releases for the FormKit Gov project.

## Instructions

You are managing releases following the project's release process using Changesets.

### Release Workflow

1. **Check Current State**

   ```bash
   # Check for uncommitted changes
   git status

   # Check existing changesets
   ls .changeset/*.md
   ```

2. **Create Changeset**

   ```bash
   pnpm changeset
   ```

   Select:
   - Affected packages
   - Bump type (patch/minor/major)
   - Summary description

3. **Version Packages**

   ```bash
   pnpm version-packages
   ```

   This updates:
   - Package versions
   - CHANGELOG.md files
   - Removes consumed changesets

4. **Publish**

   ```bash
   pnpm release
   ```

### Version Guidelines

#### Patch (0.0.X)

Use for:

- Bug fixes
- Documentation fixes
- Performance improvements
- Internal refactoring

#### Minor (0.X.0)

Use for:

- New features
- New components
- New schema factories
- New adapters

#### Major (X.0.0)

Use for:

- Breaking API changes
- Removed features
- Changed defaults
- Renamed exports

### Changeset Format

```markdown
---
'@formkit-gov/core': minor
'@formkit-gov/react': patch
---

Add createEINSchema for employer identification numbers

- New schema factory for EIN validation
- Supports flexible formatting
- User-friendly error messages
```

### Pre-Release Process

```bash
# Enter pre-release mode
pnpm changeset pre enter alpha

# Create changesets as normal
pnpm changeset

# Version and publish
pnpm version-packages
pnpm release

# Exit pre-release mode
pnpm changeset pre exit
```

### Release Checklist

Before releasing:

- [ ] All CI checks pass
- [ ] Tests pass locally (`pnpm test`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Types check (`pnpm typecheck`)
- [ ] Lint passes (`pnpm lint`)
- [ ] Documentation is updated
- [ ] CHANGELOG entries are meaningful
- [ ] No console.log or debug code
- [ ] Bundle size is acceptable

### Emergency Hotfix

```bash
# Create hotfix branch
git checkout -b hotfix/critical-fix main

# Make fix and add changeset
pnpm changeset

# Fast-track through CI
git push origin hotfix/critical-fix

# After merge and CI passes
git checkout main
git pull
pnpm version-packages
pnpm build
pnpm release
```

### Troubleshooting

#### Failed Publish

```bash
# Check npm auth
npm whoami

# Check package access
npm access ls-packages

# Check for version conflicts
npm view @formkit-gov/core versions
```

#### Wrong Version Published

```bash
# Deprecate the version
npm deprecate @formkit-gov/core@X.X.X "Released in error"

# Publish correct version
pnpm release
```

### Release Commands

```bash
# Full release workflow
pnpm changeset         # Create changeset
pnpm version-packages  # Update versions
pnpm build             # Build all packages
pnpm release           # Publish to npm

# Check what would be released
pnpm changeset status
```

## Arguments

$ARGUMENTS - Release action (e.g., "create changeset for SSN schema fix" or "prepare minor release")
