# Amora MVP - Local Setup Guide for Windows

This guide will help you set up and run Amora MVP on your Windows machine.

## Step 1: Install Node.js

1. **Download Node.js**:
   - Go to https://nodejs.org/
   - Download the LTS (Long Term Support) version
   - File: `node-v20.x.x-x64.msi` (or latest LTS)

2. **Install Node.js**:
   - Run the downloaded installer
   - Click "Next" through the installation
   - ✅ Check "Automatically install necessary tools" (will install Python and Visual Studio Build Tools)
   - Complete installation
   - Restart your terminal/PowerShell

3. **Verify Installation**:
   ```powershell
   node --version
   # Should show: v20.x.x or similar
   
   npm --version
   # Should show: 10.x.x or similar
   ```

## Step 2: Install Supabase CLI (Optional for Local Backend)

**Option A: Using npm** (Recommended):
```powershell
npm install -g supabase
```

**Option B: Using Scoop** (Alternative):
```powershell
# Install Scoop first (if not installed)
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# Install Supabase
scoop install supabase
```

**Verify**:
```powershell
supabase --version
# Should show version number
```

## Step 3: For This Demo - Use Cloud Supabase

Since setting up local Supabase is complex, **we'll use a cloud Supabase project** for this demo.

### Create Free Supabase Account

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub/Google/Email
4. Create a new project:
   - **Name**: amora-dev
   - **Database Password**: [Choose strong password]
   - **Region**: Choose closest to you
   - **Plan**: Free tier (perfect for development)

5. **Wait 2-3 minutes** for project to be ready

6. **Get your credentials**:
   - Go to Project Settings → API
   - Copy:
     - **Project URL** (looks like: `https://xxxxx.supabase.co`)
     - **Anon/Public Key** (long JWT token)

## Step 4: Set Up Admin Panel

1. **Navigate to admin folder**:
   ```powershell
   cd C:\Users\AS\.gemini\antigravity\scratch\AmoraMVP\admin-web
   ```

2. **Install dependencies**:
   ```powershell
   npm install
   ```

3. **Create environment file**:
   ```powershell
   # Copy the example file
   Copy-Item .env.example .env
   
   # Or manually create .env file with:
   # VITE_SUPABASE_URL=https://your-project.supabase.co
   # VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Edit `.env` file**:
   - Open `.env` in any text editor
   - Replace `your-project` with your actual Supabase URL
   - Replace `your-anon-key` with your actual anon key

5. **Start dev server**:
   ```powershell
   npm run dev
   ```

6. **Open browser**:
   - Should automatically open at `http://localhost:5173`
   - Or manually visit that URL

## Step 5: Set Up Database

In Supabase Dashboard:

1. **Go to SQL Editor** (in Supabase Dashboard)
2. **Create new query**
3. **Copy and paste** the contents of:
   `C:\Users\AS\.gemini\antigravity\scratch\AmoraMVP\backend\supabase\migrations\20240101000000_initial_schema.sql`
4. **Run the query** (will create all tables)
5. **Repeat for** `20240101000001_add_pairing_code.sql`

## Step 6: Create Admin User

1. In Supabase Dashboard → **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - **Email**: admin@test.com
   - **Password**: Admin123456!
   - **Auto Confirm User**: ✅ Yes
4. Click **"Create user"**

## Step 7: Access Admin Panel

1. Open browser to `http://localhost:5173`
2. Login with:
   - Email: admin@test.com
   - Password: Admin123456!
3. You should see the dashboard! 🎉

## Quick Start Commands

```powershell
# Navigate to admin panel
cd C:\Users\AS\.gemini\antigravity\scratch\AmoraMVP\admin-web

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

## Troubleshooting

### "npm: command not found"
- Restart your terminal after installing Node.js
- Or close VS Code and reopen it

### "Port 5173 already in use"
```powershell
# Kill process on port 5173
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process -Force

# Or use different port
npm run dev -- --port 3000
```

### "Cannot find module"
```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### Database connection failed
- Verify `.env` file has correct URL and key
- Check Supabase project is not paused
- Ensure copied keys don't have extra spaces

## What's Running?

- **Admin Panel**: `http://localhost:5173`
- **Supabase**: Cloud (no local server needed)
- **iOS App**: Requires Xcode on macOS (not available on Windows)

## Next Steps

1. ✅ Explore the admin dashboard
2. ✅ View the empty users/couples/sessions tables
3. ✅ (Optional) Load seed data for demo
4. ✅ Deploy Edge Functions to Supabase (requires Supabase CLI)

## For Full Backend (Advanced)

If you want to deploy Edge Functions:

```powershell
# Login to Supabase
supabase login

# Link to your project
cd C:\Users\AS\.gemini\antigravity\scratch\AmoraMVP\backend
supabase link --project-ref YOUR_PROJECT_REF

# Deploy functions
supabase functions deploy pair_users
supabase functions deploy start_session
supabase functions deploy process_memory
supabase functions deploy cron_weekly

# Set OpenAI secret
supabase secrets set OPENAI_API_KEY=sk-your-key
```

---

**Need help?** Check `TROUBLESHOOTING.md` or `DEVELOPMENT.md`
