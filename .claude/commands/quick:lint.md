# Run Linting

Run ESLint with optional auto-fix.

## Actions

### Check Only (Default)

```bash
pnpm lint
```

### With Auto-Fix

If `--fix` argument provided:

```bash
pnpm lint --fix
```

### Specific Package

```bash
pnpm --filter @formkit-gov/$ARGUMENTS lint
```

## Output

Report:

- Error count
- Warning count
- File locations with issues
- Auto-fixed count (if --fix used)

## Arguments

$ARGUMENTS - Optional: package name or `--fix` for auto-fix
