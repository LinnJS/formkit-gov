import { render } from '@testing-library/react';
import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';

import { PrivacyAgreementField } from './privacy-agreement-field';

import type { HTMLVaPrivacyAgreementElement } from '../../types/va-components';

describe('PrivacyAgreementField', () => {
  it('renders va-privacy-agreement element', () => {
    const { container } = render(<PrivacyAgreementField />);
    const privacyAgreement = container.querySelector('va-privacy-agreement');
    expect(privacyAgreement).toBeInTheDocument();
  });

  it('passes checked prop when true', () => {
    const { container } = render(<PrivacyAgreementField checked />);
    const privacyAgreement = container.querySelector('va-privacy-agreement');
    expect(privacyAgreement).toHaveAttribute('checked');
  });

  it('passes checked=false to web component', () => {
    const { container } = render(<PrivacyAgreementField checked={false} />);
    const privacyAgreement = container.querySelector('va-privacy-agreement');
    // React 18: false boolean props render as attribute="false" on custom elements
    expect(privacyAgreement).toHaveAttribute('checked', 'false');
  });

  it('does not add checked attribute when checked is undefined', () => {
    const { container } = render(<PrivacyAgreementField />);
    const privacyAgreement = container.querySelector('va-privacy-agreement');
    expect(privacyAgreement).not.toHaveAttribute('checked');
  });

  it('sets showError to true when error is provided', () => {
    const { container } = render(
      <PrivacyAgreementField error="You must accept the privacy policy" />
    );
    const privacyAgreement = container.querySelector('va-privacy-agreement');
    expect(privacyAgreement).toHaveAttribute('showerror');
  });

  it('sets showError to false when error is undefined', () => {
    const { container } = render(<PrivacyAgreementField />);
    const privacyAgreement = container.querySelector('va-privacy-agreement');
    expect(privacyAgreement).not.toHaveAttribute('showerror');
  });

  it('does not set showError when error is empty string', () => {
    const { container } = render(<PrivacyAgreementField error="" />);
    const privacyAgreement = container.querySelector('va-privacy-agreement');
    // Empty string is falsy, so showError should not be set
    expect(privacyAgreement).not.toHaveAttribute('showerror');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLVaPrivacyAgreementElement>();
    const { container } = render(<PrivacyAgreementField ref={ref} />);
    const privacyAgreement = container.querySelector('va-privacy-agreement');
    expect(ref.current).toBe(privacyAgreement);
  });

  it('passes name prop to web component', () => {
    const { container } = render(<PrivacyAgreementField name="privacyAccepted" />);
    const privacyAgreement = container.querySelector('va-privacy-agreement');
    expect(privacyAgreement).toHaveAttribute('name', 'privacyAccepted');
  });

  it('applies additional props to web component', () => {
    const { container } = render(
      <PrivacyAgreementField
        aria-describedby="description"
        data-testid="custom-privacy-agreement"
      />
    );
    const privacyAgreement = container.querySelector('va-privacy-agreement');
    expect(privacyAgreement).toHaveAttribute('data-testid', 'custom-privacy-agreement');
    expect(privacyAgreement).toHaveAttribute('aria-describedby', 'description');
  });

  it('accepts React Hook Form field props', () => {
    const mockOnChange = vi.fn();
    const mockOnBlur = vi.fn();

    const fieldProps = {
      name: 'privacy',
      value: true,
      onChange: mockOnChange,
      onBlur: mockOnBlur,
    };

    const { container } = render(<PrivacyAgreementField {...fieldProps} />);
    const privacyAgreement = container.querySelector('va-privacy-agreement');

    expect(privacyAgreement).toHaveAttribute('name', 'privacy');
    expect(privacyAgreement).toBeInTheDocument();
  });

  it('accepts all field props from React Hook Form integration', () => {
    const mockOnChange = vi.fn();
    const mockOnBlur = vi.fn();

    const { container } = render(
      <PrivacyAgreementField
        checked={true}
        error="This field is required"
        name="privacyAccepted"
        onBlur={mockOnBlur}
        onChange={mockOnChange}
      />
    );

    const privacyAgreement = container.querySelector('va-privacy-agreement');
    expect(privacyAgreement).toHaveAttribute('name', 'privacyAccepted');
    expect(privacyAgreement).toHaveAttribute('checked');
    expect(privacyAgreement).toHaveAttribute('showerror');
  });

  it('renders with multiple props combined', () => {
    const { container } = render(
      <PrivacyAgreementField
        checked={false}
        data-testid="agreement-privacy"
        error="Please accept the privacy policy"
        name="agreement"
      />
    );

    const privacyAgreement = container.querySelector('va-privacy-agreement');
    expect(privacyAgreement).toHaveAttribute('showerror');
    expect(privacyAgreement).toHaveAttribute('name', 'agreement');
    expect(privacyAgreement).toHaveAttribute('data-testid', 'agreement-privacy');
    // React 18: false boolean props render as attribute="false" on custom elements
    expect(privacyAgreement).toHaveAttribute('checked', 'false');
  });

  it('has correct displayName', () => {
    expect(PrivacyAgreementField.displayName).toBe('PrivacyAgreementField');
  });

  it('omits onChange and onBlur from props spread to avoid conflicts', () => {
    const mockOnChange = vi.fn();
    const mockOnBlur = vi.fn();

    const { container } = render(
      <PrivacyAgreementField onBlur={mockOnBlur} onChange={mockOnChange} />
    );

    const privacyAgreement = container.querySelector('va-privacy-agreement');
    // The onChange and onBlur handlers are passed but not as attributes
    // They should be handled by the web component's event system
    expect(privacyAgreement).toBeInTheDocument();
  });

  it('renders without optional props', () => {
    const { container } = render(<PrivacyAgreementField />);
    const privacyAgreement = container.querySelector('va-privacy-agreement');

    expect(privacyAgreement).toBeInTheDocument();
    expect(privacyAgreement).not.toHaveAttribute('error');
    expect(privacyAgreement).not.toHaveAttribute('checked');
    expect(privacyAgreement).not.toHaveAttribute('showerror');
  });

  it('handles enableAnalytics prop', () => {
    const { container } = render(<PrivacyAgreementField enable-analytics />);
    const privacyAgreement = container.querySelector('va-privacy-agreement');
    expect(privacyAgreement).toHaveAttribute('enable-analytics');
  });
});
