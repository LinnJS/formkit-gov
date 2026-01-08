# Run Build

Build packages for distribution.

## Actions

### Build All Packages

```bash
pnpm build
```

### Build Specific Package

```bash
pnpm --filter @formkit-gov/$ARGUMENTS build
```

## Output

Report:

- Build status for each package
- Output files generated
- Any warnings or errors
- Build duration

## Verification

After build, verify outputs:

```bash
ls packages/core/dist/
ls packages/react/dist/
```

## Arguments

$ARGUMENTS - Optional: package name (core, react, wizard, etc.)
