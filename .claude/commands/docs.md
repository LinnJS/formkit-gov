# Documentation

Create or update documentation for the FormKit Gov project.

## Instructions

You are creating documentation following the project's documentation standards.

### Documentation Types

1. **Package README**
   - Location: `packages/[name]/README.md`
   - Include: Description, installation, usage, API reference

2. **JSDoc Comments**
   - Location: In source files
   - Required for all public APIs

3. **Storybook Stories**
   - Location: `packages/react/src/components/[name].stories.tsx`
   - Show all component states and variants

4. **Internal Docs**
   - Location: `docs/`
   - Architecture decisions, roadmap, guidelines

### Package README Structure

```markdown
# @formkit-gov/[name]

Brief description of the package purpose.

## Installation

\`\`\`bash pnpm add @formkit-gov/[name] \`\`\`

## Quick Start

\`\`\`typescript import { something } from '@formkit-gov/[name]';

// Basic usage example \`\`\`

## Features

- Feature 1
- Feature 2

## API Reference

### functionName

Description of what it does.

**Parameters:**

| Name   | Type      | Default | Description          |
| ------ | --------- | ------- | -------------------- |
| param1 | `string`  | -       | What this param does |
| param2 | `boolean` | `false` | What this param does |

**Returns:** `ReturnType` - Description

**Example:**

\`\`\`typescript const result = functionName('value'); \`\`\`

## Related Packages

- [@formkit-gov/core](../core)
- [@formkit-gov/react](../react)

## License

MIT
```

### JSDoc Structure

````typescript
/**
 * Brief description of what this does
 *
 * @param options - Configuration options
 * @param options.required - Whether the field is required
 * @param options.messages - Custom error messages
 * @returns Zod schema for validation
 *
 * @example
 * ```ts
 * const schema = createSchema({ required: true });
 * schema.parse('value'); // passes
 * ```
 *
 * @see {@link relatedFunction} for related functionality
 */
````

### Storybook Story Structure

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './component-name';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    // Define controls
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    label: 'Label',
  },
};

export const WithError: Story = {
  args: {
    label: 'Label',
    error: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Label',
    disabled: true,
  },
};
```

### Documentation Guidelines

- Use clear, concise language
- Include working code examples
- Show common use cases
- Document edge cases and gotchas
- Keep examples focused and minimal
- Update when API changes

## Arguments

$ARGUMENTS - What to document (e.g., "createSSNSchema function" or "TextInputField component
README")
