# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously at FormKit Gov. If you discover a security vulnerability, please report
it responsibly.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via one of the following methods:

1. **GitHub Security Advisories**: Report through the
   [Security tab](https://github.com/LinnJS/formkit-gov/security/advisories/new) on GitHub.

2. **Email**: Send an email to security@formkit-gov.dev with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Any suggested fixes (optional)

### What to Expect

- **Acknowledgment**: We will acknowledge receipt within 48 hours.
- **Assessment**: We will assess the vulnerability and determine its severity.
- **Updates**: We will provide updates on the progress every 5 business days.
- **Resolution**: We aim to resolve critical issues within 90 days.
- **Credit**: We will credit you in the security advisory (unless you prefer to remain anonymous).

### Scope

The following are in scope for security reports:

- All packages in the `@formkit-gov/*` scope
- The documentation site
- Demo applications
- CI/CD configurations

The following are out of scope:

- Third-party dependencies (report to the respective maintainers)
- Social engineering attacks
- Denial of service attacks
- Issues in unsupported versions

## Security Best Practices

When using FormKit Gov in your applications:

1. **Keep Dependencies Updated**: Regularly update to the latest versions.

2. **Validate User Input**: Always validate and sanitize user input, even when using our validation
   schemas.

3. **Secure API Endpoints**: Ensure your backend properly validates data received from forms.

4. **Review Generated Schemas**: When using `@formkit-gov/openapi`, review generated schemas before
   use.

5. **Handle Sensitive Data**: Use appropriate measures for handling sensitive data like SSNs.

## Security Features

FormKit Gov includes several security-conscious features:

- **Input Validation**: Comprehensive Zod schemas with strict validation
- **XSS Prevention**: React components follow secure coding practices
- **No eval()**: We never use dynamic code execution
- **TypeScript**: Full type safety helps prevent common vulnerabilities
- **Accessibility**: Proper ARIA attributes and semantic HTML

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the vulnerability and determine affected versions.
2. Audit code to find similar issues.
3. Prepare fixes for all supported versions.
4. Release patches and publish a security advisory.

We request that you:

- Give us reasonable time to fix the issue before public disclosure.
- Make a good faith effort to avoid privacy violations and data destruction.
- Not access or modify other users' data without permission.

Thank you for helping keep FormKit Gov and its users safe!
