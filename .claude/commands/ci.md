# CI/CD Management

Manage CI/CD workflows and troubleshoot pipeline issues.

## Instructions

You are helping with continuous integration and deployment.

### GitHub Actions Workflows

Located in `.github/workflows/`:

#### ci.yml - Main CI Pipeline

Runs on every PR and push to main:

- Lint (ESLint + Prettier)
- Type check (tsc)
- Unit tests (Vitest)
- Build all packages
- E2E tests (Playwright) - main only

#### release.yml - Automated Releases

Triggered on main branch:

- Creates "Version Packages" PR via Changesets
- Publishes to npm when version PR merged
- Creates GitHub releases

#### chromatic.yml - Visual Regression

Runs Storybook visual tests:

- Captures component screenshots
- Compares against baseline
- Reports visual diffs

#### docs.yml - Documentation Deploy

Deploys documentation to Vercel:

- Builds Nextra docs site
- Deploys preview on PR
- Deploys production on main

#### size-limit.yml - Bundle Size

Monitors package bundle sizes:

- Fails if size exceeds limits
- Reports size changes on PRs

#### codeql.yml - Security Analysis

Weekly security scan:

- Analyzes for vulnerabilities
- Reports security issues

### Running CI Locally

```bash
# Run full CI check
pnpm lint && pnpm typecheck && pnpm test && pnpm build

# Run specific checks
pnpm lint           # ESLint
pnpm format:check   # Prettier
pnpm typecheck      # TypeScript
pnpm test           # Vitest
pnpm build          # Build all
pnpm e2e            # Playwright
```

### Troubleshooting CI Failures

#### Lint Failures

```bash
# See what's wrong
pnpm lint

# Auto-fix
pnpm lint:fix
pnpm format
```

#### Type Errors

```bash
# Check types
pnpm typecheck

# See detailed errors
pnpm --filter @formkit-gov/core typecheck
```

#### Test Failures

```bash
# Run tests locally
pnpm test

# Run specific package
pnpm --filter @formkit-gov/core test

# Run with coverage
pnpm test:coverage
```

#### Build Failures

```bash
# Clean and rebuild
pnpm clean
pnpm build

# Check specific package
pnpm --filter @formkit-gov/core build
```

#### E2E Failures

```bash
# Run E2E tests locally
pnpm e2e

# Run with UI mode
pnpm e2e:ui

# Debug specific test
pnpm e2e --debug
```

### CI Configuration

#### Required Secrets

- `NPM_TOKEN` - npm publish access
- `CHROMATIC_PROJECT_TOKEN` - Visual regression
- `VERCEL_TOKEN` - Docs deployment
- `CODECOV_TOKEN` - Coverage reporting

#### Branch Protection

main branch requires:

- All CI checks pass
- At least 1 review approval
- Up-to-date with main
- No unresolved conversations

### Workflow Dispatch

Some workflows can be triggered manually:

```bash
# Trigger release workflow
gh workflow run release.yml

# Trigger security scan
gh workflow run codeql.yml
```

### Adding New Checks

To add a new CI check:

1. Add to `.github/workflows/ci.yml`
2. Add corresponding script to root `package.json`
3. Test locally first
4. Document in this file

### CI Status Badges

```markdown
[![CI](https://github.com/LinnJS/formkit-gov/workflows/CI/badge.svg)](https://github.com/LinnJS/formkit-gov/actions)
[![npm](https://img.shields.io/npm/v/@formkit-gov/core)](https://www.npmjs.com/package/@formkit-gov/core)
[![codecov](https://codecov.io/gh/LinnJS/formkit-gov/branch/main/graph/badge.svg)](https://codecov.io/gh/LinnJS/formkit-gov)
```

## Arguments

$ARGUMENTS - CI task (e.g., "fix failing lint check" or "add bundle size monitoring")
