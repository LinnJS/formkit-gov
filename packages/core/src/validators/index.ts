/**
 * Validation utility functions
 */

import {
  SSN_PATTERN,
  VA_FILE_NUMBER_PATTERN,
  PHONE_PATTERN,
  ZIP_CODE_PLUS4_PATTERN,
} from '../patterns';

/**
 * Validates a Social Security Number
 *
 * @example
 * ```ts
 * validateSSN('123-45-6789'); // true
 * validateSSN('000-45-6789'); // false (area cannot be 000)
 * validateSSN('900-12-3456'); // false (cannot start with 9)
 * ```
 */
export function validateSSN(value: string): boolean {
  if (!SSN_PATTERN.test(value)) return false;

  const digits = value.replace(/-/g, '');
  const area = digits.slice(0, 3);
  const group = digits.slice(3, 5);
  const serial = digits.slice(5, 9);

  // Cannot be all zeros in any group
  if (area === '000' || group === '00' || serial === '0000') return false;

  // Cannot start with 9 (reserved for ITIN)
  if (digits[0] === '9') return false;

  return true;
}

/**
 * Validates a VA file number
 *
 * @example
 * ```ts
 * validateVAFileNumber('12345678');  // true (8 digits)
 * validateVAFileNumber('C12345678'); // true (with C prefix)
 * validateVAFileNumber('123456');    // false (too few digits)
 * ```
 */
export function validateVAFileNumber(value: string): boolean {
  return VA_FILE_NUMBER_PATTERN.test(value);
}

/**
 * Validates a US phone number
 *
 * @example
 * ```ts
 * validatePhoneNumber('(555) 123-4567'); // true
 * validatePhoneNumber('555-123-4567');   // true
 * validatePhoneNumber('5551234567');     // false (no separators)
 * ```
 */
export function validatePhoneNumber(value: string): boolean {
  return PHONE_PATTERN.test(value);
}

/**
 * Validates a US ZIP code
 *
 * @example
 * ```ts
 * validateZipCode('12345');      // true
 * validateZipCode('12345-6789'); // true (ZIP+4)
 * validateZipCode('1234');       // false (too short)
 * ```
 */
export function validateZipCode(value: string): boolean {
  return ZIP_CODE_PLUS4_PATTERN.test(value);
}

/**
 * Validates a date is in the past
 *
 * @example
 * ```ts
 * validateDateInPast('2000-01-01');      // true
 * validateDateInPast(new Date(2000, 0)); // true
 * validateDateInPast('2099-12-31');      // false
 * ```
 */
export function validateDateInPast(value: string | Date): boolean {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date < new Date();
}

/**
 * Validates a date is in the future
 *
 * @example
 * ```ts
 * validateDateInFuture('2099-12-31');      // true
 * validateDateInFuture(new Date(2099, 0)); // true
 * validateDateInFuture('2000-01-01');      // false
 * ```
 */
export function validateDateInFuture(value: string | Date): boolean {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date > new Date();
}

/**
 * Validates age is at least a minimum value
 *
 * @example
 * ```ts
 * // Check if person is at least 18 years old
 * validateMinimumAge('1990-01-01', 18); // true
 * validateMinimumAge(new Date(2020, 0), 18); // false
 * ```
 */
export function validateMinimumAge(birthDate: string | Date, minAge: number): boolean {
  const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= minAge;
  }

  return age >= minAge;
}

/**
 * Formats a phone number to (XXX) XXX-XXXX
 *
 * @example
 * ```ts
 * formatPhoneNumber('5551234567'); // '(555) 123-4567'
 * formatPhoneNumber('555123');     // '555123' (invalid, returned as-is)
 * ```
 */
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 10) return value;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/**
 * Formats an SSN to XXX-XX-XXXX
 *
 * @example
 * ```ts
 * formatSSN('123456789'); // '123-45-6789'
 * formatSSN('12345');     // '12345' (invalid, returned as-is)
 * ```
 */
export function formatSSN(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 9) return value;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
}

/**
 * Masks an SSN showing only last 4 digits
 *
 * @example
 * ```ts
 * maskSSN('123-45-6789'); // '***-**-6789'
 * maskSSN('123456789');   // '***-**-6789'
 * maskSSN('12345');       // '12345' (invalid, returned as-is)
 * ```
 */
export function maskSSN(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 9) return value;
  return `***-**-${digits.slice(5)}`;
}
