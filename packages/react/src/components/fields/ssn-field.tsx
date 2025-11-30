/**
 * SSNField component wrapping VA Design System text input for Social Security Numbers
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
  maxlength?: number;
  pattern?: string;
  value?: string;
  name?: string;
  disabled?: boolean;
  inputmode?: string;
  autocomplete?: string;
}

/**
 * Props for SSNField component
 */
export interface SSNFieldProps {
  /**
   * Field label
   * @default 'Social Security number'
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
 * Formats a string to SSN format (XXX-XX-XXXX)
 * @param value - Raw input value
 * @returns Formatted SSN string
 */
function formatSSN(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');

  // Limit to 9 digits
  const limited = digits.slice(0, 9);

  // Format as XXX-XX-XXXX
  if (limited.length <= 3) {
    return limited;
  }
  if (limited.length <= 5) {
    return `${limited.slice(0, 3)}-${limited.slice(3)}`;
  }
  return `${limited.slice(0, 3)}-${limited.slice(3, 5)}-${limited.slice(5)}`;
}

/**
 * SSNField component wrapping VA Design System va-text-input
 *
 * This component provides a specialized input for Social Security Numbers with:
 * - Automatic formatting to XXX-XX-XXXX pattern
 * - Numeric input mode for mobile keyboards
 * - Maximum length enforcement (11 characters including dashes)
 * - Integration with VA Design System styling
 *
 * @example
 * ```tsx
 * import { SSNField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   return (
 *     <SSNField
 *       label="Social Security number"
 *       required
 *       name="ssn"
 *     />
 *   );
 * }
 * ```
 *
 * @example With React Hook Form
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { zodResolver } from '@hookform/resolvers/zod';
 * import { createSSNSchema } from '@formkit-gov/core';
 * import { SSNField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   const schema = z.object({
 *     ssn: createSSNSchema()
 *   });
 *
 *   const { register, formState: { errors } } = useForm({
 *     resolver: zodResolver(schema)
 *   });
 *
 *   return (
 *     <SSNField
 *       {...register('ssn')}
 *       label="Social Security number"
 *       error={errors.ssn?.message}
 *       required
 *     />
 *   );
 * }
 * ```
 *
 * @example With hint text
 * ```tsx
 * <SSNField
 *   label="Social Security number"
 *   hint="Enter in format XXX-XX-XXXX"
 *   required
 * />
 * ```
 *
 * @example With custom error
 * ```tsx
 * <SSNField
 *   label="Social Security number"
 *   error="Please enter a valid Social Security number"
 *   value="123-45-678"
 * />
 * ```
 */
export const SSNField = React.forwardRef<HTMLVaTextInputElement, SSNFieldProps>(
  (
    {
      label = 'Social Security number',
      error,
      hint,
      required = false,
      value,
      name,
      disabled = false,
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
    const [formattedValue, setFormattedValue] = React.useState(value ? formatSSN(value) : '');

    // Update formatted value when external value changes
    React.useEffect(() => {
      if (value !== undefined) {
        setFormattedValue(formatSSN(value));
      }
    }, [value]);

    const handleChange = React.useCallback(
      (event: Event) => {
        const target = event.target as HTMLInputElement;
        const rawValue = target.value;
        const formatted = formatSSN(rawValue);

        setFormattedValue(formatted);

        // Create a modified event with the formatted value
        if (onChange) {
          // Set the formatted value on the target before calling onChange
          target.value = formatted;
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
      type: 'text',
      maxlength: 11,
      pattern: '\\d{3}-\\d{2}-\\d{4}',
      value: formattedValue,
      name,
      disabled,
      inputmode: 'numeric',
      autocomplete: 'off',
      'message-aria-describedby': messageAriaDescribedby,
      'message-aria-labelledby': messageAriaLabelledby,
      'use-forms-pattern': useFormsPattern,
      'enable-analytics': enableAnalytics,
      ...props,
    });
  }
);

SSNField.displayName = 'SSNField';
