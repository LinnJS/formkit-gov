# @formkit-gov/validators

Extended validation library with government-specific rules for SSN, addresses, military dates, and
more.

## Status

**Coming in v0.2.0** - This package is currently a placeholder.

See the [roadmap](../../docs/ROADMAP.md) for planned features.

## Current Validation

Basic validation utilities are available in `@formkit-gov/core`:

- `validateSSN` - Social Security Number validation
- `validateVAFileNumber` - VA file number validation
- `validatePhoneNumber` - US phone number validation
- `validateZipCode` - US ZIP code validation
- `validateDateInPast` - Date in past validation
- `validateDateInFuture` - Date in future validation
- `validateMinimumAge` - Age verification

## Planned Features

This package will extend core validation with:

- Enhanced SSN validation with ITIN support
- Military date validation
- Address verification utilities
- Cross-field validation helpers
- Async validation patterns
- Custom validation rule builders

## Installation

```bash
pnpm add @formkit-gov/validators
```

## Documentation

Full documentation will be available at
[docs.formkit-gov.org/validators](https://docs.formkit-gov.org/validators) when this package is
released.

## License

MIT
