import {
  FileUploadField,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from '@formkit-gov/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FileUploadField> = {
  title: 'Fields/FileUploadField',
  component: FileUploadField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'File upload field that wraps the VA Design System va-file-input web component. Supports file type restrictions and multiple file selection.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label for the file input' },
    hint: { control: 'text', description: 'Hint text displayed below the label' },
    error: { control: 'text', description: 'Error message to display' },
    required: { control: 'boolean', description: 'Whether the field is required' },
    disabled: { control: 'boolean', description: 'Whether the field is disabled' },
    accept: {
      control: 'text',
      description: 'Accepted file types (e.g., ".pdf,.jpg,.png" or "image/*")',
    },
    multiple: { control: 'boolean', description: 'Whether to allow multiple file selection' },
  },
};

export default meta;
type Story = StoryObj<typeof FileUploadField>;

export const Default: Story = {
  args: {
    label: 'Upload document',
    name: 'document',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Upload document',
    hint: 'Please upload your document in PDF or image format',
    name: 'document',
  },
};

export const Required: Story = {
  args: {
    label: 'Upload document',
    required: true,
    name: 'document',
  },
};

export const WithError: Story = {
  args: {
    label: 'Upload document',
    error: 'Please upload a valid file',
    name: 'document',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Upload document',
    disabled: true,
    name: 'document',
  },
};

export const AcceptedFormats: Story = {
  args: {
    label: 'Upload document',
    accept: '.pdf,.jpg,.jpeg,.png',
    hint: 'Accepted formats: PDF, JPG, PNG',
    name: 'document',
  },
};

export const Multiple: Story = {
  args: {
    label: 'Upload documents',
    multiple: true,
    hint: 'You can select multiple files',
    name: 'documents',
  },
};

export const ImageOnly: Story = {
  args: {
    label: 'Upload image',
    accept: 'image/*',
    hint: 'Only image files are accepted',
    name: 'image',
  },
};

export const PDFOnly: Story = {
  args: {
    label: 'Upload PDF',
    accept: '.pdf',
    hint: 'Only PDF files are accepted',
    name: 'pdf',
  },
};

/**
 * Example showing integration with React Hook Form and Zod validation
 */
export const WithReactHookForm: Story = {
  render: () => {
    const schema = z.object({
      document: z.custom<FileList>(
        val => val instanceof FileList && val.length > 0,
        'Please upload a file'
      ),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        const file = data.document[0];
        alert(`File uploaded: ${file.name} (${file.size} bytes)`);
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="document"
            render={({ field: { onChange, onBlur, name }, fieldState }) => (
              <FormItem>
                <FormControl>
                  <FileUploadField
                    label="Upload document"
                    name={name}
                    error={fieldState.error?.message}
                    onChange={onChange}
                    onBlur={onBlur}
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div style={{ marginTop: '1rem' }}>
            <button type="submit">Submit</button>
          </div>
        </Form>
      );
    }

    return <FormExample />;
  },
};

/**
 * Example with multiple file upload and validation
 */
export const MultipleFilesWithValidation: Story = {
  render: () => {
    const schema = z.object({
      documents: z
        .custom<FileList>(
          val => val instanceof FileList && val.length > 0,
          'Please upload at least one file'
        )
        .refine(files => files.length <= 5, 'You can upload a maximum of 5 files'),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        const fileNames = Array.from(data.documents)
          .map(f => f.name)
          .join(', ');
        alert(`Files uploaded: ${fileNames}`);
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="documents"
            render={({ field: { onChange, onBlur, name }, fieldState }) => (
              <FormItem>
                <FormControl>
                  <FileUploadField
                    label="Upload documents"
                    name={name}
                    multiple
                    error={fieldState.error?.message}
                    onChange={onChange}
                    onBlur={onBlur}
                    hint="You can upload up to 5 files"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div style={{ marginTop: '1rem' }}>
            <button type="submit">Submit</button>
          </div>
        </Form>
      );
    }

    return <FormExample />;
  },
};

/**
 * Complete form example with file upload and other fields
 */
export const CompleteFormExample: Story = {
  render: () => {
    const schema = z.object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      document: z.custom<FileList>(
        val => val instanceof FileList && val.length > 0,
        'Please upload a document'
      ),
    });

    type FormData = z.infer<typeof schema>;

    function FormExample() {
      const form = useForm<FormData>({
        resolver: standardSchemaResolver(schema),
        defaultValues: { name: '' },
      });

      const onSubmit = (data: FormData) => {
        // Form data logged via alert for demo
        const file = data.document[0];
        alert(`Name: ${data.name}\nFile: ${file.name}`);
      };

      return (
        <Form form={form} onSubmit={onSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <va-text-input
                      {...field}
                      label="Full name"
                      error={fieldState.error?.message}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="document"
              render={({ field: { onChange, onBlur, name }, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <FileUploadField
                      label="Upload supporting document"
                      name={name}
                      accept=".pdf,.jpg,.jpeg,.png"
                      error={fieldState.error?.message}
                      onChange={onChange}
                      onBlur={onBlur}
                      required
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a PDF or image file (JPG, PNG) as supporting documentation.
                  </FormDescription>
                </FormItem>
              )}
            />

            <div>
              <button type="submit">Submit</button>
            </div>
          </div>
        </Form>
      );
    }

    return <FormExample />;
  },
};
