/**
 * MemorableDateField component wrapping VA Design System memorable date
 *
 * @module @formkit-gov/react/components/fields
 */

import * as React from 'react';

import { createFocusableRef } from './focus-utils';

/**
 * VA Design System memorable date element
 */
interface HTMLVaMemorableDateElement extends HTMLElement {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string;
  monthSelect?: boolean;
  uswds?: boolean;
}

/**
 * Props for MemorableDateField component
 */
export interface MemorableDateFieldProps {
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
   * Whether the field is disabled
   */
  disabled?: boolean;
  /**
   * Field name
   */
  name?: string;
  /**
   * Current value of the date (YYYY-MM-DD format)
   */
  value?: string;
  /**
   * Whether to use a select for the month field
   */
  monthSelect?: boolean;
  /**
   * Whether to use USWDS styling
   */
  uswds?: boolean;
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
   * Date change event handler
   */
  onChange?: (event: CustomEvent | Event) => void;
  /**
   * Blur event handler
   */
  onBlur?: (event: CustomEvent | Event) => void;
}

/**
 * MemorableDateField component wrapping VA Design System va-memorable-date
 *
 * @example
 * ```tsx
 * import { MemorableDateField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   return (
 *     <MemorableDateField
 *       label="Date of birth"
 *       required
 *       name="birthDate"
 *     />
 *   );
 * }
 * ```
 *
 * @example With React Hook Form
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { MemorableDateField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   const { register, formState: { errors } } = useForm();
 *
 *   return (
 *     <MemorableDateField
 *       {...register('birthDate')}
 *       label="Date of birth"
 *       error={errors.birthDate?.message}
 *       required
 *     />
 *   );
 * }
 * ```
 *
 * @example With month select
 * ```tsx
 * <MemorableDateField
 *   label="Date of birth"
 *   monthSelect
 *   hint="For example: January 15, 1990"
 *   required
 * />
 * ```
 *
 * @example With hint
 * ```tsx
 * <MemorableDateField
 *   label="Date of birth"
 *   hint="This should be a date you know well, like your birthday"
 *   required
 * />
 * ```
 */
export const MemorableDateField = React.forwardRef<
  HTMLVaMemorableDateElement,
  MemorableDateFieldProps
>(
  (
    {
      label,
      error,
      hint,
      required = false,
      disabled = false,
      name,
      value,
      monthSelect = false,
      uswds = false,
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
    const handleDateChange = React.useCallback(
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
    // For memorable date, focus the first input (month select or text input)
    const focusableRef = createFocusableRef(ref, 'va-select, va-text-input, input, select');

    // Use a local ref to attach event listeners
    const elementRef = React.useRef<HTMLVaMemorableDateElement | null>(null);

    const combinedRef = React.useCallback(
      (element: HTMLVaMemorableDateElement | null) => {
        elementRef.current = element;
        focusableRef(element);
      },
      [focusableRef]
    );

    React.useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      if (onChange) {
        element.addEventListener('dateChange', handleDateChange);
      }
      if (onBlur) {
        element.addEventListener('blur', handleBlur);
      }

      return () => {
        if (onChange) {
          element.removeEventListener('dateChange', handleDateChange);
        }
        if (onBlur) {
          element.removeEventListener('blur', handleBlur);
        }
      };
    }, [onChange, onBlur, handleDateChange, handleBlur]);

    return React.createElement('va-memorable-date', {
      ref: combinedRef,
      label,
      error: error || undefined,
      hint,
      required,
      disabled,
      name,
      value,
      'month-select': monthSelect,
      uswds,
      'message-aria-describedby': messageAriaDescribedby,
      'message-aria-labelledby': messageAriaLabelledby,
      'use-forms-pattern': useFormsPattern,
      'enable-analytics': enableAnalytics,
      ...props,
    });
  }
);

MemorableDateField.displayName = 'MemorableDateField';
