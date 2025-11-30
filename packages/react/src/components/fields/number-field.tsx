/**
 * NumberField component wrapping VA Design System number input
 *
 * @module @formkit-gov/react/components/fields
 */

import * as React from 'react';

import { createFocusableRef } from './focus-utils';

/**
 * VA Design System text input element configured for number input
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
  min?: string;
  max?: string;
  step?: string;
}

/**
 * Props for NumberField component
 */
export interface NumberFieldProps {
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
  value?: string | number;
  /**
   * Field name
   */
  name?: string;
  /**
   * Whether the field is disabled
   */
  disabled?: boolean;
  /**
   * Input mode for mobile keyboards
   * @default 'decimal'
   */
  inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  /**
   * Minimum value
   */
  min?: number;
  /**
   * Maximum value
   */
  max?: number;
  /**
   * Step increment
   */
  step?: number;
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
 * NumberField component wrapping VA Design System va-text-input with type="number"
 *
 * @example
 * ```tsx
 * import { NumberField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   return (
 *     <NumberField
 *       label="Age"
 *       required
 *       name="age"
 *       min={0}
 *       max={120}
 *     />
 *   );
 * }
 * ```
 *
 * @example With React Hook Form
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { NumberField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   const { register, formState: { errors } } = useForm();
 *
 *   return (
 *     <NumberField
 *       {...register('age', { valueAsNumber: true })}
 *       label="Age"
 *       error={errors.age?.message}
 *       required
 *       min={0}
 *       max={120}
 *     />
 *   );
 * }
 * ```
 *
 * @example With min/max constraints
 * ```tsx
 * <NumberField
 *   label="Quantity"
 *   hint="Enter a value between 1 and 100"
 *   min={1}
 *   max={100}
 *   step={1}
 *   required
 * />
 * ```
 *
 * @example Currency input with decimal step
 * ```tsx
 * <NumberField
 *   label="Amount"
 *   hint="Enter dollar amount"
 *   min={0}
 *   step={0.01}
 *   inputmode="decimal"
 * />
 * ```
 */
export const NumberField = React.forwardRef<HTMLVaTextInputElement, NumberFieldProps>(
  (
    {
      label,
      error,
      hint,
      required = false,
      value,
      name,
      disabled = false,
      inputmode = 'decimal',
      min,
      max,
      step,
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
      type: 'number',
      value: value?.toString(),
      name,
      disabled,
      inputmode,
      min: min?.toString(),
      max: max?.toString(),
      step: step?.toString(),
      success,
      'message-aria-describedby': messageAriaDescribedby,
      'message-aria-labelledby': messageAriaLabelledby,
      'use-forms-pattern': useFormsPattern,
      'enable-analytics': enableAnalytics,
      ...props,
    });
  }
);

NumberField.displayName = 'NumberField';
