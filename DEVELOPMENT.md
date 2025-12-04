# Amora MVP Development Guide

This guide covers common development workflows and best practices.

## Development Workflow

### Daily Development

```bash
# Terminal 1: Backend (Edge Functions)
cd backend
supabase functions serve

# Terminal 2: Admin Panel
cd admin-web
npm run dev

# Terminal 3: iOS App
# Open Xcode and run with ⌘R
```

## Code Organization

### Backend Structure
```
backend/supabase/
├── migrations/          # Database schema versions
│   └── YYYYMMDDHHMMSS_description.sql
└── functions/           # Edge Functions
    └── function_name/
        └── index.ts     # Function entry point
```

### iOS Structure
```
ios/Amora/Amora/
├── Services/           # Business logic & API calls
├── ViewModels/        # State management
├── Views/             # UI components
└── Models/            # Data structures
```

### Admin Panel Structure
```
admin-web/src/
├── components/        # Reusable UI components
├── pages/            # Route-level components
├── lib/              # Utilities & configuration
└── App.tsx           # Main app entry
```

## Common Tasks

### Adding a New Database Table

1. Create migration file:
   ```bash
   cd backend
   supabase migration new add_table_name
   ```

2. Edit the migration file with SQL:
   ```sql
   create table public.table_name (
     id uuid default gen_random_uuid() primary key,
     created_at timestamptz default now()
   );
   
   alter table public.table_name enable row level security;
   ```

3. Apply migration:
   ```bash
   supabase db push
   ```

### Adding a New Edge Function

1. Create function directory:
   ```bash
   mkdir backend/supabase/functions/my_function
   ```

2. Create `index.ts`:
   ```typescript
   import { createClient } from '@supabase/supabase-js'
   
   Deno.serve(async (req) => {
     // Your logic here
     return new Response(JSON.stringify({ success: true }))
   })
   ```

3. Deploy:
   ```bash
   supabase functions deploy my_function
   ```

### Adding a New iOS View

1. Create SwiftUI view file:
   ```swift
   import SwiftUI
   
   struct MyNewView: View {
       var body: some View {
           Text("Hello")
       }
   }
   ```

2. Create ViewModel if needed:
   ```swift
   @MainActor
   class MyNewViewModel: ObservableObject {
       @Published var data: String = ""
   }
   ```

3. Add navigation in parent view

### Adding a New Admin Panel Page

1. Create page component:
   ```typescript
   // src/pages/MyPage.tsx
   export default function MyPage() {
     return <div>My Page</div>
   }
   ```

2. Add route in `App.tsx`:
   ```typescript
   <Route path="/my-page" element={<MyPage />} />
   ```

## Testing

### Backend Testing

Test edge functions locally:
```bash
cd backend
supabase functions serve

# In another terminal
curl -i --location --request POST \
  'http://localhost:54321/functions/v1/function_name' \
  --header 'Authorization: Bearer ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"key":"value"}'
```

### Admin Panel Testing

```bash
cd admin-web
npm run dev
# Open http://localhost:3000
# Test all CRUD operations
```

### iOS Testing

1. **Simulator Testing**:
   - Good for: UI, navigation, data flow
   - Limited for: Voice, notifications, deep links

2. **Real Device Testing**:
   - Required for: Voice sessions, microphone
   - Connect via USB and select device in Xcode

## Debugging

### Backend Debugging

View function logs:
```bash
supabase functions logs function_name --limit 100
```

Check database directly:
```bash
supabase db reset  # Reset to migrations
supabase db diff   # See pending changes
```

### Admin Panel Debugging

1. Open browser DevTools (F12)
2. Check Console for errors
3. Check Network tab for API calls
4. Verify environment variables loaded

### iOS Debugging

1. **Xcode Console**: View print statements
2. **Breakpoints**: Pause execution
3. **View Hierarchy**: Debug UI issues
4. **Network**: Check API calls (use Proxyman)

## Performance Optimization

### Backend
- Use database indexes for frequently queried columns
- Minimize Edge Function cold starts (keep functions small)
- Cache frequently accessed data
- Use connection pooling

### Admin Panel
- Lazy load large lists
- Implement pagination
- Use React.memo for expensive components
- Optimize bundle size

### iOS
- Use `@State` only for view-local state
- Lazy load images and heavy content
- Debounce search inputs
- Use `Task` for async operations

## Security Best Practices

### Never Commit
- `.env` files
- API keys
- Service role keys
- Private certificates

### Always
- Use RLS policies on all tables
- Validate inputs server-side
- Use HTTPS only
- Rotate API keys regularly
- Audit admin actions

## Git Workflow

### Branch Naming
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/what-changed` - Documentation
- `refactor/area-changed` - Code refactoring

### Commit Messages
```
feat: Add weekly reflection reminder
fix: Resolve pairing code validation issue
docs: Update deployment guide
refactor: Simplify session timer logic
```

### Before Committing
```bash
# Check what's changed
git status

# Review changes
git diff

# Stage specific files
git add file1 file2

# Commit with message
git commit -m "feat: Add new feature"
```

## Deployment Checklist

Before deploying to production:

- [ ] All tests passing
- [ ] No console errors
- [ ] Environment variables set
- [ ] Database migrations applied
- [ ] Edge functions deployed
- [ ] Admin panel built and deployed
- [ ] iOS app built for release
- [ ] Privacy policy updated
- [ ] Terms of service updated
- [ ] User testing completed

## Monitoring

### Metrics to Track
- Daily active users (DAU)
- Session completion rate
- Average session duration
- Pairing success rate
- Weekly exercise completion rate
- Error rates (by function/screen)

### Tools
- Supabase Dashboard for backend metrics
- Sentry for error tracking
- PostHog/Mixpanel for analytics
- TestFlight for beta feedback

## Resources

- [Supabase Docs](https://supabase.com/docs)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [SwiftUI Tutorials](https://developer.apple.com/tutorials/swiftui)
- [React Documentation](https://react.dev)

## Getting Help

1. Check README files in each component folder
2. Review DEPLOYMENT.md for setup issues
3. Search Supabase/OpenAI docs
4. Check GitHub Issues (if applicable)
