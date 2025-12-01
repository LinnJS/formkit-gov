import { createSSNSchema } from '@formkit-gov/core';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  SSNField,
} from '@formkit-gov/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SSNField> = {
  title: 'Fields/SSNField',
  component: SSNField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Social Security Number input field that wraps the VA Design System va-text-input web component. Automatically formats input as XXX-XX-XXXX and integrates with React Hook Form and Zod validation.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label for the input' },
    hint: { control: 'text', description: 'Hint text displayed below the label' },
    error: { control: 'text', description: 'Error message to display' },
    required: { control: 'boolean', description: 'Whether the field is required' },
    disabled: { control: 'boolean', description: 'Whether the field is disabled' },
  },
};

export default meta;
type Story = StoryObj<typeof SSNField>;

export const Default: Story = {
  args: {
    name: 'ssn',
  },
};

export const WithHint: Story = {
  args: {
    hint: 'Enter in format XXX-XX-XXXX',
    name: 'ssn',
  },
};

export const Required: Story = {
  args: {
    required: true,
    name: 'ssn',
  },
};

export const WithError: Story = {
  args: {
    error: 'Enter a valid Social Security number (like 123-45-6789)',
    name: 'ssn',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '123-45-6789',
    name: 'ssn',
  },
};

export const WithValue: Story = {
  args: {
    value: '123-45-6789',
    name: 'ssn',
  },
};

export const CustomLabel: Story = {
  args: {
    label: 'SSN',
    required: true,
    name: 'ssn',
  },
};

/**
 * Example showing integration with React Hook Form and Zod validation
 */
export const WithReactHookForm: Story = {
  render: () => {
    const schema = z.object({
      ssn: createSSNSchema(),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { ssn: '' },
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        alert(`SSN: ${data.ssn}`);
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="ssn"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <SSNField {...field} required error={fieldState.error?.message} />
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
 * Example showing optional SSN field with flexible validation
 */
export const OptionalSSN: Story = {
  render: () => {
    const schema = z.object({
      ssn: createSSNSchema({ required: false }),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { ssn: '' },
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        alert(`SSN: ${data.ssn || 'Not provided'}`);
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="ssn"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <SSNField
                    {...field}
                    error={fieldState.error?.message}
                    hint="Optional - only provide if you have one"
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
 * Complete form example with SSN and other personal information
 */
export const CompleteFormExample: Story = {
  render: () => {
    const schema = z.object({
      firstName: z.string().min(1, 'First name is required'),
      lastName: z.string().min(1, 'Last name is required'),
      ssn: createSSNSchema(),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { firstName: '', lastName: '', ssn: '' },
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
                    <va-text-input
                      {...field}
                      required
                      error={fieldState.error?.message || undefined}
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
                    <va-text-input
                      {...field}
                      required
                      error={fieldState.error?.message || undefined}
                      label="Last name"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ssn"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <SSNField {...field} required error={fieldState.error?.message} />
                  </FormControl>
                  <FormDescription>Your SSN is needed for identity verification.</FormDescription>
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
