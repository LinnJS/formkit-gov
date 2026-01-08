import { Form, FormControl, FormField, FormItem, PrivacyAgreementField } from '@formkit-gov/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof PrivacyAgreementField> = {
  title: 'Fields/PrivacyAgreementField',
  component: PrivacyAgreementField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Privacy agreement field that wraps the VA Design System va-privacy-agreement web component. Displays a standardized privacy policy checkbox with a link to the privacy policy.',
      },
    },
  },
  argTypes: {
    error: { control: 'text', description: 'Error message to display' },
    checked: { control: 'boolean', description: 'Whether the checkbox is checked' },
    name: { control: 'text', description: 'Name of the field' },
  },
};

export default meta;
type Story = StoryObj<typeof PrivacyAgreementField>;

export const Default: Story = {
  args: {
    name: 'privacy',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    name: 'privacy',
  },
};

export const WithError: Story = {
  args: {
    error: 'You must accept the privacy policy before continuing',
    name: 'privacy',
  },
};

export const Required: Story = {
  args: {
    required: true,
    name: 'privacy',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    name: 'privacy',
  },
};

export const WithReactHookForm: Story = {
  render: () => {
    const schema = z.object({
      privacy: z.boolean().refine(val => val === true, {
        message: 'You must accept the privacy policy before continuing',
      }),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { privacy: false },
      });

      const onSubmit = (_data: FormData) => {
        // Form data logged via alert for demo
        alert('Privacy policy accepted!');
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="privacy"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <PrivacyAgreementField
                    {...field}
                    checked={field.value}
                    error={fieldState.error?.message}
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
