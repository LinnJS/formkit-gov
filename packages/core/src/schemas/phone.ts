import { z } from 'zod';

import { PHONE_PATTERN, INTERNATIONAL_PHONE_PATTERN } from '../patterns';

export interface PhoneSchemaOptions {
  /** Whether the field is required */
  required?: boolean;
  /** Allow international phone numbers */
  international?: boolean;
  /** Custom error messages */
  messages?: {
    required?: string;
    invalid?: string;
  };
}

/**
 * Creates a phone number schema with validation
 *
 * @example
 * ```ts
 * const schema = createPhoneSchema();
 * schema.parse('(555) 123-4567'); // valid
 * schema.parse('555-123-4567');   // valid
 * ```
 */
export function createPhoneSchema(options: PhoneSchemaOptions = {}) {
  const { required = true, international = false, messages = {} } = options;

  const pattern = international ? INTERNATIONAL_PHONE_PATTERN : PHONE_PATTERN;
  const invalidMessage =
    messages.invalid ??
    (international ? 'Enter a valid phone number' : 'Enter a valid 10-digit phone number');

  let schema = z.string().regex(pattern, invalidMessage);

  if (required) {
    schema = z
      .string()
      .min(1, messages.required ?? 'Phone number is required')
      .regex(pattern, invalidMessage);
  }

  if (!required) {
    return schema.optional().or(z.literal(''));
  }

  return schema;
}
