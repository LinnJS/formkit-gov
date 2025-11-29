/**
 * PrivacyAgreementField component wrapping VA Design System privacy agreement
 */

import * as React from 'react';

import type { HTMLVaPrivacyAgreementElement } from '../../types/va-components';

export interface PrivacyAgreementFieldProps extends Omit<
  React.ComponentPropsWithoutRef<'va-privacy-agreement'>,
  'onChange' | 'onBlur'
> {
  error?: string;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  checked?: boolean;
  value?: boolean;
  onChange?: (event: Event) => void;
  onBlur?: (event: Event) => void;
}

export const PrivacyAgreementField = React.forwardRef<
  HTMLVaPrivacyAgreementElement,
  PrivacyAgreementFieldProps
>(
  (
    {
      error,
      checked,
      onChange: _onChange,
      onBlur: _onBlur,
      value: _value,
      required: _required,
      disabled: _disabled,
      ...props
    },
    ref
  ) => {
    return (
      <va-privacy-agreement
        ref={ref}
        checked={checked}
        {...(error && { showError: true })}
        {...props}
      />
    );
  }
);

PrivacyAgreementField.displayName = 'PrivacyAgreementField';
