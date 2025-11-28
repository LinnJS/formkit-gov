# Team: Component Development

Orchestrate a multi-agent workflow to create a new React component with full test coverage and
documentation.

## Task

$ARGUMENTS

## Workflow

Execute this component development workflow with specialized agents for each phase.

### Phase 1: Research VA Design System

think hard

Spawn an agent to research the VA Design System component:

- Fetch VA DS documentation for the component
- Identify all props, events, and slots
- Note accessibility requirements
- Find usage examples
- Check for any known issues or limitations

Sources to check:

- <https://design.va.gov/components/>
- VA component library source code
- Existing similar components in this repo

### Phase 2: Design Component API

ultrathink

Spawn a **Plan agent** to design the React component API:

- Define props interface (`[ComponentName]Props`)
- Plan React Hook Form integration
- Design error handling approach
- Consider ref forwarding needs
- Plan controlled vs uncontrolled modes
- Evaluate accessibility requirements
- Consider edge cases and error states

Present API design for approval.

### Phase 3: Implement Component

megathink

Create the component at `packages/react/src/components/[name].tsx`:

```typescript
import * as React from 'react';

export interface [ComponentName]Props {
  // Props from design phase
}

export const [ComponentName] = React.forwardRef<
  HTML[Element]Element,
  [ComponentName]Props
>(({ ...props }, ref) => {
  // Implementation
});

[ComponentName].displayName = '[ComponentName]';
```

Follow patterns from existing components in the codebase.

### Phase 4: Write Tests

think hard

Create tests at `packages/react/src/components/[name].test.tsx`:

**Required test cases:**

- Renders with required props
- Renders with label
- Shows error state
- Handles user input
- Integrates with form context
- Forwards ref correctly
- Has no accessibility violations (axe)
- Keyboard navigation works

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('[ComponentName]', () => {
  // Tests
});
```

### Phase 5: Create Storybook Stories

think

Create stories at `packages/react/src/components/[name].stories.tsx`:

**Required stories:**

- Default
- WithError
- Disabled
- Required
- WithHint
- AllVariants (if applicable)

```typescript
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/[ComponentName]',
  component: ComponentName,
  tags: ['autodocs'],
};

export default meta;
```

### Phase 6: Accessibility Audit

megathink

Run accessibility checks:

- Verify axe tests pass
- Check ARIA attributes are correct
- Test keyboard navigation manually
- Verify error association with aria-describedby

### Phase 7: Export and Document

think

1. Add export to `packages/react/src/index.ts`
2. Add JSDoc comments with @example
3. Update package README if needed

### Phase 8: Final Verification

```bash
# Run all checks
pnpm --filter @formkit-gov/react lint
pnpm --filter @formkit-gov/react typecheck
pnpm --filter @formkit-gov/react test
pnpm --filter @formkit-gov/react build
```

## Output

Provide:

1. **Component API** - Final props interface
2. **Files Created** - List of new files
3. **Test Coverage** - Test results
4. **Accessibility** - A11y audit results
5. **Usage Example** - How to use the component

## Example Usage

```text
/team-component Create TextareaField wrapping va-textarea
```

```text
/team-component Create CheckboxGroupField for multiple checkbox selection
```

```text
/team-component Create MemorableDateField with month/day/year dropdowns
```
