# Amora MVP - Quick Start Guide

Get Amora MVP up and running in 30 minutes!

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Supabase account created
- [ ] OpenAI API key obtained
- [ ] Xcode 15+ installed (for iOS)
- [ ] Apple Developer account (for TestFlight)

## 🚀 Quick Start (5 Steps)

### Step 1: Clone & Setup (2 minutes)

```bash
cd AmoraMVP
```

### Step 2: Backend Setup (10 minutes)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Note: Project URL, Anon Key, Service Role Key

2. **Deploy Database**
   ```bash
   cd backend
   npm install -g supabase
   supabase login
   supabase link --project-ref YOUR_PROJECT_REF
   supabase db push
   ```

3. **Deploy Functions**
   ```bash
   supabase functions deploy pair_users
   supabase functions deploy start_session
   supabase functions deploy process_memory
   supabase functions deploy cron_weekly
   ```

4. **Set Secrets**
   ```bash
   supabase secrets set OPENAI_API_KEY=sk-your-openai-key
   ```

5. **Setup Cron Job**
   - Go to Supabase Dashboard → SQL Editor
   - Run the cron setup SQL from `DEPLOYMENT.md`

### Step 3: Admin Panel Setup (5 minutes)

```bash
cd admin-web
npm install
cp .env.example .env
```

Edit `.env`:
```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Test locally:
```bash
npm run dev
# Open http://localhost:3000
```

Deploy to Vercel:
```bash
npm install -g vercel
vercel --prod
```

### Step 4: iOS App Setup (10 minutes)

1. **Update Credentials**
   - Open `ios/Amora/Amora/Services/AuthService.swift`
   - Update `supabaseURL` and `supabaseKey`
   - Repeat for `DataService.swift`

2. **Configure Xcode**
   - Open `Amora.xcodeproj` in Xcode
   - Add Supabase Swift package dependency:
     - File → Add Package Dependencies
     - Enter: `https://github.com/supabase-community/supabase-swift`
   - Set Team & Bundle ID

3. **Build & Test**
   - Select iPhone simulator
   - Press ⌘R to build and run

### Step 5: Create Test Users (3 minutes)

1. **Sign up two accounts** via iOS app:
   - User A: `tester1@example.com`
   - User B: `tester2@example.com`

2. **Pair them**:
   - User A: Generate pairing code
   - User B: Enter code

3. **Test a session**:
   - Tap "Start Today's Session"
   - Test voice/chat modes

## 🎯 Verification Checklist

After setup, verify:
- [ ] Can sign up new user in iOS app
- [ ] Can complete intake form
- [ ] Can generate and use pairing code
- [ ] Can start a session (voice or chat)
- [ ] Can view weekly exercise
- [ ] Can access admin panel
- [ ] Can see users and couples in admin
- [ ] Backend functions are deployed

## 🐛 Common Issues

### "Supabase connection failed"
- ✅ Check URL and keys are correct
- ✅ Verify project is not paused
- ✅ Test with `supabase projects list`

### "Build failed in Xcode"
- ✅ Clean build folder (⇧⌘K)
- ✅ Delete derived data
- ✅ Verify Swift package dependencies resolved

### "Functions return 404"
- ✅ Verify deployment: `supabase functions list`
- ✅ Check function names match exactly
- ✅ Redeploy: `supabase functions deploy --no-verify-jwt`

### "Voice doesn't work"
- ✅ Must test on real iPhone (simulator has limitations)
- ✅ Grant microphone permission
- ✅ Verify OpenAI API key is set

## 📱 Testing on Real Device

1. Connect iPhone via USB
2. Trust computer on iPhone
3. In Xcode: Select your iPhone from device list
4. Build & Run (⌘R)
5. First time: Trust developer certificate on iPhone

## 🎉 You're Live!

Once verification is complete:
- Share TestFlight link with beta testers
- Monitor admin panel for activity
- Check Supabase logs for errors
- Collect feedback!

## 📞 Need Help?

- Backend issues → Check `backend/README.md`
- Admin panel → Check `admin-web/README.md`
- iOS app → Check `ios/README.md`
- Deployment → Check `DEPLOYMENT.md`

---

**Next**: Read `PROJECT_SUMMARY.md` for complete feature overview
