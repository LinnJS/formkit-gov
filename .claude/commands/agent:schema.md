# Schema Development Agent

Create Zod schema factories for the @formkit-gov/core package.

## Before Starting

think hard

**STOP - Ask clarifying questions before creating:**

1. **What data type does this schema validate?**
   - Personal identifier (SSN, EIN, etc.)
   - Date/time format
   - Contact information (phone, email)
   - Address data
   - Government-specific format

2. **What are the validation rules?**
   - Required format (regex pattern)
   - Length constraints
   - Character restrictions
   - Business rules (checksums, ranges)

3. **What are valid examples?**
   - Standard format
   - Alternative acceptable formats
   - Edge cases that should pass

4. **What are invalid examples?**
   - Common mistakes
   - Edge cases that should fail

5. **Is this similar to an existing schema?**
   - Check `packages/core/src/schemas/`
   - Reference patterns to follow

## Schema Development Process

### 1. Research Requirements

think

Gather information about:

- Official format specifications
- VA/government requirements
- Accessibility considerations
- User-friendly error messages

### 2. Design Schema Interface

megathink

Define the options interface:

```typescript
export interface [SchemaName]Options {
  /** Whether the field is required */
  required?: boolean;
  /** Accept flexible formats (with/without separators) */
  flexible?: boolean;
  /** Custom error messages */
  messages?: {
    required?: string;
    invalid?: string;
    [specific]?: string;
  };
}
```

### 3. Define Error Messages

think hard

Create user-friendly messages:

```typescript
const DEFAULT_MESSAGES = {
  required: '[Field name] is required',
  invalid: 'Enter a valid [field name] (like [example])',
};
```

Message guidelines:

- Be specific about what's wrong
- Include example of correct format
- Use plain language (no jargon)
- Consider screen reader users

### 4. Implement Schema Factory

megathink

```typescript
export function create[SchemaName]Schema(
  options: [SchemaName]Options = {}
) {
  const {
    required = true,
    flexible = false,
    messages = {},
  } = options;

  const msgs = { ...DEFAULT_MESSAGES, ...messages };

  let schema = z.string();

  if (required) {
    schema = schema.min(1, msgs.required);
  }

  // Add validation refinements
  schema = schema.refine(
    (value) => {
      if (!required && !value) return true;
      // Validation logic
      return PATTERN.test(value);
    },
    { message: msgs.invalid }
  );

  if (!required) {
    return schema.optional();
  }

  return schema;
}
```

### 5. Add Pattern (if needed)

If using regex, add to `packages/core/src/patterns/index.ts`:

```typescript
/**
 * Pattern for [description]
 * @example "123-45-6789"
 */
export const [NAME]_PATTERN = /^...$/;
```

### 6. Write Tests

think hard

Create comprehensive tests:

```typescript
describe('create[SchemaName]Schema', () => {
  describe('valid inputs', () => {
    it.each([
      ['standard format', '123-45-6789'],
      ['flexible format', '123456789'],
    ])('accepts %s: %s', (_, value) => {
      const schema = create[SchemaName]Schema();
      expect(schema.safeParse(value).success).toBe(true);
    });
  });

  describe('invalid inputs', () => {
    it.each([
      ['too short', '123'],
      ['invalid characters', 'abc-de-fghi'],
    ])('rejects %s: %s', (_, value) => {
      const schema = create[SchemaName]Schema();
      expect(schema.safeParse(value).success).toBe(false);
    });
  });

  describe('options', () => {
    it('allows empty when not required');
    it('uses custom error messages');
    it('accepts flexible formats when enabled');
  });
});
```

### 7. Export Schema

Add to `packages/core/src/schemas/index.ts`:

```typescript
export * from './[schema-name]';
```

## File Locations

| Type     | Location                                   |
| -------- | ------------------------------------------ |
| Schema   | `packages/core/src/schemas/[name].ts`      |
| Tests    | `packages/core/src/schemas/[name].test.ts` |
| Patterns | `packages/core/src/patterns/index.ts`      |
| Index    | `packages/core/src/schemas/index.ts`       |

## Verification

```bash
pnpm --filter @formkit-gov/core test -- [name].test.ts
pnpm --filter @formkit-gov/core typecheck
pnpm --filter @formkit-gov/core lint
```

## Output Format

````markdown
## Schema Implementation

**Schema:** create[SchemaName]Schema **Package:** @formkit-gov/core

### Files Created

- `src/schemas/[name].ts` - Schema factory
- `src/schemas/[name].test.ts` - Test suite

### Validation Rules

1. [Rule 1]
2. [Rule 2]

### Usage

```typescript
import { create[SchemaName]Schema } from '@formkit-gov/core';

const schema = create[SchemaName]Schema();
schema.parse('valid-value');
```
````

````markdown
## Example Usage

```bash
/agent:schema "Create phone number schema with US format validation"
```
````

```bash
/agent:schema "Create EIN (Employer Identification Number) schema XX-XXXXXXX"
```

```bash
/agent:schema "Create military service number schema for VA forms"
```

## Task

$ARGUMENTS
