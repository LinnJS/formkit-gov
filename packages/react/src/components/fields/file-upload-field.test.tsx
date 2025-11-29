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
    // React 19: boolean true renders as presence attribute
    expect(input).toHaveAttribute('required');
  });

  it('passes disabled prop to web component', () => {
    const { container } = render(
      <FileUploadField disabled label="Upload document" name="document" />
    );

    const input = container.querySelector('va-file-input');
    // React 19: boolean true renders as presence attribute
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
    // React 19: boolean true renders as presence attribute
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
      // React 19: boolean true renders as presence attribute
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
      // React 18: false boolean props render as attribute="false" on custom elements
      expect(input).toHaveAttribute('disabled', 'false');
    });

    it('defaults required to false', () => {
      const { container } = render(<FileUploadField label="Upload document" name="document" />);

      const input = container.querySelector('va-file-input');
      // React 18: false boolean props render as attribute="false" on custom elements
      expect(input).toHaveAttribute('required', 'false');
    });

    it('defaults multiple to false', () => {
      const { container } = render(<FileUploadField label="Upload document" name="document" />);

      const input = container.querySelector('va-file-input');
      // React 18: false boolean props render as attribute="false" on custom elements
      expect(input).toHaveAttribute('multiple', 'false');
    });
  });

  describe('multiple file upload', () => {
    it('allows multiple file selection when multiple is true', () => {
      const { container } = render(
        <FileUploadField multiple label="Upload documents" name="documents" />
      );

      const input = container.querySelector('va-file-input');
      // React 19: boolean true renders as presence attribute
      expect(input).toHaveAttribute('multiple');
    });

    it('does not allow multiple file selection by default', () => {
      const { container } = render(<FileUploadField label="Upload document" name="document" />);

      const input = container.querySelector('va-file-input');
      // React 18: false boolean props render as attribute="false" on custom elements
      expect(input).toHaveAttribute('multiple', 'false');
    });
  });
});
