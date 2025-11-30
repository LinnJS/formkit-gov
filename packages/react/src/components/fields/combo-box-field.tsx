import * as React from 'react';

import { createFocusableRef } from './focus-utils';

import type { HTMLVaComboBoxElement } from '../../types/va-components';

/**
 * Option for ComboBoxField
 */
export interface ComboBoxOption {
  /**
   * Display label for the option
   */
  label: string;
  /**
   * Value for the option
   */
  value: string;
}

/**
 * Props for ComboBoxField component
 */
export interface ComboBoxFieldProps extends Omit<
  React.ComponentPropsWithoutRef<'va-combo-box'>,
  'value' | 'onChange' | 'onBlur'
> {
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
   * Selected value
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
   * Array of combo box options
   */
  options?: ComboBoxOption[];
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
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
 * ComboBoxField component wrapping VA Design System va-combo-box
 *
 * @example
 * ```tsx
 * import { ComboBoxField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   const countries = [
 *     { label: 'United States', value: 'US' },
 *     { label: 'Canada', value: 'CA' },
 *     { label: 'Mexico', value: 'MX' },
 *   ];
 *
 *   return (
 *     <ComboBoxField
 *       label="Country"
 *       options={countries}
 *       required
 *       name="country"
 *     />
 *   );
 * }
 * ```
 *
 * @example With React Hook Form
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { ComboBoxField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   const { register, formState: { errors } } = useForm();
 *
 *   return (
 *     <ComboBoxField
 *       {...register('country')}
 *       label="Country"
 *       options={countries}
 *       error={errors.country?.message}
 *     />
 *   );
 * }
 * ```
 *
 * @example With placeholder
 * ```tsx
 * <ComboBoxField
 *   label="Search for a city"
 *   placeholder="Start typing..."
 *   options={cities}
 *   name="city"
 * />
 * ```
 *
 * @example With hint
 * ```tsx
 * <ComboBoxField
 *   label="Preferred language"
 *   hint="Select the language you're most comfortable with"
 *   options={languages}
 *   name="language"
 * />
 * ```
 */
export const ComboBoxField = React.forwardRef<HTMLVaComboBoxElement, ComboBoxFieldProps>(
  (
    {
      label,
      error,
      hint,
      required = false,
      value,
      name,
      disabled = false,
      options,
      placeholder,
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
    const focusableRef = createFocusableRef(ref, 'input');

    // Use a local ref to attach event listeners
    const elementRef = React.useRef<HTMLVaComboBoxElement | null>(null);

    const combinedRef = React.useCallback(
      (element: HTMLVaComboBoxElement | null) => {
        elementRef.current = element;
        focusableRef(element);
      },
      [focusableRef]
    );

    React.useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      if (onChange) {
        element.addEventListener('vaSelect', handleChange);
      }
      if (onBlur) {
        element.addEventListener('blur', handleBlur);
      }

      return () => {
        if (onChange) {
          element.removeEventListener('vaSelect', handleChange);
        }
        if (onBlur) {
          element.removeEventListener('blur', handleBlur);
        }
      };
    }, [onChange, onBlur, handleChange, handleBlur]);

    // Render options from options prop if provided
    const optionElements = options
      ? options.map(option =>
          React.createElement('option', { key: option.value, value: option.value }, option.label)
        )
      : null;

    return React.createElement(
      'va-combo-box',
      {
        ref: combinedRef,
        label,
        error: error || undefined,
        hint,
        required,
        value: value || '',
        name,
        disabled,
        placeholder,
        ...props,
      },
      optionElements
    );
  }
);

ComboBoxField.displayName = 'ComboBoxField';
