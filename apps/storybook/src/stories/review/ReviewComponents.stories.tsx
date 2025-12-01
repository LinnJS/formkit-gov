import { ReviewItem, ReviewList, ReviewSection } from '@formkit-gov/react';

import type { ReviewListItem } from '@formkit-gov/react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ReviewSection> = {
  title: 'Review/ReviewComponents',
  component: ReviewSection,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Review components for displaying form data before final submission. Includes ReviewSection for grouping, ReviewItem for key-value pairs, and ReviewList for structured lists.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReviewSection>;

/**
 * Basic review section with simple key-value items
 */
export const BasicReview: Story = {
  render: () => (
    <ReviewSection title="Personal Information">
      <ReviewItem label="Full name" value="John Doe" />
      <ReviewItem label="Email" value="john.doe@example.com" />
      <ReviewItem label="Phone" value="(555) 123-4567" />
      <ReviewItem label="Date of birth" value="January 15, 1980" />
    </ReviewSection>
  ),
};

/**
 * Review section with edit button using href
 */
export const WithEditButton: Story = {
  render: () => (
    <ReviewSection editHref="/edit/contact" title="Contact Information">
      <ReviewItem label="Email" value="john.doe@example.com" />
      <ReviewItem label="Phone" value="(555) 123-4567" />
      <ReviewItem label="Preferred contact method" value="Email" />
    </ReviewSection>
  ),
};

/**
 * Review section with edit callback and custom label
 */
export const WithEditCallback: Story = {
  render: () => (
    <ReviewSection
      editLabel="Update service info"
      title="Military Service"
      onEdit={() => alert('Edit clicked - navigate to edit page')}
    >
      <ReviewItem label="Branch" value="Army" />
      <ReviewItem label="Service dates" value="2005 - 2010" />
      <ReviewItem label="Rank" value="E-5 Sergeant" />
    </ReviewSection>
  ),
};

/**
 * Complete form review with multiple sections
 */
export const CompleteFormReview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ReviewSection editHref="/edit/personal" title="Personal Information">
        <ReviewItem label="Full name" value="John Michael Doe" />
        <ReviewItem label="Social Security Number" value="***-**-1234" />
        <ReviewItem label="Date of birth" value="January 15, 1980" />
        <ReviewItem label="Gender" value="Male" />
      </ReviewSection>

      <ReviewSection editHref="/edit/contact" title="Contact Information">
        <ReviewItem label="Email address" value="john.doe@example.com" />
        <ReviewItem label="Phone number" value="(555) 123-4567" />
        <ReviewItem label="Preferred contact method" value="Email" />
      </ReviewSection>

      <ReviewSection editHref="/edit/address" title="Address">
        <ReviewItem label="Street address" value="123 Main Street" />
        <ReviewItem label="Apartment/Unit" value="Apt 4B" />
        <ReviewItem label="City" value="Springfield" />
        <ReviewItem label="State" value="Illinois" />
        <ReviewItem label="ZIP code" value="62701" />
      </ReviewSection>

      <ReviewSection editHref="/edit/service" title="Military Service">
        <ReviewItem label="Branch of service" value="Army" />
        <ReviewItem label="Service dates" value="January 2005 - December 2010" />
        <ReviewItem label="Rank at discharge" value="E-5 Sergeant" />
        <ReviewItem label="Service number" value="123456789" />
      </ReviewSection>
    </div>
  ),
};

/**
 * Review items with arrays and lists
 */
export const WithLists: Story = {
  render: () => (
    <ReviewSection editHref="/edit/additional" title="Additional Information">
      <ReviewItem label="Languages spoken" value={['English', 'Spanish', 'French']} />
      <ReviewItem
        valueList
        label="Education levels"
        value={['High School Diploma', "Bachelor's Degree", "Master's Degree"]}
      />
      <ReviewItem
        valueList
        label="Medical conditions"
        value={['Hypertension', 'Type 2 Diabetes', 'Anxiety']}
      />
    </ReviewSection>
  ),
};

/**
 * Review items with null/undefined values
 */
export const WithMissingValues: Story = {
  render: () => (
    <ReviewSection title="Optional Information">
      <ReviewItem label="Middle name" value={null} />
      <ReviewItem label="Suffix" value={undefined} />
      <ReviewItem label="Nickname" value="" />
      <ReviewItem label="Secondary email" value="john.personal@example.com" />
    </ReviewSection>
  ),
};

/**
 * Review items with custom element values
 */
export const WithCustomElements: Story = {
  render: () => (
    <ReviewSection title="Application Status">
      <ReviewItem
        label="Status"
        value={<span style={{ color: '#216e1f', fontWeight: 'bold' }}>Approved</span>}
      />
      <ReviewItem
        label="Priority"
        value={<span style={{ color: '#b50909', fontWeight: 'bold' }}>High</span>}
      />
      <ReviewItem
        label="Completion"
        value={<span style={{ color: '#004795' }}>75% Complete</span>}
      />
    </ReviewSection>
  ),
};

/**
 * ReviewList with bullet points (default)
 */
export const ListWithBullets: Story = {
  render: () => {
    const items: ReviewListItem[] = [
      { label: 'Full name', value: 'John Doe' },
      { label: 'Email', value: 'john.doe@example.com' },
      { label: 'Phone', value: '(555) 123-4567' },
      { label: 'Address', value: '123 Main St, Springfield, IL 62701' },
    ];

    return (
      <ReviewSection title="Contact Summary">
        <ReviewList items={items} />
      </ReviewSection>
    );
  },
};

/**
 * ReviewList with numbered items
 */
export const ListWithNumbers: Story = {
  render: () => {
    const steps: ReviewListItem[] = [
      { label: 'Step 1', value: 'Complete personal information' },
      { label: 'Step 2', value: 'Upload required documents' },
      { label: 'Step 3', value: 'Review and verify all information' },
      { label: 'Step 4', value: 'Submit application' },
      { label: 'Step 5', value: 'Await confirmation email' },
    ];

    return (
      <ReviewSection title="Application Process">
        <ReviewList items={steps} listStyle="numbered" />
      </ReviewSection>
    );
  },
};

/**
 * ReviewList with no list markers
 */
export const ListWithoutMarkers: Story = {
  render: () => {
    const benefits: ReviewListItem[] = [
      { label: 'Health Care', value: 'Active enrollment in VA Health Care' },
      { label: 'Disability', value: '70% service-connected disability rating' },
      { label: 'Education', value: 'Post-9/11 GI Bill benefits available' },
      { label: 'Home Loan', value: 'VA Home Loan Certificate of Eligibility on file' },
    ];

    return (
      <ReviewSection title="Current Benefits">
        <ReviewList items={benefits} listStyle="none" />
      </ReviewSection>
    );
  },
};

/**
 * Mixed review components
 */
export const MixedComponents: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ReviewSection editHref="/edit/applicant" title="Applicant Information">
        <ReviewItem label="Full name" value="Jane Smith" />
        <ReviewItem label="SSN" value="***-**-5678" />
        <ReviewItem label="Date of birth" value="March 22, 1985" />
      </ReviewSection>

      <ReviewSection editHref="/edit/dependents" title="Dependents">
        <ReviewList
          items={[
            { label: 'Dependent 1', value: 'John Smith Jr. (Son, Age 12)' },
            { label: 'Dependent 2', value: 'Emily Smith (Daughter, Age 8)' },
          ]}
          listStyle="numbered"
        />
      </ReviewSection>

      <ReviewSection editHref="/edit/education" title="Education History">
        <ReviewItem
          valueList
          label="Degrees earned"
          value={["Bachelor's in Computer Science", "Master's in Software Engineering"]}
        />
        <ReviewItem valueList label="Institutions" value={['State University', 'Tech Institute']} />
      </ReviewSection>
    </div>
  ),
};

/**
 * Review with long content
 */
export const WithLongContent: Story = {
  render: () => (
    <ReviewSection editHref="/edit/details" title="Detailed Information">
      <ReviewItem label="Full legal name" value="Johnathan Michael Christopher Doe-Smith III" />
      <ReviewItem
        label="Current employment"
        value="Senior Software Engineer at Technology Solutions International Corporation"
      />
      <ReviewItem
        valueList
        label="Previous addresses"
        value={[
          '123 Main Street, Apartment 4B, Springfield, IL 62701',
          '456 Oak Avenue, Unit 201, Chicago, IL 60614',
          '789 Pine Road, Suite 15, Naperville, IL 60540',
        ]}
      />
      <ReviewItem
        label="Additional notes"
        value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
      />
    </ReviewSection>
  ),
};

/**
 * Empty review section
 */
export const EmptySection: Story = {
  render: () => (
    <ReviewSection title="Optional Information">
      <ReviewItem label="No information provided" value={null} />
    </ReviewSection>
  ),
};

/**
 * Review with special characters and formatting
 */
export const WithSpecialCharacters: Story = {
  render: () => (
    <ReviewSection editHref="/edit/contact" title="Contact & Communication">
      <ReviewItem label="Email" value="john.doe+va@example.com" />
      <ReviewItem label="Phone (Work)" value="+1 (555) 123-4567 ext. 890" />
      <ReviewItem label="Phone (Mobile)" value="+1 (555) 987-6543" />
      <ReviewItem label="Fax" value="+1 (555) 111-2222" />
      <ReviewItem label="Website" value="https://www.johndoe-portfolio.com" />
    </ReviewSection>
  ),
};
