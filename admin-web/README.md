# Amora Admin Panel

React admin panel for managing Amora users, couples, and sessions.

## Features

- 📊 Dashboard with key metrics
- 👥 User management and search
- 💑 Couple management (unpair, reset exercises)
- 📝 Session logs with transcripts
- 🔒 Supabase authentication

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Configure environment variables in `.env`:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Supabase Storage
1. Build the app: `npm run build`
2. Upload `dist/` contents to Supabase Storage bucket
3. Enable public access on the bucket

## Admin Access

To grant admin access to a user:

1. Create user account via the app
2. In Supabase Dashboard → SQL Editor, run:
   ```sql
   -- Mark user as admin (you might want a separate is_admin column)
   -- Or just allow any authenticated user to view admin panel
   ```

For MVP, any authenticated user can access the admin panel. In production, implement proper role-based access control.

## Security

- All data access uses Supabase RLS policies
- Admin actions are logged in `admin_audit_log`
- Environment variables should never be committed

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Supabase Client** for backend
- **Lucide React** for icons
