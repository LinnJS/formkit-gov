import { createDateSchema } from '@formkit-gov/core';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  MemorableDateField,
} from '@formkit-gov/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MemorableDateField> = {
  title: 'Fields/MemorableDateField',
  component: MemorableDateField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Memorable date field that wraps the VA Design System va-memorable-date web component. Designed for dates the user knows well (like their birthday) and uses separate month/day/year input fields.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label for the date input' },
    hint: { control: 'text', description: 'Hint text displayed below the label' },
    error: { control: 'text', description: 'Error message to display' },
    required: { control: 'boolean', description: 'Whether the field is required' },
    disabled: { control: 'boolean', description: 'Whether the field is disabled' },
    monthSelect: {
      control: 'boolean',
      description: 'Whether to use a select dropdown for the month field',
    },
    uswds: { control: 'boolean', description: 'Whether to use USWDS styling' },
  },
};

export default meta;
type Story = StoryObj<typeof MemorableDateField>;

export const Default: Story = {
  args: {
    label: 'Date of birth',
    name: 'birthDate',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Date of birth',
    hint: 'For example: January 15, 1990',
    name: 'birthDate',
  },
};

export const Required: Story = {
  args: {
    label: 'Date of birth',
    required: true,
    name: 'birthDate',
  },
};

export const WithError: Story = {
  args: {
    label: 'Date of birth',
    error: 'Enter a valid date',
    name: 'birthDate',
  },
};

export const MonthSelect: Story = {
  args: {
    label: 'Date of birth',
    monthSelect: true,
    hint: 'Select month from dropdown',
    name: 'birthDate',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Date of birth',
    disabled: true,
    value: '1990-01-15',
    name: 'birthDate',
  },
};

export const BirthDate: Story = {
  args: {
    label: 'Date of birth',
    hint: 'This should be a date you know well',
    required: true,
    monthSelect: true,
    name: 'birthDate',
  },
};

/**
 * Example showing integration with React Hook Form and Zod validation
 */
export const WithReactHookForm: Story = {
  render: () => {
    const schema = z.object({
      birthDate: createDateSchema({ required: true, pastOnly: true }),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { birthDate: '' },
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        alert(`Birth date: ${data.birthDate}`);
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <MemorableDateField
                    {...field}
                    monthSelect
                    required
                    error={fieldState.error?.message}
                    hint="This date must be in the past"
                    label="Date of birth"
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
 * Full form example with multiple date fields and validation
 */
export const CompleteFormExample: Story = {
  render: () => {
    const schema = z.object({
      birthDate: createDateSchema({
        required: true,
        pastOnly: true,
        messages: {
          required: 'Date of birth is required',
          past: 'Birth date must be in the past',
        },
      }),
      startDate: createDateSchema({
        required: true,
        messages: {
          required: 'Start date is required',
        },
      }),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { birthDate: '', startDate: '' },
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
              name="birthDate"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <MemorableDateField
                      {...field}
                      monthSelect
                      required
                      error={fieldState.error?.message}
                      hint="This should be a date you know well"
                      label="Date of birth"
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your birth date using the month, day, and year fields.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <MemorableDateField
                      {...field}
                      required
                      error={fieldState.error?.message}
                      hint="When did you start?"
                      label="Start date"
                    />
                  </FormControl>
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
