import { describe, it, expect } from 'vitest';

import {
  createFileSchema,
  formatFileSize,
  COMMON_FILE_TYPES,
  DEFAULT_ALLOWED_TYPES,
  DEFAULT_MAX_FILE_SIZE,
} from './file';

// Helper to create mock File objects
function createMockFile(name: string, size: number, type: string, content?: string): File {
  // Create content that matches the desired size
  const actualContent = content ?? 'x'.repeat(size);
  const blob = new Blob([actualContent], { type });
  const file = new File([blob], name, { type });

  // Override size property to match desired size
  Object.defineProperty(file, 'size', {
    value: size,
    writable: false,
  });

  return file;
}

describe('formatFileSize', () => {
  it('formats 0 bytes', () => {
    expect(formatFileSize(0)).toBe('0 Bytes');
  });

  it('formats bytes', () => {
    expect(formatFileSize(500)).toBe('500 Bytes');
  });

  it('formats kilobytes', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
  });

  it('formats megabytes', () => {
    expect(formatFileSize(1048576)).toBe('1 MB');
  });

  it('formats gigabytes', () => {
    expect(formatFileSize(1073741824)).toBe('1 GB');
  });

  it('formats with two decimal places', () => {
    expect(formatFileSize(1536)).toBe('1.5 KB');
  });

  it('formats large files correctly', () => {
    expect(formatFileSize(25 * 1024 * 1024)).toBe('25 MB');
  });
});

describe('COMMON_FILE_TYPES', () => {
  it('includes PDF type', () => {
    expect(COMMON_FILE_TYPES.pdf).toBe('application/pdf');
  });

  it('includes DOC type', () => {
    expect(COMMON_FILE_TYPES.doc).toBe('application/msword');
  });

  it('includes DOCX type', () => {
    expect(COMMON_FILE_TYPES.docx).toBe(
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
  });

  it('includes image types', () => {
    expect(COMMON_FILE_TYPES.jpg).toBe('image/jpeg');
    expect(COMMON_FILE_TYPES.jpeg).toBe('image/jpeg');
    expect(COMMON_FILE_TYPES.png).toBe('image/png');
    expect(COMMON_FILE_TYPES.gif).toBe('image/gif');
  });

  it('includes text type', () => {
    expect(COMMON_FILE_TYPES.txt).toBe('text/plain');
  });
});

describe('DEFAULT_ALLOWED_TYPES', () => {
  it('includes PDF', () => {
    expect(DEFAULT_ALLOWED_TYPES).toContain('application/pdf');
  });

  it('includes Word documents', () => {
    expect(DEFAULT_ALLOWED_TYPES).toContain('application/msword');
    expect(DEFAULT_ALLOWED_TYPES).toContain(
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
  });

  it('includes common image types', () => {
    expect(DEFAULT_ALLOWED_TYPES).toContain('image/jpeg');
    expect(DEFAULT_ALLOWED_TYPES).toContain('image/png');
  });
});

describe('DEFAULT_MAX_FILE_SIZE', () => {
  it('equals 25MB', () => {
    expect(DEFAULT_MAX_FILE_SIZE).toBe(25 * 1024 * 1024);
  });
});

describe('createFileSchema', () => {
  describe('single file - valid files', () => {
    const schema = createFileSchema();

    it('accepts PDF file', () => {
      const file = createMockFile('document.pdf', 1024, COMMON_FILE_TYPES.pdf);
      expect(schema.safeParse(file).success).toBe(true);
    });

    it('accepts JPEG file', () => {
      const file = createMockFile('photo.jpg', 1024, COMMON_FILE_TYPES.jpg);
      expect(schema.safeParse(file).success).toBe(true);
    });

    it('accepts PNG file', () => {
      const file = createMockFile('image.png', 1024, COMMON_FILE_TYPES.png);
      expect(schema.safeParse(file).success).toBe(true);
    });

    it('accepts DOCX file', () => {
      const file = createMockFile('document.docx', 1024, COMMON_FILE_TYPES.docx);
      expect(schema.safeParse(file).success).toBe(true);
    });

    it('accepts file at max size boundary', () => {
      const file = createMockFile('large.pdf', DEFAULT_MAX_FILE_SIZE, COMMON_FILE_TYPES.pdf);
      expect(schema.safeParse(file).success).toBe(true);
    });

    it('accepts very small files', () => {
      const file = createMockFile('tiny.pdf', 1, COMMON_FILE_TYPES.pdf);
      expect(schema.safeParse(file).success).toBe(true);
    });
  });

  describe('single file - invalid files', () => {
    const schema = createFileSchema();

    it('rejects file exceeding max size', () => {
      const file = createMockFile('toolarge.pdf', DEFAULT_MAX_FILE_SIZE + 1, COMMON_FILE_TYPES.pdf);
      expect(schema.safeParse(file).success).toBe(false);
    });

    it('rejects file with disallowed type', () => {
      const file = createMockFile('script.exe', 1024, 'application/x-msdownload');
      expect(schema.safeParse(file).success).toBe(false);
    });

    it('rejects text file by default', () => {
      const file = createMockFile('notes.txt', 1024, COMMON_FILE_TYPES.txt);
      expect(schema.safeParse(file).success).toBe(false);
    });

    it('rejects non-File objects', () => {
      expect(schema.safeParse('not a file').success).toBe(false);
    });

    it('rejects null', () => {
      expect(schema.safeParse(null).success).toBe(false);
    });

    it('rejects undefined', () => {
      expect(schema.safeParse(undefined).success).toBe(false);
    });

    it('provides size error message', () => {
      const file = createMockFile('toolarge.pdf', DEFAULT_MAX_FILE_SIZE + 1, COMMON_FILE_TYPES.pdf);
      const result = schema.safeParse(file);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toContain('25 MB');
      }
    });

    it('provides type error message', () => {
      const file = createMockFile('bad.exe', 1024, 'application/x-msdownload');
      const result = schema.safeParse(file);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toContain('type must be');
      }
    });
  });

  describe('single file - optional', () => {
    const schema = createFileSchema({ required: false });

    it('accepts undefined', () => {
      expect(schema.safeParse(undefined).success).toBe(true);
    });

    it('still validates when file is provided', () => {
      const file = createMockFile('toolarge.pdf', DEFAULT_MAX_FILE_SIZE + 1, COMMON_FILE_TYPES.pdf);
      expect(schema.safeParse(file).success).toBe(false);
    });

    it('accepts valid file when provided', () => {
      const file = createMockFile('document.pdf', 1024, COMMON_FILE_TYPES.pdf);
      expect(schema.safeParse(file).success).toBe(true);
    });
  });

  describe('multiple files', () => {
    const schema = createFileSchema({ maxFiles: 3 });

    it('accepts array of valid files', () => {
      const files = [
        createMockFile('doc1.pdf', 1024, COMMON_FILE_TYPES.pdf),
        createMockFile('doc2.pdf', 1024, COMMON_FILE_TYPES.pdf),
      ];
      expect(schema.safeParse(files).success).toBe(true);
    });

    it('accepts single file in array', () => {
      const files = [createMockFile('doc.pdf', 1024, COMMON_FILE_TYPES.pdf)];
      expect(schema.safeParse(files).success).toBe(true);
    });

    it('accepts up to maxFiles', () => {
      const files = [
        createMockFile('doc1.pdf', 1024, COMMON_FILE_TYPES.pdf),
        createMockFile('doc2.pdf', 1024, COMMON_FILE_TYPES.pdf),
        createMockFile('doc3.pdf', 1024, COMMON_FILE_TYPES.pdf),
      ];
      expect(schema.safeParse(files).success).toBe(true);
    });

    it('rejects more than maxFiles', () => {
      const files = [
        createMockFile('doc1.pdf', 1024, COMMON_FILE_TYPES.pdf),
        createMockFile('doc2.pdf', 1024, COMMON_FILE_TYPES.pdf),
        createMockFile('doc3.pdf', 1024, COMMON_FILE_TYPES.pdf),
        createMockFile('doc4.pdf', 1024, COMMON_FILE_TYPES.pdf),
      ];
      expect(schema.safeParse(files).success).toBe(false);
    });

    it('rejects empty array when required', () => {
      expect(schema.safeParse([]).success).toBe(false);
    });

    it('validates each file in array', () => {
      const files = [
        createMockFile('doc1.pdf', 1024, COMMON_FILE_TYPES.pdf),
        createMockFile('toolarge.pdf', DEFAULT_MAX_FILE_SIZE + 1, COMMON_FILE_TYPES.pdf),
      ];
      expect(schema.safeParse(files).success).toBe(false);
    });

    it('validates file types in array', () => {
      const files = [
        createMockFile('doc1.pdf', 1024, COMMON_FILE_TYPES.pdf),
        createMockFile('bad.exe', 1024, 'application/x-msdownload'),
      ];
      expect(schema.safeParse(files).success).toBe(false);
    });

    it('provides maxFiles error message', () => {
      const files = [
        createMockFile('doc1.pdf', 1024, COMMON_FILE_TYPES.pdf),
        createMockFile('doc2.pdf', 1024, COMMON_FILE_TYPES.pdf),
        createMockFile('doc3.pdf', 1024, COMMON_FILE_TYPES.pdf),
        createMockFile('doc4.pdf', 1024, COMMON_FILE_TYPES.pdf),
      ];
      const result = schema.safeParse(files);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toContain('Maximum 3 files');
      }
    });
  });

  describe('multiple files - optional', () => {
    const schema = createFileSchema({ maxFiles: 3, required: false });

    it('accepts empty array', () => {
      expect(schema.safeParse([]).success).toBe(true);
    });

    it('still validates when files are provided', () => {
      const files = [
        createMockFile('doc1.pdf', 1024, COMMON_FILE_TYPES.pdf),
        createMockFile('doc2.pdf', 1024, COMMON_FILE_TYPES.pdf),
        createMockFile('doc3.pdf', 1024, COMMON_FILE_TYPES.pdf),
        createMockFile('doc4.pdf', 1024, COMMON_FILE_TYPES.pdf),
      ];
      expect(schema.safeParse(files).success).toBe(false);
    });

    it('accepts valid files when provided', () => {
      const files = [
        createMockFile('doc1.pdf', 1024, COMMON_FILE_TYPES.pdf),
        createMockFile('doc2.pdf', 1024, COMMON_FILE_TYPES.pdf),
      ];
      expect(schema.safeParse(files).success).toBe(true);
    });
  });

  describe('custom max size', () => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const schema = createFileSchema({ maxSize });

    it('accepts file under custom max size', () => {
      const file = createMockFile('doc.pdf', maxSize - 1, COMMON_FILE_TYPES.pdf);
      expect(schema.safeParse(file).success).toBe(true);
    });

    it('rejects file over custom max size', () => {
      const file = createMockFile('toolarge.pdf', maxSize + 1, COMMON_FILE_TYPES.pdf);
      expect(schema.safeParse(file).success).toBe(false);
    });

    it('includes custom size in error message', () => {
      const file = createMockFile('toolarge.pdf', maxSize + 1, COMMON_FILE_TYPES.pdf);
      const result = schema.safeParse(file);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toContain('5 MB');
      }
    });
  });

  describe('custom allowed types', () => {
    const schema = createFileSchema({
      allowedTypes: [COMMON_FILE_TYPES.pdf, COMMON_FILE_TYPES.txt],
    });

    it('accepts allowed PDF file', () => {
      const file = createMockFile('doc.pdf', 1024, COMMON_FILE_TYPES.pdf);
      expect(schema.safeParse(file).success).toBe(true);
    });

    it('accepts allowed text file', () => {
      const file = createMockFile('notes.txt', 1024, COMMON_FILE_TYPES.txt);
      expect(schema.safeParse(file).success).toBe(true);
    });

    it('rejects non-allowed image file', () => {
      const file = createMockFile('photo.jpg', 1024, COMMON_FILE_TYPES.jpg);
      expect(schema.safeParse(file).success).toBe(false);
    });

    it('includes allowed types in error message', () => {
      const file = createMockFile('photo.jpg', 1024, COMMON_FILE_TYPES.jpg);
      const result = schema.safeParse(file);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toContain('application/pdf');
        expect(result.error.issues[0]?.message).toContain('text/plain');
      }
    });
  });

  describe('custom error messages', () => {
    it('allows custom maxSize message', () => {
      const schema = createFileSchema({
        messages: { maxSize: 'Custom size error' },
      });
      const file = createMockFile('toolarge.pdf', DEFAULT_MAX_FILE_SIZE + 1, COMMON_FILE_TYPES.pdf);
      const result = schema.safeParse(file);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Custom size error');
      }
    });

    it('allows custom type message', () => {
      const schema = createFileSchema({
        messages: { type: 'Custom type error' },
      });
      const file = createMockFile('bad.exe', 1024, 'application/x-msdownload');
      const result = schema.safeParse(file);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Custom type error');
      }
    });

    it('allows custom maxFiles message', () => {
      const schema = createFileSchema({
        maxFiles: 2,
        messages: { maxFiles: 'Custom max files error' },
      });
      const files = [
        createMockFile('doc1.pdf', 1024, COMMON_FILE_TYPES.pdf),
        createMockFile('doc2.pdf', 1024, COMMON_FILE_TYPES.pdf),
        createMockFile('doc3.pdf', 1024, COMMON_FILE_TYPES.pdf),
      ];
      const result = schema.safeParse(files);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Custom max files error');
      }
    });

    it('allows custom required message', () => {
      const schema = createFileSchema({
        maxFiles: 2,
        messages: { required: 'Custom required error' },
      });
      const result = schema.safeParse([]);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Custom required error');
      }
    });
  });

  describe('edge cases', () => {
    it('handles zero-byte files', () => {
      const schema = createFileSchema();
      const file = createMockFile('empty.pdf', 0, COMMON_FILE_TYPES.pdf, '');
      expect(schema.safeParse(file).success).toBe(true);
    });

    it('handles files with special characters in name', () => {
      const schema = createFileSchema();
      const file = createMockFile('my-file (1) [copy].pdf', 1024, COMMON_FILE_TYPES.pdf);
      expect(schema.safeParse(file).success).toBe(true);
    });

    it('handles very long filenames', () => {
      const schema = createFileSchema();
      const longName = 'a'.repeat(255) + '.pdf';
      const file = createMockFile(longName, 1024, COMMON_FILE_TYPES.pdf);
      expect(schema.safeParse(file).success).toBe(true);
    });

    it('handles exact boundary file sizes', () => {
      const maxSize = 1024;
      const schema = createFileSchema({ maxSize });
      const file = createMockFile('exact.pdf', maxSize, COMMON_FILE_TYPES.pdf);
      expect(schema.safeParse(file).success).toBe(true);
    });

    it('handles mixed valid and invalid files in array', () => {
      const schema = createFileSchema({ maxFiles: 5 });
      const files = [
        createMockFile('valid1.pdf', 1024, COMMON_FILE_TYPES.pdf),
        createMockFile('invalid.exe', 1024, 'application/x-msdownload'),
        createMockFile('valid2.pdf', 1024, COMMON_FILE_TYPES.pdf),
      ];
      expect(schema.safeParse(files).success).toBe(false);
    });
  });

  describe('default values', () => {
    it('uses default max file size when not specified', () => {
      const schema = createFileSchema();
      const file = createMockFile('doc.pdf', DEFAULT_MAX_FILE_SIZE, COMMON_FILE_TYPES.pdf);
      expect(schema.safeParse(file).success).toBe(true);
    });

    it('uses default allowed types when not specified', () => {
      const schema = createFileSchema();
      const pdfFile = createMockFile('doc.pdf', 1024, COMMON_FILE_TYPES.pdf);
      const txtFile = createMockFile('notes.txt', 1024, COMMON_FILE_TYPES.txt);

      expect(schema.safeParse(pdfFile).success).toBe(true);
      expect(schema.safeParse(txtFile).success).toBe(false);
    });

    it('defaults to single file (maxFiles = 1)', () => {
      const schema = createFileSchema();
      const file = createMockFile('doc.pdf', 1024, COMMON_FILE_TYPES.pdf);

      // Single file should work
      expect(schema.safeParse(file).success).toBe(true);

      // Array should not work for single file schema
      expect(schema.safeParse([file]).success).toBe(false);
    });

    it('defaults to required = true', () => {
      const schema = createFileSchema();
      expect(schema.safeParse(undefined).success).toBe(false);
    });
  });
});
