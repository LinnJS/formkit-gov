import { CheckboxField, Form, FormControl, FormField, FormItem } from '@formkit-gov/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CheckboxField> = {
  title: 'Fields/CheckboxField',
  component: CheckboxField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Checkbox field that wraps the VA Design System va-checkbox web component.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label for the checkbox' },
    hint: { control: 'text', description: 'Hint text displayed below the label' },
    error: { control: 'text', description: 'Error message to display' },
    required: { control: 'boolean', description: 'Whether the field is required' },
    disabled: { control: 'boolean', description: 'Whether the field is disabled' },
    checked: { control: 'boolean', description: 'Whether the checkbox is checked' },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxField>;

export const Default: Story = {
  args: {
    label: 'I agree to the terms and conditions',
    name: 'agree',
  },
};

export const Checked: Story = {
  args: {
    label: 'I agree to the terms and conditions',
    checked: true,
    name: 'agree',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Subscribe to newsletter',
    hint: 'You can unsubscribe at any time',
    name: 'subscribe',
  },
};

export const Required: Story = {
  args: {
    label: 'I agree to the terms and conditions',
    required: true,
    name: 'agree',
  },
};

export const WithError: Story = {
  args: {
    label: 'I agree to the terms and conditions',
    error: 'You must agree to continue',
    name: 'agree',
  },
};

export const Disabled: Story = {
  args: {
    label: 'This option is not available',
    disabled: true,
    name: 'unavailable',
  },
};

export const WithReactHookForm: Story = {
  render: () => {
    const schema = z.object({
      terms: z.boolean().refine(val => val === true, {
        message: 'You must agree to the terms and conditions',
      }),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { terms: false },
      });

      const onSubmit = (_data: FormData) => {
        // Form data logged via alert for demo
        alert('Terms accepted!');
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="terms"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <CheckboxField
                    {...field}
                    checked={field.value}
                    label="I agree to the terms and conditions"
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
