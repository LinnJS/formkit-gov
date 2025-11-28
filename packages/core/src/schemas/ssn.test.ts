import { describe, it, expect } from 'vitest';

import { createSSNSchema } from './ssn';

describe('createSSNSchema', () => {
  const schema = createSSNSchema();

  describe('valid SSNs', () => {
    it('accepts correctly formatted SSN', () => {
      expect(schema.safeParse('123-45-6789').success).toBe(true);
    });

    it('accepts SSN with valid area, group, and serial numbers', () => {
      expect(schema.safeParse('001-01-0001').success).toBe(true);
    });
  });

  describe('invalid SSNs', () => {
    it('rejects SSN without dashes', () => {
      expect(schema.safeParse('123456789').success).toBe(false);
    });

    it('rejects SSN with wrong format', () => {
      expect(schema.safeParse('12-345-6789').success).toBe(false);
    });

    it('rejects SSN with area 000', () => {
      expect(schema.safeParse('000-45-6789').success).toBe(false);
    });

    it('rejects SSN with group 00', () => {
      expect(schema.safeParse('123-00-6789').success).toBe(false);
    });

    it('rejects SSN with serial 0000', () => {
      expect(schema.safeParse('123-45-0000').success).toBe(false);
    });

    it('rejects SSN starting with 9 (ITIN)', () => {
      expect(schema.safeParse('900-45-6789').success).toBe(false);
    });

    it('rejects empty string', () => {
      expect(schema.safeParse('').success).toBe(false);
    });
  });

  describe('flexible mode', () => {
    const flexibleSchema = createSSNSchema({ flexible: true });

    it('accepts SSN with dashes', () => {
      expect(flexibleSchema.safeParse('123-45-6789').success).toBe(true);
    });

    it('accepts SSN without dashes', () => {
      expect(flexibleSchema.safeParse('123456789').success).toBe(true);
    });
  });

  describe('optional mode', () => {
    const optionalSchema = createSSNSchema({ required: false });

    it('accepts empty string', () => {
      expect(optionalSchema.safeParse('').success).toBe(true);
    });

    it('accepts undefined', () => {
      expect(optionalSchema.safeParse(undefined).success).toBe(true);
    });

    it('still validates when value is provided', () => {
      expect(optionalSchema.safeParse('invalid').success).toBe(false);
    });
  });

  describe('error messages', () => {
    it('provides user-friendly error message', () => {
      const result = schema.safeParse('invalid');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toContain('Social Security');
      }
    });

    it('allows custom error messages', () => {
      const customSchema = createSSNSchema({
        messages: {
          invalid: 'Custom SSN error',
        },
      });
      const result = customSchema.safeParse('invalid');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Custom SSN error');
      }
    });
  });
});
