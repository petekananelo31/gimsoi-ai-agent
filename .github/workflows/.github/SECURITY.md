# Security Policy

## Reporting Vulnerabilities

**DO NOT** open public issues for security vulnerabilities.

Email: security@gimsoi.dev

Include:
- Description of vulnerability
- Affected component
- Proof of concept (if possible)

Response time: 24-48 hours

## Code Security Requirements

### No Secrets
- ❌ API keys in code
- ❌ Passwords in code
- ❌ Database credentials
- ✅ Use environment variables
- ✅ Use GitHub Secrets

### Input Validation
- Validate all user inputs
- Sanitize before database
- Check input length/type

### Authentication
- Implement proper login
- Use secure tokens
- Protect sensitive operations

### Logging
- Log security events
- Don't log passwords/tokens
- Monitor for suspicious activity

## Version
Last updated: 2026-04-12
