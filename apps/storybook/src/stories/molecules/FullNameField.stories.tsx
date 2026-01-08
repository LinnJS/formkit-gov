import { createFullNameSchema } from '@formkit-gov/core';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FullNameField,
} from '@formkit-gov/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof FullNameField> = {
  title: 'Molecules/FullNameField',
  component: FullNameField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "Molecular component that combines multiple text input fields for collecting a person's full name. Supports first name, middle name, last name, and suffix fields with flexible configuration.",
      },
    },
  },
  argTypes: {
    legend: { control: 'text', description: 'Legend text for the fieldset' },
  },
};

export default meta;
type Story = StoryObj<typeof FullNameField>;

export const Default: Story = {
  args: {
    firstName: { label: 'First name', required: true },
    lastName: { label: 'Last name', required: true },
  },
};

export const WithMiddleName: Story = {
  args: {
    firstName: { label: 'First name', required: true },
    middleName: { label: 'Middle name', show: true },
    lastName: { label: 'Last name', required: true },
  },
};

export const WithSuffix: Story = {
  args: {
    firstName: { label: 'First name', required: true },
    lastName: { label: 'Last name', required: true },
    suffix: { label: 'Suffix', show: true },
  },
};

export const Complete: Story = {
  args: {
    legend: 'Full legal name',
    firstName: { label: 'First name', required: true },
    middleName: { label: 'Middle name', show: true },
    lastName: { label: 'Last name', required: true },
    suffix: { label: 'Suffix', show: true },
  },
};

export const WithHints: Story = {
  args: {
    legend: 'Your name',
    firstName: {
      label: 'First name',
      hint: 'Enter your legal first name',
      required: true,
    },
    middleName: {
      label: 'Middle name',
      hint: 'Optional middle name or initial',
      show: true,
    },
    lastName: {
      label: 'Last name',
      hint: 'Enter your legal last name',
      required: true,
    },
  },
};

export const Required: Story = {
  args: {
    firstName: { label: 'First name', required: true },
    lastName: { label: 'Last name', required: true },
  },
};

export const WithErrors: Story = {
  args: {
    firstName: {
      label: 'First name',
      required: true,
      error: 'First name is required',
    },
    middleName: { label: 'Middle name', show: true },
    lastName: {
      label: 'Last name',
      required: true,
      error: 'Last name is required',
    },
  },
};

export const CustomSuffixOptions: Story = {
  args: {
    firstName: { label: 'First name', required: true },
    lastName: { label: 'Last name', required: true },
    suffix: {
      label: 'Suffix',
      show: true,
      options: [
        { label: '- Select -', value: '' },
        { label: 'Junior', value: 'Jr.' },
        { label: 'Senior', value: 'Sr.' },
        { label: 'The Second', value: 'II' },
        { label: 'The Third', value: 'III' },
      ],
    },
  },
};

/**
 * Controlled component example with state management
 */
export const Controlled: Story = {
  render: () => {
    function ControlledExample() {
      const [values, setValues] = useState({
        first: 'John',
        middle: 'William',
        last: 'Doe',
        suffix: 'Jr.',
      });

      const handleChange = (field: 'first' | 'middle' | 'last' | 'suffix', value: string) => {
        setValues(prev => ({ ...prev, [field]: value }));
      };

      return (
        <div>
          <FullNameField
            firstName={{ label: 'First name', required: true }}
            lastName={{ label: 'Last name', required: true }}
            legend="Your name"
            middleName={{ label: 'Middle name', show: true }}
            suffix={{ label: 'Suffix', show: true }}
            values={values}
            onChange={handleChange}
          />
          <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f0f0' }}>
            <strong>Current values:</strong>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </div>
        </div>
      );
    }

    return <ControlledExample />;
  },
};

/**
 * Integration with React Hook Form and Zod validation
 */
export const WithReactHookForm: Story = {
  render: () => {
    const schema = z.object({
      name: createFullNameSchema({ required: true }),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: {
          name: {
            first: '',
            middle: '',
            last: '',
            suffix: '',
          },
        },
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        alert(JSON.stringify(data, null, 2));
      };

      // Access nested errors from formState for object fields
      const nameErrors = form.formState.errors.name as
        | {
            first?: { message?: string };
            middle?: { message?: string };
            last?: { message?: string };
            suffix?: { message?: string };
          }
        | undefined;

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="name"
            render={() => (
              <FormItem>
                <FormControl>
                  <FullNameField
                    firstName={{
                      label: 'First name',
                      required: true,
                      error: nameErrors?.first?.message,
                    }}
                    lastName={{
                      label: 'Last name',
                      required: true,
                      error: nameErrors?.last?.message,
                    }}
                    legend="Full legal name"
                    middleName={{
                      label: 'Middle name',
                      show: true,
                      error: nameErrors?.middle?.message,
                    }}
                    suffix={{
                      label: 'Suffix',
                      show: true,
                      error: nameErrors?.suffix?.message,
                    }}
                    values={{
                      first: form.watch('name.first'),
                      middle: form.watch('name.middle'),
                      last: form.watch('name.last'),
                      suffix: form.watch('name.suffix'),
                    }}
                    onChange={(field, value) => {
                      form.setValue(`name.${field}`, value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div style={{ marginTop: '1rem' }}>
            <button type="submit">Submit</button>
            <button style={{ marginLeft: '0.5rem' }} type="button" onClick={() => form.reset()}>
              Reset
            </button>
          </div>
        </Form>
      );
    }

    return <FormExample />;
  },
};

/**
 * Example showing individual field registration with React Hook Form
 */
export const WithIndividualFields: Story = {
  render: () => {
    const schema = z.object({
      firstName: z.string().min(1, 'First name is required'),
      middleName: z.string().optional(),
      lastName: z.string().min(1, 'Last name is required'),
      suffix: z.string().optional(),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: {
          firstName: '',
          middleName: '',
          lastName: '',
          suffix: '',
        },
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        alert(JSON.stringify(data, null, 2));
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FullNameField
            firstName={{
              label: 'First name',
              required: true,
              error: form.formState.errors.firstName?.message,
            }}
            lastName={{
              label: 'Last name',
              required: true,
              error: form.formState.errors.lastName?.message,
            }}
            legend="Personal information"
            middleName={{
              label: 'Middle name',
              show: true,
              error: form.formState.errors.middleName?.message,
            }}
            suffix={{
              label: 'Suffix',
              show: true,
              error: form.formState.errors.suffix?.message,
            }}
            values={{
              first: form.watch('firstName'),
              middle: form.watch('middleName'),
              last: form.watch('lastName'),
              suffix: form.watch('suffix'),
            }}
            onChange={(field, value) => {
              const fieldMap = {
                first: 'firstName',
                middle: 'middleName',
                last: 'lastName',
                suffix: 'suffix',
              } as const;
              form.setValue(fieldMap[field], value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          />
          <div style={{ marginTop: '1rem' }}>
            <button type="submit">Submit</button>
            <button style={{ marginLeft: '0.5rem' }} type="button" onClick={() => form.reset()}>
              Reset
            </button>
          </div>
        </Form>
      );
    }

    return <FormExample />;
  },
};
