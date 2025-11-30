/**
 * AddressField molecular component for collecting complete mailing addresses
 *
 * @module @formkit-gov/react/components/molecules
 */

import * as React from 'react';

import { SelectField, type SelectOption } from '../fields/select-field';
import { TextInputField } from '../fields/text-input-field';

/**
 * US states and territories for address selection
 */
export const DEFAULT_US_STATES: SelectOption[] = [
  { label: 'Alabama', value: 'AL' },
  { label: 'Alaska', value: 'AK' },
  { label: 'Arizona', value: 'AZ' },
  { label: 'Arkansas', value: 'AR' },
  { label: 'California', value: 'CA' },
  { label: 'Colorado', value: 'CO' },
  { label: 'Connecticut', value: 'CT' },
  { label: 'Delaware', value: 'DE' },
  { label: 'District of Columbia', value: 'DC' },
  { label: 'Florida', value: 'FL' },
  { label: 'Georgia', value: 'GA' },
  { label: 'Hawaii', value: 'HI' },
  { label: 'Idaho', value: 'ID' },
  { label: 'Illinois', value: 'IL' },
  { label: 'Indiana', value: 'IN' },
  { label: 'Iowa', value: 'IA' },
  { label: 'Kansas', value: 'KS' },
  { label: 'Kentucky', value: 'KY' },
  { label: 'Louisiana', value: 'LA' },
  { label: 'Maine', value: 'ME' },
  { label: 'Maryland', value: 'MD' },
  { label: 'Massachusetts', value: 'MA' },
  { label: 'Michigan', value: 'MI' },
  { label: 'Minnesota', value: 'MN' },
  { label: 'Mississippi', value: 'MS' },
  { label: 'Missouri', value: 'MO' },
  { label: 'Montana', value: 'MT' },
  { label: 'Nebraska', value: 'NE' },
  { label: 'Nevada', value: 'NV' },
  { label: 'New Hampshire', value: 'NH' },
  { label: 'New Jersey', value: 'NJ' },
  { label: 'New Mexico', value: 'NM' },
  { label: 'New York', value: 'NY' },
  { label: 'North Carolina', value: 'NC' },
  { label: 'North Dakota', value: 'ND' },
  { label: 'Ohio', value: 'OH' },
  { label: 'Oklahoma', value: 'OK' },
  { label: 'Oregon', value: 'OR' },
  { label: 'Pennsylvania', value: 'PA' },
  { label: 'Puerto Rico', value: 'PR' },
  { label: 'Rhode Island', value: 'RI' },
  { label: 'South Carolina', value: 'SC' },
  { label: 'South Dakota', value: 'SD' },
  { label: 'Tennessee', value: 'TN' },
  { label: 'Texas', value: 'TX' },
  { label: 'Utah', value: 'UT' },
  { label: 'Vermont', value: 'VT' },
  { label: 'Virgin Islands', value: 'VI' },
  { label: 'Virginia', value: 'VA' },
  { label: 'Washington', value: 'WA' },
  { label: 'West Virginia', value: 'WV' },
  { label: 'Wisconsin', value: 'WI' },
  { label: 'Wyoming', value: 'WY' },
  { label: 'Armed Forces Americas', value: 'AA' },
  { label: 'Armed Forces Europe', value: 'AE' },
  { label: 'Armed Forces Pacific', value: 'AP' },
  { label: 'American Samoa', value: 'AS' },
  { label: 'Guam', value: 'GU' },
  { label: 'Northern Mariana Islands', value: 'MP' },
];

/**
 * Default countries list
 */
export const DEFAULT_COUNTRIES: SelectOption[] = [
  { label: 'United States', value: 'USA' },
  { label: 'Canada', value: 'CAN' },
  { label: 'Mexico', value: 'MEX' },
];

/**
 * State option configuration
 */
export interface StateOption {
  label: string;
  value: string;
}

/**
 * Country option configuration
 */
export interface CountryOption {
  label: string;
  value: string;
}

/**
 * Field configuration for individual address components
 */
export interface AddressFieldConfig {
  label?: string;
  hint?: string;
  required?: boolean;
  error?: string;
}

/**
 * Street2 field configuration
 */
export interface Street2FieldConfig extends AddressFieldConfig {
  show?: boolean;
}

/**
 * State field configuration
 */
export interface StateFieldConfig extends AddressFieldConfig {
  options?: StateOption[];
}

/**
 * Country field configuration
 */
export interface CountryFieldConfig extends AddressFieldConfig {
  options?: CountryOption[];
  show?: boolean;
}

/**
 * Address values for controlled component
 */
export interface AddressValues {
  street?: string;
  street2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

/**
 * Props for AddressField component
 */
export interface AddressFieldProps {
  /**
   * Legend text for the fieldset
   * @default "Mailing address"
   */
  legend?: string;
  /**
   * Street address field configuration
   */
  street?: AddressFieldConfig;
  /**
   * Street address line 2 field configuration
   */
  street2?: Street2FieldConfig;
  /**
   * City field configuration
   */
  city?: AddressFieldConfig;
  /**
   * State field configuration
   */
  state?: StateFieldConfig;
  /**
   * ZIP code field configuration
   */
  zipCode?: AddressFieldConfig;
  /**
   * Country field configuration
   */
  country?: CountryFieldConfig;
  /**
   * Change event handler
   */
  onChange?: (
    field: 'street' | 'street2' | 'city' | 'state' | 'zipCode' | 'country',
    value: string
  ) => void;
  /**
   * Current values for controlled component
   */
  values?: AddressValues;
}

/**
 * AddressField molecular component for collecting complete mailing addresses
 *
 * This compound component combines multiple fields (street, city, state, ZIP code)
 * for collecting a complete US mailing address. It uses VA Design System components
 * and follows accessibility best practices with fieldset/legend grouping.
 *
 * @example
 * ```tsx
 * import { AddressField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   return (
 *     <AddressField
 *       legend="Mailing address"
 *       street={{ required: true }}
 *       city={{ required: true }}
 *       state={{ required: true }}
 *       zipCode={{ required: true }}
 *     />
 *   );
 * }
 * ```
 *
 * @example With custom state options
 * ```tsx
 * const states = [
 *   { label: 'California', value: 'CA' },
 *   { label: 'New York', value: 'NY' },
 * ];
 *
 * <AddressField
 *   state={{ options: states }}
 * />
 * ```
 *
 * @example With street line 2 and country
 * ```tsx
 * <AddressField
 *   street2={{ show: true }}
 *   country={{ show: true }}
 * />
 * ```
 *
 * @example Controlled component with onChange
 * ```tsx
 * function MyForm() {
 *   const [address, setAddress] = useState({});
 *
 *   const handleChange = (field, value) => {
 *     setAddress(prev => ({ ...prev, [field]: value }));
 *   };
 *
 *   return (
 *     <AddressField
 *       values={address}
 *       onChange={handleChange}
 *     />
 *   );
 * }
 * ```
 *
 * @example With React Hook Form
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { AddressField } from '@formkit-gov/react';
 *
 * function MyForm() {
 *   const { register, formState: { errors } } = useForm();
 *
 *   return (
 *     <fieldset>
 *       <legend>Mailing address</legend>
 *       <TextInputField
 *         {...register('street')}
 *         label="Street address"
 *         error={errors.street?.message}
 *         required
 *       />
 *       {/ * Additional fields * /}
 *     </fieldset>
 *   );
 * }
 * ```
 */
export const AddressField = React.forwardRef<HTMLFieldSetElement, AddressFieldProps>(
  (
    {
      legend = 'Mailing address',
      street,
      street2,
      city,
      state,
      zipCode,
      country,
      onChange,
      values,
    },
    ref
  ) => {
    const handleFieldChange = React.useCallback(
      (field: 'street' | 'street2' | 'city' | 'state' | 'zipCode' | 'country') =>
        (event: CustomEvent | Event) => {
          if (onChange) {
            const target = event.target as HTMLInputElement;
            onChange(field, target.value || '');
          }
        },
      [onChange]
    );

    // Default field labels
    const streetLabel = street?.label ?? 'Street address';
    const street2Label = street2?.label ?? 'Street address line 2';
    const cityLabel = city?.label ?? 'City';
    const stateLabel = state?.label ?? 'State';
    const zipCodeLabel = zipCode?.label ?? 'ZIP code';
    const countryLabel = country?.label ?? 'Country';

    // Determine visibility
    const showStreet2 = street2?.show ?? false;
    const showCountry = country?.show ?? false;

    // State options
    const stateOptions = state?.options ?? DEFAULT_US_STATES;
    const countryOptions = country?.options ?? DEFAULT_COUNTRIES;

    return (
      <fieldset ref={ref} className="vads-u-margin-y--2" style={{ border: 'none', padding: 0 }}>
        <legend className="vads-u-font-size--lg vads-u-font-weight--bold">{legend}</legend>

        {/* Street address */}
        <TextInputField
          label={streetLabel}
          {...(street?.hint && { hint: street.hint })}
          {...(street?.required && { required: street.required })}
          {...(street?.error && { error: street.error })}
          {...(values?.street && { value: values.street })}
          autocomplete="address-line1"
          onChange={handleFieldChange('street')}
        />

        {/* Street address line 2 (optional) */}
        {showStreet2 && (
          <TextInputField
            label={street2Label}
            {...(street2?.hint && { hint: street2.hint })}
            {...(street2?.error && { error: street2.error })}
            {...(values?.street2 && { value: values.street2 })}
            autocomplete="address-line2"
            onChange={handleFieldChange('street2')}
          />
        )}

        {/* City */}
        <TextInputField
          label={cityLabel}
          {...(city?.hint && { hint: city.hint })}
          {...(city?.required && { required: city.required })}
          {...(city?.error && { error: city.error })}
          {...(values?.city && { value: values.city })}
          autocomplete="address-level2"
          onChange={handleFieldChange('city')}
        />

        {/* State and ZIP code row */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <SelectField
              label={stateLabel}
              {...(state?.hint && { hint: state.hint })}
              {...(state?.required && { required: state.required })}
              {...(state?.error && { error: state.error })}
              {...(values?.state && { value: values.state })}
              options={stateOptions}
              onChange={handleFieldChange('state')}
            />
          </div>

          <div style={{ flex: 1 }}>
            <TextInputField
              label={zipCodeLabel}
              {...(zipCode?.hint && { hint: zipCode.hint })}
              {...(zipCode?.required && { required: zipCode.required })}
              {...(zipCode?.error && { error: zipCode.error })}
              {...(values?.zipCode && { value: values.zipCode })}
              autocomplete="postal-code"
              inputmode="numeric"
              maxlength={10}
              onChange={handleFieldChange('zipCode')}
            />
          </div>
        </div>

        {/* Country (optional) */}
        {showCountry && (
          <SelectField
            label={countryLabel}
            {...(country?.hint && { hint: country.hint })}
            {...(country?.error && { error: country.error })}
            {...(values?.country && { value: values.country })}
            options={countryOptions}
            onChange={handleFieldChange('country')}
          />
        )}
      </fieldset>
    );
  }
);

AddressField.displayName = 'AddressField';
