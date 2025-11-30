/**
 * TextInputField component wrapping VA Design System text input
 *
 * @module @formkit-gov/react/components/fields
 */

import * as React from 'react';

import { createFocusableRef } from './focus-utils';

/**
 * VA Design System text input element with focus support
 */
export interface HTMLVaTextInputElement extends HTMLElement {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  type?: string;
  maxlength?: number;
  minlength?: number;
  pattern?: string;
  value?: string;
  name?: string;
  disabled?: boolean;
  autocomplete?: string;
  inputmode?: string;
}

/**
 * Props for TextInputField component
 */
export interface TextInputFieldProps {
  /**
   * Field label
   */
  label?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Hint text to display below the label
   */
  hint?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Input type
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'search';
  /**
   * Maximum length of input
   */
  maxlength?: number;
  /**
   * Minimum length of input
   */
  minlength?: number;
  /**
   * Pattern for validation
   */
  pattern?: string;
  /**
   * Current value of the input
   */
  value?: string;
  /**
   * Field name
   */
  name?: string;
  /**
   * Whether the field is disabled
   */
  disabled?: boolean;
  /**
   * Autocomplete attribute
   */
  autocomplete?: string;
  /**
   * Input mode for mobile keyboards
   */
  inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  /**
   * Message aria-describedby ID
   */
  messageAriaDescribedby?: string;
  /**
   * Whether to use forms pattern
   */
  useFormsPattern?: string;
  /**
   * Whether to enable analytics
   */
  enableAnalytics?: boolean;
  /**
   * Change event handler - called on vaInput custom event
   */
  onChange?: (event: CustomEvent | Event) => void;
  /**
   * Blur event handler
   */
  onBlur?: (event: CustomEvent | Event) => void;
}

/**
 * TextInputField component wrapping VA Design System va-text-input
 *
 * @example
 * ```tsx
 * import { TextInputField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   return (
 *     <TextInputField
 *       label="First name"
 *       required
 *       name="firstName"
 *     />
 *   );
 * }
 * ```
 *
 * @example With React Hook Form
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { TextInputField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   const { register, formState: { errors } } = useForm();
 *
 *   return (
 *     <TextInputField
 *       {...register('firstName')}
 *       label="First name"
 *       error={errors.firstName?.message}
 *       required
 *     />
 *   );
 * }
 * ```
 *
 * @example Email input with hint
 * ```tsx
 * <TextInputField
 *   type="email"
 *   label="Email address"
 *   hint="We'll never share your email"
 *   required
 * />
 * ```
 *
 * @example With character limit
 * ```tsx
 * <TextInputField
 *   label="Username"
 *   maxlength={20}
 *   hint="Maximum 20 characters"
 * />
 * ```
 */
export const TextInputField = React.forwardRef<HTMLVaTextInputElement, TextInputFieldProps>(
  (
    {
      label,
      error,
      hint,
      required = false,
      type = 'text',
      maxlength,
      minlength,
      pattern,
      value,
      name,
      disabled = false,
      autocomplete,
      inputmode,
      messageAriaDescribedby,
      useFormsPattern,
      enableAnalytics,
      onChange,
      onBlur,
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
    const focusableRef = createFocusableRef(ref);

    // Use a local ref to attach event listeners
    const elementRef = React.useRef<HTMLVaTextInputElement | null>(null);

    const combinedRef = React.useCallback(
      (element: HTMLVaTextInputElement | null) => {
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

    return React.createElement('va-text-input', {
      ref: combinedRef,
      label,
      error: error || undefined,
      hint,
      required,
      type,
      maxlength,
      minlength,
      pattern,
      value,
      name,
      disabled,
      autocomplete,
      inputmode,
      'message-aria-describedby': messageAriaDescribedby,
      'use-forms-pattern': useFormsPattern,
      'enable-analytics': enableAnalytics,
      ...props,
    });
  }
);

TextInputField.displayName = 'TextInputField';
