# Run Tests

Run the test suite quickly.

## Actions

Run tests based on arguments:

### No Arguments - Run All Tests

```bash
pnpm test
```

### With Package Name

```bash
pnpm --filter @formkit-gov/$ARGUMENTS test
```

### With File Pattern

```bash
pnpm --filter @formkit-gov/core test -- $ARGUMENTS
```

## Output

Report:

- Total tests run
- Pass/fail count
- Failed test details (if any)
- Duration

## Arguments

$ARGUMENTS - Optional: package name (core, react) or file pattern (ssn.test.ts)
