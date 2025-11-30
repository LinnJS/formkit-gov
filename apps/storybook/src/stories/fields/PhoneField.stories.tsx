import { createPhoneSchema } from '@formkit-gov/core';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  PhoneField,
} from '@formkit-gov/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PhoneField> = {
  title: 'Fields/PhoneField',
  component: PhoneField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Phone number input field that wraps the VA Design System va-text-input web component. Configured with type="tel" and inputmode="tel" for optimal mobile keyboard experience. Integrates with React Hook Form and createPhoneSchema for validation.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label for the input' },
    hint: { control: 'text', description: 'Hint text displayed below the label' },
    error: { control: 'text', description: 'Error message to display' },
    required: { control: 'boolean', description: 'Whether the field is required' },
    disabled: { control: 'boolean', description: 'Whether the field is disabled' },
    autocomplete: {
      control: 'select',
      options: ['tel', 'tel-national', 'tel-country-code', 'tel-area-code'],
      description: 'Autocomplete attribute for phone numbers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PhoneField>;

export const Default: Story = {
  args: {
    label: 'Phone number',
    name: 'phone',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Phone number',
    hint: 'Enter a 10-digit phone number',
    name: 'phone',
  },
};

export const Required: Story = {
  args: {
    label: 'Phone number',
    required: true,
    name: 'phone',
  },
};

export const WithError: Story = {
  args: {
    label: 'Phone number',
    error: 'Enter a valid 10-digit phone number',
    name: 'phone',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Phone number',
    disabled: true,
    value: '(555) 123-4567',
    name: 'phone',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Phone number',
    value: '555-123-4567',
    name: 'phone',
  },
};

export const InternationalHint: Story = {
  args: {
    label: 'Phone number',
    hint: 'Include country code for international numbers',
    autocomplete: 'tel-national',
    name: 'phone',
  },
};

/**
 * Example showing integration with React Hook Form and Zod validation
 */
export const WithReactHookForm: Story = {
  render: () => {
    const schema = z.object({
      phone: createPhoneSchema(),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { phone: '' },
      });

      const onSubmit = (data: FormData) => {
        alert(`Phone: ${data.phone}`);
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <PhoneField
                    {...field}
                    label="Phone number"
                    hint="Enter a 10-digit phone number"
                    error={fieldState.error?.message}
                    required
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
 * Example showing international phone validation
 */
export const InternationalPhone: Story = {
  render: () => {
    const schema = z.object({
      phone: createPhoneSchema({ international: true }),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { phone: '' },
      });

      const onSubmit = (data: FormData) => {
        alert(`Phone: ${data.phone}`);
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <PhoneField
                    {...field}
                    label="Phone number"
                    hint="Include country code (e.g., +1 555-123-4567)"
                    error={fieldState.error?.message}
                    required
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
 * Full form example with phone number and validation
 */
export const CompleteFormExample: Story = {
  render: () => {
    const schema = z.object({
      primaryPhone: createPhoneSchema(),
      alternatePhone: createPhoneSchema({ required: false }),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { primaryPhone: '', alternatePhone: '' },
      });

      const onSubmit = (data: FormData) => {
        alert(JSON.stringify(data, null, 2));
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FormField
              control={form.control}
              name="primaryPhone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <PhoneField
                      {...field}
                      label="Primary phone number"
                      hint="Enter a 10-digit phone number"
                      error={fieldState.error?.message}
                      required
                    />
                  </FormControl>
                  <FormDescription>Your main contact number.</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="alternatePhone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <PhoneField
                      {...field}
                      label="Alternate phone number"
                      hint="Optional alternate contact number"
                      error={fieldState.error?.message}
                    />
                  </FormControl>
                  <FormDescription>An optional alternate phone number.</FormDescription>
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
