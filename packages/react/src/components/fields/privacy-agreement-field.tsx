/**
 * PrivacyAgreementField component wrapping VA Design System privacy agreement
 */

import * as React from 'react';

import { createFocusableRef } from './focus-utils';

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
      onChange,
      onBlur,
      value: _value,
      required: _required,
      disabled: _disabled,
      ...props
    },
    ref
  ) => {
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
    // Privacy agreement has a checkbox inside
    const focusableRef = createFocusableRef(
      ref,
      'va-checkbox input, input[type="checkbox"], input'
    );

    // Use a local ref to attach event listeners
    const elementRef = React.useRef<HTMLVaPrivacyAgreementElement | null>(null);

    const combinedRef = React.useCallback(
      (element: HTMLVaPrivacyAgreementElement | null) => {
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

    return React.createElement('va-privacy-agreement', {
      ref: combinedRef,
      checked,
      ...(error && { showError: true }),
      ...props,
    });
  }
);

PrivacyAgreementField.displayName = 'PrivacyAgreementField';
