/**
 * DateField component wrapping VA Design System date input
 *
 * @module @formkit-gov/react/components/fields
 */

import * as React from 'react';

import { createFocusableRef } from './focus-utils';

/**
 * VA Design System date input element
 */
interface HTMLVaDateElement extends HTMLElement {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  value?: string;
  name?: string;
  disabled?: boolean;
  monthYearOnly?: boolean;
  monthOptional?: boolean;
  invalidDay?: boolean;
  invalidMonth?: boolean;
  invalidYear?: boolean;
  enableAnalytics?: boolean;
  uswds?: boolean;
}

/**
 * Props for DateField component
 */
export interface DateFieldProps {
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
   * Current value of the date input (YYYY-MM-DD format or ISO date string)
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
   * Whether to display only month and year inputs
   * @default false
   */
  monthYearOnly?: boolean;
  /**
   * Whether the month is optional when monthYearOnly is true
   * @default false
   */
  monthOptional?: boolean;
  /**
   * Whether the day field is invalid
   * @default false
   */
  invalidDay?: boolean;
  /**
   * Whether the month field is invalid
   * @default false
   */
  invalidMonth?: boolean;
  /**
   * Whether the year field is invalid
   * @default false
   */
  invalidYear?: boolean;
  /**
   * Whether to enable analytics
   * @default false
   */
  enableAnalytics?: boolean;
  /**
   * Whether to use USWDS styling
   * @default false
   */
  uswds?: boolean;
  /**
   * Message aria-describedby ID
   */
  messageAriaDescribedby?: string;
  /**
   * Change event handler (fires on blur after value changed)
   */
  onChange?: (event: CustomEvent | Event) => void;
  /**
   * Blur event handler
   */
  onBlur?: (event: CustomEvent | Event) => void;
}

/**
 * DateField component wrapping VA Design System va-date
 *
 * @example
 * ```tsx
 * import { DateField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   return (
 *     <DateField
 *       label="Date of birth"
 *       required
 *       name="dateOfBirth"
 *     />
 *   );
 * }
 * ```
 *
 * @example With React Hook Form
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { zodResolver } from '@hookform/resolvers/zod';
 * import { z } from 'zod';
 * import { createDateSchema } from '@formkit-gov/core';
 * import { DateField } from '@formkit-gov/react';
 *
 * const schema = z.object({
 *   dateOfBirth: createDateSchema({ pastOnly: true })
 * });
 *
 * function MyForm() {
 *   const { register, formState: { errors } } = useForm({
 *     resolver: zodResolver(schema)
 *   });
 *
 *   return (
 *     <DateField
 *       {...register('dateOfBirth')}
 *       label="Date of birth"
 *       error={errors.dateOfBirth?.message}
 *       required
 *     />
 *   );
 * }
 * ```
 *
 * @example Month and year only
 * ```tsx
 * <DateField
 *   label="Expected completion date"
 *   monthYearOnly
 *   required
 * />
 * ```
 *
 * @example With hint text
 * ```tsx
 * <DateField
 *   label="Start date"
 *   hint="Enter the date in MM/DD/YYYY format"
 *   required
 * />
 * ```
 */
export const DateField = React.forwardRef<HTMLVaDateElement, DateFieldProps>(
  (
    {
      label,
      error,
      hint,
      required = false,
      value,
      name,
      disabled = false,
      monthYearOnly = false,
      monthOptional = false,
      invalidDay = false,
      invalidMonth = false,
      invalidYear = false,
      enableAnalytics = false,
      uswds = false,
      messageAriaDescribedby,
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
    // For date, focus the first input (month select)
    const focusableRef = createFocusableRef(ref, 'va-select, select, input');

    // Use a local ref to attach event listeners
    const elementRef = React.useRef<HTMLVaDateElement | null>(null);

    const combinedRef = React.useCallback(
      (element: HTMLVaDateElement | null) => {
        elementRef.current = element;
        focusableRef(element);
      },
      [focusableRef]
    );

    React.useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      if (onChange) {
        element.addEventListener('dateChange', handleChange);
      }
      if (onBlur) {
        element.addEventListener('dateBlur', handleBlur);
      }

      return () => {
        if (onChange) {
          element.removeEventListener('dateChange', handleChange);
        }
        if (onBlur) {
          element.removeEventListener('dateBlur', handleBlur);
        }
      };
    }, [onChange, onBlur, handleChange, handleBlur]);

    return React.createElement('va-date', {
      ref: combinedRef,
      label,
      error: error || undefined,
      hint,
      required,
      value,
      name,
      disabled,
      'month-year-only': monthYearOnly,
      'month-optional': monthOptional,
      'invalid-day': invalidDay,
      'invalid-month': invalidMonth,
      'invalid-year': invalidYear,
      'enable-analytics': enableAnalytics,
      uswds,
      'message-aria-describedby': messageAriaDescribedby,
      ...props,
    });
  }
);

DateField.displayName = 'DateField';
