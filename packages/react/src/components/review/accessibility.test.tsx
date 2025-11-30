/**
 * Accessibility tests for review components using axe-core
 *
 * Tests WCAG 2.1 AA compliance for review/summary components.
 */

import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { axe } from '../../test-setup';

import { ReviewItem } from './review-item';
import { ReviewList } from './review-list';
import { ReviewSection } from './review-section';

describe('Review Components Accessibility', () => {
  describe('ReviewSection', () => {
    it('should have no accessibility violations with basic configuration', async () => {
      const { container } = render(
        <ReviewSection title="Personal Information">
          <ReviewItem label="Full name" value="John Doe" />
          <ReviewItem label="Email" value="john@example.com" />
        </ReviewSection>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with edit link', async () => {
      const { container } = render(
        <ReviewSection editHref="/edit/contact" title="Contact Information">
          <ReviewItem label="Phone" value="555-1234" />
          <ReviewItem label="Address" value="123 Main St" />
        </ReviewSection>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with edit callback', async () => {
      const handleEdit = () => undefined;
      const { container } = render(
        <ReviewSection title="Employment" onEdit={handleEdit}>
          <ReviewItem label="Employer" value="ACME Corp" />
          <ReviewItem label="Position" value="Developer" />
        </ReviewSection>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with custom edit label', async () => {
      const { container } = render(
        <ReviewSection editHref="/edit/address" editLabel="Change address" title="Address">
          <ReviewItem label="Street" value="123 Main St" />
          <ReviewItem label="City" value="Springfield" />
        </ReviewSection>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with multiple items', async () => {
      const { container } = render(
        <ReviewSection title="Application Details">
          <ReviewItem label="Application number" value="12345" />
          <ReviewItem label="Status" value="In progress" />
          <ReviewItem label="Submitted date" value="2024-01-15" />
          <ReviewItem label="Last updated" value="2024-01-20" />
        </ReviewSection>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with nested sections', async () => {
      const { container } = render(
        <>
          <ReviewSection editHref="/edit/personal" title="Personal Information">
            <ReviewItem label="Full name" value="John Doe" />
            <ReviewItem label="Date of birth" value="1990-01-01" />
          </ReviewSection>
          <ReviewSection editHref="/edit/contact" title="Contact Information">
            <ReviewItem label="Email" value="john@example.com" />
            <ReviewItem label="Phone" value="555-1234" />
          </ReviewSection>
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ReviewItem', () => {
    it('should have no accessibility violations with string value', async () => {
      const { container } = render(<ReviewItem label="Full name" value="John Doe" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with empty/undefined value', async () => {
      const { container } = render(<ReviewItem label="Middle name" value={undefined} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with array value as string', async () => {
      const { container } = render(
        <ReviewItem label="Languages" value={['English', 'Spanish', 'French']} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with array value as list', async () => {
      const { container } = render(
        <ReviewItem
          valueList
          label="Certifications"
          value={['CPR', 'First Aid', 'Security Clearance']}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with custom element value', async () => {
      const { container } = render(
        <ReviewItem
          label="Status"
          value={<span style={{ color: 'green', fontWeight: 'bold' }}>Active</span>}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with numeric value', async () => {
      const { container } = render(<ReviewItem label="Age" value={25} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with boolean value', async () => {
      const { container } = render(<ReviewItem label="Veteran status" value="Yes" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with long text value', async () => {
      const longText =
        'This is a very long text value that spans multiple lines and should still maintain proper accessibility structure and semantics.';
      const { container } = render(<ReviewItem label="Description" value={longText} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with multiple items', async () => {
      const { container } = render(
        <>
          <ReviewItem label="First name" value="John" />
          <ReviewItem label="Last name" value="Doe" />
          <ReviewItem label="Email" value="john@example.com" />
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ReviewList', () => {
    const basicItems = [
      { label: 'Full name', value: 'John Doe' },
      { label: 'Email', value: 'john@example.com' },
      { label: 'Phone', value: '555-1234' },
    ];

    it('should have no accessibility violations with bullet list (default)', async () => {
      const { container } = render(<ReviewList items={basicItems} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with numbered list', async () => {
      const { container } = render(<ReviewList items={basicItems} listStyle="numbered" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with no list markers', async () => {
      const { container } = render(<ReviewList items={basicItems} listStyle="none" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with single item', async () => {
      const singleItem = [{ label: 'Status', value: 'Approved' }];
      const { container } = render(<ReviewList items={singleItem} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with many items', async () => {
      const manyItems = [
        { label: 'Item 1', value: 'Value 1' },
        { label: 'Item 2', value: 'Value 2' },
        { label: 'Item 3', value: 'Value 3' },
        { label: 'Item 4', value: 'Value 4' },
        { label: 'Item 5', value: 'Value 5' },
      ];
      const { container } = render(<ReviewList items={manyItems} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with custom element values', async () => {
      const itemsWithElements = [
        { label: 'Status', value: <span style={{ color: 'green' }}>Active</span> },
        { label: 'Priority', value: <strong>High</strong> },
        {
          label: 'Link',
          value: (
            <a href="https://example.com" rel="noopener noreferrer">
              View details
            </a>
          ),
        },
      ];
      const { container } = render(<ReviewList items={itemsWithElements} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with undefined values', async () => {
      const itemsWithUndefined = [
        { label: 'Required field', value: 'John Doe' },
        { label: 'Optional field', value: undefined },
        { label: 'Another field', value: 'Some value' },
      ];
      const { container } = render(<ReviewList items={itemsWithUndefined} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with step-by-step content', async () => {
      const steps = [
        { label: 'Step 1', value: 'Complete personal information form' },
        { label: 'Step 2', value: 'Upload required documents' },
        { label: 'Step 3', value: 'Review and submit application' },
        { label: 'Step 4', value: 'Await confirmation email' },
      ];
      const { container } = render(<ReviewList items={steps} listStyle="numbered" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Review Components Combined', () => {
    it('should have no accessibility violations with complete review page', async () => {
      const { container } = render(
        <>
          <ReviewSection editHref="/edit/personal" title="Personal Information">
            <ReviewItem label="Full name" value="John Doe" />
            <ReviewItem label="Date of birth" value="1990-01-01" />
            <ReviewItem label="SSN" value="***-**-1234" />
          </ReviewSection>

          <ReviewSection editHref="/edit/contact" title="Contact Information">
            <ReviewItem label="Email" value="john@example.com" />
            <ReviewItem label="Phone" value="555-1234" />
            <ReviewItem
              valueList
              label="Address"
              value={['123 Main St', 'Apt 4B', 'Springfield, IL 62701']}
            />
          </ReviewSection>

          <ReviewSection editHref="/edit/employment" title="Employment History">
            <ReviewList
              items={[
                { label: 'Current employer', value: 'ACME Corp' },
                { label: 'Position', value: 'Senior Developer' },
                { label: 'Start date', value: '2020-01-15' },
              ]}
            />
          </ReviewSection>
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
