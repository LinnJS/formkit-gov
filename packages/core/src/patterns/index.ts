/**
 * Shared regex patterns for validation
 *
 * These patterns are designed to be used with Zod's .regex() method
 * and provide consistent validation across form fields.
 */

/**
 * Social Security Number pattern
 * Format: XXX-XX-XXXX
 */
export const SSN_PATTERN = /^\d{3}-\d{2}-\d{4}$/;

/**
 * Social Security Number pattern (with or without dashes)
 */
export const SSN_FLEXIBLE_PATTERN = /^\d{3}-?\d{2}-?\d{4}$/;

/**
 * VA File Number pattern
 * 8-9 digits, may start with 'C' for claim number
 */
export const VA_FILE_NUMBER_PATTERN = /^[Cc]?\d{7,9}$/;

/**
 * US Phone number pattern
 * Format: (XXX) XXX-XXXX or XXX-XXX-XXXX
 */
export const PHONE_PATTERN = /^(\(\d{3}\)\s?\d{3}-\d{4}|\d{3}-\d{3}-\d{4})$/;

/**
 * US Phone number pattern (digits only, 10 digits)
 */
export const PHONE_DIGITS_PATTERN = /^\d{10}$/;

/**
 * International phone pattern
 */
export const INTERNATIONAL_PHONE_PATTERN = /^\+?[1-9]\d{1,14}$/;

/**
 * US ZIP code pattern (5 digits)
 */
export const ZIP_CODE_PATTERN = /^\d{5}$/;

/**
 * US ZIP code pattern with optional +4
 */
export const ZIP_CODE_PLUS4_PATTERN = /^\d{5}(-\d{4})?$/;

/**
 * Email pattern (simplified, RFC 5322 compliant)
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Date pattern (MM/DD/YYYY)
 */
export const DATE_MMDDYYYY_PATTERN = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;

/**
 * Date pattern (YYYY-MM-DD, ISO format)
 */
export const DATE_ISO_PATTERN = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

/**
 * Year pattern (4 digits, reasonable range)
 */
export const YEAR_PATTERN = /^(19|20)\d{2}$/;

/**
 * Month pattern (1-12 or 01-12)
 */
export const MONTH_PATTERN = /^(0?[1-9]|1[0-2])$/;

/**
 * Day pattern (1-31 or 01-31)
 */
export const DAY_PATTERN = /^(0?[1-9]|[12]\d|3[01])$/;

/**
 * Service number pattern (military)
 * Various formats depending on branch and era
 */
export const SERVICE_NUMBER_PATTERN = /^[A-Za-z]?\d{6,9}$/;

/**
 * Currency pattern (US dollars)
 * Allows: 123, 123.45, 1,234.56
 */
export const CURRENCY_PATTERN = /^\d{1,3}(,\d{3})*(\.\d{2})?$/;

/**
 * Percentage pattern (0-100 with optional decimals)
 */
export const PERCENTAGE_PATTERN = /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?)$/;

/**
 * Name pattern (letters, spaces, hyphens, apostrophes)
 */
export const NAME_PATTERN = /^[a-zA-Z][a-zA-Z\s'-]*$/;

/**
 * Street address pattern (alphanumeric with common punctuation)
 */
export const STREET_ADDRESS_PATTERN = /^[a-zA-Z0-9\s.,#'-]+$/;

/**
 * City pattern (letters, spaces, hyphens)
 */
export const CITY_PATTERN = /^[a-zA-Z\s'-]+$/;

/**
 * Military APO/FPO/DPO pattern
 */
export const MILITARY_CITY_PATTERN = /^(APO|FPO|DPO)$/i;

/**
 * US State abbreviation pattern
 */
export const STATE_ABBR_PATTERN = /^[A-Z]{2}$/;

/**
 * Alphanumeric pattern (letters and numbers only)
 */
export const ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9]+$/;

/**
 * All patterns exported as a single object for convenience
 */
export const patterns = {
  ssn: SSN_PATTERN,
  ssnFlexible: SSN_FLEXIBLE_PATTERN,
  vaFileNumber: VA_FILE_NUMBER_PATTERN,
  phone: PHONE_PATTERN,
  phoneDigits: PHONE_DIGITS_PATTERN,
  internationalPhone: INTERNATIONAL_PHONE_PATTERN,
  zipCode: ZIP_CODE_PATTERN,
  zipCodePlus4: ZIP_CODE_PLUS4_PATTERN,
  email: EMAIL_PATTERN,
  dateMmddyyyy: DATE_MMDDYYYY_PATTERN,
  dateIso: DATE_ISO_PATTERN,
  year: YEAR_PATTERN,
  month: MONTH_PATTERN,
  day: DAY_PATTERN,
  serviceNumber: SERVICE_NUMBER_PATTERN,
  currency: CURRENCY_PATTERN,
  percentage: PERCENTAGE_PATTERN,
  name: NAME_PATTERN,
  streetAddress: STREET_ADDRESS_PATTERN,
  city: CITY_PATTERN,
  militaryCity: MILITARY_CITY_PATTERN,
  stateAbbr: STATE_ABBR_PATTERN,
  alphanumeric: ALPHANUMERIC_PATTERN,
} as const;
