/**
 * Tests for SSNField component
 *
 * Note: VA Design System web components don't render their internal structure
 * in test environments (happy-dom/jsdom). Tests verify that the component
 * correctly passes props to the underlying web component element.
 */

import { render, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { SSNField } from './ssn-field';

describe('SSNField', () => {
  it('renders va-text-input element', () => {
    const { container } = render(<SSNField />);

    const input = container.querySelector('va-text-input');
    expect(input).toBeInTheDocument();
  });

  it('uses default label "Social Security number"', () => {
    const { container } = render(<SSNField />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('label', 'Social Security number');
  });

  it('passes custom label prop to web component', () => {
    const { container } = render(<SSNField label="SSN" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('label', 'SSN');
  });

  it('passes error prop to web component', () => {
    const { container } = render(<SSNField error="SSN is required" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('error', 'SSN is required');
  });

  it('passes hint prop to web component', () => {
    const { container } = render(<SSNField hint="Enter in format XXX-XX-XXXX" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('hint', 'Enter in format XXX-XX-XXXX');
  });

  it('passes required prop to web component', () => {
    const { container } = render(<SSNField required />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('required');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<SSNField ref={ref} />);

    expect(ref).toHaveBeenCalled();
  });

  it('sets type to text', () => {
    const { container } = render(<SSNField />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('sets maxlength to 11 for SSN format XXX-XX-XXXX', () => {
    const { container } = render(<SSNField />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('maxlength', '11');
  });

  it('sets pattern for SSN validation', () => {
    const { container } = render(<SSNField />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('pattern', '\\d{3}-\\d{2}-\\d{4}');
  });

  it('sets inputmode to numeric for mobile keyboards', () => {
    const { container } = render(<SSNField />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('inputmode', 'numeric');
  });

  it('sets autocomplete to off for security', () => {
    const { container } = render(<SSNField />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('autocomplete', 'off');
  });

  it('passes disabled prop to web component', () => {
    const { container } = render(<SSNField disabled />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('disabled');
  });

  it('passes name prop to web component', () => {
    const { container } = render(<SSNField name="ssn" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('name', 'ssn');
  });

  it('formats SSN value with dashes', () => {
    const { container } = render(<SSNField value="123456789" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('value', '123-45-6789');
  });

  it('preserves already formatted SSN value', () => {
    const { container } = render(<SSNField value="123-45-6789" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('value', '123-45-6789');
  });

  it('handles partial SSN input (first 3 digits)', () => {
    const { container } = render(<SSNField value="123" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('value', '123');
  });

  it('handles partial SSN input (5 digits)', () => {
    const { container } = render(<SSNField value="12345" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('value', '123-45');
  });

  it('handles partial SSN input (7 digits)', () => {
    const { container } = render(<SSNField value="1234567" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('value', '123-45-67');
  });

  it('strips non-digit characters from value', () => {
    const { container } = render(<SSNField value="123-abc-4567-89" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('value', '123-45-6789');
  });

  it('limits SSN to 9 digits maximum', () => {
    const { container } = render(<SSNField value="12345678901234" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('value', '123-45-6789');
  });

  it('applies additional props to web component', () => {
    const { container } = render(<SSNField data-testid="test-ssn" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('data-testid', 'test-ssn');
  });

  describe('React Hook Form integration', () => {
    it('accepts React Hook Form field props', () => {
      const handleChange = vi.fn();
      const handleBlur = vi.fn();

      const { container } = render(
        <SSNField
          required
          name="ssn"
          value="123-45-6789"
          onBlur={handleBlur}
          onChange={handleChange}
        />
      );

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('name', 'ssn');
      expect(input).toHaveAttribute('value', '123-45-6789');
      expect(input).toHaveAttribute('required');
    });

    it('displays validation error from React Hook Form', () => {
      const { container } = render(
        <SSNField error="Enter a valid Social Security number (like 123-45-6789)" />
      );

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute(
        'error',
        'Enter a valid Social Security number (like 123-45-6789)'
      );
    });
  });

  describe('default values', () => {
    it('defaults disabled to false', () => {
      const { container } = render(<SSNField />);

      const input = container.querySelector('va-text-input');
      expect(input).not.toHaveAttribute('disabled');
    });

    it('defaults required to false', () => {
      const { container } = render(<SSNField />);

      const input = container.querySelector('va-text-input');
      expect(input).not.toHaveAttribute('required');
    });
  });

  describe('formatting behavior', () => {
    it('handles empty value', () => {
      const { container } = render(<SSNField value="" />);

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('value', '');
    });

    it('handles undefined value', () => {
      const { container } = render(<SSNField />);

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('value', '');
    });

    it('updates formatted value when external value changes', () => {
      const { container, rerender } = render(<SSNField value="123" />);

      let input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('value', '123');

      rerender(<SSNField value="123456789" />);
      input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('value', '123-45-6789');
    });
  });

  describe('event handling', () => {
    it('calls onChange with formatted value when vaInput event is dispatched', async () => {
      const handleChange = vi.fn();
      const { container } = render(<SSNField onChange={handleChange} />);

      const input = container.querySelector('va-text-input');

      // VA web components use vaInput event - wrap in act for state updates
      await act(async () => {
        const mockEvent = new CustomEvent('vaInput', { bubbles: true });
        Object.defineProperty(mockEvent, 'target', {
          value: { value: '123456789' },
          writable: false,
        });
        input?.dispatchEvent(mockEvent);
      });

      expect(handleChange).toHaveBeenCalled();
    });

    it('does not throw when onChange is not provided', () => {
      // Component should render without error when no onChange
      expect(() => render(<SSNField />)).not.toThrow();
    });

    it('calls onBlur when blur event is triggered', async () => {
      const handleBlur = vi.fn();
      const { container } = render(<SSNField onBlur={handleBlur} />);

      const input = container.querySelector('va-text-input');

      // Wait for useEffect to attach listener, then dispatch
      await act(async () => {
        const blurEvent = new Event('blur', { bubbles: true });
        input?.dispatchEvent(blurEvent);
      });

      expect(handleBlur).toHaveBeenCalled();
    });

    it('does not throw when onBlur is not provided', () => {
      // Component should render without error when no onBlur
      expect(() => render(<SSNField />)).not.toThrow();
    });
  });
});
