import { type z } from 'zod';

/**
 * Generic form schema type
 */
export type FormSchema<T extends z.ZodTypeAny = z.ZodTypeAny> = T;

/**
 * Result of a validation operation
 */
export interface ValidationResult<T = unknown> {
  success: boolean;
  data?: T;
  errors?: ValidationError[];
}

/**
 * Individual validation error
 */
export interface ValidationError {
  path: (string | number)[];
  message: string;
  code: string;
}

/**
 * Configuration for a form field
 */
export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  validation?: z.ZodTypeAny;
  defaultValue?: unknown;
}

/**
 * Supported field types
 */
export type FieldType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'phone'
  | 'ssn'
  | 'date'
  | 'memorable-date'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'checkbox-group'
  | 'file'
  | 'currency'
  | 'number';

/**
 * Custom error messages for validation
 */
export interface ErrorMessages {
  required?: string;
  invalid?: string;
  min?: string;
  max?: string;
  pattern?: string;
  custom?: Record<string, string>;
}

/**
 * Address type for address schemas
 */
export type AddressType = 'us' | 'military' | 'international';

/**
 * US state abbreviations
 */
export type USStateAbbreviation =
  | 'AL'
  | 'AK'
  | 'AZ'
  | 'AR'
  | 'CA'
  | 'CO'
  | 'CT'
  | 'DE'
  | 'FL'
  | 'GA'
  | 'HI'
  | 'ID'
  | 'IL'
  | 'IN'
  | 'IA'
  | 'KS'
  | 'KY'
  | 'LA'
  | 'ME'
  | 'MD'
  | 'MA'
  | 'MI'
  | 'MN'
  | 'MS'
  | 'MO'
  | 'MT'
  | 'NE'
  | 'NV'
  | 'NH'
  | 'NJ'
  | 'NM'
  | 'NY'
  | 'NC'
  | 'ND'
  | 'OH'
  | 'OK'
  | 'OR'
  | 'PA'
  | 'RI'
  | 'SC'
  | 'SD'
  | 'TN'
  | 'TX'
  | 'UT'
  | 'VT'
  | 'VA'
  | 'WA'
  | 'WV'
  | 'WI'
  | 'WY'
  | 'DC'
  | 'PR'
  | 'VI'
  | 'GU'
  | 'AS'
  | 'MP';

/**
 * Military state codes
 */
export type MilitaryStateCode = 'AA' | 'AE' | 'AP';
