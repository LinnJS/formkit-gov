# Create Schema

Create a new Zod schema factory for the @formkit-gov/core package.

## Instructions

You are creating a new Zod schema factory that provides validation for a specific data type used in
government forms.

### Steps

1. **Create the Schema File** Location: `packages/core/src/schemas/[schema-name].ts`

   Structure:

   ````typescript
   import { z } from 'zod';

   export interface [SchemaName]Options {
     required?: boolean;
     messages?: {
       required?: string;
       invalid?: string;
       // ... other messages
     };
   }

   const DEFAULT_MESSAGES = {
     required: 'This field is required',
     invalid: 'Enter a valid [type]',
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
   export function create[SchemaName]Schema(options: [SchemaName]Options = {}) {
     const {
       required = true,
       messages = {},
     } = options;

     const msgs = { ...DEFAULT_MESSAGES, ...messages };

     let schema = z.string()
       // Add validations...

     if (!required) {
       schema = schema.optional();
     }

     return schema;
   }
   ````

2. **Add Pattern (if needed)** If the schema uses a regex pattern, add it to
   `packages/core/src/patterns/index.ts`

3. **Create Tests** Location: `packages/core/src/schemas/[schema-name].test.ts`

   Include tests for:
   - Valid inputs (multiple formats if applicable)
   - Invalid inputs (edge cases)
   - Required vs optional behavior
   - Custom error messages
   - Edge cases (empty, null, undefined)

4. **Export from Index** Add exports to:
   - `packages/core/src/schemas/index.ts`
   - `packages/core/src/index.ts`

### Schema Requirements

- Use descriptive, user-friendly error messages
- Include examples in JSDoc
- Support custom error messages
- Handle required/optional properly
- Consider government form requirements (PII handling, specific formats)

### Error Message Guidelines

- Be specific about what's wrong
- Include examples of correct format
- Use plain language (no technical jargon)
- Example: "Enter a valid Social Security number (like 123-45-6789)"

## Arguments

$ARGUMENTS - Schema name and what it validates (e.g., "EIN - Employer Identification Number
validation")
