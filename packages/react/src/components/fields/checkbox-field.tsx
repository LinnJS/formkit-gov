/**
 * CheckboxField component wrapping VA Design System checkbox
 */

import * as React from 'react';

import type { HTMLVaCheckboxElement } from '../../types/va-components';

export interface CheckboxFieldProps extends Omit<
  React.ComponentPropsWithoutRef<'va-checkbox'>,
  'onChange' | 'onBlur'
> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  checked?: boolean;
  onChange?: (event: Event) => void;
  onBlur?: (event: Event) => void;
}

export const CheckboxField = React.forwardRef<HTMLVaCheckboxElement, CheckboxFieldProps>(
  (
    { label, error, hint, required, checked, onChange: _onChange, onBlur: _onBlur, ...props },
    ref
  ) => {
    return (
      <va-checkbox
        ref={ref}
        checked={checked}
        error={error}
        hint={hint}
        label={label}
        required={required}
        {...props}
      />
    );
  }
);

CheckboxField.displayName = 'CheckboxField';
