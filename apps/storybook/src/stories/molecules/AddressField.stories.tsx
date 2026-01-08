import { createAddressSchema } from '@formkit-gov/core';
import {
  AddressField,
  DEFAULT_US_STATES,
  Form,
  FormControl,
  FormField,
  FormItem,
  SelectField,
  TextInputField,
} from '@formkit-gov/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof AddressField> = {
  title: 'Molecules/AddressField',
  component: AddressField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Molecular component for collecting complete US mailing addresses. Combines street address, city, state, and ZIP code fields with optional street line 2 and country fields.',
      },
    },
  },
  argTypes: {
    legend: { control: 'text', description: 'Legend text for the fieldset' },
  },
};

export default meta;
type Story = StoryObj<typeof AddressField>;

export const Default: Story = {
  args: {
    legend: 'Mailing address',
  },
};

export const WithStreet2: Story = {
  args: {
    legend: 'Mailing address',
    street2: {
      show: true,
      label: 'Street address line 2',
      hint: 'Apartment, suite, or building number',
    },
  },
};

export const WithCountry: Story = {
  args: {
    legend: 'International address',
    street2: { show: true },
    country: {
      show: true,
      label: 'Country',
    },
  },
};

export const Required: Story = {
  args: {
    legend: 'Mailing address',
    street: {
      label: 'Street address',
      required: true,
      hint: 'Include your house number and street name',
    },
    city: {
      label: 'City',
      required: true,
    },
    state: {
      label: 'State',
      required: true,
    },
    zipCode: {
      label: 'ZIP code',
      required: true,
      hint: 'Enter 5-digit ZIP code',
    },
  },
};

export const WithErrors: Story = {
  args: {
    legend: 'Mailing address',
    street: {
      required: true,
      error: 'Street address is required',
    },
    city: {
      required: true,
      error: 'City is required',
    },
    state: {
      required: true,
      error: 'State is required',
    },
    zipCode: {
      required: true,
      error: 'ZIP code is required',
    },
  },
};

export const WithCustomStates: Story = {
  args: {
    legend: 'West Coast address',
    state: {
      options: [
        { label: 'California', value: 'CA' },
        { label: 'Oregon', value: 'OR' },
        { label: 'Washington', value: 'WA' },
      ],
    },
  },
};

export const Controlled: Story = {
  render: () => {
    function ControlledExample() {
      const [address, setAddress] = useState({
        street: '1600 Pennsylvania Avenue NW',
        city: 'Washington',
        state: 'DC',
        zipCode: '20500',
      });

      const handleChange = (field: string, value: string) => {
        setAddress(prev => ({ ...prev, [field]: value }));
      };

      return (
        <div>
          <AddressField legend="Mailing address" values={address} onChange={handleChange} />
          <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f0f0' }}>
            <h3>Current values:</h3>
            <pre>{JSON.stringify(address, null, 2)}</pre>
          </div>
        </div>
      );
    }

    return <ControlledExample />;
  },
};

export const WithReactHookForm: Story = {
  render: () => {
    const schema = z.object({
      address: createAddressSchema({
        required: true,
        messages: {
          required: 'This field is required',
          streetInvalid: 'Enter a valid street address',
          cityInvalid: 'Enter a valid city name',
          stateInvalid: 'Please select a state',
          zipInvalid: 'Enter a valid 5-digit ZIP code',
        },
      }),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: {
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
          },
        },
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        alert(JSON.stringify(data.address, null, 2));
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
            <legend style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
              Mailing address
            </legend>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <FormField
                control={form.control}
                name="address.street"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <TextInputField
                        {...field}
                        required
                        autocomplete="address-line1"
                        error={fieldState.error?.message}
                        label="Street address"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.city"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <TextInputField
                        {...field}
                        required
                        autocomplete="address-level2"
                        error={fieldState.error?.message}
                        label="City"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormField
                  control={form.control}
                  name="address.state"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <SelectField
                          {...field}
                          required
                          error={fieldState.error?.message}
                          label="State"
                          options={DEFAULT_US_STATES}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.zipCode"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <TextInputField
                          {...field}
                          required
                          autocomplete="postal-code"
                          error={fieldState.error?.message}
                          inputmode="numeric"
                          label="ZIP code"
                          maxlength={10}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </fieldset>

          <div style={{ marginTop: '1rem' }}>
            <button type="submit">Submit</button>
          </div>
        </Form>
      );
    }

    return <FormExample />;
  },
};

export const WithAllFields: Story = {
  args: {
    legend: 'Complete address',
    street: {
      label: 'Street address',
      required: true,
    },
    street2: {
      show: true,
      label: 'Street address line 2',
      hint: 'Apartment, suite, or building number (optional)',
    },
    city: {
      label: 'City',
      required: true,
    },
    state: {
      label: 'State',
      required: true,
    },
    zipCode: {
      label: 'ZIP code',
      required: true,
      hint: '5-digit ZIP code',
    },
    country: {
      show: true,
      label: 'Country',
    },
  },
};
