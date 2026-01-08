# @formkit-gov/react

React components wrapping VA Design System with React Hook Form integration.

## Installation

```bash
npm install @formkit-gov/react react react-dom react-hook-form zod @hookform/resolvers @department-of-veterans-affairs/component-library
```

## Quick Start

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, TextInputField } from '@formkit-gov/react';

const schema = z.object({
  firstName: z.string().min(1, 'Required'),
});

function MyForm() {
  const form = useForm({ resolver: zodResolver(schema) });

  return (
    <Form form={form} onSubmit={console.log}>
      <FormField
        control={form.control}
        name="firstName"
        render={({ field, fieldState }) => (
          <TextInputField {...field} label="First name" error={fieldState.error?.message} />
        )}
      />
      <button type="submit">Submit</button>
    </Form>
  );
}
```

## Documentation

For comprehensive documentation, examples, and API reference:

- [Full Documentation](https://docs.formkit-gov.org/docs/packages/react) - Complete API reference
- [Component Reference](https://docs.formkit-gov.org/docs/components) - All available components
- [Interactive Examples](https://storybook.formkit-gov.org) - Storybook demos

## Components Overview

### Form Components

`Form` | `FormField` | `FormItem` | `FormControl` | `FormLabel` | `FormMessage`

### Field Components

`TextInputField` | `TextareaField` | `SelectField` | `CheckboxField` | `RadioField` | `DateField` |
`PhoneField` | `SSNField` | `FileUploadField`

### Molecular Components

`FullNameField` | `AddressField`

### Review Components

`ReviewSection` | `ReviewItem` | `ReviewList`

## Features

- VA Design System web component wrappers
- React Hook Form integration
- Accessible (WCAG 2.1 AA)
- TypeScript support

## License

MIT
