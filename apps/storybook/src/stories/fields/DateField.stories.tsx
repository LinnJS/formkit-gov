import { createDateSchema } from '@formkit-gov/core';
import {
  DateField,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from '@formkit-gov/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DateField> = {
  title: 'Fields/DateField',
  component: DateField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Date input field that wraps the VA Design System va-date web component. Supports full dates (MM/DD/YYYY) and month-year only formats. Integrates with React Hook Form and Zod validation.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label for the date input' },
    hint: { control: 'text', description: 'Hint text displayed below the label' },
    error: { control: 'text', description: 'Error message to display' },
    required: { control: 'boolean', description: 'Whether the field is required' },
    disabled: { control: 'boolean', description: 'Whether the field is disabled' },
    monthYearOnly: {
      control: 'boolean',
      description: 'Whether to display only month and year inputs',
    },
    monthOptional: {
      control: 'boolean',
      description: 'Whether the month is optional when monthYearOnly is true',
    },
    uswds: {
      control: 'boolean',
      description: 'Whether to use USWDS styling',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateField>;

export const Default: Story = {
  args: {
    label: 'Date of birth',
    name: 'dateOfBirth',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Date of birth',
    hint: 'Enter your date of birth in MM/DD/YYYY format',
    name: 'dateOfBirth',
  },
};

export const Required: Story = {
  args: {
    label: 'Date of birth',
    required: true,
    name: 'dateOfBirth',
  },
};

export const WithError: Story = {
  args: {
    label: 'Date of birth',
    error: 'Date must be in the past',
    name: 'dateOfBirth',
  },
};

export const MonthYearOnly: Story = {
  args: {
    label: 'Expected completion date',
    monthYearOnly: true,
    name: 'completionDate',
  },
};

export const MonthYearWithOptionalMonth: Story = {
  args: {
    label: 'Approximate date',
    monthYearOnly: true,
    monthOptional: true,
    hint: 'Month is optional',
    name: 'approximateDate',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Date of birth',
    disabled: true,
    value: '1990-01-15',
    name: 'dateOfBirth',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Date of birth',
    value: '1990-01-15',
    name: 'dateOfBirth',
  },
};

/**
 * Example showing integration with React Hook Form and Zod validation
 */
export const WithReactHookForm: Story = {
  render: () => {
    const schema = z.object({
      dateOfBirth: createDateSchema({
        pastOnly: true,
        messages: {
          required: 'Date of birth is required',
          invalid: 'Enter a valid date',
          past: 'Date of birth must be in the past',
        },
      }),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { dateOfBirth: '' },
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        alert(`Date of birth: ${data.dateOfBirth}`);
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <DateField
                    {...field}
                    label="Date of birth"
                    hint="Must be a date in the past"
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
 * Example showing date validation with min and max dates
 */
export const WithDateRangeValidation: Story = {
  render: () => {
    const minDate = new Date('2020-01-01');
    const maxDate = new Date('2025-12-31');

    const schema = z.object({
      eventDate: createDateSchema({
        minDate,
        maxDate,
        messages: {
          required: 'Event date is required',
          invalid: 'Enter a valid date',
          min: 'Date must be on or after January 1, 2020',
          max: 'Date must be on or before December 31, 2025',
        },
      }),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { eventDate: '' },
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        alert(`Event date: ${data.eventDate}`);
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="eventDate"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <DateField
                    {...field}
                    label="Event date"
                    hint="Must be between January 1, 2020 and December 31, 2025"
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
 * Complete form example with multiple date fields
 */
export const CompleteFormExample: Story = {
  render: () => {
    const schema = z.object({
      dateOfBirth: createDateSchema({
        pastOnly: true,
        messages: {
          required: 'Date of birth is required',
          past: 'Date of birth must be in the past',
        },
      }),
      startDate: createDateSchema({
        messages: {
          required: 'Start date is required',
        },
      }),
      expectedCompletion: createDateSchema({
        required: false,
      }),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { dateOfBirth: '', startDate: '', expectedCompletion: '' },
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
              name="dateOfBirth"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <DateField
                      {...field}
                      label="Date of birth"
                      hint="Enter your date of birth"
                      error={fieldState.error?.message}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <DateField
                      {...field}
                      label="Start date"
                      error={fieldState.error?.message}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedCompletion"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <DateField
                      {...field}
                      label="Expected completion (optional)"
                      monthYearOnly
                      error={fieldState.error?.message}
                    />
                  </FormControl>
                  <FormDescription>This is an optional field. Month and year only.</FormDescription>
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
