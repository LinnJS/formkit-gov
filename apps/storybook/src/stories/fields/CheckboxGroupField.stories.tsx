import { CheckboxGroupField, Form, FormControl, FormField, FormItem } from '@formkit-gov/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CheckboxGroupField> = {
  title: 'Fields/CheckboxGroupField',
  component: CheckboxGroupField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Checkbox group field that wraps the VA Design System va-checkbox-group web component. Allows multiple selections from a list of options.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label for the checkbox group (fieldset legend)' },
    hint: { control: 'text', description: 'Hint text displayed below the label' },
    error: { control: 'text', description: 'Error message to display' },
    required: { control: 'boolean', description: 'Whether the field is required' },
    disabled: { control: 'boolean', description: 'Whether all options are disabled' },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxGroupField>;

const contactMethodOptions = [
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' },
  { label: 'Text message', value: 'text' },
  { label: 'Mail', value: 'mail' },
];

const benefitOptions = [
  { label: 'Healthcare', value: 'healthcare', description: 'Medical and dental benefits' },
  { label: 'Education', value: 'education', description: 'GI Bill and training assistance' },
  {
    label: 'Disability',
    value: 'disability',
    description: 'Compensation for service-connected disabilities',
  },
  {
    label: 'Housing',
    value: 'housing',
    description: 'Home loan guaranty and adapted housing grants',
  },
];

export const Default: Story = {
  args: {
    label: 'Preferred contact methods',
    name: 'contactMethods',
    options: contactMethodOptions,
  },
};

export const WithHint: Story = {
  args: {
    label: 'Preferred contact methods',
    hint: 'Select all that apply',
    name: 'contactMethods',
    options: contactMethodOptions,
  },
};

export const Required: Story = {
  args: {
    label: 'Preferred contact methods',
    hint: 'Select at least one option',
    required: true,
    name: 'contactMethods',
    options: contactMethodOptions,
  },
};

export const WithError: Story = {
  args: {
    label: 'Preferred contact methods',
    error: 'Please select at least one contact method',
    name: 'contactMethods',
    options: contactMethodOptions,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Preferred contact methods',
    disabled: true,
    value: ['email', 'phone'],
    name: 'contactMethods',
    options: contactMethodOptions,
  },
};

export const WithDescriptions: Story = {
  args: {
    label: 'VA Benefits',
    hint: 'Select the benefits you are interested in learning more about',
    name: 'benefits',
    options: benefitOptions,
  },
};

export const WithPreselectedValues: Story = {
  args: {
    label: 'Preferred contact methods',
    hint: 'Update your preferences',
    name: 'contactMethods',
    options: contactMethodOptions,
    value: ['email', 'text'],
  },
};

export const WithSomeDisabledOptions: Story = {
  args: {
    label: 'Available services',
    name: 'services',
    options: [
      { label: 'Standard shipping', value: 'standard' },
      { label: 'Express shipping', value: 'express', disabled: true },
      { label: 'Overnight shipping', value: 'overnight', disabled: true },
      { label: 'In-store pickup', value: 'pickup' },
    ],
  },
};

export const WithReactHookForm: Story = {
  render: () => {
    const schema = z.object({
      contactMethods: z.array(z.string()).min(1, 'Please select at least one contact method'),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { contactMethods: [] },
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        alert(`Selected methods: ${data.contactMethods.join(', ')}`);
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="contactMethods"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <CheckboxGroupField
                    {...field}
                    required
                    error={fieldState.error?.message}
                    hint="Select all that apply"
                    label="Preferred contact methods"
                    options={contactMethodOptions}
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
      benefits: z
        .array(z.string())
        .min(1, 'Please select at least one benefit')
        .max(3, 'You can select up to 3 benefits'),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { benefits: [] },
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        alert(`Selected benefits: ${data.benefits.join(', ')}`);
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="benefits"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <CheckboxGroupField
                    {...field}
                    required
                    error={fieldState.error?.message}
                    hint="Select 1-3 benefits you want to learn more about"
                    label="VA Benefits"
                    options={benefitOptions}
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
