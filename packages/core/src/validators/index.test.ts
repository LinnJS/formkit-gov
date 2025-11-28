import { describe, it, expect } from 'vitest';

import {
  validateSSN,
  validatePhoneNumber,
  validateZipCode,
  formatPhoneNumber,
  formatSSN,
  maskSSN,
  validateMinimumAge,
} from './index';

describe('validateSSN', () => {
  it('returns true for valid SSN', () => {
    expect(validateSSN('123-45-6789')).toBe(true);
  });

  it('returns false for invalid format', () => {
    expect(validateSSN('123456789')).toBe(false);
  });

  it('returns false for SSN with area 000', () => {
    expect(validateSSN('000-45-6789')).toBe(false);
  });

  it('returns false for SSN starting with 9', () => {
    expect(validateSSN('900-12-3456')).toBe(false);
  });
});

describe('validatePhoneNumber', () => {
  it('returns true for (XXX) XXX-XXXX format', () => {
    expect(validatePhoneNumber('(555) 123-4567')).toBe(true);
  });

  it('returns true for XXX-XXX-XXXX format', () => {
    expect(validatePhoneNumber('555-123-4567')).toBe(true);
  });

  it('returns false for invalid format', () => {
    expect(validatePhoneNumber('5551234567')).toBe(false);
  });
});

describe('validateZipCode', () => {
  it('returns true for 5-digit ZIP', () => {
    expect(validateZipCode('12345')).toBe(true);
  });

  it('returns true for ZIP+4', () => {
    expect(validateZipCode('12345-6789')).toBe(true);
  });

  it('returns false for invalid ZIP', () => {
    expect(validateZipCode('1234')).toBe(false);
  });
});

describe('formatPhoneNumber', () => {
  it('formats 10 digits to (XXX) XXX-XXXX', () => {
    expect(formatPhoneNumber('5551234567')).toBe('(555) 123-4567');
  });

  it('returns original value if not 10 digits', () => {
    expect(formatPhoneNumber('555123')).toBe('555123');
  });
});

describe('formatSSN', () => {
  it('formats 9 digits to XXX-XX-XXXX', () => {
    expect(formatSSN('123456789')).toBe('123-45-6789');
  });

  it('returns original value if not 9 digits', () => {
    expect(formatSSN('12345')).toBe('12345');
  });
});

describe('maskSSN', () => {
  it('masks first 5 digits', () => {
    expect(maskSSN('123-45-6789')).toBe('***-**-6789');
  });

  it('returns original if not valid format', () => {
    expect(maskSSN('12345')).toBe('12345');
  });
});

describe('validateMinimumAge', () => {
  it('returns true when age meets minimum', () => {
    const birthDate = new Date();
    birthDate.setFullYear(birthDate.getFullYear() - 20);
    expect(validateMinimumAge(birthDate, 18)).toBe(true);
  });

  it('returns false when age is below minimum', () => {
    const birthDate = new Date();
    birthDate.setFullYear(birthDate.getFullYear() - 15);
    expect(validateMinimumAge(birthDate, 18)).toBe(false);
  });

  it('handles string dates', () => {
    const birthDate = '1990-01-01';
    expect(validateMinimumAge(birthDate, 18)).toBe(true);
  });
});
