import { createTextSchema } from '@formkit-gov/core';
import { TextareaField, Form, FormField, FormItem, FormControl } from '@formkit-gov/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextareaField> = {
  title: 'Fields/TextareaField',
  component: TextareaField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Textarea field that wraps the VA Design System va-textarea web component. Useful for multi-line text input.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label for the textarea' },
    hint: { control: 'text', description: 'Hint text displayed below the label' },
    error: { control: 'text', description: 'Error message to display' },
    required: { control: 'boolean', description: 'Whether the field is required' },
    maxlength: { control: 'number', description: 'Maximum character length' },
  },
};

export default meta;
type Story = StoryObj<typeof TextareaField>;

export const Default: Story = {
  args: {
    label: 'Additional comments',
    name: 'comments',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Additional comments',
    hint: 'Provide any additional information that may help us process your request',
    name: 'comments',
  },
};

export const Required: Story = {
  args: {
    label: 'Reason for request',
    required: true,
    name: 'reason',
  },
};

export const WithError: Story = {
  args: {
    label: 'Additional comments',
    error: 'Please provide at least 10 characters',
    name: 'comments',
  },
};

export const WithMaxLength: Story = {
  args: {
    label: 'Additional comments',
    maxlength: 500,
    hint: 'Maximum 500 characters',
    name: 'comments',
  },
};

export const WithReactHookForm: Story = {
  render: () => {
    const schema = z.object({
      comments: createTextSchema({ min: 10, max: 500 }),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { comments: '' },
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        alert(`Comments: ${data.comments}`);
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="comments"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <TextareaField
                    {...field}
                    label="Additional comments"
                    hint="Minimum 10 characters, maximum 500 characters"
                    maxlength={500}
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
