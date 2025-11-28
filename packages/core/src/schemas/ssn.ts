import { z } from 'zod';

import { SSN_PATTERN, SSN_FLEXIBLE_PATTERN } from '../patterns';

export interface SSNSchemaOptions {
  /** Whether the field is required */
  required?: boolean;
  /** Accept SSN with or without dashes */
  flexible?: boolean;
  /** Custom error messages */
  messages?: {
    required?: string;
    invalid?: string;
  };
}

/**
 * Creates a Social Security Number schema with validation
 *
 * @example
 * ```ts
 * const schema = createSSNSchema();
 * schema.parse('123-45-6789'); // valid
 *
 * const flexibleSchema = createSSNSchema({ flexible: true });
 * flexibleSchema.parse('123456789'); // valid
 * ```
 */
export function createSSNSchema(options: SSNSchemaOptions = {}) {
  const { required = true, flexible = false, messages = {} } = options;

  const pattern = flexible ? SSN_FLEXIBLE_PATTERN : SSN_PATTERN;
  const invalidMessage =
    messages.invalid ?? 'Enter a valid Social Security number (like 123-45-6789)';

  const baseSchema = required
    ? z
        .string()
        .min(1, messages.required ?? 'Social Security number is required')
        .regex(pattern, invalidMessage)
    : z.string().regex(pattern, invalidMessage);

  // Chain refinements directly
  const validatedSchema = baseSchema
    .refine(
      value => {
        if (!value) return true;
        const digits = value.replace(/-/g, '');
        const area = digits.slice(0, 3);
        const group = digits.slice(3, 5);
        const serial = digits.slice(5, 9);
        // SSN cannot be all zeros in any group
        return area !== '000' && group !== '00' && serial !== '0000';
      },
      { message: invalidMessage }
    )
    .refine(
      value => {
        if (!value) return true;
        const firstDigit = value.replace(/-/g, '')[0];
        // SSN cannot start with 9 (reserved for ITIN)
        return firstDigit !== '9';
      },
      { message: invalidMessage }
    );

  if (!required) {
    return validatedSchema.optional().or(z.literal(''));
  }

  return validatedSchema;
}
