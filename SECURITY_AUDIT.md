# Amora MVP - Security Audit Checklist

Complete security audit checklist before production launch.

## Pre-Launch Security Review

**Status**: [ ] Complete  
**Reviewer**: ___________  
**Date**: ___________

---

## 1. Authentication & Authorization

### Supabase Auth Configuration

- [ ] Email confirmation enabled (or disabled intentionally)
- [ ] Password requirements meet minimum standards (8+ chars)
- [ ] Rate limiting enabled on auth endpoints
- [ ] Session timeout configured appropriately
- [ ] JWT secret is strong and unique
- [ ] Auth redirects configured correctly
- [ ] No test accounts in production database

### Access Control

- [ ] Row Level Security (RLS) enabled on ALL tables
- [ ] RLS policies tested for each user role
- [ ] Admin users cannot be created via public endpoints
- [ ] Service role key kept secret and secure
- [ ] Anon key is properly scoped (read-only where appropriate)

**Test**: Try accessing another user's data while authenticated
- [ ] Personal memories not accessible to partner
- [ ] Cannot view other couples' data
- [ ] Cannot modify other users' profiles

---

## 2. API Security

### Edge Functions

- [ ] All functions validate JWT tokens
- [ ] Input validation on all parameters
- [ ] SQL injection prevention (using parameterized queries)
- [ ] Rate limiting implemented per user
- [ ] Functions use service role key only when necessary
- [ ] Secrets stored in Supabase secrets (not hardcoded)
- [ ] Error messages don't leak sensitive info

**Test Each Function**:

`pair_users`:
- [ ] Cannot pair with non-existent code
- [ ] Cannot pair if already paired
- [ ] Cannot pair with yourself
- [ ] Validates code format (6 digits)

`start_session`:
- [ ] Only one session per day enforced
- [ ] Cannot start session for another user
- [ ] OpenAI client secret not exposed in logs

`process_memory`:
- [ ] Only session owner can process
- [ ] Transcript sanitized before storage
- [ ] Embeddings properly scoped (personal vs shared)

### API Keys

- [ ] OpenAI API key stored securely in Supabase secrets
- [ ] No API keys committed to git
- [ ] API keys rotated if ever exposed
- [ ] Separate keys for dev/staging/production

---

## 3. Database Security

### Configuration

- [ ] Database not publicly accessible (only via Supabase)
- [ ] Connection pooling configured
- [ ] Database backups enabled (automatic via Supabase)
- [ ] No default/weak passwords

### Data Protection

- [ ] Sensitive data encrypted at rest (Supabase default)
- [ ] No PII in logs
- [ ] User emails not exposed in public queries
- [ ] Pairing codes expire or are single-use
- [ ] Session transcripts stored securely

### RLS Policies Verification

Run these queries to verify policies:

```sql
-- Verify all tables have RLS enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND rowsecurity = false;
-- Should return 0 rows

-- List all policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public';
-- Verify each table has appropriate policies
```

---

## 4. Frontend Security

### Admin Panel

- [ ] Admin panel requires authentication
- [ ] Session storage uses secure cookies
- [ ] No sensitive data in localStorage
- [ ] CORS configured correctly
- [ ] XSS protection enabled
- [ ] CSP headers configured
- [ ] All forms validate input
- [ ] SQL queries use Supabase client (prevents injection)

**Test**:
- [ ] Cannot access admin panel without login
- [ ] Session expires after inactivity
- [ ] Logout clears all session data

### iOS App

- [ ] Supabase keys stored securely (not in plain text)
- [ ] Network calls use HTTPS only
- [ ] Keychain used for sensitive data
- [ ] Deep links validated before processing
- [ ] No sensitive data logged to console
- [ ] App Transport Security enabled

**Test**:
- [ ] Cannot intercept/modify API calls easily
- [ ] Auth tokens not logged
- [ ] Biometric auth (if applicable) works correctly

---

## 5. Data Privacy

### GDPR/CCPA Compliance

- [ ] Privacy Policy created and accessible
- [ ] Terms of Service created and accessible
- [ ] User consent obtained for data collection
- [ ] Data retention policy defined
- [ ] User can delete their account
- [ ] User can export their data
- [ ] Partner's personal memories never shared

### Data Minimization

- [ ] Only collect necessary data
- [ ] No tracking beyond essential analytics
- [ ] Third-party services documented (OpenAI)
- [ ] Data sharing policies clear

### User Rights

Implement these endpoints/features:
- [ ] Account deletion (and data cleanup)
- [ ] Data export functionality
- [ ] Ability to unpair from partner
- [ ] Clear consent flows

---

## 6. Infrastructure Security

### Supabase

- [ ] MFA enabled for Supabase admin account
- [ ] Audit logs reviewed regularly
- [ ] Database backups tested (restore procedure)
- [ ] Only necessary team members have access
- [ ] Access roles properly configured

### Hosting

- [ ] Admin panel hosted on HTTPS (Vercel/Netlify)
- [ ] Environment variables set correctly
- [ ] No secrets in environment variables UI (use encrypted)
- [ ] Deploy previews don't use production data

### Monitoring

- [ ] Error tracking configured (Sentry)
- [ ] Log aggregation set up
- [ ] Alerts for suspicious activity
- [ ] Monitor API rate limits

---

## 7. Third-Party Services

### OpenAI

- [ ] API key has usage limits set
- [ ] Monitor usage for anomalies
- [ ] Verify data retention policy
- [ ] Understand what data OpenAI stores

### Dependencies

- [ ] All npm packages up to date
- [ ] No known vulnerabilities (`npm audit`)
- [ ] Supabase SDK up to date
- [ ] iOS dependencies reviewed

```bash
# Check for vulnerabilities
cd admin-web && npm audit
cd backend && deno cache --reload
```

---

## 8. Mobile App Security

### iOS Specific

- [ ] Certificate pinning (optional, advanced)
- [ ] Jailbreak detection (optional)
- [ ] Obfuscate sensitive code (if needed)
- [ ] App Store privacy nutrition label completed
- [ ] Microphone permission clearly explained
- [ ] Background modes justified

### Deep Linking

- [ ] Pairing codes validated before use
- [ ] Cannot inject malicious params via deep link
- [ ] Deep link scheme not too generic

**Test**:
```bash
# Try malicious deep links
xcrun simctl openurl booted "amora://pair?code=<script>alert(1)</script>"
xcrun simctl openurl booted "amora://pair?code=' OR '1'='1"
```

---

## 9. Operational Security

### Secrets Management

- [ ] `.env` files in `.gitignore`
- [ ] No secrets in git history
- [ ] Team uses password manager
- [ ] Secrets rotated regularly
- [ ] Service accounts use minimum permissions

### Incident Response Plan

- [ ] Know how to revoke API keys quickly
- [ ] Can push emergency update to users
- [ ] Can disable Edge Functions if needed
- [ ] Contact info for security reports public

### Team Access

- [ ] Principle of least privilege
- [ ] Remove access for departed team members
- [ ] Audit who has admin access
- [ ] MFA enabled for all critical accounts

---

## 10. Compliance & Legal

### App Store Requirements

- [ ] Privacy Policy URL in app
- [ ] Terms of Service URL in app
- [ ] Data collection disclosed accurately
- [ ] Age rating appropriate (17+ for relationship content)
- [ ] Export compliance reviewed

### Data Handling

- [ ] Know where data is stored (region)
- [ ] Understand data residency requirements
- [ ] Comply with applicable laws (GDPR, HIPAA, etc.)
- [ ] User data not sold or shared

---

## 11. Testing

### Penetration Testing

- [ ] SQL injection attempts (should fail)
- [ ] XSS attempts (should be sanitized)
- [ ] CSRF protection verified
- [ ] Rate limiting tested
- [ ] Authentication bypass attempts (should fail)

### Security Scan

Run automated security scans:

```bash
# Frontend
cd admin-web
npm install -g snyk
snyk test

# Check for exposed secrets
git log --all --full-history --source --oneline | grep -i "password\|secret\|key"
```

---

## 12. Documentation

- [ ] Security practices documented
- [ ] Incident response plan written
- [ ] Data flow diagrams created
- [ ] Privacy Policy accurate
- [ ] Security contact email public

---

## Severity Levels

### Critical (Fix Immediately)
- Authentication bypass
- RLS policy missing
- API key exposed
- Data leak between users

### High (Fix Before Launch)
- Missing input validation
- Weak password requirements
- No rate limiting
- Unencrypted sensitive data

### Medium (Fix Soon)
- Missing CSP headers
- Verbose error messages
- No session timeout
- Missing audit logs

### Low (Nice to Have)
- Certificate pinning
- Advanced obfuscation
- Additional monitoring

---

## Sign-Off

After completing this checklist:

**Security Lead**: ___________ Date: ___________  
**Technical Lead**: ___________ Date: ___________  
**Legal Review**: ___________ Date: ___________

**Notes/Exceptions**:
```
[Document any skipped items and justification]
```

---

## Post-Launch Monitoring

First 30 days:
- [ ] Daily review of error logs
- [ ] Weekly security scan
- [ ] Monitor for unusual API usage
- [ ] Review user feedback for security concerns

---

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Supabase Security Docs](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Apple App Security](https://developer.apple.com/documentation/security)
- [GDPR Checklist](https://gdpr.eu/checklist/)

---

**Remember**: Security is ongoing, not one-time. Schedule quarterly security reviews.
