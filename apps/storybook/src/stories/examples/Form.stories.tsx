/**
 * Full Form Examples
 *
 * This file demonstrates complete form setups using FormKit Gov with React Hook Form
 * and Zod validation. These examples show the recommended patterns for building
 * production-ready government forms.
 *
 * Key concepts demonstrated:
 * - React Hook Form setup with useForm
 * - Zod schema validation with standardSchemaResolver
 * - Form components (Form, FormField, FormItem, FormLabel, FormControl, FormMessage)
 * - Multiple field types with validation
 * - Error handling and display
 * - Form submission
 */

import {
  createDateSchema,
  createEmailSchema,
  createPhoneSchema,
  createSSNSchema,
  createTextSchema,
} from '@formkit-gov/core';
import {
  CheckboxField,
  DateField,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  PhoneField,
  RadioField,
  SelectField,
  SSNField,
  TextareaField,
  TextInputField,
} from '@formkit-gov/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Examples/Form',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Complete form examples demonstrating React Hook Form integration with Zod validation and FormKit Gov components. These examples follow the patterns shown in the project README and represent production-ready form implementations.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Basic Contact Form
 *
 * A simple form demonstrating the fundamental pattern:
 * 1. Define a Zod schema for validation
 * 2. Set up React Hook Form with standardSchemaResolver
 * 3. Use Form components for layout and error handling
 * 4. Handle form submission
 *
 * This example uses basic text and email fields with validation.
 */
export const BasicForm: Story = {
  render: () => {
    // Define validation schema using Zod
    const schema = z.object({
      firstName: createTextSchema({ min: 2, max: 50 }),
      lastName: createTextSchema({ min: 2, max: 50 }),
      email: createEmailSchema(),
    });

    type FormData = z.infer<typeof schema>;

    function ContactForm() {
      // Initialize form with React Hook Form
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: {
          firstName: '',
          lastName: '',
          email: '',
        },
      });

      // Handle form submission
      const onSubmit = (data: FormData) => {
        // ⚠️ DEMO ONLY - In production, send data securely to your API over HTTPS
        // Never display PII in alerts or console logs
        alert(JSON.stringify(data, null, 2));
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}
          >
            {/* First Name Field */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <TextInputField
                      {...field}
                      required
                      error={fieldState.error?.message}
                      label="First name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name Field */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <TextInputField
                      {...field}
                      required
                      error={fieldState.error?.message}
                      label="Last name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <TextInputField
                      {...field}
                      required
                      error={fieldState.error?.message}
                      label="Email address"
                      type="email"
                    />
                  </FormControl>
                  <FormDescription>
                    We will never share your email with anyone else.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div>
              <button
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#0071bb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      );
    }

    return <ContactForm />;
  },
};

/**
 * Complete Application Form
 *
 * A comprehensive example showing various field types:
 * - Text inputs (first name, last name)
 * - Email input with validation
 * - Phone number with formatting
 * - Date of birth with past-only validation
 * - SSN with masking
 * - Select dropdown for state selection
 * - Radio buttons for yes/no questions
 * - Checkbox for terms agreement
 * - Textarea for additional information
 *
 * This demonstrates a realistic government application form.
 */
export const CompleteForm: Story = {
  render: () => {
    // Comprehensive schema with multiple field types
    const schema = z.object({
      // Personal Information
      firstName: createTextSchema({ min: 2, max: 50 }),
      lastName: createTextSchema({ min: 2, max: 50 }),
      email: createEmailSchema(),
      phone: createPhoneSchema(),
      dateOfBirth: createDateSchema({
        pastOnly: true,
        messages: {
          required: 'Date of birth is required',
          past: 'Date of birth must be in the past',
        },
      }),
      ssn: createSSNSchema(),

      // Address
      state: z.string().min(1, 'Please select a state'),

      // Veteran Status
      isVeteran: z.enum(['yes', 'no'], {
        message: 'Please indicate if you are a veteran',
      }),

      // Notifications
      emailNotifications: z.boolean().default(false),

      // Additional Information
      additionalInfo: z.string().optional(),

      // Terms
      termsAgreed: z.boolean().refine(val => val === true, {
        message: 'You must agree to the terms and conditions',
      }),
    });

    type FormData = z.infer<typeof schema>;

    function ApplicationForm() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          ssn: '',
          state: '',
          isVeteran: undefined,
          emailNotifications: false,
          additionalInfo: '',
          termsAgreed: false,
        },
      });

      const onSubmit = (data: FormData) => {
        // ⚠️ DEMO ONLY - In production, send data securely to your API over HTTPS
        // Never display PII (SSN, etc.) in alerts or console logs
        alert(JSON.stringify(data, null, 2));
      };

      const stateOptions = [
        { label: 'Select a state', value: '' },
        { label: 'Alabama', value: 'AL' },
        { label: 'Alaska', value: 'AK' },
        { label: 'Arizona', value: 'AZ' },
        { label: 'Arkansas', value: 'AR' },
        { label: 'California', value: 'CA' },
        { label: 'Colorado', value: 'CO' },
        { label: 'Connecticut', value: 'CT' },
        { label: 'Delaware', value: 'DE' },
        { label: 'Florida', value: 'FL' },
        { label: 'Georgia', value: 'GA' },
      ];

      const veteranOptions = [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ];

      return (
        <Form form={form} onSubmit={onSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
            {/* Personal Information Section */}
            <div>
              <h3 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                Personal Information
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <TextInputField
                          {...field}
                          required
                          error={fieldState.error?.message}
                          label="First name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <TextInputField
                          {...field}
                          required
                          error={fieldState.error?.message}
                          label="Last name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <DateField
                          {...field}
                          required
                          error={fieldState.error?.message}
                          hint="Enter your date of birth (MM/DD/YYYY)"
                          label="Date of birth"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ssn"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <SSNField
                          {...field}
                          required
                          error={fieldState.error?.message}
                          hint="Enter your 9-digit SSN"
                          label="Social Security Number"
                        />
                      </FormControl>
                      <FormDescription>
                        Your SSN is used for identity verification only.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Contact Information Section */}
            <div>
              <h3 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                Contact Information
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <TextInputField
                          {...field}
                          required
                          error={fieldState.error?.message}
                          label="Email address"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <PhoneField
                          {...field}
                          required
                          error={fieldState.error?.message}
                          hint="Enter a 10-digit phone number"
                          label="Phone number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <SelectField
                          {...field}
                          required
                          error={fieldState.error?.message}
                          label="State"
                          options={stateOptions}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Veteran Status Section */}
            <div>
              <h3 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                Veteran Status
              </h3>

              <FormField
                control={form.control}
                name="isVeteran"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <RadioField
                        {...field}
                        required
                        error={fieldState.error?.message}
                        label="Are you a veteran?"
                        options={veteranOptions}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Additional Information Section */}
            <div>
              <h3 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                Additional Information
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <TextareaField
                          {...field}
                          error={fieldState.error?.message}
                          hint="Provide any additional information that may be relevant"
                          label="Additional information (optional)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailNotifications"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <CheckboxField
                          {...field}
                          checked={field.value}
                          error={fieldState.error?.message}
                          label="Send me email notifications about my application"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div>
              <FormField
                control={form.control}
                name="termsAgreed"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <CheckboxField
                        {...field}
                        required
                        checked={field.value}
                        error={fieldState.error?.message}
                        label="I agree to the terms and conditions"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#0071bb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
                type="submit"
              >
                Submit Application
              </button>
            </div>
          </div>
        </Form>
      );
    }

    return <ApplicationForm />;
  },
};

/**
 * Form with Real-Time Validation
 *
 * This example demonstrates accessible real-time validation:
 * - Uses `mode: 'onBlur'` to validate when user leaves a field
 * - Errors automatically clear when field becomes valid
 * - Focus moves to first invalid field on submit (for screen readers)
 *
 * This pattern provides immediate feedback while avoiding
 * distracting error messages while the user is still typing.
 */
export const WithRealTimeValidation: Story = {
  render: () => {
    const schema = z.object({
      firstName: createTextSchema({ min: 2, max: 50 }),
      lastName: createTextSchema({ min: 2, max: 50 }),
      email: createEmailSchema(),
    });

    type FormData = z.infer<typeof schema>;

    function RealTimeValidationForm() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: {
          firstName: '',
          lastName: '',
          email: '',
        },
        // Validate on blur - errors clear when field becomes valid
        mode: 'onBlur',
      });

      const onSubmit = (data: FormData) => {
        alert('Form submitted successfully!\n\n' + JSON.stringify(data, null, 2));
      };

      return (
        <Form
          form={form}
          onSubmit={onSubmit}
          // focusOnError is true by default - focus moves to first invalid field
          onValidationError={errors => {
            // Optional: Log validation errors for debugging
            console.log('Validation failed:', Object.keys(errors));
          }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}
          >
            <div
              style={{
                padding: '1rem',
                backgroundColor: '#e7f4e4',
                border: '1px solid #4aa564',
                borderRadius: '4px',
                marginBottom: '1rem',
              }}
            >
              <strong>Accessibility features:</strong>
              <ul style={{ margin: '0.5rem 0 0 1.5rem', padding: 0 }}>
                <li>Errors appear when you leave a field (blur)</li>
                <li>Errors clear automatically when you fix the value</li>
                <li>On submit, focus moves to the first invalid field</li>
              </ul>
            </div>

            <FormField
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <TextInputField
                      {...field}
                      required
                      error={fieldState.error?.message}
                      hint="Enter at least 2 characters, then click elsewhere"
                      label="First name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <TextInputField
                      {...field}
                      required
                      error={fieldState.error?.message}
                      label="Last name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <TextInputField
                      {...field}
                      required
                      error={fieldState.error?.message}
                      label="Email address"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <button
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#0071bb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      );
    }

    return <RealTimeValidationForm />;
  },
};

/**
 * Form with Validation Errors
 *
 * This example pre-fills the form with invalid data to demonstrate
 * error handling and validation messages. Useful for:
 * - Testing error states
 * - Validating error message styling
 * - Ensuring accessibility of error messages
 * - Demonstrating validation rules
 *
 * Try submitting the form to see all validation errors at once.
 */
export const WithValidationErrors: Story = {
  render: () => {
    const schema = z.object({
      firstName: createTextSchema({ min: 2, max: 50 }),
      lastName: createTextSchema({ min: 2, max: 50 }),
      email: createEmailSchema(),
      phone: createPhoneSchema(),
      state: z.string().min(1, 'Please select a state'),
      termsAgreed: z.boolean().refine(val => val === true, {
        message: 'You must agree to the terms and conditions',
      }),
    });

    type FormData = z.infer<typeof schema>;

    function FormWithErrors() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        // Pre-fill with invalid data to show errors
        defaultValues: {
          firstName: 'J', // Too short (min 2 characters)
          lastName: '', // Required but empty
          email: 'invalid-email', // Invalid email format
          phone: '123', // Invalid phone number
          state: '', // Required but empty
          termsAgreed: false, // Required to be true
        },
        // Set mode to 'onChange' to show errors immediately
        mode: 'onChange',
      });

      const onSubmit = (data: FormData) => {
        // ⚠️ DEMO ONLY - In production, send data securely to your API
        alert('Form is valid!\n\n' + JSON.stringify(data, null, 2));
      };

      const stateOptions = [
        { label: 'Select a state', value: '' },
        { label: 'California', value: 'CA' },
        { label: 'New York', value: 'NY' },
        { label: 'Texas', value: 'TX' },
      ];

      return (
        <Form form={form} onSubmit={onSubmit}>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}
          >
            <div
              style={{
                padding: '1rem',
                backgroundColor: '#f9f0f0',
                border: '1px solid #d4a5a5',
                borderRadius: '4px',
                marginBottom: '1rem',
              }}
            >
              <strong>Note:</strong> This form is pre-filled with invalid data to demonstrate
              validation error states. Try correcting the errors and submitting the form.
            </div>

            <FormField
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <TextInputField
                      {...field}
                      required
                      error={fieldState.error?.message}
                      hint="Must be at least 2 characters"
                      label="First name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <TextInputField
                      {...field}
                      required
                      error={fieldState.error?.message}
                      label="Last name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <TextInputField
                      {...field}
                      required
                      error={fieldState.error?.message}
                      label="Email address"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <PhoneField
                      {...field}
                      required
                      error={fieldState.error?.message}
                      hint="Must be a valid 10-digit phone number"
                      label="Phone number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <SelectField
                      {...field}
                      required
                      error={fieldState.error?.message}
                      label="State"
                      options={stateOptions}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="termsAgreed"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <CheckboxField
                      {...field}
                      required
                      checked={field.value}
                      error={fieldState.error?.message}
                      label="I agree to the terms and conditions"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <button
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#0071bb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
                type="submit"
              >
                Submit
              </button>
              <button
                style={{
                  marginLeft: '1rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#f5f5f5',
                  color: '#333',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
                type="button"
                onClick={() => form.reset()}
              >
                Reset
              </button>
            </div>
          </div>
        </Form>
      );
    }

    return <FormWithErrors />;
  },
};
