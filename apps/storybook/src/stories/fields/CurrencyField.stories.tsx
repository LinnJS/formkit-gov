import { createCurrencySchema } from '@formkit-gov/core';
import {
  CurrencyField,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from '@formkit-gov/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof CurrencyField> = {
  title: 'Fields/CurrencyField',
  component: CurrencyField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Currency input field that wraps the VA Design System va-text-input web component. Optimized for entering monetary values with decimal keyboard support on mobile devices.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label for the input' },
    hint: { control: 'text', description: 'Hint text displayed below the label' },
    error: { control: 'text', description: 'Error message to display' },
    required: { control: 'boolean', description: 'Whether the field is required' },
    disabled: { control: 'boolean', description: 'Whether the field is disabled' },
    currency: {
      control: 'text',
      description: 'Currency symbol to display',
      defaultValue: '$',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CurrencyField>;

export const Default: Story = {
  args: {
    label: 'Donation amount',
    name: 'amount',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Loan amount',
    hint: 'Enter the total amount you wish to borrow',
    name: 'loanAmount',
  },
};

export const Required: Story = {
  args: {
    label: 'Donation amount',
    required: true,
    name: 'amount',
  },
};

export const WithError: Story = {
  args: {
    label: 'Donation amount',
    error: 'Enter a valid dollar amount',
    name: 'amount',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Donation amount',
    disabled: true,
    value: '1234.56',
    name: 'amount',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Donation amount',
    value: '500.00',
    name: 'amount',
  },
};

export const CustomCurrency: Story = {
  args: {
    label: 'Euro amount',
    currency: '€',
    name: 'euroAmount',
  },
};

export const WithMinMax: Story = {
  args: {
    label: 'Donation amount',
    hint: 'Minimum $10.00, maximum $10,000.00',
    name: 'amount',
  },
};

/**
 * Example showing integration with React Hook Form and Zod validation
 */
export const WithReactHookForm: Story = {
  render: () => {
    const schema = z.object({
      amount: createCurrencySchema({ min: 1, max: 1000000 }),
    });

    // Input type is string, output type is number after transform
    type FormInput = { amount: string };

    function FormExample() {
      const form = useForm<FormInput>({
        resolver: standardSchemaResolver(schema) as never,
        defaultValues: { amount: '' },
      });

      const onSubmit = (data: FormInput) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', data);
        alert(`Amount: $${data.amount}`);
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="amount"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <CurrencyField
                    {...field}
                    required
                    error={fieldState.error?.message}
                    label="Donation amount"
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
 * Full form example with currency validation
 */
export const CompleteFormExample: Story = {
  render: () => {
    const schema = z.object({
      donation: createCurrencySchema({ min: 10, max: 10000 }),
      goalAmount: createCurrencySchema({ min: 100, max: 100000 }),
    });

    // Input type is string, output type is number after transform
    type FormInput = { donation: string; goalAmount: string };

    function FormExample() {
      const form = useForm<FormInput>({
        resolver: standardSchemaResolver(schema) as never,
        defaultValues: { donation: '', goalAmount: '' },
      });

      const onSubmit = (data: FormInput) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', data);
        alert(JSON.stringify(data, null, 2));
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FormField
              control={form.control}
              name="donation"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <CurrencyField
                      {...field}
                      required
                      error={fieldState.error?.message}
                      hint="Minimum $10.00, maximum $10,000.00"
                      label="Donation amount"
                    />
                  </FormControl>
                  <FormDescription>Enter your one-time donation amount.</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="goalAmount"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <CurrencyField
                      {...field}
                      required
                      error={fieldState.error?.message}
                      hint="Minimum $100.00, maximum $100,000.00"
                      label="Fundraising goal"
                    />
                  </FormControl>
                  <FormDescription>Set your fundraising goal amount.</FormDescription>
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
