# Team: Component Development

Orchestrate a multi-agent workflow to create a complete React component with VA DS integration,
tests, and documentation.

## Team Composition

| Phase | Agent             | Responsibility             |
| ----- | ----------------- | -------------------------- |
| 1     | `agent:explore`   | Research VA DS component   |
| 2     | Plan              | Design component API       |
| 3     | `agent:component` | Implement component        |
| 4     | `agent:test`      | Unit and integration tests |
| 5     | `agent:a11y`      | Accessibility verification |
| 6     | `agent:docs`      | Storybook and JSDoc        |
| 7     | `agent:review`    | Quality check              |

## Before Starting

ultrathink

**STOP - This team will ask clarifying questions before proceeding:**

1. **What VA DS component are you wrapping?**
   - `va-text-input`
   - `va-select`
   - `va-checkbox`
   - `va-radio`
   - `va-date`
   - `va-textarea`
   - `va-button`
   - Other (specify)

2. **What is the component's purpose?**
   - Form field input
   - Form field wrapper (with React Hook Form)
   - Display component
   - Layout component

3. **What props should be supported?**
   - Required props
   - Optional props
   - Event handlers needed
   - Ref forwarding requirements

4. **How should it integrate with forms?**
   - Standalone component
   - FormField integration
   - Both

5. **Are there similar components to reference?**

## Workflow

### Phase 1: Research (agent:explore)

think hard

Spawn an **Explore agent** to:

- Review VA DS component documentation
- Find existing component patterns in react package
- Identify integration requirements
- Check accessibility features

```bash
/agent:explore "Research va-[component] and existing wrapper patterns"
```

### Phase 2: Design Component API

megathink

Design the component interface:

```typescript
// Props interface
interface [ComponentName]Props {
  label: string;
  name: string;
  error?: string;
  // ...additional props
}

// Field wrapper props (if applicable)
interface [ComponentName]FieldProps extends UseControllerProps {
  // Form-integrated props
}
```

**Checkpoint**: Present component API for approval.

### Phase 3: Implementation (agent:component)

think hard

Spawn a **Component agent** to implement:

```bash
/agent:component "Create [ComponentName] wrapping va-[component]"
```

Implementation includes:

- Base component with ref forwarding
- Field wrapper (if form integration needed)
- TypeScript types
- displayName

### Phase 4: Testing (agent:test)

think hard

Spawn a **Test agent** for comprehensive tests:

```bash
/agent:test "Create tests for [ComponentName]"
```

Tests should cover:

- Rendering with required props
- All prop variations
- Event handling
- Ref forwarding
- Error states
- Form integration

### Phase 5: Accessibility (agent:a11y)

think

Spawn an **A11y agent** in parallel with docs:

```bash
/agent:a11y "Audit [ComponentName] for WCAG compliance"
```

Verify:

- Label association
- Error announcement
- Keyboard navigation
- Focus management
- ARIA attributes

### Phase 6: Documentation (agent:docs)

think

Spawn a **Docs agent** in parallel with a11y:

```bash
/agent:docs "Create Storybook stories for [ComponentName]"
```

Create:

- Storybook stories (default, error, required, etc.)
- JSDoc documentation
- Usage examples

### Phase 7: Export and Integrate

Add exports:

```typescript
// packages/react/src/components/index.ts
export * from './fields/[component-name]';
```

### Phase 8: Review (agent:review)

think

Spawn a **Review agent**:

```bash
/agent:review "Review [ComponentName] implementation"
```

### Phase 9: Final Verification

```bash
pnpm --filter @formkit-gov/react lint
pnpm --filter @formkit-gov/react typecheck
pnpm --filter @formkit-gov/react test
pnpm --filter @formkit-gov/react build
pnpm --filter storybook dev  # Visual verification
```

## Parallel Execution

```text
Phase 1: agent:explore (sequential)
Phase 2: Plan (sequential)
Phase 3: agent:component (sequential)
Phase 4: agent:test (sequential - needs component)
Phase 5-6: agent:a11y + agent:docs (PARALLEL)
Phase 7: Export (sequential)
Phase 8-9: agent:review + Verify (sequential)
```

## Output

````markdown
## Component Implementation Summary

**Component:** [ComponentName] **Package:** @formkit-gov/react **VA DS Component:** va-[component]

### Files Created

**Source:**

- `src/components/fields/[name].tsx` - Component implementation
- `src/components/fields/[name].types.ts` - TypeScript types

**Tests:**

- `src/components/fields/[name].test.tsx` - Unit tests

**Documentation:**

- `apps/storybook/src/stories/[Name].stories.tsx` - Storybook

### Component API

```typescript
interface [ComponentName]Props {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  // ...
}
```
````

### Usage

```tsx
import { [ComponentName] } from '@formkit-gov/react';

// Basic usage
<[ComponentName]
  label="Field Label"
  name="fieldName"
/>

// With form integration
<FormField
  control={form.control}
  name="fieldName"
  render={({ field, fieldState }) => (
    <[ComponentName]
      {...field}
      label="Field Label"
      error={fieldState.error?.message}
    />
  )}
/>
```

### Verification Results

- [x] All tests pass
- [x] TypeScript compiles
- [x] Build succeeds
- [x] Accessibility verified
- [x] Storybook stories created

### Storybook Preview

View at: `pnpm --filter storybook dev` Navigate to: Components > Fields > [ComponentName]

````markdown
## Example Usage

```bash
/team:component "Create TextInputField wrapping va-text-input with form integration"
```
````

```bash
/team:component "Create SelectField wrapping va-select with options support"
```

```bash
/team:component "Create CheckboxField wrapping va-checkbox for boolean fields"
```

## Task

$ARGUMENTS
