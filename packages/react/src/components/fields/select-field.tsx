import * as React from 'react';

import { createFocusableRef } from './focus-utils';

import type { HTMLVaSelectElement } from '../../types/va-components';

/**
 * Option for SelectField
 */
export interface SelectOption {
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
 * Props for SelectField component
 */
export interface SelectFieldProps extends Omit<
  React.ComponentPropsWithoutRef<'va-select'>,
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
   * Array of select options
   */
  options?: SelectOption[];
  /**
   * Change event handler
   */
  onChange?: (event: CustomEvent | Event) => void;
  /**
   * Blur event handler
   */
  onBlur?: (event: CustomEvent | Event) => void;
  /**
   * Children (option elements)
   */
  children?: React.ReactNode;
}

/**
 * SelectField component wrapping VA Design System va-select
 *
 * @example
 * ```tsx
 * import { SelectField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   const states = [
 *     { label: 'California', value: 'CA' },
 *     { label: 'New York', value: 'NY' },
 *     { label: 'Texas', value: 'TX' },
 *   ];
 *
 *   return (
 *     <SelectField
 *       label="State"
 *       options={states}
 *       required
 *       name="state"
 *     />
 *   );
 * }
 * ```
 *
 * @example With React Hook Form
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { SelectField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   const { register, formState: { errors } } = useForm();
 *
 *   return (
 *     <SelectField
 *       {...register('country')}
 *       label="Country"
 *       options={countries}
 *       error={errors.country?.message}
 *     />
 *   );
 * }
 * ```
 *
 * @example With children
 * ```tsx
 * <SelectField label="Select a fruit" name="fruit">
 *   <option value="">-- Select --</option>
 *   <option value="apple">Apple</option>
 *   <option value="banana">Banana</option>
 *   <option value="orange">Orange</option>
 * </SelectField>
 * ```
 *
 * @example With hint
 * ```tsx
 * <SelectField
 *   label="Relationship"
 *   hint="Choose your relationship to the veteran"
 *   options={relationships}
 *   name="relationship"
 * />
 * ```
 */
export const SelectField = React.forwardRef<HTMLVaSelectElement, SelectFieldProps>(
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
      onChange,
      onBlur,
      children,
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
    const focusableRef = createFocusableRef(ref, 'select');

    // Use a local ref to attach event listeners
    const elementRef = React.useRef<HTMLVaSelectElement | null>(null);

    const combinedRef = React.useCallback(
      (element: HTMLVaSelectElement | null) => {
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
      'va-select',
      {
        ref: combinedRef,
        label,
        error: error || undefined,
        hint,
        required,
        value: value || '',
        name,
        disabled,
        ...props,
      },
      optionElements || children
    );
  }
);

SelectField.displayName = 'SelectField';
