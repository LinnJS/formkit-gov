# @formkit-gov/core

Framework-agnostic form primitives, Zod schemas, and validation utilities for government
applications.

## Installation

```bash
npm install @formkit-gov/core zod
```

## Quick Start

```typescript
import { createSSNSchema, createPhoneSchema, createFullNameSchema } from '@formkit-gov/core';
import { z } from 'zod';

const schema = z.object({
  name: createFullNameSchema(),
  ssn: createSSNSchema(),
  phone: createPhoneSchema(),
});

const result = schema.safeParse(formData);
```

## Documentation

For comprehensive documentation, examples, and API reference:

- [Full Documentation](https://docs.formkit-gov.org/docs/packages/core) - Complete API reference and
  examples
- [Validation Guide](https://docs.formkit-gov.org/docs/validation) - Schema options and patterns
- [Form Patterns](https://docs.formkit-gov.org/docs/patterns) - Common form implementations

## API Overview

### Schema Factories

| Function               | Description               |
| ---------------------- | ------------------------- |
| `createTextSchema`     | Text input validation     |
| `createEmailSchema`    | Email validation          |
| `createPhoneSchema`    | US/International phone    |
| `createSSNSchema`      | Social Security Number    |
| `createDateSchema`     | Date with min/max         |
| `createAddressSchema`  | US/Military/International |
| `createFullNameSchema` | First/middle/last/suffix  |
| `createCurrencySchema` | USD currency              |

### Validators

| Function              | Description              |
| --------------------- | ------------------------ |
| `validateSSN`         | SSN format validation    |
| `validatePhoneNumber` | Phone format validation  |
| `formatPhoneNumber`   | Format to (XXX) XXX-XXXX |
| `maskSSN`             | Mask to \*\*\*-\*\*-XXXX |

### Patterns

| Constant           | Format              |
| ------------------ | ------------------- |
| `SSN_PATTERN`      | ###-##-####         |
| `PHONE_PATTERN`    | (###) ###-####      |
| `ZIP_CODE_PATTERN` | ##### or #####-#### |

## License

MIT
