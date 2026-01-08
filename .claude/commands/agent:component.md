# Component Development Agent

Create React components wrapping VA Design System web components.

## Before Starting

think hard

**STOP - Ask clarifying questions before creating:**

1. **What VA DS component are you wrapping?**
   - `va-text-input`
   - `va-select`
   - `va-checkbox`
   - `va-radio`
   - `va-date`
   - `va-textarea`
   - Other: specify

2. **What is the component's purpose?**
   - Form field input
   - Display/layout
   - Navigation
   - Feedback (alerts, modals)

3. **What props should be supported?**
   - Required props
   - Optional props
   - Event handlers
   - Ref forwarding needs

4. **How does it integrate with React Hook Form?**
   - Controlled component
   - Field component wrapper
   - Custom integration

5. **Are there similar components to reference?**
   - Check `packages/react/src/components/`

## Component Development Process

### 1. Research VA DS Component

think

Review the VA DS component:

- Props and attributes supported
- Events emitted
- Accessibility features
- Slot content areas

### 2. Define TypeScript Interface

megathink

Create props interface:

```typescript
import type { JSX } from 'react';

type VAComponentAttributes = JSX.IntrinsicElements['va-[component]'];

export interface [ComponentName]Props
  extends Omit<VAComponentAttributes, 'ref'> {
  /** Field label text */
  label: string;
  /** Error message to display */
  error?: string;
  /** Hint text below the field */
  hint?: string;
  /** Additional custom props */
  [propName]?: [type];
}
```

### 3. Implement Component

think hard

````typescript
import * as React from 'react';
import type { [ComponentName]Props } from './types';

/**
 * [Description of component]
 *
 * Wraps the VA Design System va-[component] web component.
 *
 * @example
 * ```tsx
 * <[ComponentName]
 *   label="Field label"
 *   name="fieldName"
 *   value={value}
 *   onInput={handleInput}
 * />
 * ```
 */
export const [ComponentName] = React.forwardRef<
  HTML[VAElement]Element,
  [ComponentName]Props
>(({ label, error, hint, ...props }, ref) => {
  return (
    <va-[component]
      ref={ref}
      label={label}
      error={error}
      hint={hint}
      {...props}
    />
  );
});

[ComponentName].displayName = '[ComponentName]';
````

### 4. Create Field Wrapper (for forms)

megathink

If this is a form field, create a field wrapper:

```typescript
import * as React from 'react';
import { useController, type UseControllerProps } from 'react-hook-form';
import { [ComponentName] } from './[component-name]';

export interface [ComponentName]FieldProps
  extends Omit<[ComponentName]Props, 'value' | 'error'>,
    UseControllerProps {
  // Additional field-specific props
}

export function [ComponentName]Field({
  name,
  control,
  rules,
  defaultValue,
  ...props
}: [ComponentName]FieldProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue });

  return (
    <[ComponentName]
      {...props}
      {...field}
      error={error?.message}
    />
  );
}
```

### 5. Write Tests

think hard

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { [ComponentName] } from './[component-name]';

describe('[ComponentName]', () => {
  it('renders with label', () => {
    render(<[ComponentName] label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<[ComponentName] label="Test" error="Error message" />);
    // Assert error is displayed
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTML[VAElement]Element>();
    render(<[ComponentName] label="Test" ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles user input', async () => {
    const onInput = vi.fn();
    render(<[ComponentName] label="Test" onInput={onInput} />);
    // Simulate user interaction
  });
});
```

### 6. Add Storybook Story

think

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { [ComponentName] } from './[component-name]';

const meta: Meta<typeof [ComponentName]> = {
  title: 'Components/Fields/[ComponentName]',
  component: [ComponentName],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof [ComponentName]>;

export const Default: Story = {
  args: {
    label: 'Field Label',
    name: 'fieldName',
  },
};

export const WithError: Story = {
  args: {
    label: 'Field Label',
    name: 'fieldName',
    error: 'This field has an error',
  },
};

export const Required: Story = {
  args: {
    label: 'Field Label',
    name: 'fieldName',
    required: true,
  },
};
```

### 7. Export Component

Add to `packages/react/src/components/index.ts`:

```typescript
export * from './[component-name]';
```

## File Locations

| Type      | Location                                               |
| --------- | ------------------------------------------------------ |
| Component | `packages/react/src/components/fields/[name].tsx`      |
| Types     | `packages/react/src/components/fields/[name].types.ts` |
| Tests     | `packages/react/src/components/fields/[name].test.tsx` |
| Stories   | `apps/storybook/src/stories/[Name].stories.tsx`        |

## Verification

```bash
pnpm --filter @formkit-gov/react test -- [name].test.tsx
pnpm --filter @formkit-gov/react typecheck
pnpm --filter storybook dev  # View in Storybook
```

## Output Format

````markdown
## Component Implementation

**Component:** [ComponentName] **Package:** @formkit-gov/react **VA DS Component:** va-[component]

### Files Created

- `src/components/fields/[name].tsx` - Component
- `src/components/fields/[name].test.tsx` - Tests
- (Storybook) `[Name].stories.tsx` - Stories

### Props

| Prop  | Type   | Required | Description   |
| ----- | ------ | -------- | ------------- |
| label | string | Yes      | Field label   |
| error | string | No       | Error message |

### Usage

```tsx
import { [ComponentName] } from '@formkit-gov/react';

<[ComponentName] label="Label" name="field" />
```
````

````markdown
## Example Usage

```bash
/agent:component "Create TextInputField wrapping va-text-input"
```
````

```bash
/agent:component "Create SelectField wrapping va-select with options"
```

```bash
/agent:component "Create DateField wrapping va-date with month/day/year"
```

## Task

$ARGUMENTS
