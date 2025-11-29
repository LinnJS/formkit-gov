# Testing Strategy

Comprehensive testing approach for FormKit Gov packages.

## Testing Pyramid

```text
         /\
        /  \
       / E2E \        <- Few, critical user flows
      /------\
     /        \
    / Integration \   <- Component behavior
   /--------------\
  /                \
 /      Unit        \  <- Schema validation, utilities
/--------------------\
```

## Test Types

### Unit Tests

**Purpose**: Test individual functions and schemas in isolation.

**Tools**: Vitest

**Location**: `src/**/*.test.ts`

**What to Test**:

- Schema validation (valid/invalid inputs)
- Utility functions
- Pattern matching
- Error messages
- Edge cases

**Example**:

```typescript
import { describe, it, expect } from 'vitest';
import { createSSNSchema } from './ssn';

describe('createSSNSchema', () => {
  const schema = createSSNSchema();

  it('validates correct SSN format', () => {
    expect(schema.safeParse('123-45-6789').success).toBe(true);
  });

  it('rejects invalid SSN format', () => {
    const result = schema.safeParse('invalid');
    expect(result.success).toBe(false);
  });

  it('provides user-friendly error message', () => {
    const result = schema.safeParse('invalid');
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Social Security');
    }
  });
});
```

### Integration Tests

**Purpose**: Test React components with user interactions.

**Tools**: Vitest + React Testing Library

**Location**: `src/**/*.test.tsx`

**What to Test**:

- Component rendering
- User interactions
- Form state changes
- Error display
- Accessibility

**Example**:

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

describe('TextInputField', () => {
  it('renders with label', () => {
    render(<TestForm />);
    expect(screen.getByLabelText('First name')).toBeInTheDocument();
  });

  it('shows error on invalid input', async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    const input = screen.getByLabelText('Email');
    await user.type(input, 'invalid');
    await user.tab();

    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
  });

  it('updates form state', async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    const input = screen.getByLabelText('First name');
    await user.type(input, 'John');

    expect(input).toHaveValue('John');
  });
});
```

### Accessibility Tests

**Purpose**: Ensure WCAG 2.1 AA compliance.

**Tools**: axe-core via @axe-core/react or jest-axe

**What to Test**:

- No accessibility violations
- Proper ARIA attributes
- Keyboard navigation
- Focus management
- Color contrast

**Example**:

```typescript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('TextInputField Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<TextInputField label="Name" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper aria-invalid on error', () => {
    render(<TextInputField label="Name" error="Required" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('associates error with input', () => {
    render(<TextInputField label="Name" error="Required" />);
    const input = screen.getByRole('textbox');
    const errorId = input.getAttribute('aria-describedby');
    expect(document.getElementById(errorId!)).toHaveTextContent('Required');
  });
});
```

### E2E Tests

**Purpose**: Test complete user flows in real browser.

**Tools**: Playwright

**Location**: `e2e/**/*.spec.ts`

**What to Test**:

- Multi-step form completion
- Save and resume
- Form submission
- Navigation flows
- Cross-browser compatibility

**Example**:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Multi-Step Form', () => {
  test('completes full form flow', async ({ page }) => {
    await page.goto('/apply');

    // Step 1
    await page.fill('[name="firstName"]', 'John');
    await page.fill('[name="lastName"]', 'Doe');
    await page.click('button:has-text("Continue")');

    // Step 2
    await expect(page.locator('h2')).toContainText('Contact');
    await page.fill('[name="email"]', 'john@example.com');
    await page.click('button:has-text("Continue")');

    // Review
    await expect(page.locator('h2')).toContainText('Review');
    await expect(page.locator('[data-field="firstName"]')).toContainText('John');

    // Submit
    await page.click('button:has-text("Submit")');
    await expect(page.locator('h1')).toContainText('Submitted');
  });

  test('saves progress on page reload', async ({ page }) => {
    await page.goto('/apply');
    await page.fill('[name="firstName"]', 'John');

    await page.reload();

    await expect(page.locator('[name="firstName"]')).toHaveValue('John');
  });
});
```

### Visual Regression Tests

**Purpose**: Catch unintended visual changes.

**Tools**: Chromatic (with Storybook)

**What to Test**:

- Component appearance
- Different states (hover, focus, error)
- Responsive layouts
- Theme consistency

**Setup**:

Visual tests run automatically on Storybook stories via Chromatic CI.

## Test Configuration

### Vitest Config

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['**/*.test.{ts,tsx}', 'dist/**'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
```

### Test Setup

```typescript
// src/test-setup.ts
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
```

## Coverage Requirements

### Minimum Coverage

| Package    | Lines | Branches | Functions |
| ---------- | ----- | -------- | --------- |
| core       | 90%   | 85%      | 90%       |
| react      | 80%   | 75%      | 80%       |
| store      | 85%   | 80%      | 85%       |
| wizard     | 80%   | 75%      | 80%       |
| openapi    | 85%   | 80%      | 85%       |
| validators | 90%   | 85%      | 90%       |
| test-utils | 70%   | 65%      | 70%       |

### Critical Paths

100% coverage required for:

- Schema validation logic
- SSN/sensitive data handling
- Error message generation
- Accessibility attributes

## Running Tests

### All Tests

```bash
pnpm test
```

### With Coverage

```bash
pnpm test:coverage
```

### Watch Mode

```bash
pnpm test:watch
```

### Specific Package

```bash
pnpm --filter @formkit-gov/core test
```

### E2E Tests

```bash
pnpm e2e
```

## CI Integration

### Test Workflow

```yaml
test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: pnpm/action-setup@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: 'pnpm'
    - run: pnpm install
    - run: pnpm test:coverage
    - uses: codecov/codecov-action@v4
```

### Required Checks

- All unit tests pass
- All integration tests pass
- Coverage thresholds met
- No accessibility violations
- E2E tests pass (on main)

## Best Practices

### Test Naming

```typescript
// Describe what, test specific behavior
describe('createSSNSchema', () => {
  describe('valid inputs', () => {
    it('accepts SSN with dashes', () => {});
    it('accepts SSN with spaces', () => {});
  });

  describe('invalid inputs', () => {
    it('rejects SSN without dashes', () => {});
    it('rejects SSN with letters', () => {});
  });
});
```

### Arrange-Act-Assert

```typescript
it('shows error when validation fails', async () => {
  // Arrange
  const user = userEvent.setup();
  render(<TextInputField label="Email" />);

  // Act
  await user.type(screen.getByLabelText('Email'), 'invalid');
  await user.tab();

  // Assert
  expect(screen.getByText(/valid email/i)).toBeInTheDocument();
});
```

### Avoid Implementation Details

```typescript
// Bad - tests implementation
expect(wrapper.state('isValid')).toBe(false);

// Good - tests behavior
expect(screen.getByText('Invalid email')).toBeInTheDocument();
```

### Use Testing Library Queries

Priority order:

1. `getByRole` - accessible by role
2. `getByLabelText` - form elements
3. `getByText` - non-interactive elements
4. `getByTestId` - last resort

```typescript
// Best - accessible query
screen.getByRole('textbox', { name: 'Email' });

// Good - label association
screen.getByLabelText('Email');

// Avoid - implementation detail
screen.getByTestId('email-input');
```
