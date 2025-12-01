<p align="center">
  <img src="./assets/formkit-gov.png" alt="FormKit Gov" width="120" />
</p>

<h1 align="center">FormKit Gov</h1>

<p align="center">
  <strong>Production-grade form system for government applications</strong>
</p>

<p align="center">
  Built on VA Design System, React Hook Form, and Zod
</p>

<p align="center">
  <a href="https://github.com/LinnJS/formkit-gov/actions/workflows/ci.yml">
    <img src="https://github.com/LinnJS/formkit-gov/actions/workflows/ci.yml/badge.svg" alt="CI Status" />
  </a>
  <a href="https://codecov.io/gh/LinnJS/formkit-gov">
    <img src="https://codecov.io/gh/LinnJS/formkit-gov/branch/main/graph/badge.svg" alt="Code Coverage" />
  </a>
  <a href="https://www.npmjs.com/package/@formkit-gov/react">
    <img src="https://img.shields.io/npm/v/@formkit-gov/react.svg" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/@formkit-gov/react">
    <img src="https://img.shields.io/npm/dm/@formkit-gov/react.svg" alt="npm downloads" />
  </a>
  <a href="https://github.com/LinnJS/formkit-gov/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@formkit-gov/react.svg" alt="license" />
  </a>
</p>

<p align="center">
  <a href="https://formkit-gov.org">Home</a> •
  <a href="https://docs.formkit-gov.org">Documentation</a> •
  <a href="https://storybook.formkit-gov.org">Storybook</a> •
  <a href="https://nextjs-demo.formkit-gov.org">Next.js Demo</a> •
  <a href="https://vite-demo.formkit-gov.org">Vite Demo</a> •
  <a href="https://github.com/LinnJS/formkit-gov/blob/main/CONTRIBUTING.md">Contributing</a>
</p>

---

## Features

- **VA Design System Integration** - Pre-built components wrapping
  [@department-of-veterans-affairs/component-library](https://design.va.gov/components/)
- **Type-Safe Forms** - Full TypeScript support with Zod schema validation
- **React Hook Form** - Seamless integration with the most popular React form library
- **OpenAPI Schema Federation** - Generate Zod schemas from your backend's OpenAPI specification
- **Multi-Step Wizards** - Built-in support for complex multi-page forms with save-in-progress
- **Pluggable State Management** - Works with sessionStorage, Zustand, Redux, or TanStack Query
- **Accessibility First** - WCAG 2.1 AA compliant, tested with axe-core
- **Framework Agnostic Core** - Use with Next.js, Vite, Remix, or any React application

## Packages

| Package                                            | Description                                       | Version                                                                                                                   |
| -------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [`@formkit-gov/core`](./packages/core)             | Zod schemas, validation utilities, regex patterns | [![npm](https://img.shields.io/npm/v/@formkit-gov/core.svg)](https://www.npmjs.com/package/@formkit-gov/core)             |
| [`@formkit-gov/react`](./packages/react)           | React components with React Hook Form integration | [![npm](https://img.shields.io/npm/v/@formkit-gov/react.svg)](https://www.npmjs.com/package/@formkit-gov/react)           |
| [`@formkit-gov/store`](./packages/store)           | Pluggable state management with persistence       | [![npm](https://img.shields.io/npm/v/@formkit-gov/store.svg)](https://www.npmjs.com/package/@formkit-gov/store)           |
| [`@formkit-gov/wizard`](./packages/wizard)         | Multi-step form orchestration                     | [![npm](https://img.shields.io/npm/v/@formkit-gov/wizard.svg)](https://www.npmjs.com/package/@formkit-gov/wizard)         |
| [`@formkit-gov/openapi`](./packages/openapi)       | OpenAPI to Zod schema generation                  | [![npm](https://img.shields.io/npm/v/@formkit-gov/openapi.svg)](https://www.npmjs.com/package/@formkit-gov/openapi)       |
| [`@formkit-gov/validators`](./packages/validators) | Extended government-specific validators           | [![npm](https://img.shields.io/npm/v/@formkit-gov/validators.svg)](https://www.npmjs.com/package/@formkit-gov/validators) |
| [`@formkit-gov/test-utils`](./packages/test-utils) | Testing utilities for forms                       | [![npm](https://img.shields.io/npm/v/@formkit-gov/test-utils.svg)](https://www.npmjs.com/package/@formkit-gov/test-utils) |

## Quick Start

### Installation

```bash
# Install core packages
npm install @formkit-gov/react @formkit-gov/core zod react-hook-form @hookform/resolvers

# Install VA component library
npm install @department-of-veterans-affairs/component-library
```

### Basic Usage

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

// Define your schema
const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Enter a valid email address'),
});

type FormData = z.infer<typeof schema>;

function ContactForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
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
      </form>
    </Form>
  );
}
```

### Using Pre-built Schemas

```tsx
import { createSSNSchema, createPhoneSchema, createAddressSchema } from '@formkit-gov/core';

const schema = z.object({
  ssn: createSSNSchema(),
  phone: createPhoneSchema(),
  address: createAddressSchema(),
});
```

### Multi-Step Wizard

```tsx
import { FormWizard, WizardStep, ReviewPage, ConfirmationPage } from '@formkit-gov/wizard';
import { createFormStore, createSessionStorageAdapter } from '@formkit-gov/store';

const store = createFormStore({
  formId: 'benefits-application',
  storage: createSessionStorageAdapter(),
});

function BenefitsApplication() {
  return (
    <FormWizard
      config={{
        formId: 'benefits-application',
        title: 'Apply for Benefits',
        store,
      }}
      onSubmit={handleSubmit}
    >
      <WizardStep id="personal-info" title="Personal Information">
        <PersonalInfoForm />
      </WizardStep>

      <WizardStep id="contact-info" title="Contact Information">
        <ContactInfoForm />
      </WizardStep>

      <ReviewPage />
      <ConfirmationPage />
    </FormWizard>
  );
}
```

### OpenAPI Schema Generation

```bash
# Generate Zod schemas from your API spec
npx @formkit-gov/openapi generate ./openapi.yaml --output ./src/schemas
```

```typescript
// Use generated schemas
import { VeteranInfoSchema } from './schemas';

const form = useForm({
  resolver: zodResolver(VeteranInfoSchema),
});
```

## Documentation

Visit [docs.formkit-gov.org](https://docs.formkit-gov.org) for full documentation:

- [Getting Started](https://docs.formkit-gov.org/getting-started)
- [Components](https://docs.formkit-gov.org/components)
- [Form Patterns](https://docs.formkit-gov.org/patterns)
- [Wizard Guide](https://docs.formkit-gov.org/wizard)
- [OpenAPI Integration](https://docs.formkit-gov.org/openapi)
- [API Reference](https://docs.formkit-gov.org/api)

## Browser Support

FormKit Gov supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

```bash
# Clone the repo
git clone https://github.com/LinnJS/formkit-gov.git

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Start development
pnpm dev
```

## License

[MIT](LICENSE) © FormKit Gov Contributors

## Acknowledgments

- [VA Design System](https://design.va.gov/) - For the excellent component library
- [React Hook Form](https://react-hook-form.com/) - For the flexible form library
- [Zod](https://zod.dev/) - For the TypeScript-first schema validation
- [shadcn/ui](https://ui.shadcn.com/) - For the composable form component pattern
