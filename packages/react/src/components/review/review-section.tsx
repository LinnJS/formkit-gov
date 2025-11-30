/**
 * ReviewSection component for grouping related review items
 *
 * @module @formkit-gov/react/components/review
 */

import * as React from 'react';

/**
 * Props for ReviewSection component
 */
export interface ReviewSectionProps {
  /**
   * Section title displayed as heading
   */
  title: string;
  /**
   * Child review items to display in this section
   */
  children: React.ReactNode;
  /**
   * Optional link href to edit this section
   */
  editHref?: string;
  /**
   * Optional callback when edit is clicked
   */
  onEdit?: () => void;
  /**
   * Label for the edit action
   * @default 'Edit'
   */
  editLabel?: string;
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * ReviewSection component for grouping related review items before final submission
 *
 * @example
 * ```tsx
 * import { ReviewSection, ReviewItem } from '@formkit-gov/react';
 *
 * function MyReview() {
 *   return (
 *     <ReviewSection
 *       title="Personal Information"
 *       editHref="/edit/personal"
 *     >
 *       <ReviewItem label="Full name" value="John Doe" />
 *       <ReviewItem label="Email" value="john@example.com" />
 *     </ReviewSection>
 *   );
 * }
 * ```
 *
 * @example With edit callback
 * ```tsx
 * <ReviewSection
 *   title="Contact Information"
 *   onEdit={() => navigate('/edit/contact')}
 *   editLabel="Edit contact"
 * >
 *   <ReviewItem label="Phone" value="555-1234" />
 * </ReviewSection>
 * ```
 */
export const ReviewSection = React.forwardRef<HTMLElement, ReviewSectionProps>(
  ({ title, children, editHref, onEdit, editLabel = 'Edit', className = '', ...props }, ref) => {
    const handleEditClick = (e: React.MouseEvent) => {
      if (onEdit) {
        e.preventDefault();
        onEdit();
      }
    };

    return (
      <section
        ref={ref}
        className={`review-section ${className}`.trim()}
        style={{
          backgroundColor: '#f0f0f0',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          borderRadius: '4px',
          border: '1px solid #d6d7d9',
        }}
        {...props}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: '1.35rem',
              fontWeight: 'bold',
              color: '#1b1b1b',
            }}
          >
            {title}
          </h3>
          {(editHref || onEdit) && (
            <a
              aria-label={`${editLabel} ${title}`}
              href={editHref || '#'}
              style={{
                color: '#005ea2',
                textDecoration: 'underline',
                fontSize: '1rem',
                fontWeight: 'normal',
              }}
              onClick={onEdit ? handleEditClick : undefined}
            >
              {editLabel}
            </a>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{children}</div>
      </section>
    );
  }
);

ReviewSection.displayName = 'ReviewSection';
