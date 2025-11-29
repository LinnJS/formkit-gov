# Release Process

This document describes how to release new versions of FormKit Gov packages.

## Overview

We use [Changesets](https://github.com/changesets/changesets) for version management and automated
releases via GitHub Actions.

## Adding Changesets

### When to Add a Changeset

Add a changeset when your PR includes:

- New features
- Bug fixes
- Breaking changes
- Documentation updates that affect usage
- Dependency updates that affect consumers

### How to Add a Changeset

1. Run the changeset command:

   ```bash
   pnpm changeset
   ```

2. Select affected packages:

   ```text
   🦋  Which packages would you like to include?
   ◯ @formkit-gov/core
   ◉ @formkit-gov/react
   ◯ @formkit-gov/store
   ```

3. Select bump type:

   ```text
   🦋  Which packages should have a major bump?
   🦋  Which packages should have a minor bump?
   ◉ @formkit-gov/react
   ```

4. Write a summary:

   ```text
   🦋  Summary: Add TextInputField component with VA Design System integration
   ```

5. Commit the generated file:

   ```bash
   git add .changeset/*.md
   git commit -m "chore: add changeset"
   ```

### Changeset Format

Generated changeset files look like:

```markdown
---
'@formkit-gov/react': minor
---

Add TextInputField component with VA Design System integration

- Wraps va-text-input web component
- Integrates with React Hook Form
- Supports all VA text input variants
```

## Version Bumps

### Patch (0.0.x)

Bug fixes and minor improvements:

- Fix validation edge case
- Update error message
- Fix TypeScript types
- Performance improvements

### Minor (0.x.0)

New features (backwards compatible):

- Add new component
- Add new schema factory
- Add new hook
- Add new adapter

### Major (x.0.0)

Breaking changes:

- Remove deprecated API
- Change function signature
- Rename exports
- Change default behavior

## Release Workflow

### Automatic Release

1. **PR with Changesets Merged**

   When a PR with changesets is merged to `main`, the release workflow:
   - Collects all changesets
   - Creates a "Version Packages" PR

2. **Version Packages PR**

   The automated PR:
   - Updates package versions
   - Updates CHANGELOG.md files
   - Removes consumed changesets

3. **Merge Version PR**

   When the Version Packages PR is merged:
   - Packages are published to npm
   - Git tags are created
   - GitHub release is created

### Manual Release (Emergency)

For emergency releases:

```bash
# Ensure clean working directory
git checkout main
git pull

# Create changeset manually
pnpm changeset

# Version packages
pnpm version-packages

# Build all packages
pnpm build

# Publish (requires npm auth)
pnpm release
```

## Pre-release Versions

### Creating a Pre-release

1. Enter pre-release mode:

   ```bash
   pnpm changeset pre enter alpha
   ```

2. Add changesets and version as normal:

   ```bash
   pnpm changeset
   pnpm version-packages
   ```

3. Publish pre-release:

   ```bash
   pnpm release
   ```

4. Exit pre-release mode:

   ```bash
   pnpm changeset pre exit
   ```

### Pre-release Tags

- `alpha`: Early development, unstable
- `beta`: Feature complete, testing
- `rc`: Release candidate, final testing

## Release Checklist

Before releasing:

- [ ] All CI checks pass
- [ ] Tests pass locally
- [ ] Documentation is updated
- [ ] CHANGELOG entries are meaningful
- [ ] No console.log or debug code
- [ ] Bundle size is acceptable

## Troubleshooting

### Failed Publish

If npm publish fails:

1. Check npm authentication:

   ```bash
   npm whoami
   ```

2. Verify package access:

   ```bash
   npm access ls-packages
   ```

3. Check for version conflicts:

   ```bash
   npm view @formkit-gov/core versions
   ```

### Stuck Version PR

If the Version Packages PR is stuck:

1. Close the existing PR
2. Delete the `changeset-release/main` branch
3. Re-run the release workflow

### Wrong Version Published

If wrong version was published:

1. Deprecate the version:

   ```bash
   npm deprecate @formkit-gov/core@X.X.X "Released in error"
   ```

2. Publish correct version

3. Update documentation

## npm Organization

### Package Access

All packages are published under the `@formkit-gov` scope:

- Public packages: `access: public`
- Requires npm organization membership to publish

### npm Tokens

- `NPM_TOKEN` secret in GitHub Actions
- Token needs publish access to organization
- Rotate tokens periodically

## GitHub Releases

### Automatic Release Notes

GitHub releases are created automatically with:

- Changelog content
- Contributor list
- Asset links

### Manual Release Notes

To edit release notes:

1. Go to GitHub Releases
2. Click on release
3. Edit release notes
4. Highlight breaking changes
5. Add migration instructions if needed
