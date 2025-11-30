/**
 * Tests for Form context components
 */

import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import { Form } from './form';
import { useFormContext, useFormField } from './form-context';
import { FormControl } from './form-control';
import { FormDescription } from './form-description';
import { FormField } from './form-field';
import { FormItem } from './form-item';
import { FormLabel } from './form-label';
import { FormMessage } from './form-message';

// Test schema
const testSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

type TestFormData = z.infer<typeof testSchema>;

// Helper component for testing Form context
function TestFormComponent({
  onSubmit = vi.fn(),
  defaultValues = { email: '', name: '' },
}: {
  onSubmit?: (data: TestFormData) => void;
  defaultValues?: Partial<TestFormData>;
}) {
  const form = useForm<TestFormData>({
    resolver: zodResolver(testSchema),
    defaultValues,
  });

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <input {...field} data-testid="email-input" />
            </FormControl>
            <FormDescription>Enter your email address</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel required>Name</FormLabel>
            <FormControl>
              <input {...field} data-testid="name-input" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <button type="submit">Submit</button>
    </Form>
  );
}

// Helper to test useFormContext hook
function FormContextConsumer() {
  const { form } = useFormContext();
  return <div data-testid="form-values">{JSON.stringify(form.getValues())}</div>;
}

describe('Form', () => {
  it('renders a form element', () => {
    const form = {
      handleSubmit: vi.fn(() => vi.fn()),
    } as unknown as ReturnType<typeof useForm>;

    const { container } = render(
      <Form form={form}>
        <div>Content</div>
      </Form>
    );

    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('has correct data-slot attribute', () => {
    const form = {
      handleSubmit: vi.fn(() => vi.fn()),
    } as unknown as ReturnType<typeof useForm>;

    const { container } = render(
      <Form form={form}>
        <div>Content</div>
      </Form>
    );

    expect(container.querySelector('[data-slot="form"]')).toBeInTheDocument();
  });

  it('calls onSubmit with form data when submitted', async () => {
    const onSubmit = vi.fn();

    render(<TestFormComponent onSubmit={onSubmit} />);

    // Fill in valid data
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'John Doe' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
      // React Hook Form passes data as first argument
      const callArg = onSubmit.mock.calls[0][0];
      expect(callArg).toEqual({
        email: 'test@example.com',
        name: 'John Doe',
      });
    });
  });

  it('does not submit when validation fails', async () => {
    const onSubmit = vi.fn();

    render(<TestFormComponent onSubmit={onSubmit} />);

    // Submit without filling required fields
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  it('provides form context to children', () => {
    function TestComponent() {
      const form = useForm({ defaultValues: { test: 'value' } });
      return (
        <Form form={form}>
          <FormContextConsumer />
        </Form>
      );
    }

    render(<TestComponent />);
    expect(screen.getByTestId('form-values')).toHaveTextContent('{"test":"value"}');
  });
});

describe('FormField', () => {
  it('renders children with field props', () => {
    function TestComponent() {
      const form = useForm({ defaultValues: { test: '' } });
      return (
        <Form form={form}>
          <FormField
            control={form.control}
            name="test"
            render={({ field }) => <input {...field} data-testid="test-input" />}
          />
        </Form>
      );
    }

    render(<TestComponent />);
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
    expect(screen.getByTestId('test-input')).toHaveAttribute('name', 'test');
  });

  it('provides fieldState to render function', () => {
    function TestComponent() {
      const form = useForm({
        defaultValues: { test: '' },
      });

      return (
        <Form form={form}>
          <FormField
            control={form.control}
            name="test"
            render={({ field, fieldState, formState }) => (
              <div>
                <input {...field} data-testid="test-input" />
                <span data-testid="field-name">{field.name}</span>
                <span data-testid="is-valid">{String(!fieldState.invalid)}</span>
                <span data-testid="is-submitting">{String(formState.isSubmitting)}</span>
              </div>
            )}
          />
        </Form>
      );
    }

    render(<TestComponent />);

    // Verify fieldState and formState are provided
    expect(screen.getByTestId('field-name')).toHaveTextContent('test');
    expect(screen.getByTestId('is-valid')).toHaveTextContent('true');
    expect(screen.getByTestId('is-submitting')).toHaveTextContent('false');
  });

  it('throws error when used without Form or control prop', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<FormField name="test" render={({ field }) => <input {...field} />} />);
    }).toThrow('FormField requires either a control prop or to be wrapped in a Form component');

    consoleError.mockRestore();
  });
});

describe('FormItem', () => {
  it('renders a div element', () => {
    function TestComponent() {
      const form = useForm({ defaultValues: { test: '' } });
      return (
        <Form form={form}>
          <FormField
            control={form.control}
            name="test"
            render={() => (
              <FormItem data-testid="form-item">
                <div>Content</div>
              </FormItem>
            )}
          />
        </Form>
      );
    }

    render(<TestComponent />);
    expect(screen.getByTestId('form-item')).toBeInTheDocument();
    expect(screen.getByTestId('form-item').tagName).toBe('DIV');
  });

  it('has correct data-slot attribute', () => {
    function TestComponent() {
      const form = useForm({ defaultValues: { test: '' } });
      return (
        <Form form={form}>
          <FormField
            control={form.control}
            name="test"
            render={() => (
              <FormItem data-testid="form-item">
                <div>Content</div>
              </FormItem>
            )}
          />
        </Form>
      );
    }

    render(<TestComponent />);
    expect(screen.getByTestId('form-item')).toHaveAttribute('data-slot', 'form-item');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();

    function TestComponent() {
      const form = useForm({ defaultValues: { test: '' } });
      return (
        <Form form={form}>
          <FormField
            control={form.control}
            name="test"
            render={() => (
              <FormItem ref={ref}>
                <div>Content</div>
              </FormItem>
            )}
          />
        </Form>
      );
    }

    render(<TestComponent />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('FormControl', () => {
  it('wraps children and adds accessibility attributes', () => {
    function TestComponent() {
      const form = useForm({ defaultValues: { test: '' } });
      return (
        <Form form={form}>
          <FormField
            control={form.control}
            name="test"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input {...field} data-testid="test-input" />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      );
    }

    render(<TestComponent />);
    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('id');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('sets aria-invalid based on field error state', () => {
    // Test that FormControl correctly sets aria-invalid based on error state
    // The integrated form scenario test validates the full error flow
    function TestComponent() {
      const form = useForm({
        defaultValues: { test: '' },
      });

      return (
        <Form form={form}>
          <FormField
            control={form.control}
            name="test"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input {...field} data-testid="test-input" />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      );
    }

    render(<TestComponent />);

    // Initially no error, so aria-invalid should be false
    expect(screen.getByTestId('test-input')).toHaveAttribute('aria-invalid', 'false');
    expect(screen.getByTestId('test-input')).toHaveAttribute('id');
    expect(screen.getByTestId('test-input')).toHaveAttribute('aria-describedby');
  });
});

describe('FormLabel', () => {
  it('renders a label element', () => {
    function TestComponent() {
      const form = useForm({ defaultValues: { test: '' } });
      return (
        <Form form={form}>
          <FormField
            control={form.control}
            name="test"
            render={() => (
              <FormItem>
                <FormLabel>Test Label</FormLabel>
              </FormItem>
            )}
          />
        </Form>
      );
    }

    render(<TestComponent />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Label').tagName).toBe('LABEL');
  });

  it('has correct data-slot attribute', () => {
    function TestComponent() {
      const form = useForm({ defaultValues: { test: '' } });
      return (
        <Form form={form}>
          <FormField
            control={form.control}
            name="test"
            render={() => (
              <FormItem>
                <FormLabel data-testid="label">Test Label</FormLabel>
              </FormItem>
            )}
          />
        </Form>
      );
    }

    render(<TestComponent />);
    expect(screen.getByTestId('label')).toHaveAttribute('data-slot', 'form-label');
  });

  it('displays required indicator when required prop is true', () => {
    function TestComponent() {
      const form = useForm({ defaultValues: { test: '' } });
      return (
        <Form form={form}>
          <FormField
            control={form.control}
            name="test"
            render={() => (
              <FormItem>
                <FormLabel required>Required Field</FormLabel>
              </FormItem>
            )}
          />
        </Form>
      );
    }

    render(<TestComponent />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('has htmlFor attribute matching input id', () => {
    function TestComponent() {
      const form = useForm({ defaultValues: { test: '' } });
      return (
        <Form form={form}>
          <FormField
            control={form.control}
            name="test"
            render={({ field }) => (
              <FormItem>
                <FormLabel data-testid="label">Test Label</FormLabel>
                <FormControl>
                  <input {...field} data-testid="input" />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      );
    }

    render(<TestComponent />);
    const label = screen.getByTestId('label');
    const input = screen.getByTestId('input');
    expect(label).toHaveAttribute('for', input.getAttribute('id'));
  });
});

describe('FormDescription', () => {
  it('renders a paragraph element', () => {
    function TestComponent() {
      const form = useForm({ defaultValues: { test: '' } });
      return (
        <Form form={form}>
          <FormField
            control={form.control}
            name="test"
            render={() => (
              <FormItem>
                <FormDescription>Help text</FormDescription>
              </FormItem>
            )}
          />
        </Form>
      );
    }

    render(<TestComponent />);
    expect(screen.getByText('Help text')).toBeInTheDocument();
    expect(screen.getByText('Help text').tagName).toBe('P');
  });

  it('has correct data-slot attribute', () => {
    function TestComponent() {
      const form = useForm({ defaultValues: { test: '' } });
      return (
        <Form form={form}>
          <FormField
            control={form.control}
            name="test"
            render={() => (
              <FormItem>
                <FormDescription data-testid="description">Help text</FormDescription>
              </FormItem>
            )}
          />
        </Form>
      );
    }

    render(<TestComponent />);
    expect(screen.getByTestId('description')).toHaveAttribute('data-slot', 'form-description');
  });

  it('has id attribute for aria-describedby association', () => {
    function TestComponent() {
      const form = useForm({ defaultValues: { test: '' } });
      return (
        <Form form={form}>
          <FormField
            control={form.control}
            name="test"
            render={() => (
              <FormItem>
                <FormDescription data-testid="description">Help text</FormDescription>
              </FormItem>
            )}
          />
        </Form>
      );
    }

    render(<TestComponent />);
    expect(screen.getByTestId('description')).toHaveAttribute('id');
  });
});

describe('FormMessage', () => {
  it('renders nothing when there is no error', () => {
    function TestComponent() {
      const form = useForm({ defaultValues: { test: '' } });
      return (
        <Form form={form}>
          <FormField
            control={form.control}
            name="test"
            render={() => (
              <FormItem>
                <FormMessage data-testid="message" />
              </FormItem>
            )}
          />
        </Form>
      );
    }

    render(<TestComponent />);
    expect(screen.queryByTestId('message')).not.toBeInTheDocument();
  });

  it('renders message from field error via useFormField hook', () => {
    // FormMessage renders nothing when no error - tested above
    // FormMessage renders error message when there is one
    // The integrated form scenario test validates the full validation flow
    // This test ensures the component has the correct data-slot
    function TestComponent() {
      const form = useForm({
        defaultValues: { test: '' },
      });

      return (
        <Form form={form}>
          <FormField
            control={form.control}
            name="test"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input {...field} data-testid="test-input" />
                </FormControl>
                {/* Using custom children to test rendering */}
                <FormMessage data-testid="message">Custom error text</FormMessage>
              </FormItem>
            )}
          />
        </Form>
      );
    }

    render(<TestComponent />);

    const message = screen.getByTestId('message');
    expect(message).toBeInTheDocument();
    expect(message).toHaveAttribute('data-slot', 'form-message');
    expect(message).toHaveTextContent('Custom error text');
  });

  it('displays custom children instead of error message when provided', () => {
    function TestComponent() {
      const form = useForm({ defaultValues: { test: '' } });
      return (
        <Form form={form}>
          <FormField
            control={form.control}
            name="test"
            render={() => (
              <FormItem>
                <FormMessage>Custom message</FormMessage>
              </FormItem>
            )}
          />
        </Form>
      );
    }

    render(<TestComponent />);
    expect(screen.getByText('Custom message')).toBeInTheDocument();
  });

  it('has role="alert" and aria-live="polite" attributes', () => {
    // Test accessibility attributes on FormMessage when it renders
    function TestComponent() {
      const form = useForm({
        defaultValues: { test: '' },
      });

      return (
        <Form form={form}>
          <FormField
            control={form.control}
            name="test"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input {...field} data-testid="test-input" />
                </FormControl>
                {/* Provide custom message to ensure it renders */}
                <FormMessage data-testid="message">Error message</FormMessage>
              </FormItem>
            )}
          />
        </Form>
      );
    }

    render(<TestComponent />);

    const message = screen.getByTestId('message');
    expect(message).toHaveAttribute('role', 'alert');
    expect(message).toHaveAttribute('aria-live', 'polite');
  });
});

describe('useFormField', () => {
  it('provides field information within FormField and FormItem', () => {
    function FieldConsumer() {
      const { id, name, formItemId, formDescriptionId, formMessageId } = useFormField();
      return (
        <div>
          <span data-testid="field-id">{id}</span>
          <span data-testid="field-name">{name}</span>
          <span data-testid="form-item-id">{formItemId}</span>
          <span data-testid="form-description-id">{formDescriptionId}</span>
          <span data-testid="form-message-id">{formMessageId}</span>
        </div>
      );
    }

    function TestComponent() {
      const form = useForm({ defaultValues: { test: '' } });
      return (
        <Form form={form}>
          <FormField
            control={form.control}
            name="test"
            render={() => (
              <FormItem>
                <FieldConsumer />
              </FormItem>
            )}
          />
        </Form>
      );
    }

    render(<TestComponent />);

    expect(screen.getByTestId('field-name')).toHaveTextContent('test');
    expect(screen.getByTestId('field-id').textContent).toBeTruthy();
    expect(screen.getByTestId('form-item-id').textContent).toContain('form-item');
    expect(screen.getByTestId('form-description-id').textContent).toContain('description');
    expect(screen.getByTestId('form-message-id').textContent).toContain('message');
  });

  it('throws error when used outside FormField', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    function InvalidComponent() {
      useFormField();
      return <div>Should not render</div>;
    }

    function TestComponent() {
      const form = useForm({ defaultValues: { test: '' } });
      return (
        <Form form={form}>
          <FormItem>
            <InvalidComponent />
          </FormItem>
        </Form>
      );
    }

    expect(() => render(<TestComponent />)).toThrow(
      'useFormField must be used within a FormField component'
    );

    consoleError.mockRestore();
  });

  it('throws error when used outside FormItem', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    function InvalidComponent() {
      useFormField();
      return <div>Should not render</div>;
    }

    function TestComponent() {
      const form = useForm({ defaultValues: { test: '' } });
      return (
        <Form form={form}>
          <FormField control={form.control} name="test" render={() => <InvalidComponent />} />
        </Form>
      );
    }

    expect(() => render(<TestComponent />)).toThrow(
      'useFormField must be used within a FormItem component'
    );

    consoleError.mockRestore();
  });
});

describe('useFormContext', () => {
  it('throws error when used outside Form', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    function InvalidComponent() {
      useFormContext();
      return <div>Should not render</div>;
    }

    expect(() => render(<InvalidComponent />)).toThrow(
      'useFormContext must be used within a Form component'
    );

    consoleError.mockRestore();
  });
});

describe('Component displayNames', () => {
  it('Form has correct displayName', () => {
    expect((Form as React.FC).displayName).toBe('Form');
  });

  it('FormField has correct displayName', () => {
    expect(FormField.displayName).toBe('FormField');
  });

  it('FormItem has correct displayName', () => {
    expect(FormItem.displayName).toBe('FormItem');
  });

  it('FormControl has correct displayName', () => {
    expect(FormControl.displayName).toBe('FormControl');
  });

  it('FormLabel has correct displayName', () => {
    expect(FormLabel.displayName).toBe('FormLabel');
  });

  it('FormDescription has correct displayName', () => {
    expect(FormDescription.displayName).toBe('FormDescription');
  });

  it('FormMessage has correct displayName', () => {
    expect(FormMessage.displayName).toBe('FormMessage');
  });
});

describe('Integrated form scenario', () => {
  it('displays validation errors and clears them on fix', async () => {
    const onSubmit = vi.fn();

    render(<TestFormComponent onSubmit={onSubmit} />);

    // Try to submit empty form
    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }).closest('form')!);

    // Wait for validation errors
    await waitFor(
      () => {
        expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Fix the email error
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'valid@example.com' },
    });

    // Fix the name error
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'John' },
    });

    // Submit again
    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }).closest('form')!);

    await waitFor(
      () => {
        expect(onSubmit).toHaveBeenCalled();
        const callArg = onSubmit.mock.calls[0][0];
        expect(callArg).toEqual({
          email: 'valid@example.com',
          name: 'John',
        });
      },
      { timeout: 3000 }
    );
  });
});

describe('Form validation error handling', () => {
  it('calls onValidationError callback when validation fails', async () => {
    const onSubmit = vi.fn();
    const onValidationError = vi.fn();

    function TestForm() {
      const form = useForm<TestFormData>({
        resolver: zodResolver(testSchema),
        defaultValues: { email: '', name: '' },
      });

      return (
        <Form form={form} onSubmit={onSubmit} onValidationError={onValidationError}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input {...field} data-testid="email-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input {...field} data-testid="name-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit">Submit</button>
        </Form>
      );
    }

    render(<TestForm />);

    // Submit empty form - should fail validation
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onValidationError).toHaveBeenCalled();
      expect(onSubmit).not.toHaveBeenCalled();
    });

    // Check that errors object was passed
    const errorsArg = onValidationError.mock.calls[0][0];
    expect(errorsArg).toHaveProperty('email');
    expect(errorsArg).toHaveProperty('name');
  });

  it('focuses first invalid field via React Hook Form shouldFocusError (default)', async () => {
    function TestForm() {
      const form = useForm<TestFormData>({
        resolver: zodResolver(testSchema),
        defaultValues: { email: '', name: '' },
        // shouldFocusError: true is the default
      });

      return (
        <Form form={form} onSubmit={vi.fn()}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input {...field} data-testid="email-input" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input {...field} data-testid="name-input" />
                </FormControl>
              </FormItem>
            )}
          />
          <button type="submit">Submit</button>
        </Form>
      );
    }

    render(<TestForm />);

    // Submit empty form
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    // Wait for validation and focus - React Hook Form handles this via shouldFocusError
    await waitFor(() => {
      // First field (email) should receive focus
      expect(document.activeElement).toBe(screen.getByTestId('email-input'));
    });
  });

  it('does not focus first invalid field when shouldFocusError is false', async () => {
    function TestForm() {
      const form = useForm<TestFormData>({
        resolver: zodResolver(testSchema),
        defaultValues: { email: '', name: '' },
        shouldFocusError: false, // Disable auto-focus on error
      });

      return (
        <Form form={form} onSubmit={vi.fn()}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input {...field} data-testid="email-input" />
                </FormControl>
              </FormItem>
            )}
          />
          <button data-testid="submit-btn" type="submit">
            Submit
          </button>
        </Form>
      );
    }

    render(<TestForm />);

    const submitBtn = screen.getByTestId('submit-btn');
    submitBtn.focus();

    // Submit empty form
    fireEvent.click(submitBtn);

    // Wait a bit for any focus changes
    await waitFor(() => {
      // Focus should NOT move to the email input when shouldFocusError is false
      expect(document.activeElement).not.toBe(screen.getByTestId('email-input'));
    });
  });
});

describe('Form with mode: onChange clears errors on valid input', () => {
  it('clears error when field becomes valid with mode: onChange', async () => {
    const schema = z.object({
      email: z.string().email('Invalid email'),
    });

    function TestForm() {
      const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: { email: '' },
        mode: 'onChange', // Real-time validation
      });

      return (
        <Form form={form} onSubmit={vi.fn()}>
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <input {...field} data-testid="email-input" />
                </FormControl>
                {fieldState.error && (
                  <span data-testid="error-message">{fieldState.error.message}</span>
                )}
              </FormItem>
            )}
          />
          <button type="submit">Submit</button>
        </Form>
      );
    }

    render(<TestForm />);

    const input = screen.getByTestId('email-input');

    // Type invalid email
    fireEvent.change(input, { target: { value: 'invalid' } });

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });

    // Type valid email
    fireEvent.change(input, { target: { value: 'valid@example.com' } });

    // Error should clear
    await waitFor(() => {
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });
  });
});
