# Create Component

Create a new React component for the @formkit-gov/react package.

## Instructions

You are creating a new form component that wraps a VA Design System web component and integrates
with React Hook Form.

### Steps

1. **Analyze the VA DS Component**
   - Check the VA Design System documentation for the component
   - Identify all props, events, and accessibility requirements
   - Note any web component-specific behaviors

2. **Create the Component File** Location: `packages/react/src/components/[component-name].tsx`

   Structure:

   ```typescript
   import * as React from 'react';
   import { useFormContext, Controller } from 'react-hook-form';

   export interface [ComponentName]Props {
     name: string;
     label: string;
     // ... other props
   }

   export const [ComponentName] = React.forwardRef<
     HTML[VaElement]Element,
     [ComponentName]Props
   >(({ name, label, ...props }, ref) => {
     // Implementation
   });

   [ComponentName].displayName = '[ComponentName]';
   ```

3. **Create Tests** Location: `packages/react/src/components/[component-name].test.tsx`

   Include tests for:
   - Renders with label
   - Shows error state
   - Handles user input
   - Integrates with form context
   - Accessibility (no axe violations)

4. **Create Storybook Story** Location: `packages/react/src/components/[component-name].stories.tsx`

   Include stories for:
   - Default state
   - With error
   - Disabled
   - Required
   - All variants

5. **Export from Index** Add export to `packages/react/src/index.ts`

### Component Requirements

- Use React.forwardRef for ref forwarding
- Include displayName
- Support all VA DS component props
- Handle web component events properly
- Associate errors with aria-describedby
- Support both controlled and uncontrolled modes

### Naming Convention

- File: kebab-case (`text-input-field.tsx`)
- Component: PascalCase (`TextInputField`)
- Props interface: `[ComponentName]Props`

## Arguments

$ARGUMENTS - Component name and description (e.g., "TextInputField - A text input field with label
and error support")
