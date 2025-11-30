/**
 * CheckboxField component wrapping VA Design System checkbox
 */

import * as React from 'react';

import { createFocusableRef } from './focus-utils';

import type { HTMLVaCheckboxElement } from '../../types/va-components';

export interface CheckboxFieldProps extends Omit<
  React.ComponentPropsWithoutRef<'va-checkbox'>,
  'onChange' | 'onBlur'
> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (event: Event) => void;
  onBlur?: (event: Event) => void;
}

export const CheckboxField = React.forwardRef<HTMLVaCheckboxElement, CheckboxFieldProps>(
  ({ label, error, hint, required, checked, onChange, onBlur, ...props }, ref) => {
    const handleChange = React.useCallback(
      (event: Event) => {
        if (onChange) {
          onChange(event);
        }
      },
      [onChange]
    );

    const handleBlur = React.useCallback(
      (event: Event) => {
        if (onBlur) {
          onBlur(event);
        }
      },
      [onBlur]
    );

    // Create a focusable ref that handles shadow DOM focus
    const focusableRef = createFocusableRef(ref, 'input[type="checkbox"], input');

    // Use a local ref to attach event listeners
    const elementRef = React.useRef<HTMLVaCheckboxElement | null>(null);

    const combinedRef = React.useCallback(
      (element: HTMLVaCheckboxElement | null) => {
        elementRef.current = element;
        focusableRef(element);
      },
      [focusableRef]
    );

    React.useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      if (onChange) {
        element.addEventListener('vaChange', handleChange);
      }
      if (onBlur) {
        element.addEventListener('blur', handleBlur);
      }

      return () => {
        if (onChange) {
          element.removeEventListener('vaChange', handleChange);
        }
        if (onBlur) {
          element.removeEventListener('blur', handleBlur);
        }
      };
    }, [onChange, onBlur, handleChange, handleBlur]);

    return React.createElement('va-checkbox', {
      ref: combinedRef,
      checked,
      error,
      hint,
      label,
      required,
      ...props,
    });
  }
);

CheckboxField.displayName = 'CheckboxField';
