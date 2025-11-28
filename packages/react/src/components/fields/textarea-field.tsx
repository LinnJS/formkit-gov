/**
 * TextareaField component wrapping VA Design System textarea
 */

import * as React from 'react';

import type { HTMLVaTextareaElement } from '../../types/va-components';

export interface TextareaFieldProps extends Omit<
  React.ComponentPropsWithoutRef<'va-textarea'>,
  'onChange' | 'onBlur'
> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  maxlength?: number;
  onChange?: (event: Event) => void;
  onBlur?: (event: Event) => void;
}

export const TextareaField = React.forwardRef<HTMLVaTextareaElement, TextareaFieldProps>(
  ({ label, error, hint, required, onChange: _onChange, onBlur: _onBlur, ...props }, ref) => {
    return (
      <va-textarea
        ref={ref}
        error={error}
        hint={hint}
        label={label}
        required={required}
        {...props}
      />
    );
  }
);

TextareaField.displayName = 'TextareaField';
