# Run Test Coverage

Run tests with coverage report.

## Actions

### All Packages

```bash
pnpm test:coverage
```

### Specific Package

```bash
pnpm --filter @formkit-gov/$ARGUMENTS test:coverage
```

## Output

Report coverage summary:

| Metric     | Coverage |
| ---------- | -------- |
| Statements | X%       |
| Branches   | X%       |
| Functions  | X%       |
| Lines      | X%       |

Highlight:

- Files below threshold
- Uncovered lines
- Areas needing improvement

## Arguments

$ARGUMENTS - Optional: package name (core, react)
