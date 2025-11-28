import { z } from 'zod';

export interface CurrencySchemaOptions {
  /** Whether the field is required */
  required?: boolean;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Allow negative values */
  allowNegative?: boolean;
  /** Custom error messages */
  messages?: {
    required?: string;
    invalid?: string;
    min?: string;
    max?: string;
  };
}

/**
 * Creates a currency (USD) schema with validation
 *
 * @example
 * ```ts
 * const schema = createCurrencySchema({ min: 0, max: 1000000 });
 * schema.parse('1234.56'); // valid
 * schema.parse('1,234.56'); // valid
 * ```
 */
export function createCurrencySchema(options: CurrencySchemaOptions = {}) {
  const { required = true, min, max, allowNegative = false, messages = {} } = options;

  // Transform comma-formatted strings to numbers
  let schema = z
    .string()
    .transform(val => {
      if (!val) return val;
      // Remove commas and dollar signs
      return val.replace(/[$,]/g, '');
    })
    .refine(
      val => {
        if (!val) return !required;
        const num = parseFloat(val);
        return !isNaN(num);
      },
      { message: messages.invalid ?? 'Enter a valid dollar amount' }
    )
    .transform(val => (val ? parseFloat(val) : undefined));

  if (required) {
    schema = z
      .string()
      .min(1, messages.required ?? 'Amount is required')
      .transform(val => val.replace(/[$,]/g, ''))
      .refine(
        val => {
          const num = parseFloat(val);
          return !isNaN(num);
        },
        { message: messages.invalid ?? 'Enter a valid dollar amount' }
      )
      .transform(val => parseFloat(val));
  }

  // Create a refined schema with min/max validation
  const refinedSchema = schema
    .refine(
      val => {
        if (val === undefined) return true;
        if (!allowNegative && val < 0) return false;
        return true;
      },
      { message: 'Amount cannot be negative' }
    )
    .refine(
      val => {
        if (val === undefined || min === undefined) return true;
        return val >= min;
      },
      { message: messages.min ?? `Amount must be at least $${min?.toLocaleString()}` }
    )
    .refine(
      val => {
        if (val === undefined || max === undefined) return true;
        return val <= max;
      },
      { message: messages.max ?? `Amount must be no more than $${max?.toLocaleString()}` }
    );

  return refinedSchema;
}
