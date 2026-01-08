import { createEmailSchema, createTextSchema } from '@formkit-gov/core';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  TextInputField,
} from '@formkit-gov/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof TextInputField> = {
  title: 'Fields/TextInputField',
  component: TextInputField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Text input field that wraps the VA Design System va-text-input web component. Supports various input types and integrates with React Hook Form.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label for the input' },
    hint: { control: 'text', description: 'Hint text displayed below the label' },
    error: { control: 'text', description: 'Error message to display' },
    required: { control: 'boolean', description: 'Whether the field is required' },
    disabled: { control: 'boolean', description: 'Whether the field is disabled' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'url', 'number', 'search'],
      description: 'Input type',
    },
    maxlength: { control: 'number', description: 'Maximum length' },
  },
};

export default meta;
type Story = StoryObj<typeof TextInputField>;

export const Default: Story = {
  args: {
    label: 'Full name',
    name: 'fullName',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Full name',
    hint: 'Enter your first and last name',
    name: 'fullName',
  },
};

export const Required: Story = {
  args: {
    label: 'Full name',
    required: true,
    name: 'fullName',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email address',
    error: 'Please enter a valid email address',
    name: 'email',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Full name',
    disabled: true,
    value: 'John Doe',
    name: 'fullName',
  },
};

export const EmailType: Story = {
  args: {
    label: 'Email address',
    type: 'email',
    name: 'email',
  },
};

export const PasswordType: Story = {
  args: {
    label: 'Password',
    type: 'password',
    name: 'password',
  },
};

export const PhoneType: Story = {
  args: {
    label: 'Phone number',
    type: 'tel',
    name: 'phone',
  },
};

export const WithMaxLength: Story = {
  args: {
    label: 'Username',
    maxlength: 20,
    hint: 'Maximum 20 characters',
    name: 'username',
  },
};

/**
 * Example showing integration with React Hook Form and Zod validation
 */
export const WithReactHookForm: Story = {
  render: () => {
    const schema = z.object({
      email: createEmailSchema(),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { email: '' },
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        alert(`Email: ${data.email}`);
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <TextInputField
                    {...field}
                    required
                    error={fieldState.error?.message}
                    label="Email address"
                    type="email"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div style={{ marginTop: '1rem' }}>
            <button type="submit">Submit</button>
          </div>
        </Form>
      );
    }

    return <FormExample />;
  },
};

/**
 * Full form example with multiple fields and validation
 */
export const CompleteFormExample: Story = {
  render: () => {
    const schema = z.object({
      firstName: createTextSchema({ min: 2, max: 50 }),
      lastName: createTextSchema({ min: 2, max: 50 }),
      email: createEmailSchema(),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { firstName: '', lastName: '', email: '' },
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        alert(JSON.stringify(data, null, 2));
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <TextInputField
                      {...field}
                      required
                      error={fieldState.error?.message}
                      label="First name"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <TextInputField
                      {...field}
                      required
                      error={fieldState.error?.message}
                      label="Last name"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <TextInputField
                      {...field}
                      required
                      error={fieldState.error?.message}
                      label="Email address"
                      type="email"
                    />
                  </FormControl>
                  <FormDescription>We will never share your email.</FormDescription>
                </FormItem>
              )}
            />

            <div>
              <button type="submit">Submit</button>
            </div>
          </div>
        </Form>
      );
    }

    return <FormExample />;
  },
};
