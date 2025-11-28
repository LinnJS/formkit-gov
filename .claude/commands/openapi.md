# OpenAPI Schema Generation

Generate Zod schemas and TypeScript types from OpenAPI specifications.

## Instructions

You are helping with OpenAPI to Zod schema generation.

### Overview

The @formkit-gov/openapi package generates:

- Zod schemas from OpenAPI 3.0/3.1 specs
- TypeScript types from schemas
- Validation utilities

### CLI Usage

````bash
# Generate from local file
formkit-openapi generate --input api.yaml --output src/generated

# Generate from URL
formkit-openapi generate --input https://api.example.com/openapi.json --output src/generated

# Watch mode
formkit-openapi generate --input api.yaml --output src/generated --watch
```text

### CLI Options

```text
Options:
  -i, --input <path>     OpenAPI spec file or URL (required)
  -o, --output <dir>     Output directory (required)
  -w, --watch            Watch for changes
  --no-types             Skip TypeScript type generation
  --no-schemas           Skip Zod schema generation
  --prefix <string>      Prefix for generated names
  --format               Format output with Prettier
  -h, --help             Show help
```text

### Generated Output

```text
src/generated/
├── index.ts           # Main exports
├── schemas.ts         # Zod schemas
├── types.ts           # TypeScript types
└── operations.ts      # API operation schemas
```text

### Example OpenAPI Input

```yaml
openapi: 3.1.0
info:
  title: Benefits API
  version: 1.0.0

components:
  schemas:
    Address:
      type: object
      required:
        - street
        - city
        - state
        - zipCode
      properties:
        street:
          type: string
          minLength: 1
          maxLength: 100
        city:
          type: string
          minLength: 1
        state:
          type: string
          pattern: "^[A-Z]{2}$"
        zipCode:
          type: string
          pattern: "^\\d{5}(-\\d{4})?$"
```text

### Generated Zod Schema

```typescript
import { z } from 'zod';

export const AddressSchema = z.object({
  street: z.string().min(1).max(100),
  city: z.string().min(1),
  state: z.string().regex(/^[A-Z]{2}$/),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/),
});

export type Address = z.infer<typeof AddressSchema>;
```text

### Programmatic Usage

```typescript
import { generateFromOpenAPI } from '@formkit-gov/openapi';

const result = await generateFromOpenAPI({
  input: 'path/to/openapi.yaml',
  output: 'src/generated',
  options: {
    generateTypes: true,
    generateSchemas: true,
    prefix: 'Api',
  },
});

console.log(`Generated ${result.schemas.length} schemas`);
```text

### Supported OpenAPI Features

- OpenAPI 3.0.x and 3.1.x
- JSON and YAML formats
- `$ref` references (local and remote)
- All primitive types
- Arrays and objects
- `oneOf`, `anyOf`, `allOf`
- `enum` values
- Format validations (email, uri, date, etc.)
- Min/max constraints
- Pattern validation
- Required fields
- Nullable types
- Default values

### Custom Extensions

```yaml
x-formkit:
  # Custom error message
  errorMessage: "Enter a valid email address"

  # Map to existing schema
  useSchema: "@formkit-gov/core#createEmailSchema"

  # Mark as sensitive (masks in review)
  sensitive: true
```text

### Integration with Forms

```typescript
import { AddressSchema } from './generated/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function AddressForm() {
  const form = useForm({
    resolver: zodResolver(AddressSchema),
  });

  // ...
}
```text

### Troubleshooting

#### Invalid OpenAPI Spec

```bash
# Validate spec first
formkit-openapi validate --input api.yaml
```text

#### Circular References

The generator handles circular refs by using `z.lazy()`:

```typescript
export const NodeSchema: z.ZodType<Node> = z.lazy(() =>
  z.object({
    value: z.string(),
    children: z.array(NodeSchema).optional(),
  })
);
```text

#### Missing Types

Ensure all `$ref` targets are defined in the spec.

## Arguments

$ARGUMENTS - OpenAPI task (e.g., "generate schemas from api.yaml" or "add custom extension support")
````
