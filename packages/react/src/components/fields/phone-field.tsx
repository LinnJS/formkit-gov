/**
 * PhoneField component wrapping VA Design System text input for phone numbers
 *
 * @module @formkit-gov/react/components/fields
 */

import * as React from 'react';

import { createFocusableRef } from './focus-utils';

/**
 * VA Design System text input element
 */
interface HTMLVaTextInputElement extends HTMLElement {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  type?: string;
  value?: string;
  name?: string;
  disabled?: boolean;
  autocomplete?: string;
  inputmode?: string;
  success?: string;
}

/**
 * Props for PhoneField component
 */
export interface PhoneFieldProps {
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
   * @default 'tel'
   */
  autocomplete?: string;
  /**
   * Success message
   */
  success?: string;
  /**
   * Message aria-describedby ID
   */
  messageAriaDescribedby?: string;
  /**
   * Message aria-labelledby ID
   */
  messageAriaLabelledby?: string;
  /**
   * Whether to use forms pattern
   */
  useFormsPattern?: string;
  /**
   * Whether to enable analytics
   */
  enableAnalytics?: boolean;
  /**
   * Change event handler
   */
  onChange?: (event: CustomEvent | Event) => void;
  /**
   * Blur event handler
   */
  onBlur?: (event: CustomEvent | Event) => void;
}

/**
 * PhoneField component wrapping VA Design System va-text-input
 * Configured specifically for phone number input with tel type and inputmode
 *
 * @example
 * ```tsx
 * import { PhoneField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   return (
 *     <PhoneField
 *       label="Phone number"
 *       required
 *       name="phone"
 *     />
 *   );
 * }
 * ```
 *
 * @example With React Hook Form
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { zodResolver } from '@hookform/resolvers/zod';
 * import { createPhoneSchema } from '@formkit-gov/core';
 * import { PhoneField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   const schema = z.object({
 *     phone: createPhoneSchema(),
 *   });
 *
 *   const { register, formState: { errors } } = useForm({
 *     resolver: zodResolver(schema),
 *   });
 *
 *   return (
 *     <PhoneField
 *       {...register('phone')}
 *       label="Phone number"
 *       error={errors.phone?.message}
 *       required
 *     />
 *   );
 * }
 * ```
 *
 * @example With hint
 * ```tsx
 * <PhoneField
 *   label="Phone number"
 *   hint="Enter a 10-digit phone number"
 *   required
 * />
 * ```
 *
 * @example International phone
 * ```tsx
 * <PhoneField
 *   label="Phone number"
 *   hint="Include country code for international numbers"
 *   autocomplete="tel-national"
 * />
 * ```
 */
export const PhoneField = React.forwardRef<HTMLVaTextInputElement, PhoneFieldProps>(
  (
    {
      label,
      error,
      hint,
      required = false,
      value,
      name,
      disabled = false,
      autocomplete = 'tel',
      success,
      messageAriaDescribedby,
      messageAriaLabelledby,
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
      type: 'tel',
      inputmode: 'tel',
      value,
      name,
      disabled,
      autocomplete,
      success,
      'message-aria-describedby': messageAriaDescribedby,
      'message-aria-labelledby': messageAriaLabelledby,
      'use-forms-pattern': useFormsPattern,
      'enable-analytics': enableAnalytics,
      ...props,
    });
  }
);

PhoneField.displayName = 'PhoneField';
