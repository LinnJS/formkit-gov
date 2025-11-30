/**
 * Accessibility tests for molecular components using axe-core
 *
 * Tests WCAG 2.1 AA compliance for molecular components (composed field groups).
 */

import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { axe } from '../../test-setup';

import { AddressField } from './address-field';
import { FullNameField } from './full-name-field';

describe('Molecular Components Accessibility', () => {
  describe('FullNameField', () => {
    it('should have no accessibility violations with basic configuration', async () => {
      const { container } = render(
        <FullNameField
          firstName={{ label: 'First name', required: true }}
          lastName={{ label: 'Last name', required: true }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with middle name', async () => {
      const { container } = render(
        <FullNameField
          firstName={{ label: 'First name', required: true }}
          lastName={{ label: 'Last name', required: true }}
          middleName={{ label: 'Middle name', show: true }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with suffix', async () => {
      const { container } = render(
        <FullNameField
          firstName={{ label: 'First name', required: true }}
          lastName={{ label: 'Last name', required: true }}
          suffix={{ label: 'Suffix', show: true }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with all fields', async () => {
      const { container } = render(
        <FullNameField
          firstName={{ label: 'First name', required: true }}
          lastName={{ label: 'Last name', required: true }}
          legend="Full legal name"
          middleName={{ label: 'Middle name', show: true }}
          suffix={{ label: 'Suffix', show: true }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with errors', async () => {
      const { container } = render(
        <FullNameField
          firstName={{
            label: 'First name',
            required: true,
            error: 'First name is required',
          }}
          lastName={{
            label: 'Last name',
            required: true,
            error: 'Last name is required',
          }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with hints', async () => {
      const { container } = render(
        <FullNameField
          firstName={{
            label: 'First name',
            required: true,
            hint: 'Enter your legal first name',
          }}
          lastName={{
            label: 'Last name',
            required: true,
            hint: 'Enter your legal last name',
          }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with values', async () => {
      const { container } = render(
        <FullNameField
          firstName={{ label: 'First name', required: true }}
          lastName={{ label: 'Last name', required: true }}
          values={{
            first: 'John',
            last: 'Doe',
          }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with custom suffix options', async () => {
      const customOptions = [
        { label: '- Select -', value: '' },
        { label: 'Jr.', value: 'Jr.' },
        { label: 'Sr.', value: 'Sr.' },
        { label: 'Dr.', value: 'Dr.' },
      ];

      const { container } = render(
        <FullNameField
          firstName={{ label: 'First name', required: true }}
          lastName={{ label: 'Last name', required: true }}
          suffix={{ label: 'Suffix', show: true, options: customOptions }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('AddressField', () => {
    it('should have no accessibility violations with basic configuration', async () => {
      const { container } = render(
        <AddressField
          city={{ label: 'City', required: true }}
          state={{ label: 'State', required: true }}
          street={{ label: 'Street address', required: true }}
          zipCode={{ label: 'ZIP code', required: true }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with custom legend', async () => {
      const { container } = render(
        <AddressField
          city={{ label: 'City', required: true }}
          legend="Mailing address"
          state={{ label: 'State', required: true }}
          street={{ label: 'Street address', required: true }}
          zipCode={{ label: 'ZIP code', required: true }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with street line 2', async () => {
      const { container } = render(
        <AddressField
          city={{ label: 'City', required: true }}
          state={{ label: 'State', required: true }}
          street={{ label: 'Street address', required: true }}
          street2={{ label: 'Apt/Suite', show: true }}
          zipCode={{ label: 'ZIP code', required: true }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with errors', async () => {
      const { container } = render(
        <AddressField
          city={{
            label: 'City',
            required: true,
            error: 'City is required',
          }}
          state={{
            label: 'State',
            required: true,
            error: 'State is required',
          }}
          street={{
            label: 'Street address',
            required: true,
            error: 'Street address is required',
          }}
          zipCode={{
            label: 'ZIP code',
            required: true,
            error: 'ZIP code is required',
          }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with hints', async () => {
      const { container } = render(
        <AddressField
          city={{
            label: 'City',
            required: true,
            hint: 'Enter your city',
          }}
          state={{
            label: 'State',
            required: true,
            hint: 'Select your state',
          }}
          street={{
            label: 'Street address',
            required: true,
            hint: 'Enter your street address',
          }}
          zipCode={{
            label: 'ZIP code',
            required: true,
            hint: 'Enter 5-digit ZIP code',
          }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with values', async () => {
      const { container } = render(
        <AddressField
          city={{ label: 'City', required: true }}
          state={{ label: 'State', required: true }}
          street={{ label: 'Street address', required: true }}
          values={{
            street: '123 Main St',
            city: 'Springfield',
            state: 'IL',
            zipCode: '62701',
          }}
          zipCode={{ label: 'ZIP code', required: true }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with all fields', async () => {
      const { container } = render(
        <AddressField
          city={{ label: 'City', required: true }}
          legend="Home address"
          state={{ label: 'State', required: true }}
          street={{ label: 'Street address', required: true }}
          street2={{ label: 'Apt/Suite/Other', show: true }}
          values={{
            street: '123 Main St',
            street2: 'Apt 4B',
            city: 'Springfield',
            state: 'IL',
            zipCode: '62701',
          }}
          zipCode={{ label: 'ZIP code', required: true }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with military option', async () => {
      const { container } = render(
        <AddressField
          showMilitaryCheckbox
          city={{ label: 'City', required: true }}
          state={{ label: 'State', required: true }}
          street={{ label: 'Street address', required: true }}
          zipCode={{ label: 'ZIP code', required: true }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
