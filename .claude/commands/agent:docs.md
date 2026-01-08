# Documentation Agent

Create and update documentation for FormKit Gov.

## Before Starting

think

**STOP - Ask clarifying questions:**

1. **What type of documentation?**
   - API documentation (JSDoc)
   - README updates
   - Storybook stories
   - Usage examples
   - Architecture docs

2. **What is being documented?**
   - New schema
   - New component
   - New package
   - Feature update
   - Breaking change

3. **Who is the audience?**
   - Developers using the library
   - Contributors to the project
   - Government form developers

4. **Are there existing docs to update?**
   - Check package README
   - Check Storybook
   - Check docs site

## Documentation Types

### JSDoc (API Documentation)

````typescript
/**
 * Creates a Social Security Number validation schema
 *
 * Validates SSN format with optional flexibility for separator styles.
 * Follows SSA format requirements and excludes invalid patterns.
 *
 * @param options - Configuration options
 * @param options.required - Whether the field is required (default: true)
 * @param options.flexible - Accept formats with/without separators (default: false)
 * @param options.messages - Custom error messages
 * @returns Zod schema for SSN validation
 *
 * @example Basic usage
 * ```ts
 * const schema = createSSNSchema();
 * schema.parse('123-45-6789'); // Valid
 * schema.parse('000-00-0000'); // Throws - invalid area number
 * ```
 *
 * @example Optional field
 * ```ts
 * const schema = createSSNSchema({ required: false });
 * schema.parse(''); // Valid
 * ```
 *
 * @example Custom messages
 * ```ts
 * const schema = createSSNSchema({
 *   messages: { invalid: 'Please enter a valid SSN' }
 * });
 * ```
 *
 * @see {@link https://www.ssa.gov/employer/randomization.html} SSA Randomization
 */
export function createSSNSchema(options?: SSNSchemaOptions): ZodSchema;
````

### Package README

````markdown
# @formkit-gov/[package]

[Brief description]

## Installation

```bash
pnpm add @formkit-gov/[package]
```
````

## Quick Start

```typescript
import { feature } from '@formkit-gov/[package]';

// Basic usage example
```

## Features

- Feature 1
- Feature 2

## API Reference

### `functionName(options)`

Description of the function.

**Parameters:**

| Name    | Type    | Default | Description |
| ------- | ------- | ------- | ----------- |
| option1 | string  | -       | Description |
| option2 | boolean | true    | Description |

**Returns:** `ReturnType`

**Example:**

```typescript
// Usage example
```

## License

MIT

````markdown
### Storybook Story

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '@formkit-gov/react';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/[Category]/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Description of the component and its purpose.',
      },
    },
  },
  argTypes: {
    label: {
      description: 'The field label text',
      control: 'text',
    },
    error: {
      description: 'Error message to display',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

/**
 * The default state of the component.
 */
export const Default: Story = {
  args: {
    label: 'Field Label',
    name: 'fieldName',
  },
};

/**
 * Component displaying an error state.
 */
export const WithError: Story = {
  args: {
    label: 'Field Label',
    name: 'fieldName',
    error: 'This field has an error',
  },
};

/**
 * Required field with asterisk indicator.
 */
export const Required: Story = {
  args: {
    label: 'Field Label',
    name: 'fieldName',
    required: true,
  },
};
```
````

## Documentation Locations

| Type           | Location                      |
| -------------- | ----------------------------- |
| JSDoc          | Inline with code              |
| Package README | `packages/[pkg]/README.md`    |
| Storybook      | `apps/storybook/src/stories/` |
| Docs site      | `apps/docs/`                  |
| Architecture   | `docs/ARCHITECTURE.md`        |

## Writing Guidelines

### JSDoc

- Start with a brief one-line summary
- Add detailed description if needed
- Document all parameters with `@param`
- Include `@returns` description
- Add `@example` with realistic code
- Link to external references with `@see`

### README

- Lead with value proposition
- Quick start should be copy-pasteable
- Include all installation steps
- Show common use cases
- Link to detailed API docs

### Storybook

- One story per meaningful state
- Use descriptive story names
- Add JSDoc comments for story descriptions
- Include interactive controls
- Show accessibility features

## Output Format

```markdown
## Documentation Created

**Type:** [JSDoc/README/Storybook/etc.] **Target:** [What was documented]

### Files Created/Modified

- `path/to/file.ts` - Added JSDoc
- `packages/[pkg]/README.md` - Updated
- `apps/storybook/src/stories/[Name].stories.tsx` - Created

### Documentation Summary

[Brief summary of what was documented]

### Preview

[Link to view documentation or snippet preview]
```

## Example Usage

```bash
/agent:docs "Add JSDoc to createSSNSchema function"
```

```bash
/agent:docs "Create Storybook stories for TextInputField"
```

```bash
/agent:docs "Update react package README with new components"
```

## Task

$ARGUMENTS
