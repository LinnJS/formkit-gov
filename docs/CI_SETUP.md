# CI/CD Setup Guide

This guide explains how to set up GitHub Actions CI/CD for the FormKit Gov repository.

## Prerequisites

Before enabling CI, ensure:

1. Repository is on GitHub
2. GitHub Actions is enabled for the repository
3. Required secrets and variables are configured

## GitHub Actions Workflows

The project includes several GitHub Actions workflows in `.github/workflows/`:

| Workflow      | File             | Trigger                 | Purpose                         |
| ------------- | ---------------- | ----------------------- | ------------------------------- |
| CI            | `ci.yml`         | Push/PR to main         | Lint, typecheck, test, build    |
| Release       | `release.yml`    | Push to main            | Automated npm publishing        |
| Chromatic     | `chromatic.yml`  | Push/PR to main         | Storybook visual testing        |
| Documentation | `docs.yml`       | Push to main            | Deploy documentation site       |
| CodeQL        | `codeql.yml`     | Push/PR to main, weekly | Security vulnerability scanning |
| Size Limit    | `size-limit.yml` | PR to main              | Bundle size checking            |

## Required Secrets

Configure these secrets in GitHub repository settings (**Settings > Secrets and variables >
Actions**):

### Required for Basic CI

| Secret | Description                    | How to Get |
| ------ | ------------------------------ | ---------- |
| None   | Basic CI works without secrets | N/A        |

### Optional for Full Functionality

| Secret                    | Description             | How to Get                                                                     |
| ------------------------- | ----------------------- | ------------------------------------------------------------------------------ |
| `NPM_TOKEN`               | npm publish token       | [npm Access Tokens](https://docs.npmjs.com/creating-and-viewing-access-tokens) |
| `CODECOV_TOKEN`           | Code coverage reporting | [Codecov](https://docs.codecov.io/docs/quick-start)                            |
| `CHROMATIC_PROJECT_TOKEN` | Storybook visual tests  | [Chromatic](https://www.chromatic.com/docs/setup)                              |

### Optional for Turbo Remote Caching

| Variable/Secret         | Description                     | How to Get                                         |
| ----------------------- | ------------------------------- | -------------------------------------------------- |
| `TURBO_TOKEN` (secret)  | Vercel Turbo remote cache token | [Vercel Tokens](https://vercel.com/account/tokens) |
| `TURBO_TEAM` (variable) | Vercel team slug                | Your Vercel team name                              |

## Setup Steps

### Step 1: Initial Repository Setup

1. Push the repository to GitHub:

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/formkit-gov.git
   git branch -M main
   git push -u origin main
   ```

2. Verify GitHub Actions is enabled:
   - Go to **Settings > Actions > General**
   - Ensure "Allow all actions and reusable workflows" is selected

### Step 2: Configure Branch Protection (Recommended)

1. Go to **Settings > Branches**
2. Add rule for `main` branch:
   - Require a pull request before merging
   - Require status checks to pass before merging
   - Select required status checks:
     - `Lint`
     - `Type Check`
     - `Test`
     - `Build`
   - Require branches to be up to date before merging

### Step 3: Add Secrets (Optional)

For npm publishing:

1. Create an npm access token at <https://www.npmjs.com/settings/YOUR_USERNAME/tokens>
2. Select "Automation" token type
3. Add as `NPM_TOKEN` secret in GitHub

For code coverage:

1. Sign up at [Codecov](https://codecov.io)
2. Add repository and get token
3. Add as `CODECOV_TOKEN` secret in GitHub

### Step 4: Verify CI is Working

1. Create a test branch:

   ```bash
   git checkout -b test/ci-verification
   ```

2. Make a small change (e.g., add a comment)

3. Push and create a PR:

   ```bash
   git push -u origin test/ci-verification
   ```

4. Check the Actions tab for workflow runs

5. Verify all checks pass:
   - Lint
   - Type Check
   - Test
   - Build

## CI Jobs Explained

### Lint Job

Runs code quality checks:

```yaml
- pnpm lint # ESLint on all packages
- pnpm lint:md # Markdown linting
- pnpm format:check # Prettier formatting check
```

### Type Check Job

Runs TypeScript compiler:

```yaml
- pnpm typecheck # tsc --noEmit on all packages
```

### Test Job

Runs test suites with coverage:

```yaml
- pnpm test:coverage # Vitest with coverage reports
```

Coverage reports are uploaded to Codecov if configured.

### Build Job

Builds all packages and reports sizes:

```yaml
- pnpm build # tsup builds for all packages
```

Package sizes are reported in the GitHub Actions summary.

### E2E Job

Runs Playwright end-to-end tests:

```yaml
- pnpm e2e # Playwright tests
```

Currently set to `continue-on-error: true` as E2E tests are being developed.

## Troubleshooting

### CI Fails on `pnpm install --frozen-lockfile`

The lockfile is out of sync. Fix locally:

```bash
pnpm install
git add pnpm-lock.yaml
git commit -m "chore: update lockfile"
git push
```

### CI Fails on `pnpm lint`

ESLint found issues. Fix locally:

```bash
pnpm lint:fix
git add .
git commit -m "fix: lint errors"
git push
```

### CI Fails on `pnpm format:check`

Prettier formatting issues. Fix locally:

```bash
pnpm format
git add .
git commit -m "style: format code"
git push
```

### CI Fails on `pnpm typecheck`

TypeScript errors. Check the error output and fix type issues.

### CI Fails on `pnpm test`

Test failures. Run locally to debug:

```bash
pnpm test
```

## Local CI Simulation

Run all CI checks locally before pushing:

```bash
# Install dependencies
pnpm install

# Run all checks (same as CI)
pnpm lint && pnpm lint:md && pnpm format:check && pnpm typecheck && pnpm test && pnpm build
```

Or use the pre-push hook which runs these automatically.

## Turbo Remote Caching (Optional)

To speed up CI builds with Turbo remote caching:

1. Create a Vercel account and team
2. Generate a token at <https://vercel.com/account/tokens>
3. Add secrets/variables:
   - `TURBO_TOKEN` (secret): Your Vercel token
   - `TURBO_TEAM` (variable): Your Vercel team slug

The CI workflow is already configured to use these if present.

## Release Workflow

The release workflow (`release.yml`) handles automated npm publishing:

1. Changesets are added during development
2. On push to main, the workflow creates a "Version Packages" PR
3. Merging that PR triggers npm publish

See [RELEASE_PROCESS.md](./RELEASE_PROCESS.md) for detailed release instructions.
