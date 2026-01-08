import { Form, FormControl, FormField, FormItem, SelectField } from '@formkit-gov/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SelectField> = {
  title: 'Fields/SelectField',
  component: SelectField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Select dropdown field that wraps the VA Design System va-select web component.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label for the select' },
    hint: { control: 'text', description: 'Hint text displayed below the label' },
    error: { control: 'text', description: 'Error message to display' },
    required: { control: 'boolean', description: 'Whether the field is required' },
    disabled: { control: 'boolean', description: 'Whether the field is disabled' },
  },
};

export default meta;
type Story = StoryObj<typeof SelectField>;

const stateOptions = [
  { label: 'California', value: 'CA' },
  { label: 'New York', value: 'NY' },
  { label: 'Texas', value: 'TX' },
  { label: 'Florida', value: 'FL' },
  { label: 'Illinois', value: 'IL' },
];

export const Default: Story = {
  args: {
    label: 'State',
    name: 'state',
    options: stateOptions,
  },
};

export const WithHint: Story = {
  args: {
    label: 'State',
    hint: 'Select your state of residence',
    name: 'state',
    options: stateOptions,
  },
};

export const Required: Story = {
  args: {
    label: 'State',
    required: true,
    name: 'state',
    options: stateOptions,
  },
};

export const WithError: Story = {
  args: {
    label: 'State',
    error: 'Please select a state',
    name: 'state',
    options: stateOptions,
  },
};

export const Disabled: Story = {
  args: {
    label: 'State',
    disabled: true,
    value: 'CA',
    name: 'state',
    options: stateOptions,
  },
};

export const WithReactHookForm: Story = {
  render: () => {
    const schema = z.object({
      state: z.string().min(1, 'Please select a state'),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { state: '' },
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        alert(`State: ${data.state}`);
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="state"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <SelectField
                    {...field}
                    required
                    error={fieldState.error?.message}
                    label="State"
                    options={stateOptions}
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
