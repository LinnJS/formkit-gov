/**
 * ReviewItem component for displaying key-value pairs
 *
 * @module @formkit-gov/react/components/review
 */

import * as React from 'react';

/**
 * Props for ReviewItem component
 */
export interface ReviewItemProps {
  /**
   * Label text for the review item
   */
  label: string;
  /**
   * Value to display (can be string, element, or array)
   */
  value: React.ReactNode;
  /**
   * If true, renders value as a list
   * @default false
   */
  valueList?: boolean;
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * ReviewItem component for displaying key-value pairs in review sections
 *
 * @example
 * ```tsx
 * import { ReviewItem } from '@formkit-gov/react';
 *
 * function MyReview() {
 *   return (
 *     <>
 *       <ReviewItem label="Full name" value="John Doe" />
 *       <ReviewItem label="Email" value="john@example.com" />
 *     </>
 *   );
 * }
 * ```
 *
 * @example With array value as list
 * ```tsx
 * <ReviewItem
 *   label="Languages"
 *   value={['English', 'Spanish', 'French']}
 *   valueList
 * />
 * ```
 *
 * @example With custom element value
 * ```tsx
 * <ReviewItem
 *   label="Status"
 *   value={<span style={{ color: 'green' }}>Active</span>}
 * />
 * ```
 */
export const ReviewItem = React.forwardRef<HTMLDListElement, ReviewItemProps>(
  ({ label, value, valueList = false, className = '', ...props }, ref) => {
    // Handle null/undefined values
    const displayValue = value ?? 'Not provided';

    // Render value as list if valueList is true and value is an array
    const renderValue = () => {
      if (valueList && Array.isArray(value)) {
        return (
          <ul
            style={{
              margin: 0,
              paddingLeft: '1.5rem',
              listStyleType: 'disc',
            }}
          >
            {value.map((item, index) => (
              <li key={index}>{item ?? 'Not provided'}</li>
            ))}
          </ul>
        );
      }

      // If value is array but valueList is false, join with commas
      if (Array.isArray(value)) {
        return value.filter(v => v != null).join(', ') || 'Not provided';
      }

      return displayValue;
    };

    return (
      <dl
        ref={ref}
        className={`review-item ${className}`.trim()}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '1rem',
          padding: '0.75rem 0',
          borderBottom: '1px solid #d6d7d9',
          margin: 0,
        }}
        {...props}
      >
        <dt
          style={{
            fontWeight: 'bold',
            color: '#1b1b1b',
            margin: 0,
          }}
        >
          {label}
        </dt>
        <dd
          style={{
            margin: 0,
            color: '#1b1b1b',
          }}
        >
          {renderValue()}
        </dd>
      </dl>
    );
  }
);

ReviewItem.displayName = 'ReviewItem';
