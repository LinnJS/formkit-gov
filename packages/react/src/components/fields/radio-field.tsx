/**
 * RadioField component wrapping VA Design System radio input
 *
 * @module @formkit-gov/react/components/fields
 */

import * as React from 'react';

import { createFocusableRef } from './focus-utils';

import type { HTMLVaRadioElement } from '../../types/va-components';

/**
 * Option for RadioField
 */
export interface RadioOption {
  /**
   * Display label for the option
   */
  label: string;
  /**
   * Value for the option
   */
  value: string;
  /**
   * Optional description text
   */
  description?: string;
  /**
   * Whether this option is disabled
   */
  disabled?: boolean;
}

/**
 * Props for RadioField component
 */
export interface RadioFieldProps extends Omit<
  React.ComponentPropsWithoutRef<'va-radio'>,
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
   * Array of radio options
   */
  options: RadioOption[];
  /**
   * Orientation of radio buttons
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical';
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
 * RadioField component wrapping VA Design System va-radio
 *
 * @example
 * ```tsx
 * import { RadioField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   const contactMethods = [
 *     { label: 'Email', value: 'email' },
 *     { label: 'Phone', value: 'phone' },
 *     { label: 'Mail', value: 'mail' },
 *   ];
 *
 *   return (
 *     <RadioField
 *       label="Preferred contact method"
 *       options={contactMethods}
 *       required
 *       name="contactMethod"
 *     />
 *   );
 * }
 * ```
 *
 * @example With React Hook Form
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { RadioField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   const { register, formState: { errors } } = useForm();
 *
 *   return (
 *     <RadioField
 *       {...register('contactMethod')}
 *       label="Preferred contact method"
 *       options={contactMethods}
 *       error={errors.contactMethod?.message}
 *       required
 *     />
 *   );
 * }
 * ```
 *
 * @example With descriptions
 * ```tsx
 * const options = [
 *   {
 *     label: 'Email',
 *     value: 'email',
 *     description: 'Fastest response time'
 *   },
 *   {
 *     label: 'Phone',
 *     value: 'phone',
 *     description: 'Available weekdays 9am-5pm'
 *   },
 * ];
 *
 * <RadioField
 *   label="Contact preference"
 *   options={options}
 *   name="contact"
 * />
 * ```
 *
 * @example Horizontal orientation
 * ```tsx
 * <RadioField
 *   label="Yes or No"
 *   options={[
 *     { label: 'Yes', value: 'yes' },
 *     { label: 'No', value: 'no' }
 *   ]}
 *   orientation="horizontal"
 *   name="consent"
 * />
 * ```
 */
export const RadioField = React.forwardRef<HTMLVaRadioElement, RadioFieldProps>(
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
      orientation: _orientation = 'vertical',
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    // Note: _orientation is defined for API consistency but not currently used
    // VA Design System va-radio handles orientation via CSS
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
    // For radio, focus the first radio option's input
    const focusableRef = createFocusableRef(ref, 'va-radio-option input, input[type="radio"]');

    // Use a local ref to attach event listeners
    const elementRef = React.useRef<HTMLVaRadioElement | null>(null);

    const combinedRef = React.useCallback(
      (element: HTMLVaRadioElement | null) => {
        elementRef.current = element;
        focusableRef(element);
      },
      [focusableRef]
    );

    React.useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      if (onChange) {
        element.addEventListener('vaValueChange', handleChange);
      }
      if (onBlur) {
        element.addEventListener('blur', handleBlur);
      }

      return () => {
        if (onChange) {
          element.removeEventListener('vaValueChange', handleChange);
        }
        if (onBlur) {
          element.removeEventListener('blur', handleBlur);
        }
      };
    }, [onChange, onBlur, handleChange, handleBlur]);

    // Render radio options
    const radioOptions = options.map(option =>
      React.createElement('va-radio-option', {
        key: option.value,
        label: option.label,
        value: option.value,
        description: option.description,
        disabled: option.disabled || disabled,
        checked: value === option.value,
      })
    );

    return React.createElement(
      'va-radio',
      {
        ref: combinedRef,
        label,
        error: error || undefined,
        hint,
        required,
        name,
        'enable-analytics': false,
        ...props,
      },
      radioOptions
    );
  }
);

RadioField.displayName = 'RadioField';
