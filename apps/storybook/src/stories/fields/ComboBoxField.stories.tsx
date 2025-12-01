import { ComboBoxField, Form, FormControl, FormField, FormItem } from '@formkit-gov/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ComboBoxField> = {
  title: 'Fields/ComboBoxField',
  component: ComboBoxField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Searchable dropdown combo box field that wraps the VA Design System va-combo-box web component.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label for the combo box' },
    hint: { control: 'text', description: 'Hint text displayed below the label' },
    error: { control: 'text', description: 'Error message to display' },
    required: { control: 'boolean', description: 'Whether the field is required' },
    disabled: { control: 'boolean', description: 'Whether the field is disabled' },
    placeholder: { control: 'text', description: 'Placeholder text for the input' },
  },
};

export default meta;
type Story = StoryObj<typeof ComboBoxField>;

const countryOptions = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'Mexico', value: 'MX' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'France', value: 'FR' },
  { label: 'Germany', value: 'DE' },
  { label: 'Italy', value: 'IT' },
  { label: 'Spain', value: 'ES' },
  { label: 'Japan', value: 'JP' },
  { label: 'Australia', value: 'AU' },
];

export const Default: Story = {
  args: {
    label: 'Country',
    name: 'country',
    options: countryOptions,
  },
};

export const WithHint: Story = {
  args: {
    label: 'Country',
    hint: 'Start typing to search for a country',
    name: 'country',
    options: countryOptions,
  },
};

export const Required: Story = {
  args: {
    label: 'Country',
    required: true,
    name: 'country',
    options: countryOptions,
  },
};

export const WithError: Story = {
  args: {
    label: 'Country',
    error: 'Please select a country',
    name: 'country',
    options: countryOptions,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Country',
    disabled: true,
    value: 'US',
    name: 'country',
    options: countryOptions,
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Country',
    placeholder: 'Start typing...',
    name: 'country',
    options: countryOptions,
  },
};

const manyOptions = Array.from({ length: 100 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: `opt${i + 1}`,
}));

export const WithManyOptions: Story = {
  args: {
    label: 'Search from many options',
    hint: 'This combo box has 100 options - use the search to filter',
    placeholder: 'Type to search...',
    name: 'manyOptions',
    options: manyOptions,
  },
};

export const WithReactHookForm: Story = {
  render: () => {
    const schema = z.object({
      country: z.string().min(1, 'Please select a country'),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { country: '' },
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        alert(`Country: ${data.country}`);
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="country"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <ComboBoxField
                    {...field}
                    required
                    error={fieldState.error?.message}
                    hint="Start typing to search"
                    label="Country"
                    options={countryOptions}
                    placeholder="Search..."
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
