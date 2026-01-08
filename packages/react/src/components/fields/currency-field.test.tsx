/**
 * Tests for CurrencyField component
 *
 * Note: VA Design System web components don't render their internal structure
 * in test environments (happy-dom/jsdom). Tests verify that the component
 * correctly passes props to the underlying web component element.
 */

import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { CurrencyField } from './currency-field';

describe('CurrencyField', () => {
  it('renders va-text-input element', () => {
    const { container } = render(<CurrencyField label="Amount" />);

    const input = container.querySelector('va-text-input');
    expect(input).toBeInTheDocument();
  });

  it('passes label prop to web component', () => {
    const { container } = render(<CurrencyField label="Donation amount" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('label', 'Donation amount');
  });

  it('passes error prop to web component', () => {
    const { container } = render(<CurrencyField error="Amount is required" label="Amount" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('error', 'Amount is required');
  });

  it('passes hint prop to web component', () => {
    const { container } = render(<CurrencyField hint="Maximum $1,000,000" label="Amount" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('hint', 'Maximum $1,000,000');
  });

  it('uses default hint when no hint provided', () => {
    const { container } = render(<CurrencyField label="Amount" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('hint', 'Enter amount in U.S. dollars');
  });

  it('uses custom currency symbol in default hint', () => {
    const { container } = render(<CurrencyField currency="€" label="Amount" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('hint', 'Enter amount in €');
  });

  it('passes required prop to web component', () => {
    const { container } = render(<CurrencyField required label="Required amount" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('required');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<CurrencyField ref={ref} label="Test" />);

    expect(ref).toHaveBeenCalled();
  });

  it('passes value prop to web component', () => {
    const { container } = render(<CurrencyField label="Amount" value="1234.56" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('value', '1234.56');
  });

  it('sets inputmode to decimal for mobile keyboards', () => {
    const { container } = render(<CurrencyField label="Amount" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('inputmode', 'decimal');
  });

  it('sets type to text', () => {
    const { container } = render(<CurrencyField label="Amount" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('passes disabled prop to web component', () => {
    const { container } = render(<CurrencyField disabled label="Disabled" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('disabled');
  });

  it('passes name prop to web component', () => {
    const { container } = render(<CurrencyField label="Amount" name="donationAmount" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('name', 'donationAmount');
  });

  it('passes success prop to web component', () => {
    const { container } = render(<CurrencyField label="Amount" success="Amount validated" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('success', 'Amount validated');
  });

  it('applies additional props to web component', () => {
    const { container } = render(<CurrencyField data-testid="test-input" label="Test" />);

    const input = container.querySelector('va-text-input');
    expect(input).toHaveAttribute('data-testid', 'test-input');
  });

  describe('currency symbol', () => {
    it('defaults to dollar sign', () => {
      const { container } = render(<CurrencyField label="Amount" />);

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('hint', 'Enter amount in U.S. dollars');
    });

    it('accepts custom currency symbol', () => {
      const { container } = render(<CurrencyField currency="€" label="Amount" />);

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('hint', 'Enter amount in €');
    });

    it('accepts custom currency symbol with custom hint', () => {
      const { container } = render(
        <CurrencyField currency="£" hint="Enter amount in British pounds" label="Amount" />
      );

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('hint', 'Enter amount in British pounds');
    });
  });

  describe('React Hook Form integration', () => {
    it('accepts React Hook Form field props', () => {
      const handleChange = vi.fn();
      const handleBlur = vi.fn();

      const { container } = render(
        <CurrencyField
          required
          label="Donation amount"
          name="amount"
          value="100.00"
          onBlur={handleBlur}
          onChange={handleChange}
        />
      );

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('name', 'amount');
      expect(input).toHaveAttribute('value', '100.00');
      expect(input).toHaveAttribute('required');
    });

    it('displays validation error from React Hook Form', () => {
      const { container } = render(
        <CurrencyField error="Enter a valid dollar amount" label="Amount" />
      );

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('error', 'Enter a valid dollar amount');
    });
  });

  describe('default values', () => {
    it('defaults disabled to false', () => {
      const { container } = render(<CurrencyField label="Test" />);

      const input = container.querySelector('va-text-input');
      expect(input).not.toHaveAttribute('disabled');
    });

    it('defaults required to false', () => {
      const { container } = render(<CurrencyField label="Test" />);

      const input = container.querySelector('va-text-input');
      expect(input).not.toHaveAttribute('required');
    });

    it('defaults currency to $', () => {
      const { container } = render(<CurrencyField label="Amount" />);

      const input = container.querySelector('va-text-input');
      expect(input).toHaveAttribute('hint', 'Enter amount in U.S. dollars');
    });
  });
});
