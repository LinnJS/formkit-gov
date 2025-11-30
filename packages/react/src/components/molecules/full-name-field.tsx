/**
 * FullNameField component for collecting full name information
 *
 * @module @formkit-gov/react/components/molecules
 */

import * as React from 'react';

import { SelectField, type SelectOption } from '../fields/select-field';
import { TextInputField } from '../fields/text-input-field';

/**
 * Configuration for a name field
 */
export interface NameFieldConfig {
  /**
   * Field label
   */
  label?: string;
  /**
   * Hint text
   */
  hint?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Error message
   */
  error?: string;
  /**
   * Whether to show the field (for optional fields like middle name)
   */
  show?: boolean;
}

/**
 * Configuration for suffix field
 */
export interface SuffixFieldConfig extends Omit<NameFieldConfig, 'required'> {
  /**
   * Suffix options
   */
  options?: SelectOption[];
}

/**
 * Values for the full name fields
 */
export interface FullNameValues {
  /**
   * First name value
   */
  first?: string;
  /**
   * Middle name value
   */
  middle?: string;
  /**
   * Last name value
   */
  last?: string;
  /**
   * Suffix value
   */
  suffix?: string;
}

/**
 * Props for FullNameField component
 */
export interface FullNameFieldProps {
  /**
   * Legend text for the fieldset
   * @default 'Name'
   */
  legend?: string;
  /**
   * First name field configuration
   */
  firstName: NameFieldConfig;
  /**
   * Middle name field configuration (optional)
   */
  middleName?: NameFieldConfig;
  /**
   * Last name field configuration
   */
  lastName: NameFieldConfig;
  /**
   * Suffix field configuration (optional)
   */
  suffix?: SuffixFieldConfig;
  /**
   * Change event handler
   */
  onChange?: (field: 'first' | 'middle' | 'last' | 'suffix', value: string) => void;
  /**
   * Values for all fields
   */
  values?: FullNameValues;
}

/**
 * Default suffix options
 */
const DEFAULT_SUFFIX_OPTIONS: SelectOption[] = [
  { label: '- Select -', value: '' },
  { label: 'Jr.', value: 'Jr.' },
  { label: 'Sr.', value: 'Sr.' },
  { label: 'II', value: 'II' },
  { label: 'III', value: 'III' },
  { label: 'IV', value: 'IV' },
  { label: 'V', value: 'V' },
];

/**
 * FullNameField component - Molecular component for collecting full name
 *
 * @example
 * ```tsx
 * import { FullNameField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   return (
 *     <FullNameField
 *       legend="Your name"
 *       firstName={{ label: 'First name', required: true }}
 *       lastName={{ label: 'Last name', required: true }}
 *     />
 *   );
 * }
 * ```
 *
 * @example With middle name and suffix
 * ```tsx
 * <FullNameField
 *   legend="Full legal name"
 *   firstName={{ label: 'First name', required: true }}
 *   middleName={{ label: 'Middle name', show: true }}
 *   lastName={{ label: 'Last name', required: true }}
 *   suffix={{ label: 'Suffix', show: true }}
 * />
 * ```
 *
 * @example With controlled values
 * ```tsx
 * function MyForm() {
 *   const [values, setValues] = React.useState({
 *     first: '',
 *     middle: '',
 *     last: '',
 *     suffix: '',
 *   });
 *
 *   const handleChange = (field, value) => {
 *     setValues(prev => ({ ...prev, [field]: value }));
 *   };
 *
 *   return (
 *     <FullNameField
 *       firstName={{ label: 'First name', required: true }}
 *       lastName={{ label: 'Last name', required: true }}
 *       values={values}
 *       onChange={handleChange}
 *     />
 *   );
 * }
 * ```
 *
 * @example With errors
 * ```tsx
 * <FullNameField
 *   firstName={{
 *     label: 'First name',
 *     required: true,
 *     error: 'First name is required',
 *   }}
 *   lastName={{
 *     label: 'Last name',
 *     required: true,
 *     error: 'Last name is required',
 *   }}
 * />
 * ```
 */
export const FullNameField: React.FC<FullNameFieldProps> = ({
  legend = 'Name',
  firstName,
  middleName,
  lastName,
  suffix,
  onChange,
  values,
}) => {
  const handleFieldChange = React.useCallback(
    (field: 'first' | 'middle' | 'last' | 'suffix') => (event: CustomEvent | Event) => {
      if (onChange) {
        const target = event.target as HTMLInputElement | HTMLSelectElement;
        onChange(field, target.value);
      }
    },
    [onChange]
  );

  const showMiddleName = middleName?.show !== false;
  const showSuffix = suffix?.show === true;

  return (
    <fieldset className="vads-u-margin-y--2">
      <legend className="vads-u-font-size--lg vads-u-font-weight--bold">{legend}</legend>

      <TextInputField
        label={firstName.label || 'First name'}
        {...(firstName.hint && { hint: firstName.hint })}
        {...(firstName.required && { required: firstName.required })}
        {...(firstName.error && { error: firstName.error })}
        {...(values?.first && { value: values.first })}
        name="firstName"
        onChange={handleFieldChange('first')}
      />

      {showMiddleName && middleName && (
        <TextInputField
          label={middleName.label || 'Middle name'}
          {...(middleName.hint && { hint: middleName.hint })}
          {...(middleName.required && { required: middleName.required })}
          {...(middleName.error && { error: middleName.error })}
          {...(values?.middle && { value: values.middle })}
          name="middleName"
          onChange={handleFieldChange('middle')}
        />
      )}

      <TextInputField
        label={lastName.label || 'Last name'}
        {...(lastName.hint && { hint: lastName.hint })}
        {...(lastName.required && { required: lastName.required })}
        {...(lastName.error && { error: lastName.error })}
        {...(values?.last && { value: values.last })}
        name="lastName"
        onChange={handleFieldChange('last')}
      />

      {showSuffix && suffix && (
        <SelectField
          label={suffix.label || 'Suffix'}
          {...(suffix.hint && { hint: suffix.hint })}
          {...(suffix.error && { error: suffix.error })}
          {...(values?.suffix && { value: values.suffix })}
          name="suffix"
          options={suffix.options || DEFAULT_SUFFIX_OPTIONS}
          onChange={handleFieldChange('suffix')}
        />
      )}
    </fieldset>
  );
};

FullNameField.displayName = 'FullNameField';
