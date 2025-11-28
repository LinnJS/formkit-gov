# Team: Schema Development

Orchestrate a multi-agent workflow to create a new Zod schema with full validation and
documentation.

## Task

$ARGUMENTS

## Workflow

Execute this schema development workflow with specialized agents for each phase.

### Phase 1: Research Requirements

Spawn an **Explore agent** to research:

- Government form requirements for this data type
- Existing validation patterns in the codebase
- Similar schema implementations to reference
- Edge cases and special formats

Sources to check:

- VA form specifications
- IRS/SSA format requirements (if applicable)
- Existing patterns in `packages/core/src/patterns/`
- Similar schemas in `packages/core/src/schemas/`

### Phase 2: Define Validation Rules

ultrathink

Spawn a **Plan agent** to document all validation rules comprehensively:

```markdown
## [SchemaName] Validation Rules

**Format**: [Expected format, e.g., XXX-XX-XXXX]

**Rules**:

1. [Rule 1 - e.g., Must be 9 digits]
2. [Rule 2 - e.g., Cannot start with 9 (reserved for ITIN)]
3. [Rule 3 - e.g., Cannot be all zeros in any group]

**Valid Examples**:

- 123-45-6789
- 123 45 6789

**Invalid Examples**:

- 123456789 (no separators)
- 000-12-3456 (invalid area number)

**Edge Cases**:

- [Edge case 1]
- [Edge case 2]
```

### Phase 3: Create Pattern (if needed)

think

If the schema uses regex, add pattern to `packages/core/src/patterns/index.ts`:

```typescript
/**
 * Pattern for [description]
 * Matches: [what it matches]
 * Groups: [capture groups if any]
 */
export const [NAME]_PATTERN = /^...$/;
```

### Phase 4: Implement Schema

megathink

Create schema at `packages/core/src/schemas/[name].ts`:

````typescript
import { z } from 'zod';
import { [PATTERN] } from '../patterns';

export interface [SchemaName]Options {
  required?: boolean;
  flexible?: boolean;
  messages?: {
    required?: string;
    invalid?: string;
  };
}

const DEFAULT_MESSAGES = {
  required: '[User-friendly required message]',
  invalid: '[User-friendly invalid message with example]',
};

/**
 * Creates a [description] schema
 *
 * @param options - Configuration options
 * @returns Zod schema for [type] validation
 *
 * @example
 * ```ts
 * const schema = create[SchemaName]Schema();
 * schema.parse('valid-value'); // passes
 * ```
 */
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

  schema = schema.refine(
    (value) => {
      // Validation logic
    },
    { message: msgs.invalid }
  );

  if (!required) {
    return schema.optional();
  }

  return schema;
}
````

### Phase 5: Write Comprehensive Tests

think hard

Create tests at `packages/core/src/schemas/[name].test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { create[SchemaName]Schema } from './[name]';

describe('create[SchemaName]Schema', () => {
  describe('valid inputs', () => {
    it.each([
      ['format 1', 'valid-value-1'],
      ['format 2', 'valid-value-2'],
    ])('accepts %s: %s', (_, value) => {
      const schema = create[SchemaName]Schema();
      expect(schema.safeParse(value).success).toBe(true);
    });
  });

  describe('invalid inputs', () => {
    it.each([
      ['reason 1', 'invalid-1'],
      ['reason 2', 'invalid-2'],
    ])('rejects %s: %s', (_, value) => {
      const schema = create[SchemaName]Schema();
      expect(schema.safeParse(value).success).toBe(false);
    });
  });

  describe('options', () => {
    it('allows empty when not required', () => {
      const schema = create[SchemaName]Schema({ required: false });
      expect(schema.safeParse('').success).toBe(true);
    });

    it('uses custom error messages', () => {
      const schema = create[SchemaName]Schema({
        messages: { invalid: 'Custom message' },
      });
      const result = schema.safeParse('invalid');
      expect(result.error?.issues[0].message).toBe('Custom message');
    });
  });

  describe('edge cases', () => {
    // Edge case tests
  });
});
```

### Phase 6: Add Validator Utility (if needed)

think

If there's a common validation use case, add utility to `packages/core/src/validators/index.ts`:

```typescript
/**
 * Validates a [type] value
 */
export function validate[Type](value: string): boolean {
  return [PATTERN].test(value);
}

/**
 * Formats a [type] value
 */
export function format[Type](value: string): string {
  // Formatting logic
}
```

### Phase 7: Export and Document

1. Add exports to `packages/core/src/schemas/index.ts`
2. Add exports to `packages/core/src/index.ts`
3. Ensure JSDoc is complete with @example

### Phase 8: Verify

```bash
pnpm --filter @formkit-gov/core lint
pnpm --filter @formkit-gov/core typecheck
pnpm --filter @formkit-gov/core test
pnpm --filter @formkit-gov/core build
```

## Output

Provide:

```markdown
## Schema Implementation Summary

**Schema**: create[SchemaName]Schema **Package**: @formkit-gov/core

### Validation Rules

[List of rules implemented]

### Files Created/Modified

- `src/schemas/[name].ts` - Schema implementation
- `src/schemas/[name].test.ts` - Test suite
- `src/patterns/index.ts` - Pattern added (if applicable)
- `src/validators/index.ts` - Utility added (if applicable)

### Test Coverage

- X valid input tests
- X invalid input tests
- X option tests
- X edge case tests

### Usage Example

\`\`\`typescript import { create[SchemaName]Schema } from '@formkit-gov/core';

const schema = create[SchemaName]Schema(); schema.parse('value'); \`\`\`
```

## Example Usage

```text
/team-schema Create EIN (Employer Identification Number) schema with format XX-XXXXXXX
```

```text
/team-schema Create military service number schema for VA forms
```

```text
/team-schema Create VA file number schema (C-number format)
```
