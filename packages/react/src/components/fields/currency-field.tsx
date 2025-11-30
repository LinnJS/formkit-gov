/**
 * CurrencyField component wrapping VA Design System text input for currency values
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
  inputmode?: string;
  success?: string;
}

/**
 * Props for CurrencyField component
 */
export interface CurrencyFieldProps {
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
   * Success message
   */
  success?: string;
  /**
   * Currency symbol to display
   * @default '$'
   */
  currency?: string;
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
 * CurrencyField component wrapping VA Design System va-text-input for currency values
 *
 * @example
 * ```tsx
 * import { CurrencyField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   return (
 *     <CurrencyField
 *       label="Donation amount"
 *       required
 *       name="amount"
 *     />
 *   );
 * }
 * ```
 *
 * @example With React Hook Form
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { CurrencyField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   const { register, formState: { errors } } = useForm();
 *
 *   return (
 *     <CurrencyField
 *       {...register('amount')}
 *       label="Donation amount"
 *       error={errors.amount?.message}
 *       required
 *     />
 *   );
 * }
 * ```
 *
 * @example With hint text
 * ```tsx
 * <CurrencyField
 *   label="Loan amount"
 *   hint="Enter amount in U.S. dollars"
 *   required
 * />
 * ```
 *
 * @example With custom currency symbol
 * ```tsx
 * <CurrencyField
 *   label="Amount"
 *   currency="€"
 *   name="euroAmount"
 * />
 * ```
 */
export const CurrencyField = React.forwardRef<HTMLVaTextInputElement, CurrencyFieldProps>(
  (
    {
      label,
      error,
      hint,
      required = false,
      value,
      name,
      disabled = false,
      success,
      currency = '$',
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

    // Construct hint with currency prefix
    const hintWithCurrency =
      hint || `Enter amount in ${currency === '$' ? 'U.S. dollars' : currency}`;

    return React.createElement('va-text-input', {
      ref: combinedRef,
      label,
      error: error || undefined,
      hint: hintWithCurrency,
      required,
      type: 'text',
      inputmode: 'decimal',
      value,
      name,
      disabled,
      success,
      'message-aria-describedby': messageAriaDescribedby,
      'message-aria-labelledby': messageAriaLabelledby,
      'use-forms-pattern': useFormsPattern,
      'enable-analytics': enableAnalytics,
      ...props,
    });
  }
);

CurrencyField.displayName = 'CurrencyField';
