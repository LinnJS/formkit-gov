import { z } from 'zod';

import { ZIP_CODE_PLUS4_PATTERN, STATE_ABBR_PATTERN } from '../patterns';
import { type AddressType } from '../types';

export interface AddressSchemaOptions {
  /** Whether the field is required */
  required?: boolean;
  /** Address type to validate */
  type?: AddressType;
  /** Include address line 2 */
  includeLine2?: boolean;
  /** Include address line 3 */
  includeLine3?: boolean;
  /** Custom error messages */
  messages?: {
    required?: string;
    streetInvalid?: string;
    cityInvalid?: string;
    stateInvalid?: string;
    zipInvalid?: string;
    countryInvalid?: string;
  };
}

/**
 * US states and territories
 */
export const US_STATES = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
  'DC',
  'PR',
  'VI',
  'GU',
  'AS',
  'MP',
] as const;

/**
 * Military state codes
 */
export const MILITARY_STATES = ['AA', 'AE', 'AP'] as const;

/**
 * Creates a US address schema
 */
function createUSAddressSchema(options: AddressSchemaOptions) {
  const { required = true, includeLine2 = true, includeLine3 = false, messages = {} } = options;

  return z.object({
    street: required
      ? z.string().min(1, messages.required ?? 'Street address is required')
      : z.string().optional(),
    street2: includeLine2 ? z.string().optional() : z.undefined(),
    street3: includeLine3 ? z.string().optional() : z.undefined(),
    city: required
      ? z.string().min(1, messages.required ?? 'City is required')
      : z.string().optional(),
    state: required
      ? z
          .string()
          .min(1, messages.required ?? 'State is required')
          .regex(STATE_ABBR_PATTERN, messages.stateInvalid ?? 'Enter a valid 2-letter state code')
          .refine(val => US_STATES.includes(val as (typeof US_STATES)[number]), {
            message: messages.stateInvalid ?? 'Enter a valid US state',
          })
      : z.string().optional(),
    zipCode: required
      ? z
          .string()
          .min(1, messages.required ?? 'ZIP code is required')
          .regex(ZIP_CODE_PLUS4_PATTERN, messages.zipInvalid ?? 'Enter a valid ZIP code')
      : z.string().optional(),
  });
}

/**
 * Creates a military (APO/FPO/DPO) address schema
 */
function createMilitaryAddressSchema(options: AddressSchemaOptions) {
  const { required = true, includeLine2 = true, messages = {} } = options;

  return z.object({
    street: required
      ? z.string().min(1, messages.required ?? 'Street address is required')
      : z.string().optional(),
    street2: includeLine2 ? z.string().optional() : z.undefined(),
    city: required
      ? z
          .string()
          .min(1, messages.required ?? 'City is required')
          .refine(val => ['APO', 'FPO', 'DPO'].includes(val.toUpperCase()), {
            message: messages.cityInvalid ?? 'Enter APO, FPO, or DPO',
          })
      : z.string().optional(),
    state: required
      ? z
          .string()
          .min(1, messages.required ?? 'State is required')
          .refine(val => MILITARY_STATES.includes(val as (typeof MILITARY_STATES)[number]), {
            message: messages.stateInvalid ?? 'Enter AA, AE, or AP',
          })
      : z.string().optional(),
    zipCode: required
      ? z
          .string()
          .min(1, messages.required ?? 'ZIP code is required')
          .regex(ZIP_CODE_PLUS4_PATTERN, messages.zipInvalid ?? 'Enter a valid ZIP code')
      : z.string().optional(),
  });
}

/**
 * Creates an international address schema
 */
function createInternationalAddressSchema(options: AddressSchemaOptions) {
  const { required = true, includeLine2 = true, includeLine3 = false, messages = {} } = options;

  return z.object({
    street: required
      ? z.string().min(1, messages.required ?? 'Street address is required')
      : z.string().optional(),
    street2: includeLine2 ? z.string().optional() : z.undefined(),
    street3: includeLine3 ? z.string().optional() : z.undefined(),
    city: required
      ? z.string().min(1, messages.required ?? 'City is required')
      : z.string().optional(),
    province: z.string().optional(),
    postalCode: z.string().optional(),
    country: required
      ? z.string().min(1, messages.required ?? 'Country is required')
      : z.string().optional(),
  });
}

/**
 * Creates an address schema with configurable validation
 *
 * @example
 * ```ts
 * // US address
 * const usSchema = createAddressSchema({ type: 'us' });
 *
 * // Military address
 * const militarySchema = createAddressSchema({ type: 'military' });
 *
 * // International address
 * const intlSchema = createAddressSchema({ type: 'international' });
 * ```
 */
export function createAddressSchema(options: AddressSchemaOptions = {}) {
  const { type = 'us' } = options;

  switch (type) {
    case 'military':
      return createMilitaryAddressSchema(options);
    case 'international':
      return createInternationalAddressSchema(options);
    case 'us':
    default:
      return createUSAddressSchema(options);
  }
}
