# @formkit-gov/core

Framework-agnostic form primitives, Zod schemas, and validation utilities for government
applications.

## Installation

```bash
npm install @formkit-gov/core zod
```

## Features

- Pre-built Zod schemas for common government form fields
- SSN, phone number, address validation
- Schema composition utilities
- Plain language error messages
- Zero framework dependencies

## Usage

### Schemas

```typescript
import {
  createSSNSchema,
  createPhoneSchema,
  createAddressSchema,
  createDateSchema,
  createFullNameSchema,
} from '@formkit-gov/core';
import { z } from 'zod';

// Create a form schema
const veteranInfoSchema = z.object({
  name: createFullNameSchema(),
  ssn: createSSNSchema(),
  phone: createPhoneSchema(),
  dateOfBirth: createDateSchema({ pastOnly: true }),
  address: createAddressSchema({ type: 'us' }),
});

// Validate data
const result = veteranInfoSchema.safeParse(formData);
if (result.success) {
  console.log(result.data);
} else {
  console.log(result.error.issues);
}
```

### Patterns

```typescript
import { patterns, SSN_PATTERN, PHONE_PATTERN } from '@formkit-gov/core';

// Use patterns directly
if (SSN_PATTERN.test(value)) {
  // Valid SSN format
}

// Access all patterns
console.log(patterns.zipCode);
console.log(patterns.email);
```

### Validators

```typescript
import { validateSSN, validatePhoneNumber, formatPhoneNumber, maskSSN } from '@formkit-gov/core';

// Validate
if (validateSSN('123-45-6789')) {
  // Valid SSN
}

// Format
const formatted = formatPhoneNumber('5551234567'); // (555) 123-4567

// Mask sensitive data
const masked = maskSSN('123-45-6789'); // ***-**-6789
```

### Utilities

```typescript
import { flattenZodErrors, validateWithSchema, createErrorMessages } from '@formkit-gov/core';

// Custom error messages
const errors = createErrorMessages({
  required: 'Please fill out this field',
});

// Validate and get flat errors
const result = validateWithSchema(schema, data);
if (!result.success) {
  const flatErrors = flattenZodErrors(result.errors);
  // { 'name.first': 'Name is required' }
}
```

## API Reference

### Schemas

| Function                             | Description                         |
| ------------------------------------ | ----------------------------------- |
| `createTextSchema(options)`          | Basic text input validation         |
| `createEmailSchema(options)`         | Email validation                    |
| `createPhoneSchema(options)`         | US/International phone validation   |
| `createSSNSchema(options)`           | Social Security Number validation   |
| `createDateSchema(options)`          | Date validation with min/max        |
| `createMemorableDateSchema(options)` | Separate month/day/year fields      |
| `createAddressSchema(options)`       | US/Military/International addresses |
| `createNameSchema(options)`          | Name validation                     |
| `createFullNameSchema(options)`      | First/middle/last/suffix            |
| `createCurrencySchema(options)`      | USD currency validation             |
| `createFileSchema(options)`          | File upload validation              |

### Validators

| Function                        | Description                    |
| ------------------------------- | ------------------------------ |
| `validateSSN(value)`            | Validates SSN format and rules |
| `validatePhoneNumber(value)`    | Validates US phone format      |
| `validateZipCode(value)`        | Validates ZIP code format      |
| `validateMinimumAge(date, age)` | Checks minimum age requirement |
| `formatPhoneNumber(value)`      | Formats to (XXX) XXX-XXXX      |
| `formatSSN(value)`              | Formats to XXX-XX-XXXX         |
| `maskSSN(value)`                | Returns \*\*\*-\*\*-XXXX       |

## License

MIT
