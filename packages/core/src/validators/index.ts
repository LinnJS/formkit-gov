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
 */
export function validateVAFileNumber(value: string): boolean {
  return VA_FILE_NUMBER_PATTERN.test(value);
}

/**
 * Validates a US phone number
 */
export function validatePhoneNumber(value: string): boolean {
  return PHONE_PATTERN.test(value);
}

/**
 * Validates a US ZIP code
 */
export function validateZipCode(value: string): boolean {
  return ZIP_CODE_PLUS4_PATTERN.test(value);
}

/**
 * Validates a date is in the past
 */
export function validateDateInPast(value: string | Date): boolean {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date < new Date();
}

/**
 * Validates a date is in the future
 */
export function validateDateInFuture(value: string | Date): boolean {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date > new Date();
}

/**
 * Validates age is at least a minimum value
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
 */
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 10) return value;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/**
 * Formats an SSN to XXX-XX-XXXX
 */
export function formatSSN(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 9) return value;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
}

/**
 * Masks an SSN showing only last 4 digits
 */
export function maskSSN(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 9) return value;
  return `***-**-${digits.slice(5)}`;
}
