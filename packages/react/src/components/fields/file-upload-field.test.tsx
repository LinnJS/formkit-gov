/**
 * Tests for FileUploadField component
 *
 * Note: VA Design System web components don't render their internal structure
 * in test environments (happy-dom/jsdom). Tests verify that the component
 * correctly passes props to the underlying web component element.
 */

import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { FileUploadField } from './file-upload-field';

describe('FileUploadField', () => {
  it('renders va-file-input element', () => {
    const { container } = render(<FileUploadField label="Upload document" name="document" />);

    const input = container.querySelector('va-file-input');
    expect(input).toBeInTheDocument();
  });

  it('passes label prop to web component', () => {
    const { container } = render(<FileUploadField label="Upload document" name="document" />);

    const input = container.querySelector('va-file-input');
    expect(input).toHaveAttribute('label', 'Upload document');
  });

  it('passes error prop to web component', () => {
    const { container } = render(
      <FileUploadField error="File is required" label="Upload document" name="document" />
    );

    const input = container.querySelector('va-file-input');
    expect(input).toHaveAttribute('error', 'File is required');
  });

  it('passes hint prop to web component', () => {
    const { container } = render(
      <FileUploadField
        hint="Accepted formats: PDF, JPG, PNG"
        label="Upload document"
        name="document"
      />
    );

    const input = container.querySelector('va-file-input');
    expect(input).toHaveAttribute('hint', 'Accepted formats: PDF, JPG, PNG');
  });

  it('passes required prop to web component', () => {
    const { container } = render(
      <FileUploadField required label="Upload document" name="document" />
    );

    const input = container.querySelector('va-file-input');
    expect(input).toHaveAttribute('required');
  });

  it('passes disabled prop to web component', () => {
    const { container } = render(
      <FileUploadField disabled label="Upload document" name="document" />
    );

    const input = container.querySelector('va-file-input');
    expect(input).toHaveAttribute('disabled');
  });

  it('passes name prop to web component', () => {
    const { container } = render(<FileUploadField label="Upload document" name="documentUpload" />);

    const input = container.querySelector('va-file-input');
    expect(input).toHaveAttribute('name', 'documentUpload');
  });

  it('passes accept prop to web component', () => {
    const { container } = render(
      <FileUploadField accept=".pdf,.jpg,.png" label="Upload document" name="document" />
    );

    const input = container.querySelector('va-file-input');
    expect(input).toHaveAttribute('accept', '.pdf,.jpg,.png');
  });

  it('passes multiple prop to web component', () => {
    const { container } = render(
      <FileUploadField multiple label="Upload documents" name="documents" />
    );

    const input = container.querySelector('va-file-input');
    expect(input).toHaveAttribute('multiple');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<FileUploadField ref={ref} label="Upload document" name="document" />);

    expect(ref).toHaveBeenCalled();
  });

  it('applies additional props to web component', () => {
    const { container } = render(
      <FileUploadField data-testid="test-upload" label="Upload document" name="document" />
    );

    const input = container.querySelector('va-file-input');
    expect(input).toHaveAttribute('data-testid', 'test-upload');
  });

  describe('file type acceptance', () => {
    it('accepts PDF files', () => {
      const { container } = render(<FileUploadField accept=".pdf" label="Upload PDF" name="pdf" />);

      const input = container.querySelector('va-file-input');
      expect(input).toHaveAttribute('accept', '.pdf');
    });

    it('accepts image files', () => {
      const { container } = render(
        <FileUploadField accept="image/*" label="Upload image" name="image" />
      );

      const input = container.querySelector('va-file-input');
      expect(input).toHaveAttribute('accept', 'image/*');
    });

    it('accepts multiple file types', () => {
      const { container } = render(
        <FileUploadField accept=".pdf,.doc,.docx" label="Upload document" name="document" />
      );

      const input = container.querySelector('va-file-input');
      expect(input).toHaveAttribute('accept', '.pdf,.doc,.docx');
    });
  });

  describe('React Hook Form integration', () => {
    it('accepts React Hook Form field props', () => {
      const handleChange = vi.fn();
      const handleBlur = vi.fn();

      const { container } = render(
        <FileUploadField
          required
          label="Upload document"
          name="document"
          onBlur={handleBlur}
          onChange={handleChange}
        />
      );

      const input = container.querySelector('va-file-input');
      expect(input).toHaveAttribute('name', 'document');
      expect(input).toHaveAttribute('required');
    });

    it('displays validation error from React Hook Form', () => {
      const { container } = render(
        <FileUploadField error="Please upload a file" label="Upload document" name="document" />
      );

      const input = container.querySelector('va-file-input');
      expect(input).toHaveAttribute('error', 'Please upload a file');
    });
  });

  describe('default values', () => {
    it('defaults disabled to false', () => {
      const { container } = render(<FileUploadField label="Upload document" name="document" />);

      const input = container.querySelector('va-file-input');
      expect(input).not.toHaveAttribute('disabled');
    });

    it('defaults required to false', () => {
      const { container } = render(<FileUploadField label="Upload document" name="document" />);

      const input = container.querySelector('va-file-input');
      expect(input).not.toHaveAttribute('required');
    });

    it('defaults multiple to false', () => {
      const { container } = render(<FileUploadField label="Upload document" name="document" />);

      const input = container.querySelector('va-file-input');
      expect(input).not.toHaveAttribute('multiple');
    });
  });

  describe('multiple file upload', () => {
    it('allows multiple file selection when multiple is true', () => {
      const { container } = render(
        <FileUploadField multiple label="Upload documents" name="documents" />
      );

      const input = container.querySelector('va-file-input');
      expect(input).toHaveAttribute('multiple');
    });

    it('does not allow multiple file selection by default', () => {
      const { container } = render(<FileUploadField label="Upload document" name="document" />);

      const input = container.querySelector('va-file-input');
      expect(input).not.toHaveAttribute('multiple');
    });
  });

  describe('event handling', () => {
    it('calls onChange with files from custom event', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <FileUploadField label="Upload document" name="document" onChange={handleChange} />
      );

      const input = container.querySelector('va-file-input');
      const mockFiles = [new File(['content'], 'test.pdf', { type: 'application/pdf' })];

      // Dispatch custom event with files in detail
      const customEvent = new CustomEvent('vaChange', {
        detail: { files: mockFiles },
        bubbles: true,
      });
      input?.dispatchEvent(customEvent);

      expect(handleChange).toHaveBeenCalledWith(mockFiles);
    });

    it('calls onChange with null when no files in event detail', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <FileUploadField label="Upload document" name="document" onChange={handleChange} />
      );

      const input = container.querySelector('va-file-input');

      // Dispatch custom event without files
      const customEvent = new CustomEvent('vaChange', {
        detail: {},
        bubbles: true,
      });
      input?.dispatchEvent(customEvent);

      expect(handleChange).toHaveBeenCalledWith(null);
    });

    it('does not call onChange when handler is not provided', () => {
      const { container } = render(<FileUploadField label="Upload document" name="document" />);

      const input = container.querySelector('va-file-input');

      // Should not throw when no onChange handler
      const customEvent = new CustomEvent('vaChange', {
        detail: { files: [] },
        bubbles: true,
      });
      expect(() => input?.dispatchEvent(customEvent)).not.toThrow();
    });

    it('calls onBlur when blur event is triggered', () => {
      const handleBlur = vi.fn();
      const { container } = render(
        <FileUploadField label="Upload document" name="document" onBlur={handleBlur} />
      );

      const input = container.querySelector('va-file-input');

      // Dispatch blur event
      const blurEvent = new Event('blur', { bubbles: true });
      input?.dispatchEvent(blurEvent);

      expect(handleBlur).toHaveBeenCalled();
    });

    it('does not call onBlur when handler is not provided', () => {
      const { container } = render(<FileUploadField label="Upload document" name="document" />);

      const input = container.querySelector('va-file-input');

      // Should not throw when no onBlur handler
      const blurEvent = new Event('blur', { bubbles: true });
      expect(() => input?.dispatchEvent(blurEvent)).not.toThrow();
    });
  });
});
