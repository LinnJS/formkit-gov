# Team: Release Preparation

Orchestrate a multi-agent workflow to prepare a release with quality assurance.

## Team Composition

| Phase | Agent           | Responsibility       |
| ----- | --------------- | -------------------- |
| 1     | `agent:explore` | Understand changes   |
| 2     | `agent:test`    | Full test suite      |
| 3     | `agent:a11y`    | Accessibility audit  |
| 4     | `agent:docs`    | Documentation review |
| 5     | `agent:review`  | Final quality check  |

## Before Starting

ultrathink

**STOP - Ask clarifying questions before proceeding:**

1. **What type of release?**
   - Patch (bug fixes only)
   - Minor (new features, backwards compatible)
   - Major (breaking changes)

2. **Which packages are being released?**
   - `@formkit-gov/core`
   - `@formkit-gov/react`
   - `@formkit-gov/wizard`
   - `@formkit-gov/store`
   - `@formkit-gov/validators`
   - Multiple packages

3. **What changes are included?**
   - New features
   - Bug fixes
   - Breaking changes
   - Documentation updates

4. **Are there any known issues?**
   - Failing tests
   - TypeScript errors
   - Lint warnings

5. **Has changeset been created?**

## Workflow

### Phase 1: Pre-Release Checks (agent:explore)

think hard

Spawn an **Explore agent** to understand what's being released:

```bash
/agent:explore "Summarize all changes since last release"
```

Check current state:

```bash
# Check for uncommitted changes
git status

# Check current versions
cat packages/core/package.json | grep version
cat packages/react/package.json | grep version

# Check for existing changesets
ls .changeset/

# View changes since last tag
git log --oneline $(git describe --tags --abbrev=0)..HEAD
```

### Phase 2: Full Test Suite (agent:test)

think hard

Spawn a **Test agent** to verify all tests pass:

```bash
/agent:test "Run comprehensive test suite for release"
```

Run tests:

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage
```

Verify:

- All tests pass
- Coverage meets thresholds
- No flaky tests

### Phase 3: Type Checking and Linting

think

Run type and lint checks in parallel:

```bash
# Full TypeScript check
pnpm typecheck

# Run all linting
pnpm lint
```

### Phase 4: Build Verification

megathink

```bash
# Clean build all packages
pnpm build

# Verify build outputs exist
ls packages/core/dist/
ls packages/react/dist/
```

Check:

- ESM and CJS outputs generated
- Type declarations present
- No build warnings

### Phase 5: Accessibility Audit (agent:a11y)

think

Spawn an **A11y agent** for packages with components:

```bash
/agent:a11y "Pre-release accessibility audit for react package"
```

### Phase 6: Documentation Review (agent:docs)

think

Spawn a **Docs agent** to verify documentation:

```bash
/agent:docs "Review documentation completeness for release"
```

Check:

- README is updated
- JSDoc is complete
- CHANGELOG reflects changes
- Breaking changes documented

### Phase 7: Create Changeset

think hard

If not already created:

```bash
pnpm changeset
```

Write clear changeset:

```markdown
---
'@formkit-gov/core': minor
'@formkit-gov/react': minor
---

## New Features

- Added [feature] to [package]

## Bug Fixes

- Fixed [issue] in [component]

## Breaking Changes

- [Breaking change description]

## Migration Guide

[If breaking changes exist]
```

### Phase 8: Version Bump (Dry Run)

```bash
# Preview version changes
pnpm changeset version --dry-run
```

### Phase 9: Final Review (agent:review)

think

Spawn **Review agent** for final quality check:

```bash
/agent:review "Pre-release review for all packages"
```

### Phase 10: Release Checklist

```markdown
## Pre-Release Checklist

- [ ] All tests pass
- [ ] TypeScript compiles without errors
- [ ] Linting passes
- [ ] Build succeeds for all packages
- [ ] Accessibility audit passed
- [ ] Documentation updated
- [ ] Changeset created
- [ ] CHANGELOG reviewed
- [ ] Breaking changes documented
- [ ] Migration guide written (if needed)
```

## Parallel Execution

```text
Phase 1: agent:explore (sequential - need context)
Phase 2-3: agent:test + Typecheck + Lint (PARALLEL)
Phase 4: Build (sequential - after checks)
Phase 5-6: agent:a11y + agent:docs (PARALLEL)
Phase 7-8: Changeset (sequential)
Phase 9-10: agent:review + Checklist (sequential)
```

## Output

```markdown
## Release Preparation Summary

**Release Type:** [Patch/Minor/Major] **Packages:** @formkit-gov/[packages]

### Version Changes

| Package            | Current | New   |
| ------------------ | ------- | ----- |
| @formkit-gov/core  | X.Y.Z   | X.Y.Z |
| @formkit-gov/react | X.Y.Z   | X.Y.Z |

### Quality Checks

| Check      | Status               |
| ---------- | -------------------- |
| Tests      | ✅ Passing (X tests) |
| TypeScript | ✅ No errors         |
| Lint       | ✅ Passing           |
| Build      | ✅ Successful        |
| A11y       | ✅ Compliant         |
| Docs       | ✅ Updated           |

### Changes Included

**Features:**

- [Feature 1]

**Bug Fixes:**

- [Fix 1]

**Breaking Changes:**

- [None / List changes]

### Changeset

Located at: `.changeset/[name].md`

### Next Steps

1. Review and merge changeset
2. Run `pnpm changeset version`
3. Commit version bumps
4. Run `pnpm changeset publish`
5. Create GitHub release
```

## Example Usage

```bash
/team:release "Prepare minor release with new SSN schema"
```

```bash
/team:release "Prepare patch release for TextInputField bug fix"
```

```bash
/team:release "Prepare major release with breaking API changes"
```

## Task

$ARGUMENTS
