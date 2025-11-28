# @formkit-gov/react

React components wrapping VA Design System with React Hook Form integration.

## Installation

```bash
pnpm add @formkit-gov/react react react-dom react-hook-form zod @hookform/resolvers @department-of-veterans-affairs/component-library
```

## Components

### TextInputField

A React wrapper for VA Design System's `va-text-input` web component.

#### Basic Usage

```tsx
import { TextInputField } from '@formkit-gov/react';

function MyForm() {
  return <TextInputField label="First name" required name="firstName" />;
}
```

#### With React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import { TextInputField } from '@formkit-gov/react';

function MyForm() {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <form>
      <TextInputField
        {...register('firstName')}
        label="First name"
        error={errors.firstName?.message}
        required
      />
    </form>
  );
}
```

#### Props

- `label` - Field label (string)
- `error` - Error message to display (string)
- `hint` - Hint text below the label (string)
- `required` - Whether field is required (boolean)
- `type` - Input type: 'text', 'email', 'password', 'tel', 'url', 'number', 'search'
- `maxlength` - Maximum character length (number)
- `minlength` - Minimum character length (number)
- `pattern` - Validation pattern (string)
- `value` - Current value (string)
- `name` - Field name (string)
- `disabled` - Whether field is disabled (boolean)
- `autocomplete` - Autocomplete attribute (string)
- `inputmode` - Input mode for mobile keyboards (string)
- `onChange` - Change event handler
- `onBlur` - Blur event handler

#### Examples

Email input with hint:

```tsx
<TextInputField type="email" label="Email address" hint="We'll never share your email" required />
```

With character limit:

```tsx
<TextInputField label="Username" maxlength={20} hint="Maximum 20 characters" />
```

Phone number:

```tsx
<TextInputField type="tel" label="Phone number" inputmode="tel" autocomplete="tel" />
```

## Other Components

- `CheckboxField` - Checkbox input
- `TextareaField` - Multi-line text input
- `SelectField` - Select dropdown
- `Form` - Form wrapper with context
- `FormField` - Field wrapper with React Hook Form integration
- `FormItem` - Form item container
- `FormLabel` - Form label
- `FormControl` - Form control wrapper
- `FormMessage` - Error message display
- `FormDescription` - Field description

## License

MIT
