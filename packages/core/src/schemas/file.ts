import { z } from 'zod';

export interface FileSchemaOptions {
  /** Whether the field is required */
  required?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Allowed MIME types */
  allowedTypes?: string[];
  /** Maximum number of files */
  maxFiles?: number;
  /** Custom error messages */
  messages?: {
    required?: string;
    maxSize?: string;
    type?: string;
    maxFiles?: string;
  };
}

/**
 * Common file types allowed in government forms
 */
export const COMMON_FILE_TYPES = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  txt: 'text/plain',
} as const;

/**
 * Default allowed file types for government forms
 */
export const DEFAULT_ALLOWED_TYPES = [
  COMMON_FILE_TYPES.pdf,
  COMMON_FILE_TYPES.doc,
  COMMON_FILE_TYPES.docx,
  COMMON_FILE_TYPES.jpg,
  COMMON_FILE_TYPES.png,
];

/**
 * Default max file size (25MB)
 */
export const DEFAULT_MAX_FILE_SIZE = 25 * 1024 * 1024;

/**
 * Formats bytes to human-readable string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * File schema for browser File objects
 */
const fileObjectSchema = z.custom<File>(val => val instanceof File, { message: 'Invalid file' });

/**
 * Creates a file upload schema with validation
 *
 * @example
 * ```ts
 * const schema = createFileSchema({
 *   maxSize: 10 * 1024 * 1024, // 10MB
 *   allowedTypes: ['application/pdf', 'image/jpeg'],
 *   maxFiles: 5,
 * });
 * ```
 */
export function createFileSchema(options: FileSchemaOptions = {}) {
  const {
    required = true,
    maxSize = DEFAULT_MAX_FILE_SIZE,
    allowedTypes = DEFAULT_ALLOWED_TYPES,
    maxFiles = 1,
    messages = {},
  } = options;

  const singleFileSchema = fileObjectSchema
    .refine(file => file.size <= maxSize, {
      message: messages.maxSize ?? `File must be smaller than ${formatFileSize(maxSize)}`,
    })
    .refine(file => allowedTypes.includes(file.type), {
      message: messages.type ?? `File type must be one of: ${allowedTypes.join(', ')}`,
    });

  if (maxFiles === 1) {
    if (!required) {
      return singleFileSchema.optional();
    }
    return singleFileSchema;
  }

  // Multiple files
  const multiFileSchema = z
    .array(singleFileSchema)
    .max(maxFiles, messages.maxFiles ?? `Maximum ${maxFiles} files allowed`);

  if (required) {
    return multiFileSchema.min(1, messages.required ?? 'At least one file is required');
  }

  return multiFileSchema;
}
