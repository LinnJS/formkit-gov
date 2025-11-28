# Team: Migration Guide

Orchestrate a multi-agent workflow to create a migration guide for breaking changes.

## Task

$ARGUMENTS

## Workflow

Execute this migration workflow with specialized agents for each phase.

### Phase 1: Identify Breaking Changes

Spawn an **Explore agent** to:

- Find all changes since last major version
- Identify API changes
- Find renamed/removed exports
- Detect changed function signatures
- Note changed default behaviors

```bash
# Compare with last major version
git diff v[LAST_MAJOR]..HEAD --stat

# Find changed exports
git diff v[LAST_MAJOR]..HEAD -- "*/index.ts"

# Find changed types
git diff v[LAST_MAJOR]..HEAD -- "*/types.ts"
```

### Phase 2: Categorize Changes

megathink

Spawn a **Plan agent** to organize changes by impact:

**High Impact** (requires code changes):

- Removed exports
- Changed function signatures
- Renamed components/functions
- Changed prop types

**Medium Impact** (may require changes):

- Changed default values
- New required props
- Deprecated features removed

**Low Impact** (informational):

- New optional features
- Performance improvements
- Internal refactoring

### Phase 3: Create Migration Steps

ultrathink

Spawn a **Plan agent** to document each breaking change thoroughly:

```markdown
### [Change Title]

**What Changed**: [Description of the change]

**Before (v[OLD])**: \`\`\`typescript // Old usage import { oldFunction } from '@formkit-gov/core';
oldFunction(arg1, arg2); \`\`\`

**After (v[NEW])**: \`\`\`typescript // New usage import { newFunction } from '@formkit-gov/core';
newFunction({ param1: arg1, param2: arg2 }); \`\`\`

**Migration**:

1. Find all usages of `oldFunction`
2. Replace with `newFunction`
3. Update arguments to new format

**Codemod** (if applicable): \`\`\`bash

# Automated migration

npx jscodeshift -t @formkit-gov/codemods/old-to-new.js src/ \`\`\`
```

### Phase 4: Create Codemods (if applicable)

megathink

For common migrations, create jscodeshift transforms:

```typescript
// codemods/old-to-new.js
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Transform logic
  root
    .find(j.ImportDeclaration, {
      source: { value: '@formkit-gov/core' },
    })
    .forEach(path => {
      // Update imports
    });

  return root.toSource();
}
```

### Phase 5: Test Migration Path

think hard

Create a test project that:

1. Uses the old API
2. Applies migration steps
3. Verifies everything works

```bash
# Create test project
mkdir migration-test
cd migration-test
npm init -y
npm install @formkit-gov/core@[OLD_VERSION]

# Add test code using old API
# ...

# Upgrade
npm install @formkit-gov/core@[NEW_VERSION]

# Apply migration steps
# Verify it works
```

### Phase 6: Write Migration Guide

think hard

Create `MIGRATION.md` or update docs:

```markdown
# Migration Guide: v[OLD] to v[NEW]

## Overview

This guide helps you migrate from @formkit-gov v[OLD] to v[NEW].

**Estimated Time**: [X minutes/hours] **Breaking Changes**: [X]

## Before You Start

1. Ensure all tests pass on current version
2. Commit your current state
3. Read through all changes below

## Step-by-Step Migration

### 1. Update Dependencies

\`\`\`bash pnpm update @formkit-gov/core@^[NEW] pnpm update @formkit-gov/react@^[NEW] \`\`\`

### 2. [First Breaking Change]

[Detailed migration instructions]

### 3. [Second Breaking Change]

[Detailed migration instructions]

## Automated Migration

We provide codemods for common changes:

\`\`\`bash npx @formkit-gov/codemods migrate --from [OLD] --to [NEW] \`\`\`

## Verification

After migration:

1. Run type check: \`pnpm typecheck\`
2. Run tests: \`pnpm test\`
3. Run build: \`pnpm build\`
4. Test manually in browser

## Troubleshooting

### [Common Issue 1]

[Solution]

### [Common Issue 2]

[Solution]

## Getting Help

- [GitHub Issues](link)
- [Discussions](link)

## Deprecation Warnings

The following are deprecated and will be removed in v[FUTURE]:

- `oldThing` - Use `newThing` instead
```

### Phase 7: Update Changelog

think

Ensure CHANGELOG.md clearly marks breaking changes:

```markdown
## [X.0.0] - YYYY-MM-DD

### BREAKING CHANGES

- **core**: `createSSNSchema` now requires options object ([#PR](link))
- **react**: `TextInputField` prop `errorMessage` renamed to `error` ([#PR](link))

See [Migration Guide](./MIGRATION.md) for upgrade instructions.
```

## Output

Provide:

```markdown
## Migration Guide Summary

**From**: vX.X.X **To**: vY.0.0

### Breaking Changes

| Change     | Impact | Automated |
| ---------- | ------ | --------- |
| [Change 1] | High   | Yes       |
| [Change 2] | Medium | No        |

### Files Created

- `MIGRATION.md` - Full migration guide
- `codemods/[name].js` - Automated transforms (if any)

### Testing

- [ ] Migration tested on sample project
- [ ] Codemods tested
- [ ] Documentation complete

### Next Steps

1. Review migration guide
2. Test on real project
3. Publish with release notes
```

## Example Usage

```text
/team-migrate Create migration guide from v0.x to v1.0 for schema API changes
```

```text
/team-migrate Document breaking changes in React component props
```

```text
/team-migrate Create codemods for SSN schema signature change
```
