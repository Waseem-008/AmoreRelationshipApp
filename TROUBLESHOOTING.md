# Amora MVP - Troubleshooting Guide

Common issues and their solutions.

## Table of Contents

- [Backend Issues](#backend-issues)
- [Admin Panel Issues](#admin-panel-issues)
- [iOS App Issues](#ios-app-issues)
- [Deployment Issues](#deployment-issues)
- [Performance Issues](#performance-issues)

---

## Backend Issues

### "Function returned error: 404"

**Problem**: Edge function not found or not deployed.

**Solution**:
1. Check if function is deployed:
   ```bash
   cd backend
   supabase functions list
   ```
2. Redeploy the function:
   ```bash
   supabase functions deploy function_name
   ```
3. Verify the function name matches exactly in your client code

### "Database connection failed"

**Problem**: Cannot connect to Supabase database.

**Solutions**:
- **Check project status**: Go to Supabase Dashboard, ensure project isn't paused
- **Verify credentials**: Double-check URL and anon key
- **Check connection pooler**: Use connection pooler for serverless functions
- **Network issues**: Try from different network, check firewall

### "Row Level Security policy violation"

**Problem**: User can't access data due to RLS policies.

**Solutions**:
1. Check if user is authenticated:
   ```typescript
   const { data: { user } } = await supabase.auth.getUser()
   console.log(user) // Should not be null
   ```
2. Verify RLS policies in Supabase Dashboard → Database → Tables → (table) → Policies
3. Test with service role key (DANGER: Only for debugging)

### "Migration failed"

**Problem**: Database migration doesn't apply.

**Solutions**:
```bash
# Check migration status
supabase db diff

# Reset database (DANGER: Deletes all data)
supabase db reset

# Push specific migration
supabase db push
```

### "OpenAI API rate limit exceeded"

**Problem**: Too many requests to OpenAI.

**Solutions**:
- Implement request queuing
- Add exponential backoff
- Upgrade OpenAI plan
- Cache responses where appropriate

---

## Admin Panel Issues

### "White screen / Build fails"

**Problem**: React app won't compile or shows blank page.

**Solutions**:
1. Check browser console for errors (F12)
2. Verify environment variables:
   ```bash
   cat .env
   # Should have VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
   ```
3. Clear cache and rebuild:
   ```bash
   rm -rf node_modules dist .parcel-cache
   npm install
   npm run build
   ```
4. Check for TypeScript errors:
   ```bash
   npx tsc --noEmit
   ```

### "401 Unauthorized on login"

**Problem**: Cannot authenticate users.

**Solutions**:
- Verify Supabase URL is correct (should be https://xxxxx.supabase.co)
- Check anon key is the PUBLIC anon key, not service role
- Ensure Auth is enabled in Supabase Dashboard → Authentication
- Verify email confirmation is not required (or handle it)

### "Table not found"

**Problem**: Queries return "relation does not exist".

**Solutions**:
1. Verify migrations are applied:
   ```bash
   cd backend
   supabase db push
   ```
2. Check table name spelling (case-sensitive)
3. Ensure using correct schema (usually `public`)

### "Slow loading / Performance issues"

**Solutions**:
- Enable query caching
- Add pagination to large lists
- Use `select('id, name')` instead of `select('*')`
- Implement virtual scrolling for long lists
- Check network tab for slow API calls

---

## iOS App Issues

### "Build Failed in Xcode"

**Problem**: Xcode won't compile the app.

**Solutions**:
1. Clean build folder: `⇧⌘K` (Shift+Cmd+K)
2. Delete derived data:
   ```bash
   rm -rf ~/Library/Developer/Xcode/DerivedData
   ```
3. Reset Swift package caches:
   - File → Packages → Reset Package Caches
4. Update package dependencies:
   - File → Packages → Update to Latest Package Versions

### "Supabase-Swift package errors"

**Problem**: Package resolution or import fails.

**Solutions**:
1. Remove and re-add package:
   - File → Remove Package
   - File → Add Package Dependencies
   - Enter: `https://github.com/supabase-community/supabase-swift`
2. Update Swift version if needed (requires Xcode 15+)
3. Check package compatibility with iOS 17

### "Microphone permission denied"

**Problem**: Voice sessions fail due to permissions.

**Solutions**:
1. Check `Info.plist` has `NSMicrophoneUsageDescription`
2. On simulator: Reset permissions
   - Device → Erase All Content and Settings
3. On device: Settings → Privacy → Microphone → Amora → Enable
4. Request permission explicitly in code

### "Deep link not working"

**Problem**: `amora://pair?code=XXXXXX` doesn't open app.

**Solutions**:
1. Verify URL scheme in `Info.plist`:
   ```xml
   <key>CFBundleURLSchemes</key>
   <array>
       <string>amora</string>
   </array>
   ```
2. Reinstall app (scheme registration happens at install)
3. Test with:
   ```bash
   # Simulator
   xcrun simctl openurl booted "amora://pair?code=123456"
   
   # Device (via Safari)
   # Just type URL in Safari and tap Go
   ```

### "Voice session fails immediately"

**Problem**: Session starts but voice doesn't work.

**Solutions**:
- **Test on real device** (simulator has limited audio support)
- Verify OpenAI API key in backend:
  ```bash
  supabase secrets list
  ```
- Check WebSocket connection in logs
- Ensure microphone permission granted
- Test with chat mode first to isolate issue

### "App crashes on launch"

**Problem**: App crashes immediately.

**Solutions**:
1. Check Xcode console for crash logs
2. Verify Supabase credentials are valid
3. Check for force-unwrapped optionals (`!`)
4. Enable Exception Breakpoint in Xcode
5. Test on different iOS version

---

## Deployment Issues

### "Supabase deployment fails"

**Problem**: `supabase db push` or functions deploy fails.

**Solutions**:
```bash
# Check authentication
supabase login

# Verify project link
supabase projects list
supabase link --project-ref YOUR_REF

# Push with verbose logging
supabase db push --debug

# Deploy functions individually
supabase functions deploy function_name --debug
```

### "Vercel deployment fails"

**Problem**: Admin panel won't deploy to Vercel.

**Solutions**:
1. Check build logs in Vercel dashboard
2. Verify environment variables are set
3. Test build locally:
   ```bash
   npm run build
   ```
4. Ensure `package.json` scripts are correct
5. Check Node.js version matches (18+)

### "TestFlight upload fails"

**Problem**: Can't upload iOS app to TestFlight.

**Solutions**:
1. Archive the app: Product → Archive (⌘⇧B doesn't work)
2. Check certificate validity in Xcode
3. Verify app version is incremented
4. Ensure all required capabilities are enabled
5. Check for missing privacy descriptions in Info.plist
6. Archive must be built with Release configuration

### "Environment variables not working"

**Problem**: App can't read environment variables.

**Solutions**:

**Admin Panel (Vite)**:
- Variables must start with `VITE_`
- Restart dev server after changing `.env`
- In production, set in Vercel/Netlify dashboard

**iOS**:
- No environment variables in iOS (use hardcoded values)
- For different environments, use build configurations

**Backend**:
- Set via Supabase CLI:
  ```bash
  supabase secrets set KEY=value
  ```

---

## Performance Issues

### "Slow database queries"

**Solutions**:
1. Add indexes:
   ```sql
   create index idx_users_couple_id on users(couple_id);
   ```
2. Use `select()` with specific columns
3. Implement pagination
4. Use connection pooler
5. Enable query caching

### "High OpenAI costs"

**Solutions**:
- Implement session length limits (already 15 min)
- Add user rate limiting (1 session/day)
- Cache AI responses where appropriate
- Use cheaper models for non-critical tasks
- Monitor usage in OpenAI dashboard

### "Slow admin panel load"

**Solutions**:
- Implement code splitting:
  ```typescript
  const Dashboard = lazy(() => import('./pages/Dashboard'))
  ```
- Add pagination to tables
- Optimize bundle size:
  ```bash
  npm run build -- --analyze
  ```
- Enable gzip compression on server
- Use CDN for static assets

---

## Getting More Help

### Logs to Check

**Backend**:
```bash
supabase functions logs function_name --limit 100
```

**Admin Panel**:
- Browser Console (F12 → Console)
- Network tab for API calls

**iOS**:
- Xcode Console during running
- Device → Window → Devices and Simulators → View Device Logs

### Useful Commands

```bash
# Backend status
supabase status
supabase projects list

# Check migrations
supabase db diff

# Test functions locally
supabase functions serve

# Admin panel
npm run dev -- --host  # For network access

# iOS
# Clean everything
rm -rf ~/Library/Developer/Xcode/DerivedData
```

### Community Resources

- [Supabase Discord](https://discord.supabase.com/)
- [OpenAI Community](https://community.openai.com/)
- [Swift Forums](https://forums.swift.org/)
- Stack Overflow (tag: supabase, swiftui, react)

---

**Still stuck?** Check the component-specific README files:
- `backend/README.md`
- `admin-web/README.md`
- `ios/README.md`
