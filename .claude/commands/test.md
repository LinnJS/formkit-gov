# Write Tests

Write comprehensive tests for a module in the FormKit Gov project.

## Instructions

You are writing tests following the project's testing strategy.

### Test Types

1. **Unit Tests** (for schemas, utilities, validators)
   - Location: `src/**/*.test.ts`
   - Tools: Vitest
   - Pattern: describe/it with AAA (Arrange-Act-Assert)

2. **Integration Tests** (for React components)
   - Location: `src/**/*.test.tsx`
   - Tools: Vitest + React Testing Library
   - Pattern: User-centric testing

3. **Accessibility Tests** (for components)
   - Include axe-core checks
   - Test keyboard navigation
   - Verify ARIA attributes

### Test Structure

```typescript
import { describe, it, expect, beforeEach } from 'vitest';

describe('[ModuleName]', () => {
  describe('[functionOrFeature]', () => {
    describe('valid inputs', () => {
      it('handles [specific case]', () => {
        // Arrange
        const input = '...';

        // Act
        const result = functionUnderTest(input);

        // Assert
        expect(result).toBe(expected);
      });
    });

    describe('invalid inputs', () => {
      it('rejects [specific case]', () => {
        // ...
      });
    });

    describe('edge cases', () => {
      it('handles empty input', () => {
        // ...
      });
    });
  });
});
```

### Component Test Structure

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect } from 'vitest';

expect.extend(toHaveNoViolations);

describe('[ComponentName]', () => {
  it('renders with label', () => {
    render(<Component label="Test" />);
    expect(screen.getByLabelText('Test')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Component label="Test" error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Component label="Test" />);

    await user.type(screen.getByLabelText('Test'), 'value');
    expect(screen.getByLabelText('Test')).toHaveValue('value');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Component label="Test" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Testing Library Query Priority

1. `getByRole` - accessible by role
2. `getByLabelText` - form elements
3. `getByText` - non-interactive elements
4. `getByTestId` - last resort

### Coverage Requirements

- Minimum 80% overall
- 100% for critical paths (validation logic, PII handling)
- All error paths tested
- Edge cases covered

### Run Tests

```bash
pnpm test                    # Run all tests
pnpm test:coverage           # With coverage
pnpm --filter @formkit-gov/core test  # Specific package
```

## Arguments

$ARGUMENTS - What to test (e.g., "packages/core/src/schemas/ssn.ts" or "TextInputField component")
