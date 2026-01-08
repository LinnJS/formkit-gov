# Run All Quality Checks

Run comprehensive quality checks without making changes.

## Actions

Execute the full quality check suite:

```bash
pnpm lint && pnpm typecheck && pnpm format:check
```

This runs:

1. ESLint (code quality)
2. TypeScript type checking
3. Prettier format verification

## Output

Report results in a concise format:

- Pass/fail status for each check
- Count of errors and warnings
- File locations for any failures

If all checks pass, confirm with a brief success message.

## Arguments

$ARGUMENTS - Optional: package name to check (e.g., "core", "react")

If package specified:

```bash
pnpm --filter @formkit-gov/$ARGUMENTS lint
pnpm --filter @formkit-gov/$ARGUMENTS typecheck
```
