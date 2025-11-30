import { Form, FormControl, FormField, FormItem, RadioField } from '@formkit-gov/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RadioField> = {
  title: 'Fields/RadioField',
  component: RadioField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Radio button group field that wraps the VA Design System va-radio web component.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label for the radio group' },
    hint: { control: 'text', description: 'Hint text displayed below the label' },
    error: { control: 'text', description: 'Error message to display' },
    required: { control: 'boolean', description: 'Whether the field is required' },
    disabled: { control: 'boolean', description: 'Whether the field is disabled' },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of radio buttons',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioField>;

const contactMethods = [
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' },
  { label: 'Mail', value: 'mail' },
];

const yesNoOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

export const Default: Story = {
  args: {
    label: 'Preferred contact method',
    name: 'contactMethod',
    options: contactMethods,
  },
};

export const WithHint: Story = {
  args: {
    label: 'Preferred contact method',
    hint: 'We will use this method to send you important updates',
    name: 'contactMethod',
    options: contactMethods,
  },
};

export const Required: Story = {
  args: {
    label: 'Preferred contact method',
    required: true,
    name: 'contactMethod',
    options: contactMethods,
  },
};

export const WithError: Story = {
  args: {
    label: 'Preferred contact method',
    error: 'Please select a contact method',
    name: 'contactMethod',
    options: contactMethods,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Preferred contact method',
    disabled: true,
    value: 'email',
    name: 'contactMethod',
    options: contactMethods,
  },
};

export const Horizontal: Story = {
  args: {
    label: 'Are you a veteran?',
    orientation: 'horizontal',
    name: 'isVeteran',
    options: yesNoOptions,
  },
};

export const WithDescriptions: Story = {
  args: {
    label: 'Preferred contact method',
    name: 'contactMethod',
    options: [
      {
        label: 'Email',
        value: 'email',
        description: 'Fastest response time, typically within 24 hours',
      },
      {
        label: 'Phone',
        value: 'phone',
        description: 'Available weekdays 9am-5pm EST',
      },
      {
        label: 'Mail',
        value: 'mail',
        description: 'Typically takes 5-7 business days',
      },
    ],
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: 'Preferred contact method',
    name: 'contactMethod',
    options: [
      { label: 'Email', value: 'email' },
      { label: 'Phone', value: 'phone', disabled: true },
      { label: 'Mail', value: 'mail' },
    ],
    hint: 'Phone option is currently unavailable',
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Preferred contact method',
    name: 'contactMethod',
    value: 'phone',
    options: contactMethods,
  },
};

export const WithReactHookForm: Story = {
  render: () => {
    const schema = z.object({
      contactMethod: z.enum(['email', 'phone', 'mail'], {
        message: 'Please select a contact method',
      }),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { contactMethod: undefined },
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        alert(`Contact method: ${data.contactMethod}`);
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="contactMethod"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <RadioField
                    {...field}
                    label="Preferred contact method"
                    options={contactMethods}
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

export const WithReactHookFormAndDescriptions: Story = {
  render: () => {
    const schema = z.object({
      notificationPreference: z.enum(['all', 'important', 'none'], {
        message: 'Please select your notification preference',
      }),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { notificationPreference: 'important' },
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        alert(`Notification preference: ${data.notificationPreference}`);
      };

      const notificationOptions = [
        {
          label: 'All notifications',
          value: 'all',
          description: 'Receive all updates and announcements',
        },
        {
          label: 'Important only',
          value: 'important',
          description: 'Receive only critical updates',
        },
        {
          label: 'None',
          value: 'none',
          description: 'Do not receive any notifications',
        },
      ];

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="notificationPreference"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <RadioField
                    {...field}
                    label="Notification preferences"
                    hint="Choose how often you want to receive updates"
                    options={notificationOptions}
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
