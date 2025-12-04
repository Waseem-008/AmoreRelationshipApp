# Deployment Guide

## Overview

Amora MVP consists of three components:
1. **Backend** (Supabase) - Hosted on Supabase cloud
2. **Admin Panel** (React) - Static site deployment
3. **iOS App** - TestFlight / App Store

## 1. Backend Deployment (Supabase)

### Initial Setup

1. Create Supabase project at [supabase.com](https://supabase.com)

2. Note your project credentials:
   - Project URL: `https://xxxxx.supabase.co`
   - Anon (public) key
   - Service role (secret) key

### Database Migration

```bash
cd backend
supabase link --project-ref your-project-ref
supabase db push
```

### Deploy Edge Functions

```bash
# Deploy all functions
supabase functions deploy pair_users
supabase functions deploy start_session
supabase functions deploy process_memory
supabase functions deploy cron_weekly

# Set environment variables
supabase secrets set OPENAI_API_KEY=sk-your-key
```

### Setup Cron Job

In Supabase SQL Editor:

```sql
-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule weekly exercise assignment (Fridays at noon UTC)
SELECT cron.schedule(
  'weekly-exercise-assignment',
  '0 12 * * 5',
  $$
  SELECT net.http_post(
    'https://your-project.supabase.co/functions/v1/cron_weekly',
    '{}',
    headers:=jsonb_build_object(
      'Authorization', 
      'Bearer YOUR_SERVICE_ROLE_KEY'
    )
  );
  $$
);
```

### Enable Vector Extension

In Supabase SQL Editor:
```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

## 2. Admin Panel Deployment

### Option A: Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd admin-web
   vercel --prod
   ```

3. Set environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Option B: Netlify

1. Build locally:
   ```bash
   cd admin-web
   npm run build
   ```

2. Deploy via Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

3. Set environment variables in Netlify dashboard

### Option C: Supabase Storage

1. Build the app:
   ```bash
   cd admin-web
   npm run build
   ```

2. Create a public bucket in Supabase Storage named `admin-web`

3. Upload `dist/` contents to the bucket

4. Access via: `https://your-project.supabase.co/storage/v1/object/public/admin-web/index.html`

## 3. iOS App Deployment

### Prerequisites

- Apple Developer Account ($99/year)
- Xcode 15+
- App Store Connect access

### TestFlight Deployment

1. **Configure App**:
   - Open `ios/Amora/Amora.xcodeproj` in Xcode
   - Update bundle identifier: `com.yourcompany.amora`
   - Update team and signing certificates

2. **Update Credentials**:
   - In `AuthService.swift` and `DataService.swift`, update:
     ```swift
     supabaseURL: URL(string: "https://your-project.supabase.co")!,
     supabaseKey: "your-anon-key"
     ```

3. **Archive the App**:
   - Xcode → Product → Archive
   - Wait for build to complete

4. **Distribute to TestFlight**:
   - Window → Organizer → Archives
   - Select your archive
   - Click "Distribute App"
   - Choose "App Store Connect"
   - Follow the wizard

5. **Add Testers**:
   - Go to [App Store Connect](https://appstoreconnect.apple.com)
   - My Apps → Your App → TestFlight
   - Add internal or external testers

### App Store Submission

1. Complete App Store listing in App Store Connect:
   - Screenshots (required)
   - App description
   - Keywords
   - Privacy policy URL

2. Submit for review:
   - TestFlight → Builds → Submit for Review
   - Answer compliance questions
   - Wait for approval (1-3 days typically)

## 4. Post-Deployment

### Monitoring

1. **Supabase Logs**:
   ```bash
   supabase functions logs --project-ref your-ref
   ```

2. **Admin Panel**: Access admin dashboard to monitor users and sessions

3. **Analytics** (Optional):
   - Integrate Sentry for error tracking
   - Add PostHog/Mixpanel for analytics

### Backup

1. **Database Backups**:
   - Supabase automatically backs up daily
   - Manual backup: `supabase db dump > backup.sql`

2. **Code Backups**:
   - Ensure code is pushed to git repository
   - Tag releases: `git tag v1.0.0`

## 5. Environment Checklist

- [ ] Supabase project created
- [ ] Database migrations applied
- [ ] Edge functions deployed
- [ ] OpenAI API key set in secrets
- [ ] Cron job scheduled
- [ ] Admin panel deployed
- [ ] Admin panel environment variables set
- [ ] iOS app credentials updated
- [ ] iOS app archived and uploaded
- [ ] TestFlight testers added
- [ ] Monitoring setup

## Costs (Approximate)

- **Supabase**: Free tier (up to 500MB DB, 2GB bandwidth)
- **OpenAI**: Pay-as-you-go (Realtime API ~$0.06/min audio)
- **Vercel/Netlify**: Free tier for admin panel
- **Apple Developer**: $99/year
- **Total Monthly** (50 users, 2 sessions/day): ~$100-200

## Support

For deployment issues:
- Supabase: [supabase.com/docs](https://supabase.com/docs)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- TestFlight: [developer.apple.com](https://developer.apple.com/testflight/)
