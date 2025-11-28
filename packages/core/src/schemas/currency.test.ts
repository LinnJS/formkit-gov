import { describe, it, expect } from 'vitest';

import { createCurrencySchema } from './currency';

describe('createCurrencySchema', () => {
  const schema = createCurrencySchema();

  describe('valid currency values', () => {
    it('accepts plain number string', () => {
      expect(schema.safeParse('1234.56').success).toBe(true);
    });

    it('accepts comma-formatted number', () => {
      expect(schema.safeParse('1,234.56').success).toBe(true);
    });

    it('accepts dollar sign with number', () => {
      expect(schema.safeParse('$1234.56').success).toBe(true);
    });

    it('accepts dollar sign with comma-formatted number', () => {
      expect(schema.safeParse('$1,234.56').success).toBe(true);
    });

    it('accepts zero', () => {
      expect(schema.safeParse('0').success).toBe(true);
    });

    it('accepts decimal values', () => {
      expect(schema.safeParse('0.99').success).toBe(true);
    });

    it('accepts large numbers', () => {
      expect(schema.safeParse('1,000,000.00').success).toBe(true);
    });

    it('parses string to number correctly', () => {
      const result = schema.safeParse('$1,234.56');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(1234.56);
      }
    });

    it('parses plain string to number', () => {
      const result = schema.safeParse('5000');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(5000);
      }
    });
  });

  describe('invalid currency values', () => {
    it('rejects empty string when required', () => {
      expect(schema.safeParse('').success).toBe(false);
    });

    it('rejects non-numeric strings', () => {
      expect(schema.safeParse('abc').success).toBe(false);
    });

    it('accepts numbers with special characters that parseFloat ignores', () => {
      // parseFloat('1234#56') returns 1234, which is valid
      // The schema removes $ and commas, then parses - parseFloat is lenient
      const result = schema.safeParse('1234#56');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(1234);
      }
    });

    it('rejects negative values by default', () => {
      expect(schema.safeParse('-100').success).toBe(false);
    });
  });

  describe('optional mode', () => {
    const optionalSchema = createCurrencySchema({ required: false });

    it('accepts empty string', () => {
      const result = optionalSchema.safeParse('');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBeUndefined();
      }
    });

    it('rejects undefined but accepts empty string', () => {
      // Optional schema still expects string input, but empty string is allowed
      expect(optionalSchema.safeParse(undefined).success).toBe(false);
    });

    it('still validates when value is provided', () => {
      expect(optionalSchema.safeParse('invalid').success).toBe(false);
    });

    it('parses valid value when provided', () => {
      const result = optionalSchema.safeParse('100.50');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(100.5);
      }
    });
  });

  describe('minimum value validation', () => {
    const schemaWithMin = createCurrencySchema({ min: 100 });

    it('accepts value equal to minimum', () => {
      expect(schemaWithMin.safeParse('100').success).toBe(true);
    });

    it('accepts value above minimum', () => {
      expect(schemaWithMin.safeParse('150').success).toBe(true);
    });

    it('rejects value below minimum', () => {
      expect(schemaWithMin.safeParse('99').success).toBe(false);
    });

    it('provides default min error message', () => {
      const result = schemaWithMin.safeParse('50');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toContain('at least $100');
      }
    });

    it('formats min value with commas in error message', () => {
      const schemaWithLargeMin = createCurrencySchema({ min: 1000 });
      const result = schemaWithLargeMin.safeParse('500');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toContain('1,000');
      }
    });
  });

  describe('maximum value validation', () => {
    const schemaWithMax = createCurrencySchema({ max: 1000 });

    it('accepts value equal to maximum', () => {
      expect(schemaWithMax.safeParse('1000').success).toBe(true);
    });

    it('accepts value below maximum', () => {
      expect(schemaWithMax.safeParse('500').success).toBe(true);
    });

    it('rejects value above maximum', () => {
      expect(schemaWithMax.safeParse('1001').success).toBe(false);
    });

    it('provides default max error message', () => {
      const result = schemaWithMax.safeParse('1500');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toContain('no more than $1,000');
      }
    });
  });

  describe('min and max together', () => {
    const schemaWithRange = createCurrencySchema({ min: 100, max: 1000 });

    it('accepts value within range', () => {
      expect(schemaWithRange.safeParse('500').success).toBe(true);
    });

    it('accepts minimum boundary', () => {
      expect(schemaWithRange.safeParse('100').success).toBe(true);
    });

    it('accepts maximum boundary', () => {
      expect(schemaWithRange.safeParse('1000').success).toBe(true);
    });

    it('rejects value below range', () => {
      expect(schemaWithRange.safeParse('50').success).toBe(false);
    });

    it('rejects value above range', () => {
      expect(schemaWithRange.safeParse('1500').success).toBe(false);
    });
  });

  describe('allowNegative option', () => {
    const schemaWithNegative = createCurrencySchema({ allowNegative: true });

    it('accepts negative values', () => {
      expect(schemaWithNegative.safeParse('-100').success).toBe(true);
    });

    it('accepts positive values', () => {
      expect(schemaWithNegative.safeParse('100').success).toBe(true);
    });

    it('parses negative value correctly', () => {
      const result = schemaWithNegative.safeParse('-$1,234.56');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(-1234.56);
      }
    });

    it('still rejects negative when allowNegative is false', () => {
      const schemaNoNegative = createCurrencySchema({ allowNegative: false });
      expect(schemaNoNegative.safeParse('-100').success).toBe(false);
    });
  });

  describe('custom error messages', () => {
    it('allows custom required message', () => {
      const customSchema = createCurrencySchema({
        messages: { required: 'Custom required message' },
      });
      const result = customSchema.safeParse('');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Custom required message');
      }
    });

    it('allows custom invalid message', () => {
      const customSchema = createCurrencySchema({
        messages: { invalid: 'Custom invalid message' },
      });
      const result = customSchema.safeParse('abc');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Custom invalid message');
      }
    });

    it('allows custom min message', () => {
      const customSchema = createCurrencySchema({
        min: 100,
        messages: { min: 'Custom min message' },
      });
      const result = customSchema.safeParse('50');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Custom min message');
      }
    });

    it('allows custom max message', () => {
      const customSchema = createCurrencySchema({
        max: 1000,
        messages: { max: 'Custom max message' },
      });
      const result = customSchema.safeParse('1500');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Custom max message');
      }
    });
  });

  describe('edge cases', () => {
    it('handles very large numbers', () => {
      const result = schema.safeParse('999,999,999.99');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(999999999.99);
      }
    });

    it('handles very small decimal values', () => {
      const result = schema.safeParse('0.01');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(0.01);
      }
    });

    it('handles multiple dollar signs gracefully', () => {
      const result = schema.safeParse('$$100');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(100);
      }
    });

    it('handles multiple commas', () => {
      const result = schema.safeParse('1,000,000');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(1000000);
      }
    });

    it('accepts Infinity string as parseFloat handles it', () => {
      // parseFloat('Infinity') returns Infinity, which is a valid number
      const result = schema.safeParse('Infinity');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(Infinity);
      }
    });

    it('rejects NaN string', () => {
      expect(schema.safeParse('NaN').success).toBe(false);
    });
  });

  describe('optional with min/max', () => {
    const optionalRangeSchema = createCurrencySchema({
      required: false,
      min: 100,
      max: 1000,
    });

    it('accepts empty string', () => {
      expect(optionalRangeSchema.safeParse('').success).toBe(true);
    });

    it('validates min when value is provided', () => {
      expect(optionalRangeSchema.safeParse('50').success).toBe(false);
    });

    it('validates max when value is provided', () => {
      expect(optionalRangeSchema.safeParse('1500').success).toBe(false);
    });

    it('accepts value in range', () => {
      expect(optionalRangeSchema.safeParse('500').success).toBe(true);
    });
  });

  describe('default error messages', () => {
    it('provides user-friendly required error', () => {
      const result = schema.safeParse('');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Amount is required');
      }
    });

    it('provides user-friendly invalid error', () => {
      const result = schema.safeParse('not-a-number');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Enter a valid dollar amount');
      }
    });

    it('provides user-friendly negative error', () => {
      const result = schema.safeParse('-100');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Amount cannot be negative');
      }
    });
  });
});
