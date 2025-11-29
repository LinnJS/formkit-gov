/**
 * Tests for Review components
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { ReviewItem } from './review-item';
import { ReviewList } from './review-list';
import { ReviewSection } from './review-section';

describe('ReviewSection', () => {
  it('renders section with title', () => {
    render(
      <ReviewSection title="Personal Information">
        <div>Content</div>
      </ReviewSection>
    );

    expect(screen.getByRole('heading', { name: 'Personal Information' })).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <ReviewSection title="Test Section">
        <div data-testid="child">Child content</div>
      </ReviewSection>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders edit link when editHref is provided', () => {
    render(
      <ReviewSection editHref="/edit/contact" title="Contact Info">
        <div>Content</div>
      </ReviewSection>
    );

    const editLink = screen.getByRole('link', { name: /edit contact info/i });
    expect(editLink).toBeInTheDocument();
    expect(editLink).toHaveAttribute('href', '/edit/contact');
  });

  it('renders edit button with custom label', () => {
    render(
      <ReviewSection editHref="/edit" editLabel="Change address" title="Address">
        <div>Content</div>
      </ReviewSection>
    );

    expect(screen.getByText('Change address')).toBeInTheDocument();
  });

  it('calls onEdit callback when edit is clicked', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    render(
      <ReviewSection title="Test" onEdit={onEdit}>
        <div>Content</div>
      </ReviewSection>
    );

    const editLink = screen.getByRole('link', { name: /edit test/i });
    await user.click(editLink);

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('does not render edit link when neither editHref nor onEdit provided', () => {
    render(
      <ReviewSection title="Test">
        <div>Content</div>
      </ReviewSection>
    );

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(
      <ReviewSection ref={ref} title="Test">
        <div>Content</div>
      </ReviewSection>
    );

    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ReviewSection className="custom-class" title="Test">
        <div>Content</div>
      </ReviewSection>
    );

    const section = container.querySelector('.custom-class');
    expect(section).toBeInTheDocument();
  });
});

describe('ReviewItem', () => {
  it('renders label and value', () => {
    const { container } = render(<ReviewItem label="Full name" value="John Doe" />);

    expect(screen.getByText('Full name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();

    // Check that dt and dd elements are used
    const dt = container.querySelector('dt');
    const dd = container.querySelector('dd');
    expect(dt).toHaveTextContent('Full name');
    expect(dd).toHaveTextContent('John Doe');
  });

  it('handles null value gracefully', () => {
    render(<ReviewItem label="Phone" value={null} />);

    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Not provided')).toBeInTheDocument();
  });

  it('handles undefined value gracefully', () => {
    render(<ReviewItem label="Email" value={undefined} />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Not provided')).toBeInTheDocument();
  });

  it('renders array as comma-separated when valueList is false', () => {
    render(<ReviewItem label="Languages" value={['English', 'Spanish', 'French']} />);

    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('English, Spanish, French')).toBeInTheDocument();
  });

  it('renders array as list when valueList is true', () => {
    const { container } = render(
      <ReviewItem valueList label="Languages" value={['English', 'Spanish', 'French']} />
    );

    expect(screen.getByText('Languages')).toBeInTheDocument();

    const list = container.querySelector('ul');
    expect(list).toBeInTheDocument();

    const listItems = container.querySelectorAll('li');
    expect(listItems).toHaveLength(3);
    expect(listItems[0]).toHaveTextContent('English');
    expect(listItems[1]).toHaveTextContent('Spanish');
    expect(listItems[2]).toHaveTextContent('French');
  });

  it('handles empty array', () => {
    render(<ReviewItem label="Languages" value={[]} />);

    expect(screen.getByText('Not provided')).toBeInTheDocument();
  });

  it('handles array with null values', () => {
    render(<ReviewItem label="Items" value={['Item 1', null, 'Item 2']} />);

    expect(screen.getByText('Item 1, Item 2')).toBeInTheDocument();
  });

  it('renders custom element as value', () => {
    render(<ReviewItem label="Status" value={<span style={{ color: 'green' }}>Active</span>} />);

    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<ReviewItem ref={ref} label="Test" value="Value" />);

    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(<ReviewItem className="custom-item" label="Test" value="Value" />);

    const item = container.querySelector('.custom-item');
    expect(item).toBeInTheDocument();
  });
});

describe('ReviewList', () => {
  const mockItems = [
    { label: 'Name', value: 'John Doe' },
    { label: 'Email', value: 'john@example.com' },
    { label: 'Phone', value: '555-1234' },
  ];

  it('renders all items', () => {
    render(<ReviewList items={mockItems} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('555-1234')).toBeInTheDocument();
  });

  it('renders as bullet list by default', () => {
    const { container } = render(<ReviewList items={mockItems} />);

    const list = container.querySelector('ul');
    expect(list).toBeInTheDocument();
    expect(list).toHaveStyle({ listStyleType: 'disc' });

    const listItems = container.querySelectorAll('li');
    expect(listItems).toHaveLength(3);
  });

  it('renders as numbered list when listStyle is numbered', () => {
    const { container } = render(<ReviewList items={mockItems} listStyle="numbered" />);

    const list = container.querySelector('ol');
    expect(list).toBeInTheDocument();
    expect(list).toHaveStyle({ listStyleType: 'decimal' });
  });

  it('renders without list markers when listStyle is none', () => {
    const { container } = render(<ReviewList items={mockItems} listStyle="none" />);

    const list = container.querySelector('ul');
    expect(list).toBeInTheDocument();
    expect(list).toHaveStyle({ listStyleType: 'none' });
  });

  it('handles empty items array', () => {
    const { container } = render(<ReviewList items={[]} />);

    const list = container.querySelector('ul');
    expect(list).toBeInTheDocument();

    const listItems = container.querySelectorAll('li');
    expect(listItems).toHaveLength(0);
  });

  it('handles null values in items', () => {
    const itemsWithNull = [
      { label: 'Name', value: 'John Doe' },
      { label: 'Email', value: null },
    ];

    render(<ReviewList items={itemsWithNull} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Not provided')).toBeInTheDocument();
  });

  it('renders custom element values', () => {
    const itemsWithElement = [
      { label: 'Status', value: <span style={{ color: 'green' }}>Active</span> },
      { label: 'Count', value: <strong>42</strong> },
    ];

    render(<ReviewList items={itemsWithElement} />);

    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Count')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<ReviewList ref={ref} items={mockItems} />);

    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(<ReviewList className="custom-list" items={mockItems} />);

    const list = container.querySelector('.custom-list');
    expect(list).toBeInTheDocument();
  });
});

describe('Review components integration', () => {
  it('works together to create a complete review section', () => {
    const { container } = render(
      <ReviewSection editHref="/edit/personal" title="Personal Information">
        <ReviewItem label="Full name" value="John Doe" />
        <ReviewItem label="Email" value="john@example.com" />
        <ReviewItem valueList label="Languages" value={['English', 'Spanish']} />
        <ReviewList
          items={[
            { label: 'Street', value: '123 Main St' },
            { label: 'City', value: 'Springfield' },
          ]}
        />
      </ReviewSection>
    );

    // Check section
    expect(screen.getByRole('heading', { name: 'Personal Information' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /edit/i })).toBeInTheDocument();

    // Check review items
    expect(screen.getByText('Full name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();

    // Check list rendering
    expect(screen.getByText('Languages')).toBeInTheDocument();
    const languagesList = container.querySelectorAll('.review-item ul li');
    expect(languagesList).toHaveLength(2);

    // Check review list
    expect(screen.getByText('Street')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();
    expect(screen.getByText('Springfield')).toBeInTheDocument();
  });
});
