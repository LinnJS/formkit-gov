# Team: Release Preparation

Orchestrate a multi-agent workflow to prepare and execute a release.

## Task

$ARGUMENTS

## Workflow

Execute this release workflow with specialized agents for each phase.

### Phase 1: Pre-Release Audit

think hard

Spawn agents to check release readiness:

**Code Quality Check:**

```bash
pnpm lint
pnpm typecheck
```

**Test Suite:**

```bash
pnpm test
pnpm test:coverage
```

**Build Verification:**

```bash
pnpm build
```

Report any failures before proceeding.

### Phase 2: Review Changesets

think

Check pending changesets:

```bash
ls -la .changeset/*.md
cat .changeset/*.md
```

For each changeset, verify:

- Correct packages selected
- Appropriate bump type (patch/minor/major)
- Clear, user-friendly description
- No typos or formatting issues

### Phase 3: Review Changes Since Last Release

megathink

Spawn a **Plan agent** to analyze all changes:

```bash
# Get last release tag
git describe --tags --abbrev=0

# See commits since last release
git log $(git describe --tags --abbrev=0)..HEAD --oneline

# See changed files
git diff $(git describe --tags --abbrev=0)..HEAD --stat
```

Verify all significant changes have changesets.

### Phase 4: Version Packages

think

Run changeset version:

```bash
pnpm version-packages
```

This will:

- Update package.json versions
- Update CHANGELOG.md files
- Remove consumed changesets

### Phase 5: Review Generated Changes

think hard

Check the generated changes:

**Version bumps:**

```bash
git diff packages/*/package.json
```

**Changelogs:**

```bash
git diff packages/*/CHANGELOG.md
```

Verify:

- Versions are correct
- Changelog entries are formatted properly
- No unexpected changes

### Phase 6: Final Verification

think

Run full CI suite one more time:

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

### Phase 7: Create Release Commit

If all checks pass:

```bash
git add .
git commit -m "chore: release packages"
```

### Phase 8: Generate Release Notes

megathink

For each package being released, generate release notes:

```markdown
## @formkit-gov/[package] vX.X.X

### What's New

- [Feature descriptions from changesets]

### Bug Fixes

- [Bug fix descriptions]

### Breaking Changes

- [Any breaking changes with migration guide]

### Contributors

- @contributor1
- @contributor2
```

## Output

Provide:

```markdown
## Release Summary

**Date**: YYYY-MM-DD

### Packages Released

| Package            | Version | Bump  |
| ------------------ | ------- | ----- |
| @formkit-gov/core  | X.X.X   | patch |
| @formkit-gov/react | X.X.X   | minor |

### Highlights

[Key changes in this release]

### Changelog

[Combined changelog entries]

### Pre-Release Checklist

- [x] All tests pass
- [x] Types check
- [x] Build succeeds
- [x] Changesets reviewed
- [x] CHANGELOGs updated
- [x] Versions bumped
- [x] Ready for publish

### Next Steps

1. Push to main branch
2. CI will create release PR (or publish directly)
3. Monitor npm publish
4. Announce release
```

## Example Usage

```text
/team-release Prepare patch release for SSN validation fix
```

```text
/team-release Prepare minor release with new DateField component
```

```text
/team-release Review and finalize v0.2.0 release
```
