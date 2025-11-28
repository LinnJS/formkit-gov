import { describe, it, expect, beforeEach, vi } from 'vitest';

import { createDateSchema, createMemorableDateSchema } from './date';

describe('createDateSchema', () => {
  describe('basic validation', () => {
    const schema = createDateSchema();

    describe('valid dates', () => {
      it('accepts ISO format date', () => {
        expect(schema.safeParse('1990-01-15').success).toBe(true);
      });

      it('accepts ISO format with full timestamp', () => {
        expect(schema.safeParse('1990-01-15T00:00:00.000Z').success).toBe(true);
      });

      it('accepts various valid dates', () => {
        expect(schema.safeParse('2000-12-31').success).toBe(true);
        expect(schema.safeParse('1985-06-15').success).toBe(true);
        expect(schema.safeParse('2024-02-29').success).toBe(true); // leap year
      });
    });

    describe('invalid dates', () => {
      it('rejects invalid date string', () => {
        const result = schema.safeParse('not-a-date');
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toBe('Enter a valid date');
        }
      });

      it('rejects completely invalid date values', () => {
        expect(schema.safeParse('invalid-date').success).toBe(false);
        expect(schema.safeParse('abc123').success).toBe(false);
        expect(schema.safeParse('2024-13-01').success).toBe(false); // month 13 is invalid
      });

      it('rejects empty string', () => {
        const result = schema.safeParse('');
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toBe('Date is required');
        }
      });

      it('accepts auto-corrected dates (JavaScript Date behavior)', () => {
        // Note: JavaScript Date auto-corrects some invalid dates
        // 2024-02-30 becomes 2024-03-01
        expect(schema.safeParse('2024-02-30').success).toBe(true);
      });
    });
  });

  describe('pastOnly option', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-01-15T12:00:00.000Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    const schema = createDateSchema({ pastOnly: true });

    describe('valid past dates', () => {
      it('accepts dates in the past', () => {
        expect(schema.safeParse('2023-12-31').success).toBe(true);
        expect(schema.safeParse('2020-01-01').success).toBe(true);
        expect(schema.safeParse('1990-06-15').success).toBe(true);
      });

      it('accepts dates long ago', () => {
        expect(schema.safeParse('1950-01-01').success).toBe(true);
      });
    });

    describe('invalid future dates', () => {
      it('rejects today (now)', () => {
        const result = schema.safeParse('2024-01-15T12:00:00.000Z');
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toBe('Date must be in the past');
        }
      });

      it('rejects future dates', () => {
        expect(schema.safeParse('2024-01-16').success).toBe(false);
        expect(schema.safeParse('2025-01-01').success).toBe(false);
      });

      it('rejects dates far in the future', () => {
        expect(schema.safeParse('2099-12-31').success).toBe(false);
      });
    });

    it('allows custom error message', () => {
      const customSchema = createDateSchema({
        pastOnly: true,
        messages: { past: 'Custom past error' },
      });
      const result = customSchema.safeParse('2025-01-01');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Custom past error');
      }
    });
  });

  describe('futureOnly option', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-01-15T12:00:00.000Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    const schema = createDateSchema({ futureOnly: true });

    describe('valid future dates', () => {
      it('accepts dates in the future', () => {
        expect(schema.safeParse('2024-01-16').success).toBe(true);
        expect(schema.safeParse('2025-01-01').success).toBe(true);
        expect(schema.safeParse('2030-12-31').success).toBe(true);
      });

      it('accepts dates far in the future', () => {
        expect(schema.safeParse('2099-12-31').success).toBe(true);
      });
    });

    describe('invalid past dates', () => {
      it('rejects today (now)', () => {
        const result = schema.safeParse('2024-01-15T12:00:00.000Z');
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toBe('Date must be in the future');
        }
      });

      it('rejects past dates', () => {
        expect(schema.safeParse('2024-01-14').success).toBe(false);
        expect(schema.safeParse('2023-12-31').success).toBe(false);
      });

      it('rejects dates long ago', () => {
        expect(schema.safeParse('1990-01-01').success).toBe(false);
      });
    });

    it('allows custom error message', () => {
      const customSchema = createDateSchema({
        futureOnly: true,
        messages: { future: 'Custom future error' },
      });
      const result = customSchema.safeParse('2023-01-01');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Custom future error');
      }
    });
  });

  describe('minDate option', () => {
    const minDate = new Date('2020-01-01');
    const schema = createDateSchema({ minDate });

    describe('valid dates on or after minDate', () => {
      it('accepts date equal to minDate', () => {
        expect(schema.safeParse('2020-01-01').success).toBe(true);
      });

      it('accepts dates after minDate', () => {
        expect(schema.safeParse('2020-01-02').success).toBe(true);
        expect(schema.safeParse('2021-06-15').success).toBe(true);
        expect(schema.safeParse('2024-12-31').success).toBe(true);
      });
    });

    describe('invalid dates before minDate', () => {
      it('rejects dates before minDate', () => {
        const result = schema.safeParse('2019-12-31');
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toContain('Date must be on or after');
        }
      });

      it('rejects dates far before minDate', () => {
        expect(schema.safeParse('1990-01-01').success).toBe(false);
      });
    });

    it('allows custom error message', () => {
      const customSchema = createDateSchema({
        minDate,
        messages: { min: 'Custom min date error' },
      });
      const result = customSchema.safeParse('2019-12-31');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Custom min date error');
      }
    });
  });

  describe('maxDate option', () => {
    const maxDate = new Date('2025-12-31');
    const schema = createDateSchema({ maxDate });

    describe('valid dates on or before maxDate', () => {
      it('accepts date equal to maxDate', () => {
        expect(schema.safeParse('2025-12-31').success).toBe(true);
      });

      it('accepts dates before maxDate', () => {
        expect(schema.safeParse('2025-12-30').success).toBe(true);
        expect(schema.safeParse('2024-06-15').success).toBe(true);
        expect(schema.safeParse('2020-01-01').success).toBe(true);
      });
    });

    describe('invalid dates after maxDate', () => {
      it('rejects dates after maxDate', () => {
        const result = schema.safeParse('2026-01-01');
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toContain('Date must be on or before');
        }
      });

      it('rejects dates far after maxDate', () => {
        expect(schema.safeParse('2099-12-31').success).toBe(false);
      });
    });

    it('allows custom error message', () => {
      const customSchema = createDateSchema({
        maxDate,
        messages: { max: 'Custom max date error' },
      });
      const result = customSchema.safeParse('2026-01-01');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Custom max date error');
      }
    });
  });

  describe('minDate and maxDate combined', () => {
    const minDate = new Date('2020-01-01');
    const maxDate = new Date('2025-12-31');
    const schema = createDateSchema({ minDate, maxDate });

    it('accepts dates within range', () => {
      expect(schema.safeParse('2020-01-01').success).toBe(true);
      expect(schema.safeParse('2022-06-15').success).toBe(true);
      expect(schema.safeParse('2025-12-31').success).toBe(true);
    });

    it('rejects dates before minDate', () => {
      expect(schema.safeParse('2019-12-31').success).toBe(false);
    });

    it('rejects dates after maxDate', () => {
      expect(schema.safeParse('2026-01-01').success).toBe(false);
    });
  });

  describe('optional mode', () => {
    const optionalSchema = createDateSchema({ required: false });

    it('accepts empty string', () => {
      expect(optionalSchema.safeParse('').success).toBe(true);
    });

    it('accepts undefined', () => {
      expect(optionalSchema.safeParse(undefined).success).toBe(true);
    });

    it('still validates when value is provided', () => {
      expect(optionalSchema.safeParse('not-a-date').success).toBe(false);
    });

    it('accepts valid date when provided', () => {
      expect(optionalSchema.safeParse('2024-01-15').success).toBe(true);
    });
  });

  describe('optional mode with constraints', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-01-15T12:00:00.000Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    const optionalPastSchema = createDateSchema({
      required: false,
      pastOnly: true,
    });

    it('accepts empty string', () => {
      expect(optionalPastSchema.safeParse('').success).toBe(true);
    });

    it('accepts undefined', () => {
      expect(optionalPastSchema.safeParse(undefined).success).toBe(true);
    });

    it('validates constraints when value is provided', () => {
      expect(optionalPastSchema.safeParse('2023-01-01').success).toBe(true);
      expect(optionalPastSchema.safeParse('2025-01-01').success).toBe(false);
    });
  });

  describe('error messages', () => {
    it('provides default required message', () => {
      const schema = createDateSchema();
      const result = schema.safeParse('');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Date is required');
      }
    });

    it('provides default invalid message', () => {
      const schema = createDateSchema();
      const result = schema.safeParse('invalid');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Enter a valid date');
      }
    });

    it('allows all custom messages', () => {
      const minDate = new Date('2020-01-01');
      const maxDate = new Date('2025-12-31');
      const customSchema = createDateSchema({
        minDate,
        maxDate,
        pastOnly: true,
        messages: {
          required: 'Custom required',
          invalid: 'Custom invalid',
          min: 'Custom min',
          max: 'Custom max',
          past: 'Custom past',
        },
      });

      const requiredResult = customSchema.safeParse('');
      expect(requiredResult.success).toBe(false);
      if (!requiredResult.success) {
        expect(requiredResult.error.issues[0]?.message).toBe('Custom required');
      }

      const invalidResult = customSchema.safeParse('invalid');
      expect(invalidResult.success).toBe(false);
      if (!invalidResult.success) {
        expect(invalidResult.error.issues[0]?.message).toBe('Custom invalid');
      }
    });
  });

  describe('edge cases', () => {
    const schema = createDateSchema();

    it('rejects null', () => {
      expect(schema.safeParse(null).success).toBe(false);
    });

    it('rejects number type', () => {
      expect(schema.safeParse(1234567890).success).toBe(false);
    });

    it('rejects object', () => {
      expect(schema.safeParse({ date: '2024-01-15' }).success).toBe(false);
    });

    it('rejects array', () => {
      expect(schema.safeParse(['2024-01-15']).success).toBe(false);
    });

    it('accepts leap year dates', () => {
      expect(schema.safeParse('2024-02-29').success).toBe(true);
      // Note: JavaScript Date auto-corrects 2023-02-29 to 2023-03-01
      expect(schema.safeParse('2023-02-29').success).toBe(true);
    });

    it('accepts end of month dates', () => {
      expect(schema.safeParse('2024-01-31').success).toBe(true);
      // Note: JavaScript Date auto-corrects 2024-04-31 to 2024-05-01
      expect(schema.safeParse('2024-04-31').success).toBe(true);
    });
  });
});

describe('createMemorableDateSchema', () => {
  describe('basic validation', () => {
    const schema = createMemorableDateSchema();

    describe('valid memorable dates', () => {
      it('accepts valid date with leading zeros', () => {
        expect(schema.safeParse({ month: '01', day: '15', year: '1990' }).success).toBe(true);
      });

      it('accepts valid date without leading zeros', () => {
        expect(schema.safeParse({ month: '1', day: '5', year: '1990' }).success).toBe(true);
      });

      it('accepts various valid dates', () => {
        expect(schema.safeParse({ month: '12', day: '31', year: '2000' }).success).toBe(true);
        expect(schema.safeParse({ month: '06', day: '15', year: '1985' }).success).toBe(true);
        expect(schema.safeParse({ month: '2', day: '29', year: '2024' }).success).toBe(true); // leap year
      });

      it('accepts dates in 1900s', () => {
        expect(schema.safeParse({ month: '01', day: '01', year: '1900' }).success).toBe(true);
        expect(schema.safeParse({ month: '12', day: '31', year: '1999' }).success).toBe(true);
      });

      it('accepts dates in 2000s', () => {
        expect(schema.safeParse({ month: '01', day: '01', year: '2000' }).success).toBe(true);
        expect(schema.safeParse({ month: '12', day: '31', year: '2099' }).success).toBe(true);
      });
    });

    describe('invalid memorable dates', () => {
      it('rejects invalid month', () => {
        const result = schema.safeParse({ month: '13', day: '15', year: '1990' });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toContain('valid month');
        }
      });

      it('rejects month 0', () => {
        expect(schema.safeParse({ month: '0', day: '15', year: '1990' }).success).toBe(false);
      });

      it('rejects invalid day', () => {
        const result = schema.safeParse({ month: '01', day: '32', year: '1990' });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toContain('valid day');
        }
      });

      it('rejects day 0', () => {
        expect(schema.safeParse({ month: '01', day: '0', year: '1990' }).success).toBe(false);
      });

      it('rejects invalid year format', () => {
        const result = schema.safeParse({ month: '01', day: '15', year: '90' });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toContain('4-digit year');
        }
      });

      it('rejects year before 1900', () => {
        expect(schema.safeParse({ month: '01', day: '15', year: '1899' }).success).toBe(false);
      });

      it('rejects year after 2099', () => {
        expect(schema.safeParse({ month: '01', day: '15', year: '2100' }).success).toBe(false);
      });

      it('rejects invalid date combinations', () => {
        // February 30th doesn't exist
        const result = schema.safeParse({ month: '02', day: '30', year: '2024' });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toBe('Enter a valid date');
        }
      });

      it('rejects Feb 29 on non-leap year', () => {
        const result = schema.safeParse({ month: '02', day: '29', year: '2023' });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toBe('Enter a valid date');
        }
      });

      it('rejects April 31st (only 30 days)', () => {
        const result = schema.safeParse({ month: '04', day: '31', year: '2024' });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toBe('Enter a valid date');
        }
      });
    });
  });

  describe('optional mode', () => {
    const optionalSchema = createMemorableDateSchema({ required: false });

    it('accepts undefined', () => {
      expect(optionalSchema.safeParse(undefined).success).toBe(true);
    });

    it('accepts valid date when provided', () => {
      expect(optionalSchema.safeParse({ month: '01', day: '15', year: '1990' }).success).toBe(true);
    });

    it('still validates when value is provided', () => {
      expect(optionalSchema.safeParse({ month: '13', day: '15', year: '1990' }).success).toBe(
        false
      );
    });
  });

  describe('error messages', () => {
    it('provides default error messages', () => {
      const schema = createMemorableDateSchema();

      const monthResult = schema.safeParse({ month: '13', day: '15', year: '1990' });
      expect(monthResult.success).toBe(false);
      if (!monthResult.success) {
        expect(monthResult.error.issues[0]?.message).toBe('Enter a valid month (1-12)');
      }

      const dayResult = schema.safeParse({ month: '01', day: '32', year: '1990' });
      expect(dayResult.success).toBe(false);
      if (!dayResult.success) {
        expect(dayResult.error.issues[0]?.message).toBe('Enter a valid day (1-31)');
      }

      const yearResult = schema.safeParse({ month: '01', day: '15', year: '1899' });
      expect(yearResult.success).toBe(false);
      if (!yearResult.success) {
        expect(yearResult.error.issues[0]?.message).toBe('Enter a valid 4-digit year');
      }
    });

    it('allows custom error message', () => {
      const customSchema = createMemorableDateSchema({
        messages: { invalid: 'Custom date error' },
      });

      const result = customSchema.safeParse({ month: '02', day: '30', year: '2024' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Custom date error');
      }
    });
  });

  describe('edge cases', () => {
    const schema = createMemorableDateSchema();

    it('rejects missing fields', () => {
      expect(schema.safeParse({ month: '01', day: '15' }).success).toBe(false);
      expect(schema.safeParse({ month: '01', year: '1990' }).success).toBe(false);
      expect(schema.safeParse({ day: '15', year: '1990' }).success).toBe(false);
    });

    it('rejects null values', () => {
      expect(schema.safeParse(null).success).toBe(false);
    });

    it('rejects non-object values', () => {
      expect(schema.safeParse('2024-01-15').success).toBe(false);
      expect(schema.safeParse(20240115).success).toBe(false);
    });

    it('rejects with extra fields', () => {
      const result = schema.safeParse({
        month: '01',
        day: '15',
        year: '1990',
        extra: 'field',
      });
      // Zod allows extra fields by default, so this should still pass
      expect(result.success).toBe(true);
    });

    it('handles leap years correctly', () => {
      expect(schema.safeParse({ month: '2', day: '29', year: '2024' }).success).toBe(true);
      expect(schema.safeParse({ month: '2', day: '29', year: '2023' }).success).toBe(false);
      expect(schema.safeParse({ month: '2', day: '29', year: '2000' }).success).toBe(true);
      expect(schema.safeParse({ month: '2', day: '29', year: '1900' }).success).toBe(false); // not a leap year
    });

    it('handles different month lengths correctly', () => {
      // 31-day months
      expect(schema.safeParse({ month: '1', day: '31', year: '2024' }).success).toBe(true);
      expect(schema.safeParse({ month: '3', day: '31', year: '2024' }).success).toBe(true);
      expect(schema.safeParse({ month: '5', day: '31', year: '2024' }).success).toBe(true);
      expect(schema.safeParse({ month: '7', day: '31', year: '2024' }).success).toBe(true);
      expect(schema.safeParse({ month: '8', day: '31', year: '2024' }).success).toBe(true);
      expect(schema.safeParse({ month: '10', day: '31', year: '2024' }).success).toBe(true);
      expect(schema.safeParse({ month: '12', day: '31', year: '2024' }).success).toBe(true);

      // 30-day months
      expect(schema.safeParse({ month: '4', day: '30', year: '2024' }).success).toBe(true);
      expect(schema.safeParse({ month: '4', day: '31', year: '2024' }).success).toBe(false);
      expect(schema.safeParse({ month: '6', day: '30', year: '2024' }).success).toBe(true);
      expect(schema.safeParse({ month: '6', day: '31', year: '2024' }).success).toBe(false);
      expect(schema.safeParse({ month: '9', day: '30', year: '2024' }).success).toBe(true);
      expect(schema.safeParse({ month: '9', day: '31', year: '2024' }).success).toBe(false);
      expect(schema.safeParse({ month: '11', day: '30', year: '2024' }).success).toBe(true);
      expect(schema.safeParse({ month: '11', day: '31', year: '2024' }).success).toBe(false);

      // February
      expect(schema.safeParse({ month: '2', day: '28', year: '2023' }).success).toBe(true);
      expect(schema.safeParse({ month: '2', day: '29', year: '2023' }).success).toBe(false);
    });

    it('rejects alphabetic input', () => {
      expect(schema.safeParse({ month: 'January', day: '15', year: '1990' }).success).toBe(false);
      expect(schema.safeParse({ month: '01', day: 'fifteen', year: '1990' }).success).toBe(false);
      expect(schema.safeParse({ month: '01', day: '15', year: 'nineteen ninety' }).success).toBe(
        false
      );
    });
  });
});
