# Amora MVP - Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### To Do
- Add comprehensive test suite
- Implement push notifications (server-side)
- Add settings screen to iOS app
- Implement analytics dashboard
- Add Sentry error tracking

## [1.0.0] - 2024-12-03

### Added

**Backend**
- Complete PostgreSQL schema with 7 tables
- Row Level Security (RLS) policies
- pgvector extension for semantic memory search
- 4 Edge Functions (pair_users, start_session, process_memory, cron_weekly)
- OpenAI integration for voice and memory processing
- Automated weekly exercise assignment via cron job
- Sample seed data for testing

**Admin Panel**
- React admin dashboard with TypeScript
- User management with search
- Couple management (unpair, reset exercises)
- Session logs with transcript viewing
- Real-time statistics
- Modern dark-themed UI with Tailwind CSS
- Responsive design for desktop and tablet
- Audit logging for admin actions

**iOS App**
- SwiftUI app with MVVM architecture
- Email/password authentication
- 10-question intake form
- Partner pairing with 6-digit codes
- Deep link support (amora://pair?code=XXXXXX)
- Home dashboard with session status and streaks
- Voice session view with waveform visualization
- OpenAI Realtime API integration
- Automatic chat fallback
- 15-minute session timer with soft warnings
- Weekly exercise assignments
- Reflection form with ratings
- Local daily and weekend notifications
- Microphone permission handling

**Documentation**
- README.md - Project overview
- QUICKSTART.md - 30-minute setup guide
- DEPLOYMENT.md - Production deployment guide
- DEVELOPMENT.md - Developer workflow guide
- TROUBLESHOOTING.md - Common issues and solutions
- PROJECT_SUMMARY.md - Complete feature overview
- CONTRIBUTING.md - Contribution guidelines
- Component-specific READMEs (backend, admin, iOS)

**DevOps**
- GitHub Actions CI/CD workflow
- Automated deployment scripts
- Test validation script
- .gitignore files for all components
- Environment variable templates
- Sample seed data

**Configuration**
- package.json with helper scripts
- Docker configuration (optional)
- .env.example templates
- MIT License

### Security
- Row Level Security on all tables
- Personal memories never exposed to partners
- Admin actions logged
- API key management via Supabase secrets
- HTTPS-only API calls

## [0.1.0] - Initial Development

### Added
- Project structure
- Basic architecture
- Technology stack selection

---

## Version History

### v1.0.0 - MVP Release
First production-ready version with all core features:
- Daily AI-guided sessions (voice + chat)
- Partner pairing system
- Weekly exercises
- Memory storage and retrieval
- Admin panel for management
- Complete documentation

### Future Versions

**v1.1.0** (Planned)
- Push notifications
- Settings screen
- Enhanced analytics
- Performance optimizations

**v1.2.0** (Planned)
- Custom exercise creation
- Data export functionality
- Improved error handling
- Additional memory insights

**v2.0.0** (Future)
- Android app
- Web app for sessions
- Advanced analytics
- Subscription system
- Multi-language support

---

## Migration Guide

### From Development to Production

1. **Update environment variables**
   - Change Supabase URL to production
   - Update OpenAI API key if different
   - Set production secrets

2. **Run migrations**
   ```bash
   supabase link --project-ref PROD_REF
   supabase db push
   ```

3. **Deploy functions**
   ```bash
   supabase functions deploy --no-verify-jwt
   ```

4. **Update iOS credentials**
   - Update Supabase URL/keys in Services
   - Change bundle identifier
   - Update team and certificates

5. **Deploy admin panel**
   - Build with production env vars
   - Deploy to Vercel/Netlify

---

## Breaking Changes

### v1.0.0
- Initial public release (no breaking changes as first version)

---

## Contributors

- Initial development team

---

For more details on any version, see the git tags and release notes.
