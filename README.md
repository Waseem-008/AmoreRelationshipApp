# Amora MVP

A relationship wellness app for couples with AI-guided daily sessions and weekly exercises.

## Project Structure

```
AmoraMVP/
├── backend/              # Supabase backend
│   └── supabase/
│       ├── migrations/   # SQL schema migrations
│       └── functions/    # Edge Functions (Deno)
├── admin-web/           # React admin panel
└── ios/                 # iOS SwiftUI app
    └── Amora/
```

## Tech Stack

### Backend (Supabase)
- **Database**: PostgreSQL with pgvector extension
- **Auth**: Supabase Auth (Email/Password)
- **Functions**: Deno Edge Functions
- **Vector DB**: Supabase Vector (pgvector)

### Admin Panel
- **Framework**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State**: React Hooks
- **Routing**: React Router v6

### iOS App
- **Platform**: iOS 17+
- **Language**: Swift 5.9+
- **UI**: SwiftUI
- **Architecture**: MVVM
- **Dependencies**: Supabase-Swift, AVFoundation

### AI Services
- **Voice**: OpenAI Realtime API (gpt-4o-realtime-preview)
- **Text**: OpenAI GPT-4o
- **Embeddings**: text-embedding-3-small

## Getting Started

### Prerequisites

- Node.js 18+ (for admin panel)
- Xcode 15+ (for iOS development)
- Supabase CLI
- OpenAI API key
- Supabase project

### 1. Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)

2. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

3. Login and link your project:
   ```bash
   cd backend
   supabase login
   supabase link --project-ref your-project-ref
   ```

4. Run migrations:
   ```bash
   supabase db push
   ```

5. Deploy Edge Functions:
   ```bash
   supabase functions deploy pair_users
   supabase functions deploy start_session
   supabase functions deploy process_memory
   supabase functions deploy cron_weekly
   ```

6. Set environment secrets:
   ```bash
   supabase secrets set OPENAI_API_KEY=your-openai-key
   ```

### 2. Admin Panel Setup

1. Navigate to admin-web:
   ```bash
   cd admin-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

5. Run development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

### 3. iOS App Setup

1. Open Xcode:
   ```bash
   cd ios/Amora
   open Amora.xcodeproj
   ```

2. Install Swift Package Dependencies:
   - File → Add Package Dependencies
   - Add `https://github.com/supabase-community/supabase-swift`

3. Update Supabase credentials in `AuthService.swift` and `DataService.swift`:
   ```swift
   supabaseURL: URL(string: "https://your-project.supabase.co")!,
   supabaseKey: "your-anon-key"
   ```

- Supabase URL
- Supabase Anon Key

## Deployment

### Backend
Backend is automatically deployed via Supabase. Push migrations and deploy functions as shown above.

### Admin Panel
```bash
cd admin-web
npm run build
```
Deploy `dist/` folder to:
- Vercel
- Netlify
- Supabase Storage (static hosting)

### iOS
1. Archive the app in Xcode
2. Upload to TestFlight via App Store Connect
3. Add internal/external testers

## Security Notes

- Never commit API keys to git
- RLS policies enforce data isolation
- Admin actions are logged in `admin_audit_log`
- Personal memories never exposed to partner
- All API calls require authentication

## Support

For issues or questions, refer to:
- [Supabase Docs](https://supabase.com/docs)
- [OpenAI Realtime API](https://platform.openai.com/docs/guides/realtime)
- [SwiftUI Documentation](https://developer.apple.com/documentation/swiftui)

## License

Proprietary - All rights reserved
