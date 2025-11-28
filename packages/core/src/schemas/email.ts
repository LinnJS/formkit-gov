import { z } from 'zod';

import { EMAIL_PATTERN } from '../patterns';

export interface EmailSchemaOptions {
  /** Whether the field is required */
  required?: boolean;
  /** Custom error messages */
  messages?: {
    required?: string;
    invalid?: string;
  };
}

/**
 * Creates an email schema with validation
 *
 * @example
 * ```ts
 * const schema = createEmailSchema();
 * schema.parse('user@example.com'); // valid
 * ```
 */
export function createEmailSchema(options: EmailSchemaOptions = {}) {
  const { required = true, messages = {} } = options;

  let schema = z.string().regex(EMAIL_PATTERN, messages.invalid ?? 'Enter a valid email address');

  if (required) {
    schema = z
      .string()
      .min(1, messages.required ?? 'Email address is required')
      .regex(EMAIL_PATTERN, messages.invalid ?? 'Enter a valid email address');
  }

  if (!required) {
    return schema.optional().or(z.literal(''));
  }

  return schema;
}
