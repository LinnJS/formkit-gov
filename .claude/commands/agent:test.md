# Test Development Agent

Create comprehensive tests for FormKit Gov packages.

## Before Starting

think hard

**STOP - Ask clarifying questions before writing tests:**

1. **What are you testing?**
   - Zod schema (`packages/core`)
   - React component (`packages/react`)
   - Wizard functionality (`packages/wizard`)
   - State adapter (`packages/store`)
   - Validator utility (`packages/validators`)

2. **What type of tests are needed?**
   - Unit tests (isolated logic)
   - Integration tests (component interactions)
   - E2E tests (full user flows)

3. **What scenarios should be covered?**
   - Happy path (expected usage)
   - Error states (validation failures)
   - Edge cases (boundary conditions)
   - Accessibility (a11y compliance)

4. **Are there existing tests to reference?**
   - Check existing test patterns in the package

## Test File Conventions

| Package | Test Location                       | Pattern           |
| ------- | ----------------------------------- | ----------------- |
| core    | `packages/core/src/**/*.test.ts`    | `[name].test.ts`  |
| react   | `packages/react/src/**/*.test.tsx`  | `[name].test.tsx` |
| wizard  | `packages/wizard/src/**/*.test.tsx` | `[name].test.tsx` |

## Test Patterns

### Schema Tests (core)

```typescript
import { describe, it, expect } from 'vitest';
import { createSchemaName } from './schema-name';

describe('createSchemaName', () => {
  describe('valid inputs', () => {
    it.each([
      ['description', 'valid-value'],
      ['another case', 'another-value'],
    ])('accepts %s: %s', (_, value) => {
      const schema = createSchemaName();
      expect(schema.safeParse(value).success).toBe(true);
    });
  });

  describe('invalid inputs', () => {
    it.each([['description', 'invalid-value', 'Expected error']])(
      'rejects %s: %s',
      (_, value, expectedError) => {
        const schema = createSchemaName();
        const result = schema.safeParse(value);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toContain(expectedError);
        }
      }
    );
  });

  describe('options', () => {
    it('allows empty when not required', () => {
      const schema = createSchemaName({ required: false });
      expect(schema.safeParse('').success).toBe(true);
    });

    it('uses custom error messages', () => {
      const customMessage = 'Custom error';
      const schema = createSchemaName({
        messages: { invalid: customMessage },
      });
      const result = schema.safeParse('invalid');
      expect(result.error?.issues[0].message).toBe(customMessage);
    });
  });
});
```

### Component Tests (react)

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ComponentName } from './component-name';

describe('ComponentName', () => {
  it('renders with required props', () => {
    render(<ComponentName label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    render(<ComponentName label="Test" error="Error text" />);
    const element = screen.getByRole('textbox');
    expect(element).toHaveAttribute('error', 'Error text');
  });

  it('calls onChange handler', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ComponentName label="Test" onChange={onChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test value');

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<ComponentName label="Test" ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  describe('accessibility', () => {
    it('has accessible label', () => {
      render(<ComponentName label="Accessible Label" />);
      expect(screen.getByLabelText('Accessible Label')).toBeInTheDocument();
    });

    it('associates error with input', () => {
      render(<ComponentName label="Test" error="Error" />);
      // Check ARIA association
    });
  });
});
```

### Form Integration Tests

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField } from './form';
import { TextInputField } from './text-input-field';

const TestForm = ({ onSubmit }) => {
  const schema = z.object({ name: z.string().min(1) });
  const form = useForm({ resolver: zodResolver(schema) });

  return (
    <Form {...form} onSubmit={onSubmit}>
      <FormField
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <TextInputField
            {...field}
            label="Name"
            error={fieldState.error?.message}
          />
        )}
      />
      <button type="submit">Submit</button>
    </Form>
  );
};

describe('Form Integration', () => {
  it('submits valid data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TestForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Name'), 'John');
    await user.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ name: 'John' });
    });
  });

  it('shows validation errors', async () => {
    const user = userEvent.setup();
    render(<TestForm onSubmit={vi.fn()} />);

    await user.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText(/required/i)).toBeInTheDocument();
    });
  });
});
```

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter @formkit-gov/core test
pnpm --filter @formkit-gov/react test

# Run specific test file
pnpm --filter @formkit-gov/core test -- ssn.test.ts

# Run with coverage
pnpm test:coverage

# Run in watch mode
pnpm --filter @formkit-gov/core test -- --watch
```

## Test Checklist

- [ ] Happy path tested
- [ ] Error states tested
- [ ] Edge cases covered
- [ ] Options/configuration tested
- [ ] TypeScript types verified
- [ ] Accessibility assertions included
- [ ] Mock data is realistic
- [ ] Tests are isolated (no shared state)

## Output Format

````markdown
## Test Implementation

**Target:** [What was tested] **Package:** @formkit-gov/[package]

### Files Created

- `src/[path]/[name].test.ts` - Test suite

### Test Coverage

| Category       | Tests |
| -------------- | ----- |
| Valid inputs   | X     |
| Invalid inputs | X     |
| Options        | X     |
| Edge cases     | X     |

### Verification

```bash
pnpm --filter @formkit-gov/[package] test -- [name].test.ts
```
````

````markdown
## Example Usage

```bash
/agent:test "Write tests for SSN schema in core package"
```
````

```bash
/agent:test "Create component tests for TextInputField"
```

```bash
/agent:test "Add form integration tests for validation flow"
```

## Task

$ARGUMENTS
