import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  NumberField,
} from '@formkit-gov/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NumberField> = {
  title: 'Fields/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Number input field that wraps the VA Design System va-text-input web component with type="number". Supports min/max constraints, step increments, and integrates with React Hook Form.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label for the input' },
    hint: { control: 'text', description: 'Hint text displayed below the label' },
    error: { control: 'text', description: 'Error message to display' },
    required: { control: 'boolean', description: 'Whether the field is required' },
    disabled: { control: 'boolean', description: 'Whether the field is disabled' },
    min: { control: 'number', description: 'Minimum value' },
    max: { control: 'number', description: 'Maximum value' },
    step: { control: 'number', description: 'Step increment' },
    inputmode: {
      control: 'select',
      options: ['decimal', 'numeric'],
      description: 'Input mode for mobile keyboards',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NumberField>;

export const Default: Story = {
  args: {
    label: 'Age',
    name: 'age',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Age',
    hint: 'Enter your age in years',
    name: 'age',
  },
};

export const Required: Story = {
  args: {
    label: 'Age',
    required: true,
    name: 'age',
  },
};

export const WithError: Story = {
  args: {
    label: 'Age',
    error: 'Age must be between 0 and 120',
    name: 'age',
  },
};

export const WithMinMax: Story = {
  args: {
    label: 'Age',
    hint: 'Enter a value between 0 and 120',
    min: 0,
    max: 120,
    name: 'age',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Age',
    disabled: true,
    value: 25,
    name: 'age',
  },
};

export const WithStep: Story = {
  args: {
    label: 'Amount',
    hint: 'Enter dollar amount',
    step: 0.01,
    min: 0,
    inputmode: 'decimal',
    name: 'amount',
  },
};

export const Quantity: Story = {
  args: {
    label: 'Quantity',
    hint: 'Enter quantity (whole numbers only)',
    min: 1,
    max: 100,
    step: 1,
    inputmode: 'numeric',
    name: 'quantity',
  },
};

export const Temperature: Story = {
  args: {
    label: 'Temperature',
    hint: 'Enter temperature in Celsius',
    min: -273.15,
    step: 0.1,
    inputmode: 'decimal',
    name: 'temperature',
  },
};

/**
 * Example showing integration with React Hook Form and Zod validation
 */
export const WithReactHookForm: Story = {
  render: () => {
    const schema = z.object({
      age: z.number().min(0, 'Age must be at least 0').max(120, 'Age must be at most 120'),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { age: 0 },
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        alert(`Age: ${data.age}`);
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="age"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <NumberField
                    {...field}
                    label="Age"
                    hint="Enter your age in years"
                    error={fieldState.error?.message}
                    required
                    min={0}
                    max={120}
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
 * Full form example with multiple number fields and validation
 */
export const CompleteFormExample: Story = {
  render: () => {
    const schema = z.object({
      age: z.number().min(18, 'Must be at least 18').max(120, 'Must be at most 120'),
      dependents: z.number().min(0, 'Cannot be negative').max(20, 'Must be at most 20'),
      income: z.number().min(0, 'Must be at least 0').multipleOf(0.01, 'Invalid amount'),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { age: 18, dependents: 0, income: 0 },
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
              name="age"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <NumberField
                      {...field}
                      label="Age"
                      hint="Must be at least 18 years old"
                      error={fieldState.error?.message}
                      required
                      min={18}
                      max={120}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dependents"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <NumberField
                      {...field}
                      label="Number of dependents"
                      hint="Enter the number of dependents you have"
                      error={fieldState.error?.message}
                      min={0}
                      max={20}
                      step={1}
                      inputmode="numeric"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="income"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <NumberField
                      {...field}
                      label="Annual income"
                      hint="Enter your annual income in dollars"
                      error={fieldState.error?.message}
                      required
                      min={0}
                      step={0.01}
                      inputmode="decimal"
                    />
                  </FormControl>
                  <FormDescription>This information is confidential.</FormDescription>
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
