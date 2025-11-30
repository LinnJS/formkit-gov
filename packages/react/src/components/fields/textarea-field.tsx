/**
 * TextareaField component wrapping VA Design System textarea
 */

import * as React from 'react';

import { createFocusableRef } from './focus-utils';

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
  ({ label, error, hint, required, onChange, onBlur, ...props }, ref) => {
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
    const focusableRef = createFocusableRef(ref, 'textarea');

    // Use a local ref to attach event listeners
    const elementRef = React.useRef<HTMLVaTextareaElement | null>(null);

    const combinedRef = React.useCallback(
      (element: HTMLVaTextareaElement | null) => {
        elementRef.current = element;
        focusableRef(element);
      },
      [focusableRef]
    );

    React.useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      if (onChange) {
        element.addEventListener('vaInput', handleChange);
      }
      if (onBlur) {
        element.addEventListener('blur', handleBlur);
      }

      return () => {
        if (onChange) {
          element.removeEventListener('vaInput', handleChange);
        }
        if (onBlur) {
          element.removeEventListener('blur', handleBlur);
        }
      };
    }, [onChange, onBlur, handleChange, handleBlur]);

    return React.createElement('va-textarea', {
      ref: combinedRef,
      error,
      hint,
      label,
      required,
      ...props,
    });
  }
);

TextareaField.displayName = 'TextareaField';
