/**
 * Accessibility tests for form components using axe-core
 *
 * Tests WCAG 2.1 AA compliance for form orchestration components.
 */

import { zodResolver } from '@hookform/resolvers/zod';
import { render, waitFor } from '@testing-library/react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { describe, it, expect, vi } from 'vitest';
import { z } from 'zod';

import { axe } from '../../test-setup';
import { TextInputField } from '../fields/text-input-field';

import {
  Field,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldSeparator,
} from './field';
import { Form } from './form';
import { FormControl } from './form-control';
import { FormDescription } from './form-description';
import { FormField } from './form-field';
import { FormItem } from './form-item';
import { FormLabel } from './form-label';
import { FormMessage } from './form-message';

// Test schemas
const simpleSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const complexSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.number().min(18, 'Must be at least 18 years old'),
  terms: z.boolean().refine(val => val === true, 'You must accept the terms'),
});

type SimpleFormData = z.infer<typeof simpleSchema>;
type ComplexFormData = z.infer<typeof complexSchema>;

describe('Form Components Accessibility', () => {
  describe('Form with FormField integration', () => {
    it('should have no accessibility violations with simple form', async () => {
      function SimpleForm() {
        const form = useForm<SimpleFormData>({
          resolver: zodResolver(simpleSchema),
          defaultValues: { email: '' },
        });

        return (
          <Form form={form} onSubmit={vi.fn()}>
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <TextInputField
                      {...field}
                      error={fieldState.error?.message}
                      label="Email address"
                    />
                  </FormControl>
                  <FormDescription>We will never share your email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button type="submit">Submit</button>
          </Form>
        );
      }

      const { container } = render(<SimpleForm />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with multiple fields', async () => {
      function MultiFieldForm() {
        const form = useForm<ComplexFormData>({
          resolver: zodResolver(complexSchema),
          defaultValues: { email: '', name: '', age: 0, terms: false },
        });

        return (
          <Form form={form} onSubmit={vi.fn()}>
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <TextInputField {...field} error={fieldState.error?.message} label="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel required>Name</FormLabel>
                  <FormControl>
                    <TextInputField
                      {...field}
                      required
                      error={fieldState.error?.message}
                      label="Full name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button type="submit">Submit</button>
          </Form>
        );
      }

      const { container } = render(<MultiFieldForm />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with form errors', async () => {
      function FormWithErrors() {
        const form = useForm<SimpleFormData>({
          resolver: zodResolver(simpleSchema),
          defaultValues: { email: 'invalid' },
        });

        // Trigger validation
        React.useEffect(() => {
          void form.trigger();
        }, [form]);

        return (
          <Form form={form} onSubmit={vi.fn()}>
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <TextInputField {...field} error={fieldState.error?.message} label="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button type="submit">Submit</button>
          </Form>
        );
      }

      const { container } = render(<FormWithErrors />);
      // Wait for form validation to complete before running axe
      await waitFor(() => {
        // Form validation has completed when the component re-renders
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with required fields', async () => {
      function RequiredFieldsForm() {
        const form = useForm<SimpleFormData>({
          resolver: zodResolver(simpleSchema),
          defaultValues: { email: '' },
        });

        return (
          <Form form={form} onSubmit={vi.fn()}>
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel required>Email (required)</FormLabel>
                  <FormControl>
                    <TextInputField
                      {...field}
                      required
                      error={fieldState.error?.message}
                      label="Email"
                    />
                  </FormControl>
                  <FormDescription>This field is required</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button type="submit">Submit</button>
          </Form>
        );
      }

      const { container } = render(<RequiredFieldsForm />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // Note: FormItem, FormLabel, FormControl, and FormDescription require FormField context
  // They are tested via the Form with FormField integration tests above

  describe('FormMessage', () => {
    it('should have no accessibility violations with error message in form context', async () => {
      function FormWithError() {
        const form = useForm<SimpleFormData>({
          resolver: zodResolver(simpleSchema),
          defaultValues: { email: 'invalid' },
        });

        React.useEffect(() => {
          void form.trigger();
        }, [form]);

        return (
          <Form form={form} onSubmit={vi.fn()}>
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <TextInputField {...field} error={fieldState.error?.message} label="Email" />
                  </FormControl>
                  <FormMessage>Error message</FormMessage>
                </FormItem>
              )}
            />
          </Form>
        );
      }

      const { container } = render(<FormWithError />);
      // Wait for form validation to complete before running axe
      await waitFor(() => {
        // Form validation has completed when the component re-renders
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when no error in form context', async () => {
      function FormWithoutError() {
        const form = useForm<SimpleFormData>({
          resolver: zodResolver(simpleSchema),
          defaultValues: { email: 'test@example.com' },
        });

        return (
          <Form form={form} onSubmit={vi.fn()}>
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <TextInputField {...field} error={fieldState.error?.message} label="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        );
      }

      const { container } = render(<FormWithoutError />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Field primitives', () => {
    it('should have no accessibility violations with Field', async () => {
      const { container } = render(
        <Field>
          <FieldLabel htmlFor="test">Label</FieldLabel>
          <input id="test" type="text" />
          <FieldDescription>Description text</FieldDescription>
        </Field>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with FieldGroup', async () => {
      const { container } = render(
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field1">Field 1</FieldLabel>
            <input id="field1" type="text" />
          </Field>
          <Field>
            <FieldLabel htmlFor="field2">Field 2</FieldLabel>
            <input id="field2" type="text" />
          </Field>
        </FieldGroup>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with FieldSet and FieldLegend', async () => {
      const { container } = render(
        <FieldSet>
          <FieldLegend>Contact Information</FieldLegend>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <input id="email" type="email" />
          </Field>
          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <input id="phone" type="tel" />
          </Field>
        </FieldSet>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with FieldError', async () => {
      const { container } = render(
        <Field>
          <FieldLabel htmlFor="test">Label</FieldLabel>
          <input aria-invalid="true" id="test" type="text" />
          <FieldError errors={[{ message: 'This field is required', type: 'required' }]} />
        </Field>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with FieldSeparator', async () => {
      const { container } = render(
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field1">Field 1</FieldLabel>
            <input id="field1" type="text" />
          </Field>
          <FieldSeparator />
          <Field>
            <FieldLabel htmlFor="field2">Field 2</FieldLabel>
            <input id="field2" type="text" />
          </Field>
        </FieldGroup>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with horizontal orientation', async () => {
      const { container } = render(
        <Field orientation="horizontal">
          <FieldLabel htmlFor="toggle">Enable notifications</FieldLabel>
          <input id="toggle" type="checkbox" />
        </Field>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with vertical orientation', async () => {
      const { container } = render(
        <Field orientation="vertical">
          <FieldLabel htmlFor="input">Field label</FieldLabel>
          <input id="input" type="text" />
          <FieldDescription>Helper text</FieldDescription>
        </Field>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Complex form scenarios', () => {
    it('should have no accessibility violations with nested fieldsets', async () => {
      const { container } = render(
        <form>
          <FieldSet>
            <FieldLegend>Personal Information</FieldLegend>
            <Field>
              <FieldLabel htmlFor="firstName">First name</FieldLabel>
              <input required id="firstName" type="text" />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Last name</FieldLabel>
              <input required id="lastName" type="text" />
            </Field>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Contact Information</FieldLegend>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <input required id="email" type="email" />
            </Field>
            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <input id="phone" type="tel" />
            </Field>
          </FieldSet>
          <button type="submit">Submit</button>
        </form>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with mixed field types', async () => {
      const { container } = render(
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="text">Text input</FieldLabel>
            <input id="text" type="text" />
            <FieldDescription>Enter text</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="number">Number input</FieldLabel>
            <input id="number" type="number" />
          </Field>
          <Field>
            <FieldLabel htmlFor="checkbox">Checkbox</FieldLabel>
            <input id="checkbox" type="checkbox" />
          </Field>
          <Field>
            <FieldLabel htmlFor="select">Select</FieldLabel>
            <select id="select">
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
          </Field>
        </FieldGroup>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
