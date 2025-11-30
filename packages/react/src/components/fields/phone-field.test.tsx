/**
 * Tests for PhoneField component
 *
 * Note: VA Design System web components don't render their internal structure
 * in test environments (happy-dom/jsdom). Tests verify that the component
 * correctly passes props to the underlying web component element.
 */

import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { PhoneField } from './phone-field';

describe('PhoneField', () => {
  it('renders va-text-input element', () => {
    const { container } = render(<PhoneField label="Phone number" />);

    const input = container.querySelector('va-text-input');
    expect(input).toBeInTheDocument();
  });

  it('sets type to tel', () => {
    const { container } = render(<PhoneField label="Phone number" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('type', 'tel');
  });

  it('sets inputmode to tel', () => {
    const { container } = render(<PhoneField label="Phone number" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('inputmode', 'tel');
  });

  it('defaults autocomplete to tel', () => {
    const { container } = render(<PhoneField label="Phone number" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('autocomplete', 'tel');
  });

  it('allows custom autocomplete value', () => {
    const { container } = render(<PhoneField autocomplete="tel-national" label="Phone number" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('autocomplete', 'tel-national');
  });

  it('passes label prop to web component', () => {
    const { container } = render(<PhoneField label="Contact number" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('label', 'Contact number');
  });

  it('passes error prop to web component', () => {
    const { container } = render(
      <PhoneField error="Phone number is required" label="Phone number" />
    );

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('error', 'Phone number is required');
  });

  it('passes hint prop to web component', () => {
    const { container } = render(
      <PhoneField hint="Enter a 10-digit phone number" label="Phone number" />
    );

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('hint', 'Enter a 10-digit phone number');
  });

  it('passes required prop to web component', () => {
    const { container } = render(<PhoneField required label="Phone number" />);

    const input = container.querySelector('va-text-input');
    // React 19: boolean true renders as presence attribute
    expect(input).toHaveAttribute('required');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<PhoneField ref={ref} label="Phone number" />);

    expect(ref).toHaveBeenCalled();
  });

  it('passes value prop to web component', () => {
    const { container } = render(<PhoneField label="Phone number" value="555-123-4567" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('value', '555-123-4567');
  });

  it('passes disabled prop to web component', () => {
    const { container } = render(<PhoneField disabled label="Phone number" />);

    const input = container.querySelector('va-text-input');
    // React 19: boolean true renders as presence attribute
    expect(input).toHaveAttribute('disabled');
  });

  it('passes name prop to web component', () => {
    const { container } = render(<PhoneField label="Phone number" name="phoneNumber" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('name', 'phoneNumber');
  });

  it('passes success prop to web component', () => {
    const { container } = render(
      <PhoneField label="Phone number" success="Phone number verified" />
    );

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('success', 'Phone number verified');
  });

  it('applies additional props to web component', () => {
    const { container } = render(<PhoneField data-testid="test-phone" label="Phone number" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('data-testid', 'test-phone');
  });

  describe('React Hook Form integration', () => {
    it('accepts React Hook Form field props', () => {
      const handleChange = vi.fn();
      const handleBlur = vi.fn();

      const { container } = render(
        <PhoneField
          required
          label="Phone number"
          name="phone"
          value="555-123-4567"
          onBlur={handleBlur}
          onChange={handleChange}
        />
      );

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('name', 'phone');
      expect(input).toHaveAttribute('value', '555-123-4567');
      // React 19: boolean true renders as presence attribute
      expect(input).toHaveAttribute('required');
    });

    it('displays validation error from React Hook Form', () => {
      const { container } = render(
        <PhoneField error="Enter a valid 10-digit phone number" label="Phone number" />
      );

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('error', 'Enter a valid 10-digit phone number');
    });
  });

  describe('default values', () => {
    it('defaults disabled to false', () => {
      const { container } = render(<PhoneField label="Phone number" />);

      const input = container.querySelector('va-text-input');
      // React 18: false boolean props render as attribute="false" on custom elements
      expect(input).toHaveAttribute('disabled', 'false');
    });

    it('defaults required to false', () => {
      const { container } = render(<PhoneField label="Phone number" />);

      const input = container.querySelector('va-text-input');
      // React 18: false boolean props render as attribute="false" on custom elements
      expect(input).toHaveAttribute('required', 'false');
    });
  });

  describe('accessibility', () => {
    it('sets appropriate input type for phone numbers', () => {
      const { container } = render(<PhoneField label="Phone number" />);

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('type', 'tel');
    });

    it('sets appropriate inputmode for mobile keyboards', () => {
      const { container } = render(<PhoneField label="Phone number" />);

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('inputmode', 'tel');
    });

    it('associates error message with field', () => {
      const { container } = render(
        <PhoneField error="Invalid phone number" label="Phone number" />
      );

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('error', 'Invalid phone number');
    });
  });
});
