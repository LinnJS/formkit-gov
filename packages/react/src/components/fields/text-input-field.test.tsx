/**
 * Tests for TextInputField component
 *
 * Note: VA Design System web components don't render their internal structure
 * in test environments (happy-dom/jsdom). Tests verify that the component
 * correctly passes props to the underlying web component element.
 */

import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { TextInputField } from './text-input-field';

describe('TextInputField', () => {
  it('renders va-text-input element', () => {
    const { container } = render(<TextInputField label="First name" />);

    const input = container.querySelector('va-text-input');
    expect(input).toBeInTheDocument();
  });

  it('passes label prop to web component', () => {
    const { container } = render(<TextInputField label="First name" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('label', 'First name');
  });

  it('passes error prop to web component', () => {
    const { container } = render(<TextInputField error="Email is required" label="Email" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('error', 'Email is required');
  });

  it('passes hint prop to web component', () => {
    const { container } = render(
      <TextInputField hint="Must be at least 8 characters" label="Password" />
    );

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('hint', 'Must be at least 8 characters');
  });

  it('passes required prop to web component', () => {
    const { container } = render(<TextInputField required label="Required field" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('required', 'true');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<TextInputField ref={ref} label="Test" />);

    expect(ref).toHaveBeenCalled();
  });

  it('passes value prop to web component', () => {
    const { container } = render(<TextInputField label="Name" value="John Doe" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('value', 'John Doe');
  });

  it('passes type prop to web component', () => {
    const { container } = render(<TextInputField label="Email" type="email" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('defaults to text type', () => {
    const { container } = render(<TextInputField label="Name" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('passes disabled prop to web component', () => {
    const { container } = render(<TextInputField disabled label="Disabled" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('disabled', 'true');
  });

  it('passes maxlength prop to web component', () => {
    const { container } = render(<TextInputField label="Username" maxlength={20} />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('maxlength', '20');
  });

  it('passes minlength prop to web component', () => {
    const { container } = render(<TextInputField label="Password" minlength={8} />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('minlength', '8');
  });

  it('passes pattern prop to web component', () => {
    const pattern = '[0-9]{3}-[0-9]{2}-[0-9]{4}';
    const { container } = render(<TextInputField label="SSN" pattern={pattern} />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('pattern', pattern);
  });

  it('passes name prop to web component', () => {
    const { container } = render(<TextInputField label="Field" name="testField" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('name', 'testField');
  });

  it('passes autocomplete prop to web component', () => {
    const { container } = render(<TextInputField autocomplete="email" label="Email" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('autocomplete', 'email');
  });

  it('passes inputmode prop to web component', () => {
    const { container } = render(<TextInputField inputmode="tel" label="Phone" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('inputmode', 'tel');
  });

  it('passes success prop to web component', () => {
    const { container } = render(<TextInputField label="Email" success="Email verified" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('success', 'Email verified');
  });

  it('applies additional props to web component', () => {
    const { container } = render(<TextInputField data-testid="test-input" label="Test" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('data-testid', 'test-input');
  });

  describe('different input types', () => {
    const inputTypes = ['text', 'email', 'password', 'tel', 'url', 'number', 'search'] as const;

    inputTypes.forEach(type => {
      it(`supports ${type} type`, () => {
        const { container } = render(<TextInputField label={`${type} input`} type={type} />);

        const input = container.querySelector('va-text-input');
        expect(input).toHaveAttribute('type', type);
      });
    });
  });

  describe('React Hook Form integration', () => {
    it('accepts React Hook Form field props', () => {
      const handleChange = vi.fn();
      const handleBlur = vi.fn();

      const { container } = render(
        <TextInputField
          required
          label="First name"
          name="firstName"
          value="John"
          onBlur={handleBlur}
          onChange={handleChange}
        />
      );

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('name', 'firstName');
      expect(input).toHaveAttribute('value', 'John');
      expect(input).toHaveAttribute('required', 'true');
    });

    it('displays validation error from React Hook Form', () => {
      const { container } = render(<TextInputField error="Invalid email format" label="Email" />);

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('error', 'Invalid email format');
    });
  });

  describe('default values', () => {
    it('defaults disabled to false', () => {
      const { container } = render(<TextInputField label="Test" />);

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('disabled', 'false');
    });

    it('defaults required to false', () => {
      const { container } = render(<TextInputField label="Test" />);

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('required', 'false');
    });
  });
});
