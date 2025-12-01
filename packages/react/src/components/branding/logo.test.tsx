/**
 * Tests for Logo component
 */

import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';

import { Logo } from './logo';

describe('Logo', () => {
  describe('rendering', () => {
    it('renders an SVG element', () => {
      render(<Logo data-testid="logo" />);

      const logo = screen.getByTestId('logo');
      expect(logo.tagName.toLowerCase()).toBe('svg');
    });

    it('renders with correct viewBox', () => {
      render(<Logo data-testid="logo" />);

      const logo = screen.getByTestId('logo');
      expect(logo).toHaveAttribute('viewBox', '0 0 100 100');
    });

    it('renders SVG child elements', () => {
      render(<Logo data-testid="logo" />);

      const logo = screen.getByTestId('logo');
      // Should contain rect, line, circle, and path elements
      expect(logo.querySelectorAll('rect').length).toBeGreaterThan(0);
      expect(logo.querySelectorAll('line').length).toBeGreaterThan(0);
      expect(logo.querySelectorAll('circle').length).toBeGreaterThan(0);
      expect(logo.querySelectorAll('path').length).toBeGreaterThan(0);
    });
  });

  describe('accessibility', () => {
    it('has role="img" for screen readers', () => {
      render(<Logo />);

      const logo = screen.getByRole('img');
      expect(logo).toBeInTheDocument();
    });

    it('has aria-label describing the logo', () => {
      render(<Logo />);

      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('aria-label', 'FormKit Gov logo');
    });

    it('can override aria-label via props', () => {
      render(<Logo aria-label="Custom label" />);

      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('aria-label', 'Custom label');
    });
  });

  describe('className prop', () => {
    it('applies className to SVG element', () => {
      render(<Logo className="h-12 w-12" data-testid="logo" />);

      const logo = screen.getByTestId('logo');
      expect(logo).toHaveClass('h-12', 'w-12');
    });

    it('works without className', () => {
      render(<Logo data-testid="logo" />);

      const logo = screen.getByTestId('logo');
      expect(logo).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to SVG element', () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<Logo ref={ref} />);

      expect(ref.current).toBeInstanceOf(SVGSVGElement);
    });

    it('ref.current has correct tagName', () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<Logo ref={ref} />);

      expect(ref.current?.tagName.toLowerCase()).toBe('svg');
    });
  });

  describe('prop spreading', () => {
    it('spreads additional SVG props', () => {
      render(<Logo data-custom="value" data-testid="logo" />);

      const logo = screen.getByTestId('logo');
      expect(logo).toHaveAttribute('data-custom', 'value');
    });

    it('allows overriding fill attribute', () => {
      render(<Logo data-testid="logo" fill="currentColor" />);

      const logo = screen.getByTestId('logo');
      expect(logo).toHaveAttribute('fill', 'currentColor');
    });
  });

  describe('displayName', () => {
    it('has correct displayName for debugging', () => {
      expect(Logo.displayName).toBe('Logo');
    });
  });
});
