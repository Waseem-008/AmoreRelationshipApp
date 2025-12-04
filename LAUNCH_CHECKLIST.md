# Amora MVP - Launch Checklist

**Complete this checklist before launching to production.**

---

## Pre-Launch Checklist

### ✅ Development Complete

#### Backend
- [ ] All database migrations tested
- [ ] All edge functions deployed
- [ ] Edge functions tested in staging
- [ ] Cron job configured and tested
- [ ] OpenAI API key set in production
- [ ] Database backups enabled
- [ ] RLS policies verified (run security audit)

#### Admin Panel
- [ ] All features working
- [ ] Build completes without errors
- [ ] Production environment variables set
- [ ] Deployed to production URL
- [ ] SSL certificate verified
- [ ] Admin accounts created

#### iOS App
- [ ] App builds successfully
- [ ] All features tested on real device
- [ ] Voice sessions working
- [ ] Deep linking working
- [ ] Notifications working
- [ ] Production Supabase credentials updated
- [ ] Bundle identifier finalized
- [ ] Version number set (1.0.0)

---

## ✅ Testing Complete

### Functional Testing
- [ ] User can sign up
- [ ] User can sign in
- [ ] Intake form submission works
- [ ] Pairing code generation works
- [ ] Pairing with code works
- [ ] Voice session starts successfully
- [ ] Chat fallback works
- [ ] Session completes and saves
- [ ] Weekly exercise displayed
- [ ] Reflection submission works
- [ ] Notifications trigger correctly
- [ ] Deep links open app correctly

### Cross-User Testing
- [ ] Two separate accounts created
- [ ] Both users paired successfully
- [ ] Both completed intake forms
- [ ] Both completed sessions
- [ ] Shared exercises appear for both
- [ ] Personal memories stay private
- [ ] Unpair functionality works

### Edge Cases
- [ ] Invalid pairing code rejected
- [ ] Cannot pair with self
- [ ] Cannot pair if already paired
- [ ] Session limit enforced (1/day)
- [ ] Microphone permission handled gracefully
- [ ] Network errors handled
- [ ] Session timeout handled (15 min)

### Performance
- [ ] App loads quickly
- [ ] No memory leaks
- [ ] Voice quality acceptable
- [ ] Database queries optimized
- [ ] No visible lag/stuttering

---

## ✅ Security Audit

- [ ] Complete [SECURITY_AUDIT.md](file:///C:/Users/AS/.gemini/antigravity/scratch/AmoraMVP/SECURITY_AUDIT.md) checklist
- [ ] All critical items resolved
- [ ] High severity items resolved
- [ ] Penetration testing completed
- [ ] Third-party security scan run
- [ ] No secrets in git history
- [ ] No test accounts in production

**Key Security Items**:
- [ ] RLS enabled on all tables
- [ ] API keys secured
- [ ] Input validation on all endpoints
- [ ] HTTPS everywhere
- [ ] Personal memories never shared with partner

---

## ✅ Legal & Compliance

### Documentation
- [ ] Privacy Policy finalized
- [ ] Terms of Service finalized
- [ ] Privacy Policy URL added to app
- [ ] Terms of Service URL added to app
- [ ] Contact email for privacy/legal set up

### App Store Requirements
- [ ] Age rating set (17+)
- [ ] Privacy nutrition label completed accurately
- [ ] Export compliance reviewed
- [ ] Content rights verified
- [ ] No prohibited content

### Data Protection
- [ ] GDPR compliance (if applicable)
- [ ] CCPA compliance (if applicable)
- [ ] Data retention policy defined
- [ ] Account deletion implemented
- [ ] Data export functionality available

---

## ✅ App Store Preparation

### Assets
- [ ] App icon (1024x1024) designed
- [ ] App Store screenshots (all sizes)
- [ ] App preview video (optional, recommended)
- [ ] App description written
- [ ] Keywords researched
- [ ] Subtitle/tagline written
- [ ] Promotional text prepared

### Metadata
- [ ] App name finalized
- [ ] Subtitle (30 chars max)
- [ ] Description (4000 chars max)
- [ ] Keywords (100 chars max)
- [ ] Support URL set
- [ ] Marketing URL set (optional)
- [ ] Privacy Policy URL
- [ ] Screenshots uploaded

### Review Information
- [ ] Demo account credentials provided
- [ ] Review notes written
- [ ] Contact information accurate
- [ ] Test pairing code provided

### Build
- [ ] Archive created in Xcode
- [ ] Build uploaded via Xcode or Transporter
- [ ] Build processed successfully
- [ ] Correct version and build number
- [ ] Release notes written

---

## ✅ Infrastructure

### Hosting
- [ ] Admin panel deployed (Vercel/Netlify)
- [ ] Custom domain configured (optional)
- [ ] SSL certificates valid
- [ ] CDN configured (if applicable)

### Backend
- [ ] Supabase project not paused
- [ ] Billing plan upgraded (if needed)
- [ ] Usage limits appropriate
- [ ] Database size monitored
- [ ] Connection pooler enabled

### Monitoring
- [ ] Error tracking set up (Sentry)
- [ ] Analytics configured (PostHog/Mixpanel)
- [ ] Logging configured
- [ ] Alerts set up for critical errors
- [ ] Uptime monitoring (optional)

### APIs
- [ ] OpenAI API limits verified
- [ ] OpenAI billing set up
- [ ] Usage monitoring configured
- [ ] Rate limits appropriate

---

## ✅ Documentation

- [ ] README.md updated
- [ ] DEPLOYMENT.md accurate
- [ ] API.md reflects current API
- [ ] All documentation reviewed
- [ ] Support documentation prepared
- [ ] FAQ created (optional)

---

## ✅ Support & Operations

### Support
- [ ] Support email set up (support@amora.app)
- [ ] Privacy email set up (privacy@amora.app)
- [ ] Security email set up (security@amora.app)
- [ ] Support documentation prepared
- [ ] Ticket system set up (optional)

### Communication
- [ ] Website live (optional)
- [ ] Social media accounts created (optional)
- [ ] Email service configured (if needed)
- [ ] User feedback mechanism in place

### Team
- [ ] Admin panel access granted to team
- [ ] Supabase access granted
- [ ] App Store Connect access granted
- [ ] On-call rotation defined (optional)

---

## ✅ Marketing & Launch

### Pre-Launch
- [ ] Landing page live (optional)
- [ ] Beta testers recruited
- [ ] TestFlight testing period completed
- [ ] User feedback incorporated
- [ ] Bug fixes deployed

### Launch Day
- [ ] Press release prepared (optional)
- [ ] Social media posts scheduled
- [ ] Email to beta testers prepared
- [ ] Product Hunt launch planned (optional)

### Post-Launch
- [ ] Monitor reviews daily
- [ ] Respond to user feedback
- [ ] Track analytics
- [ ] Fix critical bugs immediately

---

## ✅ Final Verifications

### Production Environment
- [ ] All environment variables correct
- [ ] Database has ZERO test data
- [ ] Correct Supabase project linked
- [ ] OpenAI production key active
- [ ] Admin accounts secured

### User Experience
- [ ] Complete full user flow end-to-end
- [ ] Test on fresh install
- [ ] Verify all copy/text correct
- [ ] Check for typos
- [ ] Verify all images load
- [ ] Test on multiple iOS versions
- [ ] Test on different device sizes

### Performance
- [ ] App launches in < 2 seconds
- [ ] API calls return in reasonable time
- [ ] Voice quality tested on real device
- [ ] No crashes in 24-hour test period

---

## ✅ Backup & Recovery

- [ ] Database backup verified
- [ ] Recovery procedure tested
- [ ] Rollback plan prepared
- [ ] Incident response plan documented

---

## ✅ Go/No-Go Decision

**Pre-Launch Meeting**: [Date/Time]

**Attendees**:
- [ ] Technical Lead
- [ ] Product Lead
- [ ] Security Lead
- [ ] Legal (if applicable)

**Review**:
- [ ] All critical items complete
- [ ] No blocking bugs
- [ ] Performance acceptable
- [ ] Security audit passed
- [ ] Legal review complete

**Decision**: [ ] GO  [ ] NO-GO

**If NO-GO, blockers**:
```
1. 
2. 
3. 
```

---

## TestFlight Launch (Before App Store)

### TestFlight Checklist

- [ ] Build uploaded to TestFlight
- [ ] Beta App Description written
- [ ] Test Information provided
- [ ] Beta testers invited (email addresses or public link)
- [ ] Testing period: 1-2 weeks minimum
- [ ] Feedback form created
- [ ] Known issues documented

### Beta Testing Goals

- [ ] 10+ testers recruited
- [ ] All core features tested
- [ ] Voice quality verified on multiple devices
- [ ] Pairing tested with real couples
- [ ] Feedback collected and reviewed
- [ ] Critical bugs fixed

---

## App Store Submission

### Submission Checklist

- [ ] All above sections complete
- [ ] Build selected in App Store Connect
- [ ] Version information filled out
- [ ] Review information complete
- [ ] Pricing and availability set
- [ ] App Review submitted

### Expected Timeline

- Day 0: Submit for review
- Day 1-3: In review
- Day 3-7: Review complete (typically 24-48 hours)
- Day 7+: Available on App Store

### Rejection Plan

If rejected:
- [ ] Read rejection reason carefully
- [ ] Fix issues identified
- [ ] Update review notes
- [ ] Resubmit within 24 hours

---

## Launch Day Checklist

### Morning Of Launch

- [ ] Monitor Supabase dashboard
- [ ] Monitor OpenAI usage
- [ ] Check admin panel accessible
- [ ] Verify all systems operational
- [ ] Team on standby

### Post-Launch (First 24 Hours)

- [ ] Monitor error rates
- [ ] Check user signups
- [ ] Review session completion rates
- [ ] Monitor app reviews
- [ ] Respond to critical issues immediately

### First Week

- [ ] Daily metrics review
- [ ] User feedback review
- [ ] Bug triage and fixes
- [ ] Performance monitoring
- [ ] Usage cost monitoring

---

## Metrics to Track

### Day 1
- Total downloads
- Signups
- Intake completions
- Successful pairings
- Sessions started
- Sessions completed
- Crash rate

### Week 1
- Daily Active Users (DAU)
- Session completion rate
- Average session duration
- Pairing success rate
- Retention (D1, D3, D7)
- Error rates
- OpenAI costs

---

## Emergency Contacts

**Critical Issues**:
- Supabase: [Support Email/Slack]
- OpenAI: [Support Email]
- Apple: [Developer Support]

**Team**:
- Technical Lead: [Contact]
- On-Call Engineer: [Contact]
- Security Lead: [Contact]

---

## Post-Launch

### Week 1 Tasks
- [ ] Publish launch retrospective
- [ ] Review metrics
- [ ] Prioritize feedback
- [ ] Plan v1.1 features
- [ ] Thank beta testers

### Month 1 Tasks
- [ ] Quarterly security review
- [ ] Performance optimization
- [ ] User interviews
- [ ] Analytics deep dive
- [ ] Cost optimization review

---

## Sign-Off

**I confirm all items are complete and we are ready to launch.**

**Technical Lead**: _______________ Date: ___________  
**Product Lead**: _______________ Date: ___________  
**Security Lead**: _______________ Date: ___________

---

**GOOD LUCK! 🚀**

Remember:
- Launching is just the beginning
- Monitor closely for first 48 hours
- Respond to user feedback quickly
- Iterate and improve
- Celebrate this milestone!
