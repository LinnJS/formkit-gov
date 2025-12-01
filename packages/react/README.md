# @formkit-gov/react

React components wrapping VA Design System with React Hook Form integration.

## Installation

```bash
pnpm add @formkit-gov/react react react-dom react-hook-form zod @hookform/resolvers @department-of-veterans-affairs/component-library
```

## Features

- VA Design System web component wrappers
- React Hook Form integration
- Accessible form controls (WCAG 2.1 AA)
- shadcn/ui-style composable form pattern
- TypeScript support

## Components

### Form Components

Core form components following the shadcn/ui composable pattern:

| Component         | Description                                |
| ----------------- | ------------------------------------------ |
| `Form`            | Form wrapper with React Hook Form context  |
| `FormField`       | Field wrapper with React Hook Form binding |
| `FormItem`        | Form item container                        |
| `FormControl`     | Control wrapper for form inputs            |
| `FormLabel`       | Accessible label component                 |
| `FormDescription` | Field description/hint text                |
| `FormMessage`     | Error message display                      |

### Field Components

VA Design System web component wrappers:

| Component               | Description                           |
| ----------------------- | ------------------------------------- |
| `TextInputField`        | Single-line text input                |
| `TextareaField`         | Multi-line text input                 |
| `NumberField`           | Numeric input with validation         |
| `CurrencyField`         | Currency input with formatting        |
| `PhoneField`            | Phone number input with formatting    |
| `SSNField`              | Social Security Number input (masked) |
| `DateField`             | Date picker input                     |
| `MemorableDateField`    | Separate month/day/year inputs        |
| `SelectField`           | Dropdown select                       |
| `ComboBoxField`         | Searchable dropdown with autocomplete |
| `CheckboxField`         | Single checkbox                       |
| `CheckboxGroupField`    | Group of checkboxes                   |
| `RadioField`            | Radio button group                    |
| `FileUploadField`       | File upload with validation           |
| `PrivacyAgreementField` | Privacy agreement checkbox            |

### Molecular Components

Pre-composed field groups for common patterns:

| Component       | Description                                    |
| --------------- | ---------------------------------------------- |
| `FullNameField` | First name, middle name, last name, and suffix |
| `AddressField`  | Complete address with street, city, state, zip |

### Review Components

Components for displaying form data before submission:

| Component       | Description                      |
| --------------- | -------------------------------- |
| `ReviewSection` | Section container with edit link |
| `ReviewItem`    | Single label/value display       |
| `ReviewList`    | List of review items             |

### Field Layout Primitives

Low-level layout components for custom field arrangements:

| Component          | Description             |
| ------------------ | ----------------------- |
| `Field`            | Base field container    |
| `FieldGroup`       | Group of related fields |
| `FieldSet`         | Fieldset with legend    |
| `FieldLegend`      | Legend for fieldset     |
| `FieldLabel`       | Label element           |
| `FieldContent`     | Content wrapper         |
| `FieldTitle`       | Title text              |
| `FieldDescription` | Description/hint text   |
| `FieldError`       | Error message           |
| `FieldSeparator`   | Visual separator        |

## Usage

### Basic Form with React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  TextInputField,
} from '@formkit-gov/react';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  email: z.string().email('Enter a valid email address'),
});

type FormData = z.infer<typeof schema>;

function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: '', email: '' },
  });

  return (
    <Form form={form} onSubmit={data => console.log(data)}>
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First name</FormLabel>
            <FormControl>
              <TextInputField {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <TextInputField type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <button type="submit">Submit</button>
    </Form>
  );
}
```

### Using Field Components Directly

```tsx
import { TextInputField, SelectField, CheckboxField } from '@formkit-gov/react';

// Text input with error
<TextInputField
  label="First name"
  error="This field is required"
  required
/>

// Select dropdown
<SelectField
  label="State"
  options={[
    { value: 'CA', label: 'California' },
    { value: 'TX', label: 'Texas' },
  ]}
/>

// Checkbox
<CheckboxField
  label="I agree to the terms"
  checked={agreed}
  onChange={setAgreed}
/>
```

### Using Molecular Components

```tsx
import { FullNameField, AddressField } from '@formkit-gov/react';

// Full name with all parts
<FullNameField
  value={{ first: '', middle: '', last: '', suffix: '' }}
  onChange={setName}
  config={{
    middle: { show: true },
    suffix: { show: true },
  }}
/>

// Address field
<AddressField
  value={{ street: '', street2: '', city: '', state: '', zip: '' }}
  onChange={setAddress}
/>
```

### Review Page

```tsx
import { ReviewSection, ReviewItem, ReviewList } from '@formkit-gov/react';

<ReviewSection title="Personal Information" onEdit={() => goToStep(1)}>
  <ReviewItem label="Name" value="John Doe" />
  <ReviewItem label="Email" value="john@example.com" />
</ReviewSection>

<ReviewSection title="Address" onEdit={() => goToStep(2)}>
  <ReviewList
    items={[
      { label: 'Street', value: '123 Main St' },
      { label: 'City', value: 'San Francisco' },
      { label: 'State', value: 'CA' },
    ]}
  />
</ReviewSection>
```

## API Reference

See the [Storybook](https://storybook.formkit-gov.org) for interactive component demos and the
[documentation site](https://docs.formkit-gov.org) for detailed API reference.

## License

MIT
