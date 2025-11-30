/**
 * ReviewList component for displaying arrays of items
 *
 * @module @formkit-gov/react/components/review
 */

import * as React from 'react';

/**
 * Item shape for ReviewList
 */
export interface ReviewListItem {
  /**
   * Label for the item
   */
  label: string;
  /**
   * Value to display
   */
  value: React.ReactNode;
}

/**
 * Props for ReviewList component
 */
export interface ReviewListProps {
  /**
   * Array of items to display
   */
  items: ReviewListItem[];
  /**
   * List style type
   * @default 'bullet'
   */
  listStyle?: 'bullet' | 'numbered' | 'none';
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * ReviewList component for displaying arrays of items in a structured list
 *
 * @example
 * ```tsx
 * import { ReviewList } from '@formkit-gov/react';
 *
 * function MyReview() {
 *   const items = [
 *     { label: 'Full name', value: 'John Doe' },
 *     { label: 'Email', value: 'john@example.com' },
 *     { label: 'Phone', value: '555-1234' }
 *   ];
 *
 *   return <ReviewList items={items} />;
 * }
 * ```
 *
 * @example With numbered list
 * ```tsx
 * const steps = [
 *   { label: 'Step 1', value: 'Complete application' },
 *   { label: 'Step 2', value: 'Submit documents' },
 *   { label: 'Step 3', value: 'Await approval' }
 * ];
 *
 * <ReviewList items={steps} listStyle="numbered" />
 * ```
 *
 * @example With no list markers
 * ```tsx
 * <ReviewList items={items} listStyle="none" />
 * ```
 */
export const ReviewList = React.forwardRef<HTMLDivElement, ReviewListProps>(
  ({ items, listStyle = 'bullet', className = '', ...props }, ref) => {
    const getListStyleType = () => {
      switch (listStyle) {
        case 'numbered':
          return 'decimal';
        case 'none':
          return 'none';
        case 'bullet':
        default:
          return 'disc';
      }
    };

    const ElementType = listStyle === 'numbered' ? 'ol' : 'ul';

    return (
      <div
        ref={ref}
        className={`review-list ${className}`.trim()}
        style={{
          backgroundColor: '#ffffff',
          padding: '1rem',
          borderRadius: '4px',
          border: '1px solid #d6d7d9',
        }}
        {...props}
      >
        <ElementType
          style={{
            margin: 0,
            paddingLeft: listStyle === 'none' ? 0 : '1.5rem',
            listStyleType: getListStyleType(),
          }}
        >
          {items.map((item, index) => (
            <li
              key={index}
              style={{
                marginBottom: index < items.length - 1 ? '0.75rem' : 0,
                paddingBottom: index < items.length - 1 ? '0.75rem' : 0,
                borderBottom: index < items.length - 1 ? '1px solid #e6e6e6' : 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                }}
              >
                <strong
                  style={{
                    color: '#1b1b1b',
                    fontWeight: 'bold',
                  }}
                >
                  {item.label}
                </strong>
                <span
                  style={{
                    color: '#1b1b1b',
                  }}
                >
                  {item.value ?? 'Not provided'}
                </span>
              </div>
            </li>
          ))}
        </ElementType>
      </div>
    );
  }
);

ReviewList.displayName = 'ReviewList';
